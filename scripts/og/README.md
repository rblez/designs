# OG image

`og.html` es la plantilla (1200×630). Para regenerar `apps/preview/public/og.png`:

```bash
python3 -c "from playwright.sync_api import sync_playwright as s
with s() as p:
  b=p.chromium.launch(); pg=b.new_page(viewport={'width':1200,'height':630})
  pg.goto('file://'+__import__('os').path.abspath('scripts/og/og.html')); pg.wait_for_timeout(800)
  pg.screenshot(path='apps/preview/public/og.png')"
```
