# Changelog

Todos los cambios notables de rblez-ui. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionado [SemVer](https://semver.org/lang/es/).

## [Unreleased]

### Added
- `GuideGrid` y `GuideCell`: rejilla con guías visibles al estilo Geist. Columnas fijas o `{ sm, md, lg }` por ancho del contenedor, celdas `solid` que tapan las guías, cruces en las esquinas (`cross`), guías discontinuas (`dashed`) y `hideRowGuides` / `hideColumnGuides`.
- `Spinner`, `LoadingDots` y `Skeleton` (página Loading): spinner de 12 barras con tamaño y color, puntos con texto delante (`aria-live=polite`) y esqueleto con ancho, alto, forma (`rounded | pill | circle | square`), brillo y `show` para mostrar el contenido real. Respetan `prefers-reduced-motion`.
- Docs: `exports` en el registro para que Uso importe todos los nombres de un componente compuesto.

### Fixed
- Móvil: las tablas de props y de paquetes se apilan como lista (nombre, tipo, valor por defecto y descripción) en vez de cortarse con scroll lateral.
- Móvil: la demo de NotFound deja aire para el botón Preview y ya no corta el 404 por los lados.
- Móvil: la landing reserva espacio al final para el buscador flotante.

### Added (anterior)
- Temas y acentos: el acento ya no está atado al naranja. `data-accent="orange | blue | violet | green | rose | amber | teal | ink"` (naranja por defecto) en `<html>` o en cualquier contenedor, cada preset con valor claro y oscuro, o cualquier color con `--d-brand` (ambos temas) o `--d-brand-l` / `--d-brand-d` (uno por tema).
- Tokens semánticos del acento derivados de `--d-brand` con `color-mix(in oklch, …)`: `--d-brand-ink` (tinta sobre el acento, blanca o casi negra según su luminosidad, contraste ≥ 4.5:1, sobrescribible), `--d-brand-text` (acento como texto legible sobre el fondo), `--d-brand-soft`, `--d-brand-line` y `--d-ring`.
- Neutros intercambiables: `data-neutral="cream | zinc | slate"` (crema por defecto). Cada token con tema tiene fuentes `-l` / `-d` (`--d-bg-l`, `--d-bg-d`…) que se pueden sobrescribir.
- `setAccent(color | preset | { light, dark } | null, el?)`, `getAccent()`, `setNeutral()`, `isAccentPreset()`, `ACCENT_PRESETS`, `NEUTRAL_PRESETS`, `accentSwatches` y los tipos `AccentPreset`, `AccentValue` y `NeutralPreset` en `@rblez-ui/tokens`, reexportados desde `@rblez-ui/svelte` y `@rblez-ui/react`.
- Docs: selector de acento y neutros en la cabecera (escritorio), en el menú móvil y en la página Tokens (presets + color propio), guardado en `localStorage` y aplicado antes de pintar. La página Tokens explica los tokens del acento, presets, color propio y neutros; Instalación enseña cómo cambiar el acento.
- `PromptInput`: puede usar el acento de rblez-ui con `--d-prompt-brand`, `--d-prompt-accent` y `--d-prompt-accent-ink` (por defecto mantiene el azul de bolt).
- Versiones Patch: `design/accents.ts` con los presets y un estado `accent` en cada `design/*/*.pat`, con casos `accent-blue` y `accent-violet-light`.
- Plantilla OG: `?accent=` / `render.py --accent` para generar las imágenes con otro acento.
- `Grid` y `GridItem`: rejillas responsive con container queries (480 / 768 / 1024 / 1280px): `auto-fit` / `auto-fill` por ancho mínimo (`min`), `columns` con columnas por breakpoint (`cols: { base, sm, md, lg, xl }`), `masonry` (columnas CSS), `bento` con `colSpan` / `rowSpan` y `split` con columna lateral (`sidebar`, `side`). Los spans anchos ocupan la fila entera por debajo de 768px.
- `Modal`: diálogo sobre `<dialog>` nativo con focus trap, devolución del foco, `aria-modal` / `aria-labelledby` / `aria-describedby`, tamaños `sm` · `md` · `lg`, pie de acciones, cierre con Esc y clic en el fondo configurables y bloqueo de scroll.
- `BottomSheet`: hoja inferior para móvil con asa para arrastrar (y flechas ↑/↓), puntos de anclaje (`snapPoints`, `snap`), cerrar arrastrando, fondo, focus trap, Esc, bloqueo de scroll y padding de safe-area.
- `Select`: select accesible con listbox propio (`role="combobox"`), teclado completo (flechas, Home/End, PageUp/PageDown, búsqueda por tecleo, Enter/Esc/Tab), `aria-activedescendant`, iconos, opciones deshabilitadas, búsqueda opcional (`searchable`, sin tildes ni mayúsculas) e input oculto para formularios. Mismo aspecto que `Input`.
- `Toast`: `<Toaster>` (región `aria-live="polite"`, `position`, `max`) y `toast()` con variantes `default` · `success` · `warning` · `danger`, título, descripción, acción, duración, cierre, apilado y pausa al pasar el ratón o con el foco. El store es agnóstico al framework y vive en `@rblez-ui/tokens`.
- Grupo «Overlay» en la docs; demos y páginas (`/ui/<slug>/`) para los cinco componentes, en español e inglés.
- Versiones Patch en `design/grid`, `design/modal`, `design/bottom-sheet`, `design/select` y `design/toast` con casos de estado (claro/oscuro, abierto/cerrado, opción elegida, variantes…) y sus snapshots.
- CI: job «Patch snapshots» que ejecuta `patch test` sobre cada `design/*/`.
- `NotFound`: página 404 con un 404 isométrico en 3D (vector generado desde Inter), rejilla isométrica y tema claro/oscuro. La docs lo usa para rutas inexistentes.
- Slider de componentes en móvil (deslizar o tocar) y paginador anterior/siguiente.
- Landing en la introducción con animaciones GSAP (timeline y ScrollTrigger) y Motion (inView, hover, springs).
- Acerca de completo: mockups en PC y móvil, cada IA, paquetes, stack, versiones, licencia y contacto.
- `SKILL.md`: guía para agentes de IA que trabajan con rblez-ui.
- Iconos Heroicons en línea (outline) y relleno (solid, mini y micro según el tamaño); los 324 iconos en `@rblez-ui/tokens/heroicons`.
- ProfileSettings: pantalla de ajustes de perfil estilo Telegram (Svelte y React), con avatar, grupos de iconos de color, título compacto al hacer scroll y pestañas flotantes.
- Cada componente tiene su propia URL (`/ui/<slug>/`) con título, descripción e imagen Open Graph propias, y botón Compartir.
- Sección de Comentarios en cada componente: abre un issue de bug o mejora en GitHub con componente, paquete, versión y navegador rellenados.
- Búsqueda en la cabecera en escritorio (⌘K / Ctrl+K) con paleta de comandos.

### Changed
- Todos los naranjas fijos de `components.css`, `prompt-input.css` y la docs (degradados, brillos, anillos de foco, enlaces, badges, switch, Select, Toast, ProfileSettings, NotFound) usan ahora los tokens del acento.
- Botón `brand` y badges de ProfileSettings: el texto usa `--d-brand-ink`. Con el naranja por defecto en tema claro pasa de blanco (3.5:1) a casi negro (5.5:1) para cumplir AA.
- Texto en color de acento (eyebrow, enlaces, badge `brand`, check del Select, títulos de grupo de ProfileSettings) usa `--d-brand-text`: en claro el naranja se oscurece un poco para leerse sobre crema.
- Brillo del 404 (`NotFound`): el degradado naranja → rosa → lavanda se deriva del acento (`--nf-glow-1..3`).
- `tokens.css` reorganizado: neutros y acento como fuentes claras/oscuras y un bloque de selección por tema; los valores por defecto no cambian.
- Acerca de: se quita el mockup del teléfono; queda solo la vista de escritorio.
- `ProfileSettings`: los iconos de las baldosas de color son rellenos (Heroicons solid vía `<Icon variant="fill">`), en blanco sobre la baldosa, como en los ajustes de Telegram; el icono de la pestaña activa también es relleno y las inactivas siguen en línea. Las píldoras superiores (QR, buscar, más) y el chevron siguen en línea. La versión Patch (`design/profile-settings`) usa glifos rellenos equivalentes y sus snapshots se han regenerado.
- El repo pasa a `rblez/ui` y la ruta a `/ui/`.
- La licencia se integra en Acerca de.
- Preview sin selector de framework.
- Las demos de la documentación son estáticas; el botón Preview abre el componente vivo a pantalla completa en `/ui/<slug>/preview/`.
- «Enviar a IA»: rejilla sin subtítulos, logos más grandes con los favicons oficiales de cada servicio.
- Copiar código ahora es un icono junto a «Enviar a IA».
- Los enlaces antiguos con `#/slug` redirigen a la nueva ruta.

### Deprecated
- `--d-orange` y `--d-orange-ink`: ahora son alias de `--d-brand` y `--d-brand-ink` y se quitarán en 1.0. Para personalizar el acento usa `--d-brand` (cambiar `--d-orange` ya no afecta a los componentes).

### Fixed
- `NotFound`: en móvil el arte y el texto se rompían en una columna de ~30px (cada palabra cortada). Causa: `.d-404` es un flex item (vía `display: contents` del marco del preview) y sin `width` ni `min-width` colapsaba; la media query de contenedor nunca se activaba. Ahora `.d-404` lleva `width: 100%; min-width: 0` y el layout apila arte y texto correctamente a 360/390px.
- Header de la docs: se apilaba en dos filas (logo y versión arriba, búsqueda/Star abajo) y el logo quedaba cortado arriba, en móvil y en escritorio. Causa: `.top` no tenía ninguna regla base (ni `display`, ni altura, ni padding), solo ajustes sueltos en media queries. Ahora `.top` es una fila `sticky` de 56px (`display: flex; justify-content: space-between`) con fondo difuminado y borde inferior, como `.pv__bar`.

## [0.1.0] - 2026-11-10

### Added
- Paquetes `@rblez-ui/tokens`, `@rblez-ui/svelte` (Svelte 5) y `@rblez-ui/react` (18+) con la misma API.
- Componentes: Button, Input, Textarea, Switch, Badge, Card, Kbd, Sidebar, PromptInput y Footer (réplica del de Linear).
- Iconos en `@rblez-ui/tokens`.
- Documentación en `/ui/`: vista previa y código por framework, resaltado con Shiki, tema claro y oscuro, inglés y español.
- Navegación móvil tipo Vercel: dock inferior con búsqueda y listado.
- «Enviar a IA»: abre v0, ChatGPT, Claude o Replit con el código del componente.
- Botón de estrellas de GitHub, página Acerca de, imagen Open Graph.
- Versión y commit del build visibles en la cabecera de las docs.
- CI en PRs, despliegue a GitHub Pages y releases automáticas por tag.

### Changed
- Tipografía: Inter (bold en títulos, semibold en el resto) y SUSE Mono para código.

### Removed
- Paquete de React Native (solo web).

[Unreleased]: https://github.com/rblez/ui/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/rblez/ui/releases/tag/v0.1.0
