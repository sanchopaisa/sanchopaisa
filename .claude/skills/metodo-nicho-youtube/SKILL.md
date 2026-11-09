---
name: metodo-nicho-youtube
description: Método de 3 pasos para montar un canal de YouTube "sin cara" con Claude — (1) encontrar un nicho que ya crece mirando canales pequeños que despegan, (2) copiar la estructura del gancho de los vídeos que más visitas hacen ese mes y producir el tuyo (guion, voz, imágenes), (3) preparar y subir el vídeo con título, descripción y miniatura. Usar cuando Santiago o un cliente pidan buscar nicho, analizar canales/vídeos virales, sacar ganchos o planificar un canal faceless.
---

# Método nicho → gancho → subida

Idea: no inventar. Ir donde YouTube **ya está empujando** visitas ahora mismo y replicar la **estructura** (no el contenido) de lo que funciona.

## Paso 1 — El nicho

**Objetivo:** canales pequeños y recientes que crecen rápido = demanda que el algoritmo ya está sirviendo.

Criterios de un buen canal "señal":
- Abierto hace **menos de 3 meses**, **menos de ~30 vídeos**.
- **Media de visitas por vídeo alta** (ej. +100.000) → no depende de un único viral.
- Visitas diarias del nicho **subiendo** en las últimas 2 semanas.
- Formato replicable sin cara (animación, stock, narración IA).
- Varios canales distintos creciendo en el mismo tema (si solo hay uno, puede ser suerte).

Fuentes de datos (de mejor a peor):
1. Herramienta de nichos con MCP conectado (p. ej. NexLev, si la cuenta tiene integración/MCP) → pedir: *"Dame canales de menos de 3 meses con más de 100k visitas de media por vídeo y crecimiento en los últimos 14 días"*.
2. YouTube Data API v3 (`search.list` por tema + `channels.list` con `snippet.publishedAt` y `statistics`) → calcular visitas/vídeo y antigüedad.
3. Manual: buscar el tema en YouTube, filtrar por "este mes" y ordenar por visitas; mirar fecha de creación de cada canal en "Más información".

Salida que entrega Claude: tabla `canal | antigüedad | nº vídeos | visitas totales | media/vídeo | tendencia` + recomendación de 1-2 nichos con el porqué.

## Paso 2 — El vídeo

1. Listar los vídeos del nicho con **más visitas este mes** (no de siempre). Prioridad a los que suman mucho en pocos días (ej. 3 M en 9 días): si YouTube lo sigue recomendando es que retiene.
2. Analizar cada top vídeo (título, miniatura, primeros 30 s de transcripción):
   - **Gancho**: ¿qué promete/abre en los primeros 5-10 s? (secreto, contradicción, "lo que nadie te contó", cuenta atrás, pregunta).
   - **Título**: patrón (Personaje + giro + "explicado" / "en 60 segundos" / "lo que nadie te contó").
   - **Miniatura**: palabra grande, 1 icono, contraste alto.
   - **Duración** y ritmo de cortes.
3. Escribir **el tuyo** con la misma estructura y otro tema/ángulo del nicho:
   - Gancho (1-2 frases) → guion completo → prompts de imágenes por escena → texto para la voz.
   - 3 opciones de título siguiendo el patrón + concepto de miniatura.
4. Producción: voz (ElevenLabs u otra), imágenes/animación, montaje. Para piezas cortas de promoción del canal, se puede usar la skill `video-ui-explainer`.

## Paso 3 — La subida

- Con un MCP de YouTube (servidor que use la YouTube Data API: `videos.insert` + `thumbnails.set`) Claude puede subir el vídeo con título, descripción, etiquetas y miniatura 1280×720 en **borrador/privado**. La persona revisa y le da a **Publicar**.
- Sin MCP: Claude deja listos título, descripción (con capítulos y 3-5 hashtags), etiquetas y miniatura, y se sube a mano en YouTube Studio.

## Límites que hay que decir siempre

- **Las cifras del vídeo de referencia son ilustrativas.** Ningún método garantiza visitas; replicar estructura mejora las probabilidades, no las asegura.
- **Contenido no auténtico / producido en masa**: YouTube no monetiza canales de vídeos repetitivos o en serie con poco valor añadido. Cada vídeo debe aportar guion propio, narración y montaje con criterio. No resubir ni parafrasear vídeos ajenos.
- **IA realista**: si el vídeo muestra personas, lugares o hechos realistas generados con IA, hay que marcar la casilla de contenido alterado/sintético en Studio.
- **Subidas por API**: los proyectos de Google Cloud sin verificar suben los vídeos bloqueados en **privado** hasta pasar la auditoría de la API. Para uso personal, subir en privado y publicar a mano funciona.
- **Monetización (YPP)**: hace falta un mínimo de suscriptores y horas de visualización (o visualizaciones de Shorts); comprobar los requisitos actuales en la ayuda de YouTube antes de prometer ingresos a un cliente.
- Herramientas como NexLev son de pago; confirmar que la cuenta tiene acceso antes de planificar con ellas.

## Plantilla de entrega al cliente

1. Nicho elegido + 3-5 canales señal (tabla).
2. Top 5 vídeos del mes en el nicho + análisis de gancho/título/miniatura.
3. 3 guiones con gancho, títulos y concepto de miniatura.
4. Calendario: 3-4 vídeos/semana las primeras 6 semanas; revisar retención a los 30 s y CTR de miniatura cada semana y ajustar.
