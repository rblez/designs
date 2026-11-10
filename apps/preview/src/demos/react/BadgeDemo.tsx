import { Badge } from "@rblez-ui/react";

export default function BadgeDemo() {
  return (
    <div className="demo-row">
      <Badge variant="default">Nuevo</Badge>
      <Badge>Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="brand">Pro</Badge>
      <Badge variant="success" dot>Ready</Badge>
      <Badge variant="warning" dot>Building</Badge>
      <Badge variant="danger" dot>Error</Badge>
    </div>
  );
}
