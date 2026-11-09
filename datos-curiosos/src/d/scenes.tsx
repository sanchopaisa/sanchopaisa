import React from "react";
import { C, FactPill, Stat, fmt, lerp, pop } from "./kit";
import { Banana, Cleopatra, Galaxy, Moon, Octopus, Pyramid, Radiation, Shark, Strawberry, Sun, Tree, Venus } from "./art";
import { T, W } from "./time";

export type SP = { f: number; from: number; dur: number };
const L = (gf: number, from: number) => gf - from;
const Svg: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <svg viewBox="0 0 1080 1920" width={1080} height={1920} style={{ position: "absolute", inset: 0, ...style }}>
    {children}
  </svg>
);
const At: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; children: React.ReactNode }> = ({ x, y, s = 1, r = 0, o = 1, children }) => (
  <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`} opacity={o}>{children}</g>
);
const Label: React.FC<{ x: number; y: number; text: string; size?: number; color?: string; o?: number }> = ({ x, y, text, size = 40, color = "#fff", o = 1 }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily={C.font} fontWeight={800} fontSize={size} fill={color} opacity={o} stroke="rgba(5,6,20,0.9)" strokeWidth={10} paintOrder="stroke">{text}</text>
);

// GANCHO: un "7" gigante y los 7 protagonistas girando alrededor.
export const Hook: React.FC<SP> = ({ f, from }) => {
  const boom = L(W("hook2", "volar"), from);
  const shake = f > boom && f < boom + 12 ? Math.sin(f * 3) * 14 : 0;
  const icons = [
    <Pyramid key="p" s={0.55} />, <Venus key="v" spin={f * 2} s={0.8} />, <Shark key="s" f={f} s={0.32} />, <Octopus key="o" f={f} s={0.3} />,
    <Banana key="b" f={f} s={0.38} />, <Strawberry key="st" f={f} s={0.42} />, <Tree key="t" s={0.6} />,
  ];
  const n = Math.min(7, Math.max(1, Math.floor(lerp(f, 0, 30, 1, 7.99))));
  return (
    <Svg>
      <g transform={`translate(${shake},0)`}>
        {icons.map((ic, i) => {
          const a = (i / 7) * Math.PI * 2 + f / 50;
          const p = pop(f, 3 + i * 3);
          return <At key={i} x={540 + Math.cos(a) * 330 * p} y={760 + Math.sin(a) * 330 * p} s={p}>{ic}</At>;
        })}
        <At x={540} y={760} s={pop(f, 0, 9) * (f > boom ? 1 + Math.sin((f - boom) / 3) * 0.05 : 1)}>
          <circle r={170} fill="rgba(255,204,51,0.18)" />
          <text textAnchor="middle" y={110} fontFamily={C.font} fontWeight={900} fontSize={330} fill={C.accent} style={{ filter: "drop-shadow(0 0 30px rgba(255,204,51,0.7))" }}>{n}</text>
        </At>
        {f > boom && (
          <At x={540} y={1180} s={pop(f, boom, 8)} r={-6}>
            <rect x={-300} y={-70} width={600} height={140} rx={20} fill="none" stroke={C.pink} strokeWidth={10} />
            <text textAnchor="middle" y={30} fontFamily={C.font} fontWeight={900} fontSize={84} fill={C.pink}>100% REAL</text>
          </At>
        )}
      </g>
    </Svg>
  );
};

// 1. CLEOPATRA: línea de tiempo proporcional.
export const D1: React.FC<SP> = ({ f, from }) => {
  const pyr = L(W("d1a", "pirámide"), from) - 8;
  const cleo = L(W("d1a", "cleopatra"), from);
  const moon = L(W("d1a", "luna"), from);
  const b = L(T("d1b"), from);
  const x = (y: number) => 120 + ((y + 2560) / 4529) * 840;
  const y0 = 820;
  return (
    <>
      <FactPill n={1} label="Historia" f={f} />
      <Svg>
        <line x1={100} y1={y0} x2={980} y2={y0} stroke="rgba(255,255,255,0.3)" strokeWidth={8} strokeLinecap="round" />
        {f > Math.min(cleo, pyr) && <line x1={x(-2560)} y1={y0} x2={x(-2560) + (x(-69) - x(-2560)) * lerp(f, pyr, pyr + 20, 0, 1)} y2={y0} stroke={C.accent} strokeWidth={12} strokeLinecap="round" />}
        {f > moon && <line x1={x(-69)} y1={y0} x2={x(-69) + (x(1969) - x(-69)) * lerp(f, moon, moon + 20, 0, 1)} y2={y0} stroke={C.green} strokeWidth={12} strokeLinecap="round" />}
        {[
          [x(-2560), pyr, "2560 a.C.", <Pyramid key="p" s={0.7} />],
          [x(-69), cleo, "69 a.C.", <Cleopatra key="c" f={f} s={0.85} />],
          [x(1969), moon, "1969", <Moon key="m" s={0.7} />],
        ].map(([px, at, yr, ic], i) => {
          const p = pop(f, at as number);
          return (
            <g key={i} opacity={Math.min(1, p * 2)}>
              <circle cx={px as number} cy={y0} r={18 * p} fill="#fff" />
              <At x={px as number} y={y0 - 190} s={p}>{ic}</At>
              <Label x={px as number} y={y0 + 70} text={yr as string} size={36} />
            </g>
          );
        })}
        <Label x={(x(-2560) + x(-69)) / 2} y={y0 - 30} text={`${fmt(lerp(f, pyr, pyr + 25, 0, 2491))} años`} size={34} color={C.accent} o={f > pyr ? 1 : 0} />
        <Label x={(x(-69) + x(1969)) / 2} y={y0 - 30} text={`${fmt(lerp(f, moon, moon + 25, 0, 2038))} años`} size={34} color={C.green} o={f > moon ? 1 : 0} />
      </Svg>
      <Stat f={f} at={b} big="+2.400 años" small="tenían ya las pirámides cuando nació Cleopatra" color="#d9822b" />
    </>
  );
};

// 2. VENUS: el año (órbita) termina antes que el día (rotación).
export const D2: React.FC<SP> = ({ f, from }) => {
  const b = L(T("d2b"), from);
  const t = Math.max(0, f - 10);
  const orbit = Math.min(360, t * 2.2); // una vuelta al Sol
  const spin = Math.min(360, t * 2.2 * (225 / 243)); // aún no completa su giro
  const a = ((orbit - 90) * Math.PI) / 180;
  return (
    <>
      <FactPill n={2} label="Espacio" f={f} />
      <Svg>
        <ellipse cx={540} cy={760} rx={360} ry={300} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={4} strokeDasharray="14 14" />
        <At x={540} y={760} s={0.8}><Sun f={f} /></At>
        <At x={540 + Math.cos(a) * 360} y={760 + Math.sin(a) * 300} s={1}><Venus spin={-spin} /></At>
        <Label x={540} y={1140} text={`Año: ${Math.round((orbit / 360) * 225)} / 225 días`} size={44} color={C.accent} o={lerp(f, 6, 14, 0, 1)} />
        <Label x={540} y={1210} text={`Día: ${Math.round((spin / 360) * 243)} / 243 días`} size={44} color={C.pink} o={lerp(f, 6, 14, 0, 1)} />
      </Svg>
      <Stat f={f} at={b + 40} big="243 > 225" small="días que dura un día vs. un año en Venus" source="NASA" color={C.pink} top={330} />
    </>
  );
};

// 3. TIBURONES ANTES QUE LOS ÁRBOLES.
export const D3: React.FC<SP> = ({ f, from }) => {
  const sh = L(W("d3a", "tiburones"), from);
  const tr = L(W("d3a", "árboles"), from);
  const b = L(T("d3b"), from);
  const ruler = (my: number) => 380 + ((450 - my) / 450) * 760;
  return (
    <>
      <FactPill n={3} label="Naturaleza" f={f} />
      <Svg>
        <line x1={150} y1={380} x2={150} y2={1140} stroke="rgba(255,255,255,0.35)" strokeWidth={8} />
        {[[450, "hace 450 M años", C.blue, sh], [385, "hace 385 M años", C.green, tr], [0, "hoy", "#fff", 0]].map(([my, t, c, at], i) => (
          <g key={i} opacity={lerp(f, at as number, (at as number) + 8, 0, 1)}>
            <circle cx={150} cy={ruler(my as number)} r={16} fill={c as string} />
            <text x={190} y={ruler(my as number) + 12} fontFamily={C.font} fontWeight={800} fontSize={34} fill={c as string}>{t as string}</text>
          </g>
        ))}
        <At x={lerp(f, sh, sh + 30, 1300, 680)} y={ruler(450) + 120} s={pop(f, sh) * 0.95}>
          <Shark f={f} />
        </At>
        <At x={760} y={ruler(385) + 210} s={0.9}>
          <Tree grow={lerp(f, tr, tr + 15, 0, 1)} />
        </At>
      </Svg>
      <Stat f={f} at={b + 10} big="+400 M" small="de años nadando en el océano" source="registro fósil" color={C.blue} />
    </>
  );
};

// 4. PULPO: tres corazones y sangre azul.
export const D4: React.FC<SP> = ({ f, from }) => {
  const hearts = L(W("d4a", "corazones"), from) - 6;
  const blue = L(W("d4a", "azul"), from);
  const b = L(T("d4b"), from);
  return (
    <>
      <FactPill n={4} label="Animales" f={f} />
      <Svg>
        {f > blue && <circle cx={540} cy={760} r={420 * lerp(f, blue, blue + 20, 0, 1)} fill="rgba(60,130,255,0.18)" />}
        <At x={540} y={800} s={1.5 * pop(f, 0, 14)}>
          <Octopus f={f} hearts={lerp(f, hearts, hearts + 8, 0, 1)} blue={f > blue ? 1 : 0} />
        </At>
        {f > b && (
          <g opacity={lerp(f, b, b + 10, 0, 1)}>
            <path d="M 400 640 L 210 480" stroke="#fff" strokeWidth={5} />
            <path d="M 680 640 L 870 480" stroke="#fff" strokeWidth={5} />
            <Label x={210} y={460} text="branquia" size={40} color="#9cc2ff" />
            <Label x={870} y={460} text="branquia" size={40} color="#9cc2ff" />
            <path d="M 540 740 L 540 1180" stroke="#fff" strokeWidth={5} opacity={lerp(f, b + 45, b + 55, 0, 1)} />
            <Label x={540} y={1230} text="resto del cuerpo" size={40} color="#9cc2ff" o={lerp(f, b + 45, b + 55, 0, 1)} />
          </g>
        )}
      </Svg>
    </>
  );
};

// 5. PLÁTANO RADIACTIVO.
export const D5: React.FC<SP> = ({ f, from }) => {
  const rad = L(W("d5a", "radiactivos"), from);
  const b = L(W("d5b", "millones"), from);
  const click = f > rad && f % 7 < 2;
  return (
    <>
      <FactPill n={5} label="Ciencia" f={f} />
      <Svg>
        {f < b ? (
          <>
            <At x={540} y={760} s={1.6 * pop(f, 0, 13)}>
              <Banana f={f} glow={f > rad ? 0.6 + Math.sin(f / 4) * 0.4 : 0} />
            </At>
            {f > rad && <At x={820} y={480} s={pop(f, rad)} r={f * 2}><Radiation s={1} /></At>}
            {f > rad && (
              <g transform="translate(250,1080)" opacity={lerp(f, rad, rad + 8, 0, 1)}>
                <rect x={-150} y={-70} width={300} height={140} rx={24} fill="#1e2233" stroke="#4f5b7a" strokeWidth={4} />
                <text x={0} y={-12} textAnchor="middle" fontFamily={C.font} fontWeight={900} fontSize={44} fill={click ? "#7dff6a" : "#3a8a2f"}>clic clic</text>
                <text x={0} y={40} textAnchor="middle" fontFamily={C.font} fontWeight={700} fontSize={32} fill="#aab">potasio-40</text>
              </g>
            )}
          </>
        ) : (
          Array.from({ length: Math.floor(lerp(f, b, b + 25, 1, 42)) }).map((_, i) => (
            <At key={i} x={140 + (i % 6) * 160} y={1180 - Math.floor(i / 6) * 115} s={0.42} r={(i * 37) % 60 - 30}>
              <Banana f={f + i * 7} face={i % 5 === 0} />
            </At>
          ))
        )}
      </Svg>
      {f >= b && <Stat f={f} at={b + 10} big="Millones" small="de plátanos de golpe para que hiciera daño" color="#d9a400" top={330} />}
    </>
  );
};

// 6. BAYA SÍ, FRESA NO.
export const D6: React.FC<SP> = ({ f, from }) => {
  const baya = L(W("d6", "baya"), from);
  const fresa = L(W("d6", "fresa"), from);
  const card = (x: number, at: number, ok: boolean, art: React.ReactNode, name: string) => {
    const p = pop(f, at);
    return (
      <g transform={`translate(${x},780) scale(${p}) rotate(${ok ? -3 : 3})`} opacity={Math.min(1, p * 2)}>
        <rect x={-210} y={-300} width={420} height={600} rx={40} fill="#fff" />
        <g transform="translate(0,-70)">{art}</g>
        <text y={170} textAnchor="middle" fontFamily={C.font} fontWeight={900} fontSize={54} fill="#222">{name}</text>
        <rect x={-150} y={200} width={300} height={74} rx={37} fill={ok ? C.green : "#ff4d5e"} />
        <text y={252} textAnchor="middle" fontFamily={C.font} fontWeight={900} fontSize={40} fill="#fff">{ok ? "✓ BAYA" : "✗ NO ES BAYA"}</text>
      </g>
    );
  };
  return (
    <>
      <FactPill n={6} label="Botánica" f={f} />
      <Svg>
        {card(290, baya - 6, true, <Banana f={f} s={0.9} />, "Plátano")}
        {card(790, fresa - 4, false, <Strawberry f={f} s={0.95} />, "Fresa")}
        <Label x={540} y={1230} text="Sus puntitos son los frutos de verdad" size={36} color="#ffd1dc" o={lerp(f, fresa + 20, fresa + 30, 0, 1)} />
      </Svg>
    </>
  );
};

// 7. MÁS ÁRBOLES QUE ESTRELLAS.
export const D7: React.FC<SP> = ({ f, from }) => {
  const arb = L(W("d7a", "árboles"), from);
  const est = L(W("d7a", "estrellas"), from);
  const b = L(T("d7b"), from);
  const bars = lerp(f, b + 10, b + 50, 0, 1);
  return (
    <>
      <FactPill n={7} label="Planeta" f={f} />
      <Svg>
        <At x={540} y={600} s={1.25 * pop(f, est - 6)}><Galaxy f={f} /></At>
        {Array.from({ length: 15 }).map((_, i) => (
          <At key={i} x={90 + (i % 5) * 225 + (Math.floor(i / 5) % 2) * 110} y={980 + Math.floor(i / 5) * 70} s={0.45 + (i % 3) * 0.06}>
            <Tree grow={lerp(f, arb - 10 + i * 1.5, arb + i * 1.5, 0, 1)} color={["#2fbf71", "#25a862", "#3bd884"][i % 3]} />
          </At>
        ))}
        {f > b && (
          <g opacity={lerp(f, b, b + 8, 0, 1)}>
            <rect x={60} y={300} width={960} height={420} rx={30} fill="rgba(8,10,28,0.88)" />
            <text x={100} y={390} fontFamily={C.font} fontWeight={800} fontSize={38} fill="#cfd6ff">Estrellas en la Vía Láctea</text>
            <rect x={100} y={410} width={880 * (0.4 / 3) * bars} height={56} rx={12} fill="#a78bfa" />
            <text x={110 + 880 * (0.4 / 3) * bars + 16} y={452} fontFamily={C.font} fontWeight={900} fontSize={40} fill="#fff">~400.000 millones</text>
            <text x={100} y={550} fontFamily={C.font} fontWeight={800} fontSize={38} fill="#c8ffd9">Árboles en la Tierra</text>
            <rect x={100} y={570} width={880 * bars} height={56} rx={12} fill={C.green} />
            <text x={120} y={613} fontFamily={C.font} fontWeight={900} fontSize={40} fill="#063">~3 billones</text>
            <text x={100} y={690} fontFamily={C.font} fontSize={26} fill="#99a">Fuente: Nature (2015), NASA</text>
          </g>
        )}
      </Svg>
    </>
  );
};

// CIERRE: ¿cuántos sabías?
export const Cta: React.FC<SP> = ({ f }) => {
  const icons = [
    <Pyramid key="p" s={0.5} />, <Venus key="v" spin={f * 2} s={0.75} />, <Shark key="s" f={f} s={0.28} />, <Octopus key="o" f={f} s={0.27} />,
    <Banana key="b" f={f} s={0.33} />, <Strawberry key="st" f={f} s={0.38} />, <Tree key="t" s={0.55} />,
  ];
  return (
    <Svg>
      <text x={540} y={380} textAnchor="middle" fontFamily={C.font} fontWeight={900} fontSize={90} fill="#fff">¿Cuántos sabías?</text>
      {icons.map((ic, i) => {
        const p = pop(f, 4 + i * 4);
        const x = 220 + (i % 3) * 320 + (i === 6 ? 320 : 0);
        const y = 600 + Math.floor(i / 3) * 260;
        return (
          <g key={i} transform={`translate(${x},${y}) scale(${p})`}>
            <rect x={-130} y={-115} width={260} height={230} rx={30} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth={3} />
            {ic}
            <circle cx={100} cy={-90} r={30} fill={C.accent} />
            <text x={100} y={-78} textAnchor="middle" fontFamily={C.font} fontWeight={900} fontSize={34} fill="#1a1400">{i + 1}</text>
          </g>
        );
      })}
      <g transform={`translate(540,1260) scale(${pop(f, 40)})`}>
        <rect x={-240} y={-50} width={480} height={100} rx={50} fill={C.accent} />
        <text y={16} textAnchor="middle" fontFamily={C.font} fontWeight={900} fontSize={46} fill="#1a1400">Guárdalo 🔖</text>
      </g>
    </Svg>
  );
};
