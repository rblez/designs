import type { ButtonHTMLAttributes } from "react";
import { cx, type ButtonSize, type ButtonVariant } from "@designs/tokens";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({ variant = "solid", size = "md", loading = false, disabled, className, type = "button", children, ...rest }: ButtonProps) {
  return (
    <button type={type} className={cx("d-btn", `d-btn--${variant}`, size !== "md" && `d-btn--${size}`, className)}
      disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && <span className="d-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
