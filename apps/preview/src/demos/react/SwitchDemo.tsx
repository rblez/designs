import { useState } from "react";
import { Switch } from "@rblez-ui/react";

export default function SwitchDemo() {
  const [notifications, setNotifications] = useState(true);
  return (
    <div className="demo-stack">
      <Switch label="Notificaciones" checked={notifications} onCheckedChange={setNotifications} />
      <Switch label="Modo avión" />
      <Switch label="Deshabilitado" disabled />
    </div>
  );
}
