# Changelog

Todos los cambios notables de rblez-ui. Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionado [SemVer](https://semver.org/lang/es/).

## [Unreleased]

## [0.1.0] - 2026-11-10

### Added
- Paquetes `@rblez-ui/tokens`, `@rblez-ui/svelte` (Svelte 5) y `@rblez-ui/react` (18+) con la misma API.
- Componentes: Button, Input, Textarea, Switch, Badge, Card, Kbd, Sidebar, PromptInput y Footer (réplica del de Linear).
- Iconos Heroicons micro (16 px) en `@rblez-ui/tokens`.
- Documentación en `/designs/`: vista previa y código por framework, resaltado con Shiki, tema claro y oscuro, inglés y español.
- Navegación móvil tipo Vercel: dock inferior con búsqueda y listado.
- «Enviar a IA»: abre ChatGPT, Claude, v0, Lovable, Bolt, Replit o Hark con el código del componente.
- Botón de estrellas de GitHub, página Acerca de, imagen Open Graph.
- Versión y commit del build visibles en la cabecera de las docs.
- CI en PRs, despliegue a GitHub Pages y releases automáticas por tag.

### Changed
- Tipografía: Inter (bold en títulos, semibold en el resto) y SUSE Mono para código.

### Removed
- Paquete de React Native (solo web).

[Unreleased]: https://github.com/rblez/designs/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/rblez/designs/releases/tag/v0.1.0
