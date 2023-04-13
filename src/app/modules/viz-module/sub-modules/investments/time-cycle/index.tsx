/* third-party */
import React from "react";
import { v4 } from "uuid";
import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { breadCrumbItems } from "app/state/recoil/atoms";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { getIso3FromName, getNameFromIso3 } from "app/utils/getIso3FromName";
import { EchartBaseChart } from "app/components/Charts/common/echartBaseChart";
import { InvestmentsTimeCycle } from "app/components/Charts/Investments/TimeCycle";
import { BudgetsTreemapDataItem } from "app/interfaces";

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

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  const [breadCrumbList, setBreadCrumbList] = useRecoilState(breadCrumbItems);

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
            setBreadCrumbList([
              ...breadCrumbList,
              {
                name: node,
                path: location.pathname,
                id: v4(),
                vizLevel: 1,
                vizSelected: node,
              },
            ]);
            props.setVizLevel(1);
            props.setVizSelected(node);
          }}
        />
      );
    } else if (props.vizLevel === 1) {
      vizComponent = (
        <EchartBaseChart
          type="treemap"
          data={props.drilldownData}
          onNodeClick={(node: string) => {
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
      // vizComponent = (
      //   <DisbursementsTreemap
      //     data={}
      //     selectedNodeId={props.vizSelected}
      //     onNodeClick={(node: string, x: number, y: number) => {}}
      //   />
      // );
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
      {vizComponent}
    </div>
  );
}
