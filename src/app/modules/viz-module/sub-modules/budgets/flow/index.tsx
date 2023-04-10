/* third-party */
import React from "react";
import find from "lodash/find";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import uniqueId from "lodash/uniqueId";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { appColors } from "app/theme";
import { PageLoader } from "app/modules/common/page-loader";
import { getNameFromIso3 } from "app/utils/getIso3FromName";
import { BudgetsFlow } from "app/components/Charts/Budgets/Flow";
import ReRouteDialogBox from "app/components/Charts/common/dialogBox";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
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
        <BudgetsFlow
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
      );
    } else if (props.vizLevel === 1) {
      vizComponent = (
        <BudgetsTreemap
          isDrilldownTreemap
          tooltipValueLabel="Budget"
          xsTooltipData={xsTooltipData}
          data={props.dataDrilldownLevel1}
          setXsTooltipData={setXsTooltipData}
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
        <BudgetsTreemap
          isDrilldownTreemap
          tooltipKeyLabel="Grant"
          tooltipValueLabel="Budget"
          data={props.dataDrilldownLevel2}
          selectedNodeId={props.vizSelected.id}
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
