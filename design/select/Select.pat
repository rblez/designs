<script lang="ts">
	// rblez-ui · Select en Patch: el campo «Región» de la demo de @rblez-ui/svelte,
	// para exportar a Figma (`patch snapshot figma`) y tests de estado (`patch test`).
	import { match, palettes, regions, type Option } from './data.ts';

	type Theme = 'dark' | 'light';
	type Size = 'sm' | 'md' | 'lg';
	let theme: Theme = $state('dark');
	let open = $state(false);
	let value: string | null = $state('mad');
	/** Opción resaltada (aria-activedescendant), índice en la lista filtrada. */
	let active = $state(0);
	let searchable = $state(true);
	let query = $state('');
	let size = $state<Size>('md');
	let error: string | null = $state(null);
	let disabled = $state(false);
	let trigger = $state<HTMLButtonElement>();

	let c = $derived(palettes[theme]);
	let filtered: Option[] = $derived(searchable && query ? regions.filter((o) => match(o, query)) : regions);
	let selected = $derived(regions.find((o) => o.value === value));
	let h = $derived(size === 'sm' ? 30 : size === 'lg' ? 42 : 36);
	let focused = $derived(open);
	const choose = (o: Option) => { if (o.disabled) return; value = o.value; open = false; query = ''; };
</script>

<main style={{ width: 390, height: 640, background: c.bg, color: c.ink, fontFamily: 'Inter', padding: [48, 16] }}>
	<div style={{ width: 'fill', gap: 6, opacity: disabled ? 0.55 : 1 }}>
		<p style={{ fontSize: 12, fontWeight: 600 }}>Región</p>
		<div style={{ width: 'fill' }}>
			<button
				bind:this={trigger}
				disabled={disabled}
				style={{
					width: 'fill', height: h, flexDirection: 'row', alignItems: 'center', gap: 8, padding: [0, 10, 0, size === 'lg' ? 14 : 12],
					background: c.surface, borderRadius: 8, borderWidth: 1, borderColor: error ? c.red : focused ? c.brand : c.line2,
					boxShadow: focused ? { spread: 3, color: error ? c.redRing : c.ring } : { y: 1, blur: 2, color: '#0000000d' }
				}}
				onclick={() => (open = !open)}
			>
				{#if selected?.glyph}<p style={{ fontSize: 14, color: c.muted }}>{selected.glyph}</p>{/if}
				<p style={{ width: 'fill', fontSize: size === 'lg' ? 14 : 13, fontWeight: 600, color: selected ? c.ink : c.muted, textOverflow: 'ellipsis' }}>{selected?.label ?? 'Selecciona…'}</p>
				<p style={{ fontSize: 13, color: c.muted }}>↕</p>
			</button>

			{#if open}
				<div portal="overlay" style={{ position: 'absolute', anchor: trigger, anchorPosition: 'bottom-start', anchorOffset: 6, anchorPadding: 8, width: 'anchor', maxHeight: 'available', background: c.surface, borderRadius: 12, borderWidth: 1, borderColor: c.line2, overflow: 'hidden', boxShadow: [{ y: 1, blur: 2, color: '#0000000d' }, { y: 6, blur: 20, spread: -6, color: '#0000001f' }] }}>
					{#if searchable}
						<div style={{ width: 'fill', flexDirection: 'row', alignItems: 'center', gap: 8, padding: [8, 12] }}>
							<p style={{ fontSize: 14, color: c.muted }}>⌕</p>
							<input style={{ width: 'fill', fontSize: 13, fontWeight: 600, color: c.ink, caretColor: c.brand }} value={query} placeholder="Buscar…" />
						</div>
						<div style={{ width: 'fill', height: 1, background: c.line }}></div>
					{/if}
					<div style={{ width: 'fill', padding: 4, maxHeight: 280, overflowY: 'auto' }}>
						{#each filtered as o, i (o.value)}
							<button
								style={{ width: 'fill', minHeight: 34, flexDirection: 'row', alignItems: 'center', gap: 8, padding: [6, 8], borderRadius: 6, background: i === active ? c.hover : '#0000', opacity: o.disabled ? 0.45 : 1, color: o.value === value || i === active ? c.ink : c.ink2 }}
								onclick={() => choose(o)}
							>
								{#if o.glyph}<p style={{ fontSize: 14 }}>{o.glyph}</p>{/if}
								<p style={{ width: 'fill', fontSize: 13, fontWeight: 600 }}>{o.label}</p>
								{#if o.value === value}<p style={{ fontSize: 13, fontWeight: 700, color: c.brand }}>✓</p>{/if}
							</button>
						{/each}
						{#if filtered.length === 0}
							<div style={{ width: 'fill', padding: 12, alignItems: 'center' }}>
								<p style={{ fontSize: 13, fontWeight: 600, color: c.muted }}>Sin resultados</p>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
		{#if error}
			<p style={{ fontSize: 12, color: c.red }}>{error}</p>
		{:else}
			<p style={{ fontSize: 12, color: c.muted }}>Donde se despliega tu proyecto.</p>
		{/if}
	</div>
</main>
<portal id="overlay" />
