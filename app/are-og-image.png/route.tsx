import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#F5F6FA",
          color: "#222735",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.1 }}>
          ARE by Optimizer360
        </div>
        <div style={{ fontSize: 34, marginTop: 14, color: "#646D82" }}>
          Distribution infrastructure on autopilot
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
