import { createElement } from "react";
import { icons, type IonIcon, type IconName, type IconVariant } from "@rblez-ui/tokens";

export interface IconProps {
  /** Icono del set curado. */ name?: IconName;
  /** Cualquier Ionicon o icono propio: import { camera } from "@rblez-ui/tokens/ionicons" · import { sidebar } from "@rblez-ui/tokens/rblez-icons". */ icon?: IonIcon;
  variant?: IconVariant; size?: number; /** Grosor de línea en px a 24 px. */ strokeWidth?: number; label?: string; className?: string;
}

const camel = (k: string) => k.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

export function Icon({ name, icon, variant = "line", size = 16, strokeWidth, label, className = "d-icon" }: IconProps) {
  const src = (icon ?? (name ? icons[name] : undefined)) as IonIcon | undefined;
  const node = src ? (variant === "fill" ? src.s : src.o) : [];
  // Ionicons dibuja en 512: 32 = 1.5 px a 24. A tamaños pequeños, algo más grueso.
  // "b": el relleno de un icono de solo trazo se dibuja más grueso.
  const sw = (((strokeWidth ?? (size <= 16 ? 1.75 : 1.5)) * 512) / 24) * (variant === "fill" ? (src?.b ?? 1) : 1);
  return (
    <svg className={className} data-variant={variant} viewBox="0 0 512 512" width={size} height={size} fill="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {node.map(([tag, { k, ...attrs }], i) =>
        createElement(tag, { key: i, ...Object.fromEntries(Object.entries(attrs).map(([a, v]) => [camel(a), v])), ...(k ? { strokeWidth: sw * +k } : {}) }))}
    </svg>
  );
}
