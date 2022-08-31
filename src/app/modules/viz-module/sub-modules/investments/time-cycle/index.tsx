/* third-party */
import React from "react";
import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { VizBackBtn } from "app/components/Charts/common/backbtn";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { getIso3FromName, getNameFromIso3 } from "app/utils/getIso3FromName";
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
  vizSelected: string | undefined;
  setVizSelected: (vizSelected: string | undefined) => void;
  type?: string;
  toolboxOpen?: boolean;
  setOpenToolboxPanel?: (value: boolean) => void;
  codeParam?: string;
  isGrantDetail?: boolean;
  isPartnerDetail?: boolean;
  isLocationDetail?: boolean;
}

export function InvestmentsTimeCycleModule(
  props: InvestmentsTimeCycleModuleProps
) {
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
    if (props.vizLevel > 0 && props.vizSelected) {
      addDataPathSteps([
        {
          id: uniqueId(),
          name: props.vizSelected,
          path: `${history.location.pathname}${history.location.search}`,
          vizSelected: {
            id: props.vizSelected,
            filterStr: props.vizSelected,
          },
        },
      ]);
    }
  }, [props.vizLevel, props.vizSelected]);

  let clickthroughPath = "signed/treemap";
  if (props.type === "Commitment") {
    clickthroughPath = "commitment/treemap";
  } else if (props.type === "Disbursed") {
    clickthroughPath = "disbursements/treemap";
  }

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
            // props.setVizSelected(node);
            const idSplits = node.split("-");
            const code = getIso3FromName(idSplits[0]);
            addDataPathSteps([
              {
                id: uniqueId(),
                name: `${idSplits[0]} - ${idSplits[1]}`,
                path: `/location/${code}/${clickthroughPath}?components=${idSplits[1]}`,
              },
            ]);
            history.push(
              `/location/${code}/${clickthroughPath}?components=${idSplits[1]}`
            );
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
