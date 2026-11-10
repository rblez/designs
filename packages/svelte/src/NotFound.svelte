<script lang="ts">
  import { notFoundArt } from "@rblez-ui/tokens";
  let {
    title = "The page you’re looking for has wandered off, but don’t worry!",
    description = "Let’s get you back on track.",
    actionLabel = "Take me home",
    href = "/",
    grid = true,
    onaction,
    class: className = "",
  }: {
    title?: string; description?: string; actionLabel?: string; href?: string; grid?: boolean;
    onaction?: (e: MouseEvent) => void; class?: string;
  } = $props();
</script>

<section class={["d-404", grid && "d-404--grid", className].filter(Boolean).join(" ")} aria-labelledby="d-404-title">
  <div class="d-404__in">
  <div class="d-404__art">{@html notFoundArt}</div>
  <div class="d-404__copy">
    <h1 id="d-404-title" class="d-404__title">{title}</h1>
    <p class="d-404__text">{description}</p>
    <a class="d-404__action" {href} onclick={onaction}>{actionLabel}</a>
  </div>
  </div>
</section>
