# designs

Sistema de componentes web propio en TypeScript, con documentación tipo docs y sidebar. Solo web: un mismo componente en **Svelte** y **React**, con tokens de diseño compartidos.

Preview: https://www.rblez.com/designs/ (también en GitHub Pages)

## Componentes

| Grupo | Componentes |
|---|---|
| IA | `PromptInput` |
| Formularios | `Button`, `Input`, `Textarea`, `Switch` |
| Layout | `Card`, `Sidebar` |
| Feedback | `Badge`, `Kbd` |

Todos en Svelte 5 y React 18+ con la misma API. Estilos en `@designs/tokens` (`css`, `components.css`, `prompt-input.css`).

## Estructura

```
packages/
  tokens/        colores, espacios, radios, tipografía (TS) + tokens.css para web
  svelte/        componentes Svelte 5 (runes, TS)
  react/         componentes React 18+ (TSX)
apps/
  preview/       docs (Vite + Svelte, demos en vivo de Svelte y React), base /designs/
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
2. Implementación en `svelte/` y `react/` con la misma API.
3. Demo en `apps/preview`.

## Licencia

Propietaria. © 2026 rblez. Todos los derechos reservados. El código es visible pero no puede copiarse, modificarse, distribuirse ni usarse sin permiso escrito. Ver [LICENSE](./LICENSE).
