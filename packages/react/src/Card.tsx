import type { ReactNode } from "react";

export function Card({ title, description, children, footer }: { title?: string; description?: string; children?: ReactNode; footer?: ReactNode }) {
  return (
    <div className="d-card">
      {(title || description) && (
        <div className="d-card__header">
          {title && <h3 className="d-card__title">{title}</h3>}
          {description && <p className="d-card__desc">{description}</p>}
        </div>
      )}
      {children && <div className="d-card__body">{children}</div>}
      {footer && <div className="d-card__footer">{footer}</div>}
    </div>
  );
}
