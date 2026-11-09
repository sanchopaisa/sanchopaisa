import { interpolate, spring, Easing } from "remotion";
import { FPS } from "./theme";

// Entrada con rebote suave (escala/posición).
export const pop = (frame: number, delay = 0, damping = 14) =>
  spring({ frame: frame - delay, fps: FPS, config: { damping, mass: 0.7 } });

// 0→1 lineal con easing entre dos frames.
export const ramp = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

// Texto que se escribe letra a letra.
export const typed = (text: string, frame: number, start = 0, cps = 22) => {
  const n = Math.max(0, Math.floor(((frame - start) / FPS) * cps));
  return text.slice(0, n);
};

// Número que cuenta hacia arriba, formateado al estilo español (1.000.000).
export const countUp = (value: number, frame: number, start: number, dur: number) => {
  const p = ramp(frame, start, start + dur);
  return fmt(Math.round(value * p));
};

// 1234567 -> "1.234.567"
export const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
