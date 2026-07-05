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
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          background: "#060a14",
          borderRadius: 7,
          padding: "0 6px",
        }}
      >
        <div style={{ height: 3, width: 14, borderRadius: 2, background: "#8d99b2" }} />
        <div style={{ height: 3, width: 20, borderRadius: 2, background: "#3ce8b4" }} />
        <div style={{ height: 3, width: 10, borderRadius: 2, background: "#8d99b2" }} />
      </div>
    ),
    {
      ...size,
    },
  );
}
