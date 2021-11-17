/* third-party */
import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import { useTitle } from "react-use";
import Grid from "@material-ui/core/Grid";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { InfoIcon } from "app/assets/icons/Info";
import { PageLoader } from "app/modules/common/page-loader";
// import { SlideInContainer } from "app/components/SlideInPanel";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
// import { TransitionContainer } from "app/components/TransitionContainer";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
// import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";

export function PledgesContributionsTreemap() {
  useTitle("The Data Explorer - Pledges & Contributions/Treemap");
  // const [vizLevel, setVizLevel] = React.useState(0);
  // const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );
  const [
    xsTooltipData,
    setXsTooltipData,
  ] = React.useState<TreeMapNodeDatum | null>(null);

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.PledgesContributionsTreemap.fetch
  );
  const data = useStoreState(
    (state) =>
      get(
        state.PledgesContributionsTreemap.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isLoading = useStoreState(
    (state) => state.PledgesContributionsTreemap.loading
  );
  // const fetchDrilldownData = useStoreActions(
  //   (store) => store.DisbursementsTreemapDrilldown.fetch
  // );
  // const drilldownData = useStoreState(
  //   (state) =>
  //     get(
  //       state.DisbursementsTreemapDrilldown.data,
  //       "data",
  //       []
  //     ) as DisbursementsTreemapDataItem[]
  // );
  // const isDrilldownLoading = useStoreState(
  //   (state) => state.DisbursementsTreemapDrilldown.loading
  // );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const valueType = useStoreState(
    (state) => state.ToolBoxPanelDonorMapTypeState.value
  );

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(appliedFilters);
    fetchData({
      filterString: `valueType=${valueType}${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }, [valueType, appliedFilters]);

  // useUpdateEffect(() => {
  //   if (vizSelected) {
  //     const splits = vizSelected.split("-");
  //     if (splits.length > 0) {
  //       const locations = [...appliedFilters.locations];
  //       if (props.code) {
  //         locations.push(props.code);
  //       }
  //       locations.push(splits[0]);
  //       const filterString = getAPIFormattedFilters({
  //         ...appliedFilters,
  //         locations,
  //       });
  //       fetchDrilldownData({ filterString });
  //     }
  //   }
  // }, [vizSelected]);

  const totalBudget = sumBy(data, "value");

  // const vizDrilldowns = useStoreState(
  //   (state) => state.PageHeaderVizDrilldownsState.value
  // );
  // const setVizDrilldowns = useStoreActions(
  //   (actions) => actions.PageHeaderVizDrilldownsState.setValue
  // );

  // React.useEffect(() => {
  //   if (props.vizLevel === 0) {
  //     setVizDrilldowns([]);
  //   }
  //   if (props.vizLevel > 0 && props.vizSelected) {
  //     setVizDrilldowns([
  //       { name: "Dataset" },
  //       { name: props.vizSelected.split("-")[0] },
  //     ]);
  //   }
  // }, [vizLevel, vizSelected]);

  // useUnmount(() => setVizDrilldowns([]));

  if (isLoading) {
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

            > div {
              font-size: 12px;
            }
          }
        `}
      >
        <Grid item xs={12}>
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
            Donors {valueType}s <InfoIcon />
          </div>
          <div css="font-weight: normal;">
            {formatFinancialValue(totalBudget)}
          </div>
        </Grid>
      </Grid>
      <div
        css={`
          width: 100%;

          ${!vizSelected
            ? `* {
            overflow: visible !important;
          }`
            : ""}
        `}
      >
        {/* <TransitionContainer vizScale={1} vizTranslation={vizTranslation}> */}
        <BudgetsTreemap
          data={data}
          invertColors
          selectedNodeId={vizSelected}
          tooltipValueLabel={valueType}
          xsTooltipData={xsTooltipData}
          setXsTooltipData={setXsTooltipData}
          onNodeClick={(node: string, x: number, y: number, code?: string) => {
            // if (props.allowDrilldown) {
            //   props.setVizLevel(1);
            //   props.setVizSelected(node);
            //   props.setVizTranslation({ x: x * -1, y: y * -1 });
            // } else if (props.onNodeClick && code) {
            //   props.onNodeClick(code);
            // }
          }}
        />
        {/* </TransitionContainer>
        <SlideInContainer
          vizLevel={vizLevel}
          selected={vizSelected}
          loading={isDrilldownLoading}
          close={() => {
            setVizLevel(0);
            setVizSelected(undefined);
            setVizTranslation({ x: 0, y: 0 });
          }}
        >
          <DisbursementsTreemap
            data={drilldownData}
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        </SlideInContainer> */}
      </div>
    </React.Fragment>
  );
}
