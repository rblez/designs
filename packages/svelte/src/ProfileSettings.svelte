<script lang="ts">
  import type { SettingsProfile, SettingsSection, SettingsItem, SettingsTab } from "@rblez-ui/tokens";
  import Icon from "./Icon.svelte";

  let {
    profile, sections, tabs = [], activeTab = $bindable(tabs[0]?.id), title = "Ajustes", footer,
    labels = { qr: "Código QR", search: "Buscar", more: "Más opciones", avatar: "Cambiar foto" },
    onselect, onavatar, onqr, onsearch, onmore, ontab, class: className = "",
  }: {
    profile: SettingsProfile; sections: SettingsSection[]; tabs?: SettingsTab[]; activeTab?: string;
    title?: string; footer?: string; labels?: { qr: string; search: string; more: string; avatar: string };
    onselect?: (item: SettingsItem) => void; onavatar?: () => void; onqr?: () => void;
    onsearch?: () => void; onmore?: () => void; ontab?: (tab: SettingsTab) => void; class?: string;
  } = $props();

  let root: HTMLElement; let nameEl: HTMLElement; let compact = $state(false);
  $effect(() => {
    const io = new IntersectionObserver(([e]) => (compact = !e.isIntersecting), { root, rootMargin: "-64px 0px 0px 0px" });
    io.observe(nameEl); return () => io.disconnect();
  });
  const meta = $derived([profile.phone, profile.username && `@${profile.username.replace(/^@/, "")}`].filter(Boolean).join(" • "));
  const initials = $derived(profile.initials ?? profile.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase());
  const badgeText = (b: number | string) => (typeof b === "number" && b > 99 ? "99+" : String(b));
</script>

<div class="d-ps {className}" bind:this={root} data-compact={compact}>
  <div class="d-ps__bar">
    <span class="d-ps__pill"><button type="button" aria-label={labels.qr} onclick={onqr}><Icon name="qrCode" /></button></span>
    <span class="d-ps__title" aria-hidden={!compact}>{title}</span>
    <span class="d-ps__pill">
      <button type="button" aria-label={labels.search} onclick={onsearch}><Icon name="search" /></button>
      <button type="button" aria-label={labels.more} onclick={onmore}><Icon name="ellipsisVertical" /></button>
    </span>
  </div>

  <header class="d-ps__head">
    <button type="button" class="d-ps__avatar" aria-label={labels.avatar} onclick={onavatar}>
      {#if profile.avatar}<img src={profile.avatar} alt="" />{:else}{initials}{/if}
      <span class="d-ps__cam"><Icon name="camera" /></span>
    </button>
    <h2 class="d-ps__name" bind:this={nameEl}>{profile.name}</h2>
    {#if meta}<p class="d-ps__meta">{meta}</p>{/if}
  </header>

  <div class="d-ps__body">
    {#each sections as s, i (s.title ?? i)}
      <section class="d-ps__group" aria-label={s.title}>
        {#if s.title}<div class="d-ps__group-title">{s.title}</div>{/if}
        {#each s.items as it (it.id)}
          <svelte:element this={it.href ? "a" : "button"} class="d-ps__row" href={it.href} type={it.href ? undefined : "button"} role={it.href ? undefined : "button"} tabindex="0"
            onclick={() => onselect?.(it)}>
            {#if it.image}<span class="d-ps__tile"><img src={it.image} alt="" /></span>
            {:else if it.icon}<span class="d-ps__tile" data-color={it.color ?? "gray"}><Icon name={it.icon} /></span>{/if}
            <span class="d-ps__text">
              <span class="d-ps__label">{it.label}</span>
              {#if it.description}<span class="d-ps__desc">{it.description}</span>{/if}
            </span>
            {#if it.value}<span class="d-ps__value">{it.value}</span>{/if}
            {#if it.badge != null}<span class="d-ps__badge">{badgeText(it.badge)}</span>{/if}
            {#if it.chevron}<span class="d-ps__chev"><Icon name="chevronRight" /></span>{/if}
          </svelte:element>
        {/each}
      </section>
    {/each}
    {#if footer}<p class="d-ps__foot">{footer}</p>{/if}
  </div>

  {#if tabs.length}
    <nav class="d-ps__tabs" aria-label="Tabs">
      {#each tabs as t (t.id)}
        <button type="button" class="d-ps__tab" aria-current={activeTab === t.id ? "page" : undefined} onclick={() => { activeTab = t.id; ontab?.(t); }}>
          {#if t.image}<img src={t.image} alt="" />{:else if t.icon}<Icon name={t.icon} />{/if}
          {t.label}
          {#if t.badge}<span class="d-ps__tab-badge">{badgeText(t.badge)}</span>{/if}
        </button>
      {/each}
    </nav>
  {/if}
</div>
