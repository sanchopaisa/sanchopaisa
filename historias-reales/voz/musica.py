"""Banda sonora de 'La chica que cayó del cielo' sincronizada con src/historia.json."""
import json, wave, os
import numpy as np
SR = 44100
H = json.load(open(os.path.join(os.path.dirname(__file__), "..", "src", "historia.json")))
L = {l["id"]: l for l in H["lines"]}
S = lambda i: L[i]["start"]
def Wd(i, w):
    for x in L[i]["words"]:
        if w in x["text"].lower(): return x["s"]
    return S(i)
TOTAL = H["total"] + 1.0
out = np.zeros(int(TOTAL * SR), np.float32)
rng = np.random.default_rng(5)
hz = lambda n: 440 * 2 ** ((n - 69) / 12)
def add(s, t, g=1.0):
    i = int(t * SR)
    if 0 <= i < len(out):
        s = s[: len(out) - i]; out[i:i + len(s)] += s * g
def tone(n, d, decay=3.0, harm=(1, .35, .12)):
    t = np.arange(int(d * SR)) / SR; f = hz(n)
    s = sum(a * np.sin(2 * np.pi * f * (k + 1) * t) for k, a in enumerate(harm))
    return (s * np.exp(-t * decay) * np.minimum(1, t * 300)).astype(np.float32)
def pad(ns, d):
    t = np.arange(int(d * SR)) / SR
    s = sum(np.sin(2 * np.pi * hz(n) * t) + .5 * np.sin(2 * np.pi * hz(n) * 1.004 * t) for n in ns) / len(ns)
    return (s * np.minimum(1, t / 1.0) * np.minimum(1, (d - t) / 1.0)).astype(np.float32)
def noise(d, smooth=20):
    x = rng.standard_normal(int(d * SR)).astype(np.float32)
    return np.convolve(x, np.ones(smooth) / smooth, "same").astype(np.float32)
def fade(x, a=0.5, b=0.5):
    n = len(x); e = np.ones(n, np.float32); ia, ib = int(a * SR), int(b * SR)
    e[:ia] = np.linspace(0, 1, ia); e[n - ib:] = np.linspace(1, 0, ib); return x * e
def thunder():
    x = noise(2.5, 200); t = np.arange(len(x)) / SR
    return x * np.exp(-t * 1.5) * 6
def heart():
    t = np.arange(int(0.3 * SR)) / SR
    return (np.sin(2 * np.pi * 55 * t) * np.exp(-t * 14)).astype(np.float32)
def chirp(f0):
    t = np.arange(int(0.12 * SR)) / SR
    return (np.sin(2 * np.pi * (f0 + 1800 * t / 0.12) * t) * np.sin(np.pi * t / 0.12)).astype(np.float32)

# 1. caída: viento + latidos + golpe en "sobrevivió"
end1 = S("hook2")
add(fade(noise(end1, 8) * 0.9, 0.3, 0.3), 0, 0.5)
add(fade(pad([33, 40], end1), 0.5, 0.2), 0, 0.25)
t = 0.3
while t < end1:
    add(heart(), t, 0.9); add(heart(), t + 0.22, 0.6); t += 0.62
add(thunder(), Wd("hook2", "sobrev"), 0.5)
# 2. Noche de paz en caja de música (dominio público)
mel = [(67, 1.5), (69, .5), (67, 1), (64, 3), (67, 1.5), (69, .5), (67, 1), (64, 3), (74, 2), (74, 1), (71, 3), (72, 2), (72, 1), (67, 3)]
t = S("c1"); q = 0.32
for n, d in mel:
    if t < S("c2") - 0.2: add(tone(n + 12, 2.0, 2.5), t, 0.12)
    t += d * q
add(fade(pad([48, 52, 55], S("c2") - S("c1")), 0.6, 0.6), S("c1"), 0.08)
# 3. tormenta y caída
st, en = S("c2"), S("c4")
add(fade(noise(en - st, 3) * 0.5, 0.5, 0.5), st, 0.4)
add(fade(pad([33, 36, 40], en - st), 1, .5), st, 0.25)
for k in np.arange(st + 0.4, en, 1.7): add(thunder(), k, 0.35)
add(thunder(), Wd("c2", "partió"), 0.7)
add(fade(noise(S("c4") - S("c3"), 8), 0.2, 0.2), S("c3"), 0.5)
# 4. selva: insectos, pájaros, piano menor escaso
js, je = S("c4"), S("c9")
ins = noise(je - js, 2); m = (np.sin(2 * np.pi * 7 * np.arange(len(ins)) / SR) > 0.6).astype(np.float32)
add(fade(ins * m * 0.15, 1, 1), js, 0.25)
for k in np.arange(js + 0.5, je, 1.3): add(chirp(2400 + rng.uniform(0, 1500)), k + rng.uniform(0, .6), 0.08)
notes = [57, 60, 64, 62, 60, 57, 55, 57]
for i, k in enumerate(np.arange(js, je, 2.2)): add(tone(notes[i % 8], 3, 1.5), k, 0.12)
add(fade(pad([45, 52], je - js), 1, 1), js, 0.08)
# 5. rescate: esperanza; 6. la única: tono sostenido; 7. final cálido
add(fade(pad([48, 55, 60, 64], S("c10") - S("c9")), 1, 1), S("c9"), 0.18)
for i, n in enumerate([60, 64, 67, 72, 67, 64]): add(tone(n + 12, 2, 2), S("c9") + 1 + i * 0.5, 0.1)
add(fade(pad([57, 64], S("c11") - S("c10")), 0.8, 1), S("c10"), 0.12)
prog = [[48, 52, 55], [43, 47, 50], [45, 48, 52], [41, 45, 48]]
t = S("c11"); b = 0
while t < TOTAL - 1:
    ch = prog[b % 4]
    add(fade(pad(ch + [ch[0] + 12], 2.6), .4, .4), t, 0.16)
    for k, n in enumerate([ch[0] + 24, ch[1] + 24, ch[2] + 24, ch[1] + 24]): add(tone(n, 1.5, 3), t + k * 0.6, 0.09)
    t += 2.4; b += 1
for k in np.arange(S("c11"), TOTAL - 1, 0.9): add(chirp(3000 + rng.uniform(0, 1000)), k, 0.05)
out /= max(1e-6, np.abs(out).max()) / 0.8
fd = int(1.5 * SR); out[-fd:] *= np.linspace(1, 0, fd)
with wave.open("public/musica.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((out * 32767).astype(np.int16).tobytes())
print("ok", round(TOTAL, 1))
