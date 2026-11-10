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
