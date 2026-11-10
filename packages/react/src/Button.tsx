import type { ButtonHTMLAttributes } from "react";
import type { ButtonSize, ButtonVariant } from "@designs/tokens";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = "solid", size = "md", className, ...rest }: ButtonProps) {
  const cls = ["d-btn", `d-btn--${variant}`, `d-btn--${size}`, className].filter(Boolean).join(" ");
  return <button className={cls} {...rest} />;
}
