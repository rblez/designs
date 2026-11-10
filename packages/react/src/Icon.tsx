import { createElement } from "react";
import { icons, type IconName, type IconNode, type IconVariant } from "@rblez-ui/tokens";

export interface IconProps {
  /** Icono del set curado. */ name?: IconName;
  /** Cualquier icono de Lucide: import { Camera } from "lucide". */ icon?: IconNode;
  variant?: IconVariant; size?: number; strokeWidth?: number; label?: string; className?: string;
}

export function Icon({ name, icon, variant = "line", size = 16, strokeWidth, label, className = "d-icon" }: IconProps) {
  const node = (icon ?? (name ? icons[name] : [])) as IconNode;
  return (
    <svg className={className} data-variant={variant} viewBox="0 0 24 24" width={size} height={size}
      fill={variant === "fill" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth ?? (size <= 16 ? 2.25 : 2)}
      strokeLinecap="round" strokeLinejoin="round" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {node.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
