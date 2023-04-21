/* third-party */
import React from "react";
import find from "lodash/find";
import maxBy from "lodash/maxBy";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import { useTitle } from "react-use";
import uniqueId from "lodash/uniqueId";
import findIndex from "lodash/findIndex";
import { useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { getNameFromIso3 } from "app/utils/getIso3FromName";
import { DisbursementsTreemapDataItem } from "app/interfaces";
import ReRouteDialogBox from "app/components/Charts/common/dialogBox";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { EchartBaseChart } from "app/components/Charts/common/echartBaseChart";

interface InvestmentsDisbursedModuleProps {
  data: DisbursementsTreemapDataItem[];
  drilldownData: DisbursementsTreemapDataItem[];
  isLoading: boolean;
  isDrilldownLoading: boolean;
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
  vizSelected: string | undefined;
  setVizSelected: (vizSelected: string | undefined) => void;
  allowDrilldown: boolean;
  onNodeClick?: (code: string) => void;
  type?: string;
  toolboxOpen?: boolean;
  setOpenToolboxPanel?: (value: boolean) => void;
  codeParam?: string;
  isGrantDetail?: boolean;
  isPartnerDetail?: boolean;
  isLocationDetail?: boolean;
}

function filterDisbursements(
  data: DisbursementsTreemapDataItem[],
  values: number[]
): DisbursementsTreemapDataItem[] {
  const filteredData: DisbursementsTreemapDataItem[] = [];

  data.forEach((item: DisbursementsTreemapDataItem) => {
    const filteredChildren = filter(
      item._children,
      (child: DisbursementsTreemapDataItem) =>
        child.value >= values[0] && child.value <= values[1]
    );
    const filteredItem = {
      ...item,
      value: sumBy(filteredChildren, "value"),
      formattedValue: formatFinancialValue(sumBy(filteredChildren, "value")),
      _children: filteredChildren,
    };
    if (filteredItem._children.length > 0) {
      filteredData.push(filteredItem);
    }
  });

  return filteredData;
}

export function InvestmentsDisbursedModule(
  props: InvestmentsDisbursedModuleProps
) {
  useTitle("The Data Explorer - Investments/Disbursed");

  const history = useHistory();

  const [treemapData, setTreemapData] = React.useState<
    DisbursementsTreemapDataItem[]
  >(props.data);

  const [reRouteDialog, setReRouteDialog] = React.useState({
    display: false,
    code: "",
  });

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );
  const setDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.setSteps
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
      } else {
        const fStepIndex = findIndex(dataPathSteps, {
          name: `Grant Implementation: ${props.type}`,
        });
        if (fStepIndex > -1) {
          const newSteps = [...dataPathSteps];
          newSteps[
            fStepIndex
          ].path = `${history.location.pathname}${history.location.search}`;
          setDataPathSteps(newSteps);
        }
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

  const setToolboxPanelDisbursementsSliderMaxValue = useStoreActions(
    (store) => store.ToolBoxPanelDisbursementsSliderValues.setMax
  );
  const toolboxPanelDisbursementsSliderMaxValue = useStoreState(
    (store) => store.ToolBoxPanelDisbursementsSliderValues.max
  );
  const setToolboxPanelDisbursementsSliderValues = useStoreActions(
    (store) => store.ToolBoxPanelDisbursementsSliderValues.setValues
  );
  const toolboxPanelDisbursementsSliderValues = useStoreState(
    (store) => store.ToolBoxPanelDisbursementsSliderValues.values
  );

  React.useEffect(() => {
    let allChildren: DisbursementsTreemapDataItem[] = [];
    props.data.forEach((item: DisbursementsTreemapDataItem) => {
      if (item._children) {
        allChildren = [...allChildren, ...item._children];
      }
    });
    const lmax = maxBy(allChildren, "value");
    if (lmax && lmax.value !== toolboxPanelDisbursementsSliderMaxValue) {
      setToolboxPanelDisbursementsSliderMaxValue(lmax.value);
      setToolboxPanelDisbursementsSliderValues([0, lmax.value]);
    }
  }, [props.data]);

  React.useEffect(() => {
    setTreemapData(
      filterDisbursements(props.data, toolboxPanelDisbursementsSliderValues)
    );
  }, [props.data, toolboxPanelDisbursementsSliderValues]);

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
        <EchartBaseChart
          type="treemap"
          data={treemapData}
          onNodeClick={(node: string, code?: string) => {
            if (props.allowDrilldown) {
              props.setVizLevel(1);
              props.setVizSelected(node);
            } else if (props.onNodeClick && code) {
              props.onNodeClick(code);
            }
          }}
        />
      );
    } else if (props.vizLevel === 1) {
      vizComponent = (
        <EchartBaseChart
          type="treemap"
          data={props.drilldownData}
          onNodeClick={(node: string) => {
            const code = node
              .split("-")
              .slice(0, node.split("-").length - 1)
              .join("-");
            setReRouteDialog({
              display: true,
              code,
            });
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
