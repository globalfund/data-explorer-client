/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import sumBy from "lodash/sumBy";
import uniqueId from "lodash/uniqueId";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useCMSData } from "app/hooks/useCMSData";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { DrilldownModelUpdated } from "app/interfaces";
import { PageLoader } from "app/modules/common/page-loader";
import { getNameFromIso3 } from "app/utils/getIso3FromName";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import ReRouteDialogBox from "app/components/Charts/common/dialogBox";
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
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [xsTooltipData, setXsTooltipData] =
    React.useState<TreeMapNodeDatum | null>(null);

  const totalBudget = React.useMemo(() => {
    return sumBy(props.data, "amount");
  }, [props.data]);

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  const [reRouteDialog, setReRouteDialog] = React.useState({
    display: false,
    code: "",
  });

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
        !find(dataPathSteps, { name: "Grant Implementation: Budgets" })
      ) {
        addDataPathSteps([
          {
            id: uniqueId(),
            name: "Grant Implementation: Budgets",
            path: `${history.location.pathname}${history.location.search}`,
          },
        ]);
      }
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
          onNodeClick={(node: string) => {
            props.setVizLevel(1);
            props.setVizSelected(node);
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
          }}
        />
      );
    } else if (props.vizLevel === 1) {
      vizComponent = (
        <BudgetsTreemap
          isDrilldownTreemap
          tooltipValueLabel={get(cmsData, "componentsChartsBudgets.budget", "")}
          xsTooltipData={xsTooltipData}
          data={props.dataDrilldownLevel1}
          setXsTooltipData={setXsTooltipData}
          onNodeClick={(node: string) => {
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
    } else if (props.vizLevel === 2) {
      vizComponent = (
        <BudgetsTreemap
          isDrilldownTreemap
          tooltipValueLabel={get(cmsData, "componentsChartsBudgets.budget", "")}
          data={props.dataDrilldownLevel2}
          selectedNodeId={props.vizSelected}
          onNodeClick={(node: string) => {
            if (props.drilldownVizSelected && !props.isGrantDetail) {
              const idSplits = props.drilldownVizSelected.split("-");
              let code = node
                .replace(idSplits[0], "")
                .replace(`-${idSplits[1]}`, "");
              code = code.slice(0, code.length - 1);
              setReRouteDialog({
                display: true,
                code,
              });
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
      {reRouteDialog.display && (
        <ReRouteDialogBox
          display={reRouteDialog}
          setDisplay={setReRouteDialog}
          handleClick={() =>
            history.push(
              `/grant/${reRouteDialog.code}/period/budgets/time-cycle`
            )
          }
        />
      )}

      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        {!isMobile && (
          <React.Fragment>
            <div
              css={`
                /* display: flex; */
                font-size: 12px;
                /* font-weight: bold; */
                align-items: center;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
                margin-top: -9px;
                > svg {
                  margin-left: 10px;
                }
              `}
            >
              <b>{get(cmsData, "componentsChartsBudgets.budget", "")}</b>
              <p
                css={`
                  margin-top: -6px;
                `}
              >
                {formatFinancialValue(totalBudget)}
              </p>
            </div>
          </React.Fragment>
        )}
      </Grid>

      {vizComponent}
    </div>
  );
}
