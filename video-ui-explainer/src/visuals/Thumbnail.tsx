import { theme } from "../theme";
import type { Thumb } from "../types";

// Miniatura de YouTube genérica: degradado del color + palabra grande + duración.
export const Thumbnail: React.FC<{ v: Thumb; w: number; overlay?: React.ReactNode }> = ({ v, w, overlay }) => {
  const h = (w * 9) / 16;
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: w * 0.04, overflow: "hidden", background: `linear-gradient(135deg, ${v.color}, #0b1020 140%)`, fontFamily: theme.font }}>
      <svg viewBox="0 0 100 56" width={w} height={h} style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
        <circle cx="76" cy="22" r="16" fill="none" stroke="#fff" strokeWidth="3" />
        <path d="M60 40 Q76 30 92 40" fill="none" stroke="#fff" strokeWidth="3" />
      </svg>
      <div style={{ position: "absolute", left: w * 0.05, bottom: h * 0.12, color: "#fff", fontWeight: 900, fontSize: w * 0.13, letterSpacing: -1, textShadow: "0 4px 14px rgba(0,0,0,0.5)" }}>{v.word}</div>
      <div style={{ position: "absolute", right: w * 0.03, bottom: w * 0.03, background: "rgba(0,0,0,0.8)", color: "#fff", fontWeight: 700, fontSize: w * 0.045, padding: `${w * 0.006}px ${w * 0.015}px`, borderRadius: w * 0.012 }}>8:42</div>
      {overlay}
    </div>
  );
};

export const VideoMeta: React.FC<{ v: Thumb; scale?: number }> = ({ v, scale = 1 }) => (
  <div style={{ fontFamily: theme.font, padding: `${14 * scale}px ${4 * scale}px 0` }}>
    <div style={{ fontWeight: 800, fontSize: 26 * scale, lineHeight: 1.15, color: theme.ink }}>{v.title}</div>
    <div style={{ fontSize: 20 * scale, color: theme.inkSoft, marginTop: 6 * scale }}>{v.channel}</div>
    <div style={{ fontSize: 24 * scale, fontWeight: 800, color: theme.ink, marginTop: 4 * scale }}>{v.views}</div>
    <div style={{ fontSize: 18 * scale, color: theme.inkSoft }}>{v.ago}</div>
  </div>
);
