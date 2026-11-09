// Ilustraciones vectoriales (origen en el centro de cada dibujo).
import React from "react";

const Eyes: React.FC<{ y?: number; dx?: number; r?: number; f: number }> = ({ y = 0, dx = 22, r = 12, f }) => {
  const b = f % 90 < 4 ? 0.15 : 1;
  return (
    <g>
      {[-dx, dx].map((x) => (
        <g key={x} transform={`translate(${x},${y}) scale(1,${b})`}>
          <ellipse rx={r} ry={r * 1.2} fill="#fff" />
          <circle cx={2} cy={2} r={r * 0.6} fill="#1b1030" />
          <circle cx={-1} cy={-3} r={r * 0.22} fill="#fff" />
        </g>
      ))}
    </g>
  );
};

export const Pyramid: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <ellipse cy={95} rx={150} ry={18} fill="#c99a52" opacity={0.6} />
    <path d="M 0 -110 L 140 95 L 0 95 Z" fill="#d9a85b" />
    <path d="M 0 -110 L -140 95 L 0 95 Z" fill="#f2c879" />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${-140 + i * 18} ${95 - i * 40} L ${140 - i * 18} ${95 - i * 40}`} stroke="#c08d44" strokeWidth={3} opacity={0.5} />)}
  </g>
);

export const Cleopatra: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M -95 -40 Q -100 -120 0 -125 Q 100 -120 95 -40 L 100 90 L -100 90 Z" fill="#141018" />
    <ellipse cy={10} rx={68} ry={82} fill="#c98b5e" />
    <path d="M -72 -30 Q 0 -70 72 -30 L 72 -55 Q 0 -100 -72 -55 Z" fill="#141018" />
    <rect x={-80} y={-58} width={160} height={14} rx={6} fill="#f2c14e" />
    <path d="M 0 -60 q 10 -30 0 -40 q -14 6 -6 18" fill="none" stroke="#2fb36f" strokeWidth={8} strokeLinecap="round" />
    <circle cx={0} cy={-51} r={8} fill="#1e90ff" />
    <Eyes y={0} dx={26} r={11} f={f} />
    <path d="M -42 -6 l -16 -6 M 42 -6 l 16 -6" stroke="#141018" strokeWidth={5} strokeLinecap="round" />
    <path d="M -16 48 Q 0 58 16 48" stroke="#8a2a3a" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M -70 80 Q 0 120 70 80 L 80 110 Q 0 150 -80 110 Z" fill="#f2c14e" />
    <path d="M -60 92 Q 0 126 60 92" stroke="#1e90ff" strokeWidth={8} fill="none" />
  </g>
);

export const Moon: React.FC<{ s?: number; flag?: boolean }> = ({ s = 1, flag = true }) => (
  <g transform={`scale(${s})`}>
    <circle r={100} fill="#d9dbe6" />
    <circle cx={-35} cy={-25} r={22} fill="#b9bccb" />
    <circle cx={40} cy={30} r={16} fill="#b9bccb" />
    <circle cx={-20} cy={50} r={10} fill="#b9bccb" />
    {flag && (
      <g transform="translate(30,-90)">
        <rect x={0} y={-80} width={5} height={85} fill="#eee" />
        <rect x={5} y={-80} width={60} height={38} fill="#ff5d5d" />
        <rect x={5} y={-80} width={24} height={20} fill="#3b5bdb" />
      </g>
    )}
  </g>
);

export const Sun: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <circle r={150} fill="rgba(255,190,60,0.25)" />
    {Array.from({ length: 12 }).map((_, i) => (
      <path key={i} d="M 0 -105 L 12 -135 L -12 -135 Z" fill="#ffb84d" transform={`rotate(${i * 30 + f / 3})`} />
    ))}
    <circle r={95} fill="#ffcf4a" />
    <circle r={95} fill="none" stroke="#ffb02e" strokeWidth={8} />
    <Eyes y={-10} dx={30} r={13} f={f} />
    <path d="M -24 30 Q 0 50 24 30" stroke="#a65a00" strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>
);

export const Venus: React.FC<{ spin: number; s?: number }> = ({ spin, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <defs>
      <clipPath id="venusClip"><circle r={70} /></clipPath>
    </defs>
    <circle r={70} fill="#e8b36a" />
    <g clipPath="url(#venusClip)">
      {[-40, -10, 20, 48].map((y, i) => (
        <path key={i} d={`M -90 ${y} Q 0 ${y + 14} 90 ${y}`} stroke="#d39a4f" strokeWidth={12} fill="none" transform={`translate(${((spin * 0.6 + i * 30) % 180) - 90},0)`} />
      ))}
    </g>
    <circle r={70} fill="none" stroke="#c88a40" strokeWidth={5} />
    {/* marcador de "un punto fijo" que gira con el planeta */}
    <g transform={`rotate(${spin})`}>
      <circle cy={-70} r={12} fill="#ff4d6d" stroke="#fff" strokeWidth={4} />
    </g>
  </g>
);

export const Shark: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => {
  const t = Math.sin(f / 5) * 10;
  return (
    <g transform={`scale(${s})`}>
      <path d={`M 170 0 L 230 ${-50 + t} L 215 0 L 230 ${50 + t} Z`} fill="#6f8aa6" />
      <path d="M -190 5 Q -150 -60 0 -55 Q 140 -50 190 -5 Q 140 50 0 45 Q -150 50 -190 5 Z" fill="#7f9cba" />
      <path d="M -190 5 Q -150 40 0 45 Q 140 50 190 -5 Q 120 25 0 22 Q -130 22 -190 5 Z" fill="#e8eef4" />
      <path d="M -10 -52 L 30 -130 L 60 -50 Z" fill="#6f8aa6" />
      <path d="M -20 30 L 20 90 L 40 35 Z" fill="#6f8aa6" />
      {[0, 1, 2].map((i) => <path key={i} d={`M ${-90 + i * 16} -12 q 6 18 0 34`} stroke="#5d7894" strokeWidth={4} fill="none" />)}
      <circle cx={-135} cy={-14} r={9} fill="#141a24" />
      <path d="M -175 18 Q -150 28 -125 18" stroke="#141a24" strokeWidth={4} fill="none" />
    </g>
  );
};

export const Tree: React.FC<{ s?: number; grow?: number; color?: string }> = ({ s = 1, grow = 1, color = "#2fbf71" }) => (
  <g transform={`scale(${s})`}>
    <g transform={`scale(${grow})`} style={{ transformOrigin: "0 120px" }}>
      <rect x={-18} y={0} width={36} height={120} rx={8} fill="#7a4a24" />
      <circle cy={-30} r={78} fill={color} />
      <circle cx={-55} cy={10} r={50} fill={color} />
      <circle cx={55} cy={10} r={50} fill={color} />
      <circle cx={-20} cy={-60} r={30} fill="#ffffff" opacity={0.12} />
    </g>
  </g>
);

export const Octopus: React.FC<{ f: number; s?: number; hearts?: number; blue?: number }> = ({ f, s = 1, hearts = 0, blue = 0 }) => (
  <g transform={`scale(${s})`}>
    {Array.from({ length: 8 }).map((_, i) => {
      const x0 = -90 + i * 26;
      const w = Math.sin(f / 9 + i) * 30;
      return <path key={i} d={`M ${x0} 40 Q ${x0 + w - (i - 3.5) * 25} 170 ${x0 + (i - 3.5) * 40 + w} 250`} stroke="#b04ad6" strokeWidth={34 - Math.abs(i - 3.5) * 2} fill="none" strokeLinecap="round" />;
    })}
    <path d="M -130 60 Q -150 -190 0 -200 Q 150 -190 130 60 Q 0 100 -130 60 Z" fill="#c35ee8" />
    <ellipse cx={-50} cy={-120} rx={30} ry={18} fill="#fff" opacity={0.15} />
    {[[-80, -40], [70, -70], [10, -150]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={10} fill="#a23fc9" />)}
    <Eyes y={10} dx={45} r={22} f={f} />
    <path d="M -20 55 Q 0 70 20 55" stroke="#4a1460" strokeWidth={7} fill="none" strokeLinecap="round" />
    {/* tres corazones que laten */}
    {[[-55, -90], [55, -90], [0, -40]].map(([x, y], i) => {
      const b = 1 + Math.max(0, Math.sin(f / 4 + i)) * 0.18;
      return (
        <g key={i} transform={`translate(${x},${y}) scale(${hearts * b})`}>
          <circle r={34} fill="rgba(255,80,120,0.35)" />
          <path d="M 0 18 C -40 -8 -22 -36 0 -18 C 22 -36 40 -8 0 18 Z" fill={blue > 0.5 ? "#3f8cff" : "#ff4d7a"} stroke="#fff" strokeWidth={3} />
        </g>
      );
    })}
  </g>
);

export const Banana: React.FC<{ f: number; s?: number; glow?: number; face?: boolean }> = ({ f, s = 1, glow = 0, face = true }) => (
  <g transform={`scale(${s}) rotate(${Math.sin(f / 15) * 4})`}>
    {glow > 0 && <circle r={170} fill={`rgba(140,255,90,${0.22 * glow})`} />}
    <path d="M -150 -40 Q -60 110 150 -20 Q 120 30 -10 60 Q -130 70 -160 -30 Z" fill="#ffd93b" />
    <path d="M -150 -40 Q -60 110 150 -20 Q 60 50 -40 50 Q -120 40 -150 -40 Z" fill="#f4c21f" />
    <path d="M 150 -20 L 172 -36" stroke="#6b4a1a" strokeWidth={12} strokeLinecap="round" />
    <path d="M -158 -34 L -170 -44" stroke="#3b2a12" strokeWidth={10} strokeLinecap="round" />
    {face && (
      <g transform="translate(-10,10)">
        <Eyes y={0} dx={22} r={10} f={f} />
        <path d="M -12 24 Q 0 34 12 24" stroke="#6b4a1a" strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
    )}
  </g>
);

export const Radiation: React.FC<{ s?: number; r?: number }> = ({ s = 1, r = 0 }) => (
  <g transform={`scale(${s}) rotate(${r})`}>
    <circle r={60} fill="#ffd400" stroke="#111" strokeWidth={6} />
    {[0, 120, 240].map((a) => <path key={a} d="M 0 0 L 48 -20 A 52 52 0 0 0 24 -45 Z" fill="#111" transform={`rotate(${a}) translate(0,0) rotate(-30)`} />)}
    <circle r={12} fill="#111" />
  </g>
);

export const Strawberry: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M 0 140 C -120 80 -130 -40 -90 -70 Q 0 -100 90 -70 C 130 -40 120 80 0 140 Z" fill="#ff3b5c" />
    {Array.from({ length: 14 }).map((_, i) => <ellipse key={i} cx={-70 + (i % 5) * 35 + (Math.floor(i / 5) % 2) * 17} cy={-20 + Math.floor(i / 5) * 45} rx={5} ry={8} fill="#ffe08a" />)}
    <path d="M 0 -80 L -60 -110 L -30 -80 L -70 -70 L 0 -70 L 70 -70 L 30 -80 L 60 -110 Z" fill="#2fbf71" />
    <rect x={-5} y={-125} width={10} height={40} rx={4} fill="#2fbf71" />
    <g transform="translate(0,10)">
      <Eyes y={0} dx={26} r={11} f={f} />
      <path d="M -14 30 Q 0 40 14 30" stroke="#7a0f22" strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  </g>
);

export const Galaxy: React.FC<{ f: number; s?: number }> = ({ f, s = 1 }) => (
  <g transform={`scale(${s}) rotate(${f * 0.3})`}>
    <ellipse rx={260} ry={110} fill="rgba(160,130,255,0.15)" />
    {Array.from({ length: 260 }).map((_, i) => {
      const arm = i % 2;
      const t = (i / 260) * 4.5;
      const a = t * 2.2 + arm * Math.PI;
      const rr = 20 + t * 55;
      const j = Math.sin(i * 12.9898) * 14;
      return <circle key={i} cx={Math.cos(a) * rr + j} cy={(Math.sin(a) * rr + j) * 0.45} r={1.5 + (i % 4) * 0.6} fill={i % 7 ? "#e6e1ff" : "#ffd27a"} opacity={0.9 - t * 0.12} />;
    })}
    <ellipse rx={50} ry={24} fill="#fff4d6" />
    <ellipse rx={90} ry={40} fill="rgba(255,240,200,0.35)" />
  </g>
);
