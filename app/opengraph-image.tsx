import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "NuPtechs — Custom Software Development with AI";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#0d0d0f",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow TL */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            left: "-100px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)",
          }}
        />
        {/* Glow BR */}
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            right: "-80px",
            width: "440px",
            height: "440px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)",
          }}
        />

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
            <span style={{ color: "#ffffff", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.5px" }}>
              NuPtechs
            </span>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "64px",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-2.5px",
                margin: 0,
                maxWidth: "800px",
              }}
            >
              Software sob medida.{"\n"}
              <span style={{ color: "#818cf8" }}>Entregue em semanas.</span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.50)",
                fontSize: "22px",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "680px",
                fontWeight: 400,
              }}
            >
              Automação com IA, sistemas personalizados e protótipos em 7 dias para empresas de todo porte.
            </p>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.30)",
                borderRadius: "999px",
                padding: "10px 22px",
              }}
            >
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", fontWeight: 500 }}>
                Diagnóstico grátis · 24h · Sem compromisso
              </span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "15px" }}>
              www.nuptechs.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
