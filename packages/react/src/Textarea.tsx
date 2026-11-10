import { useId, type TextareaHTMLAttributes } from "react";
import { cx } from "@designs/tokens";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, id, disabled, rows = 3, className, ...rest }: TextareaProps) {
  const uid = useId();
  const areaId = id ?? `d-textarea-${uid}`;
  const msgId = `${areaId}-msg`;
  return (
    <div className={cx("d-field", className)}>
      {label && <label className="d-label" htmlFor={areaId}>{label}</label>}
      <div className="d-control d-control--area" data-invalid={!!error} data-disabled={!!disabled}>
        <textarea id={areaId} className="d-textarea" disabled={disabled} rows={rows} aria-invalid={!!error || undefined}
          aria-describedby={error || hint ? msgId : undefined} {...rest} />
      </div>
      {error ? <p id={msgId} className="d-hint d-hint--error">{error}</p> : hint ? <p id={msgId} className="d-hint">{hint}</p> : null}
    </div>
  );
}
