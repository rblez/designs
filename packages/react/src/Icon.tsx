import { createElement } from "react";
import { icons, type HeroIcon, type IconName, type IconNode, type IconVariant } from "@rblez-ui/tokens";

export interface IconProps {
  /** Icono del set curado. */ name?: IconName;
  /** Cualquier Heroicon: import { camera } from "@rblez-ui/tokens/heroicons". */ icon?: HeroIcon;
  variant?: IconVariant; size?: number; strokeWidth?: number; label?: string; className?: string;
}

const camel = (k: string) => k.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

export function Icon({ name, icon, variant = "line", size = 16, strokeWidth, label, className = "d-icon" }: IconProps) {
  const src = (icon ?? (name ? icons[name] : undefined)) as HeroIcon | undefined;
  // Relleno: micro (16) y mini (20) a tamaños pequeños, solid (24) a partir de ahí.
  const [node, box]: [IconNode, number] = !src ? [[], 24]
    : variant === "line" ? [src.o, 24]
    : size <= 16 && src.u ? [src.u, 16]
    : size <= 20 && src.m ? [src.m, 20]
    : [src.s, 24];
  const line = variant === "line";
  return (
    <svg className={className} data-variant={variant} viewBox={`0 0 ${box} ${box}`} width={size} height={size}
      fill={line ? "none" : "currentColor"} stroke={line ? "currentColor" : undefined} strokeWidth={line ? strokeWidth ?? (size <= 16 ? 2 : 1.5) : undefined}
      strokeLinecap="round" strokeLinejoin="round" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {node.map(([tag, attrs], i) => createElement(tag, { key: i, ...Object.fromEntries(Object.entries(attrs).map(([k, v]) => [camel(k), v])) }))}
    </svg>
  );
}
