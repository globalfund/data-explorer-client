/* third-party */
import React from "react";
import { useUnmount } from "react-use";
import { useStoreActions } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { SlideInContainer } from "app/components/SlideInPanel";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { TransitionContainer } from "app/components/TransitionContainer";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsTimeCycle } from "app/components/Charts/Investments/TimeCycle";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";

interface InvestmentsTimeCycleModuleProps {
  data: Record<string, unknown>[];
  drilldownData: BudgetsTreemapDataItem[];
  isLoading: boolean;
  isDrilldownLoading: boolean;
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
  vizTranslation: { x: number; y: number };
  setVizTranslation: (obj: { x: number; y: number }) => void;
  vizSelected: string | undefined;
  setVizSelected: (vizSelected: string | undefined) => void;
  vizPrevSelected: string | undefined;
  setVizPrevSelected: (vizPrevSelected: string | undefined) => void;
  vizPrevTranslation: { x: number; y: number };
  setVizPrevTranslation: (obj: { x: number; y: number }) => void;
  type?: string;
  toolboxOpen?: boolean;
}

export function InvestmentsTimeCycleModule(
  props: InvestmentsTimeCycleModuleProps
) {
  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );

  React.useEffect(() => {
    if (props.vizLevel === 0) {
      setVizDrilldowns([{ name: "Dataset" }]);
    }
    if (props.vizLevel > 0 && props.vizSelected) {
      setVizDrilldowns([
        { name: "Dataset" },
        { name: props.vizSelected.split("-")[0] },
      ]);
    }
  }, [props.vizLevel, props.vizSelected]);

  useUnmount(() => setVizDrilldowns([]));

  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <div
      id="investments-time-cycle"
      css={`
        width: 100%;

        ${!props.vizSelected
          ? `*:not(#bar-scroll-div) {
            overflow: visible !important;
          }`
          : ""}
      `}
    >
      <TransitionContainer vizScale={1} vizTranslation={props.vizTranslation}>
        {(props.vizLevel === 0 || props.vizLevel === 1) && (
          <InvestmentsTimeCycle
            data={props.data}
            type={props.type}
            selectedNodeId={props.vizSelected}
            onNodeClick={(node: string, x: number, y: number) => {
              props.setVizLevel(1);
              props.setVizSelected(node);
              props.setVizTranslation({ x: x * -1, y: 0 });
            }}
          />
        )}
        {props.vizLevel === 2 && (
          <DisbursementsTreemap
            data={mockdata2}
            selectedNodeId={props.vizSelected}
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        )}
      </TransitionContainer>
      <SlideInContainer
        vizLevel={props.vizLevel}
        selected={props.vizSelected}
        toolboxOpen={props.toolboxOpen}
        loading={props.isDrilldownLoading}
        close={() => {
          props.setVizLevel(props.vizLevel - 1);
          props.setVizTranslation({ x: 0, y: 0 });
          props.setVizSelected(
            props.vizLevel === 1 ? undefined : props.vizPrevSelected
          );
          props.setVizTranslation(
            props.vizLevel === 1 ? { x: 0, y: 0 } : props.vizPrevTranslation
          );
        }}
      >
        <BudgetsTreemap
          isDrilldownTreemap
          data={props.drilldownData}
          tooltipValueLabel="Disbursements"
          onNodeClick={(node: string, x: number, y: number) => {
            // props.setVizLevel(2);
            // props.setVizPrevSelected(props.vizSelected);
            // props.setVizSelected(node);
            // props.setVizPrevTranslation(props.vizTranslation);
            // props.setVizTranslation({ x: x * -1, y: 0 });
          }}
        />
      </SlideInContainer>
    </div>
  );
}
