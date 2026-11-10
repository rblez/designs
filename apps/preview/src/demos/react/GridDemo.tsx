import { useState } from "react";
import { Button, Grid, GridItem } from "@rblez-ui/react";
import type { GridVariant } from "@rblez-ui/tokens";

const variants: GridVariant[] = ["bento", "auto-fit", "columns", "masonry", "split"];
const heights = [64, 112, 80, 136, 72, 96];

export default function GridDemo() {
  const [variant, setVariant] = useState<GridVariant>("bento");
  return (
    <div className="demo-grid">
      <div className="demo-row" role="group" aria-label="Tipo de grid">
        {variants.map((v) => (
          <Button key={v} size="sm" variant={v === variant ? "solid" : "outline"} aria-pressed={v === variant} onClick={() => setVariant(v)}>{v}</Button>
        ))}
      </div>

      {variant === "bento" && (
        <Grid variant="bento" cols={{ base: 2, md: 4 }} rowHeight={88} gap={12}>
          <GridItem colSpan={2} rowSpan={2} className="demo-tile demo-tile--brand">2 × 2</GridItem>
          <GridItem colSpan={2} className="demo-tile">2 × 1</GridItem>
          <GridItem className="demo-tile">1</GridItem>
          <GridItem className="demo-tile">1</GridItem>
          <GridItem colSpan={3} className="demo-tile">3 × 1</GridItem>
          <GridItem className="demo-tile">1</GridItem>
        </Grid>
      )}
      {variant === "auto-fit" && (
        <Grid min={140} gap={12}>
          {Array.from({ length: 6 }, (_, i) => <div key={i} className="demo-tile">min 140px · {i + 1}</div>)}
        </Grid>
      )}
      {variant === "columns" && (
        <Grid variant="columns" cols={{ base: 1, sm: 2, md: 3 }} gap={12}>
          {Array.from({ length: 6 }, (_, i) => <div key={i} className="demo-tile">1 · 2 · 3 col · {i + 1}</div>)}
        </Grid>
      )}
      {variant === "masonry" && (
        <Grid variant="masonry" cols={{ base: 2, md: 3 }} gap={12}>
          {heights.map((h, i) => <div key={i} className="demo-tile" style={{ height: h }}>{i + 1}</div>)}
        </Grid>
      )}
      {variant === "split" && (
        <Grid variant="split" sidebar={200} gap={12}>
          <aside className="demo-tile">Sidebar 200px</aside>
          <div className="demo-tile demo-tile--tall">Contenido</div>
        </Grid>
      )}
    </div>
  );
}
