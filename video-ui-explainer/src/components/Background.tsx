import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../theme";

// Fondo oscuro "humo": ruido fractal + manchas de luz que se mueven despacio.
export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const dx = Math.sin(f / 90) * 40;
  const dy = Math.cos(f / 110) * 30;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, overflow: "hidden" }}>
      <svg width="140%" height="140%" style={{ position: "absolute", left: -200 + dx, top: -300 + dy, opacity: 0.55 }}>
        <filter id="smoke">
          <feTurbulence type="fractalNoise" baseFrequency="0.0028" numOctaves={5} seed={7} />
          <feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.55  0 0 0 0 0.58  0 0 0 1.25 -0.38" />
        </filter>
        <rect width="100%" height="100%" filter="url(#smoke)" />
      </svg>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(ellipse at 50% 110%, rgba(0,0,0,0.75), transparent 55%), radial-gradient(ellipse at 50% -10%, rgba(0,0,0,0.6), transparent 50%)",
        }}
      />
    </AbsoluteFill>
  );
};
