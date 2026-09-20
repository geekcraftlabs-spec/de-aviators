import { ImageResponse } from "next/og";
import { logoSvgDataUri } from "@/lib/logo-svg";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "De Aviators Renovations and Construction (PTY) LTD";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B0C",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSvgDataUri} width={760} alt="" />
      </div>
    ),
    size
  );
}