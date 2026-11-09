---
name: video-ui-explainer
description: Crea vídeos verticales (TikTok/Reels/Shorts) estilo "UI explainer" con Remotion — fondo oscuro de humo, tarjetas de interfaz animadas, estrella de Claude brillando, subtítulos palabra a palabra con palabras clave en caja de selección tipo Figma. Usar cuando Santiago pida "un vídeo como el de martivegara", "vídeo explicativo con tarjetas", "vídeo de Claude/IA para TikTok", o pase un guion para convertirlo en este estilo.
---

# Vídeo "UI explainer" vertical

Plantilla lista en `video-ui-explainer/` (Remotion 4, 1080×1920, 30 fps).
Ejemplo completo: `src/scripts/ejemplo-canal-millon.ts` → `out/canal-millon.mp4`.

## Anatomía del estilo (lo que hace que funcione)

1. **Fondo**: gris casi negro con humo (ruido fractal) que se mueve muy lento. Nunca plano.
2. **Subtítulos arriba** (y≈330), Inter 800, ~66 px, 2-4 palabras por línea.
   - La palabra que suena en **blanco**, las ya dichas en **gris** (45 %).
   - Palabras clave (cifras, nombres de herramientas, la idea del paso) con **caja de selección azul tipo Figma** (borde + 4 tiradores blancos).
   - Cada palabra entra con mini-pop: opacidad + sube 18 px + desenfoque → nítido.
3. **Un único foco visual por frase**, centrado en la mitad inferior: tarjeta blanca redondeada (radio 34, sombra grande) o panel oscuro (chat de Claude).
4. **Acento naranja Claude** `#e8794a`: estrella con halo, botones de enviar, pastillas de paso "(1) el nicho", líneas curvas de conexión MCP que se dibujan.
5. **Datos que se mueven**: contadores que suben (1.000.000), barras que crecen, barra de subida, checks verdes que hacen pop. Las cifras se dicen Y se ven a la vez.
6. **Transiciones**: fundido + leve zoom + desenfoque de 7 frames entre escenas. Una escena por frase (2-8 s).
7. **Estructura del guion** (≈60-75 s):
   - Gancho con promesa + cifra grande (0-7 s) — "¿Sabías que X te puede hacer Y sin Z?"
   - "Son N pasos y los N ya los hace X" (presenta las cartas).
   - Paso 1 / Paso 2 / Paso 3, cada uno: pastilla de paso → herramienta → prueba con datos reales.
   - Recap en una frase con 3 palabras clave ("un nicho que ya crece, un gancho que ya funciona y un vídeo que se sube solo").
   - CTA de compartir: "Envíaselo a ese amigo que todavía…" + móvil con chat de WhatsApp.
   - Cierre 2 s con @usuario.

## Cómo hacer un vídeo nuevo

1. Escribir el guion en frases cortas (una por escena). Marcar palabras clave con `*asteriscos*` (para varias palabras: `*2,3 millones*`).
2. Copiar `src/scripts/ejemplo-canal-millon.ts` a `src/scripts/<nombre>.ts`. Cada escena:
   ```ts
   { seconds: 4.8, say: "Conectas *NexLev* con un *MCP*...", visual: { type: "mcp", ... } }
   ```
   Duración orientativa: ~2,6 palabras por segundo de locución + 0,3 s.
3. Elegir el `visual` de cada escena (catálogo en `src/types.ts`):
   | tipo | para qué |
   |---|---|
   | `chat` | prompt escribiéndose en la caja "Escribe a Claude…" |
   | `burst` | estrella + notificaciones volando + contador gigante (gancho) |
   | `threeCards` | las 3 cartas en abanico sobre aro naranja (presentar/recapitular pasos); `chip` añade línea y cifra |
   | `step` | pastilla "(n) etiqueta" en panel Claude, o con `placeholder` una tarjeta vacía "tu vídeo ?" |
   | `mcp` | panel Claude + app conectada con línea curva + "MCP · conectado" |
   | `chart` | barras por día que crecen + ranking "Los que más crecen" |
   | `channel` | ficha de canal con stats y contadores |
   | `videoGrid` | rejilla 3×2 de vídeos con miniaturas |
   | `viral` | vídeo con cifra superpuesta; con `hook` lo escanea y escribe "Tu vídeo" |
   | `studio` | YouTube Studio: `upload` (barra de subida) o `review` (checks + Publicar verde) |
   | `phone` | móvil con chat tipo WhatsApp (CTA de compartir) |
   | `end` | cierre con buscador @usuario |
   Si hace falta un visual nuevo: añadir el tipo en `types.ts`, el componente en `src/visuals/Visuals.tsx` y su `case` en `VisualView`. Reutilizar `Card`, `DarkPanel`, `Enter`, `StepPill`, `ChatBox`, `Connector`, `AppTile`, `Thumbnail`.
4. Registrar una `<Composition>` nueva en `src/Root.tsx` con `defaultProps={{ scenes: miGuion }}`.
5. Previsualizar: `npm run dev` (Remotion Studio). Comprobar stills sueltos:
   `npx remotion still <Id> out/x.png --frame=300 --scale=0.4`
6. Render: `npx remotion render <Id> out/<nombre>.mp4`
   (en la nube: añadir `--browser-executable=/opt/pw-browsers/chromium --concurrency=4`).

## Voz en off (recomendado)

- Grabar la voz o generarla (ElevenLabs, etc.), guardarla en `public/voz.mp3` y pasar `voiceover: "voz.mp3"` en las props. Música opcional: `music: "musica.mp3"` (va al 12 %).
- Para que los subtítulos caigan exactos: transcribir con Whisper con tiempos por palabra y poner en cada escena `words: [[inicio, fin], ...]` (segundos absolutos, mismo número de palabras que `say`). Ajustar `seconds` de cada escena para que cuadre con la locución.
- Sin `words`, las palabras se reparten solas dentro de la escena según su longitud.

## Reglas de calidad

- Máximo una idea y un elemento protagonista por escena; lo importante dentro de 80 px de margen lateral.
- Las cifras del guion deben coincidir con las de las tarjetas.
- No copiar logos/marcas de agua de otros creadores; usar el @ propio en `end`.
- Revisar con una hoja de contactos (stills cada ~4 s) antes del render final.
