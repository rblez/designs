# designs

Laboratorio de componentes web en TypeScript. Un mismo componente, tres runtimes: **Svelte**, **React** y **React Native**, con tokens de diseño compartidos.

Preview: https://www.rblez.com/designs/ (también en GitHub Pages)

## Estructura

```
packages/
  tokens/        colores, espacios, radios, tipografía (TS) + tokens.css para web
  svelte/        componentes Svelte 5 (runes, TS)
  react/         componentes React 18+ (TSX)
  react-native/  componentes React Native (Pressable + tokens en JS)
apps/
  preview/       Vite + Svelte + React, se publica con base /designs/
```

## Comandos

| Acción | Comando |
|---|---|
| Instalar | `pnpm install` |
| Preview local | `pnpm dev` |
| Build del preview | `pnpm build` → `apps/preview/dist` |
| Typecheck | `pnpm typecheck` |

## Publicación

- **GitHub Pages**: rama `gh-pages` con el build de `apps/preview` (Settings → Pages → Deploy from branch `gh-pages`).
- **www.rblez.com/designs/**: copiar `apps/preview/dist/*` a `designs/` en `rblez/www.rblez.com` y `npx wrangler deploy` (igual que asciidot y terminal).

## Añadir un componente

1. Tipos y tokens compartidos en `packages/tokens`.
2. Implementación en `svelte/`, `react/` y `react-native/` con la misma API.
3. Demo en `apps/preview`.
