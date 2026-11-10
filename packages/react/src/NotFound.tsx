import type { MouseEvent } from "react";
import { notFoundArt } from "@rblez-ui/tokens";

export interface NotFoundProps {
  title?: string; description?: string; actionLabel?: string; href?: string; grid?: boolean;
  onAction?: (e: MouseEvent<HTMLAnchorElement>) => void; className?: string;
}

export function NotFound({
  title = "The page you’re looking for has wandered off, but don’t worry!",
  description = "Let’s get you back on track.",
  actionLabel = "Take me home",
  href = "/", grid = true, onAction, className = "",
}: NotFoundProps) {
  return (
    <section className={["d-404", grid && "d-404--grid", className].filter(Boolean).join(" ")} aria-labelledby="d-404-title">
      <div className="d-404__in">
      <div className="d-404__art" dangerouslySetInnerHTML={{ __html: notFoundArt }} />
      <div className="d-404__copy">
        <h1 id="d-404-title" className="d-404__title">{title}</h1>
        <p className="d-404__text">{description}</p>
        <a className="d-404__action" href={href} onClick={onAction}>{actionLabel}</a>
      </div>
      </div>
    </section>
  );
}
