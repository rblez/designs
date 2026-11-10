import { useSyncExternalStore } from "react";
import { toaster, type ToastItem, type ToastPosition } from "@rblez-ui/tokens";
import { checkCircle, exclamationCircle, exclamationTriangle, informationCircle } from "@rblez-ui/tokens/heroicons";
import { Icon } from "./Icon";

export interface ToasterProps {
  position?: ToastPosition;
  /** Máximo de toasts visibles a la vez (los más recientes). */
  max?: number;
  /** Etiqueta de la región para lectores de pantalla. */
  label?: string;
  closeLabel?: string;
  /** Muestra el icono de estado. */
  icons?: boolean;
}

const iconOf = { default: informationCircle, success: checkCircle, warning: exclamationTriangle, danger: exclamationCircle };
const empty: ToastItem[] = [];

export function Toaster({ position = "bottom-right", max = 3, label = "Notificaciones", closeLabel = "Cerrar", icons = true }: ToasterProps) {
  const items = useSyncExternalStore(toaster.subscribe, toaster.get, () => empty);
  const visible = items.slice(-Math.max(1, max)).reverse();
  return (
    <section className="d-toaster-region" aria-label={label}>
      <ol className="d-toaster" data-position={position} aria-live="polite" aria-relevant="additions text"
        onPointerEnter={toaster.pause} onPointerLeave={toaster.resume} onFocus={toaster.pause} onBlur={toaster.resume}>
        {visible.map((t) => (
          <li key={t.id} className={`d-toast d-toast--${t.variant}`} data-leaving={t.leaving || undefined} aria-atomic="true">
            {icons && <Icon icon={iconOf[t.variant]} size={18} className="d-icon d-toast__icon" />}
            <div className="d-toast__text">
              {t.title && <p className="d-toast__title">{t.title}</p>}
              {t.description && <p className="d-toast__desc">{t.description}</p>}
            </div>
            {t.action && <button type="button" className="d-toast__action" onClick={() => { t.action?.onClick(); toaster.dismiss(t.id); }}>{t.action.label}</button>}
            {t.dismissible && <button type="button" className="d-toast__close" aria-label={closeLabel} onClick={() => toaster.dismiss(t.id)}><Icon name="close" size={14} /></button>}
          </li>
        ))}
      </ol>
    </section>
  );
}
