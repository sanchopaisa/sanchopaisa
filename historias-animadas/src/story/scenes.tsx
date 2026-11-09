import React from "react";
import { interpolate, Easing } from "remotion";
import { Abuelo, Lia, Reloj } from "./chars";
import { Attic, Dust, Porch, Room, Street, Void } from "./bg";
import { GoldStream, PlusTen, Ripple, Vignette } from "./fx";
import { mouthOf, T, W } from "./time";

export type SceneProps = { f: number; gf: number; from: number; dur: number };

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const lerp = (f: number, a: number, b: number, v0: number, v1: number) => interpolate(f, [a, b], [v0, v1], { ...cl, easing: ease });
const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 1080 1920" width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
    {children}
  </svg>
);
const Cam: React.FC<{ z: number; cx?: number; cy?: number; children: React.ReactNode }> = ({ z, cx = 540, cy = 960, children }) => (
  <g transform={`translate(${cx},${cy}) scale(${z}) translate(${-cx},${-cy})`}>{children}</g>
);
const At: React.FC<{ x: number; y: number; s?: number; flip?: boolean; children: React.ReactNode }> = ({ x, y, s = 1, flip, children }) => (
  <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>{children}</g>
);
const FreezeDefs = () => (
  <defs>
    <filter id="freeze">
      <feColorMatrix type="saturate" values="0.12" />
      <feColorMatrix type="matrix" values="0.85 0 0 0 0.02  0 0.92 0 0 0.06  0 0 1.1 0 0.14  0 0 0 1 0" />
    </filter>
    <filter id="shadow">
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.85 0" />
      <feGaussianBlur stdDeviation="6" />
    </filter>
  </defs>
);
const rel = (gfAbs: number, from: number) => gfAbs - from;

// 1. GANCHO: el reloj dorado en la oscuridad; en "quién" aparece la sombra del abuelo.
export const S1Hook: React.FC<SceneProps> = ({ f, gf, from }) => {
  const q = rel(W("hook2", "quién"), from);
  const dark = lerp(f, q - 2, q + 6, 0, 1);
  return (
    <Svg>
      <FreezeDefs />
      <Void tint={dark > 0.5 ? "#2a0f12" : "#2a1c10"} />
      <circle cx={540} cy={900} r={700} fill={`rgba(200,30,40,${dark * 0.35})`} />
      <g opacity={dark}>
        <At x={540} y={2150} s={2.4}>
          <g filter="url(#shadow)"><Abuelo f={f} tired={0.6} rock={false} /></g>
        </At>
      </g>
      <Dust f={f} n={30} />
      <Cam z={lerp(f, 0, 140, 1.15, 1)}>
        <At x={540} y={880} s={2.7}>
          <Reloj f={f} open={lerp(f, 4, 18, 0, 1)} awake={lerp(f, 14, 24, 0, 1)} glow={1 - dark * 0.5} hands={f * 2} mood={dark > 0.5 ? "worried" : "happy"} look={dark > 0.5 ? -0.8 : 0} />
        </At>
      </Cam>
      <PlusTen f={f} at={rel(W("hook1", "diez"), from)} x={830} y={560} />
      <Vignette strength={0.7} />
    </Svg>
  );
};

// 2. DESVÁN: Lía desenvuelve el pañuelo y aparece el reloj.
export const S2Attic: React.FC<SceneProps> = ({ f, dur }) => {
  const reveal = lerp(f, dur - 40, dur - 22, 0, 1);
  return (
    <Svg>
      <Cam z={lerp(f, 0, dur, 1, 1.12)} cy={1150}>
        <Attic f={f} />
        <At x={540} y={1720} s={1.5}>
          <Lia f={f} armL={-58} armR={58} mood={reveal > 0.5 ? "surprised" : "neutral"} lookY={0.8} />
          <g transform="translate(0,-262)">
            <circle r={110} fill={`rgba(255,200,80,${0.4 * reveal})`} />
            <path d={`M -80 0 Q -60 ${-70 + reveal * 60} 0 ${-50 + reveal * 70} Q 60 ${-70 + reveal * 60} 80 0 Q 0 40 -80 0 Z`} fill="#c0392b" />
            {[[-40, -10], [10, 5], [45, -15], [-10, 20]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={7} fill="#f6d1c1" />)}
            <g transform={`translate(0,${-20 - reveal * 30}) scale(${0.35 + reveal * 0.15})`} opacity={reveal}>
              <Reloj f={f} open={0} awake={0} glow={1} />
            </g>
          </g>
        </At>
      </Cam>
      <Vignette />
    </Svg>
  );
};

// 3. EL RELOJ HABLA.
export const S3Talk: React.FC<SceneProps> = ({ f, gf, from }) => (
  <Svg>
    <Void tint="#3a2a14" />
    <Dust f={f} n={35} />
    <Cam z={lerp(f, 0, 30, 1.25, 1)}>
      <At x={540} y={820} s={3}>
        <Reloj f={f} open={lerp(f, 0, 12, 0, 1)} awake={lerp(f, 8, 18, 0, 1)} mouth={mouthOf("reloj", gf)} hands={f * 3} glow={1} />
      </At>
    </Cam>
    <At x={250} y={2150} s={1.3}>
      <Lia f={f} mood="surprised" look={0.8} lookY={-0.6} />
    </At>
    <PlusTen f={f} at={rel(W("reloj1", "diez"), from)} x={820} y={1230} />
    <Vignette />
  </Svg>
);

// 4. CONGELAR EL MUNDO: balón, helado, bus.
export const S4Freeze: React.FC<SceneProps> = ({ f, gf, from, dur }) => {
  const fr = rel(W("usa2", "congelar"), from);
  const frozen = f >= fr + 4;
  const ball = rel(W("usa3", "balonazo"), from);
  const ice = rel(W("usa3", "helado"), from);
  const bus = rel(W("usa3", "bus"), from);
  const phase = f < ball ? 0 : f < ice ? 1 : f < bus ? 2 : 3;
  const lx = phase === 1 ? lerp(f, ball, ball + 10, 540, 700) : phase === 2 ? lerp(f, ice, ice + 10, 700, 420) : phase === 3 ? lerp(f, bus, bus + 25, 420, 260) : 540;
  const unfreeze = dur - 8;
  const isFrozen = frozen && f < unfreeze;
  return (
    <Svg>
      <FreezeDefs />
      <g filter={isFrozen ? "url(#freeze)" : undefined}>
        <Street f={f} frozen={isFrozen} />
        {phase === 1 && (
          <g transform="translate(470,1020)">
            {[0, 1, 2].map((i) => <rect key={i} x={-260 - i * 40} y={-30 + i * 30} width={180} height={10} rx={5} fill="#fff" opacity={0.7} />)}
            <circle r={70} fill="#fff" stroke="#222" strokeWidth={6} />
            <path d="M 0 -30 L 28 -10 L 18 24 L -18 24 L -28 -10 Z" fill="#222" />
          </g>
        )}
        {phase === 2 && (
          <g transform={`translate(560,${lerp(f, ice, ice + 4, 900, 1080)}) rotate(160)`}>
            <path d="M -40 0 L 40 0 L 0 120 Z" fill="#d9a35b" />
            <circle cy={-20} r={48} fill="#ff9fc0" />
            <circle cx={-20} cy={-50} r={30} fill="#fff1c7" />
          </g>
        )}
        {phase === 3 && (
          <g transform={`translate(${lerp(f, bus, bus + 6, 1300, 760)},1180)`}>
            <rect x={-260} y={0} width={620} height={400} rx={40} fill="#f7c331" />
            {[0, 1, 2].map((i) => <rect key={i} x={-210 + i * 160} y={50} width={130} height={110} rx={12} fill="#bfe6ff" />)}
            <rect x={-250} y={200} width={110} height={190} rx={8} fill="#3a3a3a" />
            <circle cx={-120} cy={400} r={50} fill="#222" />
            <circle cx={240} cy={400} r={50} fill="#222" />
          </g>
        )}
      </g>
      {isFrozen && <rect width={1080} height={1920} fill="rgba(60,110,200,0.12)" />}
      <At x={lx} y={1700} s={1.4}>
        <Lia
          f={f}
          armR={phase === 2 ? 40 : f > fr - 15 ? -150 : -20}
          armL={phase === 1 ? 40 : 12}
          holdWatch={phase !== 2}
          mood={phase === 0 && !frozen ? "neutral" : "happy"}
          look={phase === 1 ? -0.8 : phase === 3 ? 0.7 : 0}
          bob={phase === 1 ? -lerp(f, ball, ball + 8, 0, 30) : 0}
        />
        {phase === 2 && (
          <g transform="translate(-30,-200) rotate(-10)">
            <path d="M -30 0 L 30 0 L 0 90 Z" fill="#d9a35b" />
            <circle cy={-14} r={36} fill="#ff9fc0" />
          </g>
        )}
      </At>
      <Ripple f={f} at={fr} x={lx + 210} y={1070} />
      <PlusTen f={f} at={rel(T("usa1"), from) + 4} x={760} y={700} label="10 s" />
      <Vignette strength={0.4} />
    </Svg>
  );
};

// 5. ALEGRÍA.
export const S5Joy: React.FC<SceneProps> = ({ f, gf }) => (
  <Svg>
    <Street f={f} />
    <Dust f={f} n={50} color="255,210,90" />
    <Cam z={lerp(f, 0, 20, 1.2, 1.05)} cy={1300}>
      <At x={540} y={1720} s={1.55}>
        <Lia f={f} armL={150} armR={-150} mood="happy" mouth={mouthOf("lia", gf)} bob={-Math.abs(Math.sin(f / 5)) * 40} />
      </At>
    </Cam>
    {[0, 12, 24, 36].map((d, i) => <PlusTen key={i} f={f} at={d} x={[220, 860, 300, 800][i]} y={[700, 640, 1000, 950][i]} />)}
  </Svg>
);

// 6. EL ABUELO SE CANSA.
export const S6Tired: React.FC<SceneProps> = ({ f, from, dur }) => {
  const c2 = rel(T("cansado2"), from);
  const brill = rel(W("cansado1", "brillaba"), from);
  const tired = lerp(f, 0, c2, 0.15, 0.95);
  const slow = Math.max(0.1, 1 - (f - c2) / 60);
  return (
    <Svg>
      <Cam z={f < c2 ? lerp(f, 0, c2, 1, 1.08) : lerp(f, c2, c2 + 20, 1.08, 1.5)} cx={f < c2 ? 540 : 560} cy={f < c2 ? 1200 : 1050}>
        <Room f={f} dim={tired} />
        <At x={470} y={1640} s={1.25}>
          <g style={{ filter: `saturate(${1 - tired * 0.7})` }}>
            <Abuelo f={f} tired={tired} mood={tired > 0.6 ? "sad" : "neutral"} />
          </g>
        </At>
        <At x={900} y={1080} s={0.8}>
          <rect x={-130} y={110} width={260} height={24} fill="#6b3e1f" />
          <Reloj f={f} open={1} awake={0} glow={lerp(f, brill, brill + 12, 0.4, 1.6)} />
        </At>
      </Cam>
      {f >= c2 && (
        <g opacity={lerp(f, c2, c2 + 10, 0, 1)} transform="translate(800,420) scale(0.75)">
          <circle r={230} fill="#2b2b2b" />
          <circle r={200} fill="#f4f1ea" />
          {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={-4} y={-190} width={8} height={26} fill="#333" transform={`rotate(${i * 30})`} />)}
          <rect x={-3} y={-170} width={6} height={170} fill="#c0392b" transform={`rotate(${180 + (f - c2) * 6 * slow})`} />
          <circle r={12} fill="#333" />
        </g>
      )}
      <Vignette strength={0.5 + tired * 0.2} />
    </Svg>
  );
};

// 7. DÍA 30 → 300 segundos → 5 minutos.
export const S7Day30: React.FC<SceneProps> = ({ f, from }) => {
  const t30 = rel(W("dia30", "treinta"), from);
  const c0 = rel(W("dia30", "cuenta"), from);
  const s300 = rel(W("dia30", "segundos"), from);
  const m5 = rel(W("dia30", "cinco"), from);
  const day = Math.round(lerp(f, 0, t30 + 6, 1, 30));
  const secs = Math.round(lerp(f, c0, s300, 10, 300) / 10) * 10;
  const big = f >= m5;
  return (
    <Svg>
      <Void tint="#14203a" />
      <Dust f={f} n={30} color="200,220,255" />
      {f < c0 + 4 && (
        <g transform={`translate(540,880) scale(${lerp(f, c0 - 6, c0 + 4, 1, 0)})`}>
          <rect x={-230} y={-260} width={460} height={520} rx={30} fill="#fff" />
          <rect x={-230} y={-260} width={460} height={120} rx={30} fill="#e04848" />
          <rect x={-230} y={-180} width={460} height={40} fill="#e04848" />
          <text textAnchor="middle" y={-180} fontSize={60} fontWeight={800} fill="#fff" fontFamily="Inter">DÍA</text>
          <text textAnchor="middle" y={170} fontSize={260} fontWeight={900} fill="#222" fontFamily="Inter">{day}</text>
        </g>
      )}
      {f >= c0 && !big && (
        <g transform={`translate(540,900) scale(${lerp(f, c0, c0 + 8, 0.5, 1)})`}>
          <text textAnchor="middle" fontSize={240} fontWeight={900} fill="#ffcf4a" fontFamily="Inter" style={{ filter: "drop-shadow(0 0 30px rgba(255,200,80,0.6))" }}>{secs}</text>
          <text textAnchor="middle" y={110} fontSize={80} fontWeight={800} fill="#fff" fontFamily="Inter">segundos</text>
        </g>
      )}
      {big && (
        <g transform={`translate(540,900) scale(${lerp(f, m5, m5 + 8, 1.6, 1)})`}>
          <text textAnchor="middle" fontSize={300} fontWeight={900} fill="#ffcf4a" fontFamily="Inter" style={{ filter: "drop-shadow(0 0 40px rgba(255,200,80,0.8))" }}>5:00</text>
          <text textAnchor="middle" y={120} fontSize={72} fontWeight={800} fill="#fff" fontFamily="Inter">minutos</text>
        </g>
      )}
      <Vignette />
    </Svg>
  );
};

// 8. LA INSCRIPCIÓN DE LA TAPA.
export const S8Lid: React.FC<SceneProps> = ({ f, from }) => {
  const g = rel(T("grabado"), from);
  const sweep = lerp(f, g - 20, g + 30, -500, 1600);
  return (
    <Svg>
      <defs>
        <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="40%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,240,0.55)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <Void tint="#2c1d0c" />
      <Cam z={lerp(f, 0, 200, 1, 1.12)} cy={900}>
        <At x={540} y={1650} s={3.6}>
          <Reloj f={f} lidFlat={1} open={lerp(f, 0, 30, 0.5, 1)} awake={0} glow={0.5} engraving={lerp(f, g - 30, g + 10, 0, 1)} />
        </At>
      </Cam>
      <rect x={sweep - 400} y={0} width={800} height={1920} fill="url(#sweep)" transform="skewX(-15)" opacity={0.8} />
      <Dust f={f} n={25} />
      <Vignette strength={0.75} />
    </Svg>
  );
};

// 9. LÍA CORRE Y AVISA AL ABUELO.
export const S9Run: React.FC<SceneProps> = ({ f, gf, from }) => {
  const l2 = rel(T("lia2"), from);
  if (f < l2) {
    return (
      <Svg>
        <g transform={`translate(${-f * 14},0)`}>
          <Room f={f} />
          <g transform="translate(1080,0)"><Room f={f} /></g>
        </g>
        <At x={lerp(f, 0, l2, 200, 760)} y={1720} s={1.4}>
          <g transform="rotate(8)">
            <Lia f={f} run={f * 0.55} armL={Math.sin(f * 0.55) * 50} armR={-Math.sin(f * 0.55) * 50} mood="worried" look={1} holdWatch />
          </g>
        </At>
      </Svg>
    );
  }
  return (
    <Svg>
      <Cam z={lerp(f, l2, l2 + 15, 1.15, 1.05)} cy={1300}>
        <Room f={f} dim={0.8} />
        <At x={740} y={1680} s={1.2}>
          <g style={{ filter: "saturate(0.35)" }}>
            <Abuelo f={f} tired={0.95} mood="neutral" look={-0.8} />
          </g>
        </At>
        <At x={260} y={1750} s={1.25}>
          <Lia f={f} mood="worried" mouth={mouthOf("lia", gf)} look={1} armR={-130} holdWatch />
        </At>
      </Cam>
    </Svg>
  );
};

// 10. "TE LO ESTOY REGALANDO YO".
export const S10Gift: React.FC<SceneProps> = ({ f, gf, from }) => {
  const reg = rel(W("abuelo1", "regalando"), from);
  return (
    <Svg>
      <Cam z={lerp(f, 0, 150, 1.35, 1.5)} cx={600} cy={1150}>
        <Room f={f} dim={0.6} />
        <At x={700} y={1700} s={1.25}>
          <g style={{ filter: "saturate(0.55)" }}>
            <Abuelo f={f} tired={0.8} mood="happy" mouth={mouthOf("abuelo", gf)} look={-0.7} armUp={lerp(f, reg - 20, reg, 0, 1)} rock={false} />
          </g>
        </At>
        <At x={300} y={1780} s={1.15}>
          <Lia f={f} mood={f > reg ? "surprised" : "sad"} look={0.9} lookY={-0.5} holdWatch armR={50} />
        </At>
      </Cam>
      <Vignette strength={0.6} />
    </Svg>
  );
};

// 11. GIRA LA CORONA Y DEVUELVE EL TIEMPO.
export const S11Give: React.FC<SceneProps> = ({ f, from }) => {
  const d = rel(T("devuelve"), from);
  if (f < d) {
    return (
      <Svg>
        <Void tint="#3a2a10" />
        <Ripple f={f} at={20} x={540} y={900} color="255,210,110" />
        <Cam z={lerp(f, 0, d, 1, 1.15)}>
          <At x={540} y={950} s={3.2}>
            <Reloj f={f} open={1} awake={1} mood="surprised" hands={-f * 40} crown={-f * 3} glow={lerp(f, 0, d, 0.6, 1.8)} />
          </At>
        </Cam>
        <Dust f={f} n={40} />
      </Svg>
    );
  }
  const k = f - d;
  const heal = lerp(k, 6, 50, 0, 1);
  return (
    <Svg>
      <Room f={f} dim={0.6 - heal * 0.6} />
      <At x={720} y={1650} s={1.25}>
        <g style={{ filter: `saturate(${0.4 + heal * 0.6})` }}>
          <Abuelo f={f} tired={0.9 - heal * 0.9} mood={heal > 0.6 ? "happy" : "surprised"} look={-0.7} />
        </g>
      </At>
      <At x={270} y={1740} s={1.25}>
        <Lia f={f} armR={-150} holdWatch mood="happy" look={1} />
      </At>
      <GoldStream f={k} from={[460, 1180]} to={[720, 1050]} start={0} dur={60} n={50} />
    </Svg>
  );
};

// 12. ATARDECER EN EL PORCHE.
export const S12Porch: React.FC<SceneProps> = ({ f, dur }) => (
  <Svg>
    <Cam z={lerp(f, 0, dur, 1.12, 1)} cy={1300}>
      <Porch f={f} />
      <At x={720} y={1720} s={1.1}>
        <Abuelo f={f} mood="happy" look={-0.5} />
      </At>
      <At x={330} y={1760} s={1.1}>
        <Lia f={f} mood="happy" look={0.8} armR={-130} />
        <g transform="translate(160,-470) rotate(-15)">
          <path d="M -30 0 L 30 0 L 0 90 Z" fill="#d9a35b" />
          <circle cy={-14} r={36} fill="#ff9fc0" />
        </g>
      </At>
      <At x={930} y={1180} s={0.45}>
        <Reloj f={f} open={1} awake={1} mood="happy" glow={1.2} />
      </At>
    </Cam>
  </Svg>
);

// 13. PREGUNTA FINAL + TÍTULO.
export const S13Cta: React.FC<SceneProps> = ({ f, dur }) => {
  const title = dur - 50;
  return (
    <Svg>
      <Void tint="#3a2a14" />
      <Dust f={f} n={40} />
      <At x={540} y={lerp(f, title - 10, title + 10, 820, 700)} s={lerp(f, title - 10, title + 10, 2.8, 2)}>
        <Reloj f={f} open={1} awake={1} mood="happy" wink={f > title - 25 && f < title - 15} glow={1.2} hands={f * 2} />
      </At>
      <g opacity={lerp(f, title, title + 12, 0, 1)} fontFamily="Inter" textAnchor="middle">
        <text x={540} y={1080} fontSize={64} fontWeight={900} fill="#fff">El reloj que regalaba</text>
        <text x={540} y={1200} fontSize={120} fontWeight={900} fill="#ffcf4a">10 segundos</text>
      </g>
      <Vignette />
    </Svg>
  );
};

export const SCENES: { id: string; start: () => number; C: React.FC<SceneProps> }[] = [
  { id: "gancho", start: () => 0, C: S1Hook },
  { id: "desvan", start: () => T("desvan") - 6, C: S2Attic },
  { id: "reloj-habla", start: () => T("reloj1"), C: S3Talk },
  { id: "congelar", start: () => T("usa1"), C: S4Freeze },
  { id: "alegria", start: () => T("lia1"), C: S5Joy },
  { id: "abuelo-cansado", start: () => T("cansado1"), C: S6Tired },
  { id: "dia-30", start: () => T("dia30"), C: S7Day30 },
  { id: "tapa", start: () => T("tapa"), C: S8Lid },
  { id: "corre", start: () => T("corre"), C: S9Run },
  { id: "regalo", start: () => T("abuelo1"), C: S10Gift },
  { id: "devuelve", start: () => T("gira"), C: S11Give },
  { id: "porche", start: () => T("final"), C: S12Porch },
  { id: "pregunta", start: () => T("cta"), C: S13Cta },
];
