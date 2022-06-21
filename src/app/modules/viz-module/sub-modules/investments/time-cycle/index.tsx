/* third-party */
import React from "react";
import { useUnmount } from "react-use";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useStoreActions } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { VizBackBtn } from "app/components/Charts/common/backbtn";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
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
  setOpenToolboxPanel?: (value: boolean) => void;
}

export function InvestmentsTimeCycleModule(
  props: InvestmentsTimeCycleModuleProps
) {
  const [xsTooltipData, setXsTooltipData] =
    React.useState<TreeMapNodeDatum | null>(null);
  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );

  React.useEffect(() => {
    if (props.vizLevel === 0) {
      setVizDrilldowns([{ name: `${props.type}-time cycle` }]);
    }
    if (props.vizLevel > 0 && props.vizSelected) {
      setVizDrilldowns([
        { name: `${props.type}-time cycle` },
        { name: props.vizSelected.split("-")[0] },
      ]);
    }
  }, [props.vizLevel, props.vizSelected]);

  useUnmount(() => setVizDrilldowns([]));

  let vizComponent = <React.Fragment />;

  if (props.isLoading || props.isDrilldownLoading) {
    vizComponent = <PageLoader />;
  } else {
    if (props.vizLevel === 0) {
      vizComponent = (
        <InvestmentsTimeCycle
          data={props.data}
          type={props.type}
          // selectedNodeId={props.vizSelected}
          onNodeClick={(node: string, x: number, y: number) => {
            props.setVizLevel(1);
            props.setVizSelected(node);
            props.setVizTranslation({ x: x * -1, y: 0 });
          }}
        />
      );
    } else if (props.vizLevel === 1) {
      vizComponent = (
        <BudgetsTreemap
          data={props.drilldownData}
          xsTooltipData={xsTooltipData}
          tooltipValueLabel="Disbursements"
          setXsTooltipData={setXsTooltipData}
          onNodeClick={(node: string, x: number, y: number) => {
            // props.setVizLevel(2);
            // props.setVizPrevSelected(props.vizSelected);
            // props.setVizSelected(node);
            // props.setVizPrevTranslation(props.vizTranslation);
            // props.setVizTranslation({ x: x * -1, y: 0 });
          }}
        />
      );
    } else if (props.vizLevel === 2) {
      vizComponent = (
        <DisbursementsTreemap
          data={mockdata2}
          selectedNodeId={props.vizSelected}
          onNodeClick={(node: string, x: number, y: number) => {}}
        />
      );
    }
  }

  return (
    <div
      id="investments-time-cycle"
      css={`
        width: 100%;

        * {
          overflow: visible !important;
        }
      `}
    >
      {props.vizLevel > 0 && (
        <VizBackBtn
          vizLevel={props.vizLevel}
          setVizLevel={props.setVizLevel}
          setOpenToolboxPanel={props.setOpenToolboxPanel}
        />
      )}
      {vizComponent}
    </div>
  );
}
