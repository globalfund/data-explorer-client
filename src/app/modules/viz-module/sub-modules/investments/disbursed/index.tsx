/* third-party */
import React from "react";
import find from "lodash/find";
import maxBy from "lodash/maxBy";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useUnmount, useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { InfoIcon } from "app/assets/icons/Info";
import { PageLoader } from "app/modules/common/page-loader";
import { SlideInContainer } from "app/components/SlideInPanel";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { TransitionContainer } from "app/components/TransitionContainer";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";

interface InvestmentsDisbursedModuleProps {
  data: DisbursementsTreemapDataItem[];
  drilldownData: DisbursementsTreemapDataItem[];
  isLoading: boolean;
  isDrilldownLoading: boolean;
  vizLevel: number;
  setVizLevel: (vizLevel: number) => void;
  vizTranslation: { x: number; y: number };
  setVizTranslation: (obj: { x: number; y: number }) => void;
  vizSelected: string | undefined;
  setVizSelected: (vizSelected: string | undefined) => void;
  allowDrilldown: boolean;
  onNodeClick?: (code: string) => void;
  type?: string;
  toolboxOpen?: boolean;
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
  // useTitle("The Data Explorer - Investments/Disbursed");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const totalValue = sumBy(props.data, "value");

  const [treemapData, setTreemapData] = React.useState<
    DisbursementsTreemapDataItem[]
  >(props.data);

  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );

  React.useEffect(() => {
    if (props.vizLevel === 0) {
      setVizDrilldowns([{ name: "Dataset" }]);
    }
    if (props.vizLevel > 0 && props.vizSelected) {
      const code = props.vizSelected.split("-")[0];
      let name = "";
      props.data.forEach((item: DisbursementsTreemapDataItem) => {
        if (name.length === 0) {
          const fItem = find(item._children, { code });
          if (fItem) {
            name = fItem.name;
          }
        }
      });
      setVizDrilldowns([{ name: "Dataset" }, { name: name || code }]);
    }
  }, [props.vizLevel, props.vizSelected]);

  useUnmount(() => setVizDrilldowns([]));

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

  useUpdateEffect(() => {
    setTreemapData(
      filterDisbursements(props.data, toolboxPanelDisbursementsSliderValues)
    );
  }, [props.data, toolboxPanelDisbursementsSliderValues]);

  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        spacing={4}
        css={`
          margin-bottom: 20px;

          > div {
            color: #262c34;
            font-size: 14px;
          }

          @media (max-width: 767px) {
            margin-bottom: 0;
          }
        `}
      >
        {!isMobile && (
          <Grid item xs={3}>
            <div
              css={`
                display: flex;
                font-weight: bold;
                align-items: center;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

                > svg {
                  margin-left: 10px;
                }
              `}
            >
              Investments - {props.type || "Disbursement"} <InfoIcon />
            </div>
            <div css="font-weight: normal;">
              {formatFinancialValue(totalValue)}
            </div>
          </Grid>
        )}
        {isMobile && (
          <Grid item xs={12} css="font-size: 12px !important;">
            <b>Total amount: {formatFinancialValue(totalValue)}</b>
          </Grid>
        )}
      </Grid>
      <div
        css={`
          width: 100%;

          ${!props.vizSelected
            ? `* {
            overflow: visible !important;
          }`
            : ""}
        `}
      >
        <TransitionContainer vizScale={1} vizTranslation={props.vizTranslation}>
          <DisbursementsTreemap
            data={treemapData}
            selectedNodeId={props.vizSelected}
            onNodeClick={(
              node: string,
              x: number,
              y: number,
              code?: string
            ) => {
              if (props.allowDrilldown) {
                props.setVizLevel(1);
                props.setVizSelected(node);
                props.setVizTranslation({ x: x * -1, y: y * -1 });
              } else if (props.onNodeClick && code) {
                props.onNodeClick(code);
              }
            }}
          />
        </TransitionContainer>
        <SlideInContainer
          vizLevel={props.vizLevel}
          selected={props.vizSelected}
          toolboxOpen={props.toolboxOpen}
          loading={props.isDrilldownLoading}
          close={() => {
            props.setVizLevel(0);
            props.setVizSelected(undefined);
            props.setVizTranslation({ x: 0, y: 0 });
          }}
        >
          <DisbursementsTreemap
            isDrilldownTreemap
            data={props.drilldownData}
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        </SlideInContainer>
      </div>
    </React.Fragment>
  );
}
