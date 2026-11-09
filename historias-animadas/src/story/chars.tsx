// Personajes vectoriales. Origen (0,0) = suelo bajo los pies (Lía) / suelo bajo la mecedora (abuelo) / centro (reloj).
import React from "react";

const blinkAt = (f: number, seed = 0) => {
  const c = (f + seed * 37) % 110;
  return c < 3 ? 0.12 : c < 5 ? 0.5 : 1;
};

export type Mood = "happy" | "surprised" | "worried" | "neutral" | "sad";

const Mouth: React.FC<{ x: number; y: number; open: number; mood: Mood; w?: number }> = ({ x, y, open, mood, w = 20 }) => {
  if (open > 0.05)
    return (
      <g transform={`translate(${x},${y})`}>
        <ellipse rx={w * 0.8 + open * 4} ry={5 + open * 17} fill="#5a1626" />
        <ellipse cy={3 + open * 9} rx={w * 0.5} ry={3 + open * 6} fill="#e0566b" />
      </g>
    );
  if (mood === "surprised") return <ellipse cx={x} cy={y} rx={9} ry={12} fill="#5a1626" />;
  if (mood === "worried" || mood === "sad")
    return <path d={`M ${x - w} ${y + 6} Q ${x} ${y - 8} ${x + w} ${y + 6}`} stroke="#5a1626" strokeWidth={6} fill="none" strokeLinecap="round" />;
  if (mood === "neutral") return <path d={`M ${x - w * 0.7} ${y} L ${x + w * 0.7} ${y}`} stroke="#5a1626" strokeWidth={6} strokeLinecap="round" />;
  return <path d={`M ${x - w} ${y - 4} Q ${x} ${y + 18} ${x + w} ${y - 4}`} stroke="#5a1626" strokeWidth={6} fill="none" strokeLinecap="round" />;
};

const Eye: React.FC<{ x: number; y: number; open: number; look: number; lookY?: number; r?: number }> = ({ x, y, open, look, lookY = 0, r = 26 }) => (
  <g transform={`translate(${x},${y}) scale(1,${open})`}>
    <ellipse rx={r * 0.85} ry={r * 1.1} fill="#fff" />
    <circle cx={look * r * 0.32} cy={lookY * r * 0.3 + 2} r={r * 0.58} fill="#2a1a12" />
    <circle cx={look * r * 0.32 - r * 0.2} cy={lookY * r * 0.3 - r * 0.25} r={r * 0.2} fill="#fff" />
  </g>
);

// ---------------- LÍA ----------------
export const Lia: React.FC<{
  f: number;
  mouth?: number;
  mood?: Mood;
  look?: number;
  lookY?: number;
  armL?: number; // grados; 0 = colgando
  armR?: number;
  run?: number | null; // fase en radianes
  holdWatch?: boolean;
  bob?: number;
}> = ({ f, mouth = 0, mood = "happy", look = 0, lookY = 0, armL = 12, armR = -12, run = null, holdWatch = false, bob = 0 }) => {
  const blink = blinkAt(f, 1);
  const legA = run !== null ? Math.sin(run) * 38 : 0;
  const by = run !== null ? -Math.abs(Math.cos(run)) * 14 : bob;
  const skin = "#f3c7a2";
  const brow = mood === "worried" || mood === "sad" ? 1 : mood === "surprised" ? -1 : 0;
  return (
    <g transform={`translate(0,${by})`}>
      {/* piernas */}
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${s * 30},-160) rotate(${s * legA})`}>
          <rect x={-17} y={0} width={34} height={150} rx={16} fill="#2d3f6b" />
          <ellipse cx={8} cy={152} rx={34} ry={18} fill="#e04848" />
        </g>
      ))}
      {/* brazo trasero */}
      <g transform={`translate(-72,-318) rotate(${armL})`}>
        <rect x={-18} y={0} width={36} height={150} rx={18} fill="#1f9a8e" />
        <circle cx={0} cy={152} r={24} fill={skin} />
      </g>
      {/* cuerpo */}
      <path d="M -70 -335 Q 0 -350 70 -335 L 95 -160 Q 0 -140 -95 -160 Z" fill="#26b3a3" />
      <path d="M -40 -338 Q 0 -300 40 -338" fill="#f7f0e0" />
      <rect x={-95} y={-200} width={190} height={22} fill="#1f9a8e" />
      {/* brazo delantero */}
      <g transform={`translate(72,-318) rotate(${armR})`}>
        <rect x={-18} y={0} width={36} height={150} rx={18} fill="#2bc0b0" />
        <circle cx={0} cy={152} r={24} fill={skin} />
        {holdWatch && (
          <g transform="translate(0,175)">
            <circle r={30} fill="#f2c14e" stroke="#b8860b" strokeWidth={5} />
            <circle r={20} fill="#fff6dc" />
            <circle r={44} fill="rgba(255,210,90,0.35)" />
          </g>
        )}
      </g>
      {/* cabeza */}
      <g transform="translate(0,-480)">
        <path d="M -138 10 Q -150 -150 0 -150 Q 150 -150 138 10 L 130 95 Q 100 110 80 70 L -80 70 Q -100 110 -130 95 Z" fill="#3a2217" />
        <circle r={112} fill={skin} />
        <path d="M -118 -20 Q -110 -135 0 -132 Q 110 -135 118 -20 Q 70 -70 20 -50 Q -40 -90 -118 -20 Z" fill="#4a2c1e" />
        <path d="M 70 -112 l 9 18 20 3 -14 14 4 20 -19 -10 -18 10 4 -20 -14 -14 20 -3 z" fill="#ffd23f" stroke="#e0a800" strokeWidth={3} />
        <circle cx={-74} cy={42} r={17} fill="#ff8a8a" opacity={0.45} />
        <circle cx={74} cy={42} r={17} fill="#ff8a8a" opacity={0.45} />
        <Eye x={-42} y={8} open={mood === "surprised" ? Math.max(blink, 0.9) * 1.1 : blink} look={look} lookY={lookY} />
        <Eye x={42} y={8} open={mood === "surprised" ? Math.max(blink, 0.9) * 1.1 : blink} look={look} lookY={lookY} />
        <path d={`M -62 ${-34 - brow * 6} L -24 ${-30 + brow * 8}`} stroke="#3a2217" strokeWidth={7} strokeLinecap="round" />
        <path d={`M 62 ${-34 - brow * 6} L 24 ${-30 + brow * 8}`} stroke="#3a2217" strokeWidth={7} strokeLinecap="round" />
        <Mouth x={0} y={64} open={mouth} mood={mood} />
      </g>
    </g>
  );
};

// ---------------- ABUELO (sentado en mecedora) ----------------
export const Abuelo: React.FC<{ f: number; tired?: number; mouth?: number; mood?: Mood; look?: number; rock?: boolean; armUp?: number }> = ({
  f,
  tired = 0,
  mouth = 0,
  mood = "happy",
  look = 0,
  rock = true,
  armUp = 0,
}) => {
  const blink = blinkAt(f, 2);
  const lid = Math.min(blink, 1 - tired * 0.55);
  const r = rock ? Math.sin(f / 24) * (3 - tired * 2) : 0;
  const skin = "#e9b48c";
  return (
    <g transform={`rotate(${r}, 0, 0)`}>
      {/* mecedora */}
      <path d="M -230 0 Q 0 40 230 -10" stroke="#6b3e1f" strokeWidth={18} fill="none" strokeLinecap="round" />
      <rect x={-150} y={-760} width={300} height={520} rx={40} fill="#7a4825" />
      <rect x={-125} y={-735} width={250} height={470} rx={30} fill="#8d5a2f" />
      {[-70, 0, 70].map((x) => <rect key={x} x={x - 9} y={-720} width={18} height={440} rx={9} fill="#7a4825" />)}
      <rect x={-150} y={-260} width={26} height={260} rx={10} fill="#7a4825" />
      <rect x={-150} y={-280} width={300} height={36} rx={14} fill="#8d5a2f" />
      <rect x={120} y={-280} width={26} height={280} rx={10} fill="#7a4825" />
      {/* piernas */}
      <rect x={-40} y={-290} width={190} height={62} rx={30} fill="#4b4f5c" />
      <rect x={110} y={-270} width={58} height={250} rx={26} fill="#4b4f5c" />
      <ellipse cx={160} cy={-14} rx={52} ry={22} fill="#3b2a20" />
      <g transform={`translate(0,${tired * 18})`}>
        {/* cuerpo */}
        <path d="M -100 -520 Q 0 -545 100 -520 L 120 -260 Q 0 -240 -120 -260 Z" fill="#9b3d3d" />
        <path d="M -30 -530 L 0 -470 L 30 -530 Z" fill="#f3efe6" />
        {[0, 1, 2].map((i) => <circle key={i} cx={0} cy={-450 + i * 55} r={8} fill="#e8c27a" />)}
        {/* brazos */}
        <g transform={`translate(-95,-500) rotate(${20 - armUp * 40})`}>
          <rect x={-22} y={0} width={44} height={200} rx={22} fill="#8a3434" />
          <circle cx={0} cy={205} r={28} fill={skin} />
        </g>
        <g transform={`translate(95,-500) rotate(${-35 - armUp * 95})`}>
          <rect x={-22} y={0} width={44} height={200} rx={22} fill="#8a3434" />
          <circle cx={0} cy={205} r={28} fill={skin} />
          <circle cx={0} cy={170} r={16} fill="#d9d9d9" stroke="#777" strokeWidth={4} />
        </g>
        {/* cabeza */}
        <g transform={`translate(0,-640) rotate(${tired * 9})`}>
          <ellipse cx={-100} cy={0} rx={30} ry={42} fill={skin} />
          <ellipse cx={100} cy={0} rx={30} ry={42} fill={skin} />
          <circle r={108} fill={skin} />
          <ellipse cx={-92} cy={-30} rx={34} ry={46} fill="#f1f1f1" />
          <ellipse cx={92} cy={-30} rx={34} ry={46} fill="#f1f1f1" />
          <ellipse cx={-30} cy={-80} rx={30} ry={12} fill="#f6cba6" opacity={0.7} />
          <Eye x={-40} y={-6} open={lid} look={look} r={17} />
          <Eye x={40} y={-6} open={lid} look={look} r={17} />
          <circle cx={-40} cy={-6} r={30} fill="none" stroke="#4a4a4a" strokeWidth={5} />
          <circle cx={40} cy={-6} r={30} fill="none" stroke="#4a4a4a" strokeWidth={5} />
          <path d="M -10 -6 L 10 -6" stroke="#4a4a4a" strokeWidth={5} />
          <path d={`M -72 ${-50 + tired * 8} Q -40 -66 -14 -48`} stroke="#f4f4f4" strokeWidth={12} fill="none" strokeLinecap="round" />
          <path d={`M 72 ${-50 + tired * 8} Q 40 -66 14 -48`} stroke="#f4f4f4" strokeWidth={12} fill="none" strokeLinecap="round" />
          <ellipse cx={0} cy={22} rx={16} ry={20} fill="#dc9a74" />
          <Mouth x={0} y={66} open={mouth} mood={mood} w={18} />
          <path d="M -62 52 Q -40 30 0 40 Q 40 30 62 52 Q 40 62 0 52 Q -40 62 -62 52 Z" fill="#f4f4f4" />
          <circle cx={-66} cy={30} r={14} fill="#ff8a8a" opacity={0.3 * (1 - tired)} />
          <circle cx={66} cy={30} r={14} fill="#ff8a8a" opacity={0.3 * (1 - tired)} />
        </g>
      </g>
    </g>
  );
};

// ---------------- RELOJ (personaje) ----------------
export const Reloj: React.FC<{
  f: number;
  open?: number; // 0 cerrado .. 1 tapa abierta
  awake?: number; // 0 ojos cerrados .. 1 abiertos
  mouth?: number;
  mood?: Mood;
  look?: number;
  hands?: number; // ángulo base de agujas
  glow?: number;
  engraving?: number; // 0..1 revela la inscripción de la tapa
  wink?: boolean;
  crown?: number; // desplazamiento de la corona (giro)
  lidFlat?: number; // cuánto se ve la tapa abierta (1 = de frente, 0.3 = en perspectiva)
}> = ({ lidFlat = 0.3, f, open = 1, awake = 1, mouth = 0, mood = "happy", look = 0, hands = 0, glow = 0.6, engraving = 0, wink = false, crown = 0 }) => {
  const blink = blinkAt(f, 3) * awake;
  const lidS = open < 0.5 ? 1 - 2 * open : -(open - 0.5) * 2 * lidFlat; // 1 cubre la esfera, negativo = abierta arriba
  return (
    <g>
      <circle r={190} fill={`rgba(255,200,80,${0.22 * glow})`} />
      <circle r={140} fill={`rgba(255,210,100,${0.3 * glow})`} />
      {/* cadena y corona */}
      <circle cx={0} cy={-150} r={22} fill="none" stroke="#c9971f" strokeWidth={9} />
      <g transform="translate(0,-118)">
        <rect x={-20} y={-14} width={40} height={30} rx={6} fill="#d9a92a" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={-18 + ((i * 9 + crown) % 40)} y={-14} width={3} height={30} fill="#9c7414" />
        ))}
      </g>
      {/* caja */}
      <circle r={104} fill="#e2b12f" />
      <circle r={104} fill="none" stroke="#a87c12" strokeWidth={7} />
      <circle r={92} fill="none" stroke="#f7d872" strokeWidth={4} />
      {/* esfera */}
      <circle r={84} fill="#fff7e2" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={-2.5} y={-80} width={5} height={i % 3 ? 9 : 15} fill="#b38a2e" transform={`rotate(${i * 30})`} />
      ))}
      <g opacity={0.55}>
        <rect x={-3} y={-58} width={6} height={58} rx={3} fill="#7a5a14" transform={`rotate(${hands})`} />
        <rect x={-2} y={-72} width={4} height={72} rx={2} fill="#7a5a14" transform={`rotate(${hands * 12})`} />
      </g>
      <circle r={6} fill="#7a5a14" />
      {/* cara */}
      <Eye x={-30} y={-18} open={wink ? 0.12 : Math.max(0.08, blink)} look={look} r={17} />
      <Eye x={30} y={-18} open={Math.max(0.08, blink)} look={look} r={17} />
      <circle cx={-52} cy={14} r={10} fill="#ff9a7a" opacity={0.5 * awake} />
      <circle cx={52} cy={14} r={10} fill="#ff9a7a" opacity={0.5 * awake} />
      {awake > 0.3 && <Mouth x={0} y={32} open={mouth} mood={mood} w={14} />}
      {/* tapa con bisagra arriba */}
      <g transform={`translate(0,-104) scale(1,${lidS}) translate(0,104)`}>
        <circle r={104} fill={lidS > 0 ? "#e5b432" : "#d7a524"} stroke="#a87c12" strokeWidth={7} />
        {lidS > 0 ? (
          <g opacity={0.8}>
            <circle r={70} fill="none" stroke="#c49422" strokeWidth={4} />
            <path d="M 0 -50 L 12 -12 L 50 0 L 12 12 L 0 50 L -12 12 L -50 0 L -12 -12 Z" fill="#c49422" />
          </g>
        ) : (
          <g transform="scale(1,-1)">
            <circle r={84} fill="#e9c35a" />
            <g opacity={engraving} fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" textAnchor="middle" fill="#8a6410">
              <text y={-18} fontSize={26}>Para Lía.</text>
              <text y={16} fontSize={20}>De lo que me queda.</text>
              <text y={50} fontSize={20}>— A.</text>
            </g>
          </g>
        )}
      </g>
    </g>
  );
};
