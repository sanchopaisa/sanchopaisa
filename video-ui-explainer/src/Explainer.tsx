import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Background } from "./components/Background";
import { Captions } from "./components/Captions";
import { VisualView } from "./visuals/Visuals";
import { buildTimeline } from "./timeline";
import type { VideoProps, Visual } from "./types";

// Cada escena entra y sale con un fundido corto + leve zoom/desenfoque.
const SceneWrap: React.FC<{ dur: number; v: Visual }> = ({ dur, v }) => {
  const f = useCurrentFrame();
  const t = 7;
  const o = interpolate(f, [0, t, dur - t, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: o, filter: `blur(${(1 - o) * 10}px)`, transform: `scale(${0.97 + 0.03 * o})` }}>
      <VisualView v={v} />
    </AbsoluteFill>
  );
};

export const Explainer: React.FC<VideoProps> = ({ scenes, voiceover, music }) => {
  const tl = buildTimeline(scenes);
  return (
    <AbsoluteFill>
      <Background />
      {tl.scenes.map(({ def, from, dur }, i) => (
        <Sequence key={i} from={from} durationInFrames={dur} name={`${i + 1}. ${def.visual.type}`}>
          <SceneWrap dur={dur} v={def.visual} />
        </Sequence>
      ))}
      <Captions tokens={tl.tokens} />
      {voiceover && <Audio src={staticFile(voiceover)} />}
      {music && <Audio src={staticFile(music)} volume={0.12} />}
    </AbsoluteFill>
  );
};

export const totalFrames = (p: VideoProps) => buildTimeline(p.scenes).total;
