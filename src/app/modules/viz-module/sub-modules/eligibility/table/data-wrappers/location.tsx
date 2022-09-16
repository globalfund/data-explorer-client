/* third-party */
import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { EligibilityTable } from "app/modules/viz-module/sub-modules/eligibility/table";
import {
  diseaseBurdens,
  EligibilityScatterplotDataItemModel,
  EligibilityScatterplotDataModel,
  incomeLevels,
} from "app/components/Charts/Eligibility/Scatterplot/data";

function getTableData(
  data: EligibilityScatterplotDataModel[]
): SimpleTableRow[] {
  const updatedTableData: SimpleTableRow[] = [];
  filter(
    data,
    (item: EligibilityScatterplotDataModel) =>
      item.id.toString() !== "dummy1" && item.id.toString() !== "dummy2"
  ).forEach((item: EligibilityScatterplotDataModel) => {
    item.data.forEach((subItem: EligibilityScatterplotDataItemModel) => {
      updatedTableData.push({
        year: subItem.x,
        component: item.id,
        incomeLevel: get(
          incomeLevels,
          `[${subItem.incomeLevel}]`,
          subItem.incomeLevel
        ),
        diseaseBurden: get(
          diseaseBurdens,
          `[${subItem.diseaseBurden}]`,
          subItem.diseaseBurden
        ),
        status: subItem.eligibility,
      });
    });
  });
  return updatedTableData;
}

interface Props {
  code: string;
}

export function LocationEligibilityTableWrapper(props: Props) {
  useTitle("Dataxplorer - Location Eligibility");

  const data = useStoreState(
    (state) =>
      get(
        state.EligibilityCountry.data,
        "data",
        []
      ) as EligibilityScatterplotDataModel[]
  );

  const [tableData, setTableData] = React.useState<SimpleTableRow[]>(
    getTableData(data)
  );

  const fetchData = useStoreActions((store) => store.EligibilityCountry.fetch);

  const isLoading = useStoreState((state) => state.EligibilityCountry.loading);

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);
  const datasource = useStoreState((state) => state.DataSourceState.value);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters,
      { datasource }
    );
    fetchData({ filterString });
  }, [props.code, appliedFilters]);

  useUpdateEffect(() => setTableData(getTableData(data)), [data]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <EligibilityTable
      data={tableData}
      isLoading={isLoading}
      columns={[
        { name: "Year", key: "year" },
        { name: "Component", key: "component" },
        { name: "Income Level", key: "incomeLevel" },
        { name: "Disease Burden", key: "diseaseBurden" },
        { name: "Status", key: "status" },
      ]}
    />
  );
}
