import { useState } from "react";
import { Button } from "@designs/react";

export function ReactDemo() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="row">
        <Button onClick={() => setCount((c) => c + 1)}>Clicks: {count}</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </>
  );
}
