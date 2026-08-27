import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1c1c1a",
        color: "#f7f5f1",
        fontSize: 72,
        fontFamily: "serif",
      }}
    >
      JA
    </div>,
    size,
  );
}
