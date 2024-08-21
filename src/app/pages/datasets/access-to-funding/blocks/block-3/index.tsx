import React from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import Box from "@mui/material/Box";
import { Table } from "app/components/table";
import { useLocation } from "react-router-dom";
import { Dropdown } from "app/components/dropdown";
import { Treemap } from "app/components/charts/treemap";
import { SunburstChart } from "app/components/charts/sunburst";
import { FilterGroupModel } from "app/components/filters/list/data";
import { TreemapDataItem } from "app/components/charts/treemap/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";
import { dropdownItemsAllocations } from "app/pages/datasets/access-to-funding/data";
import { TABLE_VARIATION_11_COLUMNS as ALLOCATIONS_TABLE_COLUMNS } from "app/components/table/data";

interface AccessToFundingBlock3Props {
  filterString: string;
  filterGroups: FilterGroupModel[];
}

export const AccessToFundingBlock3: React.FC<AccessToFundingBlock3Props> = (
  props: AccessToFundingBlock3Props
) => {
  const location = useLocation();

  const [dropdownSelected, setDropdownSelected] = React.useState(
    dropdownItemsAllocations[0].value
  );
  const [allocationCycleDropdownSelected, setAllocationCycleDropdownSelected] =
    React.useState<string | null>(null);
  const [chart2AppliedFilters, setChart2AppliedFilters] = React.useState<
    string[]
  >([]);
  const [chart2AppliedFiltersData, setChart2AppliedFiltersData] =
    React.useState({
      ...defaultAppliedFilters,
    });

  const dataAllocationsSunburst = useStoreState((state) =>
    get(state.AccessToFundingAllocationSunburst, "data.data", [])
  );
  const fetchAllocationsSunburst = useStoreActions(
    (actions) => actions.AccessToFundingAllocationSunburst.fetch
  );
  const dataAllocationsTreemap = useStoreState(
    (state) =>
      get(
        state.AccessToFundingAllocationTreemap,
        "data.data",
        []
      ) as TreemapDataItem[]
  );
  const fetchAllocationsTreemap = useStoreActions(
    (actions) => actions.AccessToFundingAllocationTreemap.fetch
  );
  const dataAllocationsTable = useStoreState((state) =>
    get(state.AccessToFundingAllocationTable, "data.data", [])
  );
  const fetchAllocationsTable = useStoreActions(
    (actions) => actions.AccessToFundingAllocationTable.fetch
  );
  const loadingAllocations = useStoreState((state) => {
    switch (dropdownSelected) {
      case dropdownItemsAllocations[0].value:
        return state.AccessToFundingAllocationSunburst.loading;
      case dropdownItemsAllocations[1].value:
        return state.AccessToFundingAllocationTreemap.loading;
      case dropdownItemsAllocations[2].value:
        return state.AccessToFundingAllocationTable.loading;
      default:
        return false;
    }
  });
  const dataCycleFilterOptions = useStoreState((state) => ({
    id: "cycle",
    name: "Cycle",
    options: get(state.AllocationsCycles, "data.data", []).map(
      (item: { value: string }) => ({
        name: item.value,
        value: item.value,
      })
    ),
  }));
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );

  const chart2FilterString = React.useMemo(() => {
    let value = "";
    if (
      (appliedFiltersData.locations.length > 0 &&
        location.search.includes("locations=")) ||
      chart2AppliedFiltersData.locations.length > 0
    ) {
      value += `geographies=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.locations,
          ...chart2AppliedFiltersData.locations,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.components.length > 0 &&
        location.search.includes("components=")) ||
      chart2AppliedFiltersData.components.length > 0
    ) {
      value += `${value.length > 0 ? "&" : ""}components=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.components,
          ...chart2AppliedFiltersData.components,
        ]).join(",")
      )}`;
    }
    if (allocationCycleDropdownSelected) {
      value += `${value.length > 0 ? "&" : ""}cycles=${encodeURIComponent(
        allocationCycleDropdownSelected
      )}`;
    }
    return value;
  }, [
    location.search,
    appliedFiltersData,
    chart2AppliedFiltersData,
    allocationCycleDropdownSelected,
  ]);

  const allocationCycleDropdown = React.useMemo(() => {
    if (!allocationCycleDropdownSelected) {
      return <React.Fragment />;
    }
    return (
      <Dropdown
        dropdownItems={dataCycleFilterOptions.options.map((item) => ({
          label: item.name,
          value: item.value,
        }))}
        dropdownSelected={allocationCycleDropdownSelected}
        handleDropdownChange={setAllocationCycleDropdownSelected}
      />
    );
  }, [dataCycleFilterOptions, allocationCycleDropdownSelected]);

  const chartContent = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItemsAllocations[0].value:
        return (
          <SunburstChart
            tooltipLabel="Allocation"
            data={dataAllocationsSunburst}
            centerLabel="Total Allocation"
          />
        );
      case dropdownItemsAllocations[1].value:
        return <Treemap data={dataAllocationsTreemap} />;
      case dropdownItemsAllocations[2].value:
        return (
          <Table
            dataTree
            id="allocations-table"
            data={dataAllocationsTable}
            columns={ALLOCATIONS_TABLE_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [
    dropdownSelected,
    dataAllocationsSunburst,
    dataAllocationsTreemap,
    dataAllocationsTable,
  ]);

  const chartEmpty = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItemsAllocations[0].value:
        return dataAllocationsSunburst.length === 0;
      case dropdownItemsAllocations[1].value:
        return dataAllocationsTreemap.length === 0;
      case dropdownItemsAllocations[2].value:
        return dataAllocationsTable.length === 0;
      default:
        return false;
    }
  }, [
    dropdownSelected,
    dataAllocationsSunburst,
    dataAllocationsTreemap,
    dataAllocationsTable,
  ]);

  const handleSelectionChange = (value: string) => {
    setDropdownSelected(value);
  };

  const handleToggleChartFilter = (
    checked: boolean,
    value: string,
    type: string
  ) => {
    let state = { ...chart2AppliedFiltersData };
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
      default:
        break;
    }
    setChart2AppliedFiltersData(state);
    setChart2AppliedFilters([...state.locations, ...state.components]);
  };

  const handleRemoveChartFilter = (value: string, types: string[]) => {
    let state = { ...chart2AppliedFiltersData };
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
        default:
          break;
      }
    });
    setChart2AppliedFiltersData(state);
    setChart2AppliedFilters([...state.locations, ...state.components]);
  };

  const handleResetChartFilters = () => {
    setChart2AppliedFiltersData({
      ...chart2AppliedFiltersData,
      locations: [],
      components: [],
    });
    setChart2AppliedFilters([]);
  };

  React.useEffect(() => {
    if (location.hash) {
      const blockId = location.hash.slice(1).split("|")[0];
      const blockChartType = location.hash.slice(1).split("|")[1];
      if (blockId && blockChartType && blockId === "allocation") {
        setDropdownSelected(decodeURIComponent(blockChartType));
      }
    }
  }, [location.hash]);

  React.useEffect(() => {
    if (allocationCycleDropdownSelected) {
      fetchAllocationsSunburst({ filterString: chart2FilterString });
      fetchAllocationsTreemap({ filterString: chart2FilterString });
      fetchAllocationsTable({ filterString: chart2FilterString });
    }
  }, [chart2FilterString]);

  React.useEffect(() => {
    if (
      dataCycleFilterOptions.options.length > 0 &&
      !allocationCycleDropdownSelected
    ) {
      setAllocationCycleDropdownSelected(
        dataCycleFilterOptions.options[
          dataCycleFilterOptions.options.length - 1
        ].value
      );
    }
  }, [dataCycleFilterOptions]);

  return (
    <Box
      padding="50px 0"
      sx={{
        "#content": {
          padding: 0,
        },
        "@media (max-width: 767px)": {
          padding: "20px 0",
        },
      }}
    >
      <DatasetChartBlock
        id="allocation"
        title="Allocation"
        subtitle="Allocations amounts for countries."
        dropdownItems={dropdownItemsAllocations}
        dropdownSelected={dropdownSelected}
        handleDropdownChange={handleSelectionChange}
        loading={loadingAllocations}
        empty={chartEmpty}
        disableCollapse={dropdownSelected === dropdownItemsAllocations[2].value}
        filterGroups={props.filterGroups}
        appliedFilters={chart2AppliedFilters}
        toggleFilter={handleToggleChartFilter}
        removeFilter={handleRemoveChartFilter}
        handleResetFilters={handleResetChartFilters}
        appliedFiltersData={chart2AppliedFiltersData}
        extraDropdown={allocationCycleDropdown}
        infoType="global"
      >
        {chartContent}
      </DatasetChartBlock>
    </Box>
  );
};
