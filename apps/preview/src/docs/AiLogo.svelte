<script lang="ts" module>
  export type AiId = "chatgpt" | "claude" | "v0" | "lovable" | "bolt" | "replit";
</script>
<script lang="ts">
  // Favicons oficiales de cada servicio (marcas de sus respectivos dueños).
  import chatgpt from "../assets/ai/chatgpt.png";
  import claude from "../assets/ai/claude.svg";
  import v0 from "../assets/ai/v0.svg";
  import lovable from "../assets/ai/lovable.svg";
  import bolt from "../assets/ai/bolt.svg";
  import replit from "../assets/ai/replit.png";
  let { id, size = 20 }: { id: AiId; size?: number } = $props();
  const src: Record<AiId, string> = { chatgpt, claude, v0, lovable, bolt, replit };
</script>

<img class="ai-logo" src={src[id]} alt="" width={size} height={size} decoding="async" />
