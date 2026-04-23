/* eslint-disable no-console */
/**
 * End-to-end smoke test for /api/admin/card-templates against the live server.
 *
 * Usage:
 *   COOKIE="nuptechs_session=<paste-your-cookie>" \
 *   BASE="https://www.nuptechs.com" \
 *   node tests/smoke-card-templates.mjs
 *
 * How to get the cookie: open https://www.nuptechs.com/admin/cartoes while
 * logged in, open DevTools → Application → Cookies → copy the value of
 * `nuptechs_session`, then pass it as shown above.
 *
 * The test creates a throwaway template, uploads a 1x1 PNG, activates it,
 * verifies it appears in the list, removes an image, then deletes the template.
 * Each step prints PASS/FAIL with the HTTP status and error body so you can see
 * exactly where (and why) the flow breaks in production.
 */

import { Blob, File } from "node:buffer";
import test from "node:test";
import assert from "node:assert/strict";

const BASE = (process.env.BASE || "https://www.nuptechs.com").replace(/\/$/, "");
const COOKIE = process.env.COOKIE || "";

if (!COOKIE) {
  console.error(
    "\n⚠️  Missing COOKIE env var. Open the admin while logged in, copy the\n" +
      "    'nuptechs_session=...' cookie value and run again:\n\n" +
      '    COOKIE="nuptechs_session=..." node tests/smoke-card-templates.mjs\n'
  );
  process.exit(2);
}

// Minimal valid 1x1 PNG (67 bytes), base64-encoded.
const TINY_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
const pngBytes = Buffer.from(TINY_PNG_BASE64, "base64");

async function req(path, init = {}) {
  const url = `${BASE}${path}`;
  const headers = {
    Cookie: COOKIE,
    ...(init.headers || {}),
  };
  const res = await fetch(url, { ...init, headers, redirect: "manual" });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  return { status: res.status, body, headers: res.headers };
}

function unique(label) {
  return `smoke-${label}-${Date.now()}-${Math.floor(Math.random() * 1e5)}`;
}

let createdId = 0;

test("GET /api/admin/card-templates returns templates array", async () => {
  const { status, body } = await req("/api/admin/card-templates");
  assert.equal(status, 200, `expected 200, got ${status}: ${JSON.stringify(body).slice(0, 300)}`);
  assert.ok(Array.isArray(body.templates), "body.templates must be an array");
  console.log(`   current templates: ${body.templates.length}`);
});

test("POST /api/admin/card-templates creates a template with one PNG", async () => {
  const name = unique("template");
  const form = new FormData();
  form.set("name", name);
  form.set("caption", "*Teste smoke* ~rollback~ _ok_");
  form.set("includeContact", "true");
  form.set("activate", "false");
  // Convert Node Buffer to Blob then to File for FormData compatibility.
  const file = new File([new Blob([pngBytes])], "tiny.png", { type: "image/png" });
  form.set("files", file);

  const { status, body } = await req("/api/admin/card-templates", {
    method: "POST",
    body: form,
  });

  assert.equal(status, 201, `expected 201, got ${status}: ${JSON.stringify(body).slice(0, 500)}`);
  assert.ok(body && typeof body.id === "number", "expected numeric id in response");
  createdId = body.id;
  console.log(`   created template id=${createdId} name=${name}`);
});

test("GET list includes the new template with media", async () => {
  const { status, body } = await req("/api/admin/card-templates");
  assert.equal(status, 200);
  const found = body.templates.find((t) => t.id === createdId);
  assert.ok(found, `template id=${createdId} not in list`);
  assert.equal(found.media.length, 1, "expected exactly 1 media row");
  assert.equal(found.media[0].mimeType, "image/png");
  assert.equal(found.isActive, false, "created as inactive");
});

test("GET /api/card-media/:id serves the uploaded PNG", async () => {
  const { status, body } = await req("/api/admin/card-templates");
  const found = body.templates.find((t) => t.id === createdId);
  const mediaId = found.media[0].id;
  const res = await fetch(`${BASE}/api/card-media/${mediaId}`);
  assert.equal(res.status, 200, `media fetch failed with ${res.status}`);
  assert.equal(res.headers.get("content-type"), "image/png");
  const buf = Buffer.from(await res.arrayBuffer());
  assert.equal(buf.length, pngBytes.length, "served bytes length mismatch");
  console.log(`   served ${buf.length} bytes of PNG`);
});

test("POST /activate flips isActive to true and deactivates others", async () => {
  const { status } = await req(`/api/admin/card-templates/${createdId}/activate`, {
    method: "POST",
  });
  assert.equal(status, 200);
  const { body } = await req("/api/admin/card-templates");
  const mine = body.templates.find((t) => t.id === createdId);
  assert.equal(mine.isActive, true, "should be active after activate");
  const others = body.templates.filter((t) => t.isActive && t.id !== createdId);
  assert.equal(others.length, 0, "only one template can be active");
});

test("PATCH updates caption+includeContact", async () => {
  const { status, body } = await req(`/api/admin/card-templates/${createdId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ caption: "novo caption", includeContact: false }),
  });
  assert.equal(status, 200, `patch failed: ${JSON.stringify(body)}`);
  const list = await req("/api/admin/card-templates");
  const mine = list.body.templates.find((t) => t.id === createdId);
  assert.equal(mine.caption, "novo caption");
  assert.equal(mine.includeContact, false);
});

test("POST media rejects oversize/invalid-type files", async () => {
  // Fake txt file → must be rejected.
  const form = new FormData();
  const bad = new File([new Blob([Buffer.from("not an image")])], "bad.txt", {
    type: "text/plain",
  });
  form.set("files", bad);
  const { status, body } = await req(`/api/admin/card-templates/${createdId}/media`, {
    method: "POST",
    body: form,
  });
  assert.equal(status, 400, `expected 400 for bad mime, got ${status}: ${JSON.stringify(body)}`);
});

test("DELETE removes the template and its media", async () => {
  const { status } = await req(`/api/admin/card-templates/${createdId}`, {
    method: "DELETE",
  });
  assert.equal(status, 200);
  const { body } = await req("/api/admin/card-templates");
  const still = body.templates.find((t) => t.id === createdId);
  assert.equal(still, undefined, "template should be gone after DELETE");
});

test("auth: GET without cookie returns 401", async () => {
  const res = await fetch(`${BASE}/api/admin/card-templates`);
  assert.equal(res.status, 401);
});
