import React from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { TableContainer } from "app/components/table-container";
import { FilterGroupModel } from "app/components/filters/list/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";
import { TABLE_VARIATION_12_COLUMNS as FUNDING_REQUESTS_TABLE_COLUMNS } from "app/components/table/data";
import { useCMSData } from "app/hooks/useCMSData";

interface AccessToFundingBlock5Props {
  filterString: string;
  filterGroups: FilterGroupModel[];
}

export const AccessToFundingBlock5: React.FC<AccessToFundingBlock5Props> = (
  props: AccessToFundingBlock5Props
) => {
  const location = useLocation();
  const cmsData = useCMSData({ returnData: true });

  const [chart3AppliedFilters, setChart3AppliedFilters] = React.useState<
    string[]
  >([]);
  const [chart3AppliedFiltersData, setChart3AppliedFiltersData] =
    React.useState({
      ...defaultAppliedFilters,
    });

  const dataFundingRequestsTable = useStoreState((state) =>
    get(state.AccessToFundingFundingRequestsTable, "data.data", []).map(
      (item: any, index) => {
        if (index === 0) {
          return {
            ...item,
            top: true,
            _children: item._children.map((subItem: any) => ({
              ...subItem,
              top: true,
            })),
          };
        }
        return item;
      }
    )
  );
  const loadingFundingRequestsTable = useStoreState(
    (state) => state.AccessToFundingFundingRequestsTable.loading
  );
  const fetchFundingRequestsTable = useStoreActions(
    (actions) => actions.AccessToFundingFundingRequestsTable.fetch
  );
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );

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
      default:
        break;
    }
    setChart3AppliedFiltersData(state);
    setChart3AppliedFilters([...state.locations, ...state.components]);
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
        default:
          break;
      }
    });
    setChart3AppliedFiltersData(state);
    setChart3AppliedFilters([...state.locations, ...state.components]);
  };

  const handleResetChartFilters = () => {
    setChart3AppliedFiltersData({
      ...chart3AppliedFiltersData,
      locations: [],
      components: [],
    });
    setChart3AppliedFilters([]);
  };

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
      (appliedFiltersData.cycles.length > 0 &&
        location.search.includes("cycles=")) ||
      chart3AppliedFiltersData.cycles.length > 0
    ) {
      value += `${value.length > 0 ? "&" : ""}periods=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.cycles.map((c) => c.split("-")[0]),
          ...chart3AppliedFiltersData.cycles.map((c) => c.split("-")[0]),
        ]).join(",")
      )}`;
    }
    return value;
  }, [appliedFiltersData, chart3AppliedFiltersData, location.search]);

  React.useEffect(() => {
    fetchFundingRequestsTable({ filterString: chart3FilterString });
  }, [chart3FilterString]);

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
        id="funding-requests"
        title={get(
          cmsData,
          "pagesDatasetsAccessToFunding.fundingRequestsTitle",
          "Funding Requests"
        )}
        subtitle={get(
          cmsData,
          "pagesDatasetsAccessToFunding.fundingRequestsSubtitle",
          "Funding request applications by countries."
        )}
        disableCollapse
        dropdownItems={[]}
        loading={loadingFundingRequestsTable}
        empty={dataFundingRequestsTable.length === 0}
        filterGroups={props.filterGroups}
        appliedFilters={chart3AppliedFilters}
        toggleFilter={handleToggleChartFilter}
        removeFilter={handleRemoveChartFilter}
        handleResetFilters={handleResetChartFilters}
        appliedFiltersData={chart3AppliedFiltersData}
        infoType="global"
      >
        <TableContainer
          dataTree
          id="funding-requests-table"
          data={dataFundingRequestsTable}
          columns={FUNDING_REQUESTS_TABLE_COLUMNS}
          dataTreeStartExpandedFn={(row) => row.getData().top}
        />
      </DatasetChartBlock>
    </Box>
  );
};
