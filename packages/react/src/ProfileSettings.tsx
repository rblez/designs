import { useEffect, useRef, useState } from "react";
import type { SettingsProfile, SettingsSection, SettingsItem, SettingsTab } from "@rblez-ui/tokens";
import { Icon } from "./Icon";

export interface ProfileSettingsProps {
  profile: SettingsProfile; sections: SettingsSection[]; tabs?: SettingsTab[];
  activeTab?: string; defaultTab?: string; title?: string; footer?: string;
  labels?: { qr: string; search: string; more: string; avatar: string };
  onSelect?: (item: SettingsItem) => void; onAvatar?: () => void; onQr?: () => void;
  onSearch?: () => void; onMore?: () => void; onTab?: (tab: SettingsTab) => void; className?: string;
}

const badgeText = (b: number | string) => (typeof b === "number" && b > 99 ? "99+" : String(b));

export function ProfileSettings({
  profile, sections, tabs = [], activeTab, defaultTab, title = "Ajustes", footer,
  labels = { qr: "Código QR", search: "Buscar", more: "Más opciones", avatar: "Cambiar foto" },
  onSelect, onAvatar, onQr, onSearch, onMore, onTab, className = "",
}: ProfileSettingsProps) {
  const root = useRef<HTMLDivElement>(null); const nameEl = useRef<HTMLHeadingElement>(null);
  const [compact, setCompact] = useState(false);
  const [tab, setTab] = useState(defaultTab ?? tabs[0]?.id);
  const current = activeTab ?? tab;
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setCompact(!e.isIntersecting), { root: root.current, rootMargin: "-64px 0px 0px 0px" });
    if (nameEl.current) io.observe(nameEl.current); return () => io.disconnect();
  }, []);
  const meta = [profile.phone, profile.username && `@${profile.username.replace(/^@/, "")}`].filter(Boolean).join(" • ");
  const initials = profile.initials ?? profile.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const Row = ({ it }: { it: SettingsItem }) => {
    const inner = (<>
      {it.image ? <span className="d-ps__tile"><img src={it.image} alt="" /></span>
        : it.icon && <span className="d-ps__tile" data-color={it.color ?? "gray"}><Icon name={it.icon} variant="fill" size={20} /></span>}
      <span className="d-ps__text"><span className="d-ps__label">{it.label}</span>{it.description && <span className="d-ps__desc">{it.description}</span>}</span>
      {it.value && <span className="d-ps__value">{it.value}</span>}
      {it.badge != null && <span className="d-ps__badge">{badgeText(it.badge)}</span>}
      {it.chevron && <span className="d-ps__chev"><Icon name="chevronRight" /></span>}
    </>);
    return it.href
      ? <a className="d-ps__row" href={it.href} onClick={() => onSelect?.(it)}>{inner}</a>
      : <button type="button" className="d-ps__row" onClick={() => onSelect?.(it)}>{inner}</button>;
  };

  return (
    <div className={`d-ps ${className}`} ref={root} data-compact={compact}>
      <div className="d-ps__bar">
        <span className="d-ps__pill"><button type="button" aria-label={labels.qr} onClick={onQr}><Icon name="qrCode" /></button></span>
        <span className="d-ps__title" aria-hidden={!compact}>{title}</span>
        <span className="d-ps__pill">
          <button type="button" aria-label={labels.search} onClick={onSearch}><Icon name="search" /></button>
          <button type="button" aria-label={labels.more} onClick={onMore}><Icon name="ellipsisVertical" /></button>
        </span>
      </div>
      <header className="d-ps__head">
        <button type="button" className="d-ps__avatar" aria-label={labels.avatar} onClick={onAvatar}>
          {profile.avatar ? <img src={profile.avatar} alt="" /> : initials}
          <span className="d-ps__cam"><Icon name="camera" /></span>
        </button>
        <h2 className="d-ps__name" ref={nameEl}>{profile.name}</h2>
        {meta && <p className="d-ps__meta">{meta}</p>}
      </header>
      <div className="d-ps__body">
        {sections.map((s, i) => (
          <section className="d-ps__group" aria-label={s.title} key={s.title ?? i}>
            {s.title && <div className="d-ps__group-title">{s.title}</div>}
            {s.items.map((it) => <Row it={it} key={it.id} />)}
          </section>
        ))}
        {footer && <p className="d-ps__foot">{footer}</p>}
      </div>
      {tabs.length > 0 && (
        <nav className="d-ps__tabs" aria-label="Tabs">
          {tabs.map((t) => (
            <button type="button" key={t.id} className="d-ps__tab" aria-current={current === t.id ? "page" : undefined}
              onClick={() => { setTab(t.id); onTab?.(t); }}>
              {t.image ? <img src={t.image} alt="" /> : t.icon && (current === t.id ? <Icon name={t.icon} variant="fill" size={24} /> : <Icon name={t.icon} />)}
              {t.label}
              {t.badge ? <span className="d-ps__tab-badge">{badgeText(t.badge)}</span> : null}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
