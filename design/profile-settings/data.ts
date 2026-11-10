// Datos de ProfileSettings para Patch (Figma y tests de estado).
export type Color = keyof typeof tile;
export const tile = {
  blue: '#2f97ee', sky: '#1d96e8', indigo: '#4f78e6', cyan: '#2fb6cc', green: '#38bb45',
  orange: '#f0861c', amber: '#f0a01a', red: '#e8505b', rose: '#e33f57', violet: '#a75ae4', purple: '#8a6cff', gray: '#8e8e93'
} as const;
/** glyph: icono relleno (Heroicons solid en Svelte/React), blanco sobre la baldosa de color. */
export type Item = { id: string; label: string; description?: string; color: Color; glyph: string; badge?: number; chevron?: boolean };
export type Section = { title?: string; items: Item[] };
/** glyph = icono de línea (pestaña inactiva); glyphFill = icono relleno (pestaña activa). */
export type Tab = { id: string; label: string; glyph: string; glyphFill: string; badge?: number };

export const sections: Section[] = [
  { title: 'Cuentas', items: [{ id: 'tiendly', label: 'Tiendly', color: 'green', glyph: '▰', badge: 2, chevron: true }] },
  { items: [
    { id: 'account', label: 'Cuenta', description: 'Número, nombre de usuario, biografía', color: 'blue', glyph: '●' },
    { id: 'chats', label: 'Ajustes de chats', description: 'Fondo, modo nocturno, animaciones', color: 'orange', glyph: '◼' },
    { id: 'privacy', label: 'Privacidad y seguridad', description: 'Últ. vez, dispositivos, llaves de acceso', color: 'green', glyph: '⬢' },
    { id: 'notifications', label: 'Notificaciones', description: 'Sonidos, llamadas, distintivos', color: 'red', glyph: '◀' },
    { id: 'data', label: 'Datos y almacenamiento', description: 'Ajustes de la descarga de la multimedia', color: 'indigo', glyph: '◕' },
    { id: 'folders', label: 'Carpetas de chats', description: 'Ordena los chats en carpetas', color: 'sky', glyph: '▬' },
    { id: 'devices', label: 'Dispositivos', description: 'Gestiona los dispositivos conectados', color: 'cyan', glyph: '■' },
    { id: 'power', label: 'Ahorro de energía', description: 'Reduce el consumo con carga baja', color: 'orange', glyph: '▮' },
    { id: 'language', label: 'Idioma', description: 'Español', color: 'violet', glyph: '⬤' }
  ] },
  { items: [
    { id: 'premium', label: 'Premium', color: 'purple', glyph: '★' },
    { id: 'stars', label: 'Estrellas', color: 'amber', glyph: '★' },
    { id: 'business', label: 'Business', color: 'rose', glyph: '▰' },
    { id: 'gift', label: 'Enviar un regalo', color: 'orange', glyph: '◆' }
  ] },
  { title: 'Ayuda', items: [
    { id: 'ask', label: 'Hacer una pregunta', color: 'amber', glyph: '◆' },
    { id: 'faq', label: 'Preguntas frecuentes', color: 'sky', glyph: '?' },
    { id: 'features', label: 'Funciones', color: 'violet', glyph: '✹' },
    { id: 'policy', label: 'Política de privacidad', color: 'green', glyph: '⬟' }
  ] }
];

export const tabs: Tab[] = [
  { id: 'chats', label: 'Chats', glyph: '◯', glyphFill: '⬤', badge: 11 },
  { id: 'contacts', label: 'Contactos', glyph: '○', glyphFill: '●' },
  { id: 'settings', label: 'Ajustes', glyph: '✧', glyphFill: '✦' },
  { id: 'profile', label: 'Perfil', glyph: 'R', glyphFill: 'R' }
];
