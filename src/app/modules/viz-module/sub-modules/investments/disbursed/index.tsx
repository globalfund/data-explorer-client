/* third-party */
import React from "react";
import sumBy from "lodash/sumBy";
import Grid from "@material-ui/core/Grid";
import { useUnmount, useTitle } from "react-use";
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
}

export function InvestmentsDisbursedModule(
  props: InvestmentsDisbursedModuleProps
) {
  useTitle("The Data Explorer - Investments/Disbursed");
  const totalBudget = sumBy(props.data, "value");

  const vizDrilldowns = useStoreState(
    (state) => state.PageHeaderVizDrilldownsState.value
  );
  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );

  React.useEffect(() => {
    if (props.vizLevel === 0 && vizDrilldowns.length > 0) {
      setVizDrilldowns([]);
    }
    if (props.vizLevel > 0 && props.vizSelected) {
      setVizDrilldowns([
        { name: "Dataset" },
        { name: props.vizSelected.split("-")[0] },
      ]);
    }
  }, [props.vizLevel, props.vizSelected]);

  useUnmount(() => setVizDrilldowns([]));

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
            font-weight: bold;
          }
        `}
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
            Investments - Disbursed <InfoIcon />
          </div>
          <div css="font-weight: normal;">
            {formatFinancialValue(totalBudget)}
          </div>
        </Grid>
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
            data={props.data}
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
          loading={props.isDrilldownLoading}
          close={() => {
            props.setVizLevel(0);
            props.setVizSelected(undefined);
            props.setVizTranslation({ x: 0, y: 0 });
          }}
        >
          <DisbursementsTreemap
            data={props.drilldownData}
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        </SlideInContainer>
      </div>
    </React.Fragment>
  );
}
