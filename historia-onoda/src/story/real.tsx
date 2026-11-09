// Personajes y fondos de "La chica que cayó del cielo".
import React from "react";
import { blinkAt, Eye, Mouth, type Mood } from "./chars";

const SKIN = "#f2c9a8";

// Juliane: adolescente (vestido celeste) o adulta (bióloga con gafas y camisa de campo).
export const Juliane: React.FC<{
  f: number;
  adult?: boolean;
  mood?: Mood;
  look?: number;
  lookY?: number;
  armL?: number;
  armR?: number;
  walk?: number | null;
  hurt?: boolean;
  bob?: number;
}> = ({ f, adult = false, mood = "neutral", look = 0, lookY = 0, armL = 10, armR = -10, walk = null, hurt = false, bob = 0 }) => {
  const blink = blinkAt(f, 5);
  const legA = walk !== null ? Math.sin(walk) * 26 : 0;
  const by = walk !== null ? -Math.abs(Math.cos(walk)) * 8 : bob;
  const dress = adult ? "#8a7a4e" : "#7fb8e6";
  const dress2 = adult ? "#75683f" : "#6aa6d6";
  const hair = "#b8875a";
  const brow = mood === "worried" || mood === "sad" ? 1 : mood === "surprised" ? -1 : 0;
  return (
    <g transform={`translate(0,${by})`}>
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${s * 26},-200) rotate(${s * legA})`}>
          <rect x={-15} y={0} width={30} height={190} rx={14} fill={adult ? "#5b5140" : SKIN} />
          <ellipse cx={6} cy={192} rx={28} ry={14} fill={adult ? "#3b2f22" : "#a0522d"} />
        </g>
      ))}
      <g transform={`translate(-62,-388) rotate(${armL})`}>
        <rect x={-15} y={0} width={30} height={170} rx={15} fill={adult ? dress2 : SKIN} />
        <circle cx={0} cy={172} r={19} fill={SKIN} />
      </g>
      <path d={adult ? "M -62 -405 Q 0 -420 62 -405 L 74 -190 Q 0 -178 -74 -190 Z" : "M -58 -405 Q 0 -420 58 -405 L 100 -190 Q 0 -168 -100 -190 Z"} fill={dress} />
      {adult && <path d="M -20 -410 L 0 -370 L 20 -410" fill="#e8e0c8" />}
      {adult && <g><path d="M -40 -405 L -10 -300 M 40 -405 L 10 -300" stroke="#222" strokeWidth={5} /><rect x={-34} y={-310} width={68} height={40} rx={10} fill="#222" /><circle cx={-16} cy={-290} r={13} fill="#555" /><circle cx={16} cy={-290} r={13} fill="#555" /></g>}
      {hurt && <path d="M -50 -400 L 40 -330" stroke="#fff" strokeWidth={22} strokeLinecap="round" opacity={0.9} />}
      <g transform={`translate(62,-388) rotate(${armR})`}>
        <rect x={-15} y={0} width={30} height={170} rx={15} fill={adult ? dress2 : SKIN} />
        <circle cx={0} cy={172} r={19} fill={SKIN} />
        {hurt && <rect x={-17} y={60} width={34} height={40} rx={6} fill="#f4f4f4" />}
      </g>
      <g transform="translate(0,-525)">
        <path d={adult ? "M -112 0 Q -125 -130 0 -132 Q 125 -130 112 0 L 105 40 L -105 40 Z" : "M -112 0 Q -125 -135 0 -135 Q 125 -135 112 0 L 118 170 Q 90 185 70 140 L -70 140 Q -90 185 -118 170 Z"} fill={hair} />
        <ellipse rx={92} ry={102} fill={SKIN} />
        <path d="M -95 -20 Q -80 -110 0 -112 Q 80 -110 95 -20 Q 40 -80 -10 -60 Q -50 -80 -95 -20 Z" fill="#c99868" />
        <circle cx={-60} cy={38} r={14} fill="#ff9a8a" opacity={0.35} />
        <circle cx={60} cy={38} r={14} fill="#ff9a8a" opacity={0.35} />
        <Eye x={-34} y={8} open={blink} look={look} lookY={lookY} r={21} />
        <Eye x={34} y={8} open={blink} look={look} lookY={lookY} r={21} />
        {adult && <g fill="none" stroke="#3a3a3a" strokeWidth={5}><circle cx={-34} cy={8} r={30} /><circle cx={34} cy={8} r={30} /><path d="M -4 8 L 4 8" /></g>}
        <path d={`M -54 ${-26 - brow * 6} L -18 ${-22 + brow * 7}`} stroke="#8a6040" strokeWidth={6} strokeLinecap="round" />
        <path d={`M 54 ${-26 - brow * 6} L 18 ${-22 + brow * 7}`} stroke="#8a6040" strokeWidth={6} strokeLinecap="round" />
        <Mouth x={0} y={58} open={0} mood={mood} w={16} />
        {hurt && <path d="M 50 -50 l 26 10" stroke="#d65a5a" strokeWidth={6} strokeLinecap="round" />}
      </g>
    </g>
  );
};

// Retrato simple (cabeza y hombros) para la madre y el padre.
export const Portrait: React.FC<{ f: number; kind: "madre" | "padre"; mood?: Mood }> = ({ f, kind, mood = "happy" }) => {
  const blink = blinkAt(f, kind === "madre" ? 7 : 9);
  return (
    <g>
      <path d="M -150 230 Q -140 110 0 100 Q 140 110 150 230 Z" fill={kind === "madre" ? "#b04a4a" : "#4a6b52"} />
      {kind === "madre" && <path d="M -110 0 Q -125 -130 0 -132 Q 125 -130 110 0 L 100 90 L -100 90 Z" fill="#3a2a22" />}
      <ellipse rx={88} ry={100} fill={kind === "madre" ? "#efc4a0" : "#e8b890"} />
      {kind === "madre" ? (
        <path d="M -90 -20 Q -80 -110 0 -110 Q 80 -110 90 -20 Q 30 -70 -90 -20 Z" fill="#3a2a22" />
      ) : (
        <>
          <path d="M -88 -30 Q -70 -110 0 -112 Q 70 -110 88 -30 Q 50 -80 0 -76 Q -50 -80 -88 -30 Z" fill="#6b4a2e" />
          <path d="M -80 30 Q -70 110 0 112 Q 70 110 80 30 Q 40 60 0 60 Q -40 60 -80 30 Z" fill="#6b4a2e" />
        </>
      )}
      <Eye x={-32} y={0} open={blink} look={0} r={18} />
      <Eye x={32} y={0} open={blink} look={0} r={18} />
      {kind === "padre" && <g fill="none" stroke="#333" strokeWidth={5}><circle cx={-32} cy={0} r={27} /><circle cx={32} cy={0} r={27} /></g>}
      <Mouth x={0} y={kind === "padre" ? 72 : 55} open={0} mood={mood} w={16} />
    </g>
  );
};

// Fila de asientos de avión.
export const SeatRow: React.FC = () => (
  <g>
    {[-150, 0, 150].map((x) => (
      <g key={x} transform={`translate(${x},0)`}>
        <rect x={-62} y={-280} width={124} height={250} rx={30} fill="#3e5a8a" />
        <rect x={-66} y={-60} width={132} height={70} rx={20} fill="#34507c" />
        <rect x={-58} y={-270} width={116} height={50} rx={16} fill="#e9e9e9" opacity={0.8} />
      </g>
    ))}
    <rect x={-230} y={10} width={460} height={18} rx={8} fill="#2a2a2a" />
  </g>
);

const rnd = (i: number) => {
  const x = Math.sin(i * 999.13) * 43758.5453;
  return x - Math.floor(x);
};

export const StormSky: React.FC<{ f: number; flash?: number; rush?: number }> = ({ f, flash = 0, rush = 0 }) => (
  <g>
    <defs>
      <linearGradient id="storm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0b1020" />
        <stop offset="100%" stopColor="#1e2a40" />
      </linearGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#storm)" />
    {Array.from({ length: 14 }).map((_, i) => {
      const y = ((rnd(i) * 2200 - f * (2 + rush * 30) * (0.5 + rnd(i + 3))) % 2300 + 2300) % 2300 - 200;
      return <ellipse key={i} cx={rnd(i + 9) * 1080} cy={y} rx={260 + rnd(i + 1) * 200} ry={90 + rnd(i + 2) * 60} fill={`rgba(${70 + flash * 150},${80 + flash * 150},${110 + flash * 140},${0.55})`} />;
    })}
    {Array.from({ length: 60 }).map((_, i) => {
      const x = rnd(i + 20) * 1080;
      const y = ((rnd(i + 30) * 1920 + f * 40) % 1920);
      return <line key={i} x1={x} y1={y} x2={x - 14} y2={y + 60} stroke="rgba(180,200,255,0.35)" strokeWidth={3} />;
    })}
    <rect width={1080} height={1920} fill={`rgba(220,230,255,${flash * 0.7})`} />
  </g>
);

export const Jungle: React.FC<{ f: number; light?: number; dark?: number }> = ({ f, light = 0.5, dark = 0 }) => (
  <g>
    <defs>
      <linearGradient id="jg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0f3d2a" />
        <stop offset="100%" stopColor="#1f5a35" />
      </linearGradient>
      <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,250,200,0.5)" />
        <stop offset="100%" stopColor="rgba(255,250,200,0)" />
      </linearGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#jg)" />
    {[180, 470, 820].map((x, i) => (
      <path key={i} d={`M ${x - 40} 0 L ${x + 40} 0 L ${x + 200} 1500 L ${x - 60} 1500 Z`} fill="url(#ray)" opacity={light * (0.6 + 0.4 * Math.sin(f / 30 + i))} />
    ))}
    {[60, 300, 640, 950].map((x, i) => <rect key={i} x={x} y={0} width={70 + i * 10} height={1500} fill="#3a2a1a" opacity={0.85} />)}
    {Array.from({ length: 40 }).map((_, i) => (
      <ellipse key={i} cx={rnd(i) * 1080} cy={rnd(i + 4) * 500} rx={140} ry={70} fill={["#1d6b3a", "#2a8a4a", "#175c32"][i % 3]} transform={`rotate(${rnd(i + 7) * 60 - 30} ${rnd(i) * 1080} ${rnd(i + 4) * 500})`} />
    ))}
    {Array.from({ length: 22 }).map((_, i) => (
      <path key={i} d={`M ${rnd(i + 50) * 1080} 1520 q ${-60 + rnd(i) * 120} -180 ${-20 + rnd(i + 1) * 40} -260`} stroke="#2f8f4f" strokeWidth={26} fill="none" strokeLinecap="round" />
    ))}
    <rect y={1480} width={1080} height={440} fill="#2a3a1e" />
    {Array.from({ length: 30 }).map((_, i) => <ellipse key={i} cx={rnd(i + 70) * 1080} cy={1500 + rnd(i + 80) * 400} rx={40} ry={14} fill="#4a5a28" opacity={0.7} />)}
    <rect width={1080} height={1920} fill={`rgba(0,10,5,${dark})`} />
  </g>
);

export const River: React.FC<{ f: number; scroll?: number }> = ({ f, scroll = 0 }) => (
  <g>
    <Jungle f={f} light={0.3} />
    <path d="M 0 1380 Q 540 1330 1080 1380 L 1080 1920 L 0 1920 Z" fill="#3f7f8c" />
    {Array.from({ length: 18 }).map((_, i) => {
      const x = ((rnd(i) * 1300 - scroll * 3) % 1300 + 1300) % 1300 - 100;
      return <path key={i} d={`M ${x} ${1440 + rnd(i + 2) * 420} q 30 -10 60 0`} stroke="rgba(255,255,255,0.4)" strokeWidth={5} fill="none" />;
    })}
  </g>
);

export const Hut: React.FC = () => (
  <g>
    <path d="M -260 -200 L 0 -380 L 260 -200 Z" fill="#c8a34a" />
    <path d="M -260 -200 L 0 -380 L 260 -200" stroke="#9c7a2a" strokeWidth={10} fill="none" />
    {[-220, -60, 60, 220].map((x) => <rect key={x} x={x - 10} y={-200} width={20} height={240} fill="#6b4a2a" />)}
    <rect x={-240} y={20} width={480} height={26} fill="#7a5530" />
    <g transform="translate(150,-20)">
      <rect x={-40} y={-80} width={80} height={100} rx={10} fill="#c0392b" />
      <rect x={-14} y={-100} width={28} height={24} rx={4} fill="#7a1f1f" />
      <text y={-20} textAnchor="middle" fontSize={22} fontWeight={800} fill="#fff" fontFamily="Inter">GAS</text>
    </g>
  </g>
);

export const Plane: React.FC<{ split?: number }> = ({ split = 0 }) => (
  <g>
    <g transform={`translate(${-split * 80},${split * 40}) rotate(${-split * 18})`}>
      <path d="M -300 0 Q -310 -40 -260 -45 L 0 -45 L 0 45 L -260 45 Q -310 40 -300 0 Z" fill="#e8ecf2" />
      {[-230, -180, -130, -80, -30].map((x) => <circle key={x} cx={x} cy={-10} r={10} fill="#6a8cc0" />)}
      <path d="M -100 40 L -20 160 L 20 160 L -20 40 Z" fill="#cfd6e0" />
      <rect x={-300} y={8} width={300} height={10} fill="#d9534f" />
    </g>
    <g transform={`translate(${split * 90},${split * 70}) rotate(${split * 25})`}>
      <path d="M 0 -45 L 230 -40 L 300 -130 L 330 -130 L 300 20 L 0 45 Z" fill="#e8ecf2" />
      {[30, 80, 130].map((x) => <circle key={x} cx={x} cy={-10} r={10} fill="#6a8cc0" />)}
      <path d="M 40 -40 L 120 -150 L 160 -150 L 110 -40 Z" fill="#cfd6e0" />
      <rect x={0} y={8} width={290} height={10} fill="#d9534f" />
    </g>
  </g>
);

export const Bat: React.FC<{ f: number }> = ({ f }) => {
  const w = Math.sin(f / 2) * 30;
  return (
    <g>
      <path d={`M 0 0 Q -40 ${-30 - w} -80 ${-10 - w} Q -60 0 -40 10 Q -20 0 0 10 Q 20 0 40 10 Q 60 0 80 ${-10 - w} Q 40 ${-30 - w} 0 0 Z`} fill="#2a2030" />
      <circle r={14} fill="#3a2d42" />
      <circle cx={-5} cy={-3} r={3} fill="#fff" />
      <circle cx={5} cy={-3} r={3} fill="#fff" />
    </g>
  );
};
