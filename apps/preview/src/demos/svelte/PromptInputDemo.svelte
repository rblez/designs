<script lang="ts">
  import { PromptInput } from "@designs/svelte";
  import type { PromptSubmit } from "@designs/tokens";
  let last = $state<PromptSubmit | null>(null);
</script>

<div class="demo-prompt">
  <PromptInput onsubmit={(d) => (last = d)} />
  <p class="demo-out">{last ? `→ "${last.value}"${last.plan ? " · plan" : ""}` : "Enter envía · Shift+Enter nueva línea"}</p>
</div>
