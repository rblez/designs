import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx, SPINNER_BARS, skeletonVars, type SkeletonShape } from "@rblez-ui/tokens";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Lado en px. */
  size?: number;
  /** Color CSS; por defecto el texto atenuado. */
  color?: string;
  /** Texto para lectores de pantalla. */
  label?: string;
}

export function Spinner({ size = 20, color, label = "Cargando", className, style, ...rest }: SpinnerProps) {
  const vars = { "--ls": `${size}px`, ...(color ? { "--ls-color": color } : {}) } as CSSProperties;
  return (
    <span className={cx("d-load-spin", className)} role="status" aria-label={label} style={{ ...vars, ...style }} {...rest}>
      {SPINNER_BARS.map((i) => <i key={i} style={{ "--i": i } as CSSProperties} aria-hidden="true" />)}
    </span>
  );
}

export interface LoadingDotsProps extends HTMLAttributes<HTMLSpanElement> {
  /** Diámetro de cada punto en px. */
  size?: number;
  /** Texto delante de los puntos (Guardando, Desplegando…). */
  children?: ReactNode;
}

export function LoadingDots({ size = 4, children, className, style, ...rest }: LoadingDotsProps) {
  return (
    <span className={cx("d-load-dots", className)} aria-live="polite" style={{ "--ld": `${size}px`, ...style } as CSSProperties} {...rest}>
      {children != null && <span>{children}</span>}
      <span className="d-load-dots__d" aria-hidden="true"><i /><i /><i /></span>
    </span>
  );
}

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
  shape?: SkeletonShape;
  /** Brillo animado. */
  animated?: boolean;
  /** false muestra el contenido real (children) en lugar del esqueleto. */
  show?: boolean;
  children?: ReactNode;
}

export function Skeleton({ width, height, shape = "rounded", animated = true, show = true, children, className, style, ...rest }: SkeletonProps) {
  if (!show && children != null) return <>{children}</>;
  return <span className={cx("d-skel", className)} data-shape={shape === "rounded" ? undefined : shape} data-static={!animated || undefined} aria-hidden="true" style={{ ...(skeletonVars(width, height) as CSSProperties), ...style }} {...rest} />;
}
