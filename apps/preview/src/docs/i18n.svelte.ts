export type Lang = "es" | "en";

const initial = (): Lang => {
  const saved = localStorage.getItem("d-lang");
  if (saved === "es" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
};

export const i18n = $state<{ lang: Lang }>({ lang: initial() });

export function setLang(l: Lang) {
  i18n.lang = l;
  localStorage.setItem("d-lang", l);
  document.documentElement.lang = l;
}

const dict = {
  es: {
    getStarted: "Empezar", components: "Componentes", base: "Base", legal: "Legal",
    groups: { IA: "IA", Formularios: "Formularios", Layout: "Layout", Feedback: "Feedback" },
    guides: { introduccion: "Introducción", instalacion: "Instalación", tokens: "Tokens", licencia: "Licencia", acerca: "Acerca de" },
    usage: "Uso", props: "Props", prop: "Prop", type: "Tipo", def: "Por defecto", desc: "Descripción",
    copy: "Copiar", copied: "Copiado", search: "Buscar…", searchLabel: "Buscar en la documentación",
    noResults: (q: string) => `Sin resultados para “${q}”.`, openMenu: "Abrir menú", closeMenu: "Cerrar menú",
    close: "Cerrar", nav: "Navegación", docs: "Documentación", theme: "Tema", light: "Claro", dark: "Oscuro",
    toggleTheme: "Cambiar tema", language: "Idioma", new: "Nuevo",
  },
  en: {
    getStarted: "Get started", components: "Components", base: "Foundations", legal: "Legal",
    groups: { IA: "AI", Formularios: "Forms", Layout: "Layout", Feedback: "Feedback" },
    guides: { introduccion: "Introduction", instalacion: "Installation", tokens: "Tokens", licencia: "License", acerca: "About" },
    usage: "Usage", props: "Props", prop: "Prop", type: "Type", def: "Default", desc: "Description",
    copy: "Copy", copied: "Copied", search: "Search…", searchLabel: "Search documentation",
    noResults: (q: string) => `No results for “${q}”.`, openMenu: "Open menu", closeMenu: "Close menu",
    close: "Close", nav: "Navigation", docs: "Documentation", theme: "Theme", light: "Light", dark: "Dark",
    toggleTheme: "Toggle theme", language: "Language", new: "New",
  },
} as const;

export const t = () => dict[i18n.lang];

/** English copy for component pages (Spanish lives in registry.ts). */
export const en: Record<string, { description: string; props: Record<string, string> }> = {
  button: { description: "Primary action. Six variants, three sizes and a loading state.",
    props: { variant: "Visual style.", size: "Height and padding.", loading: "Shows a spinner and disables the button.", "...rest": "Native attributes (onclick / onClick, disabled…)." } },
  input: { description: "Text field with label, hint, error and affixes.",
    props: { value: "bind:value in Svelte; controlled with value/onChange in React.", label: "Label bound to the input.", hint: "Helper text below the field.", error: "Error message; sets aria-invalid.", size: "Control height.", "prefix / suffix": "Content before or after the text." } },
  textarea: { description: "Multi-line text with the same API as Input.",
    props: { value: "Content.", "label / hint / error": "Same as Input.", rows: "Initial rows." } },
  switch: { description: "Accessible toggle with role=switch.",
    props: { checked: "bind:checked in Svelte; checked/onCheckedChange in React.", label: "Adjacent text.", disabled: "Disables the control." } },
  "prompt-input": { description: "AI composer: autosize, animated placeholder, attachments, Plan mode, dictation and submit.",
    props: { value: "Prompt text.", plan: "Plan mode.", placeholder: "A fixed phrase or several animated ones.", submitLabel: "Submit button label.", theme: "auto follows the document.", "onsubmit / onSubmit": "Receives value, plan and files.", "ondictate / onDictate": "Starts the microphone when available." } },
  card: { description: "Container with header, body and footer.",
    props: { title: "Title.", description: "Subtitle.", footer: "Footer actions." } },
  sidebar: { description: "Sectioned navigation. These docs use it.",
    props: { sections: "{ title, items: { label, href, badge? }[] }[]", active: "Active href (aria-current=page).", "onnavigate / onNavigate": "Called when an item is pressed." } },
  "profile-settings": { description: "Telegram-style profile settings screen: avatar, colored icon groups, compact title on scroll and floating tabs.",
    props: { profile: "{ name, phone?, username?, avatar?, initials? }", sections: "{ title?, items: { id, label, description?, icon?, color?, image?, badge?, value?, href?, chevron? }[] }[]", tabs: "{ id, label, icon?, image?, badge? }[] — floating bottom bar.", activeTab: "Active tab (bind: in Svelte; defaultTab in React).", title: "Title shown in the bar on scroll.", footer: "Text under the groups (app version).", "onselect / onSelect": "When a row is pressed.", "onavatar, onqr, onsearch, onmore, ontab": "Header and tab actions." } },
  footer: { description: "Site footer with logo, link columns and a legal bar. A replica of Linear's.",
    props: { columns: "{ title, links: { label, href, external? }[] }[]", legal: "Legal column on desktop; bottom bar on mobile.", logo: "Brand mark in the top-left corner.", logoHref: "Logo destination." } },
  badge: { description: "Status labels with an optional dot.", props: { variant: "Color.", dot: "Status dot." } },
  kbd: { description: "Keyboard shortcuts.", props: { children: "Key." } },
};
