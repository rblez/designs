import { useState } from "react";
import { BottomSheet, Button, Switch } from "@rblez-ui/react";

export default function BottomSheetDemo() {
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState(0);
  return (
    <>
      <div className="demo-row">
        <Button variant="outline" onClick={() => setOpen(true)}>Abrir ajustes</Button>
      </div>
      <BottomSheet open={open} onClose={() => setOpen(false)} snap={snap} onSnapChange={setSnap} snapPoints={[0.45, 0.9]}
        title="Ajustes rápidos" description="Arrastra el asa para expandir o cerrar."
        footer={<Button variant="brand" onClick={() => setOpen(false)}>Listo</Button>}>
        <div className="demo-stack">
          <Switch label="Notificaciones" defaultChecked />
          <Switch label="Modo avión" />
          <Switch label="Ahorro de datos" />
        </div>
      </BottomSheet>
    </>
  );
}
