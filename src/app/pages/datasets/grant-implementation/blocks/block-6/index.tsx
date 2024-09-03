import React from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import maxBy from "lodash/maxBy";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import { Table } from "app/components/table";
import { useLocation } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { Dropdown } from "app/components/dropdown";
import { Heatmap } from "app/components/charts/heatmap";
import { getCMSDataField } from "app/utils/getCMSDataField";
import { FilterGroupModel } from "app/components/filters/list/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";
import { ExpandableHorizontalBar } from "app/components/charts/expandable-horizontal-bar";
import { ExpandableHorizontalBarChartDataItem } from "app/components/charts/expandable-horizontal-bar/data";
import {
  HeatmapDataItem,
  getPercentageColor,
} from "app/components/charts/heatmap/data";
import {
  TableDataItem,
  TABLE_VARIATION_15_COLUMNS as EXPENDITURES_TABLE_COLUMNS,
} from "app/components/table/data";
import {
  componentsGroupingOptions,
  dropdownItemsExpenditures,
} from "app/pages/datasets/grant-implementation/data";
import { TableContainer } from "app/components/table-container";

interface GrantImplementationPageBlock6Props {
  filterString: string;
  geographyGrouping: string;
  componentsGrouping: string;
  filterGroups: FilterGroupModel[];
}

export const GrantImplementationPageBlock6: React.FC<
  GrantImplementationPageBlock6Props
> = (props: GrantImplementationPageBlock6Props) => {
  const location = useLocation();
  const cmsData = useCMSData({ returnData: true });

  const [expendituresDropdownSelected, setExpendituresDropdownSelected] =
    React.useState(dropdownItemsExpenditures[0].value);
  const [chart4AppliedFiltersData, setChart4AppliedFiltersData] =
    React.useState({
      ...defaultAppliedFilters,
    });
  const [chart4AppliedFilters, setChart4AppliedFilters] = React.useState<
    string[]
  >([]);

  const [tableSearch, setTableSearch] = React.useState("");

  const dataExpendituresHeatmap = useStoreState(
    (state) =>
      get(
        state.FinancialInsightsExpendituresHeatmap,
        "data.data",
        []
      ) as HeatmapDataItem[]
  );
  const fetchExpendituresHeatmap = useStoreActions(
    (actions) => actions.FinancialInsightsExpendituresHeatmap.fetch
  );
  const loadingExpenditures = useStoreState((state) => {
    switch (expendituresDropdownSelected) {
      case dropdownItemsExpenditures[0].value:
        return state.FinancialInsightsExpendituresHeatmap.loading;
      case dropdownItemsExpenditures[1].value:
        return state.FinancialInsightsExpendituresBarChart.loading;
      case dropdownItemsExpenditures[2].value:
        return state.FinancialInsightsExpendituresTable.loading;
      default:
        return false;
    }
  });
  const dataExpendituresBarChart = useStoreState(
    (state) =>
      get(
        state.FinancialInsightsExpendituresBarChart,
        "data.data",
        []
      ) as ExpandableHorizontalBarChartDataItem[]
  );
  const fetchExpendituresBarChart = useStoreActions(
    (actions) => actions.FinancialInsightsExpendituresBarChart.fetch
  );
  const dataExpendituresTable = useStoreState(
    (state) =>
      get(state.FinancialInsightsExpendituresTable, "data.data", []) as {
        [key: string]: TableDataItem;
      }[]
  );
  const fetchExpendituresTable = useStoreActions(
    (actions) => actions.FinancialInsightsExpendituresTable.fetch
  );
  const expenditureCycles = useStoreState((state) =>
    get(state.ExpendituresCycles, "data.data", [])
      .map((cycle: any) => ({
        label: cycle.value,
        value: cycle.value,
      }))
      .reverse()
  );
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );

  const [
    expendituresCycleDropdownSelected,
    setExpendituresCycleDropdownSelected,
  ] = React.useState(
    expenditureCycles.length > 0 ? expenditureCycles[0].value : null
  );

  const handleResetChartFilters = () => {
    setChart4AppliedFiltersData({
      ...chart4AppliedFiltersData,
      locations: [],
      components: [],
      principalRecipients: [],
      principalRecipientSubTypes: [],
      principalRecipientTypes: [],
      status: [],
      cycles: [],
    });
    setChart4AppliedFilters([]);
  };

  const handleToggleChartFilter = (
    checked: boolean,
    value: string,
    type: string
  ) => {
    let state = { ...chart4AppliedFiltersData };
    switch (type) {
      case "geography":
      case "geographyType":
      case "geographySubType":
        if (checked) {
          state.locations.push(value);
        } else {
          state.locations = state.locations.filter((item) => item !== value);
        }
        break;
      case "component":
        if (checked) {
          state.components.push(value);
        } else {
          state.components = state.components.filter((item) => item !== value);
        }
        break;
      case "principalRecipient":
        if (checked) {
          state.principalRecipients.push(value);
        } else {
          state.principalRecipients = state.principalRecipients.filter(
            (item) => item !== value
          );
        }
        break;
      case "principalRecipientSubType":
        if (checked) {
          state.principalRecipientSubTypes.push(value);
        } else {
          state.principalRecipientSubTypes =
            state.principalRecipientSubTypes.filter((item) => item !== value);
        }
        break;
      case "principalRecipientType":
        if (checked) {
          state.principalRecipientTypes.push(value);
        } else {
          state.principalRecipientTypes = state.principalRecipientTypes.filter(
            (item) => item !== value
          );
        }
        break;
      case "status":
        if (checked) {
          state.status.push(value);
        } else {
          state.status = state.status.filter((item) => item !== value);
        }
        break;
      case "cycle":
        if (checked) {
          state.cycles.push(value);
        } else {
          state.cycles = state.cycles.filter((item) => item !== value);
        }
        break;
      default:
        break;
    }
    setChart4AppliedFiltersData(state);
    setChart4AppliedFilters([
      ...state.locations,
      ...state.components,
      ...state.principalRecipients,
      ...state.principalRecipientSubTypes,
      ...state.principalRecipientTypes,
      ...state.status,
      ...state.cycles,
    ]);
  };

  const handleRemoveChartFilter = (value: string, types: string[]) => {
    let state = { ...chart4AppliedFiltersData };
    types.forEach((type) => {
      switch (type) {
        case "geography":
        case "geographyType":
        case "geographySubType":
          state.locations = state.locations.filter((item) => item !== value);
          break;
        case "component":
          state.components = state.components.filter((item) => item !== value);
          break;
        case "principalRecipient":
          state.principalRecipients = state.principalRecipients.filter(
            (item) => item !== value
          );
          break;
        case "principalRecipientSubType":
          state.principalRecipientSubTypes =
            state.principalRecipientSubTypes.filter((item) => item !== value);
          break;
        case "principalRecipientType":
          state.principalRecipientTypes = state.principalRecipientTypes.filter(
            (item) => item !== value
          );
          break;
        case "status":
          state.status = state.status.filter((item) => item !== value);
          break;
        case "cycle":
          state.cycles = state.cycles.filter((item) => item !== value);
          break;
        default:
          break;
      }
    });
    setChart4AppliedFiltersData(state);
    setChart4AppliedFilters([
      ...state.locations,
      ...state.components,
      ...state.principalRecipients,
      ...state.principalRecipientSubTypes,
      ...state.principalRecipientTypes,
      ...state.status,
      ...state.cycles,
    ]);
  };

  const expendituresCycleDropdown = React.useMemo(() => {
    if (!expendituresCycleDropdownSelected) {
      return <React.Fragment />;
    }
    return (
      <Dropdown
        dropdownItems={expenditureCycles}
        dropdownSelected={expendituresCycleDropdownSelected}
        handleDropdownChange={setExpendituresCycleDropdownSelected}
      />
    );
  }, [expenditureCycles, expendituresCycleDropdownSelected]);

  const expendituresChartEmpty = React.useMemo(() => {
    switch (expendituresDropdownSelected) {
      case dropdownItemsExpenditures[0].value:
        return !dataExpendituresHeatmap.length;
      case dropdownItemsExpenditures[1].value:
        return !dataExpendituresBarChart.length;
      case dropdownItemsExpenditures[2].value:
        return !dataExpendituresTable.length && !tableSearch.length;
      default:
        return false;
    }
  }, [
    tableSearch,
    expendituresDropdownSelected,
    dataExpendituresHeatmap,
    dataExpendituresBarChart,
    dataExpendituresTable,
  ]);

  const totalExpenditure = React.useMemo(() => {
    return formatFinancialValue(
      sumBy(
        filter(
          dataExpendituresHeatmap,
          (item) => !item.parentRow && !item.parentColumn
        ),
        "value"
      )
    );
  }, [dataExpendituresHeatmap]);

  const chart4FilterString = React.useMemo(() => {
    let value = "";
    if (
      (appliedFiltersData.locations.length > 0 &&
        location.search.includes("locations=")) ||
      chart4AppliedFiltersData.locations.length > 0
    ) {
      value += `geographies=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.locations,
          ...chart4AppliedFiltersData.locations,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.components.length > 0 &&
        location.search.includes("components=")) ||
      chart4AppliedFiltersData.components.length > 0
    ) {
      value += `${value.length > 0 ? "&" : ""}components=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.components,
          ...chart4AppliedFiltersData.components,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipients.length > 0 &&
        location.search.includes("principalRecipients=")) ||
      chart4AppliedFiltersData.principalRecipients.length > 0
    ) {
      value += `${
        value.length > 0 ? "&" : ""
      }principalRecipients=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipients,
          ...chart4AppliedFiltersData.principalRecipients,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientSubTypes.length > 0 &&
        location.search.includes("principalRecipientSubTypes=")) ||
      chart4AppliedFiltersData.principalRecipientSubTypes.length > 0
    ) {
      value += `${
        value.length > 0 ? "&" : ""
      }principalRecipientSubTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientSubTypes,
          ...chart4AppliedFiltersData.principalRecipientSubTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientTypes.length > 0 &&
        location.search.includes("principalRecipientTypes=")) ||
      chart4AppliedFiltersData.principalRecipientTypes.length > 0
    ) {
      value += `${
        value.length > 0 ? "&" : ""
      }principalRecipientTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientTypes,
          ...chart4AppliedFiltersData.principalRecipientTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.status.length > 0 &&
        location.search.includes("status=")) ||
      chart4AppliedFiltersData.status.length > 0
    ) {
      value += `${value.length > 0 ? "&" : ""}status=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.status,
          ...chart4AppliedFiltersData.status,
        ]).join(",")
      )}`;
    }
    if (expendituresCycleDropdownSelected) {
      // const year = expendituresCycleDropdownSelected
      //   .replace(/ /g, "")
      //   .split("-")[0];
      // const yearTo = expendituresCycleDropdownSelected
      //   .replace(/ /g, "")
      //   .split("-")[1];
      // value += `${
      //   value.length > 0 ? "&" : ""
      // }years=${encodeURIComponent(year)}&yearsTo=${encodeURIComponent(yearTo)}`;
      value += `${
        value.length > 0 ? "&" : ""
      }cycleNames=${expendituresCycleDropdownSelected}`;
    }
    return value;
  }, [
    location.search,
    appliedFiltersData,
    chart4AppliedFiltersData,
    expendituresCycleDropdownSelected,
  ]);

  const onSearchChange = (search: string) => {
    setTableSearch(search);
    let filterString = chart4FilterString;
    if (search) {
      filterString += `${filterString.length > 0 ? "&" : ""}q=${search}`;
    }
    fetchExpendituresTable({
      filterString,
      routeParams: {
        componentField:
          props.componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping: props.geographyGrouping,
      },
    });
  };

  const expendituresChartContent = React.useMemo(() => {
    switch (expendituresDropdownSelected) {
      case dropdownItemsExpenditures[0].value:
        return (
          <Heatmap
            valueType="amount"
            contentProp="value"
            hoveredLegend={null}
            columnCategory="cycle"
            rowCategory="component"
            data={dataExpendituresHeatmap}
            getItemColor={getPercentageColor}
            columnHeader={getCMSDataField(
              cmsData,
              "pagesDatasetsGrantImplementation.expendituresHeatmapColumnHeader",
              "Principal Recipients"
            )}
            rowHeader={getCMSDataField(
              cmsData,
              "pagesDatasetsGrantImplementation.expendituresHeatmapRowHeader",
              "Components"
            )}
          />
        );
      case dropdownItemsExpenditures[1].value:
        return (
          <ExpandableHorizontalBar
            data={dataExpendituresBarChart}
            yAxisLabel={getCMSDataField(
              cmsData,
              "pagesDatasetsGrantImplementation.expendituresBarchartYLabel",
              "Modules & Interventions"
            )}
            xAxisLabel={getCMSDataField(
              cmsData,
              "pagesDatasetsGrantImplementation.expendituresBarchartXLabel",
              "Expenditure"
            )}
            valueLabels={{
              value: "amount",
            }}
            itemStyle={{
              color: () => appColors.TIME_CYCLE.BAR_COLOR_1,
            }}
          />
        );
      case dropdownItemsExpenditures[2].value:
        return (
          <TableContainer
            dataTree
            search={tableSearch}
            id="expenditures-table"
            data={dataExpendituresTable}
            onSearchChange={onSearchChange}
            columns={EXPENDITURES_TABLE_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [
    tableSearch,
    expendituresDropdownSelected,
    dataExpendituresHeatmap,
    dataExpendituresBarChart,
    dataExpendituresTable,
  ]);

  React.useEffect(() => {
    fetchExpendituresHeatmap({
      filterString: chart4FilterString,
      routeParams: {
        row: "principalRecipientType,principalRecipientSubType,principalRecipient",
        column: "component",
        componentField:
          props.componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping: props.geographyGrouping,
      },
    });
    fetchExpendituresBarChart({
      filterString: chart4FilterString,
      routeParams: {
        componentField:
          props.componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping: props.geographyGrouping,
      },
    });
    fetchExpendituresTable({
      filterString: chart4FilterString,
      routeParams: {
        componentField:
          props.componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping: props.geographyGrouping,
      },
    });
  }, [chart4FilterString, props.componentsGrouping, props.geographyGrouping]);

  React.useEffect(() => {
    if (location.hash) {
      const blockId = location.hash.slice(1).split("|")[0];
      const blockChartType = location.hash.slice(1).split("|")[1];
      if (blockId && blockChartType && blockId === "expenditures") {
        setExpendituresDropdownSelected(decodeURIComponent(blockChartType));
      }
    }
  }, [location.hash]);

  return (
    <Box
      padding="50px 0"
      sx={{
        "#content": {
          padding: 0,
        },
      }}
    >
      <DatasetChartBlock
        id="expenditures"
        title={getCMSDataField(
          cmsData,
          "pagesDatasetsGrantImplementation.expendituresTitle",
          "Expenditures"
        )}
        subtitle={`${totalExpenditure} reported expenditure.`}
        dropdownItems={dropdownItemsExpenditures}
        dropdownSelected={expendituresDropdownSelected}
        loading={loadingExpenditures}
        handleDropdownChange={(value) => setExpendituresDropdownSelected(value)}
        disableCollapse={
          expendituresDropdownSelected === dropdownItemsExpenditures[2].value
        }
        empty={expendituresChartEmpty}
        filterGroups={props.filterGroups}
        appliedFilters={chart4AppliedFilters}
        toggleFilter={handleToggleChartFilter}
        removeFilter={handleRemoveChartFilter}
        handleResetFilters={handleResetChartFilters}
        appliedFiltersData={chart4AppliedFiltersData}
        extraDropdown={expendituresCycleDropdown}
        infoType="expenditures"
      >
        <Box
          sx={{
            width: "100%",
            height: "16px",
            "@media (min-width: 768px)": {
              display: "none",
            },
          }}
        />
        {expendituresChartContent}
      </DatasetChartBlock>
    </Box>
  );
};
