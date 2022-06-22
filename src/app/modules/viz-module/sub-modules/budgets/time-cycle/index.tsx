/* third-party */
import React from "react";
import { useUnmount } from "react-use";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useStoreActions } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { VizBackBtn } from "app/components/Charts/common/backbtn";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { BudgetsTimeCycle } from "app/components/Charts/Budgets/TimeCycle";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";

interface BudgetsTimeCycleModuleProps {
  data: Record<string, unknown>[];
  isLoading: boolean;
  isDrilldownLoading: boolean;
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
  vizTranslation: { x: number; y: number };
  setVizTranslation: (obj: { x: number; y: number }) => void;
  vizSelected: string | undefined;
  setVizSelected: (vizSelected: string | undefined) => void;
  vizCompData: any;
  setVizCompData: (comps: any) => void;
  vizPrevTranslation: { x: number; y: number };
  setVizPrevTranslation: (obj: { x: number; y: number }) => void;
  vizPrevSelected: string | undefined;
  setVizPrevSelected: (vizPrevSelected: string | undefined) => void;
  dataDrilldownLevel1: BudgetsTreemapDataItem[];
  dataDrilldownLevel2: BudgetsTreemapDataItem[];
  drilldownVizSelected: string | undefined;
  setDrilldownVizSelected: (drilldownVizSelected: string | undefined) => void;
  toolboxOpen?: boolean;
  setOpenToolboxPanel?: (value: boolean) => void;
}

export function BudgetsTimeCycleModule(props: BudgetsTimeCycleModuleProps) {
  const history = useHistory();
  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );
  const [xsTooltipData, setXsTooltipData] =
    React.useState<TreeMapNodeDatum | null>(null);

  React.useEffect(() => {
    if (props.vizLevel === 0) {
      setVizDrilldowns([{ name: "Budget-time cycle" }]);
    }
    if (props.vizLevel > 0 && props.vizSelected && props.vizSelected) {
      const newDrilldowns = [
        { name: "Budget-time cycle" },
        { name: props.vizSelected },
      ];
      if (props.vizLevel === 2 && props.drilldownVizSelected) {
        const idSplits = props.drilldownVizSelected.split("-");
        const firstDrillDown = idSplits.length > 2 ? idSplits[2] : idSplits[1];
        const secondDrillDown =
          idSplits.length > 2 ? `${idSplits[0]}-${idSplits[1]}` : idSplits[0];
        newDrilldowns.push(
          {
            name: firstDrillDown,
          },
          {
            name: secondDrillDown,
          }
        );
      }
      setVizDrilldowns(newDrilldowns);
    }
  }, [props.vizLevel, props.vizSelected, props.drilldownVizSelected]);

  useUnmount(() => setVizDrilldowns([]));

  let vizComponent = <React.Fragment />;

  if (props.isLoading || props.isDrilldownLoading) {
    vizComponent = <PageLoader />;
  } else {
    if (props.vizLevel === 0) {
      vizComponent = (
        <BudgetsTimeCycle
          data={props.data}
          vizCompData={props.vizCompData}
          // selectedNodeId={props.vizSelected}
          setVizCompData={props.setVizCompData}
          onNodeClick={(node: string, x: number, y: number) => {
            props.setVizLevel(1);
            props.setVizSelected(node);
            props.setVizTranslation({ x: x * -1, y: 0 });
          }}
        />
      );
    } else if (props.vizLevel === 1) {
      vizComponent = (
        <React.Fragment>
          <BudgetsTreemap
            isDrilldownTreemap
            tooltipValueLabel="Budget"
            xsTooltipData={xsTooltipData}
            data={props.dataDrilldownLevel1}
            setXsTooltipData={setXsTooltipData}
            onNodeClick={(node: string, x: number, y: number) => {
              props.setVizLevel(2);
              props.setVizPrevSelected(props.vizSelected);
              props.setDrilldownVizSelected(node);
              props.setVizPrevTranslation(props.vizTranslation);
              props.setVizTranslation({ x: x * -1, y: 0 });
            }}
          />
        </React.Fragment>
      );
    } else if (props.vizLevel === 2) {
      vizComponent = (
        <BudgetsTreemap
          isDrilldownTreemap
          tooltipValueLabel="Budget"
          data={props.dataDrilldownLevel2}
          selectedNodeId={props.vizSelected}
          onNodeClick={(node: string, x: number, y: number) => {
            if (props.drilldownVizSelected) {
              const idSplits = props.drilldownVizSelected.split("-");
              let code = node.replace(idSplits[0], "");
              code = code.slice(0, code.length - 1);
              history.push(`/grant/${code}/1/budgets/time-cycle`);
            }
          }}
        />
      );
    }
  }

  return (
    <div
      id="budgets-time-cycle"
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
