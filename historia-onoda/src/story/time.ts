export const FPS = 30;
export type Word = { text: string; kw: boolean; s: number; e: number };
export type Line = { id: string; who: string; start: number; end: number; words: Word[]; env: number[] };
export type Hist = { titulo: string; total: number; lines: Line[] };

/** Ayudantes de tiempo para una historia: T = frame en que empieza una línea, W = frame de una palabra. */
export const mk = (h: Hist) => {
  const LINE: Record<string, Line> = Object.fromEntries(h.lines.map((l) => [l.id, l]));
  const T = (id: string) => Math.round(LINE[id].start * FPS);
  const W = (id: string, w: string) => {
    const x = LINE[id].words.find((k) => k.text.toLowerCase().includes(w.toLowerCase()));
    return Math.round((x ? x.s : LINE[id].start) * FPS);
  };
  return { H: h, T, W, TOTAL: Math.round((h.total + 1.0) * FPS) };
};
