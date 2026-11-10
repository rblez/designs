/** Design tokens compartidos por Svelte y React. Los valores visuales viven en tokens.css. */
export type ButtonVariant = "solid" | "secondary" | "outline" | "ghost" | "brand" | "destructive";
export type Size = "sm" | "md" | "lg";
export type ButtonSize = Size | "icon";
export type BadgeVariant = "default" | "secondary" | "outline" | "brand" | "success" | "warning" | "danger";

export interface SidebarItem { label: string; href: string; badge?: string }
export interface SidebarSection { title: string; items: SidebarItem[] }

export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

export * from "./icons";
export * from "./prompt";
