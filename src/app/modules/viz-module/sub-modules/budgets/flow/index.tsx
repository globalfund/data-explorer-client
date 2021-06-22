/* third-party */
import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { SlideInContainer } from "app/components/SlideInPanel";
import { BudgetsFlow } from "app/components/Charts/Budgets/Flow";
import { TransitionContainer } from "app/components/TransitionContainer";
import { BudgetsFlowData } from "app/components/Charts/Budgets/Flow/data";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";

export function BudgetsFlowModule() {
  useTitle("The Data Explorer - Budgets Flow");
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

  // api call & data
  const fetchData = useStoreActions((store) => store.BudgetsFlow.fetch);
  const data = useStoreState(
    (state) => get(state.BudgetsFlow.data, "data", []) as BudgetsFlowData
  );
  const isLoading = useStoreState((state) => state.BudgetsFlow.loading);

  React.useEffect(() => fetchData({}), []);

  if (isLoading) {
    return <PageLoader />;
  }

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
      <TransitionContainer vizScale={1} vizTranslation={vizTranslation}>
        {(vizLevel === 0 || vizLevel === 1) && (
          <BudgetsFlow
            data={data}
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
