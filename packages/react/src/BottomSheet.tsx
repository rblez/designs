import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent as RKeyboardEvent, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { backdropClick, cx, openDialog, prefersReducedMotion } from "@rblez-ui/tokens";
import { Icon } from "./Icon";

export interface BottomSheetProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  /** Alturas de anclaje como fracción del viewport (0–1), p. ej. [0.4, 0.9]. Sin ellas, alto automático. */
  snapPoints?: number[];
  /** Índice controlado del punto de anclaje. */
  snap?: number;
  defaultSnap?: number;
  onSnapChange?: (index: number) => void;
  /** Se puede cerrar arrastrando, con Esc o pulsando el fondo. */
  dismissible?: boolean;
  showClose?: boolean;
  closeLabel?: string;
  handleLabel?: string;
  className?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export function BottomSheet({ open, onClose, title, description, snapPoints, snap: snapProp, defaultSnap = 0, onSnapChange, dismissible = true, showClose = true,
  closeLabel = "Cerrar", handleLabel = "Cambiar tamaño", className, children, footer }: BottomSheetProps) {
  const uid = useId();
  const titleId = `d-sheet-${uid}-title`;
  const descId = `d-sheet-${uid}-desc`;
  const ref = useRef<HTMLDialogElement>(null);
  const backdrop = useRef<ReturnType<typeof backdropClick>>();
  const pending = useRef<{ t: ReturnType<typeof setTimeout>; close: () => void } | null>(null);
  const [inner, setInner] = useState(defaultSnap);
  const [vh, setVh] = useState(() => (typeof window === "undefined" ? 800 : window.innerHeight));
  const [drag, setDrag] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const live = useRef({ open, onClose });
  live.current = { open, onClose };

  const snap = snapProp ?? inner;
  const snaps = (snapPoints ?? []).map((s) => Math.min(1, Math.max(0.1, s))).sort((a, b) => a - b);
  const height = snaps.length ? Math.min(snaps[snaps.length - 1] * vh, vh - 24) : 0;
  const offsetOf = (i: number) => (snaps.length ? height - Math.min(snaps[Math.max(0, Math.min(i, snaps.length - 1))] * vh, height) : 0);
  const y = drag ?? offsetOf(snap);

  const setSnap = (i: number) => { const n = Math.max(0, Math.min(i, snaps.length - 1)); if (n !== snap) { if (snapProp === undefined) setInner(n); onSnapChange?.(n); } };
  const requestClose = () => { if (live.current.open) live.current.onClose?.(); };

  useEffect(() => {
    const r = () => setVh(window.innerHeight);
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!open || !d) return;
    if (pending.current) { clearTimeout(pending.current.t); pending.current.close(); pending.current = null; setClosing(false); }
    backdrop.current = backdropClick(d);
    setDrag(null);
    const close = openDialog(d);
    return () => {
      if (prefersReducedMotion()) { close(); return; }
      setClosing(true);
      pending.current = { close, t: setTimeout(() => { pending.current = null; setClosing(false); close(); }, 260) };
    };
  }, [open]);

  // Arrastre desde el asa o la cabecera
  const g = useRef({ startY: 0, base: 0, lastY: 0, lastT: 0, v: 0, moved: false, cur: null as number | null });
  const down = (e: RPointerEvent) => {
    if (e.button !== 0 || (e.target as Element).closest(".d-overlay__close")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const base = offsetOf(snap);
    g.current = { startY: e.clientY, base, lastY: e.clientY, lastT: e.timeStamp, v: 0, moved: false, cur: base };
    setDrag(base);
  };
  const move = (e: RPointerEvent) => {
    const s = g.current; if (s.cur === null) return;
    const dy = e.clientY - s.startY;
    if (Math.abs(dy) > 4) s.moved = true;
    const dt = e.timeStamp - s.lastT; if (dt > 0) s.v = (e.clientY - s.lastY) / dt;
    s.lastY = e.clientY; s.lastT = e.timeStamp;
    s.cur = Math.max(0, s.base + dy); setDrag(s.cur);
  };
  const up = () => {
    const s = g.current; if (s.cur === null) return;
    const cur = s.cur; s.cur = null; setDrag(null);
    if (!s.moved) return;
    if (!snaps.length) {
      const h = ref.current?.offsetHeight ?? vh;
      if (dismissible && (cur > h * 0.3 || s.v > 0.6)) requestClose();
      return;
    }
    const visible = height - cur;
    if (s.v > 0.6) { if (snap === 0) { if (dismissible) requestClose(); } else setSnap(snap - 1); return; }
    if (s.v < -0.6) { setSnap(snap + 1); return; }
    if (dismissible && visible < (height - offsetOf(0)) * 0.5) { requestClose(); return; }
    let best = 0, dist = Infinity;
    snaps.forEach((_, i) => { const d = Math.abs(height - offsetOf(i) - visible); if (d < dist) { dist = d; best = i; } });
    setSnap(best);
  };
  const handleClick = () => { if (g.current.moved) { g.current.moved = false; return; } setSnap(snap === snaps.length - 1 ? 0 : snap + 1); };
  const handleKey = (e: RKeyboardEvent) => {
    if (e.key === "ArrowUp") { e.preventDefault(); setSnap(snap + 1); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setSnap(snap - 1); }
  };
  const dragProps = { onPointerDown: down, onPointerMove: move, onPointerUp: up, onPointerCancel: up };
  const style = { "--d-sheet-y": `${y}px`, ...(snaps.length ? { "--d-sheet-h": `${height}px` } : {}) } as CSSProperties;

  return (
    <dialog ref={ref} className={cx("d-sheet", className)} aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-describedby={description ? descId : undefined}
      data-snap={snaps.length ? "" : undefined} data-dragging={drag !== null || undefined} data-state={closing ? "closing" : undefined} style={style}
      onKeyDown={(e) => { if (e.key !== "Escape") return; e.preventDefault(); if (dismissible) requestClose(); }}
      onCancel={(e) => { e.preventDefault(); if (dismissible) requestClose(); }}
      onClose={() => requestClose()}
      onPointerDown={(e) => backdrop.current?.pointerdown(e.nativeEvent)}
      onClick={(e) => { if (backdrop.current?.click(e.nativeEvent) && dismissible) requestClose(); }}>
      <div className="d-sheet__panel">
        <div className="d-sheet__grip" role="presentation" {...dragProps}>
          {snaps.length > 1
            ? <button type="button" className="d-sheet__handle" aria-label={handleLabel} title={handleLabel} onClick={handleClick} onKeyDown={handleKey} />
            : <span className="d-sheet__handle" aria-hidden="true" />}
        </div>
        {(title || description || showClose) && (
          <header className="d-overlay__head" {...dragProps}>
            <div className="d-overlay__titles">
              {title && <h2 id={titleId} className="d-overlay__title">{title}</h2>}
              {description && <p id={descId} className="d-overlay__desc">{description}</p>}
            </div>
            {showClose && <button type="button" className="d-overlay__close" aria-label={closeLabel} onClick={requestClose}><Icon name="close" size={16} /></button>}
          </header>
        )}
        {children && <div className="d-overlay__body">{children}</div>}
        {footer && <footer className="d-overlay__footer">{footer}</footer>}
      </div>
    </dialog>
  );
}
