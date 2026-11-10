<script lang="ts" module>
  export type AiId = "v0" | "chatgpt" | "claude" | "replit";
</script>
<script lang="ts">
  // Favicons oficiales de cada servicio (marcas de sus respectivos dueños).
  import chatgpt from "../assets/ai/chatgpt.png";
  import claude from "../assets/ai/claude.svg";
  import v0 from "../assets/ai/v0.svg";
  import replit from "../assets/ai/replit.png";
  let { id, size = 20 }: { id: AiId; size?: number } = $props();
  const src: Record<AiId, string> = { v0, chatgpt, claude, replit };
</script>

<img class="ai-logo" src={src[id]} alt="" width={size} height={size} decoding="async" />
