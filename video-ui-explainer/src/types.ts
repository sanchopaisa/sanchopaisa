export type Thumb = { word: string; color: string; title: string; channel: string; views: string; ago: string };

export type Visual =
  | { type: "chat"; text: string }
  | { type: "burst"; value: number; label: string; notifications: string[] }
  | { type: "threeCards"; niche: string; video: Thumb; chip?: string }
  | { type: "step"; n: number; label: string; placeholder?: string }
  | { type: "mcp"; step: { n: number; label: string }; app: string; prompt: string }
  | { type: "chart"; app: string; values: number[]; leaders: { name: string; meta: string; value: string; color: string }[] }
  | { type: "channel"; name: string; handle: string; weeks: number; videos: number; total: number; perVideo: number }
  | { type: "videoGrid"; title: string; subtitle: string; videos: Thumb[] }
  | { type: "viral"; video: Thumb; badge: string; days: string; hook?: string }
  | { type: "studio"; video: Thumb; description: string; phase: "upload" | "review" }
  | { type: "phone"; contact: string; incoming: string; outgoing: string; mediaValue: string }
  | { type: "end"; handle: string };

export type SceneDef = {
  /** Texto locutado; *palabra* = palabra clave resaltada. */
  say?: string;
  seconds: number;
  visual: Visual;
  /** Opcional: tiempos [inicio, fin] en segundos (absolutos) por palabra, si hay voiceover transcrito. */
  words?: [number, number][];
};

export type VideoProps = { scenes: SceneDef[]; voiceover?: string; music?: string };
