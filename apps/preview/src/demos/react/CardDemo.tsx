import { Card, Button, Input } from "@designs/react";

export default function CardDemo() {
  return (
    <div className="demo-narrow">
      <Card title="Crear proyecto" description="Despliega tu nuevo proyecto en un clic."
        footer={<><Button variant="ghost">Cancelar</Button><Button>Crear</Button></>}>
        <Input label="Nombre" placeholder="designs" />
      </Card>
    </div>
  );
}
