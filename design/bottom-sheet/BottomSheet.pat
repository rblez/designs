<script lang="ts">
	// rblez-ui · BottomSheet en Patch: la demo de @rblez-ui/svelte («Ajustes rápidos»),
	// para exportar a Figma (`patch snapshot figma`) y tests de estado (`patch test`).
	import { palette, settings, snapPoints, type Setting, type Accent } from './data.ts';

	type Theme = 'dark' | 'light';
	let theme: Theme = $state('dark');
	/** Acento (preset de tokens.css). */
	let accent: Accent = $state('orange');
	let open = $state(true);
	/** Índice del punto de anclaje (0 = 45%, 1 = 90%). */
	let snap = $state(0);
	/** Desplazamiento del arrastre en px (0 = en reposo). */
	let drag = $state(0);
	let items: Setting[] = $state(settings);
	let viewport = $state(390);
	const vh = 800;

	let c = $derived(palette(theme, accent));
	let sheetW = $derived(Math.min(640, viewport));
	let height = $derived(Math.min(snapPoints[snapPoints.length - 1] * vh, vh - 24));
	let visible = $derived(Math.min(snapPoints[Math.max(0, Math.min(snap, snapPoints.length - 1))] * vh, height) - drag);
	const toggle = (id: string) => (items = items.map((s) => (s.id === id ? { ...s, on: !s.on } : s)));
</script>

<main style={{ width: viewport, height: vh, background: c.bg, color: c.ink, fontFamily: 'Inter', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
	<button style={{ height: 36, padding: [0, 14], borderRadius: 8, borderWidth: 1, borderColor: c.line2, background: c.surface, alignItems: 'center', justifyContent: 'center' }} onclick={() => (open = true)}>
		<p style={{ fontSize: 13, fontWeight: 600 }}>Abrir ajustes</p>
	</button>

	{#if open}
		<div style={{ position: 'absolute', left: 0, top: 0, width: viewport, height: vh, background: c.scrim }} onclick={() => (open = false)}></div>
		<!-- Hoja: alto = mayor anclaje; se desplaza hacia abajo para mostrar `visible` px -->
		<div style={{ position: 'absolute', left: (viewport - sheetW) / 2, top: vh - visible, width: sheetW, height, background: c.surface, borderWidth: 1, borderColor: c.line, borderRadius: [20, 20, 0, 0], boxShadow: { y: -12, blur: 40, spread: -16, color: '#0000004d' } }}>
			<!-- Asa -->
			<button style={{ width: 'fill', alignItems: 'center', padding: [8, 0, 4, 0], cursor: 'grab' }} onclick={() => (snap = snap === snapPoints.length - 1 ? 0 : snap + 1)}>
				<div style={{ width: 48, height: 20, alignItems: 'center', justifyContent: 'center' }}>
					<div style={{ width: 36, height: 5, borderRadius: 3, background: c.line2 }}></div>
				</div>
			</button>
			<div style={{ width: 'fill', flexDirection: 'row', alignItems: 'start', gap: 12, padding: [4, 20, 0, 20] }}>
				<div style={{ width: 'fill', gap: 4 }}>
					<p style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.15 }}>Ajustes rápidos</p>
					<p style={{ width: 'fill', fontSize: 13, fontWeight: 600, color: c.muted }}>Arrastra el asa para expandir o cerrar.</p>
				</div>
				<button style={{ width: 32, height: 32, marginTop: -4, marginRight: -6, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }} onclick={() => (open = false)}>
					<p style={{ fontSize: 16, color: c.muted }}>✕</p>
				</button>
			</div>
			<div style={{ width: 'fill', height: 'fill', padding: [14, 20, 16, 20], gap: 18, overflowY: 'auto' }}>
				{#each items as s (s.id)}
					<button style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} onclick={() => toggle(s.id)}>
						<div style={{ width: 36, height: 20, borderRadius: 10, padding: 2, background: s.on ? c.brand : c.off, alignItems: s.on ? 'end' : 'start' }}>
							<div style={{ width: 16, height: 16, borderRadius: 8, background: '#ffffff', boxShadow: { y: 1, blur: 2, color: '#00000033' } }}></div>
						</div>
						<p style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</p>
					</button>
				{/each}
			</div>
			<!-- Pie fijo (+ safe-area 16px) -->
			<div style={{ width: 'fill', height: 1, background: c.line }}></div>
			<div style={{ width: 'fill', padding: [12, 20, 16, 20] }}>
				<button style={{ width: 'fill', height: 36, borderRadius: 8, background: c.brand, color: c.brandInk, alignItems: 'center', justifyContent: 'center' }} onclick={() => (open = false)}>
					<p style={{ fontSize: 13, fontWeight: 600 }}>Listo</p>
				</button>
			</div>
		</div>
	{/if}
</main>
