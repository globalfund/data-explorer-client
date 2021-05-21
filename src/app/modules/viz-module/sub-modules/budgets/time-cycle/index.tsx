/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { SlideInContainer } from "app/components/SlideInPanel";
import { mockdata } from "app/components/Charts/Budgets/TimeCycle/data";
import { TransitionContainer } from "app/components/TransitionContainer";
import { BudgetsTimeCycle } from "app/components/Charts/Budgets/TimeCycle";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";

export function BudgetsTimeCycleModule() {
  useTitle("The Data Explorer - Budgets Time/Cycle");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizPrevTranslation, setVizPrevTranslation] = React.useState({
    x: 0,
    y: 0,
  });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );
  const [vizPrevSelected, setVizPrevSelected] = React.useState<
    string | undefined
  >(undefined);

  return (
    <div
      id="budgets-time-cycle"
      css={`
        width: 100%;

        ${!vizSelected
          ? `* {
      overflow: visible !important;
    }`
          : ""}
      `}
    >
      <TransitionContainer vizScale={1} vizTranslation={vizTranslation}>
        {(vizLevel === 0 || vizLevel === 1) && (
          <BudgetsTimeCycle
            data={mockdata}
            selectedNodeId={vizSelected}
            onNodeClick={(node: string, x: number, y: number) => {
              setVizLevel(1);
              setVizSelected(node);
              setVizTranslation({ x: x * -1, y: 0 });
            }}
          />
        )}
        {vizLevel === 2 && (
          <DisbursementsTreemap
            data={mockdata2}
            selectedNodeId={vizSelected}
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        )}
      </TransitionContainer>
      <SlideInContainer
        vizLevel={vizLevel}
        selected={vizSelected}
        close={() => {
          setVizLevel(vizLevel - 1);
          setVizSelected(undefined);
          setVizSelected(vizLevel === 1 ? undefined : vizPrevSelected);
          setVizTranslation(
            vizLevel === 1 ? { x: 0, y: 0 } : vizPrevTranslation
          );
        }}
      >
        <DisbursementsTreemap
          data={mockdata2}
          onNodeClick={(node: string, x: number, y: number) => {
            setVizLevel(2);
            setVizPrevSelected(vizSelected);
            setVizSelected(node);
            setVizPrevTranslation(vizTranslation);
            setVizTranslation({ x: x * -1, y: 0 });
          }}
        />
      </SlideInContainer>
    </div>
  );
}
