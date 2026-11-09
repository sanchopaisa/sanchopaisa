import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SCENES } from "./story/scenes";
import { StoryCaptions } from "./story/Captions";
import { TOTAL_FRAMES } from "./story/time";

const SceneBox: React.FC<{ C: (typeof SCENES)[number]["C"]; from: number; dur: number }> = ({ C, from, dur }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 4], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <C f={f} gf={f + from} from={from} dur={dur} />
    </AbsoluteFill>
  );
};

export const Story: React.FC = () => {
  const starts = SCENES.map((s) => s.start());
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {SCENES.map((s, i) => {
        const from = starts[i];
        const dur = (i + 1 < SCENES.length ? starts[i + 1] : TOTAL_FRAMES) - from;
        return (
          <Sequence key={s.id} from={from} durationInFrames={dur} name={`${i + 1}. ${s.id}`}>
            <SceneBox C={s.C} from={from} dur={dur} />
          </Sequence>
        );
      })}
      <StoryCaptions />
      <Audio src={staticFile("voz.wav")} />
      <Audio src={staticFile("musica.wav")} volume={0.32} />
    </AbsoluteFill>
  );
};
