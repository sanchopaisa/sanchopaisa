import type { SceneDef, Thumb } from "../types";

// Guion de ejemplo: recreación del vídeo de referencia "canal de 1 millón con Claude".
// Para un vídeo nuevo, copia este archivo y cambia textos, duraciones y datos.

const noe: Thumb = { word: "NOÉ", color: "#2563eb", title: "Noé y el diluvio: lo que nadie te contó", channel: "Biblia Animada", views: "3 M visitas", ago: "hace 9 días" };

export const canalMillon: SceneDef[] = [
  { seconds: 3, say: "¿Sabías que *Claude* te puede hacer un", visual: { type: "chat", text: "Hazme un canal de un millón de visitas al mes" } },
  {
    seconds: 3.8,
    say: "canal de YouTube de *1 millón* de visitas al mes sin que grabes nada?",
    visual: { type: "burst", value: 1000000, label: "visitas / mes", notifications: ["1 M de visualizaciones", "Hito: 100.000 suscriptores", "+48.000 visualizaciones hoy", "Nuevo suscriptor"] },
  },
  { seconds: 4.6, say: "Porque un canal de YouTube son *tres* pasos y los *tres* ya los hace *Claude.*", visual: { type: "threeCards", niche: "historias bíblicas", video: noe } },
  { seconds: 1.8, say: "Paso uno: el *nicho.*", visual: { type: "step", n: 1, label: "el nicho" } },
  { seconds: 4.8, say: "Conectas *NexLev* con un *MCP* y le pides canales pequeños que estén petando.", visual: { type: "mcp", step: { n: 1, label: "el nicho" }, app: "NexLev", prompt: "Dame canales pequeños que estén petando" } },
  {
    seconds: 5.6,
    say: "*NexLev* cuenta cada día las visitas de miles de canales y *Claude* te trae los que ya crecen.",
    visual: {
      type: "chart",
      app: "NexLev",
      values: [42, 55, 61, 58, 74, 85, 95, 110, 128, 145, 166, 188, 216, 249].map((k) => k * 1000),
      leaders: [
        { name: "Misterios del Mar", meta: "hace 9 semanas · 22 vídeos", value: "2,8 M", color: "#14b8a6" },
        { name: "Datos Express", meta: "hace 7 semanas · 31 vídeos", value: "2,5 M", color: "#eab308" },
        { name: "Historias de la Biblia", meta: "hace 5 semanas · 14 vídeos", value: "2,3 M", color: "#d97706" },
        { name: "Leyendas Urbanas", meta: "hace 8 semanas · 19 vídeos", value: "1,9 M", color: "#7c3aed" },
        { name: "Mini Documentales", meta: "hace 6 semanas · 12 vídeos", value: "1,4 M", color: "#e11d48" },
      ],
    },
  },
  {
    seconds: 8.4,
    say: "Como este de historias bíblicas: abierto hace *5* semanas, *14* vídeos y lleva *2,3 millones* de visitas. ¡Más de *160.000* por *vídeo!*",
    visual: { type: "channel", name: "Historias de la Biblia", handle: "@historiasdelabiblia", weeks: 5, videos: 14, total: 2300000, perVideo: 160000 },
  },
  { seconds: 2.6, say: "Paso dos: el *vídeo.* No lo inventas.", visual: { type: "step", n: 2, label: "el vídeo", placeholder: "tu vídeo" } },
  {
    seconds: 4,
    say: "Le pides a Claude los vídeos del *nicho* que más visitas han hecho este mes.",
    visual: {
      type: "videoGrid",
      title: "Vídeos del nicho",
      subtitle: "historias bíblicas",
      videos: [
        { word: "MOISÉS", color: "#c2410c", title: "Moisés abre el mar en 60 segundos", channel: "Relatos Sagrados", views: "1,1 M visitas", ago: "hace 3 sem" },
        noe,
        { word: "JONÁS", color: "#15803d", title: "Jonás: tres días dentro de un pez", channel: "Fe en Minutos", views: "860 K visitas", ago: "hace 18 días" },
        { word: "DAVID", color: "#7e22ce", title: "David contra Goliat, explicado", channel: "Relatos Sagrados", views: "640 K visitas", ago: "hace 4 sem" },
        { word: "EDÉN", color: "#16a34a", title: "El jardín del Edén existió aquí", channel: "Biblia Animada", views: "1,4 M visitas", ago: "hace 2 sem" },
        { word: "BABEL", color: "#b45309", title: "La torre de Babel: por qué cayó", channel: "Historias Eternas", views: "420 K visitas", ago: "hace 25 días" },
      ],
    },
  },
  { seconds: 4.6, say: "Este lleva *3 millones* en 9 días. Si YouTube lo sigue recomendando es porque engancha.", visual: { type: "viral", video: noe, badge: "3 M", days: "en 9 días" } },
  {
    seconds: 5.6,
    say: "*Claude* lo analiza, saca el *gancho* que está funcionando y te hace el tuyo: guion, voz e imágenes.",
    visual: { type: "viral", video: noe, badge: "3 M", days: "en 9 días", hook: "«Noé tardó 100 años en construir el arca… y nadie le creyó hasta el último día.»" },
  },
  { seconds: 5.2, say: "Paso *tres:* la *subida.* Con un *MCP* de YouTube, *Claude* lo sube directo a tu canal.", visual: { type: "studio", video: noe, description: "Lo que pasó dentro del arca durante cuarenta días...", phase: "upload" } },
  { seconds: 4.4, say: "Título, descripción y miniatura. Tú *solo* revisas y le das a *publicar.*", visual: { type: "studio", video: noe, description: "Lo que pasó dentro del arca durante cuarenta días...", phase: "review" } },
  {
    seconds: 6.6,
    say: "Así que el *millón* no lo hace la *suerte.* Lo hace un *nicho* que ya crece, un *gancho* que ya funciona y un *vídeo* que se sube *solo.*",
    visual: { type: "threeCards", niche: "historias bíblicas", video: noe, chip: "2,3 M" },
  },
  {
    seconds: 4,
    say: "Envíaselo a ese amigo que todavía busca *nichos* a mano.",
    visual: { type: "phone", contact: "Dani", incoming: "llevo una semana buscando nicho y nada", outgoing: "deja de buscar a mano, mira esto", mediaValue: "1.000.000" },
  },
  { seconds: 2, visual: { type: "end", handle: "@tu_usuario" } },
];
