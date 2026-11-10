<script lang="ts" module>
  export type AiId = "chatgpt" | "claude" | "v0" | "lovable" | "bolt" | "replit" | "hark";
</script>
<script lang="ts">
  // Favicons oficiales de cada servicio (marcas de sus respectivos dueños).
  import chatgpt from "../assets/ai/chatgpt.png";
  import claude from "../assets/ai/claude.svg";
  import v0 from "../assets/ai/v0.svg";
  import lovable from "../assets/ai/lovable.svg";
  import bolt from "../assets/ai/bolt.svg";
  import replit from "../assets/ai/replit.png";
  import harkDark from "../assets/ai/hark-dark.png";
  import harkLight from "../assets/ai/hark-light.png";
  let { id, size = 20 }: { id: AiId; size?: number } = $props();
  const src: Record<Exclude<AiId, "hark">, string> = { chatgpt, claude, v0, lovable, bolt, replit };
</script>

{#if id === "hark"}
  <img class="ai-logo ai-logo--hark-dark" src={harkDark} alt="" width={size} height={size} />
  <img class="ai-logo ai-logo--hark-light" src={harkLight} alt="" width={size} height={size} />
{:else}
  <img class="ai-logo" src={src[id]} alt="" width={size} height={size} decoding="async" />
{/if}
