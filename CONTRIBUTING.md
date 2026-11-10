# Contribuir

rblez-ui es software propietario de rblez. Este documento describe el flujo interno.

## Flujo

1. Abre o elige un **issue** (plantillas: Bug, Componente nuevo).
2. Crea una rama desde `main`: `feat/<componente>`, `fix/<tema>`, `docs/<tema>`.
3. Commits con [Conventional Commits](https://www.conventionalcommits.org/es/): `feat(button): …`, `fix(footer): …`.
4. Abre un **PR** con la plantilla; CI construye las docs.
5. Squash & merge. `main` se despliega solo en GitHub Pages.

## Versiones

- SemVer. Mientras sea `0.x`, un cambio de API sube el *minor*.
- Para publicar: mueve **Unreleased** a `## [x.y.z] - AAAA-MM-DD` en `CHANGELOG.md`, sube la versión en todos los `package.json`, y crea el tag `vx.y.z`. El workflow **Release** genera la release con las notas y el zip de las docs.
- La cabecera de las docs muestra la versión y el commit del build.

## Etiquetas

`component` · `bug` · `enhancement` · `docs` · `a11y` · `svelte` · `react` · `tokens` · `triage`

## Desarrollo

```bash
pnpm install
pnpm dev     # docs en http://localhost:5173/designs/
pnpm build
```
