import { useState } from "react";
import { Sidebar } from "@rblez-ui/react";

const sections = [
  { title: "Workspace", items: [
    { label: "Inbox", href: "#inbox", badge: "12" },
    { label: "Proyectos", href: "#projects" },
    { label: "Deployments", href: "#deployments" },
  ] },
  { title: "Cuenta", items: [
    { label: "Ajustes", href: "#settings" },
    { label: "Facturación", href: "#billing" },
  ] },
];

export default function SidebarDemo() {
  const [active, setActive] = useState("#inbox");
  return (
    <div className="demo-sidebar" onClickCapture={(e) => e.preventDefault()}>
      <Sidebar sections={sections} active={active} label="Demo" onNavigate={setActive} />
    </div>
  );
}
