/* third-party */
import React, { useState } from "react";
import find from "lodash/find";
import { v4 } from "uuid";
import sumBy from "lodash/sumBy";

import filter from "lodash/filter";
import uniqueId from "lodash/uniqueId";
import { useHistory } from "react-router-dom";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { DrilldownModelUpdated } from "app/interfaces";
import { PageLoader } from "app/modules/common/page-loader";
import { getNameFromIso3 } from "app/utils/getIso3FromName";
import { BudgetsFlow } from "app/components/Charts/Budgets/Flow";
import { VizBackBtn } from "app/components/Charts/common/backbtn";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import ReRouteDialogBox from "app/components/Charts/common/dialogBox";
import { useRecoilState } from "recoil";
import { breadCrumbItems } from "app/state/recoil/atoms";
import { Grid } from "@material-ui/core";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

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
  const [breadCrumbList, setBreadCrumbList] = useRecoilState(breadCrumbItems);

  const [xsTooltipData, setXsTooltipData] =
    React.useState<TreeMapNodeDatum | null>(null);

  const [reRouteDialog, setReRouteDialog] = useState({
    display: false,
    code: "",
  });

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  const totalBudget = sumBy(
    filter(props.links, { source: "Budgets" }),
    "value"
  );

  React.useEffect(() => {
    if (props.vizLevel === 0) {
      if (
        dataPathSteps.length === 0 ||
        !find(dataPathSteps, { name: "Budget-budget flow" })
      ) {
        addDataPathSteps([
          {
            id: uniqueId(),
            name: "Budget-budget flow",
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
    if (props.vizLevel > 0 && props.vizSelected && props.vizSelected.id) {
      const newDrilldowns: DrilldownModelUpdated[] = [];
      if (props.vizLevel === 1) {
        newDrilldowns.push({
          id: uniqueId(),
          name: props.vizSelected.id,
          path: `${history.location.pathname}${history.location.search}`,
          vizSelected: {
            id: props.vizSelected.id || "",
            filterStr: props.vizSelected.filterStr || "",
          },
        });
      } else if (props.vizLevel === 2 && props.drilldownVizSelected.id) {
        const idSplits = props.drilldownVizSelected.id.split("-");
        const firstDrillDown = idSplits.length > 2 ? idSplits[2] : idSplits[1];
        const secondDrillDown =
          idSplits.length > 2 ? `${idSplits[0]}-${idSplits[1]}` : idSplits[0];
        newDrilldowns.push({
          id: uniqueId(),
          name: `${firstDrillDown} - ${secondDrillDown}`,
          path: `${history.location.pathname}${history.location.search}`,
          vizSelected: {
            id: props.vizSelected.id || "",
            filterStr: props.vizSelected.filterStr || "",
          },
          drilldownVizSelected: {
            id: props.drilldownVizSelected.id || "",
            filterStr: props.drilldownVizSelected.filterStr || "",
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
        <BudgetsFlow
          data={{
            nodes: props.nodes,
            links: props.links,
          }}
          onNodeClick={(node: { id: string; filterStr: string }) => {
            setBreadCrumbList([
              ...breadCrumbList,
              {
                name: node.id as string,
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
        <BudgetsTreemap
          isDrilldownTreemap
          tooltipValueLabel="Budget"
          xsTooltipData={xsTooltipData}
          data={props.dataDrilldownLevel1}
          setXsTooltipData={setXsTooltipData}
          onNodeClick={(node: string) => {
            setBreadCrumbList([
              ...breadCrumbList,
              {
                name: node as string,
                path: location.pathname,
                id: v4(),
                vizLevel: 2,
                vizSelected: {
                  id: node,
                  filterStr: undefined,
                },
              },
            ]);
            props.setVizLevel(2);
            props.setDrilldownVizSelected({
              id: node,
              filterStr: undefined,
            });
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
            if (props.drilldownVizSelected.id) {
              const idSplits = props.drilldownVizSelected.id.split("-");
              let code = node
                .replace(idSplits[0], "")
                .replace(`-${idSplits[1]}`, "");
              code = code.slice(0, code.length - 1);
              addDataPathSteps([
                {
                  id: uniqueId(),
                  name: code,
                  path: `/grant/${code}/period/budgets/flow`,
                },
              ]);
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
        css="font-size: 12px !important; color: #262C34; margin-top: -9px;"
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
