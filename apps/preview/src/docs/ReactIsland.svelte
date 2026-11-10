<script lang="ts">
  import { onMount } from "svelte";
  import { createElement, type ComponentType } from "react";
  import { createRoot } from "react-dom/client";
  let { component }: { component: ComponentType } = $props();
  let el: HTMLDivElement;
  onMount(() => {
    const root = createRoot(el);
    root.render(createElement(component));
    return () => root.unmount();
  });
</script>

<div bind:this={el} class="island"></div>
