/** Utilidades compartidas por Modal y BottomSheet (sin framework). */
let locks = 0;
let saved: { overflow: string; paddingRight: string } | null = null;

/** Bloquea el scroll del documento. Devuelve la función que lo libera; admite bloqueos anidados. */
export function lockScroll(): () => void {
  if (typeof document === "undefined") return () => {};
  const el = document.documentElement;
  if (locks++ === 0) {
    const gap = window.innerWidth - el.clientWidth;
    saved = { overflow: el.style.overflow, paddingRight: el.style.paddingRight };
    el.style.overflow = "hidden";
    if (gap > 0) el.style.paddingRight = `${gap}px`;
  }
  let done = false;
  return () => {
    if (done) return; done = true;
    if (--locks === 0 && saved) { el.style.overflow = saved.overflow; el.style.paddingRight = saved.paddingRight; saved = null; }
  };
}

export const prefersReducedMotion = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Abre un <dialog> modal (focus trap e inert nativos) y devuelve la función que lo cierra y devuelve el foco. */
export function openDialog(dialog: HTMLDialogElement): () => void {
  const prev = document.activeElement as HTMLElement | null;
  if (!dialog.open) dialog.showModal();
  const unlock = lockScroll();
  return () => {
    unlock();
    if (dialog.open) dialog.close();
    if (prev && prev.isConnected && typeof prev.focus === "function") prev.focus({ preventScroll: true });
  };
}

/** true si el clic cayó en el fondo del <dialog> (fuera del panel), empezando y terminando ahí. */
export function backdropClick(dialog: HTMLDialogElement) {
  let down = false;
  return {
    pointerdown: (e: PointerEvent) => { down = e.target === dialog; },
    click: (e: MouseEvent) => { const hit = down && e.target === dialog; down = false; return hit; },
  };
}
