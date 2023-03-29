/* third-party */
import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import maxBy from "lodash/maxBy";
import filter from "lodash/filter";
import Grid from "@material-ui/core/Grid";
import { TreeMapNodeDatum } from "@nivo/treemap";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { appColors } from "app/theme";

export function PledgesContributionsTreemap() {
  useTitle("The Data Explorer - Pledges & Contributions/Treemap");
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );
  const [xsTooltipData, setXsTooltipData] =
    React.useState<TreeMapNodeDatum | null>(null);

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

  const [treemapData, setTreemapData] =
    React.useState<BudgetsTreemapDataItem[]>(data);

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

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

  React.useEffect(() => {
    const lmax = maxBy(data, "value");
    if (lmax && lmax.value !== toolboxPanelDisbursementsSliderMaxValue) {
      setToolboxPanelDisbursementsSliderMaxValue(lmax.value);
      setToolboxPanelDisbursementsSliderValues([0, lmax.value]);
    }
  }, [data]);

  useUpdateEffect(() => {
    setTreemapData(
      filter(
        data,
        (item: BudgetsTreemapDataItem) =>
          item.value >= toolboxPanelDisbursementsSliderValues[0] &&
          item.value <= toolboxPanelDisbursementsSliderValues[1]
      )
    );
  }, [data, toolboxPanelDisbursementsSliderValues]);

  const totalBudget = sumBy(treemapData, "value");

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
            color: ${appColors.COMMON.PRIMARY_COLOR_1};
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
            Donors {valueType}s
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
        <BudgetsTreemap
          data={treemapData}
          invertColors
          selectedNodeId={vizSelected}
          tooltipValueLabel={valueType}
          xsTooltipData={xsTooltipData}
          setXsTooltipData={setXsTooltipData}
          onNodeClick={(
            _node: string,
            _x: number,
            _y: number,
            _code?: string
          ) => {}}
        />
      </div>
    </React.Fragment>
  );
}
