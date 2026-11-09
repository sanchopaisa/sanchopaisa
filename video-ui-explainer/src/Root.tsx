import { Composition } from "remotion";
import { Explainer, totalFrames } from "./Explainer";
import { canalMillon } from "./scripts/ejemplo-canal-millon";
import { FPS, H, W } from "./theme";
import type { VideoProps } from "./types";

// Para añadir un vídeo nuevo: crea src/scripts/mi-video.ts y registra otra <Composition> igual que esta.
export const RemotionRoot: React.FC = () => {
  const props: VideoProps = { scenes: canalMillon };
  return (
    <>
      <Composition
        id="CanalMillon"
        component={Explainer}
        durationInFrames={totalFrames(props)}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={props}
        calculateMetadata={({ props }) => ({ durationInFrames: totalFrames(props) })}
      />
    </>
  );
};
