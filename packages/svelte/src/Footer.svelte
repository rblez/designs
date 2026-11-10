<script lang="ts">
  import type { Snippet } from "svelte";
  import type { FooterColumn, FooterLink } from "@rblez-ui/tokens";
  let { columns, legal = [], logo, logoHref = "/", label = "Footer" }: {
    columns: FooterColumn[]; legal?: FooterLink[]; logo?: Snippet; logoHref?: string; label?: string;
  } = $props();
  const ext = (l: FooterLink) => (l.external ?? /^https?:/.test(l.href)) ? { target: "_blank", rel: "noreferrer" } : {};
</script>

<footer class="d-footer" aria-label={label}>
  <div class="d-footer__inner">
    {#if logo}<a class="d-footer__logo" href={logoHref} aria-label="Home">{@render logo()}</a>{/if}
    <div class="d-footer__cols" style:--d-footer-cols={columns.length + (legal.length ? 1 : 0)}>
      {#each columns as col (col.title)}
        <nav class="d-footer__col" aria-label={col.title}>
          <h3 class="d-footer__title">{col.title}</h3>
          <ul>{#each col.links as l (l.href + l.label)}<li><a class="d-footer__link" href={l.href} {...ext(l)}>{l.label}</a></li>{/each}</ul>
        </nav>
      {/each}
      {#if legal.length}
        <nav class="d-footer__col d-footer__col--legal" aria-label="Legal">
          <h3 class="d-footer__title">Legal</h3>
          <ul>{#each legal as l (l.href + l.label)}<li><a class="d-footer__link" href={l.href} {...ext(l)}>{l.label}</a></li>{/each}</ul>
        </nav>
      {/if}
    </div>
  </div>
  {#if legal.length}
    <div class="d-footer__bar">{#each legal as l (l.href + l.label)}<a class="d-footer__link" href={l.href} {...ext(l)}>{l.label}</a>{/each}</div>
  {/if}
</footer>
