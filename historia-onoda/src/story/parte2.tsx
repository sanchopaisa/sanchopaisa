import React from "react";
import { Dust, Void } from "./bg";
import { Vignette } from "./fx";
import { Jungle, Plane } from "./real";
import { Leaflet, Onoda, Suzuki, Taniguchi } from "./onoda";
import { At, Bubble, Cam, FONT, Pill, Svg, Year, lerp, type SceneProps } from "./kit";
import { mk } from "./time";
import h from "../parte2.json";

export const P2 = mk(h as never);
const { T, W } = P2;
const L = (g: number, from: number) => g - from;

// Resumen de la parte 1.
const S0: React.FC<SceneProps> = ({ f, dur }) => (
  <Svg>
    <Jungle f={f} light={0.25} dark={0.5} />
    <Cam z={lerp(f, 0, dur, 1.2, 1)}>
      <At x={540} y={1650} s={1.4}><Onoda f={f} age={0.9} look={0.3} /></At>
    </Cam>
    {Array.from({ length: 8 }).map((_, i) => <At key={i} x={120 + i * 120} y={300 + ((f * 6 + i * 90) % 900)} s={0.35} r={i * 30 + f}><Leaflet text={false} /></At>)}
    <g fontFamily={FONT} textAnchor="middle" transform={`scale(${lerp(f, 0, 8, 1.3, 1)})`} style={{ transformOrigin: "540px 300px" }}>
      <rect x={290} y={210} width={500} height={150} rx={30} fill="#ffe08a" />
      <text x={540} y={315} fontSize={90} fontWeight={900} fill="#1a1400">PARTE 2</text>
    </g>
    <Year y="29 años" f={f} at={L(W("b0", "veintinueve"), 0)} top={520} color="#ff7675" />
    <Vignette strength={0.6} />
  </Svg>
);

// Campamento de Suzuki, Onoda aparece.
const S1: React.FC<SceneProps> = ({ f, from }) => {
  const enc = L(W("b1", "encontró"), from);
  return (
    <Svg>
      <Void tint="#0f2a1a" />
      {Array.from({ length: 30 }).map((_, i) => <rect key={i} x={(i * 97) % 1080} y={0} width={30 + (i % 3) * 20} height={1500} fill="#0b1f14" opacity={0.8} />)}
      <rect y={1450} width={1080} height={470} fill="#132a1b" />
      <g transform="translate(540,1560)">
        <path d="M -260 0 L -120 -200 L 20 0 Z" fill="#d9772f" />
        {[0, 1, 2].map((i) => <path key={i} d={`M ${130 + i * 30} 0 Q ${140 + i * 30} ${-80 - Math.sin(f / 4 + i) * 20} ${150 + i * 30} -130 Q ${165 + i * 30} -60 ${180 + i * 30} 0 Z`} fill={["#ff9f43", "#feca57", "#ff6b6b"][i]} />)}
        <circle cx={170} cy={-40} r={260} fill="rgba(255,160,60,0.14)" />
      </g>
      <At x={360} y={1740} s={1.05}><Suzuki f={f} mood={f > enc ? "surprised" : "happy"} look={0.8} /></At>
      <At x={lerp(f, enc - 10, enc + 15, 1250, 820)} y={1740} s={1.05} flip><Onoda f={f} age={1} mood="neutral" look={0.6} /></At>
      <Year y="20 · 2 · 1974" f={f} top={320} />
    </Svg>
  );
};

// Diálogo como chat.
const S2: React.FC<SceneProps> = ({ f, from }) => {
  const b3 = L(T("b3"), from);
  return (
    <Svg>
      <Jungle f={f} light={0.2} dark={0.6} />
      <Bubble x={60} y={380} lines={["La guerra terminó hace", "casi 30 años.", "Vuelve a casa."]} f={f} at={4} name="Norio Suzuki" />
      <Bubble x={300} y={800} w={720} lines={["Solo me rendiré si me", "lo ordena mi comandante."]} f={f} at={b3} mine name="Teniente Onoda" />
      <At x={260} y={1760} s={0.95}><Suzuki f={f} look={0.8} mood="worried" /></At>
      <At x={820} y={1760} s={0.95} flip><Onoda f={f} age={1} look={0.8} mood="neutral" /></At>
    </Svg>
  );
};

// Fotos + librería del comandante.
const S3: React.FC<SceneProps> = ({ f, from }) => {
  const lib = L(W("b4", "comandante"), from);
  if (f < lib) {
    const flash = f % 20 < 2 ? 0.8 : 0;
    return (
      <Svg>
        <Jungle f={f} light={0.5} />
        <At x={330} y={1740} s={1.1}><Suzuki f={f} camera armR={-120} look={0.8} /></At>
        <At x={780} y={1740} s={1.1} flip><Onoda f={f} age={1} salute={1} /></At>
        <rect width={1080} height={1920} fill={`rgba(255,255,255,${flash})`} />
      </Svg>
    );
  }
  return (
    <Svg>
      <rect width={1080} height={1920} fill="#6b4a2a" />
      {[0, 1, 2, 3, 4, 5].map((r) => (
        <g key={r}>
          <rect x={60} y={300 + r * 190} width={960} height={14} fill="#4a3018" />
          {Array.from({ length: 22 }).map((_, i) => <rect key={i} x={70 + i * 43} y={300 + r * 190 - 120 - ((i * 7 + r) % 4) * 10} width={36} height={120 + ((i * 7 + r) % 4) * 10} fill={["#a1281e", "#2a5a8a", "#d9a441", "#3a7a4a", "#7a3a7a"][(i + r) % 5]} />)}
        </g>
      ))}
      <rect y={1450} width={1080} height={470} fill="#4a3018" />
      <At x={540} y={1740} s={1.25}><Taniguchi f={f} old={1} mood="surprised" /></At>
      <Pill x={540} y={240} text="📚 librero en Japón" f={f} at={lib + 10} color="#ffeaa7" size={44} />
    </Svg>
  );
};

// Taniguchi lee la orden en la isla.
const S4: React.FC<SceneProps> = ({ f, from }) => {
  const lee = L(W("b5", "leyó"), from);
  return (
    <Svg>
      {f < 40 ? (
        <>
          <rect width={1080} height={1920} fill="#8fc6e8" />
          <g transform={`translate(${lerp(f, 0, 40, -200, 1300)},600) scale(0.6)`}><Plane /></g>
          <Jungle f={f} light={0.4} />
        </>
      ) : (
        <>
          <Jungle f={f} light={0.8} />
          <At x={330} y={1740} s={1.1}><Taniguchi f={f} old={1} paper={f > lee - 10} look={0.6} /></At>
          <At x={780} y={1740} s={1.1} flip><Onoda f={f} age={1} salute={lerp(f, lee, lee + 10, 0, 1)} look={0.6} /></At>
        </>
      )}
      <Year y="9 · 3 · 1974" f={f} top={300} />
      <Pill x={540} y={480} text="«Cese de toda actividad militar»" f={f} at={lee + 10} color="#ffeaa7" size={36} />
    </Svg>
  );
};

// Promesa cumplida.
const S5: React.FC<SceneProps> = ({ f, from }) => {
  const cum = L(W("b6", "cumplido"), from);
  return (
    <Svg>
      <Void tint="#2a2214" />
      <g transform="translate(540,800)">
        <rect x={-430} y={-160} width={860} height={320} rx={30} fill="#fbf6e6" />
        <text textAnchor="middle" y={-60} fontFamily="Georgia, serif" fontStyle="italic" fontSize={44} fill="#4a3a1a">«Pase lo que pase,</text>
        <text textAnchor="middle" y={20} fontFamily="Georgia, serif" fontStyle="italic" fontWeight={700} fontSize={56} fill="#a1281e">volveremos por ti.»</text>
        <text textAnchor="middle" y={100} fontFamily={FONT} fontWeight={800} fontSize={40} fill="#3a7a4a" opacity={lerp(f, cum, cum + 8, 0, 1)}>1944 → 1974 ✓</text>
      </g>
      <Dust f={f} n={30} />
    </Svg>
  );
};

// Entrega de la espada (figura del presidente de espaldas, sin retrato).
const S6: React.FC<SceneProps> = ({ f, from }) => {
  const per = L(W("b7", "perdón"), from);
  return (
    <Svg>
      <rect width={1080} height={1920} fill="#e9dcc0" />
      <rect y={1450} width={1080} height={470} fill="#8a5a3a" />
      {[160, 920].map((x) => <rect key={x} x={x - 30} y={300} width={60} height={1150} fill="#d8c8a0" />)}
      <g transform="translate(300,1740) scale(1.1)">
        {[-1, 1].map((s) => <rect key={s} x={s * 30 - 18} y={-200} width={36} height={190} rx={14} fill="#2a2a3a" />)}
        <path d="M -74 -420 Q 0 -435 74 -420 L 84 -190 Q 0 -178 -84 -190 Z" fill="#f2efe6" />
        <ellipse cy={-545} rx={84} ry={98} fill="#2a2420" />
      </g>
      <At x={760} y={1740} s={1.1} flip><Onoda f={f} age={0.9} rifle={false} mood="neutral" armR={-80} /></At>
      <g transform={`translate(${lerp(f, 10, 40, 640, 470)},1330) rotate(-8)`}>
        <rect x={-160} y={-10} width={320} height={20} rx={6} fill="#c9c9c9" />
        <rect x={160} y={-16} width={90} height={32} rx={8} fill="#3a2a1a" />
        <rect x={150} y={-30} width={14} height={60} fill="#c9a227" />
      </g>
      <Pill x={540} y={420} text="perdón presidencial" f={f} at={per} color="#55efc4" size={44} />
      <Year y="11 · 3 · 1974" f={f} top={260} color="#2a5a8a" />
    </Svg>
  );
};

// Japón 1974: rascacielos, TV en color, tren bala.
const S7: React.FC<SceneProps> = ({ f, from }) => {
  const tren = L(W("b8", "trenes"), from);
  return (
    <Svg>
      <rect width={1080} height={1920} fill="#9fd0f0" />
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i}>
          <rect x={i * 125} y={500 + ((i * 137) % 400)} width={110} height={1300} fill={["#5a6b8a", "#7a8aa8", "#4a5a7a"][i % 3]} />
          {Array.from({ length: 12 }).map((_, k) => <rect key={k} x={i * 125 + 15 + (k % 3) * 30} y={540 + ((i * 137) % 400) + Math.floor(k / 3) * 70} width={18} height={30} fill="#ffe9a8" opacity={0.8} />)}
        </g>
      ))}
      <rect y={1300} width={1080} height={30} fill="#555" />
      {f > tren - 10 && (
        <g transform={`translate(${lerp(f, tren - 10, tren + 25, 1400, -900)},1210)`}>
          <path d="M 0 0 Q 0 -90 160 -90 L 900 -90 L 900 90 L 0 90 Z" fill="#f4f6f8" />
          <rect x={0} y={20} width={900} height={18} fill="#2a5aa8" />
          {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={200 + i * 70} y={-60} width={44} height={40} rx={8} fill="#2a3a5a" />)}
        </g>
      )}
      <rect y={1330} width={1080} height={590} fill="#7a7a7a" />
      <At x={300} y={1760} s={1.1}><Onoda f={f} age={0.9} rifle={false} mood="surprised" lookY={-0.8} look={0.5} /></At>
      <g transform="translate(800,1560)">
        <rect x={-120} y={-90} width={240} height={180} rx={20} fill="#3a2a1a" />
        <rect x={-100} y={-70} width={200} height={140} rx={10} fill={`hsl(${(f * 8) % 360},70%,60%)`} />
      </g>
      <Pill x={540} y={320} text="Japón, 1974" f={f} at={0} color="#ffeaa7" size={44} />
    </Svg>
  );
};

// Escuela de naturaleza + 1922–2014.
const S8: React.FC<SceneProps> = ({ f, from }) => {
  const mur = L(T("b10"), from);
  if (f < mur) {
    return (
      <Svg>
        <Jungle f={f} light={1} />
        {[[220, 1760], [420, 1800], [880, 1780]].map(([x, y], i) => <At key={i} x={x} y={y} s={0.7}><Suzuki f={f + i * 20} mood="happy" look={i === 2 ? -0.7 : 0.6} /></At>)}
        <At x={650} y={1740} s={1.05}><Onoda f={f} age={1} rifle={false} mood="happy" armR={-120} /></At>
        <Pill x={540} y={420} text="Escuela de naturaleza Onoda" f={f} at={6} color="#55efc4" size={40} />
      </Svg>
    );
  }
  return (
    <Svg>
      <rect width={1080} height={1920} fill="#2a1a2a" />
      <circle cx={540} cy={1100} r={260} fill="#ffb36b" opacity={0.8} />
      <rect y={1150} width={1080} height={770} fill="#1a1020" />
      <g fontFamily={FONT} textAnchor="middle" opacity={lerp(f, mur, mur + 10, 0, 1)}>
        <text x={540} y={620} fontSize={64} fontWeight={900} fill="#fff">Hiroo Onoda</text>
        <text x={540} y={720} fontSize={56} fontWeight={800} fill="#ffe08a">1922 – 2014</text>
      </g>
    </Svg>
  );
};

const S9: React.FC<SceneProps> = ({ f }) => (
  <Svg>
    <Jungle f={f} light={0.6} dark={0.4} />
    <At x={540} y={820} s={2.6} r={Math.sin(f / 10) * 6}><Leaflet /></At>
    <text x={540} y={1180} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={64} fill="#fff">¿Le habrías creído?</text>
  </Svg>
);

export const SCENES2 = [
  { id: "resumen", start: () => 0, C: S0 },
  { id: "encuentro", start: () => T("b1"), C: S1 },
  { id: "dialogo", start: () => T("b2"), C: S2 },
  { id: "libreria", start: () => T("b4"), C: S3 },
  { id: "orden", start: () => T("b5"), C: S4 },
  { id: "promesa", start: () => T("b6"), C: S5 },
  { id: "espada", start: () => T("b7"), C: S6 },
  { id: "japon", start: () => T("b8"), C: S7 },
  { id: "escuela", start: () => T("b9"), C: S8 },
  { id: "pregunta", start: () => T("cta"), C: S9 },
];
