# Cambios aplicados en Meta Ads — 22-oct-2026

Cuenta act_248997330009151 (Hotel Villa Juana). Ninguno de estos cambios aumenta el gasto.

| Cambio | Detalle | Estado |
|---|---|---|
| Pausada la campaña "Qué tal si nos damos una Escapadita" (120252283914270168) | 7.055 COP por conversación, casi 3 veces lo de "Integración" (2.522). Ahorra 10.000 COP/día hasta el 29-oct. | Confirmado (PAUSED) |
| Extender "Buscas un sitio para tu integración" hasta el 29-oct | Meta no permite editar promociones de Instagram desde la API, solo desde la app de Instagram. | Pendiente (manual) |
| Público "Interactuaron con Facebook - 365 días" (120252366736700168) | Interacción con la página Villa Juana Hotel Campestre | Creado, llenándose |
| Público "Enviaron mensaje a la página - 365 días" (120252366737140168) | Para excluir de prospección o hacer retargeting | Creado, llenándose |
| Público "Similar 1% - Interactuaron con Facebook" (120252366739090168) | Similar en Colombia a quienes interactúan con la página | Creado, actualizando |

No se pudo crear el público de interacción con Instagram: la cuenta de Instagram no está vinculada a la cuenta publicitaria (ads_get_ig_accounts devolvió 0).

## Campaña consolidada (publicada con aprobación del dueño)

| Elemento | ID | Detalle |
|---|---|---|
| Campaña "Villa Juana - Mensajes WhatsApp (consolidada)" | 120252366766230168 | Interacción → conversaciones. Presupuesto de campaña 5.000 COP/día (~150.000 COP/mes, igual al gasto histórico). ACTIVA |
| Conjunto "Eje Cafetero + Cali + Ibagué - WhatsApp - Advantage+" | 120252366767280168 | Destino WhatsApp; Pereira, Armenia, Manizales, Cartago (40 km), Ibagué (38 km), Cali (40 km); 21+; Advantage+ Audience y ubicaciones. ACTIVO |
| Anuncio "Quieres venir a Pereira - video" | 120252366768520168 | Reutiliza la creatividad 1752990802587152 (mejor costo: 1.493 COP/conv.). En revisión |
| Anuncio "Salón de reuniones - video" | 120252366768950168 | Reutiliza la creatividad 1624321159479985. En revisión |

## Extensión de "Integración fin de año" (aprobada por el dueño)

Meta no deja extender una promoción de Instagram desde la API (cambiar stop_time no se guardó). Se recreó como campaña normal:

| Elemento | ID | Detalle |
|---|---|---|
| Campaña "Villa Juana - Integraciones fin de año (extensión)" | 120252366790850168 | Interacción → conversaciones, 10.000 COP/día (el presupuesto que liberó la pausa de "Escapadita"). ACTIVA |
| Conjunto "Eje Cafetero + Cali + Ibagué - Instagram Direct - Advantage+" | 120252366802000168 | Termina el 29-oct-2026. Pereira, Armenia, Manizales, Cartago, Ibagué, Cali; 21+; Advantage+ Audience con el similar 1 % como sugerencia; todas las ubicaciones. ACTIVO |
| Anuncio "Integración fin de año - post Instagram" | 120252366803140168 | Reutiliza la creatividad 2361402961277956 |
| Promoción original "Buscas un sitio para tu integración" (120252283922470168) | — | PAUSADA para que no compita con la extensión (es el mismo anuncio; terminaba el 23-oct) |

Datos de la promoción original: mujeres de 25-54 generaron 21 de 22 conversaciones; Historias de Instagram fue la ubicación más barata (1.757 COP por conversación, frente a 2.837 en el feed).

### Gasto diario activo a partir de hoy
- Mensajes WhatsApp (consolidada): 5.000 COP/día, sin fecha de fin
- Integraciones (extensión): 10.000 COP/día hasta el 29-oct

## Video de integraciones (preparado, sin publicar)

- Video recortado a 9,2 s (se quitó el final de dron pixelado) y subido a la biblioteca de Meta: video 1765035791383775.
- Creatividad lista: 3684393625070152 (texto de integraciones, botón "Contactar" que abre wa.me/573218012335).
- No se publicó: la API no permite el botón nativo de WhatsApp en esta cuenta, y una campaña de clics no puede ir dentro de la campaña de Integraciones (que busca conversaciones). El dueño decidió dejarlo para después.
- Alternativa manual: en Ads Manager, duplicar el anuncio de Integraciones y elegir este video de la biblioteca (ahí sí está el botón de WhatsApp).
