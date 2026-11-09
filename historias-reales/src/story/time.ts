import historia from "../historia.json";

export const FPS = 30;
export type Word = { text: string; kw: boolean; s: number; e: number };
export type Line = { id: string; who: string; start: number; end: number; words: Word[]; env: number[] };
export const H = historia as { titulo: string; total: number; lines: Line[] };
export const LINE: Record<string, Line> = Object.fromEntries(H.lines.map((l) => [l.id, l]));

/** frame (global) en que empieza / termina una línea */
export const T = (id: string) => Math.round(LINE[id].start * FPS);
export const E = (id: string) => Math.round(LINE[id].end * FPS);
/** frame (global) en que se dice la palabra n-ésima que contiene `w` */
export const W = (id: string, w: string) => {
  const x = LINE[id].words.find((k) => k.text.toLowerCase().includes(w.toLowerCase()));
  return Math.round((x ? x.s : LINE[id].start) * FPS);
};
/** apertura de boca (0..1) para un personaje en un frame global */
export const mouthOf = (who: string, gf: number) => {
  const l = H.lines.find((k) => k.who === who && gf >= k.start * FPS && gf < k.end * FPS);
  if (!l) return 0;
  const i = Math.floor(gf - l.start * FPS);
  const v = l.env[Math.max(0, Math.min(l.env.length - 1, i))] ?? 0;
  return v < 0.12 ? 0 : v;
};
export const TOTAL_FRAMES = Math.round((H.total + 2.2) * FPS);
