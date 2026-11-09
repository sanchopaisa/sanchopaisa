import React from "react";
import { interpolate, Easing } from "remotion";

export const FONT = "Inter, system-ui";
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const lerp = (f: number, a: number, b: number, v0: number, v1: number) => interpolate(f, [a, b], [v0, v1], { ...cl, easing: ease });
export type SceneProps = { f: number; gf: number; from: number; dur: number };

export const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 1080 1920" width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>{children}</svg>
);
export const Cam: React.FC<{ z: number; cx?: number; cy?: number; children: React.ReactNode }> = ({ z, cx = 540, cy = 960, children }) => (
  <g transform={`translate(${cx},${cy}) scale(${z}) translate(${-cx},${-cy})`}>{children}</g>
);
export const At: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; flip?: boolean; children: React.ReactNode }> = ({ x, y, s = 1, r = 0, o = 1, flip, children }) => (
  <g transform={`translate(${x},${y}) rotate(${r}) scale(${flip ? -s : s},${s})`} opacity={o}>{children}</g>
);
export const Pill: React.FC<{ x: number; y: number; text: string; f: number; at: number; color?: string; size?: number }> = ({ x, y, text, f, at, color = "#fff", size = 38 }) => {
  const p = lerp(f, at, at + 8, 0, 1);
  const w = text.length * size * 0.56 + 60;
  return (
    <g transform={`translate(${x},${y + (1 - p) * 30})`} opacity={p}>
      <rect x={-w / 2} y={-size} width={w} height={size * 1.8} rx={size * 0.9} fill="rgba(10,12,20,0.82)" stroke={color} strokeWidth={4} />
      <text textAnchor="middle" y={size * 0.32} fontFamily={FONT} fontWeight={800} fontSize={size} fill={color}>{text}</text>
    </g>
  );
};
// Bocadillo de chat (estilo interfaz aprendido).
export const Bubble: React.FC<{ x: number; y: number; w?: number; lines: string[]; f: number; at: number; mine?: boolean; name?: string }> = ({ x, y, w = 620, lines, f, at, mine, name }) => {
  const p = lerp(f, at, at + 8, 0, 1);
  const h = 70 + lines.length * 52;
  return (
    <g transform={`translate(${x},${y + (1 - p) * 40}) scale(${0.9 + 0.1 * p})`} opacity={p}>
      <rect x={0} y={0} width={w} height={h} rx={34} fill={mine ? "#ffe9a8" : "#ffffff"} />
      <path d={mine ? `M ${w - 60} ${h - 2} l 40 40 l -6 -42 Z` : "M 60 " + (h - 2) + " l -40 40 l 6 -42 Z"} fill={mine ? "#ffe9a8" : "#ffffff"} />
      {name && <text x={30} y={46} fontFamily={FONT} fontWeight={800} fontSize={28} fill="#888">{name}</text>}
      {lines.map((l, i) => <text key={i} x={30} y={(name ? 96 : 62) + i * 52} fontFamily={FONT} fontWeight={700} fontSize={40} fill="#1a1a1a">{l}</text>)}
    </g>
  );
};
// Tarjeta de año grande.
export const Year: React.FC<{ y: number | string; f: number; at?: number; x?: number; top?: number; color?: string }> = ({ y, f, at = 0, x = 540, top = 380, color = "#ffe08a" }) => {
  const w = Math.max(340, String(y).length * 52 + 80);
  return (
  <g transform={`translate(${x},${top}) scale(${lerp(f, at, at + 8, 1.4, 1)})`} opacity={lerp(f, at, at + 6, 0, 1)}>
    <rect x={-w / 2} y={-70} width={w} height={130} rx={26} fill="rgba(10,12,20,0.8)" stroke={color} strokeWidth={5} />
    <text textAnchor="middle" y={30} fontFamily={FONT} fontWeight={900} fontSize={84} fill={color}>{y}</text>
  </g>
  );
};
