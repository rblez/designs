import { useState } from "react";
import { PromptInput } from "@designs/react";
import type { PromptSubmit } from "@designs/tokens";

export default function PromptInputDemo() {
  const [last, setLast] = useState<PromptSubmit | null>(null);
  return (
    <div className="demo-prompt">
      <PromptInput onSubmit={setLast} />
      <p className="demo-out">{last ? `→ "${last.value}"${last.plan ? " · plan" : ""}` : "Enter envía · Shift+Enter nueva línea"}</p>
    </div>
  );
}
