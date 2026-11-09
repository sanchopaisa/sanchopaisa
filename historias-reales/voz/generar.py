"""Genera la voz de cada línea con Edge TTS, tiempos por palabra y envolvente para lip-sync.

Uso:  python3 voz/generar.py voz/guion.json public/
Salida: public/voz.wav (toda la locución) y src/historia.json (tiempos).
"""
import asyncio, json, re, subprocess, sys, os, wave
import numpy as np
import ssl
import edge_tts
import edge_tts.communicate as _ec

# Detrás de un proxy (p. ej. sesiones en la nube) usar su proxy y su certificado.
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
CA = os.environ.get("SSL_CERT_FILE") or ("/root/.ccr/ca-bundle.crt" if os.path.exists("/root/.ccr/ca-bundle.crt") else None)
if CA:
    _ec._SSL_CTX = ssl.create_default_context(cafile=CA)

FPS = 30
SR = 24000

def clean(t):  # texto para TTS (sin asteriscos)
    return t.replace("*", "")

def norm(w):
    return re.sub(r"[^\wáéíóúñü]", "", w.lower())

async def tts(text, v, out_mp3):
    c = edge_tts.Communicate(text, v["voice"], rate=v.get("rate", "+0%"), pitch=v.get("pitch", "+0Hz"), boundary="WordBoundary", proxy=PROXY)
    words = []
    with open(out_mp3, "wb") as f:
        async for ch in c.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append((ch["text"], ch["offset"] / 1e7, (ch["offset"] + ch["duration"]) / 1e7))
    return words

def decode(mp3):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", mp3, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768

def trim(a):  # quita silencio inicial/final
    idx = np.where(np.abs(a) > 0.01)[0]
    if len(idx) == 0:
        return a, 0.0
    s = max(0, idx[0] - int(0.03 * SR)); e = min(len(a), idx[-1] + int(0.08 * SR))
    return a[s:e], s / SR

def words_of(text):
    """Palabras del texto con su marca de palabra clave (*así*)."""
    toks = [(x.replace("*", ""), x.startswith("*")) for x in re.findall(r"\*[^*]+\*[^\s*]*|\S+", text)]
    return [{"text": w, "kw": kw} for txt, kw in toks for w in txt.split()]

def align(flat, bounds, offset, dur):
    """Asigna a cada palabra el tiempo de su WordBoundary (alineando por orden)."""
    bi = 0
    for w in flat:
        j = bi
        while j < len(bounds) and norm(bounds[j][0]) != norm(w["text"]) and j < bi + 3:
            j += 1
        if j < len(bounds) and norm(bounds[j][0]) == norm(w["text"]):
            bi = j
        b = bounds[min(bi, len(bounds) - 1)] if bounds else ("", 0, dur)
        w["s"] = round(offset + max(0, b[1]), 3); w["e"] = round(offset + max(0, b[2]), 3)
        bi += 1

def envelope(a):
    hop = SR // FPS
    env = [float(np.sqrt(np.mean(a[i:i + hop] ** 2))) for i in range(0, len(a), hop)]
    mx = max(env) or 1
    return [round(min(1, x / mx * 1.4), 2) for x in env]

def groups(lineas, fluido):
    """Modo fluido: frases seguidas del mismo personaje se leen de una sola vez (entonación natural)."""
    out = []
    for ln in lineas:
        if fluido and out and out[-1][-1]["who"] == ln["who"] and out[-1][-1].get("pause", 0.3) < 0.4 and not ln.get("corte"):
            out[-1].append(ln)
        else:
            out.append([ln])
    return out

async def main(guion_path, public_dir):
    g = json.load(open(guion_path))
    fluido = g.get("fluido", True)
    tmp = os.path.join(os.path.dirname(guion_path), "tmp"); os.makedirs(tmp, exist_ok=True)
    t = 0.4  # silencio inicial
    chunks = [np.zeros(int(t * SR), np.float32)]
    out_lines = []
    for grp in groups(g["lineas"], fluido):
        v = g["voces"][grp[0]["who"]]
        mp3 = os.path.join(tmp, grp[0]["id"] + ".mp3")
        bounds = await tts(" ".join(clean(l["text"]) for l in grp), v, mp3)
        a, cut = trim(decode(mp3))
        dur = len(a) / SR
        bounds = [(b[0], b[1] - cut, b[2] - cut) for b in bounds]
        per = [words_of(l["text"]) for l in grp]
        flat = [w for ws in per for w in ws]
        align(flat, bounds, t, dur)
        env = envelope(a)
        for k, (ln, ws) in enumerate(zip(grp, per)):
            ls = t if k == 0 else ws[0]["s"] - 0.05
            le = (t + dur) if k == len(grp) - 1 else per[k + 1][0]["s"] - 0.05
            i0, i1 = int((ls - t) * FPS), int((le - t) * FPS)
            out_lines.append({"id": ln["id"], "who": ln["who"], "start": round(ls, 3), "end": round(le, 3), "words": ws, "env": env[i0:i1 + 1] or [0]})
        pause = grp[-1].get("pause", 0.3)
        chunks.append(a); chunks.append(np.zeros(int(pause * SR), np.float32))
        print(f"{'+'.join(l['id'] for l in grp):30s} {dur:5.2f}s  {grp[0]['who']}")
        t += dur + pause
    audio = np.concatenate(chunks)
    with wave.open(os.path.join(public_dir, "voz.wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(audio, -1, 1) * 32767).astype(np.int16).tobytes())
    json.dump({"titulo": g["titulo"], "total": round(t, 3), "lines": out_lines}, open(os.path.join(os.path.dirname(guion_path), "..", "src", "historia.json"), "w"), ensure_ascii=False)
    print("total", round(t, 2), "s")

asyncio.run(main(sys.argv[1], sys.argv[2]))
