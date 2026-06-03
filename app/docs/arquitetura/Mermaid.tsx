"use client";
import { useEffect, useId, useState } from "react";

let initialized = false;

/** Renderiza um diagrama Mermaid no cliente (lib bundlada = CSP 'self'). */
export default function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const rid = useId().replace(/[:]/g, "");

  useEffect(() => {
    let active = true;
    import("mermaid")
      .then(({ default: mermaid }) => {
        if (!initialized) {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            theme: "dark",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            themeVariables: {
              background: "transparent",
              primaryColor: "#1b2440",
              primaryBorderColor: "#8b7cff",
              primaryTextColor: "#e9ecf5",
              lineColor: "#5b6588",
              secondaryColor: "#2a2456",
              tertiaryColor: "#0e1626",
              clusterBkg: "rgba(139,124,255,0.06)",
              clusterBorder: "rgba(139,124,255,0.25)",
              edgeLabelBackground: "#12131a",
            },
          });
          initialized = true;
        }
        return mermaid.render(`mmd-${rid}`, chart.trim());
      })
      .then((res) => {
        if (active) setSvg(res.svg);
      })
      .catch((e) => {
        if (active) setErr(String(e?.message || e));
      });
    return () => {
      active = false;
    };
  }, [chart, rid]);

  if (err) {
    return (
      <pre className="mermaid-fallback" aria-label="diagrama (fonte)">
        {chart.trim()}
      </pre>
    );
  }
  return (
    <div
      className="mermaid-diagram"
      // SVG do mermaid (securityLevel strict). style inline do SVG é coberto por style-src 'unsafe-inline'.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
