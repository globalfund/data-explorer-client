/* third-party */
import React, { useState } from "react";
import find from "lodash/find";
import { v4 } from "uuid";

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
import ReRouteDialogBox from "app/components/Charts/common/dialogBox";
import { useRecoilState } from "recoil";
import { breadCrumbItems } from "app/state/recoil/atoms";
import { get, sumBy } from "lodash";
import { useCMSData } from "app/hooks/useCMSData";
import { Grid, useMediaQuery } from "@material-ui/core";
import { InfoIcon } from "app/assets/icons/Info";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

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
  const totalBudget = sumBy(props.data, "amount");
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [xsTooltipData, setXsTooltipData] =
    React.useState<TreeMapNodeDatum | null>(null);

  const [breadCrumbList, setBreadCrumbList] = useRecoilState(breadCrumbItems);

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  const [reRouteDialog, setReRouteDialog] = useState({
    display: false,
    code: "",
  });

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
          onNodeClick={(node: string) => {
            setBreadCrumbList([
              ...breadCrumbList,
              {
                name: node as string,
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
        <React.Fragment>
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
                  vizSelected: node,
                },
              ]);
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
          onNodeClick={(node: string) => {
            if (props.drilldownVizSelected) {
              const idSplits = props.drilldownVizSelected.split("-");
              let code = node
                .replace(idSplits[0], "")
                .replace(`-${idSplits[1]}`, "");
              code = code.slice(0, code.length - 1);
              addDataPathSteps([
                {
                  id: uniqueId(),
                  name: code,
                  path: `/grant/${code}/period/budgets/time-cycle`,
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
              <b>
                {get(cmsData, "componentsChartsBudgets.budget", "")}{" "}
                <InfoIcon />
              </b>
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
