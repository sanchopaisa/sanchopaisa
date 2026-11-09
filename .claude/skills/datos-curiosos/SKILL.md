---
name: datos-curiosos
description: Crea vídeos verticales virales de datos curiosos (listas de 5-7 datos poco conocidos, 60-75 s) con ilustraciones animadas, barra de progreso, cifras con fuente, voz fluida y subtítulos palabra a palabra. Usar cuando Santiago pida "datos curiosos", "cosas que nadie sabe", "top datos" o un vídeo informativo y entretenido para redes.
---

# Datos curiosos virales

Proyecto: `datos-curiosos/` (Remotion). Ejemplo: "7 datos que parecen mentira" → `media/datos-curiosos-7.mp4`.

## Reglas de contenido
- **Solo datos verificables** (NASA, Nature, enciclopedias, registro fósil). Nada de mitos virales falsos (p. ej. "usamos el 10 % del cerebro"). Si una cifra varía según la fuente, redondear hacia abajo y decir "más de" / "unos".
- Ordenar: el más chocante de "comparar épocas/escalas" primero, el más visual de "planeta/universo" al final; prometerlo en el gancho ("el último te va a volar la cabeza").
- Cada dato: frase-titular (≤ 12 palabras) + frase de explicación/cifra. 7-9 s por dato.
- Cierre: "¿Cuántos sabías?" + pedir guardar/comentar (señales fuertes para el algoritmo).

## Flujo
1. `voz/guion.json` (narrador `es-MX-JorgeNeural` +10 %, modo `fluido`). Escribir números en letra para que la voz y los subtítulos cuadren.
2. `python3 voz/generar.py voz/guion.json public/` y `python3 voz/musica.py` (beat 112 bpm + whoosh/ding por dato + efectos temáticos).
3. Escenas en `src/d/scenes.tsx` ancladas a palabras con `W("linea","palabra")`; piezas en `src/d/kit.tsx` (`FactPill`, `Stat` con fuente, `Progress`, `Captions`) y dibujos en `src/d/art.tsx`.
4. Hoja de contactos de stills → render → `loudnorm` a -14 LUFS.
5. Verificar la voz: transcribir `public/voz.wav` con faster-whisper (decodificando con ffmpeg) y comparar con el guion.
