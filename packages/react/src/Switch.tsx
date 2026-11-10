import { useState } from "react";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Switch({ checked, defaultChecked = false, onCheckedChange, label, disabled = false }: SwitchProps) {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;
  const toggle = () => { if (disabled) return; if (checked === undefined) setInner(!on); onCheckedChange?.(!on); };
  return (
    <label className="d-switch-row">
      <button type="button" role="switch" className="d-switch" aria-label={label} aria-checked={on} disabled={disabled} onClick={toggle} />
      {label && <span>{label}</span>}
    </label>
  );
}
