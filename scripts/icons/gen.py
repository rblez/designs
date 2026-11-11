"""Genera los iconos desde Ionicons (MIT, © Ionic) — https://ionic.io/ionicons
Cada icono tiene 2 dibujos en una caja de 512: o = línea (outline), s = relleno (filled).
Salida: packages/tokens/src/icons.ts (set curado) y packages/tokens/src/ionicons.ts (todos, exportados uno a uno).
Uso: python3 scripts/icons/gen.py <carpeta dist/svg del paquete ionicons>
"""
import sys, os, re, json
import xml.etree.ElementTree as ET
SRC = sys.argv[1]
NS = "{http://www.w3.org/2000/svg}"
KEEP = ("d", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "fill-rule", "clip-rule",
        "transform", "cx", "cy", "r", "rx", "ry", "x", "y", "width", "height", "points", "x1", "x2", "y1", "y2")

def nodes(path):
    if not os.path.exists(path): return None
    out = []
    for el in ET.parse(path).getroot().iter():
        tag = el.tag.replace(NS, "")
        if tag in ("svg", "title", "defs", "g"): continue
        a = {k: v for k, v in el.attrib.items() if k in KEEP}
        # El grosor estándar (32) lo pone <Icon> en la raíz, así strokeWidth funciona.
        if a.get("stroke-width") in ("32", "32px"): a.pop("stroke-width")
        if a.get("stroke") == "currentColor" and a.get("stroke-linecap") == "round": a.pop("stroke-linecap")
        if a.get("stroke") == "currentColor" and a.get("stroke-linejoin") == "round": a.pop("stroke-linejoin")
        out.append([tag, a])
    return out

def load(name): return {"o": nodes(f"{SRC}/{name}-outline.svg"), "s": nodes(f"{SRC}/{name}.svg")}
camel = lambda s: re.sub(r"-(\w)", lambda m: m.group(1).upper(), s)

# Dibujo propio (no existe en Ionicons): flecha diagonal con el trazo del set.
OWN = {"arrowUpRight": {"o": [["path", {"d": "M152 360 360 152M184 152h176v176", "fill": "none", "stroke": "currentColor"}]],
                        "s": [["path", {"d": "M152 360 360 152M184 152h176v176", "fill": "none", "stroke": "currentColor", "stroke-width": "48"}]]}}
CURATED = {
  "plus": "add", "lightbulb": "bulb", "microphone": "mic", "send": "arrow-up", "search": "search",
  "menu": "reorder-two", "close": "close", "sun": "sunny", "moon": "moon", "star": "star", "arrowUpRight": None,
  "check": "checkmark", "clipboard": "copy", "chevronRight": "chevron-forward", "userCircle": "person-circle",
  "chatBubble": "chatbox", "key": "key", "speakerWave": "volume-high", "chartPie": "pie-chart",
  "folder": "folder", "computer": "desktop", "battery": "battery-half", "globe": "globe", "sparkles": "sparkles",
  "gift": "gift", "storefront": "storefront", "chatEllipsis": "chatbubble-ellipses",
  "question": "help-circle", "shieldCheck": "shield-checkmark", "camera": "camera", "qrCode": "qr-code",
  "ellipsisVertical": "ellipsis-vertical", "cog": "settings", "users": "people", "chats": "chatbubbles",
  "bell": "notifications", "lock": "lock-closed", "arrowLeft": "arrow-back", "bug": "bug", "play": "play", "share": "share-social",
  "externalLink": "open", "heart": "heart", "copy": "documents", "home": "home",
  "user": "person", "trash": "trash", "pencil": "create", "link": "link", "paperclip": "attach",
  "photo": "image", "chevronDown": "chevron-down", "chevronLeft": "chevron-back", "arrowRight": "arrow-forward",
  "eye": "eye", "eyeSlash": "eye-off", "info": "information-circle", "warning": "warning", "bolt": "flash",
}
HDR = "/**\n * Iconos Ionicons (MIT, © Ionic) — https://ionic.io/ionicons\n * Generado por scripts/icons/gen.py: no editar a mano.\n * Cada icono, en una caja de 512: o = línea (outline), s = relleno (filled).\n */\n"
types = ('export type IconNode = readonly (readonly [tag: string, attrs: Record<string, string>])[];\n'
         'export type IonIcon = { o: IconNode; s: IconNode };\n')
dump = lambda x: json.dumps(x, separators=(",", ":"))
cur = HDR + types + "export const icons = {\n" + "".join(
    f"  {k}: {dump(OWN[k] if v is None else load(v))},\n" for k, v in CURATED.items()) + \
    "} satisfies Record<string, IonIcon>;\n\nexport type IconName = keyof typeof icons;\nexport type IconVariant = \"line\" | \"fill\";\n"
open("packages/tokens/src/icons.ts", "w").write(cur)

names = sorted(f[:-12] for f in os.listdir(SRC) if f.endswith("-outline.svg") and os.path.exists(f"{SRC}/{f[:-12]}.svg"))
ident = lambda n: camel(n) if not camel(n)[0].isdigit() else "_" + camel(n)
allm = HDR + 'import type { IonIcon } from "./icons";\n' + "".join(f"export const {ident(n)}: IonIcon = {dump(load(n))};\n" for n in names)
open("packages/tokens/src/ionicons.ts", "w").write(allm)
print(len(CURATED), len(names), len(cur), len(allm))
