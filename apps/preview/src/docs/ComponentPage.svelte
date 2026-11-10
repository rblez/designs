<script lang="ts">
  import type { ComponentDoc } from "./registry";
  import ReactIsland from "./ReactIsland.svelte";
  import CodeBlock from "./CodeBlock.svelte";
  import FrameworkSwitch from "./FrameworkSwitch.svelte";
  import Code from "./Code.svelte";
  import { Badge } from "@designs/svelte";

  let { doc, framework = $bindable() }: { doc: ComponentDoc; framework: "svelte" | "react" } = $props();
  let copied = $state(false);
  const Demo = $derived(doc.svelte);
  const src = $derived((framework === "svelte" ? doc.svelteSrc : doc.reactSrc).trim());
  const file = $derived(`${doc.name}Demo.${framework === "svelte" ? "svelte" : "tsx"}`);
  const importLine = $derived(`import { ${doc.name} } from "@designs/${framework}";`);
  async function copy() { await navigator.clipboard?.writeText(src); copied = true; setTimeout(() => (copied = false), 1400); }
</script>

<article class="page">
  <p class="eyebrow">Componentes / {doc.group}</p>
  <h1>{doc.name} {#if doc.badge}<Badge variant="brand">{doc.badge}</Badge>{/if}</h1>
  <p class="lead">{doc.description}</p>

  <section class="example">
    <div class="canvas" class:canvas--gradient={doc.surface === "gradient"}>
      {#key framework + doc.slug}
        {#if framework === "svelte"}<Demo />{:else}<ReactIsland component={doc.react} />{/if}
      {/key}
    </div>
    <div class="divider">
      <FrameworkSwitch bind:value={framework} />
      <span class="divider__file">{file}</span>
      <button type="button" class="code__copy" onclick={copy}>{copied ? "Copiado" : "Copiar"}</button>
    </div>
    <Code code={src} lang={framework === "svelte" ? "svelte" : "tsx"} class="example__code" />
  </section>

  <h2>Uso</h2>
  <CodeBlock lang="ts" code={importLine} />

  <h2>Props</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Prop</th><th>Tipo</th><th>Default</th><th>Descripción</th></tr></thead>
      <tbody>
        {#each doc.props as [name, type, def, desc] (name)}
          <tr><td><code>{name}</code></td><td><code class="t">{type}</code></td><td><code>{def}</code></td><td>{desc}</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</article>
