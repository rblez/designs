<script lang="ts">
  import type { Snippet } from "svelte";
  import { backdropClick, cx, openDialog, prefersReducedMotion } from "@rblez-ui/tokens";
  import Icon from "./Icon.svelte";

  interface Props {
    open?: boolean;
    onclose?: () => void;
    title?: string;
    description?: string;
    /** Alturas de anclaje como fracción del viewport (0–1), p. ej. [0.4, 0.9]. Sin ellas, alto automático. */
    snapPoints?: number[];
    /** Índice del punto de anclaje activo (bind:snap). */
    snap?: number;
    onsnapchange?: (index: number) => void;
    /** Se puede cerrar arrastrando, con Esc o pulsando el fondo. */
    dismissible?: boolean;
    showClose?: boolean;
    closeLabel?: string;
    handleLabel?: string;
    class?: string;
    children?: Snippet;
    footer?: Snippet;
  }
  let { open = $bindable(false), onclose, title, description, snapPoints, snap = $bindable(0), onsnapchange, dismissible = true, showClose = true,
    closeLabel = "Cerrar", handleLabel = "Cambiar tamaño", class: className = "", children, footer }: Props = $props();

  const uid = $props.id();
  const titleId = `d-sheet-${uid}-title`;
  const descId = `d-sheet-${uid}-desc`;
  let dialog: HTMLDialogElement | undefined = $state();
  let vh = $state(800);
  let drag = $state<number | null>(null);
  let closing = $state(false);
  let backdrop: ReturnType<typeof backdropClick> | undefined;
  let pending: { t: ReturnType<typeof setTimeout>; close: () => void } | null = null;

  const snaps = $derived((snapPoints ?? []).map((s) => Math.min(1, Math.max(0.1, s))).sort((a, b) => a - b));
  const height = $derived(snaps.length ? Math.min(snaps[snaps.length - 1] * vh, vh - 24) : 0);
  const offsetOf = (i: number) => (snaps.length ? height - Math.min(snaps[Math.max(0, Math.min(i, snaps.length - 1))] * vh, height) : 0);
  const y = $derived(drag ?? offsetOf(snap));

  function setSnap(i: number) { const n = Math.max(0, Math.min(i, snaps.length - 1)); if (n !== snap) { snap = n; onsnapchange?.(n); } }
  function requestClose() { if (!open) return; open = false; onclose?.(); }

  $effect(() => {
    if (!open || !dialog) return;
    if (pending) { clearTimeout(pending.t); pending.close(); pending = null; closing = false; }
    backdrop = backdropClick(dialog);
    drag = null;
    const close = openDialog(dialog);
    return () => {
      if (prefersReducedMotion()) { close(); return; }
      closing = true;
      pending = { close, t: setTimeout(() => { pending = null; closing = false; close(); }, 260) };
    };
  });

  // Arrastre desde el asa o la cabecera
  let startY = 0, base = 0, lastY = 0, lastT = 0, v = 0, moved = false;
  function down(e: PointerEvent) {
    if (e.button !== 0 || (e.target as Element).closest(".d-overlay__close")) return;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    startY = lastY = e.clientY; lastT = e.timeStamp; base = offsetOf(snap); v = 0; moved = false; drag = base;
  }
  function move(e: PointerEvent) {
    if (drag === null) return;
    const dy = e.clientY - startY;
    if (Math.abs(dy) > 4) moved = true;
    const dt = e.timeStamp - lastT; if (dt > 0) v = (e.clientY - lastY) / dt;
    lastY = e.clientY; lastT = e.timeStamp;
    drag = Math.max(0, base + dy);
  }
  function up() {
    if (drag === null) return;
    const cur = drag; drag = null;
    if (!moved) return;
    if (!snaps.length) {
      const h = dialog?.offsetHeight ?? vh;
      if (dismissible && (cur > h * 0.3 || v > 0.6)) requestClose();
      return;
    }
    const visible = height - cur;
    if (v > 0.6) { if (snap === 0) { if (dismissible) requestClose(); } else setSnap(snap - 1); return; }
    if (v < -0.6) { setSnap(snap + 1); return; }
    if (dismissible && visible < (height - offsetOf(0)) * 0.5) { requestClose(); return; }
    let best = 0, dist = Infinity;
    snaps.forEach((_, i) => { const d = Math.abs(height - offsetOf(i) - visible); if (d < dist) { dist = d; best = i; } });
    setSnap(best);
  }
  function handleClick() { if (moved) { moved = false; return; } setSnap(snap === snaps.length - 1 ? 0 : snap + 1); }
  function handleKey(e: KeyboardEvent) {
    if (e.key === "ArrowUp") { e.preventDefault(); setSnap(snap + 1); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setSnap(snap - 1); }
  }

  function onkeydown(e: KeyboardEvent) { if (e.key !== "Escape") return; e.preventDefault(); if (dismissible) requestClose(); }
  function oncancel(e: Event) { e.preventDefault(); if (dismissible) requestClose(); }
  function onclosenative() { if (open) requestClose(); }
  function onclick(e: MouseEvent) { if (backdrop?.click(e) && dismissible) requestClose(); }
</script>

<svelte:window bind:innerHeight={vh} />

<!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_click_events_have_key_events -->
<dialog bind:this={dialog} class={cx("d-sheet", className)} aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-describedby={description ? descId : undefined}
  data-snap={snaps.length ? "" : undefined} data-dragging={drag !== null || undefined} data-state={closing ? "closing" : undefined}
  style={`--d-sheet-y: ${y}px;${snaps.length ? ` --d-sheet-h: ${height}px;` : ""}`}
  {onkeydown} {oncancel} onclose={onclosenative} onpointerdown={(e) => backdrop?.pointerdown(e)} {onclick}>
  <div class="d-sheet__panel">
    <div class="d-sheet__grip" onpointerdown={down} onpointermove={move} onpointerup={up} onpointercancel={up} role="presentation">
      {#if snaps.length > 1}
        <button type="button" class="d-sheet__handle" aria-label={handleLabel} title={handleLabel} onclick={handleClick} onkeydown={handleKey}></button>
      {:else}
        <span class="d-sheet__handle" aria-hidden="true"></span>
      {/if}
    </div>
    {#if title || description || showClose}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <header class="d-overlay__head" onpointerdown={down} onpointermove={move} onpointerup={up} onpointercancel={up}>
        <div class="d-overlay__titles">
          {#if title}<h2 id={titleId} class="d-overlay__title">{title}</h2>{/if}
          {#if description}<p id={descId} class="d-overlay__desc">{description}</p>{/if}
        </div>
        {#if showClose}<button type="button" class="d-overlay__close" aria-label={closeLabel} onclick={requestClose}><Icon name="close" size={16} /></button>{/if}
      </header>
    {/if}
    {#if children}<div class="d-overlay__body">{@render children()}</div>{/if}
    {#if footer}<footer class="d-overlay__footer">{@render footer()}</footer>{/if}
  </div>
</dialog>
