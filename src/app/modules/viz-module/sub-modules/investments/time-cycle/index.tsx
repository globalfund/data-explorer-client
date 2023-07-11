/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { PageLoader } from "app/modules/common/page-loader";
import ReRouteDialogBox from "app/components/Charts/common/dialogBox";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { getIso3FromName, getNameFromIso3 } from "app/utils/getIso3FromName";
import { InvestmentsTimeCycle } from "app/components/Charts/Investments/TimeCycle";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";

interface InvestmentsTimeCycleModuleProps {
  data: Record<string, unknown>[];
  drilldownData: BudgetsTreemapDataItem[];
  isLoading: boolean;
  isDrilldownLoading: boolean;
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
  vizSelected: string | undefined;
  setDrilldownVizSelected?: (vizSelected: string | undefined) => void;
  drilldownVizSelected?: string;
  setVizSelected: (vizSelected: string | undefined) => void;
  type?: string;
  toolboxOpen?: boolean;
  setOpenToolboxPanel?: (value: boolean) => void;
  codeParam?: string;
  isGrantDetail?: boolean;
  isPartnerDetail?: boolean;
  isLocationDetail?: boolean;
  isDrilldown2Loading?: boolean;
  drilldown2Data?: BudgetsTreemapDataItem[];
}

export function InvestmentsTimeCycleModule(
  props: InvestmentsTimeCycleModuleProps
) {
  const history = useHistory();
  const cmsData = useCMSData({ returnData: true });
  const [xsTooltipData, setXsTooltipData] =
    React.useState<TreeMapNodeDatum | null>(null);

  const [reRouteDialog, setReRouteDialog] = React.useState({
    display: false,
    code: "",
  });

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );
  const clearDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.clear
  );

  React.useEffect(() => {
    if (props.vizLevel === 0) {
      if (
        props.isGrantDetail &&
        !find(dataPathSteps, (step) => step.path.indexOf("/grant/") > -1)
      ) {
        addDataPathSteps([
          {
            id: "grant",
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
            id: "location",
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
            id: "partner",
            name: props.codeParam || "Partner",
            path: `${history.location.pathname}${history.location.search}`,
          },
        ]);
      }
      if (
        dataPathSteps.length === 0 ||
        !find(dataPathSteps, { name: `Grant Implementation: ${props.type}` })
      ) {
        addDataPathSteps([
          {
            id: uniqueId(),
            name: `Grant Implementation: ${props.type}`,
            path: `${history.location.pathname}${history.location.search}`,
          },
        ]);
      }
    }
  }, [props.vizLevel, props.vizSelected, props.drilldownVizSelected]);

  let clickthroughPath = "signed/treemap";
  if (props.type === "Commitment") {
    clickthroughPath = "commitment/treemap";
  } else if (props.type === "Disbursed") {
    clickthroughPath = "disbursements/treemap";
  }

  let vizComponent = <React.Fragment />;

  if (
    props.isLoading ||
    props.isDrilldownLoading ||
    props.isDrilldown2Loading
  ) {
    vizComponent = <PageLoader />;
  } else {
    if (props.vizLevel === 0) {
      vizComponent = (
        <InvestmentsTimeCycle
          data={props.data}
          type={props.type}
          onNodeClick={(node: string, _x: number, _y: number) => {
            props.setVizLevel(1);
            props.setVizSelected(node);

            if (
              dataPathSteps.find((steps) => steps.name === node) === undefined
            ) {
              addDataPathSteps([
                {
                  // TODO: implement changes applied here to the other viz modules
                  id: uniqueId(),
                  name: node,
                  path: `${history.location.pathname}${history.location.search}`,
                  vizSelected: {
                    id: node,
                    filterStr: node,
                  },
                },
              ]);
            }
          }}
        />
      );
    } else if (props.vizLevel === 1) {
      vizComponent = (
        <BudgetsTreemap
          data={props.drilldownData}
          xsTooltipData={xsTooltipData}
          tooltipValueLabel={get(
            cmsData,
            "componentsChartsInvestments.disbursements",
            ""
          )}
          setXsTooltipData={setXsTooltipData}
          onNodeClick={(node: string, _x: number, _y: number) => {
            if (props.setDrilldownVizSelected) {
              props.setVizLevel(2);
              props.setDrilldownVizSelected(node);
              addDataPathSteps([
                {
                  id: uniqueId(),
                  name: node,
                  path: `${history.location.pathname}${history.location.search}`,
                  drilldownVizSelected: {
                    id: node,
                    filterStr: node,
                  },
                },
              ]);
            }
          }}
        />
      );
    } else if (props.vizLevel === 2 && props.drilldown2Data) {
      vizComponent = (
        <BudgetsTreemap
          data={props.drilldown2Data}
          xsTooltipData={xsTooltipData}
          tooltipValueLabel={get(
            cmsData,
            "componentsChartsInvestments.disbursements",
            ""
          )}
          setXsTooltipData={setXsTooltipData}
          onNodeClick={(node: string, _x: number, _y: number) => {
            const idSplits = node.split("-");
            const code = getIso3FromName(idSplits[0]);
            // setReRouteDialog({
            //   display: true,
            //   code,
            // });
            clearDataPathSteps();
            history.push(`/grant/${code}/period/${clickthroughPath}`);
          }}
        />
      );
    }
  }

  return (
    <React.Fragment>
      {reRouteDialog.display && (
        <ReRouteDialogBox
          display={reRouteDialog}
          setDisplay={setReRouteDialog}
          handleClick={() =>
            history.push(
              `/grant/${reRouteDialog.code}/period/${clickthroughPath}`
            )
          }
        />
      )}
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
    </React.Fragment>
  );
}
