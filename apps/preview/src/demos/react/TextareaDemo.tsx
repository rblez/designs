import { useState } from "react";
import { Textarea } from "@designs/react";

export default function TextareaDemo() {
  const [bio, setBio] = useState("");
  return (
    <div className="demo-stack">
      <Textarea label="Bio" placeholder="Cuéntanos sobre ti" value={bio} onChange={(e) => setBio(e.target.value)}
        hint={`${bio.length}/160`} maxLength={160} />
    </div>
  );
}
