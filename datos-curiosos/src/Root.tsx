import { Composition } from "remotion";
import { Datos } from "./Datos";
import { TOTAL_FRAMES } from "./d/time";

export const RemotionRoot: React.FC = () => (
  <Composition id="DatosCuriosos" component={Datos} durationInFrames={TOTAL_FRAMES} fps={30} width={1080} height={1920} />
);
