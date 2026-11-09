"""Pista animada (beat + plucks) con efectos en los cambios de dato. Uso: python3 voz/musica.py"""
import json, wave, os
import numpy as np
SR = 44100
H = json.load(open(os.path.join(os.path.dirname(__file__), "..", "src", "historia.json")))
L = {l["id"]: l for l in H["lines"]}
def W(i, w):
    for x in L[i]["words"]:
        if w in x["text"].lower(): return x["s"]
    return L[i]["start"]
TOTAL = H["total"] + 1.0
out = np.zeros(int(TOTAL * SR), np.float32)
rng = np.random.default_rng(1)
hz = lambda n: 440 * 2 ** ((n - 69) / 12)
def add(s, t, g=1.0):
    i = int(t * SR)
    if 0 <= i < len(out):
        s = s[: len(out) - i]; out[i:i + len(s)] += s * g
def env(n, a=0.002, d=6.0):
    t = np.arange(n) / SR; return np.minimum(1, t / a) * np.exp(-t * d)
def kick():
    t = np.arange(int(0.35 * SR)) / SR
    return (np.sin(2 * np.pi * (50 + 120 * np.exp(-t * 30)) * t) * np.exp(-t * 9)).astype(np.float32)
def hat():
    n = int(0.06 * SR); x = rng.standard_normal(n).astype(np.float32)
    x = np.diff(x, prepend=0); return x * env(n, d=60) * 0.5
def clap():
    n = int(0.2 * SR); x = rng.standard_normal(n).astype(np.float32)
    return x * env(n, d=18) * 0.6
def pluck(n, dur=0.5):
    k = int(dur * SR); t = np.arange(k) / SR; f = hz(n)
    s = np.sign(np.sin(2 * np.pi * f * t)) * 0.3 + np.sin(2 * np.pi * f * t)
    return (s * env(k, d=7)).astype(np.float32)
def bass(n, dur):
    k = int(dur * SR); t = np.arange(k) / SR
    return (np.sin(2 * np.pi * hz(n) * t) * np.minimum(1, t / 0.01) * np.exp(-t * 2.5)).astype(np.float32)
def whoosh(d=0.5):
    n = int(d * SR); x = np.convolve(rng.standard_normal(n), np.ones(30) / 30, "same").astype(np.float32)
    t = np.arange(n) / SR; return x * np.sin(np.pi * t / d) ** 2 * 3
def ding(n=88):
    return pluck(n, 1.2) * 0.6 + pluck(n + 12, 1.2) * 0.3
def heart():
    return kick() * 0.7

bpm = 112; b = 60 / bpm
prog = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]  # C Am F G
start = L["hook1"]["start"]
t = 0.0; i = 0
while t < TOTAL - 1.5:
    bar = int(i // 16); step = i % 16; ch = prog[bar % 4]
    if step in (0, 6, 8, 11): add(kick(), t, 0.55)
    if step in (4, 12): add(clap(), t, 0.25)
    if step % 2 == 1: add(hat(), t, 0.25)
    if step == 0: add(bass(ch[0] - 24, b * 4), t, 0.35)
    if step in (0, 3, 6, 8, 10, 13): add(pluck(ch[(step // 2) % 3] + 12), t, 0.10)
    t += b / 4; i += 1
# efectos
for k in ["d1a", "d2a", "d3a", "d4a", "d5a", "d6", "d7a", "cta"]:
    add(whoosh(), L[k]["start"] - 0.3, 0.35)
    add(ding(), L[k]["start"] + 0.05, 0.2)
add(kick() * 1.5, W("hook2", "volar"), 0.6); add(clap(), W("hook2", "volar"), 0.6)
tr = W("d5a", "radiactivos")
for c in np.cumsum(rng.uniform(0.05, 0.25, 30)):
    if tr + c < L["d5b"]["start"]: add(hat() * 2, tr + c, 0.5)
hb = W("d4a", "corazones")
for k in range(6): add(heart(), hb + k * 0.75, 0.6); add(heart(), hb + k * 0.75 + 0.22, 0.4)
out /= max(1e-6, np.abs(out).max()) / 0.8
fd = int(1.2 * SR); out[-fd:] *= np.linspace(1, 0, fd)
with wave.open("public/musica.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((out * 32767).astype(np.int16).tobytes())
print("ok", round(TOTAL, 1))
