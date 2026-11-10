import { useEffect, useId, useRef, useState, type KeyboardEvent as RKeyboardEvent } from "react";
import { cx, matchOption, nextEnabled, typeahead, type SelectOption, type Size } from "@rblez-ui/tokens";
import { chevronUpDown, magnifyingGlass } from "@rblez-ui/tokens/heroicons";
import { Icon } from "./Icon";

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  required?: boolean;
  /** Añade un campo de búsqueda que filtra las opciones. */
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  /** Nombre del input oculto para formularios nativos. */
  name?: string;
  id?: string;
  className?: string;
}

export function Select({ value: valueProp, defaultValue, onChange, options, label, hint, error, placeholder = "Selecciona…", size = "md", disabled = false, required = false,
  searchable = false, searchPlaceholder = "Buscar…", emptyText = "Sin resultados", name, id, className }: SelectProps) {
  const uid = useId();
  const triggerId = id ?? `d-select-${uid}`;
  const listId = `${triggerId}-list`;
  const labelId = `${triggerId}-label`;
  const msgId = `${triggerId}-msg`;
  const optId = (i: number) => `${listId}-${i}`;

  const [inner, setInner] = useState(defaultValue);
  const value = valueProp !== undefined ? valueProp : inner;
  const [isOpen, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [query, setQuery] = useState("");
  const [side, setSide] = useState<"top" | "bottom">("bottom");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const ta = useRef(typeahead()).current;

  const filtered = searchable && query ? options.filter((o) => matchOption(o, query)) : options;
  const selected = options.find((o) => o.value === value);

  const show = (at?: "first" | "last", key?: string) => {
    if (disabled || isOpen) return;
    const r = root.current?.getBoundingClientRect();
    if (r) { const below = innerHeight - r.bottom; setSide(below < 300 && r.top > below ? "top" : "bottom"); }
    setOpen(true); setQuery("");
    const sel = options.findIndex((o) => o.value === value);
    let i = at === "first" ? nextEnabled(options, -1, 1) : at === "last" ? nextEnabled(options, options.length, -1) : sel >= 0 ? sel : nextEnabled(options, -1, 1);
    if (key) { const t = ta(options, key, i); if (t >= 0) i = t; }
    setActive(i);
  };
  const hide = (refocus = true) => { if (!isOpen) return; setOpen(false); setQuery(""); if (refocus) trigger.current?.focus(); };
  const choose = (i: number, refocus = true) => {
    const o = filtered[i]; if (!o || o.disabled) return;
    if (o.value !== value) { if (valueProp === undefined) setInner(o.value); onChange?.(o.value); }
    hide(refocus);
  };
  const move = (e: RKeyboardEvent, to: number) => { e.preventDefault(); setActive(to); };

  const onKey = (e: RKeyboardEvent) => {
    const k = e.key;
    if (!isOpen) {
      if (k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || k === " ") { e.preventDefault(); show(); }
      else if (k === "Home") { e.preventDefault(); show("first"); }
      else if (k === "End") { e.preventDefault(); show("last"); }
      else if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !searchable) show(undefined, k);
      return;
    }
    const inSearch = e.target === search.current;
    if (k === "ArrowDown") move(e, nextEnabled(filtered, active, 1));
    else if (k === "ArrowUp" && e.altKey) { e.preventDefault(); choose(active); }
    else if (k === "ArrowUp") move(e, nextEnabled(filtered, active, -1));
    else if (k === "Home" && !inSearch) move(e, nextEnabled(filtered, -1, 1));
    else if (k === "End" && !inSearch) move(e, nextEnabled(filtered, filtered.length, -1));
    else if (k === "PageDown") move(e, nextEnabled(filtered, Math.min(filtered.length - 1, active + 9), 1));
    else if (k === "PageUp") move(e, nextEnabled(filtered, Math.max(0, active - 9), -1));
    else if (k === "Enter") { e.preventDefault(); choose(active); }
    else if (k === " " && !inSearch && !ta.busy()) { e.preventDefault(); choose(active); }
    else if (k === "Escape") { e.preventDefault(); e.stopPropagation(); hide(); }
    else if (k === "Tab") { if (active >= 0) choose(active, false); else hide(false); }
    else if (k.length === 1 && !inSearch && !e.ctrlKey && !e.metaKey && !e.altKey) { const i = ta(filtered, k, active); if (i >= 0) setActive(i); }
  };

  useEffect(() => { if (isOpen && searchable) search.current?.focus(); }, [isOpen, searchable]);
  useEffect(() => { if (isOpen && active >= 0) list.current?.querySelector(`#${CSS.escape(optId(active))}`)?.scrollIntoView({ block: "nearest" }); });
  useEffect(() => {
    if (!isOpen) return;
    const out = (e: PointerEvent) => { if (root.current && !root.current.contains(e.target as Node)) { setOpen(false); setQuery(""); } };
    document.addEventListener("pointerdown", out, true);
    return () => document.removeEventListener("pointerdown", out, true);
  }, [isOpen]);

  return (
    <div className={cx("d-field", className)}>
      {label && <label className="d-label" id={labelId} htmlFor={triggerId}>{label}</label>}
      <div className="d-select" ref={root}>
        <div className={cx("d-control", size !== "md" && `d-control--${size}`)} data-invalid={!!error} data-disabled={!!disabled}>
          <button ref={trigger} type="button" role="combobox" id={triggerId} className="d-select__trigger" disabled={disabled}
            aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={listId} aria-labelledby={label ? labelId : undefined}
            aria-activedescendant={isOpen && !searchable && active >= 0 ? optId(active) : undefined}
            aria-invalid={!!error || undefined} aria-required={required || undefined} aria-describedby={error || hint ? msgId : undefined}
            onClick={() => (isOpen ? hide() : show())} onKeyDown={onKey}>
            {selected?.icon && <Icon name={selected.icon} size={16} />}
            <span className="d-select__value" data-placeholder={!selected || undefined}>{selected?.label ?? placeholder}</span>
            <Icon icon={chevronUpDown} size={16} className="d-icon d-select__chev" />
          </button>
        </div>
        {isOpen && (
          <div className="d-select__pop" data-side={side}>
            {searchable && (
              <div className="d-select__search">
                <Icon icon={magnifyingGlass} size={16} />
                <input ref={search} value={query} type="text" role="combobox" aria-expanded="true" aria-controls={listId} aria-autocomplete="list"
                  aria-activedescendant={active >= 0 ? optId(active) : undefined} aria-label={searchPlaceholder} placeholder={searchPlaceholder} autoComplete="off" spellCheck={false}
                  onChange={(e) => { const q = e.target.value; setQuery(q); setActive(nextEnabled(options.filter((o) => matchOption(o, q)), -1, 1)); }} onKeyDown={onKey} />
              </div>
            )}
            <ul ref={list} className="d-select__list" role="listbox" id={listId} aria-labelledby={label ? labelId : undefined} tabIndex={-1}>
              {filtered.map((o, i) => (
                <li key={o.value} id={optId(i)} role="option" className="d-select__option" aria-selected={o.value === value} aria-disabled={o.disabled || undefined} data-active={i === active || undefined}
                  onPointerDown={(e) => e.preventDefault()} onPointerMove={() => { if (!o.disabled) setActive(i); }} onClick={() => choose(i)}>
                  {o.icon && <Icon name={o.icon} size={16} />}
                  <span>{o.label}</span>
                  {o.value === value && <Icon name="check" size={16} className="d-icon d-select__check" />}
                </li>
              ))}
            </ul>
            {!filtered.length && <p className="d-select__empty" role="status">{emptyText}</p>}
          </div>
        )}
      </div>
      {name && <input type="hidden" name={name} value={value ?? ""} />}
      {error ? <p id={msgId} className="d-hint d-hint--error">{error}</p> : hint ? <p id={msgId} className="d-hint">{hint}</p> : null}
    </div>
  );
}
