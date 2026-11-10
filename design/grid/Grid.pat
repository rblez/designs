<script lang="ts">
	// rblez-ui · Grid en Patch: la demo de @rblez-ui/svelte, para exportar a
	// Figma (`patch snapshot figma`) y tests de estado (`patch test`).
	import { layout, palettes, type Variant } from './data.ts';

	type Theme = 'dark' | 'light';
	let theme: Theme = $state('dark');
	let variant: Variant = $state('bento');
	/** Ancho del viewport (360 · 390 · 768 · 1280). */
	let viewport = $state(390);

	const variants: Variant[] = ['bento', 'auto-fit', 'columns', 'masonry', 'split'];
	let c = $derived(palettes[theme]);
	let inner = $derived(Math.min(1200, viewport - 32));
	let rects = $derived(layout(variant, inner));
	let height = $derived(Math.max(0, ...rects.map((r) => r.y + r.h)));

	const chip = $style({ height: 30, padding: [0, 10], borderRadius: 6, borderWidth: 1, alignItems: 'center', justifyContent: 'center' });
</script>

<main style={{ width: viewport, height: 'fill', background: c.bg, color: c.ink, fontFamily: 'Inter', alignItems: 'center', padding: [32, 16], gap: 16, overflowY: 'auto' }}>
	<div style={{ width: inner, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
		{#each variants as v (v)}
			<button
				style={[chip, v === variant ? { background: c.ink, borderColor: c.ink, color: c.bg } : { background: c.surface, borderColor: c.line2, color: c.ink }]}
				onclick={() => (variant = v)}
			>
				<p style={{ fontSize: 13, fontWeight: 600 }}>{v}</p>
			</button>
		{/each}
	</div>

	<div style={{ width: inner, height }}>
		{#each rects as r (r.id)}
			<div
				style={{
					position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, padding: 12, borderRadius: 12, borderWidth: 1,
					borderColor: r.brand ? c.brand : c.line2, background: r.brand ? c.brandBg : c.surface, alignItems: 'center', justifyContent: 'center'
				}}
			>
				<p style={{ fontFamily: 'SUSE Mono', fontSize: 12, fontWeight: 500, color: r.brand ? c.brand : c.muted, textAlign: 'center' }}>{r.label}</p>
			</div>
		{/each}
	</div>
</main>
