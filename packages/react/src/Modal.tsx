import { useEffect, useId, useRef, type ReactNode } from "react";
import { backdropClick, cx, openDialog, type ModalSize } from "@rblez-ui/tokens";
import { Icon } from "./Icon";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  size?: ModalSize;
  /** Cerrar al pulsar el fondo. */ closeOnBackdrop?: boolean;
  /** Cerrar con Esc. */ closeOnEsc?: boolean;
  /** Botón × en la cabecera. */ showClose?: boolean;
  closeLabel?: string;
  className?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, description, size = "md", closeOnBackdrop = true, closeOnEsc = true, showClose = true, closeLabel = "Cerrar", className, children, footer }: ModalProps) {
  const uid = useId();
  const titleId = `d-modal-${uid}-title`;
  const descId = `d-modal-${uid}-desc`;
  const ref = useRef<HTMLDialogElement>(null);
  const backdrop = useRef<ReturnType<typeof backdropClick>>();
  const state = useRef({ open, onClose });
  state.current = { open, onClose };
  const requestClose = () => { if (state.current.open) state.current.onClose?.(); };

  useEffect(() => {
    const d = ref.current;
    if (!open || !d) return;
    backdrop.current = backdropClick(d);
    return openDialog(d);
  }, [open]);

  return (
    <dialog ref={ref} className={cx("d-modal", size !== "md" && `d-modal--${size}`, className)} aria-modal="true"
      aria-labelledby={title ? titleId : undefined} aria-describedby={description ? descId : undefined}
      onKeyDown={(e) => { if (e.key !== "Escape") return; e.preventDefault(); if (closeOnEsc) requestClose(); }}
      onCancel={(e) => { e.preventDefault(); if (closeOnEsc) requestClose(); }}
      onClose={() => requestClose()}
      onPointerDown={(e) => backdrop.current?.pointerdown(e.nativeEvent)}
      onClick={(e) => { if (backdrop.current?.click(e.nativeEvent) && closeOnBackdrop) requestClose(); }}>
      {open && (
        <div className="d-modal__panel">
          {(title || description || showClose) && (
            <header className="d-overlay__head">
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
      )}
    </dialog>
  );
}
