/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { SlideInContainer } from "app/components/SlideInPanel";
import { TransitionContainer } from "app/components/TransitionContainer";
import { mockdata } from "app/components/Charts/Investments/TimeCycle/data";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsTimeCycle } from "app/components/Charts/Investments/TimeCycle";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";

export function InvestmentsTimeCycleModule() {
  useTitle("The Data Explorer - Investments/Time cycle");
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
      id="investments-time-cycle"
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
          <InvestmentsTimeCycle
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
          setVizTranslation({ x: 0, y: 0 });
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
