import { GuideGrid, GuideCell } from "@rblez-ui/react";

export default function GuideGridDemo() {
  return (
    <div className="demo-gg">
      <GuideGrid columns={{ sm: 2, md: 3 }} rowHeight={96} cross>
        {[1, 2, 3, 4, 5, 6].map((n) => <GuideCell key={n}>{n}</GuideCell>)}
      </GuideGrid>

      <GuideGrid columns={3} rowHeight={96}>
        <GuideCell colSpan={2} solid cross>1 + 2</GuideCell>
        <GuideCell>3</GuideCell>
        <GuideCell>4</GuideCell>
        <GuideCell colSpan={2} solid>5 + 6</GuideCell>
      </GuideGrid>

      <GuideGrid columns={1} rowHeight={120} dashed cross>
        <GuideCell>Contenido aquí</GuideCell>
      </GuideGrid>
    </div>
  );
}
