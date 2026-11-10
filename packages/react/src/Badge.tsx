import type { ReactNode } from "react";
import { cx, type BadgeVariant } from "@rblez-ui/tokens";

export function Badge({ variant = "secondary", dot = false, children }: { variant?: BadgeVariant; dot?: boolean; children?: ReactNode }) {
  return <span className={cx("d-badge", `d-badge--${variant}`)}>{dot && <span className="d-badge__dot" />}{children}</span>;
}
