"""Evalúa muestras de voz con Whisper: precisión, confianza, ritmo y pausas. Uso: python3 -I voz/evaluar.py"""
import json, re, difflib, subprocess
import numpy as np

def load(path):  # 16 kHz mono float32 (evita el lector de audio de faster-whisper)
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-f", "s16le", "-ac", "1", "-ar", "16000", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

from faster_whisper import WhisperModel
info = json.load(open("voz/muestras/info.json"))
ref = re.sub(r"[^\wáéíóúñü ]", "", info["texto"].lower()).split()
m = WhisperModel("small", device="cpu", compute_type="int8")
res = []
for n, v, d in info["voces"]:
    segs, _ = m.transcribe(load(f"voz/muestras/{n}.mp3"), language="es", word_timestamps=True)
    words = [w for s in segs for w in s.words]
    hyp = re.sub(r"[^\wáéíóúñü ]", "", " ".join(w.word for w in words).lower()).split()
    acc = difflib.SequenceMatcher(None, ref, hyp).ratio()
    dur = float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f"voz/muestras/{n}.mp3"],capture_output=True,text=True).stdout)
    gaps = [b.start - a.end for a, b in zip(words, words[1:])]
    prob = sum(w.probability for w in words) / len(words)
    diff = [x for x in difflib.ndiff(ref, hyp) if x[0] in "+-"]
    r = dict(n=n, voz=v, precision=round(acc*100,1), confianza=round(prob*100,1), ppm=round(len(ref)/dur*60), pausas_largas=sum(1 for g in gaps if g > 0.35), errores=diff[:8])
    res.append(r); print(r, flush=True)
json.dump(res, open("voz/muestras/evaluacion.json","w"), ensure_ascii=False, indent=1)
