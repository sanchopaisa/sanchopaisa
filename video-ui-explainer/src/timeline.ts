import { FPS } from "./theme";
import type { SceneDef } from "./types";

export type Token = { text: string; keyword: boolean; start: number; end: number; chunk: number };

// Separa "Paso *uno:* el *nicho.*" en palabras; lo que va entre *asteriscos* es palabra clave.
export const tokenize = (s: string) =>
  (s.match(/\*[^*]+\*|\S+/g) ?? []).map((t) =>
    t.startsWith("*") ? { text: t.slice(1, -1), keyword: true } : { text: t, keyword: false },
  );

export type Timeline = { scenes: { def: SceneDef; from: number; dur: number }[]; tokens: Token[]; total: number };

// Calcula cuándo empieza cada escena y cuándo se "dice" cada palabra.
// Si la escena trae `words` (tiempos de un voiceover transcrito), se usan tal cual;
// si no, las palabras se reparten según su longitud dentro de la duración de la escena.
export const buildTimeline = (defs: SceneDef[]): Timeline => {
  const scenes: Timeline["scenes"] = [];
  const tokens: Token[] = [];
  let t = 0;
  let chunk = 0;
  for (const def of defs) {
    const dur = Math.round(def.seconds * FPS);
    scenes.push({ def, from: t, dur });
    const words = tokenize(def.say ?? "");
    const pad = 4;
    const usable = dur - pad * 2;
    const weights = words.map((w) => w.text.length + 3);
    const sum = weights.reduce((a, b) => a + b, 0) || 1;
    let acc = 0;
    let lineLen = 0;
    words.forEach((w, i) => {
      const timed = def.words?.[i];
      const start = timed ? Math.round(timed[0] * FPS) : t + pad + Math.round((acc / sum) * usable);
      acc += weights[i];
      const end = timed ? Math.round(timed[1] * FPS) : t + pad + Math.round((acc / sum) * usable);
      // Nueva línea de subtítulo cada ~3 palabras / 20 caracteres o tras puntuación.
      if (lineLen > 0 && (lineLen + w.text.length > 20 || i === 0)) {
        chunk++;
        lineLen = 0;
      }
      tokens.push({ ...w, start, end, chunk });
      lineLen += w.text.length + 1;
      if (/[.,:;!?]$/.test(w.text)) {
        chunk++;
        lineLen = 0;
      }
    });
    chunk++;
    t += dur;
  }
  return { scenes, tokens, total: t };
};
