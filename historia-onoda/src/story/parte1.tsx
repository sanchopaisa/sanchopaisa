import React from "react";
import { Dust, Void } from "./bg";
import { Vignette } from "./fx";
import { Jungle, Plane, Portrait, River, StormSky } from "./real";
import { Leaflet, Onoda, Panda, Suzuki, Taniguchi, Yeti } from "./onoda";
import { At, Cam, FONT, Pill, Svg, Year, lerp, type SceneProps } from "./kit";
import { mk } from "./time";
import h from "../parte1.json";

export const P1 = mk(h as never);
const { T, W } = P1;
const L = (g: number, from: number) => g - from;

// Gancho: ojos entre las hojas + contador de años 1945 → 1974.
const S1: React.FC<SceneProps> = ({ f, dur }) => {
  const year = Math.round(lerp(f, 10, dur - 25, 1945, 1974));
  return (
    <Svg>
      <Jungle f={f} light={0.25} dark={0.55} />
      <Cam z={lerp(f, 0, dur, 1.25, 1)} cy={900}>
        <At x={540} y={1550} s={1.4}><Onoda f={f} age={lerp(f, 10, dur - 25, 0, 1)} mood="neutral" look={0.2} /></At>
        {Array.from({ length: 26 }).map((_, i) => (
          <ellipse key={i} cx={(i * 113) % 1180 - 50} cy={1050 + ((i * 59) % 380)} rx={170} ry={70} fill={["#174a2c", "#1d5c36", "#143f26"][i % 3]} transform={`rotate(${(i * 41) % 60 - 30} ${(i * 113) % 1180 - 50} ${1050 + ((i * 59) % 380)})`} />
        ))}
      </Cam>
      <Year y={year} f={f} at={8} top={420} />
      <Pill x={540} y={600} text={`${year - 1945} años escondido`} f={f} at={20} color="#ff7675" size={40} />
      <Vignette strength={0.7} />
    </Svg>
  );
};

// 1944: mapa + Onoda saluda.
const S2: React.FC<SceneProps> = ({ f, from }) => {
  const lub = L(W("a1", "lubang"), from);
  return (
    <Svg>
      <rect width={1080} height={1920} fill="#123a5a" />
      {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M 0 ${300 + i * 110} q 270 -30 540 0 t 540 0`} stroke="rgba(255,255,255,0.06)" strokeWidth={4} fill="none" />)}
      <g transform="translate(560,620)">
        <path d="M -60 -260 Q 20 -300 60 -220 Q 120 -120 60 -40 Q 90 40 40 120 Q -10 60 -40 -40 Q -110 -120 -60 -260 Z" fill="#4f9a5a" />
        <path d="M 120 120 Q 200 100 230 180 Q 250 260 180 300 Q 120 260 120 120 Z" fill="#4f9a5a" />
        <path d="M -40 200 Q 30 190 60 250 Q 40 300 -20 290 Z" fill="#4f9a5a" />
        <g transform="translate(-190,120)" opacity={lerp(f, lub - 6, lub + 2, 0, 1)}>
          <ellipse rx={40} ry={18} fill="#6fbf6a" />
          <circle r={70 + Math.sin(f / 5) * 8} fill="none" stroke="#ff5a5a" strokeWidth={6} />
          <text y={-90} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={46} fill="#fff">LUBANG</text>
        </g>
        <text x={120} y={-200} fontFamily={FONT} fontWeight={800} fontSize={40} fill="#cfe">Filipinas</text>
      </g>
      <Year y={1944} f={f} top={260} />
      <At x={780} y={1720} s={1.05}><Onoda f={f} salute={lerp(f, 20, 30, 0, 1)} mood="neutral" look={-0.3} /></At>
    </Svg>
  );
};

// Orden y promesa del comandante.
const S3: React.FC<SceneProps> = ({ f, from }) => {
  const nunca = L(W("a2", "nunca"), from);
  const prom = L(T("a3"), from);
  const vol = L(W("a3", "volveremos"), from);
  return (
    <Svg>
      <rect width={1080} height={1920} fill="#2a2a1e" />
      <rect y={1450} width={1080} height={470} fill="#3a3524" />
      <rect x={0} y={0} width={1080} height={1920} fill="rgba(255,200,120,0.08)" />
      <At x={330} y={1700} s={1.1}><Taniguchi f={f} look={0.6} /></At>
      <At x={760} y={1700} s={1.1}><Onoda f={f} salute={1} look={-0.6} /></At>
      <Pill x={540} y={420} text="NUNCA RENDIRSE" f={f} at={nunca} color="#ff7675" size={56} />
      {f > prom && (
        <g transform={`translate(540,700)`} opacity={lerp(f, prom, prom + 10, 0, 1)}>
          <rect x={-430} y={-120} width={860} height={240} rx={30} fill="#fbf6e6" />
          <text textAnchor="middle" y={-30} fontFamily="Georgia, serif" fontStyle="italic" fontSize={44} fill="#4a3a1a">«Tres años, o cinco…</text>
          <text textAnchor="middle" y={50} fontFamily="Georgia, serif" fontStyle="italic" fontSize={52} fontWeight={700} fill={f > vol ? "#a1281e" : "#4a3a1a"}>volveremos por ti.»</text>
        </g>
      )}
    </Svg>
  );
};

// Folletos desde el aire → "¿trampa?".
const S4: React.FC<SceneProps> = ({ f, from }) => {
  const fol = L(W("a4", "folletos"), from);
  const read = L(T("a5"), from);
  const trap = L(W("a5", "trampa"), from);
  if (f < read) {
    return (
      <Svg>
        <rect width={1080} height={1920} fill="#8fc6e8" />
        <g transform={`translate(${lerp(f, 0, read, -200, 1300)},330) scale(0.45)`}><Plane /></g>
        <Year y={1945} f={f} top={180} />
        {Array.from({ length: 22 }).map((_, i) => {
          const t = f - fol - i * 2;
          if (t < 0) return null;
          return <At key={i} x={120 + ((i * 197) % 860) + Math.sin(t / 8 + i) * 40} y={360 + t * 9} s={0.5} r={Math.sin(t / 6 + i) * 40}><Leaflet text={false} /></At>;
        })}
        <Jungle f={f} light={0.4} />
      </Svg>
    );
  }
  return (
    <Svg>
      <Jungle f={f} light={0.5} />
      <At x={540} y={1720} s={1.2}><Onoda f={f} mood={f > trap ? "worried" : "neutral"} armR={-60} lookY={0.5} look={0.3} /></At>
      <At x={760} y={820} s={1.8} r={-8}><Leaflet /></At>
      {f > trap && <g transform={`translate(760,820) scale(${lerp(f, trap, trap + 6, 2, 1)})`}><circle r={190} fill="none" stroke="#ff5a5a" strokeWidth={14} /><path d="M -130 -130 L 130 130" stroke="#ff5a5a" strokeWidth={14} /></g>}
      <Pill x={540} y={420} text="¿una trampa?" f={f} at={trap} color="#ff7675" size={56} />
    </Svg>
  );
};

// Compañeros: uno se rinde (1950), otro muere (1954). Cartas y fotos (1952).
const S5: React.FC<SceneProps> = ({ f, from }) => {
  const rin = L(W("a6", "rindió"), from);
  const mur = L(W("a6", "murió"), from);
  const cart = L(T("a7"), from);
  if (f < cart) {
    const xs = [220, 420, 640, 860];
    return (
      <Svg>
        <Jungle f={f} light={0.3} dark={0.3} />
        {xs.map((x, i) => {
          const gone = (i === 1 && f > rin) || (i === 2 && f > mur);
          const o = i === 1 ? lerp(f, rin, rin + 20, 1, 0.12) : i === 2 ? lerp(f, mur, mur + 20, 1, 0.12) : 1;
          return <At key={i} x={i === 1 && gone ? x - lerp(f, rin, rin + 30, 0, 200) : x} y={1700} s={0.8} o={o}><Onoda f={f + i * 13} age={0.3} mood={i === 0 ? "worried" : "neutral"} rifle={i !== 1} /></At>;
        })}
        <Pill x={420} y={560} text="1950: se rinde" f={f} at={rin} color="#ffeaa7" />
        <Pill x={640} y={700} text="1954: muere" f={f} at={mur} color="#ff7675" />
      </Svg>
    );
  }
  const k = f - cart;
  return (
    <Svg>
      <Jungle f={f} light={0.5} />
      {Array.from({ length: 10 }).map((_, i) => (
        <At key={i} x={150 + ((i * 251) % 800)} y={Math.min(1250, 200 + (k - i * 3) * 12)} s={0.5} r={(i * 47) % 50 - 25} o={k > i * 3 ? 1 : 0}>
          {i % 2 ? <Leaflet text={false} /> : <g><rect x={-80} y={-100} width={160} height={200} fill="#fff" /><rect x={-66} y={-86} width={132} height={130} fill="#c9d8e8" /><circle cx={-20} cy={-20} r={26} fill="#e9be93" /><circle cx={30} cy={-14} r={22} fill="#e9be93" /></g>}
        </At>
      ))}
      <At x={760} y={760} s={1.4} r={6} o={lerp(f, cart + 20, cart + 30, 0, 1)}>
        <rect x={-150} y={-180} width={300} height={360} fill="#fff" />
        <rect x={-130} y={-160} width={260} height={250} fill="#d9e4ef" />
        <g transform="translate(-50,-30) scale(0.45)"><Portrait f={f} kind="madre" /></g>
        <g transform="translate(55,-20) scale(0.42)"><Portrait f={f} kind="padre" /></g>
        <text y={140} textAnchor="middle" fontFamily="Georgia" fontStyle="italic" fontSize={30} fill="#555">Vuelve a casa</text>
      </At>
      <At x={300} y={1720} s={1.05}><Onoda f={f} age={0.45} mood="sad" armR={-70} look={0.8} /></At>
      <Year y={1952} f={f} at={cart} top={300} />
    </Svg>
  );
};

// Víctimas civiles: tono sobrio, sin violencia explícita.
const S6: React.FC<SceneProps> = ({ f, from }) => {
  const v = L(W("a8", "víctimas"), from);
  return (
    <Svg>
      <rect width={1080} height={1920} fill="#2b2420" />
      <rect y={1100} width={1080} height={820} fill="#3a2e22" />
      {Array.from({ length: 40 }).map((_, i) => <path key={i} d={`M ${(i * 29) % 1080} ${1120 + (i % 6) * 120} l 10 -60 l 10 60`} stroke={i % 3 ? "#5a4a2a" : "#2a2018"} strokeWidth={6} fill="none" />)}
      <g transform="translate(540,900)">
        <path d="M -260 0 L 0 -180 L 260 0 Z" fill="#4a3a28" />
        <rect x={-200} y={0} width={400} height={200} fill="#3a2e22" />
      </g>
      <Dust f={f} n={30} color="200,160,120" />
      <Pill x={540} y={480} text="Campesinos de Lubang" f={f} at={v - 4} color="#fab1a0" size={44} />
      <g opacity={lerp(f, v + 10, v + 20, 0, 1)} fontFamily={FONT} textAnchor="middle">
        <text x={540} y={1450} fontSize={36} fontWeight={700} fill="#ddd">Esta parte también es la historia.</text>
      </g>
      <Vignette strength={0.7} />
    </Svg>
  );
};

// Solo: 1972, lluvia, barba.
const S7: React.FC<SceneProps> = ({ f, from }) => {
  const solo = L(W("a9", "solo"), from);
  return (
    <Svg>
      <StormSky f={f} />
      <rect y={1450} width={1080} height={470} fill="#16301f" />
      <At x={540} y={1720} s={1.25}><Onoda f={f} age={0.85} mood="sad" lookY={0.6} /></At>
      <Year y={1972} f={f} top={300} />
      <Pill x={540} y={480} text="solo" f={f} at={solo} color="#dfe6e9" size={56} />
      <Vignette strength={0.7} />
    </Svg>
  );
};

// 1974: Suzuki llega con su lista absurda.
const S8: React.FC<SceneProps> = ({ f, from }) => {
  const plan = L(W("a10", "absurdo"), from);
  const ono = L(W("a10", "onoda"), from);
  const pan = L(W("a10", "panda"), from);
  const yeti = L(W("a10", "abominable"), from);
  const item = (x: number, at: number, label: string, art: React.ReactNode) => (
    <g transform={`translate(${x},620) scale(${lerp(f, at, at + 8, 0, 1)})`}>
      <rect x={-140} y={-150} width={280} height={300} rx={28} fill="#fff" />
      <g transform="translate(0,-20)">{art}</g>
      <text y={120} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill="#222">{label}</text>
      <rect x={-120} y={-170} width={60} height={60} rx={12} fill="#f2b33d" />
      <text x={-90} y={-128} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={36} fill="#fff">✓</text>
    </g>
  );
  return (
    <Svg>
      <River f={f} scroll={f} />
      <Year y={1974} f={f} top={300} />
      <At x={lerp(f, 0, 50, 1300, 620)} y={1740} s={1.15}><Suzuki f={f} walk={f < 50 ? f * 0.3 : null} look={-0.4} mood="happy" /></At>
      <Pill x={540} y={300} text="su lista:" f={f} at={plan} color="#ffeaa7" size={40} />
      {item(200, ono, "Onoda", <g transform="scale(0.28) translate(0,300)"><Onoda f={f} age={0.9} /></g>)}
      {item(540, pan, "un panda", <g transform="scale(0.8)"><Panda f={f} /></g>)}
      {item(880, yeti, "el Yeti", <g transform="scale(0.75)"><Yeti f={f} /></g>)}
    </Svg>
  );
};

// Cierre con cliffhanger: ojos tras las hojas mirando el campamento.
const S9: React.FC<SceneProps> = ({ f }) => (
  <Svg>
    <Void tint="#0f2a1a" />
    <g transform="translate(540,1250)">
      {[0, 1, 2].map((i) => <path key={i} d={`M ${-40 + i * 40} 0 Q ${-20 + i * 40} ${-90 - Math.sin(f / 4 + i) * 20} ${i * 40} -150 Q ${20 + i * 40} -80 ${40 + i * 40} 0 Z`} fill={["#ff9f43", "#feca57", "#ff6b6b"][i]} transform="translate(-40,0)" />)}
      <circle r={260} fill="rgba(255,160,60,0.15)" />
    </g>
    {Array.from({ length: 20 }).map((_, i) => <ellipse key={i} cx={(i * 131) % 1180 - 50} cy={500 + ((i * 53) % 320)} rx={180} ry={80} fill="#0f2a1a" />)}
    <g transform="translate(700,640)" opacity={lerp(f, 20, 30, 0, 1)}>
      <ellipse cx={-30} rx={16} ry={10} fill="#fff" /><ellipse cx={30} rx={16} ry={10} fill="#fff" />
      <circle cx={-30} r={6} fill="#111" /><circle cx={30} r={6} fill="#111" />
    </g>
    <g fontFamily={FONT} textAnchor="middle" opacity={lerp(f, 6, 16, 0, 1)}>
      <rect x={290} y={180} width={500} height={150} rx={30} fill="#ffe08a" />
      <text x={540} y={285} fontSize={90} fontWeight={900} fill="#1a1400">PARTE 2</text>
      <text x={540} y={420} fontSize={44} fontWeight={800} fill="#fff">Síguenos para verla</text>
    </g>
  </Svg>
);

export const SCENES1 = [
  { id: "gancho", start: () => 0, C: S1 },
  { id: "1944", start: () => T("a1"), C: S2 },
  { id: "orden", start: () => T("a2"), C: S3 },
  { id: "folletos", start: () => T("a4"), C: S4 },
  { id: "companeros", start: () => T("a6"), C: S5 },
  { id: "victimas", start: () => T("a8"), C: S6 },
  { id: "solo", start: () => T("a9"), C: S7 },
  { id: "suzuki", start: () => T("a10"), C: S8 },
  { id: "parte2", start: () => T("cta"), C: S9 },
];
