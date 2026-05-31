import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0A0A0F",
          color: "#F0F0F5",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.1 }}>
          <span style={{ color: "#F0F0F5" }}>Optimizer</span>
          <span style={{ color: "#00E5A0" }}>360</span>
        </div>
        <div style={{ fontSize: 34, marginTop: 18, color: "#6B6B80" }}>
          Get your brand cited by every AI engine
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
