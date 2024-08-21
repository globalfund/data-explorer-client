import React from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { Dropdown } from "app/components/dropdown";
import { FilterGroupModel } from "app/components/filters/list/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { FinancialMetric } from "app/components/charts/financial-metric";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";
import { componentsGroupingOptions } from "app/pages/datasets/grant-implementation/data";
import {
  FinancialMetricExpandableItemProps,
  STORY_DATA_VARIANT_1 as FINANCIAL_METRICS_DATA_1,
  STORY_DATA_VARIANT_2 as FINANCIAL_METRICS_DATA_2,
  STORY_DATA_VARIANT_3 as FINANCIAL_METRICS_DATA_3,
} from "app/components/charts/financial-metric/data";

interface GrantImplementationPageBlock5Props {
  filterString: string;
  geographyGrouping: string;
  componentsGrouping: string;
  filterGroups: FilterGroupModel[];
}

export const GrantImplementationPageBlock5: React.FC<
  GrantImplementationPageBlock5Props
> = (props: GrantImplementationPageBlock5Props) => {
  const location = useLocation();

  const [chart3AppliedFilters, setChart3AppliedFilters] = React.useState<
    string[]
  >([]);
  const [chart3AppliedFiltersData, setChart3AppliedFiltersData] =
    React.useState({
      ...defaultAppliedFilters,
    });

  const dataBudgetUtilisation = useStoreState(
    (state) =>
      get(state.FinancialInsightsBudgetUtilisation, "data.data[0]", {
        value: 0,
        items: [],
      }) as {
        value: number;
        items: FinancialMetricExpandableItemProps[];
      }
  );
  const fetchBudgetUtilisation = useStoreActions(
    (actions) => actions.FinancialInsightsBudgetUtilisation.fetch
  );
  const dataInCountryAbsorption = useStoreState(
    (state) =>
      get(state.FinancialInsightsCountryAbsorption, "data.data[0]", {
        value: 0,
        items: [],
      }) as {
        value: number;
        items: FinancialMetricExpandableItemProps[];
      }
  );
  const fetchInCountryAbsorption = useStoreActions(
    (actions) => actions.FinancialInsightsCountryAbsorption.fetch
  );
  const dataDisbursementUtilisation = useStoreState(
    (state) =>
      get(state.FinancialInsightsDisbursementUtilisation, "data.data[0]", {
        value: 0,
        items: [],
      }) as {
        value: number;
        items: FinancialMetricExpandableItemProps[];
      }
  );
  const fetchDisbursementUtilisation = useStoreActions(
    (actions) => actions.FinancialInsightsDisbursementUtilisation.fetch
  );
  const loadingFinancialMetrics = useStoreState((state) => {
    return (
      state.FinancialInsightsBudgetUtilisation.loading ||
      state.FinancialInsightsCountryAbsorption.loading ||
      state.FinancialInsightsDisbursementUtilisation.loading
    );
  });
  const metricsCycles = useStoreState((state) =>
    get(state.FinancialMetricsCycles, "data.data", [])
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
    financialMetricsCycleDropdownSelected,
    setFinancialMetricsCycleDropdownSelected,
  ] = React.useState(metricsCycles.length > 0 ? metricsCycles[0].value : null);

  const handleResetChartFilters = () => {
    setChart3AppliedFiltersData({
      ...chart3AppliedFiltersData,
      locations: [],
      components: [],
      principalRecipients: [],
      principalRecipientSubTypes: [],
      principalRecipientTypes: [],
      status: [],
      cycles: [],
    });
    setChart3AppliedFilters([]);
  };

  const handleToggleChartFilter = (
    checked: boolean,
    value: string,
    type: string
  ) => {
    let state = { ...chart3AppliedFiltersData };
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
    setChart3AppliedFiltersData(state);
    setChart3AppliedFilters([
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
    let state = { ...chart3AppliedFiltersData };
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
    setChart3AppliedFiltersData(state);
    setChart3AppliedFilters([
      ...state.locations,
      ...state.components,
      ...state.principalRecipients,
      ...state.principalRecipientSubTypes,
      ...state.principalRecipientTypes,
      ...state.status,
      ...state.cycles,
    ]);
  };

  const financialMetricsContent = React.useMemo(() => {
    return (
      <Box
        gap="40px"
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{
          "@media (max-width: 767px)": {
            marginTop: "32px",
          },
        }}
      >
        {dataBudgetUtilisation.items.length > 0 && (
          <FinancialMetric
            {...FINANCIAL_METRICS_DATA_1}
            donutChart={{
              ...FINANCIAL_METRICS_DATA_1.donutChart,
              value: dataBudgetUtilisation.value,
            }}
            items={dataBudgetUtilisation.items}
          />
        )}
        {dataInCountryAbsorption.items.length > 0 && (
          <FinancialMetric
            {...FINANCIAL_METRICS_DATA_2}
            donutChart={{
              ...FINANCIAL_METRICS_DATA_2.donutChart,
              value: dataInCountryAbsorption.value,
            }}
            items={dataInCountryAbsorption.items}
          />
        )}
        {dataDisbursementUtilisation.items.length > 0 && (
          <FinancialMetric
            {...FINANCIAL_METRICS_DATA_3}
            donutChart={{
              ...FINANCIAL_METRICS_DATA_3.donutChart,
              value: dataDisbursementUtilisation.value,
            }}
            items={dataDisbursementUtilisation.items}
          />
        )}
      </Box>
    );
  }, [
    dataBudgetUtilisation,
    dataInCountryAbsorption,
    dataDisbursementUtilisation,
  ]);

  const financialMetricsEmpty = React.useMemo(() => {
    return (
      !dataBudgetUtilisation.items.length &&
      !dataInCountryAbsorption.items.length &&
      !dataDisbursementUtilisation.items.length
    );
  }, [
    dataBudgetUtilisation,
    dataInCountryAbsorption,
    dataDisbursementUtilisation,
  ]);

  const financialMetricsCycleDropdown = React.useMemo(() => {
    if (!financialMetricsCycleDropdownSelected) {
      return <React.Fragment />;
    }
    return (
      <Dropdown
        dropdownItems={metricsCycles}
        dropdownSelected={financialMetricsCycleDropdownSelected}
        handleDropdownChange={setFinancialMetricsCycleDropdownSelected}
      />
    );
  }, [metricsCycles, financialMetricsCycleDropdownSelected]);

  const chart3FilterString = React.useMemo(() => {
    let value = "";
    if (
      (appliedFiltersData.locations.length > 0 &&
        location.search.includes("locations=")) ||
      chart3AppliedFiltersData.locations.length > 0
    ) {
      value += `geographies=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.locations,
          ...chart3AppliedFiltersData.locations,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.components.length > 0 &&
        location.search.includes("components=")) ||
      chart3AppliedFiltersData.components.length > 0
    ) {
      value += `${value.length > 0 ? "&" : ""}components=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.components,
          ...chart3AppliedFiltersData.components,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipients.length > 0 &&
        location.search.includes("principalRecipients=")) ||
      chart3AppliedFiltersData.principalRecipients.length > 0
    ) {
      value += `${
        value.length > 0 ? "&" : ""
      }principalRecipients=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipients,
          ...chart3AppliedFiltersData.principalRecipients,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientSubTypes.length > 0 &&
        location.search.includes("principalRecipientSubTypes=")) ||
      chart3AppliedFiltersData.principalRecipientSubTypes.length > 0
    ) {
      value += `${
        value.length > 0 ? "&" : ""
      }principalRecipientSubTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientSubTypes,
          ...chart3AppliedFiltersData.principalRecipientSubTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientTypes.length > 0 &&
        location.search.includes("principalRecipientTypes=")) ||
      chart3AppliedFiltersData.principalRecipientTypes.length > 0
    ) {
      value += `${
        value.length > 0 ? "&" : ""
      }principalRecipientTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientTypes,
          ...chart3AppliedFiltersData.principalRecipientTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.status.length > 0 &&
        location.search.includes("status=")) ||
      chart3AppliedFiltersData.status.length > 0
    ) {
      value += `${value.length > 0 ? "&" : ""}status=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.status,
          ...chart3AppliedFiltersData.status,
        ]).join(",")
      )}`;
    }
    if (financialMetricsCycleDropdownSelected) {
      // const year = financialMetricsCycleDropdownSelected
      //   .replace(/ /g, "")
      //   .split("-")[0];
      // const yearTo = financialMetricsCycleDropdownSelected
      //   .replace(/ /g, "")
      //   .split("-")[1];
      // value += `${
      //   value.length > 0 ? "&" : ""
      // }years=${encodeURIComponent(year)}&yearsTo=${encodeURIComponent(yearTo)}`;
      value += `${
        value.length > 0 ? "&" : ""
      }cycleNames=${financialMetricsCycleDropdownSelected}`;
    }
    return value;
  }, [
    location.search,
    appliedFiltersData,
    chart3AppliedFiltersData,
    financialMetricsCycleDropdownSelected,
  ]);

  React.useEffect(() => {
    fetchBudgetUtilisation({
      filterString: chart3FilterString,
      routeParams: {
        componentField:
          props.componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping: props.geographyGrouping,
      },
    });
    fetchInCountryAbsorption({
      filterString: chart3FilterString,
      routeParams: {
        componentField:
          props.componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping: props.geographyGrouping,
      },
    });
    fetchDisbursementUtilisation({
      filterString: chart3FilterString,
      routeParams: {
        componentField:
          props.componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping: props.geographyGrouping,
      },
    });
  }, [chart3FilterString, props.componentsGrouping, props.geographyGrouping]);

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
        id="financial-metrics"
        title="Financial Metrics"
        subtitle=""
        dropdownItems={[]}
        empty={financialMetricsEmpty}
        loading={loadingFinancialMetrics}
        filterGroups={props.filterGroups}
        appliedFilters={chart3AppliedFilters}
        toggleFilter={handleToggleChartFilter}
        removeFilter={handleRemoveChartFilter}
        handleResetFilters={handleResetChartFilters}
        appliedFiltersData={chart3AppliedFiltersData}
        extraDropdown={financialMetricsCycleDropdown}
        infoType="financials"
      >
        {financialMetricsContent}
      </DatasetChartBlock>
    </Box>
  );
};
