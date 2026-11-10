/** Lógica compartida del Select (sin framework). */
import type { SelectOption } from "./index";

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Coincidencia sin mayúsculas ni tildes. */
export const matchOption = (o: SelectOption, q: string) => norm(o.label).includes(norm(q.trim()));

/** Siguiente opción habilitada desde `from` en la dirección `dir`; se queda en `from` si no hay. */
export function nextEnabled(list: readonly SelectOption[], from: number, dir: 1 | -1): number {
  for (let i = from + dir; i >= 0 && i < list.length; i += dir) if (!list[i].disabled) return i;
  return from >= 0 && from < list.length ? from : -1;
}

/** Búsqueda por tecleo: acumula caracteres 500 ms y salta a la primera etiqueta que empieza así. */
export function typeahead() {
  let buf = ""; let t: ReturnType<typeof setTimeout> | undefined;
  const fn = (list: readonly SelectOption[], key: string, from: number): number => {
    clearTimeout(t); t = setTimeout(() => (buf = ""), 500);
    buf += norm(key);
    const same = buf.length > 1 && [...buf].every((c) => c === buf[0]);
    const q = same ? buf[0] : buf;
    const start = same || buf.length === 1 ? from + 1 : Math.max(0, from);
    for (let n = 0; n < list.length; n++) {
      const i = (start + n) % list.length; const o = list[i];
      if (!o.disabled && norm(o.label).startsWith(q)) return i;
    }
    return -1;
  };
  return Object.assign(fn, { busy: () => buf.length > 0 });
}
