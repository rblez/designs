import { useState } from "react";
import { Input } from "@rblez-ui/react";

export default function InputDemo() {
  const [email, setEmail] = useState("");
  const invalid = email.length > 0 && !email.includes("@");
  return (
    <div className="demo-stack">
      <Input label="Email" type="email" placeholder="hello@rblez.com" value={email} onChange={(e) => setEmail(e.target.value)}
        hint="Nunca compartimos tu email." error={invalid ? "Introduce un email válido." : undefined} />
      <Input label="Subdominio" placeholder="mi-proyecto" prefix="https://" suffix=".rblez.com" />
      <Input label="Deshabilitado" placeholder="No editable" disabled size="sm" />
    </div>
  );
}
