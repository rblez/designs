# Changelog

Todos los cambios notables de rblez-ui. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionado [SemVer](https://semver.org/lang/es/).

## [Unreleased]

### Fixed
- `NotFound`: en móvil el arte y el texto se rompían en una columna de ~30px (cada palabra cortada). Causa: `.d-404` es un flex item (vía `display: contents` del marco del preview) y sin `width` ni `min-width` colapsaba; la media query de contenedor nunca se activaba. Ahora `.d-404` lleva `width: 100%; min-width: 0` y el layout apila arte y texto correctamente a 360/390px.
- Header de la docs: se apilaba en dos filas (logo y versión arriba, búsqueda/Star abajo) y el logo quedaba cortado arriba, en móvil y en escritorio. Causa: `.top` no tenía ninguna regla base (ni `display`, ni altura, ni padding), solo ajustes sueltos en media queries. Ahora `.top` es una fila `sticky` de 56px (`display: flex; justify-content: space-between`) con fondo difuminado y borde inferior, como `.pv__bar`.

### Added
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
- Acerca de: se quita el mockup del teléfono; queda solo la vista de escritorio.
- `ProfileSettings`: los iconos de las baldosas de color son rellenos (Heroicons solid vía `<Icon variant="fill">`), en blanco sobre la baldosa, como en los ajustes de Telegram; el icono de la pestaña activa también es relleno y las inactivas siguen en línea. Las píldoras superiores (QR, buscar, más) y el chevron siguen en línea. La versión Patch (`design/profile-settings`) usa glifos rellenos equivalentes y sus snapshots se han regenerado.
- El repo pasa a `rblez/ui` y la ruta a `/ui/`.
- La licencia se integra en Acerca de.
- Preview sin selector de framework.
- Las demos de la documentación son estáticas; el botón Preview abre el componente vivo a pantalla completa en `/ui/<slug>/preview/`.
- «Enviar a IA»: rejilla sin subtítulos, logos más grandes con los favicons oficiales de cada servicio.
- Copiar código ahora es un icono junto a «Enviar a IA».
- Los enlaces antiguos con `#/slug` redirigen a la nueva ruta.

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
