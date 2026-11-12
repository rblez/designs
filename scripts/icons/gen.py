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
        # Cualquier otro grosor se guarda como factor "k" relativo a 32, y <Icon> lo escala con strokeWidth.
        if "stroke-width" in a:
            k = round(float(a.pop("stroke-width").replace("px", "")) / 32, 4)
            if k != 1: a["k"] = f"{k:g}"
        if a.get("stroke") == "currentColor" and a.get("stroke-linecap") == "round": a.pop("stroke-linecap")
        if a.get("stroke") == "currentColor" and a.get("stroke-linejoin") == "round": a.pop("stroke-linejoin")
        out.append([tag, a])
    return out

# Si el relleno es idéntico a la línea y solo tiene trazo (plus, check, chevron…), el relleno usa un trazo más grueso ("b").
BOLD = 1.3
def solid(n): return any(a.get("fill") != "none" and tag not in ("line", "polyline") for tag, a in n)
def finish(ic):
    if ic["s"] == ic["o"] and not solid(ic["s"]): ic["b"] = BOLD
    return ic

def load(name): return finish({"o": nodes(f"{SRC}/{name}-outline.svg"), "s": nodes(f"{SRC}/{name}.svg")})
camel = lambda s: re.sub(r"-(\w)", lambda m: m.group(1).upper(), s)

# Iconos propios de rblez (no existen en Ionicons), dibujados en la misma caja de 512 y con el mismo trazo.
# Son obra de rblez, bajo la licencia del repositorio; no MIT.
S = {"fill": "none", "stroke": "currentColor"}
line = lambda d: ["path", {"d": d, **S}]
fill = lambda d: ["path", {"d": d}]
box = ["rect", {"x": "64", "y": "80", "width": "384", "height": "352", "rx": "48", "ry": "48", **S}]
_own = {
  "arrowUpRight": {"o": [line("M152 360 360 152M184 152h176v176")]},
  "arrowDownLeft": {"o": [line("M360 152 152 360M328 360H152V184")]},
  "sidebar": {"o": [box, line("M192 80v352")],
              "s": [fill("M176 64h-64a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64h64Z"), fill("M208 64h192a64 64 0 0 1 64 64v256a64 64 0 0 1-64 64H208Z")]},
  "panelBottom": {"o": [box, line("M64 320h384")],
                  "s": [fill("M48 288V128a64 64 0 0 1 64-64h288a64 64 0 0 1 64 64v160Z"), fill("M48 320h416v64a64 64 0 0 1-64 64H112a64 64 0 0 1-64-64Z")]},
  "columns": {"o": [box, line("M256 80v352")],
              "s": [fill("M240 64H112a64 64 0 0 0-64 64v256a64 64 0 0 0 64 64h128Z"), fill("M272 64h128a64 64 0 0 1 64 64v256a64 64 0 0 1-64 64H272Z")]},
  "command": {"o": [line("M208 208h96v96h-96ZM208 208v-56a56 56 0 1 0-56 56h56M304 208h56a56 56 0 1 0-56-56v56M304 304v56a56 56 0 1 0 56-56h-56M208 304h-56a56 56 0 1 0 56 56v-56")]},
  "gripVertical": {"o": [["circle", {"cx": str(x), "cy": str(y), "r": "28"}] for y in (144, 256, 368) for x in (208, 304)]},
  "textCursor": {"o": [line("M192 96c32 0 64 16 64 48v224c0 32 32 48 64 48M320 96c-32 0-64 16-64 48M192 416c32 0 64-16 64-48M216 256h80")]},
}
OWN = {k: finish({"o": v["o"], "s": v.get("s", v["o"])}) for k, v in _own.items()}
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
         '/** o = línea, s = relleno; b = grosor extra del relleno cuando el icono solo tiene trazo. En attrs, "k" = grosor relativo al estándar. */\n'
         'export type IonIcon = { o: IconNode; s: IconNode; b?: number };\n')
dump = lambda x: json.dumps(x, separators=(",", ":"))
cur = HDR + types + "export const icons = {\n" + "".join(
    f"  {k}: {dump(OWN[k] if v is None else load(v))},\n" for k, v in CURATED.items()) + \
    "} satisfies Record<string, IonIcon>;\n\nexport type IconName = keyof typeof icons;\nexport type IconVariant = \"line\" | \"fill\";\n"
open("packages/tokens/src/icons.ts", "w").write(cur)

names = sorted(f[:-12] for f in os.listdir(SRC) if f.endswith("-outline.svg") and os.path.exists(f"{SRC}/{f[:-12]}.svg"))
ident = lambda n: camel(n) if not camel(n)[0].isdigit() else "_" + camel(n)
allm = HDR + 'import type { IonIcon } from "./icons";\n' + "".join(f"export const {ident(n)}: IonIcon = {dump(load(n))};\n" for n in names)
open("packages/tokens/src/ionicons.ts", "w").write(allm)
OHDR = "/**\n * Iconos propios de rblez-ui: © 2026 rblez, bajo la licencia del repositorio (no MIT).\n * Misma caja de 512 y mismo trazo que Ionicons. Generado por scripts/icons/gen.py: no editar a mano.\n */\n"
own = OHDR + 'import type { IonIcon } from "./icons";\n' + "".join(f"export const {k}: IonIcon = {dump(v)};\n" for k, v in OWN.items())
open("packages/tokens/src/rblez-icons.ts", "w").write(own)
print(len(CURATED), len(names), len(OWN), len(cur), len(allm))
