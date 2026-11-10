/** Design tokens compartidos por Svelte y React. */
export const color = {
  light: {
    bg: "#f7f7f4",
    ink: "#26251e",
    muted: "rgba(38, 37, 30, 0.55)",
    line: "rgba(38, 37, 30, 0.12)",
    accent: "#26251e",
    accentInk: "#f7f7f4",
  },
  dark: {
    bg: "#14120b",
    ink: "#edecec",
    muted: "rgba(237, 236, 236, 0.55)",
    line: "rgba(237, 236, 236, 0.14)",
    accent: "#edecec",
    accentInk: "#14120b",
  },
} as const;

export const space = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48 } as const;
export const radius = { sm: 6, md: 10, lg: 14, full: 999 } as const;
export const font = {
  sans: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, Roboto, system-ui, sans-serif',
  mono: 'ui-monospace, "SF Mono", "Geist Mono", "Source Code Pro", monospace',
  size: { xs: 12, sm: 14, md: 16, lg: 20, xl: 28 },
  weight: { regular: "400", medium: "500", semibold: "600" },
} as const;

export type Scheme = keyof typeof color;
export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export const buttonSize: Record<ButtonSize, { padY: number; padX: number; fontSize: number }> = {
  sm: { padY: space[1] + 2, padX: space[3], fontSize: font.size.sm },
  md: { padY: space[2], padX: space[4], fontSize: font.size.md },
  lg: { padY: space[3], padX: space[5], fontSize: font.size.lg },
};

export * from "./icons";
export * from "./prompt";
