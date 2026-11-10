"""Genera apps/preview/public/og.png y og/<slug>.png. Uso: python3 scripts/og/render.py [--accent '#2563eb'] (tras pnpm build)."""
import json, os, sys, urllib.parse
from playwright.sync_api import sync_playwright
root = os.path.dirname(os.path.abspath(__file__))
tpl = "file://" + os.path.join(root, "og.html")
pub = os.path.join(root, "../../apps/preview/public")
pages = json.load(open(os.path.join(pub, "../dist/pages.json")))
os.makedirs(os.path.join(pub, "og"), exist_ok=True)
accent = sys.argv[sys.argv.index("--accent") + 1] if "--accent" in sys.argv else None
extra = {"accent": accent} if accent else {}
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1200, "height": 630})
    pg.goto(f"{tpl}?{urllib.parse.urlencode(extra)}" if extra else tpl); pg.wait_for_timeout(800); pg.screenshot(path=os.path.join(pub, "og.png"))
    for x in pages:
        q = urllib.parse.urlencode({"name": x["name"], "desc": x["descriptionEn"], **extra, "group": {"Formularios": "Forms", "IA": "AI"}.get(x.get("group", ""), x.get("group", ""))})
        pg.goto(f"{tpl}?{q}"); pg.wait_for_timeout(500); pg.screenshot(path=os.path.join(pub, "og", f"{x['slug']}.png"))
    b.close()
print("ok", len(pages))
