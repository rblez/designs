"""Genera los iconos desde Heroicons (MIT, © Tailwind Labs).
Cada icono tiene 4 dibujos: o = outline 24 (línea), s = solid 24, m = mini 20, u = micro 16 (relleno).
Salida: packages/tokens/src/icons.ts (set curado) y packages/tokens/src/heroicons.ts (todos, exportados uno a uno).
Uso: python3 scripts/icons/gen.py <carpeta del paquete heroicons>
"""
import sys, os, re, json
import xml.etree.ElementTree as ET
SRC = sys.argv[1]
NS = "{http://www.w3.org/2000/svg}"
KEEP = ("d", "fill-rule", "clip-rule", "cx", "cy", "r", "x", "y", "width", "height", "rx", "x1", "x2", "y1", "y2", "points")

def nodes(path):
    if not os.path.exists(path): return None
    root = ET.parse(path).getroot()
    out = []
    for el in root.iter():
        tag = el.tag.replace(NS, "")
        if tag == "svg": continue
        out.append([tag, {k: v for k, v in el.attrib.items() if k in KEEP}])
    return out

def load(name):
    return {"o": nodes(f"{SRC}/24/outline/{name}.svg"), "s": nodes(f"{SRC}/24/solid/{name}.svg"),
            "m": nodes(f"{SRC}/20/solid/{name}.svg"), "u": nodes(f"{SRC}/16/solid/{name}.svg")}

def clean(ic): return {k: v for k, v in ic.items() if v}
camel = lambda s: re.sub(r"-(\w)", lambda m: m.group(1).upper(), s)

CURATED = {
  "plus": "plus", "lightbulb": "light-bulb", "microphone": "microphone", "send": "arrow-up", "search": "magnifying-glass",
  "menu": "bars-2", "close": "x-mark", "sun": "sun", "moon": "moon", "star": "star", "arrowUpRight": "arrow-up-right",
  "check": "check", "clipboard": "square-2-stack", "chevronRight": "chevron-right", "userCircle": "user-circle",
  "chatBubble": "chat-bubble-bottom-center-text", "key": "key", "speakerWave": "speaker-wave", "chartPie": "chart-pie",
  "folder": "folder", "computer": "computer-desktop", "battery": "battery-50", "globe": "globe-alt", "sparkles": "sparkles",
  "gift": "gift", "storefront": "building-storefront", "chatEllipsis": "chat-bubble-oval-left-ellipsis",
  "question": "question-mark-circle", "shieldCheck": "shield-check", "camera": "camera", "qrCode": "qr-code",
  "ellipsisVertical": "ellipsis-vertical", "cog": "cog-6-tooth", "users": "users", "chats": "chat-bubble-left-right",
  "bell": "bell", "lock": "lock-closed", "arrowLeft": "arrow-left", "bug": "bug-ant", "play": "play", "share": "share",
  "externalLink": "arrow-top-right-on-square", "heart": "heart", "copy": "document-duplicate", "home": "home",
  "user": "user", "trash": "trash", "pencil": "pencil-square", "link": "link", "paperclip": "paper-clip",
  "photo": "photo", "chevronDown": "chevron-down", "chevronLeft": "chevron-left", "arrowRight": "arrow-right",
  "eye": "eye", "eyeSlash": "eye-slash", "info": "information-circle", "warning": "exclamation-triangle", "bolt": "bolt",
}
HDR = "/**\n * Iconos Heroicons (MIT, © Tailwind Labs) — https://heroicons.com\n * Generado por scripts/icons/gen.py: no editar a mano.\n * Cada icono: o = línea (outline 24), s = relleno 24, m = relleno 20 (mini), u = relleno 16 (micro).\n */\n"
types = ('export type IconNode = readonly (readonly [tag: string, attrs: Record<string, string>])[];\n'
         'export type HeroIcon = { o: IconNode; s: IconNode; m?: IconNode; u?: IconNode };\n')
cur = HDR + types + "export const icons = {\n" + "".join(f"  {k}: {json.dumps(clean(load(v)), separators=(',', ':'))},\n" for k, v in CURATED.items()) + \
      "} satisfies Record<string, HeroIcon>;\n\nexport type IconName = keyof typeof icons;\nexport type IconVariant = \"line\" | \"fill\";\n"
open("packages/tokens/src/icons.ts", "w").write(cur)

names = sorted(f[:-4] for f in os.listdir(f"{SRC}/24/outline"))
allm = HDR + 'import type { HeroIcon } from "./icons";\n' + "".join(
    f"export const {camel(n) if not camel(n)[0].isdigit() else '_' + camel(n)}: HeroIcon = {json.dumps(clean(load(n)), separators=(',', ':'))};\n" for n in names)
open("packages/tokens/src/heroicons.ts", "w").write(allm)
print(len(CURATED), len(names), len(cur), len(allm))
