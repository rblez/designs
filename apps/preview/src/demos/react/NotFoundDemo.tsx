import { NotFound } from "@rblez-ui/react";

export default function NotFoundDemo() {
  return (
    <NotFound
      title="La página que buscas se ha perdido, pero no te preocupes."
      description="Vamos a devolverte al buen camino."
      actionLabel="Llévame al inicio"
      href="/"
    />
  );
}
