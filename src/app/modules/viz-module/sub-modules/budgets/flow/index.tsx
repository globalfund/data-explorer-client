/* third-party */
import React from "react";
import { useUnmount } from "react-use";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useStoreActions } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { BudgetsFlow } from "app/components/Charts/Budgets/Flow";
import { VizBackBtn } from "app/components/Charts/common/backbtn";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";

interface BudgetsFlowModuleProps {
  nodes: {
    id: string;
    filterStr: string;
  }[];
  links: {
    value: number;
    source: string;
    target: string;
  }[];
  isLoading: boolean;
  isDrilldownLoading: boolean;
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
  vizTranslation: { x: number; y: number };
  setVizTranslation: (obj: { x: number; y: number }) => void;
  vizSelected: { id: string | undefined; filterStr: string | undefined };
  setVizSelected: (vizSelected: {
    id: string | undefined;
    filterStr: string | undefined;
  }) => void;
  vizCompData: any;
  setVizCompData: (comps: any) => void;
  vizPrevTranslation: { x: number; y: number };
  // setVizPrevTranslation: (obj: { x: number; y: number }) => void;
  dataDrilldownLevel1: BudgetsTreemapDataItem[];
  dataDrilldownLevel2: BudgetsTreemapDataItem[];
  setDrilldownVizSelected: (obj: {
    id: string | undefined;
    filterStr: string | undefined;
  }) => void;
  setVizPrevSelected: (vizPrevSelected: string | undefined) => void;
  setVizPrevTranslation: (obj: { x: number; y: number }) => void;
  vizPrevSelected: string | undefined;
  drilldownVizSelected: string | undefined;
  toolboxOpen?: boolean;
  setOpenToolboxPanel?: (value: boolean) => void;
}

export function BudgetsFlowModule(props: BudgetsFlowModuleProps) {
  const history = useHistory();
  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );
  const [xsTooltipData, setXsTooltipData] =
    React.useState<TreeMapNodeDatum | null>(null);

  React.useEffect(() => {
    if (props.vizLevel === 0) {
      setVizDrilldowns([{ name: "Budget-budget flow" }]);
    }
    if (props.vizLevel > 0 && props.vizSelected && props.vizSelected.id) {
      const newDrilldowns = [
        { name: "Budget-budget flow" },
        { name: props.vizSelected.id },
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
        <BudgetsFlow
          data={{
            nodes: props.nodes,
            links: props.links,
          }}
          // selectedNodeId={props.vizSelected.id}
          onNodeClick={(
            node: { id: string; filterStr: string },
            x: number,
            y: number
          ) => {
            props.setVizLevel(1);
            props.setVizSelected(node);
            props.setVizTranslation({ x: x * -1, y: 0 });
          }}
          vizCompData={props.vizCompData}
          setVizCompData={props.setVizCompData}
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
              props.setVizPrevSelected(props.vizSelected.id);
              props.setDrilldownVizSelected({
                id: node,
                filterStr: undefined,
              });
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
          tooltipKeyLabel="Grant"
          tooltipValueLabel="Budget"
          data={props.dataDrilldownLevel2}
          selectedNodeId={props.vizSelected.id}
          onNodeClick={(node: string, x: number, y: number) => {
            if (props.drilldownVizSelected) {
              const idSplits = props.drilldownVizSelected.split("-");
              let code = node.replace(idSplits[0], "");
              code = code.slice(0, code.length - 1);
              history.push(`/grant/${code}`);
            }
          }}
        />
      );
    }
  }

  return (
    <div
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
