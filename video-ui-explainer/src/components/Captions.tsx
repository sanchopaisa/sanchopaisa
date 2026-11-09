import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import type { Token } from "../timeline";
import { pop } from "../anim";

// Caja de selección estilo Figma alrededor de una palabra clave.
const Selection: React.FC<{ progress: number }> = ({ progress }) => {
  const h = 14;
  const handle = (s: React.CSSProperties) => (
    <div style={{ position: "absolute", width: h, height: h, background: "#fff", border: `2.5px solid ${theme.blueSel}`, ...s }} />
  );
  return (
    <div
      style={{
        position: "absolute",
        inset: "-6px -12px",
        border: `3px solid ${theme.blueSel}`,
        background: "rgba(59,91,219,0.28)",
        opacity: progress,
        transform: `scale(${0.85 + 0.15 * progress})`,
      }}
    >
      {handle({ left: -h / 2 - 1, top: -h / 2 - 1 })}
      {handle({ right: -h / 2 - 1, top: -h / 2 - 1 })}
      {handle({ left: -h / 2 - 1, bottom: -h / 2 - 1 })}
      {handle({ right: -h / 2 - 1, bottom: -h / 2 - 1 })}
    </div>
  );
};

// Subtítulos palabra a palabra: la palabra que suena va en blanco, las anteriores en gris,
// y las palabras clave llevan la caja de selección.
export const Captions: React.FC<{ tokens: Token[]; top?: number; size?: number }> = ({ tokens, top = 330, size = 66 }) => {
  const f = useCurrentFrame();
  const started = tokens.filter((t) => t.start <= f);
  const current = started[started.length - 1];
  if (!current) return null;
  // Tras una pausa larga se oculta el subtítulo.
  if (f > current.end + 20) return null;
  const line = tokens.filter((t) => t.chunk === current.chunk && t.start <= f);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 80,
        right: 80,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "0 22px",
        fontFamily: theme.font,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: -1,
        zIndex: 50,
      }}
    >
      {line.map((t, i) => {
        const p = pop(f, t.start, 16);
        const active = t === current;
        const color = t.keyword || active ? "#fff" : theme.captionDim;
        return (
          <span
            key={i}
            style={{
              position: "relative",
              color,
              opacity: interpolate(p, [0, 1], [0, 1]),
              transform: `translateY(${(1 - p) * 18}px)`,
              filter: `blur(${(1 - Math.min(p, 1)) * 6}px)`,
              textShadow: "0 4px 24px rgba(0,0,0,0.6)",
            }}
          >
            {t.keyword && <Selection progress={Math.min(1, p)} />}
            <span style={{ position: "relative" }}>{t.text}</span>
          </span>
        );
      })}
    </div>
  );
};
