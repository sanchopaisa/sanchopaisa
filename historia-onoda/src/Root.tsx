import { Composition } from "remotion";
import { Story, totalOf } from "./Story";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="OnodaParte1" component={Story} defaultProps={{ part: 1 as const }} durationInFrames={totalOf(1)} fps={30} width={1080} height={1920} />
    <Composition id="OnodaParte2" component={Story} defaultProps={{ part: 2 as const }} durationInFrames={totalOf(2)} fps={30} width={1080} height={1920} />
  </>
);
