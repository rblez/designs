import { useState } from "react";
import { Button } from "@rblez-ui/react";

export default function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="demo-row">
      <Button variant="brand">Build now</Button>
      <Button>Deploy</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button loading={loading} onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}>
        {loading ? "Saving" : "Save"}
      </Button>
    </div>
  );
}
