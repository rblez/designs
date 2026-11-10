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
import rButton from "../demos/react/ButtonDemo.tsx?raw";
import rInput from "../demos/react/InputDemo.tsx?raw";
import rTextarea from "../demos/react/TextareaDemo.tsx?raw";
import rSwitch from "../demos/react/SwitchDemo.tsx?raw";
import rBadge from "../demos/react/BadgeDemo.tsx?raw";
import rCard from "../demos/react/CardDemo.tsx?raw";
import rKbd from "../demos/react/KbdDemo.tsx?raw";
import rSidebar from "../demos/react/SidebarDemo.tsx?raw";
import rPrompt from "../demos/react/PromptInputDemo.tsx?raw";

export type Prop = [name: string, type: string, def: string, desc: string];

export interface ComponentDoc {
  slug: string;
  name: string;
  group: "Formularios" | "Layout" | "Feedback" | "IA";
  badge?: string;
  description: string;
  svelte: Component; react: ComponentType;
  svelteSrc: string; reactSrc: string;
  props: Prop[];
  surface?: "plain" | "gradient";
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
  { slug: "badge", name: "Badge", group: "Feedback", description: "Etiquetas de estado con punto opcional.",
    svelte: SBadge, react: RBadge, svelteSrc: sBadge, reactSrc: rBadge,
    props: [
      ["variant", '"default" | "secondary" | "outline" | "brand" | "success" | "warning" | "danger"', '"secondary"', "Color."],
      ["dot", "boolean", "false", "Punto de estado."],
    ] },
  { slug: "kbd", name: "Kbd", group: "Feedback", description: "Atajos de teclado.",
    svelte: SKbd, react: RKbd, svelteSrc: sKbd, reactSrc: rKbd, props: [["children", "Snippet | ReactNode", "—", "Tecla."]] },
];

export const guides = [
  { slug: "introduccion", name: "Introducción" },
  { slug: "instalacion", name: "Instalación" },
  { slug: "tokens", name: "Tokens" },
  { slug: "licencia", name: "Licencia" },
  { slug: "acerca", name: "Acerca de" },
];
