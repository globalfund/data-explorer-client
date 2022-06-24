/* third-party */
import React from "react";
import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { DrilldownModelUpdated } from "app/interfaces";
import { PageLoader } from "app/modules/common/page-loader";
import { getNameFromIso3 } from "app/utils/getIso3FromName";
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
  vizSelected: string | undefined;
  setVizSelected: (vizSelected: string | undefined) => void;
  dataDrilldownLevel1: BudgetsTreemapDataItem[];
  dataDrilldownLevel2: BudgetsTreemapDataItem[];
  drilldownVizSelected: string | undefined;
  setDrilldownVizSelected: (drilldownVizSelected: string | undefined) => void;
  toolboxOpen?: boolean;
  setOpenToolboxPanel?: (value: boolean) => void;
  codeParam?: string;
  isGrantDetail?: boolean;
  isPartnerDetail?: boolean;
  isLocationDetail?: boolean;
}

export function BudgetsTimeCycleModule(props: BudgetsTimeCycleModuleProps) {
  const history = useHistory();

  const [xsTooltipData, setXsTooltipData] =
    React.useState<TreeMapNodeDatum | null>(null);

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  React.useEffect(() => {
    if (props.vizLevel === 0) {
      if (
        dataPathSteps.length === 0 ||
        !find(dataPathSteps, { name: "Budget-time cycle" })
      ) {
        addDataPathSteps([
          {
            id: uniqueId(),
            name: "Budget-time cycle",
            path: `${history.location.pathname}${history.location.search}`,
          },
        ]);
      } else if (
        props.isGrantDetail &&
        !find(dataPathSteps, (step) => step.path.indexOf("/grant/") > -1)
      ) {
        addDataPathSteps([
          {
            id: uniqueId(),
            name: props.codeParam || "Grant",
            path: `${history.location.pathname}${history.location.search}`,
          },
        ]);
      } else if (
        props.isLocationDetail &&
        !find(dataPathSteps, (step) => step.path.indexOf("/location/") > -1)
      ) {
        addDataPathSteps([
          {
            id: uniqueId(),
            name: props.codeParam
              ? getNameFromIso3(props.codeParam)
              : "Location",
            path: `${history.location.pathname}${history.location.search}`,
          },
        ]);
      } else if (
        props.isPartnerDetail &&
        !find(dataPathSteps, (step) => step.path.indexOf("/partner/") > -1)
      ) {
        addDataPathSteps([
          {
            id: uniqueId(),
            name: props.codeParam || "Partner",
            path: `${history.location.pathname}${history.location.search}`,
          },
        ]);
      }
    }
    if (props.vizLevel > 0 && props.vizSelected && props.vizSelected) {
      const newDrilldowns: DrilldownModelUpdated[] = [];
      if (props.vizLevel === 1) {
        newDrilldowns.push({
          id: uniqueId(),
          name: props.vizSelected,
          path: `${history.location.pathname}${history.location.search}`,
          vizSelected: {
            id: props.vizSelected || "",
            filterStr: props.vizSelected || "",
          },
        });
      } else if (props.vizLevel === 2 && props.drilldownVizSelected) {
        const idSplits = props.drilldownVizSelected.split("-");
        const firstDrillDown = idSplits.length > 2 ? idSplits[2] : idSplits[1];
        const secondDrillDown =
          idSplits.length > 2 ? `${idSplits[0]}-${idSplits[1]}` : idSplits[0];
        newDrilldowns.push({
          id: uniqueId(),
          name: `${firstDrillDown} - ${secondDrillDown}`,
          path: `${history.location.pathname}${history.location.search}`,
          vizSelected: {
            id: props.vizSelected || "",
            filterStr: props.vizSelected || "",
          },
          drilldownVizSelected: {
            id: props.drilldownVizSelected || "",
            filterStr: props.drilldownVizSelected || "",
          },
        });
      }
      addDataPathSteps(newDrilldowns);
    }
  }, [props.vizLevel, props.vizSelected, props.drilldownVizSelected]);

  let vizComponent = <React.Fragment />;

  if (props.isLoading || props.isDrilldownLoading) {
    vizComponent = <PageLoader />;
  } else {
    if (props.vizLevel === 0) {
      vizComponent = (
        <BudgetsTimeCycle
          data={props.data}
          // selectedNodeId={props.vizSelected}
          onNodeClick={(node: string, x: number, y: number) => {
            props.setVizLevel(1);
            props.setVizSelected(node);
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
              props.setDrilldownVizSelected(node);
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
              addDataPathSteps([
                {
                  id: uniqueId(),
                  name: code,
                  path: `/grant/${code}/period/budgets/time-cycle`,
                },
              ]);
              history.push(`/grant/${code}/period/budgets/time-cycle`);
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
      {(props.vizLevel > 0 || dataPathSteps.length > 1) && (
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
