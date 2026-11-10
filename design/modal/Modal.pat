<script lang="ts">
	// rblez-ui · Modal en Patch: la demo de @rblez-ui/svelte («Renombrar proyecto»),
	// para exportar a Figma (`patch snapshot figma`) y tests de estado (`patch test`).
	import { palettes, widths, type Size } from './data.ts';

	type Theme = 'dark' | 'light';
	let theme: Theme = $state('dark');
	let open = $state(true);
	let size: Size = $state('sm');
	let name = $state('rblez-ui');
	let showClose = $state(true);
	let showFooter = $state(true);
	/** Viewport (390 × 800 móvil, 1280 × 800 escritorio). */
	let viewport = $state(390);
	const vh = 800;

	let c = $derived(palettes[theme]);
	let w = $derived(Math.min(viewport - 32, widths[size]));

	const btn = $style({ height: 36, padding: [0, 14], borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' });
</script>

<main style={{ width: viewport, height: vh, background: c.bg, color: c.ink, fontFamily: 'Inter', alignItems: 'center', justifyContent: 'center' }}>
	<button style={[btn, { background: c.surface, borderColor: c.line2 }]} onclick={() => (open = true)}>
		<p style={{ fontSize: 13, fontWeight: 600 }}>Renombrar proyecto</p>
	</button>

	{#if open}
		<!-- Fondo (::backdrop) -->
		<div style={{ position: 'absolute', left: 0, top: 0, width: viewport, height: vh, background: c.scrim, alignItems: 'center', justifyContent: 'center' }} onclick={() => (open = false)}>
			<!-- Panel -->
			<div onclick={(e) => e.stopPropagation()} style={{ width: w, background: c.surface, borderRadius: 16, borderWidth: 1, borderColor: c.line, overflow: 'hidden', boxShadow: [{ y: 1, blur: 2, color: '#0000000d' }, { y: 24, blur: 60, spread: -24, color: '#00000059' }] }}>
				<div style={{ width: 'fill', flexDirection: 'row', alignItems: 'start', gap: 12, padding: [20, 20, 0, 20] }}>
					<div style={{ width: 'fill', gap: 4 }}>
						<p style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.15 }}>Renombrar proyecto</p>
						<p style={{ width: 'fill', fontSize: 13, fontWeight: 600, lineHeight: 19.5, color: c.muted }}>El nombre aparece en la URL y en el panel.</p>
					</div>
					{#if showClose}
						<button style={{ width: 32, height: 32, marginTop: -4, marginRight: -6, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }} onclick={() => (open = false)}>
							<p style={{ fontSize: 16, color: c.muted }}>✕</p>
						</button>
					{/if}
				</div>
				<div style={{ width: 'fill', padding: [14, 20, 20, 20], gap: 6 }}>
					<p style={{ fontSize: 12, fontWeight: 600 }}>Nombre</p>
					<div style={{ width: 'fill', height: 36, padding: [0, 12], justifyContent: 'center', background: c.surface, borderRadius: 8, borderWidth: 1, borderColor: c.brand, boxShadow: { spread: 3, color: c.ring } }}>
						<input style={{ width: 'fill', fontSize: 13, color: c.ink, caretColor: c.brand }} value={name} />
					</div>
				</div>
				{#if showFooter}
					<div style={{ width: 'fill', height: 1, background: c.line }}></div>
					<div style={{ width: 'fill', flexDirection: 'row', justifyContent: 'end', gap: 8, padding: [12, 20], background: c.surface2 }}>
						<button style={[btn, { borderColor: '#0000' }]} onclick={() => (open = false)}><p style={{ fontSize: 13, fontWeight: 600 }}>Cancelar</p></button>
						<button style={[btn, { background: c.brand, borderColor: c.brand, color: c.brandInk }]} onclick={() => (open = false)}><p style={{ fontSize: 13, fontWeight: 600 }}>Guardar</p></button>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</main>
