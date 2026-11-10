import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cx, type Size } from "@designs/tokens";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  label?: string;
  hint?: string;
  error?: string;
  size?: Size;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export function Input({ label, hint, error, size = "md", prefix, suffix, id, disabled, className, ...rest }: InputProps) {
  const uid = useId();
  const inputId = id ?? `d-input-${uid}`;
  const msgId = `${inputId}-msg`;
  return (
    <div className={cx("d-field", className)}>
      {label && <label className="d-label" htmlFor={inputId}>{label}</label>}
      <div className={cx("d-control", size !== "md" && `d-control--${size}`)} data-invalid={!!error} data-disabled={!!disabled}>
        {prefix && <span className="d-affix">{prefix}</span>}
        <input id={inputId} className="d-input" disabled={disabled} aria-invalid={!!error || undefined}
          aria-describedby={error || hint ? msgId : undefined} {...rest} />
        {suffix && <span className="d-affix">{suffix}</span>}
      </div>
      {error ? <p id={msgId} className="d-hint d-hint--error">{error}</p> : hint ? <p id={msgId} className="d-hint">{hint}</p> : null}
    </div>
  );
}
