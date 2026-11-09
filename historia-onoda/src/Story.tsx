import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { StoryCaptions } from "./story/Captions";
import type { SceneProps } from "./story/kit";
import { P1, SCENES1 } from "./story/parte1";
import { P2, SCENES2 } from "./story/parte2";

type Sc = { id: string; start: () => number; C: React.FC<SceneProps> };
const PARTS = { 1: { P: P1, S: SCENES1 as Sc[] }, 2: { P: P2, S: SCENES2 as Sc[] } };

const Box: React.FC<{ C: React.FC<SceneProps>; from: number; dur: number }> = ({ C, from, dur }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: interpolate(f, [0, 4], [0, 1], { extrapolateRight: "clamp" }) }}>
      <C f={f} gf={f + from} from={from} dur={dur} />
    </AbsoluteFill>
  );
};

export const Story: React.FC<{ part: 1 | 2 }> = ({ part }) => {
  const { P, S } = PARTS[part];
  const starts = S.map((s) => s.start());
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {S.map((s, i) => {
        const from = starts[i];
        const dur = (i + 1 < S.length ? starts[i + 1] : P.TOTAL) - from;
        return (
          <Sequence key={s.id} from={from} durationInFrames={dur} name={`${i + 1}. ${s.id}`}>
            <Box C={s.C} from={from} dur={dur} />
          </Sequence>
        );
      })}
      <StoryCaptions h={P.H} />
      <Audio src={staticFile(`voz-parte${part}.wav`)} />
      <Audio src={staticFile(`musica-parte${part}.wav`)} volume={0.3} />
    </AbsoluteFill>
  );
};
export const totalOf = (part: 1 | 2) => PARTS[part].P.TOTAL;
