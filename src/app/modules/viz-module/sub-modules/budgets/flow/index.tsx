/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { SlideInContainer } from "app/components/SlideInPanel";
import { BudgetsFlow } from "app/components/Charts/Budgets/Flow";
import { mockdata } from "app/components/Charts/Budgets/Flow/data";
import { TransitionContainer } from "app/components/TransitionContainer";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";

export function BudgetsFlowModule() {
  useTitle("The Data Explorer - Budgets Flow");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizScale, setVizScale] = React.useState(1);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  return (
    <div
      css={`
        width: 100%;

        ${!vizSelected
          ? `* {
        overflow: visible !important;
      }`
          : ""}
      `}
    >
      <TransitionContainer vizScale={vizScale} vizTranslation={vizTranslation}>
        <BudgetsFlow
          data={mockdata}
          selectedNodeId={vizSelected}
          onNodeClick={(node: string, x: number, y: number) => {
            setVizLevel(1);
            setVizSelected(node);
            setVizTranslation({ x: x * -1, y: 0 });
          }}
        />
      </TransitionContainer>
      <SlideInContainer
        vizLevel={vizLevel}
        selected={vizSelected}
        close={() => {
          setVizLevel(0);
          setVizSelected(undefined);
          setVizTranslation({ x: 0, y: 0 });
        }}
      >
        <DisbursementsTreemap
          data={mockdata2}
          onNodeClick={(node: string, x: number, y: number) => {}}
        />
      </SlideInContainer>
    </div>
  );
}
