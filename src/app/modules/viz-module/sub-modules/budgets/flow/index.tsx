/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import uniqueId from "lodash/uniqueId";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { appColors } from "app/theme";
import { useCMSData } from "app/hooks/useCMSData";
import { BudgetsTreemapDataItem } from "app/interfaces";
import { getNameFromIso3 } from "app/utils/getIso3FromName";
import { PageLoader } from "app/modules/common/page-loader";
import ReRouteDialogBox from "app/components/Charts/common/dialogBox";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { EchartBaseChart } from "app/components/Charts/common/echartBaseChart";

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
  vizSelected: { id: string | undefined; filterStr: string | undefined };
  setVizSelected: (vizSelected: {
    id: string | undefined;
    filterStr: string | undefined;
  }) => void;
  dataDrilldownLevel1: BudgetsTreemapDataItem[];
  dataDrilldownLevel2: BudgetsTreemapDataItem[];
  setDrilldownVizSelected: (obj: {
    id: string | undefined;
    filterStr: string | undefined;
  }) => void;
  drilldownVizSelected: {
    id: string | undefined;
    filterStr: string | undefined;
  };
  toolboxOpen?: boolean;
  setOpenToolboxPanel?: (value: boolean) => void;
  codeParam?: string;
  isGrantDetail?: boolean;
  isPartnerDetail?: boolean;
  isLocationDetail?: boolean;
}

export function BudgetsFlowModule(props: BudgetsFlowModuleProps) {
  const history = useHistory();
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 767px)");

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

  const totalBudget: number = React.useMemo(() => {
    return sumBy(filter(props.links, { source: "Budgets" }), "value");
  }, [props.links]);

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
        <React.Fragment>
          <Grid
            container
            css={`
              > div {
                color: ${appColors.COMMON.PRIMARY_COLOR_1};
                font-size: 14px;

                @media (max-width: 767px) {
                  font-size: 10px;
                }
              }
            `}
            alignItems="baseline"
            spacing={!isMobile ? 4 : undefined}
          >
            <Grid item xs={3}>
              <div
                css={`
                  display: flex;
                  align-items: center;

                  > svg {
                    margin-left: 10px;
                  }
                `}
              >
                {get(cmsData, "componentsChartsBudgets.budget", "")}
              </div>
            </Grid>
            <Grid item xs={3}>
              {get(cmsData, "componentsChartsBudgets.flowLandscapeLevel1", "")}
            </Grid>
            <Grid item xs={3} css="text-align: center;">
              {get(cmsData, "componentsChartsBudgets.flowLandscapeLevel2", "")}
            </Grid>
            <Grid item xs={3} css="text-align: right;">
              {get(cmsData, "componentsChartsBudgets.flowCostCategory", "")}
            </Grid>
          </Grid>
          <EchartBaseChart
            type="sankey"
            data={{
              nodes: props.nodes,
              links: props.links,
            }}
            onNodeClick={(node: { id: string; filterStr: string }) => {
              props.setVizLevel(1);
              props.setVizSelected(node);
              addDataPathSteps([
                {
                  id: uniqueId(),
                  name: node.id,
                  path: `${history.location.pathname}${history.location.search}`,
                  vizSelected: node,
                },
              ]);
            }}
          />
        </React.Fragment>
      );
    } else if (props.vizLevel === 1) {
      vizComponent = (
        <EchartBaseChart
          type="treemap"
          data={props.dataDrilldownLevel1}
          onNodeClick={(node: string) => {
            if (props.setDrilldownVizSelected) {
              props.setVizLevel(2);
              props.setDrilldownVizSelected({
                id: node,
                filterStr: undefined,
              });
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
        <EchartBaseChart
          type="treemap"
          data={props.dataDrilldownLevel2}
          onNodeClick={(node: string) => {
            if (props.drilldownVizSelected.id && !props.isGrantDetail) {
              const idSplits = props.drilldownVizSelected.id.split("-");
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
            history.push(`/grant/${reRouteDialog.code}/period/budgets/flow`)
          }
        />
      )}
      <Grid
        item
        xs={12}
        sm={2}
        css={`
          font-size: 12px !important;
          color: ${appColors.COMMON.PRIMARY_COLOR_1};
          margin-top: -9px;
        `}
      >
        <b>Budget</b>
        <p
          css={`
            margin-top: -6px;
          `}
        >
          {formatFinancialValue(totalBudget)}
        </p>
      </Grid>
      {vizComponent}
    </div>
  );
}
