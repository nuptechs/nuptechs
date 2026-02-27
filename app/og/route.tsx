import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Software that works.\nDelivered in weeks.";
  const sub =
    searchParams.get("sub") ??
    "Custom software development, AI automation and ready-made products for companies of all sizes.";
  const lang = searchParams.get("lang") ?? "en";

  const tagline =
    lang === "es"
      ? "Diagnóstico gratis · 24h · Sin compromiso"
      : lang === "en"
      ? "Free diagnosis · 24h · No commitment"
      : "Diagnóstico grátis · 24h · Sem compromisso";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#0d0d0f",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent glow top-left */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Accent glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-60px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 72px",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#6366f1",
              }}
            />
            <span
              style={{
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              NuPtechs
            </span>
          </div>

          {/* Main copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h1
              style={{
                color: "#ffffff",
                fontSize: title.length > 40 ? "52px" : "64px",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-2px",
                margin: 0,
                maxWidth: "820px",
                whiteSpace: "pre-line",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "22px",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "700px",
                fontWeight: 400,
              }}
            >
              {sub}
            </p>
          </div>

          {/* Footer bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "999px",
                padding: "10px 20px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                {tagline}
              </span>
            </div>
            <span
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "15px",
              }}
            >
              www.nuptechs.com
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
