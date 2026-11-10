import { useState } from "react";
import { PromptInput } from "@designs/react";
import type { PromptSubmit } from "@designs/tokens";

export function ReactPrompt() {
  const [last, setLast] = useState<PromptSubmit | null>(null);
  return (
    <>
      <PromptInput theme="light" onSubmit={setLast} />
      <p className="out out--dark">
        {last ? `→ "${last.value}"${last.plan ? " · plan" : ""}${last.files.length ? ` · ${last.files.length} archivo(s)` : ""}` : "Enter envía · Shift+Enter nueva línea"}
      </p>
    </>
  );
}
