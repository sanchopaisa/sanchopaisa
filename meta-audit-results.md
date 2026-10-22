# Auditoría Meta Ads — Hotel Villa Juana

**Cuenta:** act_248997330009151 (COP) · **Fuente:** datos en vivo vía Meta MCP · **Fecha:** 22-oct-2026 · **Periodo:** últimos 90 días

```
Meta Ads Health Score: 29/100 (Grade: F)

Píxel / CAPI:          0/100  ░░░░░░░░░░  (30%)
Creatividad:          72/100  ███████░░░  (30%)
Estructura:           33/100  ███░░░░░░░  (20%)
Audiencias:            5/100  █░░░░░░░░░  (20%)
```

> **Contexto:** la nota sale tan baja porque la cuenta no tiene píxel, y esa categoría pesa el 30 %. Sin contar el píxel, la cuenta saca **42/100 (D)**. Los anuncios funcionan bien. El problema está en cómo se organizan.

## Resumen en números (90 días)

Cifras totales de la cuenta en los últimos 90 días, tomadas en vivo de Meta.

| Métrica | Valor |
|---|---|
| Gasto | 464.196 COP (~155.000 COP/mes) |
| Conversaciones por mensaje | 138 |
| Costo por conversación | ≈ 2.968 COP |
| Visitas al perfil (1 boost) | 219 a 249 COP c/u |
| CTR | 1,8 % – 3,9 % (bueno) |
| Frecuencia | 1,5 – 2,0 (sana) |
| Opportunity Score de Meta | 95 de 100 |

## Rendimiento por conjunto

Los 8 conjuntos con gasto, ordenados del más barato al más caro por conversación.

| # | Anuncio | Conversaciones | Costo/conv. (COP) | Gasto (COP) · CTR |
|---|---|---:|---:|---|
| 1 | Venir a Pereira (8-oct) | 40 | **1.493** | 59.737 · CTR 3,31 % |
| 2 | Integración fin de año | 21 | 2.382 | 50.013 · CTR 3,66 % |
| 3 | Venir a Pereira (22-sep) | 23 | 2.576 | 59.247 · CTR 3,38 % |
| 4 | Salón de reuniones | 28 | 3.334 | 93.352 · CTR 1,77 % |
| 5 | Esta semana aprovecha | 18 | 3.820 | 68.751 · CTR 3,91 % |
| 6 | Precio junior suite | 5 | 5.980 | 29.900 · CTR 3,74 % |
| 7 | Escapadita (pasadía) | 3 | **16.188** (alto) | 48.563 · CTR 2,84 % |
| 8 | Desconectar (perfil) | 0 (219 visitas) | — | 54.633 · CTR 1,79 % |

## Problemas críticos

1. **No hay píxel ni seguimiento de reservas (M01, M02).** Meta solo sabe que alguien escribió. No sabe quién reservó, así que no puede buscar más gente que reserve.
2. **Ningún conjunto sale de la fase de aprendizaje (M13).** Hay 8 boosts en paralelo, cada uno con 2.000–10.000 COP al día. Ninguno junta las ~50 conversaciones por semana que Meta necesita para optimizar.

## Quick Wins (≤ 15 min)

Acciones de alto impacto que se hacen en Ads Manager en menos de 15 minutos cada una.

| # | Acción | Tiempo |
|---|---|---|
| 1 | **Pausar "Qué tal si nos damos una Escapadita".** Cuesta 16.188 COP por conversación, 5 veces el promedio. Además anuncia pasadía mientras la piscina y el jacuzzi están en remodelación. Pausar también el boost de **visitas al perfil**: no genera conversaciones. | 5 min |
| 2 | Crear un público de **personas que enviaron mensaje (90 días)** y excluirlo de los anuncios nuevos. | 10 min |
| 3 | Crear públicos de **interacción con Instagram y Facebook (365 días)** y subir la **lista de teléfonos de huéspedes** de WhatsApp. | 15 min |
| 4 | **Dejar de promocionar cada post por separado.** Usar 1 campaña de Mensajes en Ads Manager, con 1 conjunto de ≥ 20.000 COP/día y 4–6 anuncios dentro. | 15 min |

## Recomendaciones (próximas 2–4 semanas)

- **Estructura:** consolidar todo en 1 campaña con el objetivo **Mensajes (WhatsApp + Instagram)**. Si quieren separar públicos, usar 2 conjuntos: *Escapadas/turismo* y *Empresas/salón*. Activar **Advantage+ Audience**: Meta estima un costo por conversación 18 % menor. Activar también las **ubicaciones Advantage+**.
- **Intereses:** los actuales son muy dispersos (CrossFit, Netflix, pantalones de yoga, "hotel (juego de mesa)", motivational speaker). Conviene limpiarlos o dejar que Advantage+ encuentre al público.
- **Creatividades:** poner en el mismo conjunto varios anuncios **distintos**, no el mismo video duplicado. Agregar un carrusel de habitaciones y zonas, y un video de un huésped real. El mejor anuncio es "Quieres venir a Pereira" (1.493 COP por conversación), así que conviene hacer variaciones de ese ángulo: ubicación, Parque Ukumarí, gastronomía.
- **Medición:** llevar un conteo semanal sencillo de *conversaciones → reservas → ingresos*. Con eso se sabe el costo real por reserva. Después se puede configurar el evento *Purchase* para mensajería (Conversions API) y Meta podrá optimizar hacia reservas, no solo hacia mensajes.

## Detalle de checks

| ID | Check | Severidad | Resultado |
|---|---|---|---|
| M01 | Píxel instalado | crítica | FAIL |
| M02 | Conversions API | crítica | FAIL |
| M03–M10 | Dedup, EMQ, dominio, AEM, eventos, gateway, atribución, frescura | — | N/A (sin píxel) |
| M25 | Diversidad de formatos (video + imagen, sin carrusel) | crítica | WARNING |
| M26 | Creatividades por conjunto (1–2, duplicadas) | alta | FAIL |
| M28 | Fatiga creativa | crítica | PASS |
| M30 | Uso de contenido orgánico | media | PASS |
| M-CR1 | Creatividad nueva reciente | alta | PASS |
| M-CR2 | Frecuencia prospección < 3 | alta | PASS |
| M-CR4 | CTR ≥ 1 % | alta | PASS |
| M-AN1 | Diversidad Andromeda | crítica | WARNING |
| M11 | Número de campañas (8 activas) | alta | FAIL |
| M12 | CBO vs ABO | alta | PASS |
| M13 | Fase de aprendizaje (inferido) | crítica | FAIL |
| M16 | Consolidación de conjuntos | alta | FAIL |
| M17 | Presupuesto por conjunto ≥ US$5/día | alta | FAIL |
| M18 | Objetivo alineado (1 boost a visitas de perfil) | alta | WARNING |
| M33 | Ubicaciones Advantage+ | media | WARNING |
| M37 | Frecuencia por campaña | alta | PASS |
| M40 | Pruebas A/B | media | FAIL |
| M-ST1 | Presupuesto ≥ 5× costo por resultado | alta | WARNING |
| M-TH1 | Threads | baja | FAIL |
| M19 | Solapamiento de audiencias | alta | FAIL |
| M20 | Públicos de sitio web | alta | FAIL |
| M21 | Lookalike (2022, inactivo) | media | FAIL |
| M22 | Advantage+ Audience | media | WARNING |
| M23 | Exclusiones | alta | FAIL |
| M24 | Datos propios (lista de clientes) | alta | FAIL |

Los checks no evaluables (M27, M29, M31, M32, M34–M36, M38, M39, M-CR3, M-ST2, M-AT1, M-IA1, M14, M15) aparecen como N/A en `meta-audit-results.json`.
