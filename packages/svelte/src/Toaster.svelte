<script lang="ts">
  import { toaster, type ToastItem, type ToastPosition } from "@rblez-ui/tokens";
  import { checkCircle, exclamationCircle, exclamationTriangle, informationCircle } from "@rblez-ui/tokens/heroicons";
  import Icon from "./Icon.svelte";

  interface Props {
    position?: ToastPosition;
    /** Máximo de toasts visibles a la vez (los más recientes). */
    max?: number;
    /** Etiqueta de la región para lectores de pantalla. */
    label?: string;
    closeLabel?: string;
    /** Muestra el icono de estado. */
    icons?: boolean;
  }
  let { position = "bottom-right", max = 3, label = "Notificaciones", closeLabel = "Cerrar", icons = true }: Props = $props();

  let items = $state<ToastItem[]>([]);
  $effect(() => toaster.subscribe((next) => (items = next)));
  const visible = $derived(items.slice(-Math.max(1, max)).reverse());
  const iconOf = { default: informationCircle, success: checkCircle, warning: exclamationTriangle, danger: exclamationCircle };
</script>

<section class="d-toaster-region" aria-label={label}>
  <ol class="d-toaster" data-position={position} aria-live="polite" aria-relevant="additions text"
    onpointerenter={toaster.pause} onpointerleave={toaster.resume} onfocusin={toaster.pause} onfocusout={toaster.resume}>
    {#each visible as t (t.id)}
      <li class="d-toast d-toast--{t.variant}" data-leaving={t.leaving || undefined} aria-atomic="true">
        {#if icons}<Icon icon={iconOf[t.variant]} size={18} class="d-icon d-toast__icon" />{/if}
        <div class="d-toast__text">
          {#if t.title}<p class="d-toast__title">{t.title}</p>{/if}
          {#if t.description}<p class="d-toast__desc">{t.description}</p>{/if}
        </div>
        {#if t.action}
          <button type="button" class="d-toast__action" onclick={() => { t.action?.onClick(); toaster.dismiss(t.id); }}>{t.action.label}</button>
        {/if}
        {#if t.dismissible}
          <button type="button" class="d-toast__close" aria-label={closeLabel} onclick={() => toaster.dismiss(t.id)}><Icon name="close" size={14} /></button>
        {/if}
      </li>
    {/each}
  </ol>
</section>
