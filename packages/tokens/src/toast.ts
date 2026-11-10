/** Store de toasts sin framework: lo comparten <Toaster> de Svelte y de React. */
export type ToastVariant = "default" | "success" | "warning" | "danger";
export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export interface ToastAction { label: string; onClick: () => void }
export interface ToastOptions {
  id?: string; title?: string; description?: string; variant?: ToastVariant;
  /** ms antes de cerrarse; 0 o Infinity = no se cierra solo. Por defecto 5000. */ duration?: number;
  action?: ToastAction; dismissible?: boolean;
}
export interface ToastItem {
  id: string; title?: string; description?: string; variant: ToastVariant; duration: number;
  action?: ToastAction; dismissible: boolean; leaving: boolean; createdAt: number;
}

type Listener = (items: ToastItem[]) => void;
interface Timer { handle?: ReturnType<typeof setTimeout>; remaining: number; start: number }

let items: ToastItem[] = [];
const listeners = new Set<Listener>();
const timers = new Map<string, Timer>();
let paused = false;
let seq = 0;
const LEAVE_MS = 200;

const emit = () => { for (const l of listeners) l(items); };
const set = (next: ToastItem[]) => { items = next; emit(); };

function schedule(id: string) {
  const t = timers.get(id); if (!t || paused || !Number.isFinite(t.remaining)) return;
  clearTimeout(t.handle); t.start = Date.now(); t.handle = setTimeout(() => dismiss(id), Math.max(0, t.remaining));
}

function dismiss(id?: string) {
  const ids = id ? [id] : items.map((i) => i.id);
  for (const k of ids) { const t = timers.get(k); if (t) clearTimeout(t.handle); timers.delete(k); }
  if (!ids.length) return;
  set(items.map((i) => (ids.includes(i.id) ? { ...i, leaving: true } : i)));
  setTimeout(() => set(items.filter((i) => !(ids.includes(i.id) && i.leaving))), LEAVE_MS);
}

function create(input: string | ToastOptions, opts: ToastOptions = {}): string {
  const o: ToastOptions = typeof input === "string" ? { ...opts, title: input } : { ...input, ...opts };
  const id = o.id ?? `t${++seq}`;
  const duration = o.duration ?? 5000;
  const item: ToastItem = { id, title: o.title, description: o.description, variant: o.variant ?? "default", duration, action: o.action, dismissible: o.dismissible ?? true, leaving: false, createdAt: Date.now() };
  const old = timers.get(id); if (old) clearTimeout(old.handle);
  set(items.some((i) => i.id === id) ? items.map((i) => (i.id === id ? item : i)) : [...items, item]);
  timers.set(id, { remaining: duration > 0 ? duration : Infinity, start: Date.now() });
  schedule(id);
  return id;
}

type Variant = (title: string, opts?: Omit<ToastOptions, "variant" | "title">) => string;
export interface ToastFn {
  (input: string | ToastOptions, opts?: ToastOptions): string;
  success: Variant; warning: Variant; danger: Variant;
  /** Cierra un toast por id, o todos sin argumentos. */ dismiss: (id?: string) => void;
}

/** Muestra un toast. Devuelve su id (pásalo como `id` para actualizarlo). */
export const toast: ToastFn = Object.assign(create, {
  success: ((title, opts) => create({ ...opts, title, variant: "success" })) as Variant,
  warning: ((title, opts) => create({ ...opts, title, variant: "warning" })) as Variant,
  danger: ((title, opts) => create({ ...opts, title, variant: "danger" })) as Variant,
  dismiss,
});

/** API del store para los componentes <Toaster>. */
export const toaster = {
  subscribe(fn: Listener): () => void { listeners.add(fn); fn(items); return () => { listeners.delete(fn); }; },
  get: (): ToastItem[] => items,
  dismiss,
  /** Pausa todos los temporizadores (hover o foco en la región). */
  pause() {
    if (paused) return; paused = true;
    for (const t of timers.values()) { if (t.handle) { clearTimeout(t.handle); t.handle = undefined; t.remaining -= Date.now() - t.start; } }
  },
  resume() { if (!paused) return; paused = false; for (const id of timers.keys()) schedule(id); },
};
