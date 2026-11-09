import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { countUp, pop, ramp, typed } from "../anim";
import type { Visual } from "../types";
import { ClaudeBadge, ClaudeStar } from "../components/ClaudeStar";
import { AppTile, Card, ChatBox, ClaudeHeader, Connector, DarkPanel, Enter, McpBadge, SearchIcon, StepPill, YouTubeLogo } from "../components/ui";
import { Thumbnail, VideoMeta } from "./Thumbnail";

const Center: React.FC<{ top?: number; children: React.ReactNode }> = ({ top = 520, children }) => (
  <AbsoluteFill style={{ alignItems: "center", top }}>{children}</AbsoluteFill>
);

// ---------- 1. Prompt en el chat ----------
const Chat: React.FC<{ text: string }> = ({ text }) => (
  <Center top={800}>
    <Enter>
      <ChatBox text={text} start={6} cps={26} />
    </Enter>
  </Center>
);

// ---------- 2. Explosión: estrella + notificaciones + contador ----------
const Burst: React.FC<Extract<Visual, { type: "burst" }>> = ({ value, label, notifications }) => {
  const f = useCurrentFrame();
  const slots = [
    [-260, 560, -8], [620, 520, 10], [-120, 900, 4], [700, 860, -12], [-200, 1260, 9], [640, 1220, -6], [380, 400, 14], [480, 1640, 6],
  ];
  return (
    <AbsoluteFill>
      {notifications.concat(notifications).slice(0, slots.length).map((n, i) => {
        const [x, y, r] = slots[i];
        const p = pop(f, 2 + i * 3, 12);
        const drift = f * (i % 2 ? 0.6 : -0.6);
        return (
          <div key={i} style={{ position: "absolute", left: x + drift, top: y + (1 - p) * 120, opacity: p * (i > 3 ? 0.55 : 0.95), transform: `rotate(${r}deg) scale(${0.8 + 0.2 * p})`, filter: i > 3 ? "blur(3px)" : undefined }}>
            <Card style={{ display: "flex", alignItems: "center", gap: 18, padding: "20px 34px 20px 20px", borderRadius: 22, width: 520 }}>
              <div style={{ width: 62, height: 62, borderRadius: 16, background: ["#3b5bdb", "#e5322d", "#2fb344", "#f59f00"][i % 4] }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 28 }}>{n}</div>
                <div style={{ fontSize: 20, color: theme.inkSoft }}>YouTube Studio · ahora</div>
              </div>
            </Card>
          </div>
        );
      })}
      <AbsoluteFill style={{ alignItems: "center", top: 640 }}>
        <div style={{ transform: `scale(${pop(f, 0, 10)})` }}>
          <ClaudeStar size={260} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", top: 1060 }}>
        <Enter delay={8}>
          <div style={{ fontFamily: theme.font, textAlign: "center", padding: "20px 60px", borderRadius: 30, background: "rgba(20,20,22,0.6)" }}>
            <div style={{ fontSize: 190, fontWeight: 900, color: theme.accent, letterSpacing: -6, textShadow: `0 0 40px ${theme.accentSoft}` }}>{countUp(value, f, 8, 40)}</div>
            <div style={{ fontSize: 64, fontWeight: 800, color: "#fff", marginTop: -20 }}>{label}</div>
          </div>
        </Enter>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", top: 1500 }}>
        <Enter delay={14}>
          <ChatBox text="" width={820} />
        </Enter>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- 3. Las tres cartas (nicho / vídeo / studio) ----------
const NicheCard: React.FC<{ niche: string }> = ({ niche }) => (
  <Card style={{ width: 360, padding: 30 }}>
    <SearchIcon size={74} />
    <div style={{ fontWeight: 900, fontSize: 46, marginTop: 16 }}>Nicho</div>
    <div style={{ color: theme.inkSoft, fontSize: 24 }}>{niche}</div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 120, marginTop: 20 }}>
      {[30, 45, 60, 78, 100].map((h, i) => (
        <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 8, background: theme.blue }} />
      ))}
    </div>
    <div style={{ color: theme.green, fontWeight: 700, fontSize: 24, marginTop: 14 }}>↗ creciendo</div>
  </Card>
);

const StudioMini: React.FC<{ v: Extract<Visual, { type: "threeCards" }>["video"] }> = ({ v }) => (
  <Card style={{ width: 360, padding: 26 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontWeight: 800, fontSize: 32 }}>Studio</div>
      <div style={{ background: theme.cardMuted, color: theme.inkSoft, padding: "8px 18px", borderRadius: 999, fontSize: 20 }}>Publicar</div>
    </div>
    <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
      <Thumbnail v={v} w={110} />
      <div style={{ fontSize: 20, fontWeight: 700 }}>{v.title.slice(0, 26)}…</div>
    </div>
    <div style={{ marginTop: 16, background: theme.cardMuted, borderRadius: 10, padding: "6px 14px", fontSize: 18, color: theme.inkSoft, display: "inline-block" }}>Borrador</div>
  </Card>
);

const VideoCardBig: React.FC<{ v: Extract<Visual, { type: "threeCards" }>["video"]; w?: number }> = ({ v, w = 440 }) => (
  <Card style={{ width: w, padding: 22 }}>
    <Thumbnail v={v} w={w - 44} />
    <VideoMeta v={{ ...v, views: `${v.views} · ${v.ago}`, ago: "" }} scale={w / 440} />
    <div style={{ display: "inline-flex", marginTop: 14, background: theme.red, color: "#fff", fontWeight: 800, fontSize: 22, padding: "10px 22px", borderRadius: 10 }}>▶ Ver vídeo</div>
  </Card>
);

const ThreeCards: React.FC<Extract<Visual, { type: "threeCards" }>> = ({ niche, video, chip }) => {
  const f = useCurrentFrame();
  const fan = (i: number) => {
    const p = pop(f, 6 + i * 4, 13);
    const x = [-330, 0, 330][i];
    const r = [-6, 0, 6][i];
    return { transform: `translateX(${x * p}px) rotate(${r * p}deg) scale(${0.7 + 0.3 * p})`, opacity: Math.min(1, p * 2) };
  };
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", top: 520 }}>
        <div style={{ transform: `scale(${pop(f, 0)})` }}>
          <ClaudeStar size={170} />
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 540 - 260, top: 1330, width: 520, height: 80, borderRadius: "50%", border: `4px solid ${theme.accent}`, boxShadow: `0 0 40px ${theme.accent}`, opacity: ramp(f, 10, 25) }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", top: 260 }}>
        <div style={{ position: "relative", width: 440, height: 760 }}>
          <div style={{ position: "absolute", left: 40, top: 60, ...fan(0) }}><NicheCard niche={niche} /></div>
          <div style={{ position: "absolute", left: 40, top: 60, ...fan(2) }}><StudioMini v={video} /></div>
          <div style={{ position: "absolute", left: 0, top: 0, ...fan(1) }}><VideoCardBig v={video} /></div>
        </div>
      </AbsoluteFill>
      {chip && (
        <div style={{ position: "absolute", left: 120, top: 1390, opacity: ramp(f, 30, 40), fontFamily: theme.font, background: "#1b1b1d", color: "#fff", padding: "14px 26px", borderRadius: 16, fontWeight: 800, fontSize: 36 }}>
          {chip} <span style={{ fontSize: 24, color: "#aaa" }}>visitas</span>
        </div>
      )}
      {chip && <Connector x1={540} y1={720} x2={250} y2={980} start={20} bend={-40} />}
    </AbsoluteFill>
  );
};

// ---------- 4. Paso N ----------
const ClaudePanel: React.FC<{ step: { n: number; label: string }; prompt?: string; promptStart?: number; style?: React.CSSProperties }> = ({ step, prompt = "", promptStart = 0, style }) => (
  <DarkPanel style={{ width: 640, height: 1180, padding: 30, position: "relative", ...style }}>
    <ClaudeHeader />
    <div style={{ display: "flex", alignItems: "center", gap: 60, marginTop: 40 }}>
      <SearchIcon size={84} />
      <StepPill n={step.n} label={step.label} scale={0.9} />
    </div>
    <div style={{ position: "absolute", left: 24, right: 24, bottom: 24 }}>
      <ChatBox text={prompt} start={promptStart} width={592} cps={22} />
    </div>
  </DarkPanel>
);

const Step: React.FC<Extract<Visual, { type: "step" }>> = ({ n, label, placeholder }) => {
  const f = useCurrentFrame();
  if (placeholder) {
    return (
      <AbsoluteFill style={{ alignItems: "center", top: 580 }}>
        <Enter><StepPill n={n} label={label} scale={1.1} /></Enter>
        <Enter delay={8} style={{ marginTop: 110 }}>
          <Card style={{ width: 460, height: 620, padding: 30, background: "#ececee", transform: `rotate(${-3 + Math.sin(f / 20)}deg)` }}>
            <div style={{ height: 330, border: "3px dashed #b8b8bd", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#9a9aa0", fontSize: 40, fontWeight: 700 }}>
              {placeholder}
              <div style={{ fontSize: 80 }}>?</div>
            </div>
            {[90, 75, 60].map((w, i) => (
              <div key={i} style={{ height: 18, width: `${w}%`, background: "#d7d7db", borderRadius: 9, marginTop: 26 }} />
            ))}
          </Card>
        </Enter>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ alignItems: "center", top: 540 }}>
      <Enter><ClaudePanel step={{ n, label }} /></Enter>
    </AbsoluteFill>
  );
};

// ---------- 5. Conectar app por MCP ----------
const Mcp: React.FC<Extract<Visual, { type: "mcp" }>> = ({ step, app, prompt }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 50, top: 540 }}>
        <ClaudePanel step={step} prompt={prompt} promptStart={34} style={{ width: 560 }} />
      </div>
      <Connector x1={150} y1={580} x2={790} y2={760} start={4} bend={-80} />
      <div style={{ position: "absolute", left: 660, top: 700, transform: `scale(${pop(f, 10)})` }}>
        <AppTile label={app} />
        <div style={{ marginTop: 24, opacity: ramp(f, 22, 30) }}><McpBadge /></div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 6. Gráfica + ranking ----------
const Chart: React.FC<Extract<Visual, { type: "chart" }>> = ({ app, values, leaders }) => {
  const f = useCurrentFrame();
  const max = Math.max(...values);
  const showLeaders = f > 75;
  const lift = ramp(f, 70, 90);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 90, top: 640 - lift * 160, transform: `scale(${1 - lift * 0.08})` }}>
        <Enter>
          <Card style={{ width: 900, padding: 34 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 40 }}>Visitas por día</div>
                <div style={{ color: theme.inkSoft, fontSize: 22 }}>canales pequeños · últimos 14 días</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 26 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#8b5cf6,#6d28d9)" }} />
                {app}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 380, marginTop: 30 }}>
              {values.map((v, i) => {
                const p = ramp(f, 6 + i * 3, 20 + i * 3);
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, opacity: p, marginBottom: 6 }}>{Math.round(v / 1000)}K</div>
                    <div style={{ width: "100%", height: `${(v / max) * 85 * p}%`, background: "linear-gradient(#5b7cfa,#3b5bdb)", borderRadius: 8 }} />
                  </div>
                );
              })}
            </div>
          </Card>
        </Enter>
      </div>
      {showLeaders && (
        <div style={{ position: "absolute", left: 110, top: 1110 }}>
          <Enter from={160}>
            <Card style={{ width: 860, padding: "30px 34px" }}>
              <div style={{ fontWeight: 900, fontSize: 36 }}>Los que más crecen</div>
              <div style={{ color: theme.inkSoft, fontSize: 20, marginBottom: 12 }}>{app} · canales de menos de 3 meses</div>
              {leaders.map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, padding: "14px 0", borderTop: i ? "1.5px solid #eee" : undefined, opacity: ramp(f, 82 + i * 4, 92 + i * 4) }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: l.color }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 28 }}>{l.name}</div>
                    <div style={{ color: theme.inkSoft, fontSize: 18 }}>{l.meta}</div>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: 34, color: theme.blue }}>{l.value}</div>
                </div>
              ))}
            </Card>
          </Enter>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- 7. Ficha de canal ----------
const Stat: React.FC<{ label: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ label, children, style }) => (
  <div style={{ background: theme.cardMuted, borderRadius: 20, padding: "22px 26px", ...style }}>
    <div style={{ color: theme.inkSoft, fontSize: 22, fontWeight: 600 }}>{label}</div>
    {children}
  </div>
);

const Channel: React.FC<Extract<Visual, { type: "channel" }>> = ({ name, handle, weeks, videos, total, perVideo }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", top: 520 }}>
      <Enter>
        <Card style={{ width: 920, padding: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <div style={{ width: 130, height: 130, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#f2b25c,#b8661b)", border: "6px solid #f6d7a8" }} />
            <div>
              <div style={{ fontWeight: 900, fontSize: 46 }}>{name}</div>
              <div style={{ color: theme.inkSoft, fontSize: 24 }}>{handle}</div>
              <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 20, fontWeight: 700 }}>
                <span style={{ background: "#fde2e1", color: theme.red, padding: "4px 14px", borderRadius: 8 }}>YouTube</span>
                <span style={{ background: "#dcf5e3", color: theme.green, padding: "4px 14px", borderRadius: 8 }}>↗ creciendo</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 34 }}>
            <Stat label="abierto hace" style={{ flex: 1, opacity: ramp(f, 20, 30) }}>
              <div style={{ fontWeight: 900, fontSize: 54 }}>{weeks} semanas</div>
            </Stat>
            <Stat label="publicados" style={{ flex: 1, opacity: ramp(f, 55, 65) }}>
              <div style={{ fontWeight: 900, fontSize: 54 }}>{videos} vídeos</div>
            </Stat>
          </div>
          <Stat label="visitas totales" style={{ marginTop: 20, opacity: ramp(f, 80, 90) }}>
            <div style={{ fontWeight: 900, fontSize: 120, color: theme.blue, letterSpacing: -4 }}>{countUp(total, f, 82, 50)}</div>
          </Stat>
          <div style={{ marginTop: 20, opacity: ramp(f, 170, 180), transform: `scale(${0.9 + 0.1 * pop(f, 170)})` }}>
            <Stat label="de media" style={{ background: "#fff3ec", border: `3px solid ${theme.accent}` }}>
              <div style={{ fontWeight: 900, fontSize: 84, color: theme.accent }}>
                {countUp(perVideo, f, 172, 30)} <span style={{ fontSize: 40, color: theme.ink }}>/ vídeo</span>
              </div>
            </Stat>
          </div>
        </Card>
      </Enter>
    </AbsoluteFill>
  );
};

// ---------- 8. Rejilla de vídeos del nicho ----------
const VideoGrid: React.FC<Extract<Visual, { type: "videoGrid" }>> = ({ title, subtitle, videos }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ top: 540, left: 50 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: theme.font, color: "#fff", opacity: ramp(f, 0, 10) }}>
        <YouTubeLogo h={44} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 36 }}>{title}</div>
          <div style={{ fontSize: 22, color: "#aaa" }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 310px)", gap: 20, marginTop: 30 }}>
        {videos.slice(0, 6).map((v, i) => (
          <Enter key={i} delay={6 + i * 4}>
            <Card style={{ padding: 14, borderRadius: 22, height: 420 }}>
              <Thumbnail v={v} w={282} />
              <VideoMeta v={v} scale={0.95} />
            </Card>
          </Enter>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ---------- 9. Vídeo viral + análisis ----------
const Viral: React.FC<Extract<Visual, { type: "viral" }>> = ({ video, badge, days, hook }) => {
  const f = useCurrentFrame();
  const analyzing = !!hook;
  const shift = analyzing ? ramp(f, 40, 60) : 0;
  const scan = analyzing ? ramp(f, 8, 40) : 0;
  const card = (
    <Card style={{ width: 780, padding: 30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div style={{ width: 54, height: 54, borderRadius: "50%", background: video.color }} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 28 }}>{video.channel}</div>
          <div style={{ color: theme.inkSoft, fontSize: 20 }}>{video.ago}</div>
        </div>
      </div>
      <Thumbnail
        v={video}
        w={720}
        overlay={
          <>
            <div style={{ position: "absolute", left: "50%", top: 70, transform: `translateX(-50%) scale(${pop(f, 6)})`, background: "rgba(10,12,20,0.85)", color: "#fff", padding: "14px 40px", borderRadius: 18, fontWeight: 900, fontSize: 84, whiteSpace: "nowrap" }}>
              {badge} <span style={{ fontSize: 44, fontWeight: 700 }}>visitas</span>
            </div>
            <div style={{ position: "absolute", left: "50%", top: 200, transform: `translateX(-50%)`, opacity: ramp(f, 20, 30), background: "rgba(10,12,20,0.85)", color: "#fff", padding: "8px 26px", borderRadius: 999, fontWeight: 700, fontSize: 30 }}>
              📅 {days}
            </div>
            {analyzing && (
              <div style={{ position: "absolute", left: 0, right: 0, top: `${scan * 100}%`, height: 8, background: theme.accent, boxShadow: `0 0 30px ${theme.accent}`, opacity: scan < 1 ? 1 : 0 }} />
            )}
          </>
        }
      />
      <div style={{ fontWeight: 900, fontSize: 38, marginTop: 24, background: analyzing ? `rgba(232,121,74,${0.25 * scan})` : undefined, borderRadius: 8 }}>{video.title}</div>
      {[95, 80].map((w, i) => (
        <div key={i} style={{ height: 14, width: `${w}%`, background: "#ececef", borderRadius: 7, marginTop: 18 }} />
      ))}
      <div style={{ display: "inline-flex", marginTop: 22, background: theme.red, color: "#fff", fontWeight: 800, fontSize: 26, padding: "12px 26px", borderRadius: 12 }}>▶ Ver vídeo</div>
    </Card>
  );
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 150 - shift * 110, top: 560, transform: `scale(${1 - shift * 0.35})`, transformOrigin: "left top" }}>
        <Enter>{card}</Enter>
        {analyzing && (
          <div style={{ position: "absolute", left: -40, top: -40, transform: `scale(${pop(f, 2)})` }}>
            <ClaudeBadge size={100} />
          </div>
        )}
      </div>
      {analyzing && f > 50 && (
        <div style={{ position: "absolute", left: 320, top: 830 }}>
          <Enter from={120}>
            <DarkPanel style={{ width: 680, minHeight: 720, padding: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 800, fontSize: 38 }}>
                <span style={{ color: theme.accent }}>✱</span> Tu vídeo
              </div>
              <div style={{ color: "#999", fontSize: 24, marginTop: 4 }}>con el gancho que ya funciona</div>
              <div style={{ fontSize: 40, lineHeight: 1.35, marginTop: 40, color: "#f4f4f4" }}>
                {typed(hook!, f, 62, 28)}
                <span style={{ opacity: Math.floor(f / 15) % 2 }}>|</span>
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 40, opacity: ramp(f, 120, 135) }}>
                {["guion", "voz", "imágenes"].map((t) => (
                  <div key={t} style={{ border: `2px solid ${theme.accent}`, color: "#fff", padding: "8px 22px", borderRadius: 999, fontSize: 26, fontWeight: 700 }}>✓ {t}</div>
                ))}
              </div>
            </DarkPanel>
          </Enter>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- 10. YouTube Studio ----------
const Studio: React.FC<Extract<Visual, { type: "studio" }>> = ({ video, description, phase }) => {
  const f = useCurrentFrame();
  const review = phase === "review";
  const prog = Math.round(ramp(f, 30, 120) * 100);
  const publishPress = review ? pop(f, 95, 8) : 0;
  return (
    <AbsoluteFill>
      {!review && <Enter delay={0} style={{ position: "absolute", left: 540 - 160, top: 520 }}><StepPill n={3} label="la subida" /></Enter>}
      <Connector x1={130} y1={740} x2={950} y2={740} start={review ? -30 : 20} bend={-120} />
      <div style={{ position: "absolute", left: 60, top: 680, opacity: review ? 1 : ramp(f, 18, 26), transform: `scale(${review ? 1 : pop(f, 18)})` }}><ClaudeBadge size={130} /></div>
      <div style={{ position: "absolute", left: 890, top: 680, opacity: review ? 1 : ramp(f, 22, 30), transform: `scale(${review ? 1 : pop(f, 22)})`, background: "#fff", borderRadius: 30, width: 130, height: 130, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 30px rgba(0,0,0,0.4)" }}><YouTubeLogo h={60} /></div>
      <div style={{ position: "absolute", left: 540 - 125, top: 630, opacity: review ? 1 : ramp(f, 28, 36) }}><McpBadge /></div>
      <div style={{ position: "absolute", left: 90, top: 820 }}>
        <Enter delay={review ? 0 : 4}>
          <Card style={{ width: 900, minHeight: 660, padding: 36 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontWeight: 900, fontSize: 40 }}><YouTubeLogo h={36} /> Studio</div>
              <div style={{ background: review && f > 60 ? theme.green : theme.cardMuted, color: review && f > 60 ? "#fff" : "#999", padding: "14px 36px", borderRadius: 999, fontWeight: 800, fontSize: 28, transform: `scale(${1 - 0.1 * Math.sin(publishPress * Math.PI)})` }}>Publicar</div>
            </div>
            <div style={{ display: "flex", gap: 40, marginTop: 30, fontSize: 24, fontWeight: 700, color: theme.inkSoft, borderBottom: "2px solid #eee", paddingBottom: 12 }}>
              <span style={{ color: theme.blue, borderBottom: `4px solid ${theme.blue}`, paddingBottom: 10 }}>Contenido</span>
              <span>Analíticas</span>
              <span>Comentarios</span>
            </div>
            {f < 26 && !review ? (
              <div style={{ textAlign: "center", color: "#aaa", fontSize: 30, marginTop: 140 }}>⇪<br />Aún no hay vídeos</div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 30 }}>
                <Thumbnail v={video} w={200} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 28 }}>{video.title}</div>
                  {review ? (
                    <div style={{ display: "inline-block", marginTop: 10, background: theme.cardMuted, padding: "4px 16px", borderRadius: 8, fontSize: 20, color: theme.inkSoft }}>{f > 100 ? "Público" : "Borrador"}</div>
                  ) : (
                    <>
                      <div style={{ height: 10, background: "#e5e7eb", borderRadius: 5, marginTop: 14 }}>
                        <div style={{ width: `${prog}%`, height: "100%", background: theme.blue, borderRadius: 5 }} />
                      </div>
                      <div style={{ fontSize: 20, color: theme.blue, marginTop: 6 }}>Subiendo... {prog} %</div>
                    </>
                  )}
                </div>
              </div>
            )}
            {review &&
              [
                ["Título", video.title],
                ["Descripción", description],
                ["Miniatura", "1280 × 720"],
              ].map(([k, v], i) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 26, padding: "18px 20px", background: theme.cardMuted, borderRadius: 18, opacity: ramp(f, 4 + i * 14, 12 + i * 14) }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: theme.inkSoft, fontSize: 20 }}>{k}</div>
                    <div style={{ fontWeight: 700, fontSize: 26 }}>{v}</div>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: theme.green, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, transform: `scale(${pop(f, 10 + i * 14)})` }}>✓</div>
                </div>
              ))}
          </Card>
        </Enter>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 11. Móvil con chat ----------
const Phone: React.FC<Extract<Visual, { type: "phone" }>> = ({ contact, incoming, outgoing, mediaValue }) => {
  const f = useCurrentFrame();
  const bubble = (mine: boolean, children: React.ReactNode, delay: number) => (
    <div style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "78%", background: mine ? "#d9fdd3" : "#fff", borderRadius: 18, padding: "16px 20px", fontSize: 28, marginTop: 18, boxShadow: "0 1px 1px rgba(0,0,0,0.1)", opacity: ramp(f, delay, delay + 8), transform: `translateY(${(1 - ramp(f, delay, delay + 8)) * 30}px)` }}>
      {children}
    </div>
  );
  return (
    <AbsoluteFill style={{ alignItems: "center", top: 470 }}>
      <Enter>
        <div style={{ width: 640, height: 1260, borderRadius: 80, background: "#0d0d0f", padding: 18, boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 64, overflow: "hidden", background: "#efe7de", fontFamily: theme.font, display: "flex", flexDirection: "column" }}>
            <div style={{ background: "#fff", padding: "60px 30px 20px", display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ color: "#007aff", fontSize: 40 }}>‹</span>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#cfd3d8" }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 30 }}>{contact}</div>
                <div style={{ color: theme.green, fontSize: 20 }}>en línea</div>
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 24 }}>
              {bubble(false, incoming, 4)}
              {bubble(
                true,
                <div style={{ width: 300, height: 360, borderRadius: 12, background: "#151517", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <ClaudeStar size={90} />
                  <div style={{ color: theme.accent, fontWeight: 900, fontSize: 58, marginTop: 50 }}>{mediaValue}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 24 }}>visitas / mes</div>
                </div>,
                24,
              )}
              {bubble(true, outgoing, 48)}
            </div>
            <div style={{ background: "#f6f6f6", padding: "20px 26px 40px", display: "flex", gap: 16 }}>
              <div style={{ flex: 1, background: "#fff", borderRadius: 999, padding: "14px 22px", color: "#999", fontSize: 24 }}>Mensaje</div>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: theme.green }} />
            </div>
          </div>
        </div>
      </Enter>
    </AbsoluteFill>
  );
};

// ---------- 12. Cierre ----------
const End: React.FC<{ handle: string }> = ({ handle }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0d", alignItems: "center", justifyContent: "center", opacity: ramp(f, 0, 8) }}>
      <ClaudeStar size={180} />
      <div style={{ marginTop: 120, display: "flex", alignItems: "center", gap: 20, padding: "22px 40px", background: "#fff", borderRadius: 20, fontFamily: theme.font, fontSize: 42, fontWeight: 700, color: theme.ink, transform: `scale(${pop(f, 6)})` }}>
        🔍 {typed(handle, f, 10, 20)}
      </div>
      <div style={{ color: "#aaa", fontFamily: theme.font, fontSize: 34, marginTop: 30, opacity: interpolate(f, [30, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>Sígueme para más</div>
    </AbsoluteFill>
  );
};

export const VisualView: React.FC<{ v: Visual }> = ({ v }) => {
  switch (v.type) {
    case "chat": return <Chat text={v.text} />;
    case "burst": return <Burst {...v} />;
    case "threeCards": return <ThreeCards {...v} />;
    case "step": return <Step {...v} />;
    case "mcp": return <Mcp {...v} />;
    case "chart": return <Chart {...v} />;
    case "channel": return <Channel {...v} />;
    case "videoGrid": return <VideoGrid {...v} />;
    case "viral": return <Viral {...v} />;
    case "studio": return <Studio {...v} />;
    case "phone": return <Phone {...v} />;
    case "end": return <End handle={v.handle} />;
  }
};
