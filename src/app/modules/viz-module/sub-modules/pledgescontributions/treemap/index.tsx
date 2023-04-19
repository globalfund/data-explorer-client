/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import sumBy from "lodash/sumBy";
import maxBy from "lodash/maxBy";
import filter from "lodash/filter";
import uniqueId from "lodash/uniqueId";
import { useHistory } from "react-router-dom";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { EchartBaseChart } from "app/components/Charts/common/echartBaseChart";
import { BudgetsTreemapDataItem } from "app/interfaces";

export function PledgesContributionsTreemap() {
  useTitle("The Data Explorer - Pledges & Contributions/Treemap");

  const history = useHistory();

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

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  React.useEffect(() => {
    if (
      dataPathSteps.length === 0 ||
      !find(dataPathSteps, {
        name: "Resource Mobilization: Pledges & Contributions",
      })
    ) {
      addDataPathSteps([
        {
          id: uniqueId(),
          name: "Resource Mobilization: Pledges & Contributions",
          path: `${history.location.pathname}${history.location.search}`,
        },
      ]);
    }
  }, []);

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
    <EchartBaseChart
      type="treemap"
      data={[
        {
          name: `${valueType}s`,
          value: totalBudget,
          _children: treemapData,
        },
      ]}
    />
  );
}
