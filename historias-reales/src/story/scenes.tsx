import React from "react";
import { interpolate, Easing } from "remotion";
import { Dust, Void } from "./bg";
import { Vignette } from "./fx";
import { Bat, Hut, Juliane, Jungle, Plane, Portrait, River, SeatRow, StormSky } from "./real";
import { T, W } from "./time";

export type SceneProps = { f: number; gf: number; from: number; dur: number };
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const lerp = (f: number, a: number, b: number, v0: number, v1: number) => interpolate(f, [a, b], [v0, v1], { ...cl, easing: ease });
const L = (g: number, from: number) => g - from;
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 1080 1920" width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>{children}</svg>
);
const Cam: React.FC<{ z: number; cx?: number; cy?: number; children: React.ReactNode }> = ({ z, cx = 540, cy = 960, children }) => (
  <g transform={`translate(${cx},${cy}) scale(${z}) translate(${-cx},${-cy})`}>{children}</g>
);
const At: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; children: React.ReactNode }> = ({ x, y, s = 1, r = 0, o = 1, children }) => (
  <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>{children}</g>
);
const FONT = "Inter, system-ui";
// Tarjeta tipo interfaz (estilo aprendido).
const Pill: React.FC<{ x: number; y: number; text: string; f: number; at: number; color?: string; size?: number }> = ({ x, y, text, f, at, color = "#fff", size = 38 }) => {
  const p = lerp(f, at, at + 8, 0, 1);
  const w = text.length * size * 0.56 + 60;
  return (
    <g transform={`translate(${x},${y + (1 - p) * 30})`} opacity={p}>
      <rect x={-w / 2} y={-size} width={w} height={size * 1.8} rx={size * 0.9} fill="rgba(10,12,20,0.82)" stroke={color} strokeWidth={4} />
      <text textAnchor="middle" y={size * 0.32} fontFamily={FONT} fontWeight={800} fontSize={size} fill={color}>{text}</text>
    </g>
  );
};
const Day: React.FC<{ n: number; f: number }> = ({ n, f }) => (
  <g transform="translate(150,230)" opacity={lerp(f, 0, 8, 0, 1)}>
    <rect x={-100} y={-50} width={200} height={100} rx={22} fill="#fff" />
    <text textAnchor="middle" y={-12} fontFamily={FONT} fontWeight={700} fontSize={24} fill="#888">DÍA</text>
    <text textAnchor="middle" y={36} fontFamily={FONT} fontWeight={900} fontSize={48} fill="#1f5a35">{n}</text>
  </g>
);

// 1. GANCHO: cae girando entre nubes, altímetro a cero. "Y sobrevivió".
export const S1: React.FC<SceneProps> = ({ f, from }) => {
  const sob = L(T("hook2"), from);
  if (f >= sob) {
    return (
      <Svg>
        <Void tint="#0f2a1a" />
        <g opacity={lerp(f, sob + 4, sob + 14, 0, 1)} fontFamily={FONT} textAnchor="middle">
          <rect x={290} y={760} width={500} height={100} rx={14} fill="none" stroke="#ff5a5a" strokeWidth={6} transform="rotate(-4 540 810)" />
          <text x={540} y={830} fontSize={60} fontWeight={900} fill="#ff5a5a" transform="rotate(-4 540 810)">HISTORIA REAL</text>
          <text x={540} y={980} fontSize={52} fontWeight={800} fill="#fff">24 · 12 · 1971</text>
          <text x={540} y={1050} fontSize={36} fontWeight={600} fill="#9fb">Selva amazónica, Perú</text>
        </g>
      </Svg>
    );
  }
  const alt = Math.round(lerp(f, 0, sob - 4, 3000, 0) / 10) * 10;
  return (
    <Svg>
      <StormSky f={f} rush={1} flash={f % 37 < 2 ? 1 : 0} />
      <At x={540} y={900} s={0.9} r={f * 3}>
        <SeatRow />
        <g transform="translate(0,-40) scale(0.55)"><Juliane f={f} mood="surprised" armL={140} armR={-140} /></g>
      </At>
      <g transform="translate(870,260)">
        <rect x={-150} y={-60} width={300} height={120} rx={24} fill="rgba(255,255,255,0.92)" />
        <text textAnchor="middle" y={22} fontFamily={FONT} fontWeight={900} fontSize={64} fill={alt < 800 ? "#d63031" : "#1e2a40"}>{alt.toLocaleString("es-ES")} m</text>
      </g>
      <Vignette strength={0.7} />
    </Svg>
  );
};

// 2. NOCHEBUENA EN EL AVIÓN.
export const S2: React.FC<SceneProps> = ({ f, from }) => {
  const storm = L(T("c2"), from);
  const split = L(W("c2", "partió"), from);
  const fall = L(T("c3"), from);
  if (f < storm) {
    return (
      <Svg>
        <rect width={1080} height={1920} fill="#cfd5de" />
        <rect x={0} y={1350} width={1080} height={570} fill="#9aa4b2" />
        <g transform="translate(540,620)">
          <ellipse rx={230} ry={300} fill="#8a96a8" />
          <ellipse rx={200} ry={270} fill="#ffb37a" />
          <ellipse cy={140} rx={200} ry={140} fill="#2f7a46" />
          {Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={-160 + i * 30} cy={110 + (i % 3) * 30} r={30} fill="#256b3b" />)}
          <ellipse rx={200} ry={270} fill="none" stroke="#e8ecf2" strokeWidth={16} />
        </g>
        <At x={330} y={1250} s={1.15}><Portrait f={f} kind="madre" /></At>
        <At x={730} y={1700} s={1.1}><Juliane f={f} mood="happy" look={-0.6} /></At>
        <g transform="translate(870,1050) rotate(8)">
          <rect x={-60} y={-50} width={120} height={100} rx={10} fill="#d63031" />
          <rect x={-10} y={-50} width={20} height={100} fill="#f1c40f" />
          <rect x={-60} y={-10} width={120} height={20} fill="#f1c40f" />
        </g>
        <Vignette strength={0.4} />
      </Svg>
    );
  }
  if (f < fall) {
    return (
      <Svg>
        <StormSky f={f} flash={(f - storm) % 26 < 3 ? 1 : 0} />
        <At x={540 + (f - storm) * 2} y={820} s={1.1} r={-4 + Math.sin(f / 4) * 3}>
          <Plane split={lerp(f, split, split + 25, 0, 1)} />
        </At>
        {f > split - 4 && f < split + 3 && <path d="M 560 0 L 520 300 L 600 320 L 540 700" stroke="#fffbe0" strokeWidth={12} fill="none" />}
        <Vignette strength={0.6} />
      </Svg>
    );
  }
  const k = f - fall;
  return (
    <Svg>
      <StormSky f={f} rush={1} />
      <g transform={`translate(0,${-lerp(k, 30, 140, 0, 1100)})`}>
        <rect y={2000} width={1080} height={1200} fill="#1f5a35" />
        {Array.from({ length: 30 }).map((_, i) => <circle key={i} cx={(i * 97) % 1080} cy={2000 + (i % 4) * 30} r={90} fill={["#2a8a4a", "#1d6b3a", "#2f9f55"][i % 3]} />)}
      </g>
      <At x={540} y={lerp(k, 0, 140, 700, 1150)} s={lerp(k, 0, 140, 0.7, 1.1)} r={k * 4}>
        <SeatRow />
        <g transform="translate(0,-40) scale(0.55)"><Juliane f={f} mood="surprised" /></g>
      </At>
      <Vignette strength={0.6} />
    </Svg>
  );
};

// 4. DESPIERTA SOLA.
export const S4: React.FC<SceneProps> = ({ f, from }) => {
  const rota = L(W("c4", "rota"), from);
  const her = L(W("c4", "heridas"), from);
  return (
    <Svg>
      <Cam z={lerp(f, 0, 170, 1.1, 1)} cy={1300}>
        <Jungle f={f} light={0.7} />
        <At x={300} y={1600} s={0.9} r={-12}><SeatRow /></At>
        <At x={640} y={1700} s={1.15}><Juliane f={f} mood={f < 20 ? "neutral" : "worried"} hurt armR={50} look={-0.4} lookY={0.4} /></At>
      </Cam>
      <Day n={1} f={f} />
      <Pill x={540} y={480} text="clavícula rota" f={f} at={rota} color="#ff7675" />
      <Pill x={540} y={600} text="heridas en el brazo" f={f} at={her} color="#ff7675" />
      <Dust f={f} n={25} color="255,250,200" />
      <Vignette strength={0.55} />
    </Svg>
  );
};

// 5. NADIE PODÍA VERLA.
export const S5: React.FC<SceneProps> = ({ f, from }) => {
  const nadie = L(W("c5", "nadie"), from);
  const px = lerp(f, 0, 120, -300, 1400);
  return (
    <Svg>
      <rect width={1080} height={1920} fill="#9fd0f0" />
      <g transform={`translate(${px},300) scale(0.45)`}><Plane /></g>
      {Array.from({ length: 60 }).map((_, i) => (
        <ellipse key={i} cx={(i * 131) % 1180 - 50} cy={350 + ((i * 71) % 600)} rx={170} ry={90} fill={["#1d6b3a", "#2a8a4a", "#175c32", "#23793f"][i % 4]} opacity={0.97} transform={`rotate(${(i * 37) % 60 - 30} ${(i * 131) % 1180 - 50} ${350 + ((i * 71) % 600)})`} />
      ))}
      <rect y={950} width={1080} height={970} fill="#16452b" />
      <At x={540} y={1720} s={1.1}><Juliane f={f} mood={f > nadie ? "sad" : "surprised"} armR={-150} lookY={-1} hurt /></At>
      <Day n={2} f={f} />
      <Vignette strength={0.5} />
    </Svg>
  );
};

// 6. "SIGUE EL AGUA": recuerdo del padre + cadena agua → río → personas.
export const S6: React.FC<SceneProps> = ({ f, from }) => {
  const agua = L(W("c6", "agua."), from);
  const rios = L(W("c6", "ríos"), from);
  const pers = L(W("c6", "personas"), from);
  const memo = lerp(f, 0, 12, 0, 1) * lerp(f, agua + 30, agua + 45, 1, 0.0001);
  return (
    <Svg>
      <River f={f} scroll={f} />
      <g opacity={memo}>
        <circle cx={540} cy={700} r={300} fill="rgba(240,210,150,0.95)" />
        <At x={540} y={700} s={1.2}><Portrait f={f} kind="padre" mood="happy" /></At>
        <circle cx={540} cy={700} r={300} fill="none" stroke="#fff" strokeWidth={10} />
        <text x={540} y={1060} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill="#fff">su padre</text>
      </g>
      <Pill x={250} y={520} text="💧 agua" f={f} at={agua} color="#74b9ff" size={44} />
      <Pill x={540} y={700} text="→ río" f={f} at={rios} color="#74b9ff" size={44} />
      <Pill x={800} y={880} text="→ personas" f={f} at={pers} color="#55efc4" size={44} />
      <At x={lerp(f, agua, agua + 90, 200, 700)} y={1640} s={1}><Juliane f={f} walk={f > agua ? f * 0.25 : null} hurt look={0.8} mood="worried" /></At>
      <Day n={3} f={f} />
    </Svg>
  );
};

// 7. RÍO, CARAMELOS Y LA CABAÑA.
export const S7: React.FC<SceneProps> = ({ f, from, dur }) => {
  const car = L(W("c7", "caramelos"), from);
  const hut = L(T("c8"), from);
  const gas = L(W("c8", "gasolina"), from);
  const day = Math.round(lerp(f, 0, hut, 4, 9));
  if (f < hut) {
    return (
      <Svg>
        <River f={f} scroll={f * 2} />
        <At x={540} y={1760} s={1}><g transform={`translate(0,${Math.sin(f / 6) * 6})`}><Juliane f={f} walk={f * 0.2} hurt mood="worried" look={0.7} /></g></At>
        <rect y={1600} width={1080} height={320} fill="rgba(63,127,140,0.8)" />
        <g transform="translate(830,640)" opacity={lerp(f, car, car + 8, 0, 1)}>
          <path d="M -90 -60 L 90 -60 L 70 80 L -70 80 Z" fill="#f5f0e1" />
          {[[-30, 0, "#e84393"], [20, -10, "#fdcb6e"], [0, 40, "#00cec9"], [40, 35, "#e17055"]].map(([x, y, c], i) => <circle key={i} cx={x as number} cy={y as number} r={18} fill={c as string} />)}
          <text y={130} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill="#fff">su única comida</text>
        </g>
        <Day n={day} f={f} />
      </Svg>
    );
  }
  return (
    <Svg>
      <Jungle f={f} light={0.4} />
      <At x={540} y={1450} s={1.2}><Hut /></At>
      <At x={330} y={1750} s={1}><Juliane f={f} hurt mood="worried" look={0.8} armR={40} /></At>
      <Pill x={540} y={560} text="limpió la herida con gasolina" f={f} at={gas} color="#fdcb6e" size={40} />
      <Day n={10} f={f} />
      <Vignette strength={0.55} />
      {dur > 0 && null}
    </Svg>
  );
};

// 8. RESCATE EN CANOA, DÍA 11.
export const S8: React.FC<SceneProps> = ({ f, from }) => {
  const once = L(W("c9", "once"), from);
  return (
    <Svg>
      <River f={f} scroll={f} />
      <rect width={1080} height={1920} fill={`rgba(255,200,120,${0.15})`} />
      <At x={260} y={1430} s={0.75}><Hut /></At>
      <g transform={`translate(${lerp(f, 0, 80, 1300, 700)},1520)`}>
        <path d="M -260 0 L 260 0 Q 230 70 0 80 Q -230 70 -260 0 Z" fill="#6b4a2a" />
        {[-110, 90].map((x) => (
          <g key={x} transform={`translate(${x},-10)`}>
            <rect x={-30} y={-130} width={60} height={120} rx={20} fill="#c0763a" />
            <circle cy={-170} r={40} fill="#c98b5e" />
            <ellipse cy={-200} rx={60} ry={14} fill="#e2c26a" />
            <rect x={-30} y={-236} width={60} height={40} rx={14} fill="#e2c26a" />
          </g>
        ))}
      </g>
      <At x={300} y={1720} s={0.9}><Juliane f={f} hurt mood={f > 60 ? "happy" : "surprised"} look={1} /></At>
      {f > once && (
        <g transform={`translate(540,600) scale(${lerp(f, once, once + 10, 1.6, 1)})`}>
          <rect x={-230} y={-120} width={460} height={240} rx={40} fill="#fff" />
          <text textAnchor="middle" y={-40} fontFamily={FONT} fontWeight={800} fontSize={40} fill="#888">DÍA</text>
          <text textAnchor="middle" y={90} fontFamily={FONT} fontWeight={900} fontSize={150} fill="#1f5a35">11</text>
        </g>
      )}
    </Svg>
  );
};

// 9. LA ÚNICA: luces que se apagan, una que queda.
export const S9: React.FC<SceneProps> = ({ f }) => (
  <Svg>
    <Void tint="#101822" />
    {Array.from({ length: 92 }).map((_, i) => {
      const x = 140 + (i % 12) * 73;
      const y = 520 + Math.floor(i / 12) * 90;
      const me = i === 41;
      const o = me ? 1 : lerp(f, 10 + (i % 17) * 2, 30 + (i % 17) * 2, 0.8, 0.12);
      return <circle key={i} cx={x} cy={y} r={me ? 22 : 14} fill={me ? "#ffe08a" : "#9fb0c8"} opacity={o} style={me ? { filter: "drop-shadow(0 0 18px #ffd36b)" } : undefined} />;
    })}
  </Svg>
);

// 10. BIÓLOGA EN PANGUANA.
export const S10: React.FC<SceneProps> = ({ f, from }) => {
  const bio = L(W("c11", "bióloga"), from);
  const pan = L(W("c12", "panguana"), from);
  return (
    <Svg>
      <Cam z={lerp(f, 0, 300, 1.15, 1)} cy={1200}>
        <Jungle f={f} light={0.9} />
        <g transform="translate(780,1380)">
          <rect x={-200} y={-160} width={400} height={180} fill="#8a5a2f" />
          <path d="M -240 -160 L 0 -300 L 240 -160 Z" fill="#c8a34a" />
          <rect x={-60} y={-110} width={120} height={130} fill="#5a3a1a" />
        </g>
        <g transform="translate(780,1010)" opacity={lerp(f, pan, pan + 10, 0, 1)}>
          <rect x={-170} y={-45} width={340} height={90} rx={12} fill="#f5e6c8" stroke="#6b4a2a" strokeWidth={6} />
          <text textAnchor="middle" y={18} fontFamily={FONT} fontWeight={900} fontSize={50} fill="#3a5a2a">PANGUANA</text>
        </g>
        <At x={360} y={1720} s={1.1} o={lerp(f, bio - 10, bio, 0, 1)}><Juliane f={f} adult mood="happy" look={0.6} lookY={-0.6} /></At>
      </Cam>
      {Array.from({ length: 5 }).map((_, i) => (
        <At key={i} x={((f * (3 + i) + i * 260) % 1300) - 100} y={420 + i * 70 + Math.sin(f / 10 + i) * 30} s={0.8}><Bat f={f + i * 5} /></At>
      ))}
      <Pill x={540} y={420} text="bióloga" f={f} at={bio} color="#55efc4" size={46} />
      <Dust f={f} n={30} color="255,250,200" />
    </Svg>
  );
};

// 11. CIERRE.
export const S11: React.FC<SceneProps> = ({ f }) => (
  <Svg>
    <Jungle f={f} light={1} dark={0.45} />
    <g fontFamily={FONT} textAnchor="middle" opacity={lerp(f, 4, 16, 0, 1)}>
      <text x={540} y={700} fontSize={74} fontWeight={900} fill="#fff">La chica que</text>
      <text x={540} y={800} fontSize={100} fontWeight={900} fill="#ffe08a">cayó del cielo</text>
      <text x={540} y={880} fontSize={36} fontWeight={700} fill="#9fb">Historia real · Juliane Koepcke</text>
    </g>
  </Svg>
);

export const SCENES: { id: string; start: () => number; C: React.FC<SceneProps> }[] = [
  { id: "gancho", start: () => 0, C: S1 },
  { id: "avion", start: () => T("c1"), C: S2 },
  { id: "despierta", start: () => T("c4"), C: S4 },
  { id: "nadie-la-ve", start: () => T("c5"), C: S5 },
  { id: "sigue-el-agua", start: () => T("c6"), C: S6 },
  { id: "rio-cabana", start: () => T("c7"), C: S7 },
  { id: "rescate", start: () => T("c9"), C: S8 },
  { id: "la-unica", start: () => T("c10"), C: S9 },
  { id: "biologa", start: () => T("c11"), C: S10 },
  { id: "cierre", start: () => T("cta"), C: S11 },
];
