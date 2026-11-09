// Personajes de la historia de Hiroo Onoda.
import React from "react";
import { blinkAt, Eye, Mouth, type Mood } from "./chars";

const SKIN = "#e9be93";

// Onoda: soldado. age 0 = 1944 (uniforme nuevo) .. 1 = 1974 (barba, uniforme remendado).
export const Onoda: React.FC<{ f: number; age?: number; mood?: Mood; look?: number; lookY?: number; salute?: number; walk?: number | null; rifle?: boolean; armR?: number }> = ({
  f, age = 0, mood = "neutral", look = 0, lookY = 0, salute = 0, walk = null, rifle = true, armR = -10,
}) => {
  const blink = blinkAt(f, 11);
  const legA = walk !== null ? Math.sin(walk) * 24 : 0;
  const by = walk !== null ? -Math.abs(Math.cos(walk)) * 8 : 0;
  const cloth = age > 0.5 ? "#8a7c55" : "#7d7a4a";
  const dark = age > 0.5 ? "#6b5f3e" : "#646138";
  const brow = mood === "worried" || mood === "sad" ? 1 : mood === "surprised" ? -1 : 0;
  return (
    <g transform={`translate(0,${by})`}>
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${s * 30},-200) rotate(${s * legA})`}>
          <rect x={-18} y={0} width={36} height={190} rx={14} fill={cloth} />
          <rect x={-20} y={120} width={40} height={60} rx={6} fill="#d8cfa8" opacity={0.6} />
          <ellipse cx={6} cy={192} rx={30} ry={14} fill="#3b2a1a" />
        </g>
      ))}
      {rifle && (
        <g transform="rotate(-25,0,-300)">
          <rect x={-8} y={-560} width={16} height={330} rx={6} fill="#4a3a2a" />
          <rect x={-5} y={-640} width={10} height={100} fill="#333" />
        </g>
      )}
      <g transform="translate(-72,-400) rotate(12)">
        <rect x={-18} y={0} width={36} height={180} rx={16} fill={dark} />
        <circle cx={0} cy={182} r={20} fill={SKIN} />
      </g>
      <path d="M -70 -415 Q 0 -430 70 -415 L 82 -195 Q 0 -182 -82 -195 Z" fill={cloth} />
      <path d="M -70 -415 L 70 -195 M 70 -415" stroke="#5a4a2a" strokeWidth={10} />
      <rect x={-82} y={-240} width={164} height={20} fill="#4a3a20" />
      {age > 0.4 && [[-30, -330], [40, -280], [-50, -260]].map(([x, y], i) => <rect key={i} x={x} y={y} width={34} height={26} fill="#a39468" transform={`rotate(${i * 20} ${x} ${y})`} />)}
      <g transform={`translate(72,-400) rotate(${salute > 0 ? -150 * salute : armR})`}>
        <rect x={-18} y={0} width={36} height={180} rx={16} fill={dark} />
        <circle cx={0} cy={182} r={20} fill={SKIN} />
      </g>
      <g transform="translate(0,-540)">
        <ellipse rx={88} ry={100} fill={SKIN} />
        {age > 0.3 && <path d={`M -80 20 Q -75 ${100 + age * 30} 0 ${110 + age * 30} Q 75 ${100 + age * 30} 80 20 Q 40 70 0 66 Q -40 70 -80 20 Z`} fill={age > 0.8 ? "#4a4a4a" : "#2a2420"} />}
        <Eye x={-32} y={0} open={blink} look={look} lookY={lookY} r={17} />
        <Eye x={32} y={0} open={blink} look={look} lookY={lookY} r={17} />
        <path d={`M -54 ${-30 - brow * 6} L -14 ${-26 + brow * 7}`} stroke="#2a2420" strokeWidth={7} strokeLinecap="round" />
        <path d={`M 54 ${-30 - brow * 6} L 14 ${-26 + brow * 7}`} stroke="#2a2420" strokeWidth={7} strokeLinecap="round" />
        <Mouth x={0} y={52} open={0} mood={mood} w={14} />
        {/* gorra con cubrenuca */}
        <path d="M -95 -40 Q -90 -125 0 -128 Q 90 -125 95 -40 Z" fill={cloth} />
        <rect x={-100} y={-50} width={200} height={20} rx={8} fill={dark} />
        <path d="M 40 -40 L 130 -30 L 40 -20 Z" fill={dark} />
        <path d="M -95 -40 L -105 60 L -70 60 L -70 -30 Z" fill={cloth} />
        <circle cx={0} cy={-90} r={12} fill="#c9a227" />
      </g>
    </g>
  );
};

// Comandante Taniguchi: oficial (old=0) o librero anciano con gafas (old=1).
export const Taniguchi: React.FC<{ f: number; old?: number; mood?: Mood; look?: number; paper?: boolean }> = ({ f, old = 0, mood = "neutral", look = 0, paper = false }) => {
  const blink = blinkAt(f, 13);
  const coat = old > 0.5 ? "#5a6b7a" : "#5f5c35";
  return (
    <g>
      {[-1, 1].map((s) => <rect key={s} x={s * 30 - 18} y={-200} width={36} height={190} rx={14} fill={old > 0.5 ? "#3a3f48" : "#4f4c2a"} />)}
      {[-1, 1].map((s) => <ellipse key={s} cx={s * 30 + 6} cy={-8} rx={30} ry={14} fill="#1a1a1a" />)}
      <path d="M -74 -420 Q 0 -435 74 -420 L 84 -190 Q 0 -178 -84 -190 Z" fill={coat} />
      {old <= 0.5 && [0, 1, 2].map((i) => <circle key={i} cx={0} cy={-380 + i * 60} r={8} fill="#c9a227" />)}
      {old > 0.5 && <path d="M -20 -425 L 0 -380 L 20 -425" fill="#f2f2f2" />}
      <g transform={`translate(-74,-405) rotate(${paper ? -40 : 10})`}>
        <rect x={-18} y={0} width={36} height={180} rx={16} fill={coat} />
        <circle cx={0} cy={182} r={20} fill="#e3b38c" />
      </g>
      <g transform={`translate(74,-405) rotate(${paper ? 40 : -10})`}>
        <rect x={-18} y={0} width={36} height={180} rx={16} fill={coat} />
        <circle cx={0} cy={182} r={20} fill="#e3b38c" />
      </g>
      {paper && (
        <g transform="translate(0,-300)">
          <rect x={-110} y={-80} width={220} height={150} rx={6} fill="#fbf6e6" stroke="#c9b98a" strokeWidth={4} />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={-85} y={-50 + i * 30} width={170 - (i % 2) * 40} height={8} fill="#b9a978" />)}
        </g>
      )}
      <g transform="translate(0,-545)">
        <ellipse rx={88} ry={100} fill="#e3b38c" />
        {old > 0.5 ? (
          <path d="M -90 -10 Q -95 -100 0 -105 Q 95 -100 90 -10 Q 60 -60 0 -62 Q -60 -60 -90 -10 Z" fill="#d6d6d6" />
        ) : (
          <>
            <path d="M -95 -40 Q -90 -125 0 -128 Q 90 -125 95 -40 Z" fill="#5f5c35" />
            <path d="M -100 -40 L 120 -30 L 100 -10 L -90 -20 Z" fill="#2a2a1a" />
            <circle cx={0} cy={-90} r={12} fill="#c9a227" />
          </>
        )}
        <Eye x={-32} y={0} open={blink} look={look} r={17} />
        <Eye x={32} y={0} open={blink} look={look} r={17} />
        {old > 0.5 && <g fill="none" stroke="#333" strokeWidth={5}><circle cx={-32} cy={0} r={27} /><circle cx={32} cy={0} r={27} /><path d="M -5 0 L 5 0" /></g>}
        <path d="M -40 40 Q 0 30 40 40" stroke={old > 0.5 ? "#d6d6d6" : "#2a2420"} strokeWidth={10} strokeLinecap="round" fill="none" />
        <Mouth x={0} y={62} open={0} mood={mood} w={14} />
      </g>
    </g>
  );
};

// Norio Suzuki: joven mochilero (pelo largo, cinta, mochila).
export const Suzuki: React.FC<{ f: number; mood?: Mood; look?: number; walk?: number | null; armR?: number; camera?: boolean }> = ({ f, mood = "happy", look = 0, walk = null, armR = -10, camera = false }) => {
  const blink = blinkAt(f, 17);
  const legA = walk !== null ? Math.sin(walk) * 26 : 0;
  return (
    <g>
      <rect x={-110} y={-470} width={90} height={230} rx={30} fill="#c0502a" />
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${s * 28},-200) rotate(${s * legA})`}>
          <rect x={-17} y={0} width={34} height={190} rx={14} fill="#3b5b8f" />
          <ellipse cx={6} cy={192} rx={28} ry={14} fill="#eee" />
        </g>
      ))}
      <g transform="translate(-66,-400) rotate(12)"><rect x={-17} y={0} width={34} height={170} rx={15} fill="#f2b33d" /><circle cx={0} cy={172} r={19} fill={SKIN} /></g>
      <path d="M -66 -415 Q 0 -428 66 -415 L 78 -195 Q 0 -184 -78 -195 Z" fill="#f2b33d" />
      <path d="M -66 -415 L -40 -300 M 66 -415 L 40 -300" stroke="#8a3a1a" strokeWidth={12} />
      <g transform={`translate(66,-400) rotate(${armR})`}>
        <rect x={-17} y={0} width={34} height={170} rx={15} fill="#f2b33d" />
        <circle cx={0} cy={172} r={19} fill={SKIN} />
        {camera && <g transform="translate(0,190)"><rect x={-40} y={-26} width={80} height={52} rx={8} fill="#222" /><circle r={16} fill="#555" /><circle r={8} fill="#9cf" /></g>}
      </g>
      <g transform="translate(0,-540)">
        <path d="M -98 -20 Q -105 -125 0 -128 Q 105 -125 98 -20 L 104 110 L 70 110 L 70 0 L -70 0 L -70 110 L -104 110 Z" fill="#1d1a1a" />
        <ellipse rx={84} ry={98} fill={SKIN} />
        <path d="M -88 -30 Q -60 -100 0 -100 Q 60 -100 88 -30 Q 30 -70 -88 -30 Z" fill="#1d1a1a" />
        <rect x={-92} y={-52} width={184} height={16} rx={6} fill="#e84b3c" />
        <Eye x={-30} y={4} open={blink} look={look} r={17} />
        <Eye x={30} y={4} open={blink} look={look} r={17} />
        <Mouth x={0} y={55} open={0} mood={mood} w={14} />
      </g>
    </g>
  );
};

export const Panda: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <circle cx={-60} cy={-70} r={32} fill="#1a1a1a" /><circle cx={60} cy={-70} r={32} fill="#1a1a1a" />
    <circle r={90} fill="#fff" />
    <ellipse cx={-34} cy={-6} rx={24} ry={30} fill="#1a1a1a" transform="rotate(-20 -34 -6)" /><ellipse cx={34} cy={-6} rx={24} ry={30} fill="#1a1a1a" transform="rotate(20 34 -6)" />
    <circle cx={-32} cy={-6} r={9} fill="#fff" opacity={f % 90 < 4 ? 0 : 1} /><circle cx={32} cy={-6} r={9} fill="#fff" opacity={f % 90 < 4 ? 0 : 1} />
    <ellipse cy={30} rx={14} ry={10} fill="#1a1a1a" />
  </g>
);

export const Yeti: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <path d="M -90 100 Q -110 -60 -60 -100 Q 0 -140 60 -100 Q 110 -60 90 100 Z" fill="#eef3fb" />
    {[-70, -35, 0, 35, 70].map((x) => <path key={x} d={`M ${x - 18} 100 L ${x} 130 L ${x + 18} 100 Z`} fill="#eef3fb" />)}
    <ellipse cy={-20} rx={56} ry={50} fill="#9fb7d6" />
    <circle cx={-20} cy={-28} r={10} fill="#1a1a1a" opacity={f % 80 < 4 ? 0.2 : 1} /><circle cx={20} cy={-28} r={10} fill="#1a1a1a" opacity={f % 80 < 4 ? 0.2 : 1} />
    <path d="M -20 6 Q 0 20 20 6" stroke="#1a1a1a" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

// Folleto lanzado desde el aire.
export const Leaflet: React.FC<{ text?: boolean }> = ({ text = true }) => (
  <g>
    <rect x={-80} y={-110} width={160} height={220} rx={6} fill="#f7f1df" stroke="#d4c79f" strokeWidth={4} />
    {text && <>
      <text textAnchor="middle" y={-50} fontFamily="Inter" fontWeight={900} fontSize={26} fill="#a1281e">LA GUERRA</text>
      <text textAnchor="middle" y={-18} fontFamily="Inter" fontWeight={900} fontSize={26} fill="#a1281e">TERMINÓ</text>
    </>}
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-55} y={10 + i * 22} width={110 - (i % 2) * 30} height={7} fill="#c9bb90" />)}
  </g>
);
