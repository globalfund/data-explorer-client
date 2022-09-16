/* third-party */
import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DotChart } from "app/components/Charts/Eligibility/DotChart";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DotChartModel } from "app/components/Charts/Eligibility/DotChart/data";

export function EligibilityModule() {
  useTitle("Dataxplorer - Eligibility");

  const selectedYear = useStoreState(
    (state) => state.ToolBoxPanelEligibilityYearState.value
  );

  // aggregateBy control const
  const aggregateBy = useStoreState(
    (state) =>
      (state.ToolBoxPanelAggregateByState.value.length > 0
        ? state.ToolBoxPanelAggregateByState.value
        : "componentName") as "componentName" | "geographicAreaName"
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
  const datasource = useStoreState((state) => state.DataSourceState.value);

  React.useEffect(() => {
    fetchYearOptionsData({
      filterString: `datasource=${datasource}`,
    });
  }, []);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(appliedFilters, { datasource });
    fetchData({
      filterString: `aggregateBy=${aggregateBy}&periods=${selectedYear}${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }, [aggregateBy, appliedFilters, selectedYear]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <DotChart
      data={data}
      aggregateBy={aggregateBy}
      selectedYear={selectedYear}
    />
  );
}
