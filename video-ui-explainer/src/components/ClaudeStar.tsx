import { useCurrentFrame } from "remotion";
import { theme } from "../theme";

// Asterisco de Claude con halo naranja. `glow` 0..1 controla el brillo.
export const ClaudeStar: React.FC<{ size?: number; glow?: number; color?: string; spin?: boolean }> = ({
  size = 220,
  glow = 1,
  color = "#fbe9dc",
  spin = true,
}) => {
  const f = useCurrentFrame();
  const rays = 12;
  const lens = [1, 0.78, 0.95, 0.7, 1, 0.82, 0.92, 0.72, 1, 0.8, 0.9, 0.75];
  const pulse = 1 + Math.sin(f / 12) * 0.04;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div
        style={{
          position: "absolute",
          inset: -size * 0.9,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232,121,74,${0.55 * glow}) 0%, rgba(232,121,74,${0.18 * glow}) 30%, transparent 65%)`,
          transform: `scale(${pulse})`,
        }}
      />
      <svg
        viewBox="-50 -50 100 100"
        width={size}
        height={size}
        style={{
          position: "absolute",
          transform: `rotate(${spin ? f * 0.4 : 0}deg)`,
          filter: `drop-shadow(0 0 ${8 * glow}px ${theme.accent}) drop-shadow(0 0 ${22 * glow}px ${theme.accent})`,
        }}
      >
        {lens.slice(0, rays).map((l, i) => (
          <line
            key={i}
            x1={0}
            y1={-12}
            x2={0}
            y2={-12 - 34 * l}
            stroke={color}
            strokeWidth={6.5}
            strokeLinecap="round"
            transform={`rotate(${(360 / rays) * i})`}
          />
        ))}
      </svg>
    </div>
  );
};

// Versión pequeña en "badge" cuadrado naranja (como un icono de app).
export const ClaudeBadge: React.FC<{ size?: number }> = ({ size = 96 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.24,
      background: theme.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
    }}
  >
    <svg viewBox="-50 -50 100 100" width={size * 0.66} height={size * 0.66}>
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={0} y1={-10} x2={0} y2={-42} stroke="#fff" strokeWidth={7} strokeLinecap="round" transform={`rotate(${30 * i})`} />
      ))}
    </svg>
  </div>
);
