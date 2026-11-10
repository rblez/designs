import { Pressable, Text, useColorScheme, type PressableProps } from "react-native";
import { buttonSize, color, font, radius, type ButtonSize, type ButtonVariant } from "@designs/tokens";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ title, variant = "solid", size = "md", disabled, style, ...rest }: ButtonProps) {
  const c = color[useColorScheme() === "dark" ? "dark" : "light"];
  const s = buttonSize[size];
  const solid = variant === "solid";
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        {
          paddingVertical: s.padY,
          paddingHorizontal: s.padX,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: variant === "outline" ? c.line : "transparent",
          backgroundColor: solid ? c.accent : "transparent",
          opacity: disabled ? 0.45 : state.pressed ? 0.85 : 1,
          alignItems: "center",
        },
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      <Text style={{ color: solid ? c.accentInk : c.ink, fontSize: s.fontSize, fontWeight: font.weight.medium }}>
        {title}
      </Text>
    </Pressable>
  );
}
