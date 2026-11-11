import type { Component } from "svelte";
import type { ComponentType } from "react";

import SButton from "../demos/svelte/ButtonDemo.svelte";
import SInput from "../demos/svelte/InputDemo.svelte";
import STextarea from "../demos/svelte/TextareaDemo.svelte";
import SSwitch from "../demos/svelte/SwitchDemo.svelte";
import SBadge from "../demos/svelte/BadgeDemo.svelte";
import SCard from "../demos/svelte/CardDemo.svelte";
import SKbd from "../demos/svelte/KbdDemo.svelte";
import SSidebar from "../demos/svelte/SidebarDemo.svelte";
import SPrompt from "../demos/svelte/PromptInputDemo.svelte";
import SFooter from "../demos/svelte/FooterDemo.svelte";
import sFooter from "../demos/svelte/FooterDemo.svelte?raw";
import sButton from "../demos/svelte/ButtonDemo.svelte?raw";
import sInput from "../demos/svelte/InputDemo.svelte?raw";
import sTextarea from "../demos/svelte/TextareaDemo.svelte?raw";
import sSwitch from "../demos/svelte/SwitchDemo.svelte?raw";
import sBadge from "../demos/svelte/BadgeDemo.svelte?raw";
import sCard from "../demos/svelte/CardDemo.svelte?raw";
import sKbd from "../demos/svelte/KbdDemo.svelte?raw";
import sSidebar from "../demos/svelte/SidebarDemo.svelte?raw";
import sPrompt from "../demos/svelte/PromptInputDemo.svelte?raw";

import RButton from "../demos/react/ButtonDemo";
import RInput from "../demos/react/InputDemo";
import RTextarea from "../demos/react/TextareaDemo";
import RSwitch from "../demos/react/SwitchDemo";
import RBadge from "../demos/react/BadgeDemo";
import RCard from "../demos/react/CardDemo";
import RKbd from "../demos/react/KbdDemo";
import RSidebar from "../demos/react/SidebarDemo";
import RPrompt from "../demos/react/PromptInputDemo";
import RFooter from "../demos/react/FooterDemo";
import RPS from "../demos/react/ProfileSettingsDemo";
import rPS from "../demos/react/ProfileSettingsDemo.tsx?raw";
import SPS from "../demos/svelte/ProfileSettingsDemo.svelte";
import sPS from "../demos/svelte/ProfileSettingsDemo.svelte?raw";
import SNF from "../demos/svelte/NotFoundDemo.svelte";
import sNF from "../demos/svelte/NotFoundDemo.svelte?raw";
import RNF from "../demos/react/NotFoundDemo";
import rNF from "../demos/react/NotFoundDemo.tsx?raw";
import rFooter from "../demos/react/FooterDemo.tsx?raw";
import rButton from "../demos/react/ButtonDemo.tsx?raw";
import rInput from "../demos/react/InputDemo.tsx?raw";
import rTextarea from "../demos/react/TextareaDemo.tsx?raw";
import rSwitch from "../demos/react/SwitchDemo.tsx?raw";
import rBadge from "../demos/react/BadgeDemo.tsx?raw";
import rCard from "../demos/react/CardDemo.tsx?raw";
import rKbd from "../demos/react/KbdDemo.tsx?raw";
import rSidebar from "../demos/react/SidebarDemo.tsx?raw";
import rPrompt from "../demos/react/PromptInputDemo.tsx?raw";

import SGrid from "../demos/svelte/GridDemo.svelte";
import sGrid from "../demos/svelte/GridDemo.svelte?raw";
import RGrid from "../demos/react/GridDemo";
import rGrid from "../demos/react/GridDemo.tsx?raw";
import SSheet from "../demos/svelte/BottomSheetDemo.svelte";
import sSheet from "../demos/svelte/BottomSheetDemo.svelte?raw";
import RSheet from "../demos/react/BottomSheetDemo";
import rSheet from "../demos/react/BottomSheetDemo.tsx?raw";
import SModal from "../demos/svelte/ModalDemo.svelte";
import sModal from "../demos/svelte/ModalDemo.svelte?raw";
import RModal from "../demos/react/ModalDemo";
import rModal from "../demos/react/ModalDemo.tsx?raw";
import SSelect from "../demos/svelte/SelectDemo.svelte";
import sSelect from "../demos/svelte/SelectDemo.svelte?raw";
import RSelect from "../demos/react/SelectDemo";
import rSelect from "../demos/react/SelectDemo.tsx?raw";
import SToast from "../demos/svelte/ToastDemo.svelte";
import sToast from "../demos/svelte/ToastDemo.svelte?raw";
import RToast from "../demos/react/ToastDemo";
import rToast from "../demos/react/ToastDemo.tsx?raw";

import SGG from "../demos/svelte/GuideGridDemo.svelte";
import sGG from "../demos/svelte/GuideGridDemo.svelte?raw";
import RGG from "../demos/react/GuideGridDemo";
import rGG from "../demos/react/GuideGridDemo.tsx?raw";
import SLoad from "../demos/svelte/LoadingDemo.svelte";
import sLoad from "../demos/svelte/LoadingDemo.svelte?raw";
import RLoad from "../demos/react/LoadingDemo";
import rLoad from "../demos/react/LoadingDemo.tsx?raw";

export type Prop = [name: string, type: string, def: string, desc: string];

export interface ComponentDoc {
  slug: string;
  name: string;
  group: "Formularios" | "Layout" | "Overlay" | "Feedback" | "IA";
  badge?: string;
  /** Nombres exportados que muestra Uso (por defecto, name). */
  exports?: string[];
  description: string;
  svelte: Component; react: ComponentType;
  svelteSrc: string; reactSrc: string;
  props: Prop[];
  surface?: "plain" | "gradient" | "wide" | "phone";
}

export const components: ComponentDoc[] = [
  { slug: "button", name: "Button", group: "Formularios", description: "Acción principal. Seis variantes, tres tamaños y estado de carga.",
    svelte: SButton, react: RButton, svelteSrc: sButton, reactSrc: rButton,
    props: [
      ["variant", '"solid" | "brand" | "secondary" | "outline" | "ghost" | "destructive"', '"solid"', "Estilo visual."],
      ["size", '"sm" | "md" | "lg" | "icon"', '"md"', "Altura y padding."],
      ["loading", "boolean", "false", "Muestra spinner y desactiva el botón."],
      ["...rest", "HTMLButtonAttributes", "—", "Atributos nativos (onclick / onClick, disabled…)."],
    ] },
  { slug: "input", name: "Input", group: "Formularios", description: "Campo de texto con label, ayuda, error y afijos.",
    svelte: SInput, react: RInput, svelteSrc: sInput, reactSrc: rInput,
    props: [
      ["value", "string", '""', "bind:value en Svelte; controlado con value/onChange en React."],
      ["label", "string", "—", "Etiqueta asociada al input."],
      ["hint", "string", "—", "Texto de ayuda bajo el campo."],
      ["error", "string", "—", "Mensaje de error; marca aria-invalid."],
      ["size", '"sm" | "md" | "lg"', '"md"', "Altura del control."],
      ["prefix / suffix", "Snippet | ReactNode", "—", "Contenido antes o después del texto."],
    ] },
  { slug: "textarea", name: "Textarea", group: "Formularios", description: "Texto multilínea con la misma API que Input.",
    svelte: STextarea, react: RTextarea, svelteSrc: sTextarea, reactSrc: rTextarea,
    props: [
      ["value", "string", '""', "Contenido."],
      ["label / hint / error", "string", "—", "Igual que Input."],
      ["rows", "number", "3", "Filas iniciales."],
    ] },
  { slug: "switch", name: "Switch", group: "Formularios", description: "Interruptor accesible con role=switch.",
    svelte: SSwitch, react: RSwitch, svelteSrc: sSwitch, reactSrc: rSwitch,
    props: [
      ["checked", "boolean", "false", "bind:checked en Svelte; checked/onCheckedChange en React."],
      ["label", "string", "—", "Texto al lado."],
      ["disabled", "boolean", "false", "Desactiva el control."],
    ] },
  { slug: "select", name: "Select", group: "Formularios", badge: "Nuevo", description: "Select accesible con listbox propio: teclado completo, búsqueda por tecleo, iconos, búsqueda opcional y el mismo aspecto que Input.",
    svelte: SSelect, react: RSelect, svelteSrc: sSelect, reactSrc: rSelect,
    props: [
      ["value", "string", "—", "bind:value en Svelte; value/onChange (o defaultValue) en React."],
      ["options", "SelectOption[]", "—", "{ value, label, disabled?, icon? }[]"],
      ["label / hint / error", "string", "—", "Igual que Input; error marca aria-invalid."],
      ["placeholder", "string", '"Selecciona…"', "Texto sin selección."],
      ["size", '"sm" | "md" | "lg"', '"md"', "Altura del control."],
      ["searchable", "boolean", "false", "Campo de búsqueda que filtra (sin tildes ni mayúsculas)."],
      ["searchPlaceholder / emptyText", "string", '"Buscar…" / "Sin resultados"', "Textos de la búsqueda."],
      ["disabled / required / name", "boolean / boolean / string", "—", "name añade un input oculto para formularios."],
      ["onchange / onChange", "(value: string) => void", "—", "Al elegir una opción."],
    ] },
  { slug: "prompt-input", name: "PromptInput", group: "IA", badge: "Nuevo", surface: "gradient",
    description: "Composer de IA: autosize, placeholder animado, adjuntos, Plan, dictado y envío.",
    svelte: SPrompt, react: RPrompt, svelteSrc: sPrompt, reactSrc: rPrompt,
    props: [
      ["value", "string", '""', "Texto del prompt."],
      ["plan", "boolean", "false", "Modo plan."],
      ["placeholder", "string | string[]", "frases", "Una frase fija o varias animadas."],
      ["submitLabel", "string", '"Build now"', "Texto del botón de envío."],
      ["theme", '"light" | "dark" | "auto"', '"auto"', "auto sigue al documento."],
      ["onsubmit / onSubmit", "(d: PromptSubmit) => void", "—", "Recibe value, plan y files."],
      ["ondictate / onDictate", "() => void", "—", "Activa el micrófono si existe."],
    ] },
  { slug: "grid", name: "Grid", group: "Layout", badge: "Nuevo", description: "Rejillas responsive: auto-fit / auto-fill por ancho mínimo, columnas por breakpoint, masonry, bento con spans y split con columna lateral.",
    svelte: SGrid, react: RGrid, svelteSrc: sGrid, reactSrc: rGrid,
    props: [
      ["variant", '"auto-fit" | "auto-fill" | "columns" | "masonry" | "bento" | "split"', '"auto-fit"', "Tipo de rejilla."],
      ["cols", "number | { base, sm, md, lg, xl }", "{ base: 1, sm: 2, lg: 3 }", "Columnas por ancho del contenedor (480 / 768 / 1024 / 1280px). bento: { base: 2, md: 4 }."],
      ["min", "number | string", "220", "Ancho mínimo del item en auto-fit / auto-fill."],
      ["gap", "number | string", "16", "Separación (px si es número)."],
      ["sidebar / side", 'number | string / "start" | "end"', '280 / "start"', "Columna lateral del split; se apila por debajo de 768px."],
      ["rowHeight", "number | string", "120", "Alto mínimo de fila en bento."],
      ["as", "string | ElementType", '"div"', "Elemento de la rejilla (p. ej. ul)."],
      ["GridItem: colSpan / rowSpan", "number", "1", "Spans en bento / columns; los anchos ocupan la fila entera en móvil."],
    ] },
  { slug: "guide-grid", name: "GuideGrid", group: "Layout", badge: "Nuevo", exports: ["GuideGrid", "GuideCell"], description: "Rejilla con guías visibles al estilo Geist: celdas sólidas que tapan las guías, cruces en las esquinas, guías discontinuas u ocultas por eje y columnas por ancho del contenedor.",
    svelte: SGG, react: RGG, svelteSrc: sGG, reactSrc: rGG,
    props: [
      ["columns", "number | { sm, md, lg }", "3", "Columnas fijas o por ancho del contenedor (< 640 · 640 · 960px)."],
      ["rowHeight", "number | string", "120", "Alto mínimo de fila."],
      ["dashed", "boolean", "false", "Guías discontinuas."],
      ["hideRowGuides / hideColumnGuides", "boolean", "false", "Oculta las guías de un eje."],
      ["cross", "boolean", "false", "Cruces en las esquinas de la rejilla."],
      ["as", "string | ElementType", '"div"', "Elemento de la rejilla (p. ej. ul)."],
      ["GuideCell: colSpan / rowSpan", "number", "1", "Celdas que ocupa; con columnas responsive, las anchas llenan la fila en móvil."],
      ["GuideCell: solid", "boolean", "false", "Fondo opaco que tapa las guías que cruza."],
      ["GuideCell: cross", "boolean", "false", "Cruz en la esquina superior izquierda."],
    ] },
  { slug: "card", name: "Card", group: "Layout", description: "Contenedor con cabecera, cuerpo y pie.",
    svelte: SCard, react: RCard, svelteSrc: sCard, reactSrc: rCard,
    props: [
      ["title", "string", "—", "Título."],
      ["description", "string", "—", "Subtítulo."],
      ["footer", "Snippet | ReactNode", "—", "Acciones en el pie."],
    ] },
  { slug: "sidebar", name: "Sidebar", group: "Layout", description: "Navegación por secciones. Esta documentación la usa.",
    svelte: SSidebar, react: RSidebar, svelteSrc: sSidebar, reactSrc: rSidebar,
    props: [
      ["sections", "SidebarSection[]", "—", "{ title, items: { label, href, badge? }[] }[]"],
      ["active", "string", "—", "href activo (aria-current=page)."],
      ["onnavigate / onNavigate", "(href: string) => void", "—", "Al pulsar un item."],
    ] },
  { slug: "footer", name: "Footer", group: "Layout", badge: "Nuevo", surface: "wide",
    description: "Pie de sitio con logo, columnas de enlaces y barra legal. Réplica del de Linear.",
    svelte: SFooter, react: RFooter, svelteSrc: sFooter, reactSrc: rFooter,
    props: [
      ["columns", "FooterColumn[]", "—", "{ title, links: { label, href, external? }[] }[]"],
      ["legal", "FooterLink[]", "[]", "Columna Legal en escritorio; barra inferior en móvil."],
      ["logo", "Snippet | ReactNode", "—", "Marca en la esquina superior izquierda."],
      ["logoHref", "string", '"/"', "Destino del logo."],
    ] },
  { slug: "profile-settings", name: "ProfileSettings", group: "Layout", badge: "Nuevo", surface: "phone",
    description: "Pantalla de ajustes de perfil estilo Telegram: avatar, grupos con iconos de color, título compacto al hacer scroll y pestañas flotantes.",
    svelte: SPS, react: RPS, svelteSrc: sPS, reactSrc: rPS,
    props: [
      ["profile", "SettingsProfile", "—", "{ name, phone?, username?, avatar?, initials? }"],
      ["sections", "SettingsSection[]", "—", "{ title?, items: { id, label, description?, icon?, color?, image?, badge?, value?, href?, chevron? }[] }[]"],
      ["tabs", "SettingsTab[]", "[]", "{ id, label, icon?, image?, badge? }[] — barra inferior flotante."],
      ["activeTab", "string", "primera", "Pestaña activa (bind: en Svelte; defaultTab en React)."],
      ["title", "string", '"Ajustes"', "Título que aparece en la barra al hacer scroll."],
      ["footer", "string", "—", "Texto bajo los grupos (versión de la app)."],
      ["onselect / onSelect", "(item) => void", "—", "Al pulsar una fila."],
      ["onavatar, onqr, onsearch, onmore, ontab", "() => void", "—", "Acciones de cabecera y pestañas."],
    ] },
  { slug: "not-found", name: "NotFound", group: "Layout", badge: "Nuevo", surface: "wide",
    description: "Página 404 con un 404 isométrico en 3D (vector), rejilla isométrica y un enlace para volver.",
    svelte: SNF, react: RNF, svelteSrc: sNF, reactSrc: rNF,
    props: [
      ["title", "string", '"The page you’re looking for…"', "Titular."],
      ["description", "string", '"Let’s get you back on track."', "Texto bajo el titular."],
      ["actionLabel", "string", '"Take me home"', "Texto del enlace."],
      ["href", "string", '"/"', "Destino del enlace."],
      ["grid", "boolean", "true", "Rejilla isométrica de fondo."],
      ["onaction / onAction", "(e) => void", "—", "Al pulsar el enlace (p. ej. navegación del router)."],
    ] },
  { slug: "modal", name: "Modal", group: "Overlay", badge: "Nuevo", description: "Diálogo modal sobre <dialog> nativo: focus trap, devuelve el foco, Esc y clic en el fondo configurables, tres tamaños y pie de acciones.",
    svelte: SModal, react: RModal, svelteSrc: sModal, reactSrc: rModal,
    props: [
      ["open", "boolean", "false", "bind:open en Svelte; open/onClose en React."],
      ["title / description", "string", "—", "Enlazados con aria-labelledby / aria-describedby."],
      ["size", '"sm" | "md" | "lg"', '"md"', "Ancho máximo 380 / 480 / 720px."],
      ["closeOnBackdrop / closeOnEsc", "boolean", "true", "Cerrar con clic en el fondo o con Esc."],
      ["showClose / closeLabel", "boolean / string", 'true / "Cerrar"', "Botón × de la cabecera."],
      ["footer", "Snippet | ReactNode", "—", "Acciones del pie."],
      ["onclose / onClose", "() => void", "—", "Al pedir el cierre (Esc, fondo, ×)."],
    ] },
  { slug: "bottom-sheet", name: "BottomSheet", group: "Overlay", badge: "Nuevo", description: "Hoja inferior para móvil: asa para arrastrar, puntos de anclaje, cerrar arrastrando, fondo, focus trap, Esc, bloqueo de scroll y safe-area.",
    svelte: SSheet, react: RSheet, svelteSrc: sSheet, reactSrc: rSheet,
    props: [
      ["open", "boolean", "false", "bind:open en Svelte; open/onClose en React."],
      ["title / description", "string", "—", "Cabecera; también sirve para arrastrar."],
      ["snapPoints", "number[]", "—", "Alturas en fracción del viewport, p. ej. [0.45, 0.9]. Sin ellas, alto automático."],
      ["snap", "number", "0", "Anclaje activo: bind:snap en Svelte; snap/onSnapChange (o defaultSnap) en React. Flechas ↑/↓ en el asa."],
      ["dismissible", "boolean", "true", "Cerrar arrastrando, con Esc o con el fondo."],
      ["showClose / closeLabel / handleLabel", "boolean / string / string", 'true / "Cerrar" / "Cambiar tamaño"', "Botón × y etiqueta del asa."],
      ["footer", "Snippet | ReactNode", "—", "Acciones fijas abajo (con safe-area)."],
      ["onclose / onClose", "() => void", "—", "Al pedir el cierre."],
    ] },
  { slug: "badge", name: "Badge", group: "Feedback", description: "Etiquetas de estado con punto opcional.",
    svelte: SBadge, react: RBadge, svelteSrc: sBadge, reactSrc: rBadge,
    props: [
      ["variant", '"default" | "secondary" | "outline" | "brand" | "success" | "warning" | "danger"', '"secondary"', "Color."],
      ["dot", "boolean", "false", "Punto de estado."],
    ] },
  { slug: "toast", name: "Toast", group: "Feedback", badge: "Nuevo", description: "Notificaciones con <Toaster> y la función toast(): variantes de estado, acción, duración, apilado y pausa al pasar el ratón.",
    svelte: SToast, react: RToast, svelteSrc: sToast, reactSrc: rToast,
    props: [
      ["position", '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', '"bottom-right"', "Esquina del Toaster; ancho completo en móvil."],
      ["max", "number", "3", "Toasts visibles a la vez (los más recientes)."],
      ["label / closeLabel", "string", '"Notificaciones" / "Cerrar"', "Región aria-live=polite y botón cerrar."],
      ["icons", "boolean", "true", "Icono de estado."],
      ["toast(title, opts?)", "(string | ToastOptions) => id", "—", "También toast.success / warning / danger y toast.dismiss(id?)."],
      ["ToastOptions", "{ id?, title?, description?, variant?, duration?, action?, dismissible? }", "duration 5000", "duration 0 = no se cierra solo; action { label, onClick }."],
    ] },
  { slug: "loading", name: "Loading", group: "Feedback", badge: "Nuevo", exports: ["Spinner", "LoadingDots", "Skeleton"], description: "Indicadores de carga: Spinner para acciones del usuario, LoadingDots para texto en curso y Skeleton para reservar el espacio del contenido.",
    svelte: SLoad, react: RLoad, svelteSrc: sLoad, reactSrc: rLoad,
    props: [
      ["Spinner: size", "number", "20", "Lado en px."],
      ["Spinner: color", "string", "--d-muted", "Cualquier color CSS."],
      ["Spinner: label", "string", '"Cargando"', "role=status con aria-label."],
      ["LoadingDots: size", "number", "4", "Diámetro de cada punto en px."],
      ["LoadingDots: children", "Snippet | ReactNode", "—", "Texto delante (Guardando, Desplegando…); aria-live=polite."],
      ["Skeleton: width / height", "number | string", '"100%" / 24', "Tamaño (px si es número)."],
      ["Skeleton: shape", '"rounded" | "pill" | "circle" | "square"', '"rounded"', "Forma; circle usa height como diámetro."],
      ["Skeleton: animated", "boolean", "true", "Brillo animado; se desactiva con reduced-motion."],
      ["Skeleton: show", "boolean", "true", "false muestra el contenido real (children)."],
    ] },
  { slug: "kbd", name: "Kbd", group: "Feedback", description: "Atajos de teclado.",
    svelte: SKbd, react: RKbd, svelteSrc: sKbd, reactSrc: rKbd, props: [["children", "Snippet | ReactNode", "—", "Tecla."]] },
];

export const guides = [
  { slug: "introduccion", name: "Introducción" },
  { slug: "instalacion", name: "Instalación" },
  { slug: "tokens", name: "Tokens" },
  { slug: "acerca", name: "Acerca de" },
];
