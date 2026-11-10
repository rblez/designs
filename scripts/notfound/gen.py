"""Genera el arte isométrico del 404 (SVG) a partir de los glifos de Inter.

Proyección isométrica: X = a lo largo del texto, Y = profundidad (hacia atrás), Z = alto.
pantalla = ((X - Y)·cos30, -Z - (X + Y)·sin30). Se ven las caras -Y (frente), -X y +Z.
Salida: packages/tokens/src/notfound-art.ts  (string SVG con variables CSS para el tema).
"""
import math, sys, json
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.basePen import BasePen

FONT = "apps/preview/src/fonts/Inter-Variable.woff2"
WGHT = float(sys.argv[1]) if len(sys.argv) > 1 else 420
CAP = 250.0          # alto de los dígitos en px de pantalla
DEPTH = 21.0         # extrusión en px
TRACK = -0.10        # tracking (fracción del avance)
C30, S30 = math.cos(math.pi / 6), 0.5

class Flat(BasePen):
    def __init__(self, gs):
        super().__init__(gs); self.contours = []; self.cur = []
    def _moveTo(self, p): self.cur = [p]
    def _lineTo(self, p): self.cur.append(p)
    def _curveToOne(self, p1, p2, p3):
        p0 = self.cur[-1]
        for i in range(1, 9):
            t = i / 8; mt = 1 - t
            self.cur.append((mt**3*p0[0]+3*mt*mt*t*p1[0]+3*mt*t*t*p2[0]+t**3*p3[0], mt**3*p0[1]+3*mt*mt*t*p1[1]+3*mt*t*t*p2[1]+t**3*p3[1]))
    def _qCurveToOne(self, p1, p2):
        p0 = self.cur[-1]
        for i in range(1, 9):
            t = i / 8; mt = 1 - t
            self.cur.append((mt*mt*p0[0]+2*mt*t*p1[0]+t*t*p2[0], mt*mt*p0[1]+2*mt*t*p1[1]+t*t*p2[1]))
    def _closePath(self):
        c = self.cur
        if len(c) > 2 and math.dist(c[0], c[-1]) < 1e-6: c = c[:-1]
        # quita puntos colineales
        out = []
        for i, p in enumerate(c):
            a, b = c[i - 1], c[(i + 1) % len(c)]
            cr = (p[0]-a[0])*(b[1]-p[1]) - (p[1]-a[1])*(b[0]-p[0])
            if abs(cr) > 1e-3 * max(1, math.dist(a, p) * math.dist(p, b)) or not out: out.append(p)
        self.contours.append(out); self.cur = []
    _endPath = _closePath

f = TTFont(FONT)
f = instancer.instantiateVariableFont(f, {"wght": WGHT})
gs = f.getGlyphSet(); cmap = f.getBestCmap()
capH = f["OS/2"].sCapHeight or 1490
k = CAP / capH

glyphs = []
x0 = 0.0
for ch in "404":
    g = gs[cmap[ord(ch)]]
    pen = Flat(gs); g.draw(pen)
    glyphs.append([[((x + x0) * k, y * k) for x, y in c] for c in pen.contours])
    x0 += g.width * (1 + TRACK)

def proj(X, Y, Z):
    return ((X - Y) * C30, -Z - (X + Y) * S30)

def area(c):
    return sum(c[i-1][0]*c[i][1] - c[i][0]*c[i-1][1] for i in range(len(c))) / 2

polys = []  # (layer, depthkey, kind, pts)
for gi, contours in enumerate(glyphs):
    layer = 2 - gi  # dibuja primero el 4 de la derecha (más lejos)
    outer = max(contours, key=lambda c: abs(area(c)))
    sgn = 1 if area(outer) > 0 else -1
    for c in contours:
        n = len(c)
        for i in range(n):
            (ax, az), (bx, bz) = c[i], c[(i + 1) % n]
            ex, ez = bx - ax, bz - az
            nx2, nz2 = ez * sgn, -ex * sgn
            if -nx2 + nz2 <= 1e-9: continue
            a, b = (ax, az), (bx, bz)
            pts = [proj(a[0], 0, a[1]), proj(b[0], 0, b[1]), proj(b[0], DEPTH, b[1]), proj(a[0], DEPTH, a[1])]
            mx, mz = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
            shade = "top" if nz2 > abs(nx2) else "side"
            polys.append((layer, mx + DEPTH / 2 - mz, "s-" + shade, pts))
    polys.append((layer, -1e9, "front", [[proj(x, 0, z) for x, z in c] for c in contours]))

polys.sort(key=lambda p: (p[0], -p[1]))
xs = [pt[0] for p in polys for pt in (p[3] if p[2] != "front" else [q for c in p[3] for q in c])]
ys = [pt[1] for p in polys for pt in (p[3] if p[2] != "front" else [q for c in p[3] for q in c])]
pad = 4
minx, miny = min(xs) - pad, min(ys) - pad
W, H = max(xs) - minx + pad, max(ys) - miny + pad
fmt = lambda v: f"{v:.1f}".rstrip("0").rstrip(".")
def path(pts): return "M" + "L".join(f"{fmt(x - minx)} {fmt(y - miny)}" for x, y in pts) + "Z"

body = []
for layer, _, kind, pts in polys:
    if kind == "front":
        d = "".join(path(c) for c in pts)
        body.append(f'<path class="nf-front" d="{d}" fill-rule="nonzero"/>')
    else:
        body.append(f'<path class="nf-{kind}" d="{path(pts)}"/>')
inner = "".join(body)

# centro del 0 para el brillo de color
zx = [p[0] for c in glyphs[1] for p in c]; zz = [p[1] for c in glyphs[1] for p in c]
cx, cy = proj((min(zx) + max(zx)) / 2, DEPTH / 2, (min(zz) + max(zz)) / 2)
cx, cy = cx - minx, cy - miny

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(W)} {fmt(H)}" width="{fmt(W)}" height="{fmt(H)}" fill="none" aria-hidden="true">'
    '<defs>'
    f'<linearGradient id="nf-face" x1="0" y1="0" x2="{fmt(W)}" y2="{fmt(H)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="var(--nf-face-1)"/><stop offset="1" stop-color="var(--nf-face-2)"/></linearGradient>'
    f'<linearGradient id="nf-glow" x1="{fmt(cx + 40)}" y1="{fmt(cy - 150)}" x2="{fmt(cx - 40)}" y2="{fmt(cy + 150)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f2b56b"/><stop offset=".45" stop-color="#e79ab8"/><stop offset="1" stop-color="#a99be0"/></linearGradient>'
    f'<radialGradient id="nf-fade" cx="{fmt(cx)}" cy="{fmt(cy)}" r="190" gradientUnits="userSpaceOnUse"><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'
    f'<mask id="nf-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="{fmt(W)}" height="{fmt(H)}"><rect width="{fmt(W)}" height="{fmt(H)}" fill="url(#nf-fade)"/></mask>'
    '</defs>'
    f'<g class="nf-solid">{inner}</g>'
    f'<g class="nf-tint" mask="url(#nf-mask)">{inner}</g>'
    '</svg>'
)
out = "packages/tokens/src/notfound-art.ts"
open(out, "w").write("// Generado por scripts/notfound/gen.py: no editar a mano.\n"
                      f"export const notFoundArt = {json.dumps(svg)};\n"
                      f"export const notFoundArtSize = {{ width: {fmt(W)}, height: {fmt(H)} }};\n")
open("/tmp/nf.svg", "w").write(svg)
print("ok", fmt(W), fmt(H), len(svg))
