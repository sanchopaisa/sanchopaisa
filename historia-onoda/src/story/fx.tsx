import React from "react";

// Chispas doradas que viajan de A a B (segundos de tiempo).
export const GoldStream: React.FC<{ f: number; from: [number, number]; to: [number, number]; start: number; dur: number; n?: number }> = ({ f, from, to, start, dur, n = 40 }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const t0 = start + (i / n) * dur * 0.7;
      const p = (f - t0) / (dur * 0.35);
      if (p < 0 || p > 1) return null;
      const e = p * p * (3 - 2 * p);
      const arc = Math.sin(p * Math.PI) * (120 + (i % 5) * 30) * (i % 2 ? 1 : -0.6);
      const x = from[0] + (to[0] - from[0]) * e + Math.cos(i) * 20;
      const y = from[1] + (to[1] - from[1]) * e - arc;
      return (
        <g key={i}>
          <circle cx={x} cy={y} r={14} fill="rgba(255,200,80,0.3)" />
          <circle cx={x} cy={y} r={6} fill="#ffe7a0" />
        </g>
      );
    })}
  </g>
);

// Onda expansiva (congelar el tiempo).
export const Ripple: React.FC<{ f: number; at: number; x: number; y: number; color?: string }> = ({ f, at, x, y, color = "180,220,255" }) => {
  const p = (f - at) / 22;
  if (p < 0 || p > 1.4) return null;
  return (
    <g>
      {[0, 0.2, 0.4].map((d) => {
        const q = Math.max(0, p - d);
        return <circle key={d} cx={x} cy={y} r={q * 1400} fill="none" stroke={`rgba(${color},${Math.max(0, 0.8 - q)})`} strokeWidth={30 * (1 - Math.min(1, q))} />;
      })}
    </g>
  );
};

// Píldora "+10 s" que sube y se desvanece.
export const PlusTen: React.FC<{ f: number; at: number; x: number; y: number; label?: string }> = ({ f, at, x, y, label = "+10 s" }) => {
  const p = (f - at) / 40;
  if (p < 0 || p > 1) return null;
  const s = Math.min(1, p * 5);
  return (
    <g transform={`translate(${x},${y - p * 160}) scale(${s})`} opacity={1 - Math.max(0, p - 0.7) / 0.3}>
      <rect x={-110} y={-48} width={220} height={96} rx={48} fill="#ffcf4a" />
      <text textAnchor="middle" y={20} fontSize={56} fontWeight={900} fontFamily="Inter, system-ui" fill="#5a3a00">{label}</text>
    </g>
  );
};

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.55 }) => (
  <g>
    <defs>
      <radialGradient id="vig" cx="50%" cy="50%" r="75%">
        <stop offset="55%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor={`rgba(0,0,0,${strength})`} />
      </radialGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#vig)" />
  </g>
);
