<script lang="ts">
  import { tick } from "svelte";
  import { cx, matchOption, nextEnabled, typeahead, type SelectOption, type Size } from "@rblez-ui/tokens";
  import { chevronUpDown, magnifyingGlass } from "@rblez-ui/tokens/heroicons";
  import Icon from "./Icon.svelte";

  interface Props {
    value?: string;
    options: SelectOption[];
    label?: string;
    hint?: string;
    error?: string;
    placeholder?: string;
    size?: Size;
    disabled?: boolean;
    required?: boolean;
    /** Añade un campo de búsqueda que filtra las opciones. */
    searchable?: boolean;
    searchPlaceholder?: string;
    emptyText?: string;
    /** Nombre del input oculto para formularios nativos. */
    name?: string;
    id?: string;
    class?: string;
    onchange?: (value: string) => void;
  }
  let { value = $bindable(), options, label, hint, error, placeholder = "Selecciona…", size = "md", disabled = false, required = false, searchable = false,
    searchPlaceholder = "Buscar…", emptyText = "Sin resultados", name, id, class: className = "", onchange }: Props = $props();

  const uid = $props.id();
  const triggerId = $derived(id ?? `d-select-${uid}`);
  const listId = $derived(`${triggerId}-list`);
  const labelId = $derived(`${triggerId}-label`);
  const msgId = $derived(`${triggerId}-msg`);
  const optId = (i: number) => `${listId}-${i}`;

  let isOpen = $state(false);
  let active = $state(-1);
  let query = $state("");
  let side = $state<"top" | "bottom">("bottom");
  let root: HTMLDivElement | undefined = $state();
  let trigger: HTMLButtonElement | undefined = $state();
  let search: HTMLInputElement | undefined = $state();
  let list: HTMLUListElement | undefined = $state();

  const filtered = $derived(searchable && query ? options.filter((o) => matchOption(o, query)) : options);
  const selected = $derived(options.find((o) => o.value === value));
  const ta = typeahead();

  async function show(at?: "first" | "last") {
    if (disabled || isOpen) return;
    const r = root?.getBoundingClientRect();
    if (r) { const below = innerHeight - r.bottom; side = below < 300 && r.top > below ? "top" : "bottom"; }
    isOpen = true; query = "";
    const sel = options.findIndex((o) => o.value === value);
    active = at === "first" ? nextEnabled(options, -1, 1) : at === "last" ? nextEnabled(options, options.length, -1) : sel >= 0 ? sel : nextEnabled(options, -1, 1);
    if (searchable) { await tick(); search?.focus(); }
  }
  function hide(refocus = true) { if (!isOpen) return; isOpen = false; query = ""; if (refocus) trigger?.focus(); }
  function choose(i: number, refocus = true) {
    const o = filtered[i]; if (!o || o.disabled) return;
    if (o.value !== value) { value = o.value; onchange?.(o.value); }
    hide(refocus);
  }
  function move(e: KeyboardEvent, to: number) { e.preventDefault(); active = to; }

  function onkey(e: KeyboardEvent) {
    const k = e.key;
    if (!isOpen) {
      if (k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || k === " ") { e.preventDefault(); show(); }
      else if (k === "Home") { e.preventDefault(); show("first"); }
      else if (k === "End") { e.preventDefault(); show("last"); }
      else if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !searchable) {
        show().then(() => { const i = ta(options, k, active); if (i >= 0) active = i; });
      }
      return;
    }
    const inSearch = e.target === search;
    if (k === "ArrowDown") move(e, nextEnabled(filtered, active, 1));
    else if (k === "ArrowUp" && e.altKey) { e.preventDefault(); choose(active); }
    else if (k === "ArrowUp") move(e, nextEnabled(filtered, active, -1));
    else if (k === "Home" && !inSearch) move(e, nextEnabled(filtered, -1, 1));
    else if (k === "End" && !inSearch) move(e, nextEnabled(filtered, filtered.length, -1));
    else if (k === "PageDown") move(e, nextEnabled(filtered, Math.min(filtered.length - 1, active + 9), 1));
    else if (k === "PageUp") move(e, nextEnabled(filtered, Math.max(0, active - 9), -1));
    else if (k === "Enter") { e.preventDefault(); choose(active); }
    else if (k === " " && !inSearch && !ta.busy()) { e.preventDefault(); choose(active); }
    else if (k === "Escape") { e.preventDefault(); e.stopPropagation(); hide(); }
    else if (k === "Tab") { if (active >= 0) choose(active, false); else hide(false); }
    else if (k.length === 1 && !inSearch && !e.ctrlKey && !e.metaKey && !e.altKey) { const i = ta(filtered, k, active); if (i >= 0) active = i; }
  }

  $effect(() => { if (isOpen && active >= 0) list?.querySelector(`#${CSS.escape(optId(active))}`)?.scrollIntoView({ block: "nearest" }); });
  $effect(() => {
    if (!isOpen) return;
    const out = (e: PointerEvent) => { if (root && !root.contains(e.target as Node)) hide(false); };
    document.addEventListener("pointerdown", out, true);
    return () => document.removeEventListener("pointerdown", out, true);
  });
</script>

<div class={cx("d-field", className)}>
  {#if label}<label class="d-label" id={labelId} for={triggerId}>{label}</label>{/if}
  <div class="d-select" bind:this={root}>
    <div class={cx("d-control", size !== "md" && `d-control--${size}`)} data-invalid={!!error} data-disabled={!!disabled}>
      <button bind:this={trigger} type="button" role="combobox" id={triggerId} class="d-select__trigger" {disabled}
        aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={listId} aria-labelledby={label ? labelId : undefined}
        aria-activedescendant={isOpen && !searchable && active >= 0 ? optId(active) : undefined}
        aria-invalid={!!error || undefined} aria-required={required || undefined} aria-describedby={error || hint ? msgId : undefined}
        onclick={() => (isOpen ? hide() : show())} onkeydown={onkey}>
        {#if selected?.icon}<Icon name={selected.icon} size={16} />{/if}
        <span class="d-select__value" data-placeholder={!selected || undefined}>{selected?.label ?? placeholder}</span>
        <Icon icon={chevronUpDown} size={16} class="d-icon d-select__chev" />
      </button>
    </div>
    {#if isOpen}
      <div class="d-select__pop" data-side={side}>
        {#if searchable}
          <div class="d-select__search">
            <Icon icon={magnifyingGlass} size={16} />
            <input bind:this={search} value={query} oninput={(e) => { query = e.currentTarget.value; active = nextEnabled(filtered, -1, 1); }} type="text" role="combobox" aria-expanded="true" aria-controls={listId} aria-autocomplete="list"
              aria-activedescendant={active >= 0 ? optId(active) : undefined} aria-label={searchPlaceholder} placeholder={searchPlaceholder} autocomplete="off" spellcheck="false" onkeydown={onkey} />
          </div>
        {/if}
        <ul bind:this={list} class="d-select__list" role="listbox" id={listId} aria-labelledby={label ? labelId : undefined} tabindex="-1">
          {#each filtered as o, i (o.value)}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <li id={optId(i)} role="option" class="d-select__option" aria-selected={o.value === value} aria-disabled={o.disabled || undefined} data-active={i === active || undefined}
              onpointerdown={(e) => e.preventDefault()} onpointermove={() => { if (!o.disabled) active = i; }} onclick={() => choose(i)}>
              {#if o.icon}<Icon name={o.icon} size={16} />{/if}
              <span>{o.label}</span>
              {#if o.value === value}<Icon name="check" size={16} class="d-icon d-select__check" />{/if}
            </li>
          {/each}
        </ul>
        {#if !filtered.length}<p class="d-select__empty" role="status">{emptyText}</p>{/if}
      </div>
    {/if}
  </div>
  {#if name}<input type="hidden" {name} value={value ?? ""} />{/if}
  {#if error}<p id={msgId} class="d-hint d-hint--error">{error}</p>{:else if hint}<p id={msgId} class="d-hint">{hint}</p>{/if}
</div>
