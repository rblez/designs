import type { ReactNode } from "react";
export function Kbd({ children }: { children?: ReactNode }) {
  return <kbd className="d-kbd">{children}</kbd>;
}
