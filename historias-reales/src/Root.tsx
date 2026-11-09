import { Composition } from "remotion";
import { Story } from "./Story";
import { TOTAL_FRAMES } from "./story/time";

export const RemotionRoot: React.FC = () => (
  <Composition id="ChicaCielo" component={Story} durationInFrames={TOTAL_FRAMES} fps={30} width={1080} height={1920} />
);
