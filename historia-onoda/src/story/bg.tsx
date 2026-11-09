// Fondos vectoriales 1080x1920.
import React from "react";

const rnd = (i: number) => {
  const x = Math.sin(i * 999.13) * 43758.5453;
  return x - Math.floor(x);
};

export const Dust: React.FC<{ f: number; n?: number; color?: string; frozen?: boolean; area?: [number, number, number, number] }> = ({ f, n = 40, color = "255,230,170", frozen = false, area = [0, 0, 1080, 1920] }) => {
  const t = frozen ? 0 : f;
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const x = area[0] + rnd(i) * area[2] + Math.sin(t / 40 + i) * 20;
        const y = area[1] + ((rnd(i + 7) * area[3] - t * (0.4 + rnd(i + 3) * 0.8)) % area[3] + area[3]) % area[3];
        const r = 2 + rnd(i + 11) * 5;
        return <circle key={i} cx={x} cy={y} r={r} fill={`rgba(${color},${0.25 + rnd(i + 5) * 0.5})`} />;
      })}
    </g>
  );
};

export const Void: React.FC<{ tint?: string }> = ({ tint = "#2a1c10" }) => (
  <g>
    <defs>
      <radialGradient id="void" cx="50%" cy="45%" r="70%">
        <stop offset="0%" stopColor={tint} />
        <stop offset="100%" stopColor="#07060a" />
      </radialGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#void)" />
  </g>
);

export const Attic: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <defs>
      <linearGradient id="atticWall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1b1530" />
        <stop offset="100%" stopColor="#2b1f3a" />
      </linearGradient>
      <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(190,210,255,0.45)" />
        <stop offset="100%" stopColor="rgba(190,210,255,0)" />
      </linearGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#atticWall)" />
    {/* tejado */}
    <path d="M 0 700 L 540 120 L 1080 700 L 1080 0 L 0 0 Z" fill="#110d1f" />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M ${120 + i * 70} ${560 - i * 75} L ${120 + i * 70} 1500`} stroke="#3a2a45" strokeWidth={26} />
    ))}
    <path d="M 0 700 L 540 120 L 1080 700" stroke="#4a3550" strokeWidth={40} fill="none" />
    {/* ventana redonda con luna */}
    <circle cx={540} cy={470} r={130} fill="#9fb6e8" />
    <circle cx={590} cy={430} r={52} fill="#fdf6d8" />
    <circle cx={540} cy={470} r={130} fill="none" stroke="#4a3550" strokeWidth={22} />
    <path d="M 410 470 L 670 470 M 540 340 L 540 600" stroke="#4a3550" strokeWidth={12} />
    <path d="M 430 520 L 650 520 L 860 1700 L 220 1700 Z" fill="url(#beam)" />
    {/* suelo y cajas */}
    <rect y={1500} width={1080} height={420} fill="#2a1d25" />
    {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={0} y={1500 + i * 55} width={1080} height={3} fill="#1f151c" />)}
    <rect x={40} y={1260} width={240} height={250} rx={10} fill="#6d4a32" />
    <rect x={40} y={1260} width={240} height={40} fill="#7d573c" />
    <rect x={800} y={1310} width={230} height={200} rx={10} fill="#5e3f2b" />
    <rect x={840} y={1170} width={160} height={140} rx={8} fill="#7d573c" />
    <Dust f={f} n={45} area={[250, 500, 600, 1300]} color="230,235,255" />
  </g>
);

export const Street: React.FC<{ f: number; frozen?: boolean }> = ({ f, frozen }) => (
  <g>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7cc7ff" />
        <stop offset="100%" stopColor="#d9f0ff" />
      </linearGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#sky)" />
    {[0, 1].map((i) => (
      <g key={i} transform={`translate(${((i * 600 + (frozen ? 0 : f * 0.4)) % 1400) - 300},${300 + i * 80})`}>
        <ellipse rx={130} ry={50} fill="#fff" />
        <ellipse cx={-80} cy={20} rx={80} ry={40} fill="#fff" />
        <ellipse cx={90} cy={20} rx={90} ry={40} fill="#fff" />
      </g>
    ))}
    {[["#f4a259", 0, 700, 300], ["#5b8e7d", 280, 560, 260], ["#bc4b51", 520, 760, 280], ["#8cb369", 780, 620, 300]].map(([c, x, y, w], i) => (
      <g key={i}>
        <rect x={x as number} y={y as number} width={w as number} height={1500 - (y as number)} fill={c as string} />
        {Array.from({ length: 4 }).map((_, k) => (
          <rect key={k} x={(x as number) + 40 + (k % 2) * 120} y={(y as number) + 80 + Math.floor(k / 2) * 180} width={70} height={100} rx={8} fill="#fff6d6" opacity={0.85} />
        ))}
      </g>
    ))}
    <rect y={1450} width={1080} height={110} fill="#c9c3b8" />
    <rect y={1560} width={1080} height={360} fill="#555b66" />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={60 + i * 280} y={1720} width={150} height={16} fill="#f2f2f2" />)}
  </g>
);

export const Room: React.FC<{ f: number; dim?: number }> = ({ f, dim = 0 }) => (
  <g>
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f1d3a8" />
        <stop offset="100%" stopColor="#e2b98a" />
      </linearGradient>
      <radialGradient id="lamp" cx="22%" cy="40%" r="50%">
        <stop offset="0%" stopColor="rgba(255,220,150,0.55)" />
        <stop offset="100%" stopColor="rgba(255,220,150,0)" />
      </radialGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#wall)" />
    {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={i * 95} y={0} width={4} height={1450} fill="#dcb07e" opacity={0.5} />)}
    {/* ventana */}
    <rect x={620} y={360} width={340} height={440} rx={16} fill="#3d4e86" />
    <rect x={640} y={380} width={300} height={400} fill="#f6a96b" />
    <circle cx={790} cy={700} r={80} fill="#ffd27a" />
    <rect x={620} y={570} width={340} height={14} fill="#7a4825" />
    <rect x={782} y={360} width={14} height={440} fill="#7a4825" />
    {/* cuadro */}
    <rect x={150} y={420} width={240} height={190} rx={8} fill="#7a4825" />
    <rect x={170} y={440} width={200} height={150} fill="#9cc5a1" />
    <circle cx={230} cy={500} r={22} fill="#f3c7a2" />
    <circle cx={310} cy={490} r={26} fill="#e9b48c" />
    {/* lámpara */}
    <rect x={160} y={980} width={14} height={500} fill="#4a3a2a" />
    <path d="M 100 980 L 234 980 L 200 860 L 134 860 Z" fill="#f7d98b" />
    <rect width={1080} height={1920} fill="url(#lamp)" />
    {/* suelo */}
    <rect y={1450} width={1080} height={470} fill="#8a5a36" />
    {Array.from({ length: 7 }).map((_, i) => <rect key={i} x={0} y={1450 + i * 70} width={1080} height={4} fill="#6f4628" />)}
    <ellipse cx={560} cy={1640} rx={420} ry={110} fill="#b5473a" opacity={0.85} />
    <ellipse cx={560} cy={1640} rx={360} ry={86} fill="none" stroke="#e8c27a" strokeWidth={8} opacity={0.7} />
    <rect width={1080} height={1920} fill={`rgba(20,25,50,${dim * 0.45})`} />
    <Dust f={f} n={14} color="255,240,200" />
  </g>
);

export const Porch: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <defs>
      <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b2b6b" />
        <stop offset="45%" stopColor="#e66b6b" />
        <stop offset="75%" stopColor="#ffb36b" />
      </linearGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#sunset)" />
    <circle cx={540} cy={1020 + Math.sin(f / 60) * 4} r={170} fill="#ffe08a" opacity={0.95} />
    <circle cx={540} cy={1020} r={260} fill="rgba(255,224,138,0.25)" />
    <path d="M 0 1080 Q 270 940 540 1060 Q 800 960 1080 1060 L 1080 1300 L 0 1300 Z" fill="#7b4a6e" />
    <path d="M 0 1180 Q 300 1080 600 1180 Q 850 1110 1080 1170 L 1080 1400 L 0 1400 Z" fill="#5a3456" />
    {Array.from({ length: 30 }).map((_, i) => (
      <circle key={i} cx={(i * 137) % 1080} cy={(i * 71) % 520 + 40} r={2 + (i % 3)} fill="#fff" opacity={0.3 + 0.3 * Math.sin(f / 15 + i)} />
    ))}
    <rect y={1380} width={1080} height={540} fill="#6b3e1f" />
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={0} y={1380 + i * 90} width={1080} height={6} fill="#57311a" />)}
    <rect x={0} y={1200} width={1080} height={22} fill="#8d5a2f" />
    {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={30 + i * 110} y={1200} width={18} height={180} fill="#8d5a2f" />)}
  </g>
);
