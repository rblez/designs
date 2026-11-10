<script lang="ts">
  import type { Snippet } from "svelte";
  import { backdropClick, cx, openDialog, type ModalSize } from "@rblez-ui/tokens";
  import Icon from "./Icon.svelte";

  interface Props {
    open?: boolean;
    onclose?: () => void;
    title?: string;
    description?: string;
    size?: ModalSize;
    /** Cerrar al pulsar el fondo. */ closeOnBackdrop?: boolean;
    /** Cerrar con Esc. */ closeOnEsc?: boolean;
    /** Botón × en la cabecera. */ showClose?: boolean;
    closeLabel?: string;
    class?: string;
    children?: Snippet;
    footer?: Snippet;
  }
  let { open = $bindable(false), onclose, title, description, size = "md", closeOnBackdrop = true, closeOnEsc = true, showClose = true, closeLabel = "Cerrar", class: className = "", children, footer }: Props = $props();

  const uid = $props.id();
  const titleId = `d-modal-${uid}-title`;
  const descId = `d-modal-${uid}-desc`;
  let dialog: HTMLDialogElement | undefined = $state();
  let backdrop: ReturnType<typeof backdropClick> | undefined;

  function requestClose() { if (!open) return; open = false; onclose?.(); }

  $effect(() => {
    if (!open || !dialog) return;
    backdrop = backdropClick(dialog);
    const close = openDialog(dialog);
    return close;
  });

  function onkeydown(e: KeyboardEvent) {
    if (e.key !== "Escape") return;
    e.preventDefault(); // el <dialog> no se cierra solo: el estado manda
    if (closeOnEsc) requestClose();
  }
  function oncancel(e: Event) { e.preventDefault(); if (closeOnEsc) requestClose(); }
  function onclosenative() { if (open) requestClose(); }
  function onclick(e: MouseEvent) { if (backdrop?.click(e) && closeOnBackdrop) requestClose(); }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_click_events_have_key_events -->
<dialog bind:this={dialog} class={cx("d-modal", size !== "md" && `d-modal--${size}`, className)} aria-modal="true"
  aria-labelledby={title ? titleId : undefined} aria-describedby={description ? descId : undefined}
  {onkeydown} {oncancel} onclose={onclosenative} onpointerdown={(e) => backdrop?.pointerdown(e)} {onclick}>
  {#if open}
    <div class="d-modal__panel">
      {#if title || description || showClose}
        <header class="d-overlay__head">
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
  {/if}
</dialog>
