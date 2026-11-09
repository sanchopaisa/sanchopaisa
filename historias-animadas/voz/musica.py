"""Sintetiza la banda sonora (caja de música + pad + efectos) sincronizada con src/historia.json.
Uso: python3 voz/musica.py  ->  public/musica.wav
"""
import json, wave, os
import numpy as np

SR = 44100
H = json.load(open(os.path.join(os.path.dirname(__file__), "..", "src", "historia.json")))
L = {l["id"]: l for l in H["lines"]}
TOTAL = H["total"] + 2.5
out = np.zeros(int(TOTAL * SR), np.float32)
rng = np.random.default_rng(3)

def hz(n):  # nota MIDI -> Hz
    return 440 * 2 ** ((n - 69) / 12)

def add(sig, t, gain=1.0):
    i = int(t * SR)
    if i >= len(out): return
    sig = sig[: len(out) - i]
    out[i : i + len(sig)] += sig * gain

def musicbox(n, dur=1.8):
    t = np.arange(int(dur * SR)) / SR
    f = hz(n)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 2.01 * t) + 0.12 * np.sin(2 * np.pi * f * 4.2 * t)
    return (s * np.exp(-t * 3.2) * np.minimum(1, t * 400)).astype(np.float32)

def pad(notes, dur):
    t = np.arange(int(dur * SR)) / SR
    s = sum(np.sin(2 * np.pi * hz(n) * t) + 0.5 * np.sin(2 * np.pi * hz(n) * 1.003 * t) for n in notes)
    env = np.minimum(1, t / 0.8) * np.minimum(1, (dur - t) / 0.8)
    return (s * env / len(notes)).astype(np.float32)

def tick(high=True):
    t = np.arange(int(0.03 * SR)) / SR
    return (np.sin(2 * np.pi * (2400 if high else 1800) * t) * np.exp(-t * 220)).astype(np.float32)

def whoosh(dur=0.9, up=True):
    n = rng.standard_normal(int(dur * SR)).astype(np.float32)
    k = np.ones(40) / 40
    n = np.convolve(n, k, "same")
    t = np.arange(len(n)) / SR
    env = np.sin(np.pi * t / dur) ** 2
    return n * env * 2.5

def chime(base=84):
    return sum(musicbox(base + d, 2.5) * g for d, g in [(0, 1), (7, 0.6), (12, 0.5), (16, 0.35)])

def boom():
    t = np.arange(int(1.2 * SR)) / SR
    return (np.sin(2 * np.pi * (60 * np.exp(-t * 3)) * t) * np.exp(-t * 3)).astype(np.float32)

beat = 60 / 76
# --- Parte 1: misterio (A menor), hasta la lectura del grabado ---
prog1 = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [52, 56, 59]]  # Am F C E
end1 = L["grabado"]["start"] - 0.3
t = 0.0
bar = 0
while t < end1:
    ch = prog1[bar % 4]
    add(pad([n - 12 for n in ch], beat * 4 + 0.8), t, 0.10)
    arp = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 12, ch[2] + 24, ch[1] + 12, ch[2] + 12, ch[1] + 12]
    for k, n in enumerate(arp):
        tk = t + k * beat / 2
        if tk < end1:
            add(musicbox(n), tk, 0.10)
    t += beat * 4
    bar += 1
# tic-tac de fondo (más lento cuando el abuelo se cansa)
t = 0.0
while t < end1:
    slow = L["cansado1"]["start"] <= t < L["dia30"]["start"]
    add(tick(int(t / beat) % 2 == 0), t, 0.18)
    t += beat * (1.5 if slow else 1)
# --- Parte 2: revelación, notas sueltas ---
for i, n in enumerate([76, 72, 69, 71, 72, 74, 71]):
    tt = L["grabado"]["start"] + i * 1.6
    if tt < L["gira"]["start"]:
        add(musicbox(n, 3), tt, 0.13)
add(pad([45, 52, 57], L["gira"]["start"] - L["grabado"]["start"]), L["grabado"]["start"], 0.07)
# --- Parte 3: cálido (C mayor) desde que gira la corona ---
prog3 = [[48, 52, 55], [43, 47, 50], [45, 48, 52], [41, 45, 48]]  # C G Am F
t = L["gira"]["start"]
bar = 0
while t < TOTAL - 1:
    ch = prog3[bar % 4]
    add(pad(ch + [ch[0] + 12], beat * 4 + 0.8), t, 0.14)
    for k, n in enumerate([ch[0] + 24, ch[1] + 24, ch[2] + 24, ch[1] + 24, ch[0] + 36, ch[2] + 24, ch[1] + 24, ch[2] + 24]):
        add(musicbox(n), t + k * beat / 2, 0.11)
    t += beat * 4
    bar += 1
# --- Efectos ---
add(chime(84), L["hook1"]["words"][4]["s"], 0.25)          # "diez segundos"
add(boom(), L["hook2"]["words"][4]["s"], 0.5)              # "quién"
add(chime(88), L["reloj1"]["start"] + 0.1, 0.22)           # el reloj despierta
add(whoosh(1.0), L["usa2"]["words"][-2]["s"] - 0.3, 0.30)   # congelar el mundo
for w in L["usa3"]["words"]:
    if w["text"].rstrip(",.") in ("balonazo", "helado", "bus"):
        add(whoosh(0.4), w["s"] - 0.1, 0.18)
add(chime(91), L["lia1"]["start"], 0.15)
add(boom(), L["dia30"]["words"][-2]["s"], 0.45)            # "Cinco minutos"
add(whoosh(1.6), L["gira"]["start"] + 0.6, 0.25)           # la corona gira al revés
for i in range(8):
    add(musicbox(84 + [0, 4, 7, 12, 16, 19, 24, 28][i], 1.5), L["devuelve"]["start"] + i * 0.12, 0.10)

out /= max(1e-6, np.abs(out).max()) / 0.8
fade = int(1.5 * SR)
out[-fade:] *= np.linspace(1, 0, fade)
os.makedirs("public", exist_ok=True)
with wave.open("public/musica.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((out * 32767).astype(np.int16).tobytes())
print("ok", round(TOTAL, 1), "s")
