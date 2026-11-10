import type { SidebarSection } from "@rblez-ui/tokens";

export interface SidebarProps { sections: SidebarSection[]; active?: string; label?: string; onNavigate?: (href: string) => void }

export function Sidebar({ sections, active, label = "Navegación", onNavigate }: SidebarProps) {
  return (
    <nav className="d-sidebar" aria-label={label}>
      {sections.map((s) => (
        <div className="d-sidebar__section" key={s.title}>
          <p className="d-sidebar__title">{s.title}</p>
          {s.items.map((it) => (
            <a key={it.href} className="d-sidebar__item" href={it.href} aria-current={it.href === active ? "page" : undefined}
              onClick={() => onNavigate?.(it.href)}>
              <span>{it.label}</span>
              {it.badge && <span className="d-badge d-badge--outline" style={{ height: 18, fontSize: 10, padding: "0 6px" }}>{it.badge}</span>}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}
