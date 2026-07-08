import { ImageResponse } from "next/og";

export const alt = "Athens Creative English — English, taught like an art";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF3E7",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {["#E8503A", "#2B50C8", "#F5B933", "#3E8E5A"].map((c) => (
              <div key={c} style={{ width: 26, height: 26, borderRadius: 13, background: c }} />
            ))}
          </div>
          <div style={{ fontSize: 30, color: "#211D19", opacity: 0.7, letterSpacing: 6 }}>
            AN ENGLISH STUDIO IN GKYZI, ATHENS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 700, color: "#211D19", lineHeight: 1.02 }}>
            English, taught
          </div>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 700, lineHeight: 1.02 }}>
            <span style={{ color: "#211D19" }}>like&nbsp;</span>
            <span style={{ color: "#E8503A", fontStyle: "italic" }}>an art.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 34,
            color: "#211D19",
          }}
        >
          <div style={{ display: "flex", fontWeight: 700 }}>Athens Creative English</div>
          <div style={{ display: "flex", opacity: 0.65 }}>art · music · play · speak</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
