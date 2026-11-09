import { spring, useCurrentFrame } from "remotion";
import { FPS, H } from "./time";

const COLORS: Record<string, string> = { narrador: "#ffffff", reloj: "#ffd35a", lia: "#7ff0dd", abuelo: "#bcd7ff" };

type Tok = { text: string; kw: boolean; s: number; e: number; who: string; chunk: number };
const TOKS: Tok[] = (() => {
  const out: Tok[] = [];
  let chunk = 0;
  for (const l of H.lines) {
    let len = 0;
    l.words.forEach((w, i) => {
      if (i > 0 && len + w.text.length > 18) {
        chunk++;
        len = 0;
      }
      out.push({ text: w.text, kw: w.kw, s: Math.round(w.s * FPS), e: Math.round(w.e * FPS), who: l.who, chunk });
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

// Subtítulos palabra a palabra (estilo aprendido): palabra activa grande, palabras clave con caja de selección.
export const StoryCaptions: React.FC<{ top?: number }> = ({ top = 1330 }) => {
  const f = useCurrentFrame();
  const started = TOKS.filter((t) => t.s <= f);
  const cur = started[started.length - 1];
  if (!cur || f > cur.e + 12) return null;
  const line = TOKS.filter((t) => t.chunk === cur.chunk && t.s <= f);
  const color = COLORS[cur.who] ?? "#fff";
  return (
    <div style={{ position: "absolute", top, left: 70, right: 70, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 22px", fontFamily: "Inter, system-ui", fontWeight: 900, fontSize: 76, letterSpacing: -1, zIndex: 10 }}>
      {line.map((t, i) => {
        const p = spring({ frame: f - t.s, fps: FPS, config: { damping: 12, mass: 0.6 } });
        const active = t === cur;
        return (
          <span key={i} style={{ position: "relative", transform: `scale(${(active ? 1.08 : 1) * (0.7 + 0.3 * p)})`, opacity: Math.min(1, p * 2), color: active || t.kw ? color : "rgba(255,255,255,0.78)" }}>
            {t.kw && (
              <span style={{ position: "absolute", inset: "2px -12px", border: `4px solid ${color}`, background: "rgba(0,0,0,0.35)", borderRadius: 6 }}>
                {[{ left: -9, top: -9 }, { right: -9, top: -9 }, { left: -9, bottom: -9 }, { right: -9, bottom: -9 }].map((s, k) => (
                  <span key={k} style={{ position: "absolute", width: 14, height: 14, background: "#fff", border: `3px solid ${color}`, ...s }} />
                ))}
              </span>
            )}
            <span style={{ position: "relative", WebkitTextStroke: "14px rgba(10,8,20,0.85)", paintOrder: "stroke fill" }}>{t.text}</span>
          </span>
        );
      })}
    </div>
  );
};
