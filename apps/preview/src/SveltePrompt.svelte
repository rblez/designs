<script lang="ts">
  import { PromptInput } from "@designs/svelte";
  import type { PromptSubmit } from "@designs/tokens";
  let last = $state<PromptSubmit | null>(null);
</script>

<PromptInput theme="dark" onsubmit={(d) => (last = d)} />
<p class="out">{last ? `→ "${last.value}"${last.plan ? " · plan" : ""}${last.files.length ? ` · ${last.files.length} archivo(s)` : ""}` : "Enter envía · Shift+Enter nueva línea"}</p>
