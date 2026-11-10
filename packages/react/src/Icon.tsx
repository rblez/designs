import { icons, type IconName } from "@rblez-ui/tokens";

export function Icon({ name, className = "d-icon", size }: { name: IconName; className?: string; size?: number }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      {icons[name].paths.map((p) => (
        <path key={p.d} d={p.d} fillRule={"evenodd" in p ? "evenodd" : undefined} clipRule={"evenodd" in p ? "evenodd" : undefined} />
      ))}
    </svg>
  );
}
