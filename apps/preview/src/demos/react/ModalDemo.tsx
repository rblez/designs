import { useState } from "react";
import { Button, Input, Modal } from "@rblez-ui/react";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="demo-row">
        <Button variant="outline" onClick={() => setOpen(true)}>Renombrar proyecto</Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Renombrar proyecto" description="El nombre aparece en la URL y en el panel." size="sm"
        footer={<>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="brand" onClick={() => setOpen(false)}>Guardar</Button>
        </>}>
        <Input label="Nombre" defaultValue="rblez-ui" />
      </Modal>
    </>
  );
}
