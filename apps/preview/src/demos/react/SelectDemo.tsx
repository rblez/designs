import { useState } from "react";
import { Select } from "@rblez-ui/react";
import type { SelectOption } from "@rblez-ui/tokens";

const regions: SelectOption[] = [
  { value: "mad", label: "Madrid (eu-south)", icon: "globe" },
  { value: "fra", label: "Frankfurt (eu-central)", icon: "globe" },
  { value: "iad", label: "Virginia (us-east)", icon: "globe" },
  { value: "sfo", label: "San Francisco (us-west)", icon: "globe" },
  { value: "gru", label: "São Paulo (sa-east)", icon: "globe", disabled: true },
];
const roles: SelectOption[] = [
  { value: "owner", label: "Propietario" },
  { value: "admin", label: "Administrador" },
  { value: "member", label: "Miembro" },
  { value: "viewer", label: "Solo lectura" },
];

export default function SelectDemo() {
  const [region, setRegion] = useState("mad");
  const [role, setRole] = useState<string>();
  return (
    <div className="demo-stack">
      <Select label="Región" options={regions} value={region} onChange={setRegion} hint="Donde se despliega tu proyecto." searchable />
      <Select label="Rol" options={roles} value={role} onChange={setRole} placeholder="Elige un rol" error={role ? undefined : "Elige un rol para continuar."} />
    </div>
  );
}
