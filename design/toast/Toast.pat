<script lang="ts">
	// rblez-ui · Toast en Patch: <Toaster> con los toasts de la demo de @rblez-ui/svelte,
	// para exportar a Figma (`patch snapshot figma`) y tests de estado (`patch test`).
	import { demo, glyphs, palette, type Position, type Toast, type Accent } from './data.ts';

	type Theme = 'dark' | 'light';
	let theme: Theme = $state('dark');
	/** Acento (preset de tokens.css). */
	let accent: Accent = $state('orange');
	let toasts: Toast[] = $state(demo);
	let position: Position = $state('bottom-right');
	/** Máximo visible (los más recientes). */
	let max = $state(3);
	let viewport = $state(390);
	const vh = 800;

	let c = $derived(palette(theme, accent));
	let mobile = $derived(viewport <= 480);
	let w = $derived(mobile ? viewport - 24 : Math.min(380, viewport - 24));
	let x = $derived(mobile ? 12 : position.endsWith('left') ? 16 : position.endsWith('right') ? viewport - 16 - w : (viewport - w) / 2);
	let top = $derived(position.startsWith('top'));
	// El más nuevo pegado al borde: arriba en top-*, abajo en bottom-*
	let visible = $derived(top ? toasts.slice(-Math.max(1, max)).reverse() : toasts.slice(-Math.max(1, max)));
	const dismiss = (id: string) => (toasts = toasts.filter((t) => t.id !== id));
</script>

<main style={{ width: viewport, height: vh, background: c.bg, color: c.ink, fontFamily: 'Inter', overflow: 'hidden' }}>
	<div style={{ position: 'absolute', left: x, top: top ? 16 : vh - 16 - 400, width: w, height: 400, gap: 8, justifyContent: top ? 'start' : 'end' }}>
		{#each visible as t (t.id)}
			<div style={{ width: 'fill', flexDirection: 'row', alignItems: 'start', gap: 10, padding: [12, 12, 12, 14], background: c.surface, borderRadius: 12, borderWidth: 1, borderColor: c.border[t.variant], boxShadow: [{ y: 1, blur: 2, color: '#0000000d' }, { y: 6, blur: 20, spread: -6, color: '#0000001f' }] }}>
				<p style={{ marginTop: 1, fontSize: 16, fontWeight: 700, color: c.status[t.variant] }}>{glyphs[t.variant]}</p>
				<div style={{ width: 'fill', gap: 2, paddingTop: 1 }}>
					<p style={{ width: 'fill', fontSize: 13, fontWeight: 700 }}>{t.title}</p>
					{#if t.description}<p style={{ width: 'fill', fontSize: 12.5, fontWeight: 600, color: c.muted }}>{t.description}</p>{/if}
				</div>
				{#if t.action}
					<button style={{ alignSelf: 'center', height: 28, padding: [0, 10], borderRadius: 6, borderWidth: 1, borderColor: c.line2, background: c.surface2, alignItems: 'center', justifyContent: 'center' }} onclick={() => dismiss(t.id)}>
						<p style={{ fontSize: 12, fontWeight: 600 }}>{t.action}</p>
					</button>
				{/if}
				{#if t.dismissible !== false}
					<button style={{ width: 24, height: 24, marginTop: -2, marginRight: -2, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }} onclick={() => dismiss(t.id)}>
						<p style={{ fontSize: 13, color: c.muted }}>✕</p>
					</button>
				{/if}
			</div>
		{/each}
	</div>
</main>
