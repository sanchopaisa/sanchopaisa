import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Bg, Captions, Progress } from "./d/kit";
import { Cta, D1, D2, D3, D4, D5, D6, D7, Hook, type SP } from "./d/scenes";
import { T, TOTAL_FRAMES } from "./d/time";

const SCENES: { id: string; at: () => number; C: React.FC<SP>; hue: string; n: number }[] = [
  { id: "gancho", at: () => 0, C: Hook, hue: "#3a2a6b", n: 0 },
  { id: "cleopatra", at: () => T("d1a"), C: D1, hue: "#5a3a1a", n: 1 },
  { id: "venus", at: () => T("d2a"), C: D2, hue: "#5a2a3a", n: 2 },
  { id: "tiburon", at: () => T("d3a"), C: D3, hue: "#163a6b", n: 3 },
  { id: "pulpo", at: () => T("d4a"), C: D4, hue: "#3a1a6b", n: 4 },
  { id: "platano", at: () => T("d5a"), C: D5, hue: "#2a4a1a", n: 5 },
  { id: "baya", at: () => T("d6"), C: D6, hue: "#5a1a2a", n: 6 },
  { id: "arboles", at: () => T("d7a"), C: D7, hue: "#14305a", n: 7 },
  { id: "cierre", at: () => T("cta"), C: Cta, hue: "#3a2a6b", n: 8 },
];

const Box: React.FC<{ s: (typeof SCENES)[number]; from: number; dur: number }> = ({ s, from, dur }) => {
  const f = useCurrentFrame();
  const inn = interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Bg hue={s.hue} />
      <AbsoluteFill style={{ opacity: inn, transform: `scale(${1.08 - 0.08 * inn})`, filter: `blur(${(1 - inn) * 12}px)` }}>
        <s.C f={f} from={from} dur={dur} />
      </AbsoluteFill>
      {s.n >= 1 && s.n <= 7 && <Progress n={s.n} p={Math.min(1, f / dur)} />}
    </AbsoluteFill>
  );
};

export const Datos: React.FC = () => {
  const starts = SCENES.map((s) => s.at());
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {SCENES.map((s, i) => {
        const from = starts[i];
        const dur = (i + 1 < SCENES.length ? starts[i + 1] : TOTAL_FRAMES) - from;
        return (
          <Sequence key={s.id} from={from} durationInFrames={dur} name={`${i}. ${s.id}`}>
            <Box s={s} from={from} dur={dur} />
          </Sequence>
        );
      })}
      <Captions />
      <Audio src={staticFile("voz.wav")} />
      <Audio src={staticFile("musica.wav")} volume={0.3} />
    </AbsoluteFill>
  );
};
