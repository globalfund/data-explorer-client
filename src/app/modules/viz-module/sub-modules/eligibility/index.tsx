/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import { useHistory } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DotChart } from "app/components/Charts/Eligibility/DotChart";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DotChartModel } from "app/components/Charts/Eligibility/DotChart/data";
import { useCMSData } from "app/hooks/useCMSData";

export function EligibilityModule() {
  useTitle("The Data Explorer - Eligibility");
  const cmsData = useCMSData({ returnData: true });
  const history = useHistory();

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const selectedYear = useStoreState(
    (state) => state.ToolBoxPanelEligibilityYearState.value
  );

  // api call & data
  const fetchData = useStoreActions((store) => store.Eligibility.fetch);
  const data = useStoreState(
    (state) => get(state.Eligibility.data, "data", []) as DotChartModel[]
  );
  const fetchYearOptionsData = useStoreActions(
    (store) => store.EligibilityYears.fetch
  );

  const isLoading = useStoreState((state) => state.Eligibility.loading);

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  React.useEffect(() => {
    fetchYearOptionsData({});
    if (
      dataPathSteps.length === 0 ||
      !find(dataPathSteps, { name: "Access to Funding: Eligibility" })
    ) {
      addDataPathSteps([
        {
          id: uniqueId(),
          name: "Access to Funding: Eligibility",
          path: `${history.location.pathname}${history.location.search}`,
        },
      ]);
    }
  }, []);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(appliedFilters);
    fetchData({
      filterString: `aggregateBy=componentName&periods=${selectedYear}${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }, [appliedFilters, selectedYear]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <DotChart
      data={data}
      aggregateBy={get(cmsData, "componentsChartsEligibility.aggregateBy", "")}
      selectedYear={selectedYear}
    />
  );
}
