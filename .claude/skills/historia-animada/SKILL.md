---
name: historia-animada
description: Crea historias virales cortas (TikTok/Shorts/Reels, 45-75 s) con personajes animados vectoriales en Remotion, voz neuronal gratuita (Edge TTS) con un timbre por personaje, lip-sync, subtítulos palabra a palabra y banda sonora sintetizada. Usar cuando Santiago pida "una historia animada", "un cuento viral", "vídeo con personajes" o una nueva entrega de "El reloj que regalaba 10 segundos".
---

# Historia animada viral

Proyecto: `historias-animadas/` (Remotion, 1080×1920, 30 fps). Ejemplo completo: "El reloj que regalaba 10 segundos" → `media/historia-reloj-diez-segundos.mp4`.

## Fórmula de guion que engancha (≈150-180 palabras, 55-65 s)
1. **Gancho 0-4 s**: objeto/poder mágico + promesa + amenaza. "Este reloj te regala diez segundos extra cada día. El problema es de *quién* los saca."
2. **Descubrimiento** (personaje + lugar con atmósfera).
3. **Regla del poder** dicha por un personaje con voz propia.
4. **Montaje divertido** de usos (3 ejemplos rápidos, uno por palabra).
5. **Coste oculto** que el espectador nota antes que la protagonista.
6. **Cifra que lo vuelve real** ("trescientos segundos. Cinco minutos.").
7. **Giro emocional** (una frase grabada/leída por otro personaje).
8. **Decisión** de la protagonista y resolución visual.
9. **Imagen final cálida** + **pregunta a la audiencia** (comentarios) + título.
Frases cortas, una idea por frase, palabras clave entre `*asteriscos*`.

## Flujo
1. Escribir `voz/guion.json`: voces por personaje (`voice`, `rate`, `pitch`) y `lineas` (`id`, `who`, `text`, `pause`).
   Voces probadas: narrador `es-CO-GonzaloNeural`; niña `es-CO-SalomeNeural` +28Hz; personaje mágico `es-AR-TomasNeural` +22Hz; abuelo `es-MX-JorgeNeural` -14% -14Hz. Lista: `edge-tts --list-voices | grep ^es-`.
2. `pip install edge-tts numpy` y `python3 voz/generar.py voz/guion.json public/` → `public/voz.wav` + `src/historia.json` (tiempos por palabra + envolvente para mover bocas).
3. `python3 voz/musica.py` → `public/musica.wav` (caja de música: misterio en La menor → revelación → cálido en Do mayor, tic-tac y efectos sincronizados con palabras).
4. Escenas en `src/story/scenes.tsx`: cada escena empieza en una línea (`T("id")`) y los eventos se anclan a palabras (`W("id","palabra")`). Bocas: `mouthOf("personaje", gf)`.
5. Personajes en `src/story/chars.tsx` (`Lia`, `Abuelo`, `Reloj`: parpadeo, miradas, brazos, carrera, cansancio, tapa con grabado). Fondos en `bg.tsx` (desván, calle, salón, porche, vacío). Efectos en `fx.tsx` (onda de congelar, chispas doradas, "+10 s", viñeta).
6. Revisar con hoja de contactos (`npx remotion still ... --scale=0.3` cada ~2 s) antes del render.
7. Render: `npx remotion render RelojDiezSegundos out/x.mp4` (en la nube `--browser-executable=/opt/pw-browsers/chromium --concurrency=4`).
8. Normalizar para redes: `ffmpeg -i out/x.mp4 -c:v libx264 -crf 22 -af loudnorm=I=-14:TP=-1.5 -c:a aac -b:a 160k final.mp4`.

## Red en la nube
Edge TTS necesita `speech.platform.bing.com` en el entorno (ya está en el entorno "sanchopaisa"). El script usa el proxy (`HTTPS_PROXY`) y su certificado automáticamente.
Nota: Edge TTS es el servicio de lectura en voz alta de Microsoft Edge usado sin cuenta; para un canal monetizado o clientes, considerar ElevenLabs o Azure Speech con licencia comercial (mismo formato de guion).
