import { useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { pop, ramp, typed } from "../anim";
import { ClaudeStar } from "./ClaudeStar";

export const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div
    style={{
      background: theme.card,
      borderRadius: 34,
      boxShadow: "0 30px 80px rgba(0,0,0,0.45), 0 2px 0 rgba(255,255,255,0.6) inset",
      fontFamily: theme.font,
      color: theme.ink,
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </div>
);

export const DarkPanel: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div
    style={{
      background: "rgba(36,36,38,0.92)",
      border: `2px solid ${theme.darkBorder}`,
      borderRadius: 30,
      boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
      fontFamily: theme.font,
      color: "#eee",
      ...style,
    }}
  >
    {children}
  </div>
);

// Entrada típica: sube, escala y aparece.
export const Enter: React.FC<{ delay?: number; from?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  delay = 0,
  from = 80,
  style,
  children,
}) => {
  const f = useCurrentFrame();
  const p = pop(f, delay);
  return (
    <div style={{ opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * from}px) scale(${0.9 + 0.1 * p})`, ...style }}>
      {children}
    </div>
  );
};

// Pastilla de paso: (1) el nicho
export const StepPill: React.FC<{ n: number; label: string; scale?: number }> = ({ n, label, scale = 1 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 14 * scale,
      padding: `${12 * scale}px ${34 * scale}px ${12 * scale}px ${14 * scale}px`,
      borderRadius: 999,
      border: `3px solid ${theme.accent}`,
      background: "rgba(30,20,16,0.85)",
      color: "#fff",
      fontFamily: theme.font,
      fontWeight: 700,
      fontSize: 34 * scale,
      boxShadow: `0 0 30px ${theme.accentSoft}`,
    }}
  >
    <span
      style={{
        width: 46 * scale,
        height: 46 * scale,
        borderRadius: "50%",
        background: theme.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26 * scale,
      }}
    >
      {n}
    </span>
    {label}
  </div>
);

// Caja de chat "Escribe a Claude..." con texto que se escribe solo.
export const ChatBox: React.FC<{ text: string; start?: number; width?: number; cps?: number }> = ({ text, start = 0, width = 900, cps = 24 }) => {
  const f = useCurrentFrame();
  const shown = typed(text, f, start, cps);
  const caret = Math.floor(f / 15) % 2 === 0;
  return (
    <DarkPanel style={{ width, padding: "34px 36px 26px", borderRadius: 34 }}>
      <div style={{ fontSize: 40, minHeight: 56, color: shown ? "#f2f2f2" : "#8a8a8a" }}>
        {shown || "Escribe a Claude..."}
        {caret && <span style={{ color: "#fff" }}>|</span>}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2.5px solid #888", color: "#888", fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>+</div>
        <div style={{ width: 62, height: 62, borderRadius: "50%", background: theme.accent, color: "#fff", fontSize: 36, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>↑</div>
      </div>
    </DarkPanel>
  );
};

// Línea curva naranja que se dibuja entre dos puntos (conexión MCP).
export const Connector: React.FC<{ x1: number; y1: number; x2: number; y2: number; start?: number; bend?: number }> = ({ x1, y1, x2, y2, start = 0, bend = -160 }) => {
  const f = useCurrentFrame();
  const p = ramp(f, start, start + 18);
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) + bend;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  return (
    <svg style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }} width="1080" height="1920">
      <path d={d} stroke={theme.accent} strokeWidth={5} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{ filter: `drop-shadow(0 0 10px ${theme.accent})` }} />
    </svg>
  );
};

export const McpBadge: React.FC = () => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 24px", borderRadius: 999, background: "#1d1d1f", border: `2.5px solid ${theme.accent}`, color: "#fff", fontFamily: theme.font, fontWeight: 700, fontSize: 28 }}>
    <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#3ddc6b" }} />
    MCP · conectado
  </div>
);

// Icono de app (cuadrado con degradado) + nombre.
export const AppTile: React.FC<{ label: string; color?: string; icon?: React.ReactNode; size?: number }> = ({ label, color = "linear-gradient(135deg,#8b5cf6,#6d28d9)", icon, size = 190 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, fontFamily: theme.font }}>
    <div style={{ width: size, height: size, borderRadius: size * 0.22, background: color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
      {icon ?? (
        <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M7 15l4-4 3 3 5-6" />
        </svg>
      )}
    </div>
    <div style={{ color: "#fff", fontWeight: 800, fontSize: 40 }}>{label}</div>
  </div>
);

export const ClaudeHeader: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 32, color: "#f2f2f2" }}>
    <div style={{ width: 36, height: 36, marginLeft: -6 }}>
      <ClaudeStar size={36} glow={0.25} color={theme.accent} spin={false} />
    </div>
    Claude
  </div>
);

export const SearchIcon: React.FC<{ size?: number }> = ({ size = 86 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.22, background: "linear-gradient(135deg,#4f8cff,#2f5be0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  </div>
);

export const YouTubeLogo: React.FC<{ h?: number }> = ({ h = 40 }) => (
  <svg viewBox="0 0 28 20" height={h} width={h * 1.4}>
    <rect width="28" height="20" rx="5" fill={theme.red} />
    <path d="M11 5.5v9l8-4.5z" fill="#fff" />
  </svg>
);
