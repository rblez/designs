<script lang="ts">
	// rblez-ui · ProfileSettings en Patch: misma pantalla que @rblez-ui/svelte, para
	// exportar a Figma (`patch snapshot figma`) y tests de estado (`patch test`).
	import { sections, tabs, tile, type Item } from './data.ts';
	import { brandOf, type Accent } from '../accents.ts';

	type Theme = 'dark' | 'light';
	let theme: Theme = $state('dark');
	/** Acento (preset de tokens.css). */
	let accent: Accent = $state('orange');
	let activeTab = $state('settings');
	let name = $state('Ray');
	let phone = $state('+1 555 010 0199');
	let username = $state('rblez');
	let compact = $state(false);
	let selected: string | null = $state(null);

	const palettes = {
		dark: { bg: '#14120b', surface: '#1c1a13', surface2: '#26231a', line: '#edecec14', line2: '#edecec24', ink: '#edecec', muted: '#edecec8c' },
		light: { bg: '#f7f7f4', surface: '#ffffff', surface2: '#f0efea', line: '#26251e14', line2: '#26251e24', ink: '#26251e', muted: '#26251e8c' }
	} as const;
	let c = $derived(palettes[theme]);
	let a = $derived(brandOf(theme, accent));
	let meta = $derived([phone, username && `@${username}`].filter(Boolean).join(' • '));

	const pill = (bg: string, line: string) => $style({ flexDirection: 'row', alignItems: 'center', height: 44, padding: [0, 6], gap: 2, borderRadius: 22, background: bg, borderWidth: 1, borderColor: line });
	const iconBtn = $style({ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' });
	const select = (it: Item) => (selected = it.id);
</script>

<main style={{ width: 390, height: 'fill', background: c.bg, color: c.ink, fontFamily: 'Inter', overflowY: 'auto' }}>
	<!-- Barra superior -->
	<div style={{ width: 'fill', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: [10, 12], background: compact ? c.bg : '#0000' }}>
		<div style={pill(c.surface, c.line)}><button style={iconBtn}><p style={{ fontSize: 15, fontWeight: 600 }}>⌗</p></button></div>
		{#if compact}<p style={{ fontSize: 17, fontWeight: 600 }}>Ajustes</p>{/if}
		<div style={pill(c.surface, c.line)}>
			<button style={iconBtn}><p style={{ fontSize: 15, fontWeight: 600 }}>⌕</p></button>
			<button style={iconBtn}><p style={{ fontSize: 15, fontWeight: 700 }}>⋮</p></button>
		</div>
	</div>

	<!-- Cabecera -->
	<div style={{ width: 'fill', alignItems: 'center', gap: 4, padding: [0, 16, 20, 16], marginTop: -26 }}>
		<div style={{ width: 96, height: 96, marginBottom: 12 }}>
			<div style={{ width: 96, height: 96, borderRadius: 48, background: '#000000', alignItems: 'center', justifyContent: 'center' }}>
				<p style={{ fontSize: 36, fontWeight: 700, color: '#ffffff' }}>{name.slice(0, 1).toUpperCase()}</p>
			</div>
			<div style={{ position: 'absolute', left: 66, top: 64, width: 34, height: 34, borderRadius: 17, background: a.brand, borderWidth: 3, borderColor: c.bg, alignItems: 'center', justifyContent: 'center' }}>
				<p style={{ fontSize: 13, fontWeight: 700, color: a.brandInk }}>◉</p>
			</div>
		</div>
		<p style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>{name}</p>
		{#if meta}<p style={{ fontSize: 14, fontWeight: 500, color: c.muted }}>{meta}</p>{/if}
	</div>

	<!-- Grupos -->
	<div style={{ width: 'fill', gap: 12, padding: [0, 12, 20, 12] }}>
		{#each sections as s, i (s.title ?? i)}
			<div style={{ width: 'fill', padding: [6, 0], borderRadius: 20, background: c.surface, borderWidth: 1, borderColor: c.line, overflow: 'hidden' }}>
				{#if s.title}<p style={{ marginLeft: 18, marginTop: 6, marginBottom: 4, fontSize: 13, fontWeight: 600, color: a.brandText }}>{s.title}</p>{/if}
				{#each s.items as it (it.id)}
					<button
						style={{ width: 'fill', minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 16, padding: [8, 16], background: selected === it.id ? c.surface2 : '#0000' }}
						onclick={() => select(it)}
					>
						<div style={{ width: 30, height: 30, borderRadius: 9, background: tile[it.color], alignItems: 'center', justifyContent: 'center' }}>
							<p style={{ fontSize: 15, fontWeight: 800, color: '#ffffff' }}>{it.glyph}</p><!-- relleno, blanco -->
						</div>
						<div style={{ width: 'fill', gap: 2 }}>
							<p style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.15 }}>{it.label}</p>
							{#if it.description}<p style={{ width: 'fill', fontSize: 13, fontWeight: 500, color: c.muted, textOverflow: 'ellipsis' }}>{it.description}</p>{/if}
						</div>
						{#if it.badge != null}
							<div style={{ minWidth: 22, height: 22, padding: [0, 7], borderRadius: 11, background: a.brand, alignItems: 'center', justifyContent: 'center' }}>
								<p style={{ fontSize: 12, fontWeight: 600, color: a.brandInk }}>{it.badge}</p>
							</div>
						{/if}
						{#if it.chevron}<p style={{ fontSize: 16, color: c.muted }}>›</p>{/if}
					</button>
				{/each}
			</div>
		{/each}
		<p style={{ width: 'fill', textAlign: 'center', fontSize: 12.5, color: c.muted }}>rblez-ui v0.1 · ProfileSettings</p>
	</div>

	<!-- Pestañas flotantes -->
	<div style={{ width: 366, flexDirection: 'row', gap: 2, padding: 5, margin: [0, 12, 12, 12], borderRadius: 32, background: c.surface, borderWidth: 1, borderColor: c.line2, boxShadow: { y: 10, blur: 30, color: '#00000040' } }}>
		{#each tabs as t (t.id)}
			<button
				style={{ width: 'fill', alignItems: 'center', gap: 3, padding: [7, 4, 6, 4], borderRadius: 26, background: activeTab === t.id ? `${a.brand}29` : '#0000', color: activeTab === t.id ? a.brandText : c.ink }}
				onclick={() => (activeTab = t.id)}
			>
				<p style={{ fontSize: 18, fontWeight: activeTab === t.id ? 800 : 400 }}>{activeTab === t.id ? t.glyphFill : t.glyph}</p>
				<p style={{ fontSize: 11.5, fontWeight: 600 }}>{t.label}</p>
				{#if t.badge}
					<div style={{ position: 'absolute', left: 48, top: 2, minWidth: 18, height: 18, padding: [0, 5], borderRadius: 9, background: a.brand, alignItems: 'center', justifyContent: 'center' }}>
						<p style={{ fontSize: 10.5, fontWeight: 600, color: a.brandInk }}>{t.badge}</p>
					</div>
				{/if}
			</button>
		{/each}
	</div>
</main>
