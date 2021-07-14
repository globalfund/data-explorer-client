/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DotChartModel } from "app/components/Charts/Eligibility/DotChart/data";
import { EligibilityTable } from "app/modules/viz-module/sub-modules/eligibility/table";
import { Dropdown } from "app/components/Dropdown";
import { InfoIcon } from "app/assets/icons/Info";

function getTableData(data: DotChartModel[]): SimpleTableRow[] {
  const updatedTableData: SimpleTableRow[] = [];
  data.forEach((item: DotChartModel) => {
    updatedTableData.push({
      name: item.name,
      status: "",
      children: item.items.map((subItem: any) => ({
        name: subItem.name,
        status: subItem.status,
      })),
    });
  });
  return updatedTableData;
}

export function GenericEligibilityWrapper() {
  useTitle("The Data Explorer - Eligibility");

  const dataYearOptions = useStoreState(
    (state) => get(state.EligibilityYears.data, "data", []) as string[]
  );

  const [selectedYear, setSelectedYear] = React.useState<string>(
    get(dataYearOptions, "[0]", "2020")
  );

  const fetchYearOptionsData = useStoreActions(
    (store) => store.EligibilityYears.fetch
  );

  const data = useStoreState(
    (state) => get(state.Eligibility.data, "data", []) as DotChartModel[]
  );

  const [tableData, setTableData] = React.useState<SimpleTableRow[]>(
    getTableData(data)
  );

  // aggregateBy control const
  const aggregateBy = useStoreState(
    (state) =>
      (state.ToolBoxPanelAggregateByState.value.length > 0
        ? state.ToolBoxPanelAggregateByState.value
        : "componentName") as "componentName" | "geographicAreaName"
  );

  const fetchData = useStoreActions((store) => store.Eligibility.fetch);

  const isLoading = useStoreState((state) => state.Eligibility.loading);

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    fetchYearOptionsData({});
  }, []);

  useUpdateEffect(() => setSelectedYear(get(dataYearOptions, "[0]", "2020")), [
    dataYearOptions,
  ]);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(appliedFilters);
    fetchData({
      filterString: `aggregateBy=${aggregateBy}&periods=${selectedYear}${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }, [aggregateBy, appliedFilters, selectedYear]);

  useUpdateEffect(() => setTableData(getTableData(data)), [data]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <div
        css={`
          gap: 6px;
          display: flex;
          font-weight: bold;
          align-items: center;
        `}
      >
        <div
          css={`
            margin-right: 10px;
          `}
        >
          Year
        </div>
        <Dropdown
          value={selectedYear}
          options={dataYearOptions}
          handleChange={setSelectedYear}
        />
        <div
          css={`
            display: flex;
            margin-left: 10px;
          `}
        >
          <InfoIcon />
        </div>
      </div>
      <div css="width: 100%;height: 25px;" />
      <EligibilityTable
        data={tableData}
        isLoading={isLoading}
        columns={[
          {
            name:
              aggregateBy === "componentName"
                ? "Component/Location"
                : "Location/Component",
            key: "name",
          },
          { name: "Status", key: "status" },
        ]}
      />
    </React.Fragment>
  );
}
