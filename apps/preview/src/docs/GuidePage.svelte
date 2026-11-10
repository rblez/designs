<script lang="ts">
  import CodeBlock from "./CodeBlock.svelte";
  import { Card, Badge } from "@rblez-ui/svelte";
  let { slug, go }: { slug: string; go: (s: string) => void } = $props();
  const swatches = [
    ["--d-bg", "Fondo"], ["--d-surface", "Superficie"], ["--d-surface-2", "Superficie 2"], ["--d-ink", "Tinta"],
    ["--d-muted", "Atenuado"], ["--d-line-2", "Borde"], ["--d-orange", "Naranja"], ["--d-green", "Éxito"], ["--d-amber", "Aviso"], ["--d-red", "Error"],
  ];
</script>

<article class="page">
  {#if slug === "introduccion"}
    <p class="eyebrow">Empezar</p>
    <h1>rblez-ui</h1>
    <p class="lead">Componentes de interfaz propios, escritos en TypeScript, con la misma API en Svelte y React. Un solo CSS, tokens compartidos y cero dependencias de UI de terceros.</p>
    <div class="grid">
      <button class="tile" onclick={() => go("prompt-input")}><Badge variant="brand">IA</Badge><strong>PromptInput</strong><span>Composer con adjuntos, plan y dictado.</span></button>
      <button class="tile" onclick={() => go("input")}><Badge>Formularios</Badge><strong>Input</strong><span>Label, ayuda, error y afijos.</span></button>
      <button class="tile" onclick={() => go("sidebar")}><Badge>Layout</Badge><strong>Sidebar</strong><span>La navegación que estás usando.</span></button>
      <button class="tile" onclick={() => go("tokens")}><Badge variant="outline">Base</Badge><strong>Tokens</strong><span>Crema, tinta y naranja.</span></button>
    </div>
    <h2>Principios</h2>
    <ul class="list">
      <li><strong>Una API, dos frameworks.</strong> Mismos nombres de props; solo cambia la convención de eventos.</li>
      <li><strong>CSS antes que JS.</strong> Los estilos viven en <code>@rblez-ui/tokens</code>; los componentes solo ponen clases.</li>
      <li><strong>Accesible por defecto.</strong> Roles, aria y foco visible en todo.</li>
    </ul>
  {:else if slug === "instalacion"}
    <p class="eyebrow">Empezar</p>
    <h1>Instalación</h1>
    <p class="lead">Monorepo con pnpm. Uso privado de rblez; ver Licencia.</p>
    <h2>1. Estilos</h2>
    <CodeBlock lang="ts" code={`import "@rblez-ui/tokens/css";\nimport "@rblez-ui/tokens/components.css";\nimport "@rblez-ui/tokens/prompt-input.css";`} />
    <h2>2. Svelte</h2>
    <CodeBlock lang="svelte" code={`<script lang="ts">\n  import { Button } from "@rblez-ui/svelte";\n</script>\n\n<Button variant="brand">Build now</Button>`} />
    <h2>3. React</h2>
    <CodeBlock lang="tsx" code={`import { Button } from "@rblez-ui/react";\n\nexport default () => <Button variant="brand">Build now</Button>;`} />
    <h2>Tema</h2>
    <p>Pon <code>data-theme="light"</code> o <code>"dark"</code> en <code>&lt;html&gt;</code>; sin atributo sigue al sistema.</p>
  {:else if slug === "tokens"}
    <p class="eyebrow">Base</p>
    <h1>Tokens</h1>
    <p class="lead">Variables CSS. Cambian solas entre claro y oscuro.</p>
    <div class="swatches">
      {#each swatches as [v, name] (v)}
        <div class="swatch"><span style:background={`var(${v})`}></span><strong>{name}</strong><code>{v}</code></div>
      {/each}
    </div>
    <h2>Tipografía</h2>
    <Card>
      <p class="type-sample sans">Inter — Build something people want.</p>
      <p class="type-sample mono">SUSE Mono — pnpm build --filter rblez-ui</p>
    </Card>
  {:else if slug === "licencia"}
    <p class="eyebrow">Legal</p>
    <h1>Licencia</h1>
    <p class="lead">Software propietario. © 2026 rblez. Todos los derechos reservados.</p>
    <p>El código es visible pero no es de uso libre: no se permite copiar, modificar, distribuir, sublicenciar ni usar estos componentes, total o parcialmente, sin permiso escrito de rblez. Escribe a <a href="mailto:hello@rblez.com">hello@rblez.com</a> para licencias.</p>
  {/if}
</article>
