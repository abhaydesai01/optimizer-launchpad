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
          background: "#060a14",
          color: "#eef1f8",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, rgba(60,232,180,0), rgba(60,232,180,0.9), rgba(60,232,180,0))",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 48 }}>
          <div style={{ height: 8, width: 120, borderRadius: 4, background: "#3d4a66" }} />
          <div style={{ height: 8, width: 190, borderRadius: 4, background: "#3ce8b4" }} />
          <div style={{ height: 8, width: 90, borderRadius: 4, background: "#3d4a66" }} />
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            display: "flex",
          }}
        >
          Be the brand AI recommends.
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 28,
            color: "#8d99b2",
            display: "flex",
          }}
        >
          AI SEO · Generative Engine Optimisation for enterprise brands
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            fontSize: 32,
            fontWeight: 700,
            display: "flex",
          }}
        >
          <span style={{ color: "#eef1f8" }}>Optimizer360</span>
          <span style={{ color: "#3ce8b4" }}>.ai</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 22,
            color: "#8d99b2",
            display: "flex",
          }}
        >
          We never fabricate data.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
