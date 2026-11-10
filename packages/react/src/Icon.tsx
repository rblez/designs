import { icons, type IconName } from "@designs/tokens";

export function Icon({ name, className = "d-prompt__icon" }: { name: IconName; className?: string }) {
  const icon = icons[name];
  return (
    <svg className={className} viewBox={icon.viewBox} aria-hidden="true"
      fill={icon.stroke ? "none" : "currentColor"} stroke={icon.stroke ? "currentColor" : "none"}
      strokeWidth={icon.stroke ? 1.5 : undefined} strokeLinecap="round" strokeLinejoin="round">
      <path d={icon.d} />
    </svg>
  );
}
