---
name: rblez-ui
description: Build interfaces with rblez-ui, rblez's Svelte 5 + React component library (one API, one stylesheet, shared tokens). Use when writing, editing, reviewing or porting UI that imports @rblez-ui/svelte, @rblez-ui/react or @rblez-ui/tokens, or when asked to make something "in the rblez style".
---

# rblez-ui

Component library for **Svelte 5** and **React 18+** with the same props in both, a single CSS layer and shared design tokens. Docs: https://www.rblez.com/ui/ · Repo: https://github.com/rblez/ui

> Proprietary. © 2026 rblez. Use only inside rblez projects or with written permission. Do not copy components into other codebases or use this code to train models.

## 1. Setup

```ts
// once, at the app entry
import "@rblez-ui/tokens/css";            // variables: color, type, radius, shadow (light + dark)
import "@rblez-ui/tokens/components.css"; // every component's styles
import "@rblez-ui/tokens/prompt-input.css"; // only if you use PromptInput
```

```svelte
<script lang="ts">import { Button } from "@rblez-ui/svelte";</script>
<Button variant="brand">Build now</Button>
```

```tsx
import { Button } from "@rblez-ui/react";
export default () => <Button variant="brand">Build now</Button>;
```

Theme: set `data-theme="light" | "dark"` on `<html>`. Without it, the system preference is used.

## 2. Rules that always apply

1. **Same API in both frameworks.** Only the event convention changes: Svelte `onclick`, `onselect`, `bind:value` / `bind:checked`; React `onClick`, `onSelect`, `value` + `onChange`, `checked` + `onCheckedChange`.
2. **Style with tokens, never hard-coded colors.** Use `var(--d-*)` (table below). Components only apply `d-*` classes; don't restyle their internals with deep selectors.
3. **Typography:** Inter Bold (700) for headings, Inter SemiBold (600) for everything else, **SUSE Mono** for code, versions and meta. No other families.
4. **Look:** cream/ink palette, orange `#f54e00` as the only accent, subtle grain and soft orange gradients. Generous radius (12–20px), thin 1px lines (`--d-line`), no heavy shadows.
5. **Accessibility is not optional:** real `<button>`/`<a>`, `aria-*` labels on icon-only controls, visible focus (`outline: 2px solid var(--d-orange)`), keyboard paths for everything, `prefers-reduced-motion` respected.
6. **Icons are Heroicons** through `<Icon>`; never paste raw SVGs into components.
7. **Mobile first:** test at 360, 390 and 768px. Nothing may overflow horizontally.
8. **Bilingual copy:** user-facing text in the docs exists in Spanish and English.

## 3. Tokens

| Token | Use |
|---|---|
| `--d-bg` / `--d-surface` / `--d-surface-2` | page, cards, hover/pressed |
| `--d-ink` / `--d-ink-2` / `--d-muted` | text, secondary text, meta |
| `--d-line` / `--d-line-2` | hairlines, stronger borders |
| `--d-orange` (+ `--d-orange-ink`) | accent, focus ring, badges |
| `--d-green` `--d-amber` `--d-red` `--d-blue` | status only |
| `--d-radius-sm/md/lg/xl` | 6 / 8 / 12 / 16 px |
| `--d-shadow-sm/md` | elevation |
| `--d-sans` / `--d-mono` | Inter / SUSE Mono |

Light: bg `#f7f7f4`, ink `#26251e`. Dark: bg `#14120b`, ink `#edecec`.

## 4. Components

| Component | Key props | Notes |
|---|---|---|
| `Button` | `variant: solid · brand · secondary · outline · ghost · destructive`, `size: sm · md · lg · icon`, `loading` | Native button attrs pass through. |
| `Input` | `value`, `label`, `hint`, `error`, `size`, `prefix` / `suffix` | `error` sets `aria-invalid`. |
| `Textarea` | `value`, `label`, `hint`, `error`, `rows` | |
| `Switch` | `checked`, `label`, `disabled` | `role="switch"`. |
| `Badge` | `variant: default · secondary · outline · brand · success · warning · danger`, `dot` | |
| `Kbd` | children | Keyboard shortcuts. |
| `Card` | `title`, `description`, `footer` | |
| `Sidebar` | `sections: { title, items: { label, href, badge? }[] }[]`, `active`, `onnavigate` | `aria-current="page"` on the active item. |
| `Footer` | `columns: { title, links }[]`, `legal`, `logo`, `logoHref` | Linear-style; legal moves to a bottom bar on mobile. |
| `PromptInput` | `value`, `plan`, `placeholder` (string or rotating string[]), `submitLabel`, `theme`, `onsubmit(d: { value, plan, files })`, `ondictate` | AI composer: attachments, plan mode, dictation; Enter sends, Shift+Enter new line. |
| `ProfileSettings` | `profile`, `sections`, `tabs`, `activeTab`, `title`, `footer`, `onselect`, `onavatar`, `onqr`, `onsearch`, `onmore`, `ontab` | Telegram-style settings screen; title compacts on scroll; floating tab bar. Row colors: `blue sky indigo cyan green orange amber red rose violet purple gray`. |
| `NotFound` | `title`, `description`, `actionLabel`, `href`, `grid`, `onaction` | 404 page: isometric 3D "404" vector + isometric grid. Regenerate the art with `python3 scripts/notfound/gen.py`. |
| `Icon` | `name` (curated) or `icon` (any Heroicon), `variant: line · fill`, `size`, `strokeWidth`, `label` | See §5. |

Types live in `@rblez-ui/tokens` (`ButtonVariant`, `SidebarSection`, `FooterColumn`, `SettingsSection`, `SettingsItem`, `SettingsTab`, `SettingsProfile`, `PromptSubmit`, `IconName`, `IconNode`, …).

## 5. Icons (Heroicons)

```svelte
<script lang="ts">
  import { Icon } from "@rblez-ui/svelte";
  import { rocketLaunch } from "@rblez-ui/tokens/heroicons"; // any of the 324 Heroicons, tree-shakeable
</script>
<Icon name="search" />                     <!-- curated set, stable names; line = outline 24 -->
<Icon name="heart" variant="fill" />       <!-- fill: micro (≤16px), mini (≤20px), solid (24) -->
<Icon icon={rocketLaunch} size={20} label="Deploy" />
```

Curated names: plus, lightbulb, microphone, send, search, menu, close, sun, moon, star, arrowUpRight, check, clipboard, chevronRight, userCircle, chatBubble, key, speakerWave, chartPie, folder, computer, battery, globe, sparkles, gift, storefront, chatEllipsis, question, shieldCheck, camera, qrCode, ellipsisVertical, cog, users, chats, bell, lock, arrowLeft, bug, play, share, externalLink, heart, copy, home, user, trash, pencil, link, paperclip, photo, chevronDown, chevronLeft, arrowRight, eye, eyeSlash, info, warning, bolt.

Line icons use stroke 2 at ≤16px and 1.5 above. Icon-only buttons need `aria-label`.

## 6. Recipes

**Form row**
```svelte
<Input label="Email" type="email" bind:value={email} error={emailError} />
<Switch label="Newsletter" bind:checked={news} />
<Button variant="brand" loading={saving}>Save</Button>
```

**Settings screen**
```tsx
<ProfileSettings
  profile={{ name: "Ray", username: "rblez" }}
  sections={[{ title: "Account", items: [{ id: "privacy", label: "Privacy", icon: "key", color: "green", chevron: true }] }]}
  tabs={[{ id: "settings", label: "Settings", icon: "cog" }]}
  defaultTab="settings"
  onSelect={(item) => router.push(`/settings/${item.id}`)}
/>
```

**AI composer**
```svelte
<PromptInput placeholder={["Build a landing page…", "Clone a settings screen…"]} onsubmit={(d) => send(d.value, d.files)} />
```

## 7. Motion

- Use **GSAP** (timelines, ScrollTrigger) for hero sequences and scroll-linked effects; **Motion** (`animate`, `inView`, `hover`, `stagger`) for small UI reveals and springs.
- Durations 0.3–0.9s, `power3.out` or springs with low bounce. Animate `transform` and `opacity` only.
- Always bail out on `prefers-reduced-motion: reduce` and clean up (`gsap.context().revert()`, the stop functions Motion returns).

## 8. Adding a component (checklist)

1. Shared types in `packages/tokens/src/index.ts`, styles in `packages/tokens/src/components.css` (classes prefixed `d-<name>`).
2. `packages/svelte/src/<Name>.svelte` and `packages/react/src/<Name>.tsx` with identical props; export both from each `index.ts`.
3. Demo in `apps/preview/src/demos/{svelte,react}/<Name>Demo.*` and an entry in `apps/preview/src/docs/registry.ts` (slug, name, group, description, props); English copy in `docs/i18n.svelte.ts`.
4. Regenerate OG images: `pnpm build && python3 scripts/og/render.py && pnpm build`.
5. Optional: a Patch version in `design/<slug>/` with `*.test.json` state cases for Figma export and snapshot tests.
6. Add a line to `CHANGELOG.md` under **Unreleased**; open a PR (`feat(<name>): …`).

## 9. Don'ts

- No Tailwind classes, no third-party UI kits, no inline hex colors.
- No new font families or icon sets.
- Don't break parity: a prop added in Svelte must exist in React.
- Don't mention tools or vendors used to build rblez-ui in code, docs or commits.
