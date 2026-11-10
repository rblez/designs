<script lang="ts">
  import svelteLogo from "../logos/svelte.svg";
  import reactLight from "../logos/react_light.svg";
  import reactDark from "../logos/react_dark.svg";
  let { value = $bindable() }: { value: "svelte" | "react" } = $props();
</script>

<div class="fw" role="tablist" aria-label="Framework">
  <button role="tab" aria-selected={value === "svelte"} onclick={() => (value = "svelte")}>
    <img src={svelteLogo} alt="" width="14" height="14" />Svelte
  </button>
  <button role="tab" aria-selected={value === "react"} onclick={() => (value = "react")}>
    <img class="only-light" src={reactLight} alt="" width="15" height="14" /><img class="only-dark" src={reactDark} alt="" width="15" height="14" />React
  </button>
</div>
