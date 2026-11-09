"""Genera la misma muestra con varias voces para elegir narrador. Uso: python3 voz/muestras.py"""
import asyncio, os, ssl, json
import edge_tts, edge_tts.communicate as _ec

PROXY = os.environ.get("HTTPS_PROXY")
if os.path.exists("/root/.ccr/ca-bundle.crt"):
    _ec._SSL_CTX = ssl.create_default_context(cafile="/root/.ccr/ca-bundle.crt")

TEXTO = ("Este reloj te regala diez segundos extra cada día. El problema es de quién los saca. "
         "Lía lo encontró en el desván de su abuelo, envuelto en un pañuelo viejo. "
         "Diez segundos parecen nada. Pero cada vez que el reloj brillaba, el abuelo se veía un poco más cansado.")
VOCES = [
    ("1", "es-MX-JorgeNeural", "Jorge (México) - la clásica de historias"),
    ("2", "en-US-AndrewMultilingualNeural", "Andrew (multilingüe) - cálida y natural"),
    ("3", "en-US-BrianMultilingualNeural", "Brian (multilingüe) - casual, de cuentacuentos"),
    ("4", "es-ES-AlvaroNeural", "Álvaro (España) - narrador de novela"),
    ("5", "es-CO-GonzaloNeural", "Gonzalo (Colombia) - la del vídeo actual"),
    ("6", "en-US-AvaMultilingualNeural", "Ava (multilingüe) - femenina expresiva"),
    ("7", "es-MX-DaliaNeural", "Dalia (México) - femenina clásica"),
]

async def main():
    for n, v, desc in VOCES:
        out = f"voz/muestras/{n}.mp3"
        await edge_tts.Communicate(TEXTO, v, rate="-6%", proxy=PROXY).save(out)
        print(n, v, os.path.getsize(out))
    json.dump({"texto": TEXTO, "voces": VOCES}, open("voz/muestras/info.json", "w"), ensure_ascii=False)

asyncio.run(main())
