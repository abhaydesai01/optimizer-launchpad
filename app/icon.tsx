import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111827",
          borderRadius: 7,
          position: "relative",
        }}
      >
        <div
          style={{
            color: "#F9FAFB",
            fontSize: 20,
            fontWeight: 800,
            lineHeight: 1,
            fontFamily: "Inter, Arial, sans-serif",
          }}
        >
          O
        </div>
        <div
          style={{
            position: "absolute",
            right: 6,
            bottom: 6,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#10B981",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
