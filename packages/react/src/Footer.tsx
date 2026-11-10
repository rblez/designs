import type { ReactNode, CSSProperties } from "react";
import type { FooterColumn, FooterLink } from "@rblez-ui/tokens";

export interface FooterProps { columns: FooterColumn[]; legal?: FooterLink[]; logo?: ReactNode; logoHref?: string; label?: string }

const ext = (l: FooterLink) => ((l.external ?? /^https?:/.test(l.href)) ? { target: "_blank", rel: "noreferrer" } : {});
const Links = ({ links }: { links: FooterLink[] }) => (
  <ul>{links.map((l) => <li key={l.href + l.label}><a className="d-footer__link" href={l.href} {...ext(l)}>{l.label}</a></li>)}</ul>
);

export function Footer({ columns, legal = [], logo, logoHref = "/", label = "Footer" }: FooterProps) {
  const style = { "--d-footer-cols": columns.length + (legal.length ? 1 : 0) } as CSSProperties;
  return (
    <footer className="d-footer" aria-label={label}>
      <div className="d-footer__inner">
        {logo && <a className="d-footer__logo" href={logoHref} aria-label="Home">{logo}</a>}
        <div className="d-footer__cols" style={style}>
          {columns.map((c) => (
            <nav className="d-footer__col" aria-label={c.title} key={c.title}>
              <h3 className="d-footer__title">{c.title}</h3><Links links={c.links} />
            </nav>
          ))}
          {legal.length > 0 && (
            <nav className="d-footer__col d-footer__col--legal" aria-label="Legal">
              <h3 className="d-footer__title">Legal</h3><Links links={legal} />
            </nav>
          )}
        </div>
      </div>
      {legal.length > 0 && (
        <div className="d-footer__bar">{legal.map((l) => <a key={l.href + l.label} className="d-footer__link" href={l.href} {...ext(l)}>{l.label}</a>)}</div>
      )}
    </footer>
  );
}
