"""Banda sonora de la historia de Onoda. Uso: python3 voz/musica.py parte1|parte2"""
import json, wave, os, sys
import numpy as np
SR = 44100
part = sys.argv[1]
H = json.load(open(os.path.join(os.path.dirname(__file__), "..", "src", f"{part}.json")))
L = {l["id"]: l for l in H["lines"]}
S = lambda i: L[i]["start"]
def Wd(i, w):
    for x in L[i]["words"]:
        if w in x["text"].lower(): return x["s"]
    return S(i)
TOTAL = H["total"] + 1.0
out = np.zeros(int(TOTAL * SR), np.float32)
rng = np.random.default_rng(9)
hz = lambda n: 440 * 2 ** ((n - 69) / 12)
def add(s, t, g=1.0):
    i = int(t * SR)
    if 0 <= i < len(out):
        s = s[: len(out) - i]; out[i:i + len(s)] += s * g
def koto(n, d=1.6):
    t = np.arange(int(d * SR)) / SR; f = hz(n)
    s = np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * 2 * f * t) + .25 * np.sin(2 * np.pi * 3.01 * f * t)
    bend = 1 + 0.01 * np.exp(-t * 20)
    s = np.sin(2 * np.pi * f * bend * t) * 0.6 + s * 0.4
    return (s * np.exp(-t * 3.5) * np.minimum(1, t * 500)).astype(np.float32)
def taiko(big=True):
    t = np.arange(int(0.8 * SR)) / SR
    s = np.sin(2 * np.pi * (70 if big else 110) * np.exp(-t * 2) * t) * np.exp(-t * (5 if big else 9))
    n = rng.standard_normal(len(t)) * np.exp(-t * 40) * 0.3
    return (s + n).astype(np.float32)
def pad(ns, d):
    t = np.arange(int(d * SR)) / SR
    s = sum(np.sin(2 * np.pi * hz(n) * t) + .5 * np.sin(2 * np.pi * hz(n) * 1.004 * t) for n in ns) / len(ns)
    return (s * np.minimum(1, t / 1.0) * np.minimum(1, (d - t) / 1.0)).astype(np.float32)
def noise(d, k=20):
    return np.convolve(rng.standard_normal(int(d * SR)), np.ones(k) / k, "same").astype(np.float32)
def chirp():
    t = np.arange(int(0.1 * SR)) / SR; f0 = 2500 + rng.uniform(0, 1500)
    return (np.sin(2 * np.pi * (f0 + 1500 * t / 0.1) * t) * np.sin(np.pi * t / 0.1)).astype(np.float32)
def sting():
    s = pad([38, 45, 50, 51], 2.5) * 1.5
    tk = taiko() * 1.2; s[: len(tk)] += tk
    return s
# escala In (japonesa) en Re: D Eb G A Bb
IN = [62, 63, 67, 69, 70, 74, 75, 79]
def melody(t0, t1, gain=0.12, step=0.55):
    t = t0; i = 0
    pat = [0, 2, 3, 4, 3, 2, 1, 0, 2, 4, 5, 4, 3, 2, 0, -1]
    while t < t1:
        k = pat[i % len(pat)]
        if k >= 0: add(koto(IN[k]), t, gain)
        t += step; i += 1
def drums(t0, t1, gain=0.3, beat=1.1):
    t = t0; i = 0
    while t < t1:
        add(taiko(i % 4 == 0), t, gain * (1 if i % 4 == 0 else 0.5)); t += beat; i += 1
def ambience(t0, t1, gain=0.2):
    n = noise(t1 - t0, 2); m = (np.sin(2 * np.pi * 6 * np.arange(len(n)) / SR) > 0.5).astype(np.float32)
    add(n * m * 0.15, t0, gain)
    for k in np.arange(t0, t1, 1.4): add(chirp(), k + rng.uniform(0, .5), 0.06)

if part == "parte1":
    add(pad([38, 45], S("a1")), 0, 0.25); drums(0.2, S("a1"), 0.35, 0.9)
    add(taiko(), 0.05, 0.6)
    melody(S("a1"), S("a4"), 0.11)
    add(pad([50, 57, 62], S("a4") - S("a2")), S("a2"), 0.1)
    for k in np.arange(Wd("a4", "folletos"), S("a5"), 0.3): add(noise(0.15, 5) * np.hanning(int(0.15 * SR)).astype(np.float32), k, 0.08)
    add(taiko(), Wd("a5", "trampa"), 0.6)
    ambience(S("a5"), S("a10"))
    melody(S("a6"), S("a8"), 0.08, 0.8)
    add(pad([38, 41, 45], S("a9") - S("a8")), S("a8"), 0.16)
    add(pad([38, 45, 50], S("a10") - S("a9")), S("a9"), 0.14)
    melody(S("a10"), S("cta"), 0.12, 0.42); drums(S("a10"), S("cta"), 0.25, 0.84)
    add(sting(), S("cta") - 0.1, 0.5)
else:
    add(sting(), 0.05, 0.45); drums(0.3, S("b1"), 0.3, 0.9)
    ambience(S("b1"), S("b6"))
    melody(S("b1"), S("b4"), 0.09, 0.7)
    add(taiko(), Wd("b1", "encontró"), 0.6)
    add(pad([38, 45, 50], S("b6") - S("b4")), S("b4"), 0.12)
    drums(S("b5"), S("b6"), 0.25, 0.75)
    # emoción: promesa cumplida -> mayor y cálido
    prog = [[50, 54, 57], [45, 49, 52], [47, 50, 54], [43, 47, 50]]
    t = S("b6"); b = 0
    while t < TOTAL - 1:
        ch = prog[b % 4]
        add(pad(ch + [ch[0] + 12], 2.8), t, 0.16)
        for k, n in enumerate([ch[0] + 24, ch[1] + 24, ch[2] + 24, ch[1] + 24]): add(koto(n, 1.4), t + k * 0.62, 0.08)
        t += 2.5; b += 1
out /= max(1e-6, np.abs(out).max()) / 0.8
fd = int(1.5 * SR); out[-fd:] *= np.linspace(1, 0, fd)
with wave.open(f"public/musica-{part}.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((out * 32767).astype(np.int16).tobytes())
print("ok", part, round(TOTAL, 1))
