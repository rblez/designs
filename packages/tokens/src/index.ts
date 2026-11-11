/** Design tokens compartidos por Svelte y React. Los valores visuales viven en tokens.css. */
export type ButtonVariant = "solid" | "secondary" | "outline" | "ghost" | "brand" | "destructive";
export type Size = "sm" | "md" | "lg";
export type ButtonSize = Size | "icon";
export type BadgeVariant = "default" | "secondary" | "outline" | "brand" | "success" | "warning" | "danger";

export interface SidebarItem { label: string; href: string; badge?: string }
export interface SidebarSection { title: string; items: SidebarItem[] }

export interface FooterLink { label: string; href: string; external?: boolean }
export interface FooterColumn { title: string; links: FooterLink[] }

export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

export * from "./icons";
export * from "./prompt";
export * from "./notfound-art";
export * from "./accent";

/* ProfileSettings (estilo Telegram) */
export type SettingsColor = "blue" | "sky" | "indigo" | "cyan" | "green" | "orange" | "amber" | "red" | "rose" | "violet" | "purple" | "gray";
export interface SettingsItem {
  id: string; label: string; description?: string; icon?: import("./icons").IconName; color?: SettingsColor;
  /** Imagen en lugar del icono (p. ej. cuenta vinculada). */
  image?: string; badge?: number | string; value?: string; href?: string; chevron?: boolean;
}
export interface SettingsSection { title?: string; items: SettingsItem[] }
export interface SettingsTab { id: string; label: string; icon?: import("./icons").IconName; image?: string; badge?: number }
export interface SettingsProfile { name: string; phone?: string; username?: string; avatar?: string; initials?: string }

/* Grid */
export type GridVariant = "auto-fit" | "auto-fill" | "columns" | "masonry" | "bento" | "split";
/** Columnas por ancho del contenedor (mobile-first): base < 480 ≤ sm < 768 ≤ md < 1024 ≤ lg < 1280 ≤ xl. */
export interface GridCols { base?: number; sm?: number; md?: number; lg?: number; xl?: number }
export const GRID_BREAKPOINTS = ["base", "sm", "md", "lg", "xl"] as const;
const len = (v: number | string | undefined, d: string) => (v === undefined ? d : typeof v === "number" ? `${v}px` : v);
/** Variables CSS de un Grid (mismo cálculo en Svelte y React). Los huecos de `cols` heredan el breakpoint anterior. */
export function gridVars(o: { variant: GridVariant; cols?: number | GridCols; min?: number | string; gap?: number | string; sidebar?: number | string; rowHeight?: number | string }): Record<string, string> {
  const def: GridCols = o.variant === "bento" ? { base: 2, md: 4 } : { base: 1, sm: 2, lg: 3 };
  const c: GridCols = typeof o.cols === "number" ? { base: o.cols } : o.cols ?? def;
  const vars: Record<string, string> = { "--d-grid-gap": len(o.gap, "16px"), "--d-grid-min": len(o.min, "220px"), "--d-grid-side": len(o.sidebar, "280px"), "--d-grid-row": len(o.rowHeight, "120px") };
  let last = 1;
  for (const bp of GRID_BREAKPOINTS) { last = Math.max(1, Math.round(c[bp] ?? last)); vars[`--d-grid-${bp}`] = String(last); }
  return vars;
}
export const styleString = (vars: Record<string, string>) => Object.entries(vars).map(([k, v]) => `${k}: ${v}`).join("; ");

/* Overlays (Modal, BottomSheet) */
export type ModalSize = "sm" | "md" | "lg";
export * from "./overlay";

/* Select */
export interface SelectOption { value: string; label: string; disabled?: boolean; icon?: import("./icons").IconName }

/* Toast */
export * from "./toast";
export * from "./select";
export * from "./guides";
