import React from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Tooltip from "@mui/material/Tooltip";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Info from "@mui/icons-material/InfoOutlined";
import { TableContainer } from "app/components/table-container";
import { FilterGroupModel } from "app/components/filters/list/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";
import {
  cellBGColorFormatter,
  TABLE_VARIATION_10_COLUMNS as ELIGIBILITY_TABLE_COLUMNS,
} from "app/components/table/data";

interface AccessToFundingBlock2Props {
  filterString: string;
  filterGroups: FilterGroupModel[];
}

export const AccessToFundingBlock2: React.FC<AccessToFundingBlock2Props> = (
  props: AccessToFundingBlock2Props
) => {
  const location = useLocation();

  const [chart1AppliedFilters, setChart1AppliedFilters] = React.useState<
    string[]
  >([]);
  const [chart1AppliedFiltersData, setChart1AppliedFiltersData] =
    React.useState({
      ...defaultAppliedFilters,
    });

  const dataEligibilityTable = useStoreState((state) =>
    get(state.AccessToFundingEligibilityTable, "data.data", []).map(
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
  const dataEligibilityTableYears = useStoreState((state) =>
    get(state.AccessToFundingEligibilityTable, "data.years", [])
  );
  const loadingEligibilityTable = useStoreState(
    (state) => state.AccessToFundingEligibilityTable.loading
  );
  const fetchEligibilityTable = useStoreActions(
    (actions) => actions.AccessToFundingEligibilityTable.fetch
  );
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );

  const chart1FilterString = React.useMemo(() => {
    let value = "";
    if (
      (appliedFiltersData.locations.length > 0 &&
        location.search.includes("locations=")) ||
      chart1AppliedFiltersData.locations.length > 0
    ) {
      value += `geographies=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.locations,
          ...chart1AppliedFiltersData.locations,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.components.length > 0 &&
        location.search.includes("components=")) ||
      chart1AppliedFiltersData.components.length > 0
    ) {
      value += `${value.length > 0 ? "&" : ""}components=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.components,
          ...chart1AppliedFiltersData.components,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.cycles.length > 0 &&
        location.search.includes("cycles=")) ||
      chart1AppliedFiltersData.cycles.length > 0
    ) {
      value += `${value.length > 0 ? "&" : ""}cycles=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.cycles,
          ...chart1AppliedFiltersData.cycles,
        ]).join(",")
      )}`;
    }
    return value;
  }, [appliedFiltersData, chart1AppliedFiltersData, location.search]);

  const eligibilityTableColumns = React.useMemo(() => {
    return [
      ELIGIBILITY_TABLE_COLUMNS[0],
      ...dataEligibilityTableYears.map((year) => ({
        width: 60,
        title: year,
        field: year,
        headerSort: false,
        formatter: cellBGColorFormatter,
      })),
    ];
  }, [dataEligibilityTable]);

  const handleToggleChartFilter = (
    checked: boolean,
    value: string,
    type: string
  ) => {
    let state = { ...chart1AppliedFiltersData };
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
    setChart1AppliedFiltersData(state);
    setChart1AppliedFilters([...state.locations, ...state.components]);
  };

  const handleRemoveChartFilter = (value: string, types: string[]) => {
    let state = { ...chart1AppliedFiltersData };
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
    setChart1AppliedFiltersData(state);
    setChart1AppliedFilters([...state.locations, ...state.components]);
  };

  const handleResetChartFilters = () => {
    setChart1AppliedFiltersData({
      ...chart1AppliedFiltersData,
      locations: [],
      components: [],
    });
    setChart1AppliedFilters([]);
  };

  React.useEffect(() => {
    fetchEligibilityTable({ filterString: chart1FilterString });
  }, [chart1FilterString]);

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
        id="eligibility"
        title="Eligibility"
        subtitle="Country eligibility for funding over time."
        dropdownItems={[]}
        disableCollapse
        loading={loadingEligibilityTable}
        empty={dataEligibilityTable.length === 0}
        filterGroups={props.filterGroups}
        appliedFilters={chart1AppliedFilters}
        toggleFilter={handleToggleChartFilter}
        removeFilter={handleRemoveChartFilter}
        handleResetFilters={handleResetChartFilters}
        appliedFiltersData={chart1AppliedFiltersData}
        infoType="global"
      >
        <Box
          gap="20px"
          width="100%"
          display="flex"
          marginBottom="20px"
          flexDirection="row"
          justifyContent="flex-end"
          sx={{
            "> div": {
              display: "flex",
              flexDirection: "column",
              "> div": {
                gap: "10px",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                "> div": {
                  gap: "5px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  "#rectangle": {
                    width: "11px",
                    height: "11px",
                    borderRadius: "2px",
                  },
                },
              },
            },
            "@media (max-width: 767px)": {
              gap: "16px",
              flexDirection: "column",
            },
          }}
        >
          <Box>
            <Typography fontSize="12px" fontWeight="700">
              Disease Burden
            </Typography>
            <Box>
              <Box>
                <Box
                  id="rectangle"
                  bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[0]}
                />
                <Typography fontSize="12px">Extreme</Typography>
              </Box>
              <Box>
                <Box
                  id="rectangle"
                  bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[1]}
                />
                <Typography fontSize="12px">Severe</Typography>
              </Box>
              <Box>
                <Box
                  id="rectangle"
                  bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[2]}
                />
                <Typography fontSize="12px">High</Typography>
              </Box>
              <Box>
                <Box
                  id="rectangle"
                  bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[3]}
                />
                <Typography fontSize="12px">Moderate</Typography>
              </Box>
              <Box>
                <Box
                  id="rectangle"
                  bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[4]}
                />
                <Typography fontSize="12px">Not High</Typography>
              </Box>
              <Box>
                <Box
                  id="rectangle"
                  bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[5]}
                />
                <Typography fontSize="12px">Low</Typography>
              </Box>
              <Box>
                <Box id="rectangle" bgcolor="#FFFFFF" border="1px solid #ccc" />
                <Typography fontSize="12px">NA</Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography fontSize="12px" fontWeight="700">
              Eligibility Status
            </Typography>
            <Box>
              <Box>
                <Box id="rectangle" bgcolor="#013E77" />
                <Typography fontSize="12px">Eligible</Typography>
              </Box>
              <Box>
                <Box id="rectangle" bgcolor="#00B5AE" />
                <Typography fontSize="12px">Transition Funding</Typography>
              </Box>
              <Box>
                <Box id="rectangle" bgcolor="#D9D9D9" />
                <Typography fontSize="12px">Not Eligible</Typography>
              </Box>
            </Box>
          </Box>
          <Tooltip title="">
            <Info
              fontSize="small"
              sx={{
                "@media (max-width: 920px)": {
                  display: "none",
                },
              }}
            />
          </Tooltip>
        </Box>
        <TableContainer
          dataTree
          id="eligibility-table"
          data={dataEligibilityTable}
          columns={eligibilityTableColumns}
          dataTreeStartExpandedFn={(row) => row.getData().top}
        />
      </DatasetChartBlock>
    </Box>
  );
};
