import { Button, Toaster, toast } from "@rblez-ui/react";

export default function ToastDemo() {
  return (
    <>
      <div className="demo-row">
        <Button variant="outline" onClick={() => toast("Cambios guardados", { description: "Tu perfil está al día." })}>Default</Button>
        <Button variant="outline" onClick={() => toast.success("Desplegado", { description: "rblez-ui · producción", action: { label: "Ver", onClick: () => {} } })}>Success</Button>
        <Button variant="outline" onClick={() => toast.warning("Cuota al 80%", { description: "Quedan 2 GB este mes." })}>Warning</Button>
        <Button variant="outline" onClick={() => toast.danger("Error al desplegar", { description: "Revisa los logs del build.", duration: 0 })}>Danger</Button>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}
