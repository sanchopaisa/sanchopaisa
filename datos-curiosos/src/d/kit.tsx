// Piezas comunes: fondo, barra de progreso, pastilla de dato, tarjeta de cifra, subtítulos.
import React from "react";
import { interpolate, spring, useCurrentFrame, Easing } from "remotion";
import { FPS, H } from "./time";

export const C = {
  bg: "#0d1024",
  accent: "#ffcc33",
  blue: "#4c6ef5",
  pink: "#ff5d8f",
  green: "#2fd38a",
  text: "#ffffff",
  font: "Inter, 'Segoe UI', system-ui, sans-serif",
};
export const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const lerp = (f: number, a: number, b: number, v0: number, v1: number) =>
  interpolate(f, [a, b], [v0, v1], { ...cl, easing: Easing.bezier(0.22, 1, 0.36, 1) });
export const pop = (f: number, at = 0, damping = 12) => spring({ frame: f - at, fps: FPS, config: { damping, mass: 0.6 } });
export const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const rnd = (i: number) => {
  const x = Math.sin(i * 999.13) * 43758.5453;
  return x - Math.floor(x);
};

// Fondo azul noche con estrellas que titilan y humo suave (estilo aprendido).
export const Bg: React.FC<{ hue?: string }> = ({ hue = "#1d2a6b" }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${hue} 0%, ${C.bg} 70%)`, overflow: "hidden" }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
        <filter id="smk">
          <feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves={4} seed={4} />
          <feColorMatrix type="matrix" values="0 0 0 0 0.6  0 0 0 0 0.65  0 0 0 0 1  0 0 0 1.1 -0.45" />
        </filter>
        <rect x={-100 + Math.sin(f / 80) * 40} y={-100} width={1300} height={2200} filter="url(#smk)" />
        {Array.from({ length: 70 }).map((_, i) => (
          <circle key={i} cx={rnd(i) * 1080} cy={rnd(i + 50) * 1920} r={1 + rnd(i + 9) * 2.5} fill="#fff" opacity={0.3 + 0.5 * Math.abs(Math.sin(f / 20 + i))} />
        ))}
      </svg>
    </div>
  );
};

// Barra superior: 7 segmentos que se llenan (retención).
export const Progress: React.FC<{ n: number; p: number }> = ({ n, p }) => (
  <div style={{ position: "absolute", top: 150, left: 90, right: 90, display: "flex", gap: 10 }}>
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} style={{ flex: 1, height: 12, borderRadius: 6, background: "rgba(255,255,255,0.18)", overflow: "hidden" }}>
        <div style={{ width: `${i < n - 1 ? 100 : i === n - 1 ? p * 100 : 0}%`, height: "100%", background: C.accent }} />
      </div>
    ))}
  </div>
);

export const FactPill: React.FC<{ n: number; label: string; f: number }> = ({ n, label, f }) => {
  const p = pop(f, 0);
  return (
    <div style={{ position: "absolute", top: 210, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: `scale(${p})`, display: "flex", alignItems: "center", gap: 18, padding: "14px 34px 14px 14px", borderRadius: 999, background: "rgba(10,12,30,0.75)", border: `3px solid ${C.accent}`, fontFamily: C.font, fontWeight: 800, fontSize: 40, color: "#fff", boxShadow: "0 0 40px rgba(255,204,51,0.3)" }}>
        <span style={{ width: 62, height: 62, borderRadius: "50%", background: C.accent, color: "#1a1400", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, fontWeight: 900 }}>{n}</span>
        {label}
      </div>
    </div>
  );
};

// Tarjeta blanca con cifra grande + fuente.
export const Stat: React.FC<{ f: number; at: number; big: string; small: string; source?: string; color?: string; top?: number }> = ({ f, at, big, small, source, color = C.blue, top = 1030 }) => {
  if (f < at) return null;
  const p = pop(f, at, 13);
  return (
    <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: `translateY(${(1 - p) * 60}px) scale(${0.85 + 0.15 * p})`, opacity: Math.min(1, p * 2), background: "#fff", borderRadius: 32, padding: "22px 44px", textAlign: "center", fontFamily: C.font, boxShadow: "0 30px 80px rgba(0,0,0,0.5)", minWidth: 560 }}>
        <div style={{ fontSize: 96, fontWeight: 900, color, letterSpacing: -3, lineHeight: 1.05 }}>{big}</div>
        <div style={{ fontSize: 34, fontWeight: 700, color: "#222" }}>{small}</div>
        {source && <div style={{ fontSize: 22, color: "#888", marginTop: 6 }}>Fuente: {source}</div>}
      </div>
    </div>
  );
};

type Tok = { text: string; kw: boolean; s: number; e: number; chunk: number };
const TOKS: Tok[] = (() => {
  const out: Tok[] = [];
  let chunk = 0;
  for (const l of H.lines) {
    let len = 0;
    l.words.forEach((w, i) => {
      if (i > 0 && len + w.text.length > 17) {
        chunk++;
        len = 0;
      }
      out.push({ text: w.text, kw: w.kw, s: Math.round(w.s * FPS), e: Math.round(w.e * FPS), chunk });
      len += w.text.length + 1;
      if (/[.,:;!?]$/.test(w.text)) {
        chunk++;
        len = 0;
      }
    });
    chunk++;
  }
  return out;
})();

// Subtítulos palabra a palabra con caja de selección tipo Figma en las palabras clave.
export const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const started = TOKS.filter((t) => t.s <= f);
  const cur = started[started.length - 1];
  if (!cur || f > cur.e + 12) return null;
  const line = TOKS.filter((t) => t.chunk === cur.chunk && t.s <= f);
  return (
    <div style={{ position: "absolute", top: 1370, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 22px", fontFamily: C.font, fontWeight: 900, fontSize: 80, letterSpacing: -1, zIndex: 20 }}>
      {line.map((t, i) => {
        const p = pop(f, t.s, 11);
        const active = t === cur;
        return (
          <span key={i} style={{ position: "relative", transform: `scale(${(active ? 1.1 : 1) * (0.6 + 0.4 * p)})`, opacity: Math.min(1, p * 2), color: t.kw ? C.accent : active ? "#fff" : "rgba(255,255,255,0.75)" }}>
            {t.kw && (
              <span style={{ position: "absolute", inset: "2px -12px", border: `4px solid ${C.blue}`, background: "rgba(76,110,245,0.3)" }}>
                {[{ left: -9, top: -9 }, { right: -9, top: -9 }, { left: -9, bottom: -9 }, { right: -9, bottom: -9 }].map((s, k) => (
                  <span key={k} style={{ position: "absolute", width: 14, height: 14, background: "#fff", border: `3px solid ${C.blue}`, ...s }} />
                ))}
              </span>
            )}
            <span style={{ position: "relative", WebkitTextStroke: "14px rgba(5,6,20,0.9)", paintOrder: "stroke fill" }}>{t.text}</span>
          </span>
        );
      })}
    </div>
  );
};
