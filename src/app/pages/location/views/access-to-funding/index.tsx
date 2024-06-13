import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { appColors } from "app/theme";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { Table } from "app/components/table";
import { useParams } from "react-router-dom";
import { CYCLES } from "app/pages/home/data";
import Typography from "@mui/material/Typography";
import Info from "@mui/icons-material/InfoOutlined";
import { ChartBlock } from "app/components/chart-block";
import { RadialChart } from "app/components/charts/radial";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import { RaceBarChart } from "app/components/charts/race-bar";
import { TableContainer } from "app/components/table-container";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { RadialChartDataItem } from "app/components/charts/radial/data";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";
import {
  TABLE_VARIATION_2_COLUMNS,
  TABLE_VARIATION_6_COLUMNS,
  TABLE_VARIATION_10_COLUMNS as ELIGIBILITY_TABLE_COLUMNS,
} from "app/components/table/data";

export const AccessToFunding: React.FC = () => {
  const params = useParams<{ id: string; tab: string }>();

  const [chart1Cycle, setChart1Cycle] = React.useState(CYCLES[0]);
  const [chart2Cycle, setChart2Cycle] = React.useState(CYCLES[0]);

  const dataAllocationsRadialChart = useStoreState(
    (state) =>
      get(
        state.GeographyAllocationsRadialChart,
        "data.data",
        []
      ) as RadialChartDataItem[]
  );
  const fetchAllocationsRadialChart = useStoreActions(
    (actions) => actions.GeographyAllocationsRadialChart.fetch
  );
  const loadingAllocationsRadialChart = useStoreState(
    (state) => state.GeographyAllocationsRadialChart.loading
  );
  const dataFundingRequestsTable = useStoreState((state) =>
    get(state.GeographyFundingRequestsTable, "data.data[0]", {
      _children: [],
    })
  );
  const fetchFundingRequestsTable = useStoreActions(
    (actions) => actions.GeographyFundingRequestsTable.fetch
  );
  const loadingFundingRequestsTable = useStoreState(
    (state) => state.GeographyFundingRequestsTable.loading
  );
  const dataFundingRequestStats = useStoreState((state) => ({
    submitted: get(
      state.GeographyFundingRequestsTable,
      "data.submittedCount[0].count",
      0
    ),
    signed: get(
      state.GeographyFundingRequestsTable,
      "data.signedCount[0].count",
      0
    ),
  }));
  const dataEligibilityTable = useStoreState((state) =>
    get(state.GeographyEligibilityTable, "data.data", [])
  );
  const dataDocumentsTable = useStoreState((state) =>
    get(state.GeographyDocumentsTable, "data.data", [])
  );
  const allocationsCycles = useStoreState(
    (state) =>
      get(state.AllocationsCycles, "data.data", []).map((c: any) => ({
        name: c.value,
        value: c.value,
      })) as {
        name: string;
        value: string;
      }[]
  );
  const fundingRequestsCycles = useStoreState(
    (state) =>
      filter(
        get(state.FundingRequestsCycles, "data.data", []).map((c: any) => ({
          name: c.value,
          value: c.value,
        })),
        (c: any) => c.value
      ) as {
        name: string;
        value: string;
      }[]
  );

  const handleChartCycleChange = (
    cycle: { name: string; value: string },
    index: number
  ) => {
    switch (index) {
      case 1:
        setChart1Cycle(cycle);
        break;
      case 2:
        setChart2Cycle(cycle);
        break;
      default:
        break;
    }
  };

  useUpdateEffect(() => {
    if (params.id) {
      let filterString = "";
      if (chart1Cycle.value !== CYCLES[0].value) {
        filterString = `periods=${chart1Cycle.value}`;
      }
      fetchAllocationsRadialChart({
        filterString,
        routeParams: { code: params.id },
      });
    }
  }, [chart1Cycle]);

  useUpdateEffect(() => {
    if (params.id) {
      let filterString = "";
      if (chart1Cycle.value !== CYCLES[0].value) {
        filterString += `&periods=${chart2Cycle.value}`;
      }
      fetchFundingRequestsTable({
        filterString,
        routeParams: {
          code: params.id,
        },
      });
    }
  }, [chart2Cycle]);

  React.useEffect(() => {
    if (
      allocationsCycles.length > 0 &&
      chart1Cycle.value !==
        allocationsCycles[allocationsCycles.length - 1].value
    ) {
      setChart1Cycle(allocationsCycles[allocationsCycles.length - 1]);
    }
  }, [allocationsCycles]);

  React.useEffect(() => {
    if (
      fundingRequestsCycles.length > 0 &&
      chart2Cycle.value !==
        fundingRequestsCycles[fundingRequestsCycles.length - 1].value
    ) {
      setChart2Cycle(fundingRequestsCycles[fundingRequestsCycles.length - 1]);
    }
  }, [fundingRequestsCycles]);

  const totalAllocationAmount = React.useMemo(() => {
    const value = sumBy(dataAllocationsRadialChart, "value");
    const range = getRange([{ value }], ["value"]);
    return `${getFinancialValueWithMetricPrefix(value, range.index, 2)} ${range.full}`;
  }, [dataAllocationsRadialChart]);

  const raceBarData = React.useMemo(() => {
    const res = [
      {
        name: "Signed",
        value: dataFundingRequestStats.signed,
        color: "#0A2840",
        percentage: parseFloat(
          (
            (dataFundingRequestStats.signed /
              dataFundingRequestStats.submitted) *
            100
          ).toFixed(2)
        ),
      },
      {
        name: "Submitted",
        value: dataFundingRequestStats.submitted,
        color: "#00B5AE",
        percentage: 100,
      },
    ];
    return res;
  }, [dataFundingRequestStats]);

  const fullWidthDivider = (
    <React.Fragment>
      <Box height="2px" />
      <Divider
        sx={{
          left: "-50vw",
          width: "200vw",
          position: "relative",
          borderTopColor: "#868E96",
        }}
      />
      <Box height="2px" />
    </React.Fragment>
  );

  const showAllocationRadialChart = dataAllocationsRadialChart.length > 0;
  const showFundingRequestsTable =
    dataFundingRequestsTable._children.length > 0;
  const showEligibilityHeatmap = dataEligibilityTable.length > 0;
  const showDocumentsTable = dataDocumentsTable.length > 0;

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <ChartBlock
        cycles={allocationsCycles}
        title={`US$${totalAllocationAmount}`}
        selectedCycles={[chart1Cycle]}
        loading={loadingAllocationsRadialChart}
        handleCycleChange={(value) => handleChartCycleChange(value, 1)}
        subtitle={`Funds Allocated ${
          chart1Cycle !== CYCLES[0] ? ` ${chart1Cycle.value}` : ""
        }`}
        empty={!showAllocationRadialChart}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <RadialChart
          tooltipLabel="Allocation"
          data={dataAllocationsRadialChart}
          itemLabelFormatterType="name"
        />
      </ChartBlock>
      {showAllocationRadialChart && (
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Box display="flex" alignItems="center" flexDirection="column">
            <Typography variant="h3" fontWeight="900">
              US${totalAllocationAmount}
            </Typography>
            <Typography variant="subtitle2">
              Total Allocation
              {chart1Cycle !== CYCLES[0] ? ` ${chart1Cycle.value}` : ""}
            </Typography>
          </Box>
        </Box>
      )}
      {showAllocationRadialChart && fullWidthDivider}
      <ChartBlock
        noSplitText
        noBottomToolbar
        selectedCycles={[chart2Cycle]}
        cycles={fundingRequestsCycles}
        loading={loadingFundingRequestsTable}
        title={`${dataFundingRequestsTable._children.length} Funding Requests`}
        subtitle="Submitted to date"
        empty={!showFundingRequestsTable}
        handleCycleChange={(value) => handleChartCycleChange(value, 2)}
        text="The Funding Request explains how the applicant would use Global Fund allocated funds, if approved. Funding Requests are reviewed by the Global Fund’s Technical Review Panel (TRP). Once approved by the TRP, the Funding Request is turned into one or more grants through the grant-making negotiation. The Grant Approvals Committee (GAC) reviews the final version of each grant and recommends implementation-ready grants to the Global Fund Board for approval. Funding Requests are submitted for internal Global Fund review, but the final grant is the legally-binding agreement.<br/><br/>Documents for a specific funding request can be downloaded by clicking the cloud icon. Documents from the 2017-2019 Allocation Period and earlier can be found by clicking on the “Documents’ tab above. If a Funding Request is not visible for the 2023-2025 Allocation Period and the country received an Allocation, it likely means that the applicant has not yet registered for a TRP Window."
      >
        <TableContainer
          dataTree
          withCycles
          id="funding-requests-table"
          data={dataFundingRequestsTable._children}
          columns={TABLE_VARIATION_2_COLUMNS.slice(0, 7)}
          extraColumns={TABLE_VARIATION_2_COLUMNS.slice(7)}
        />
        <Box height="64px" />
        <RaceBarChart noValuesFormat data={raceBarData} />
      </ChartBlock>
      <Box height="50px" />
      {showFundingRequestsTable && (
        <Grid
          container
          spacing={2}
          sx={{
            "> div": {
              "> div": {
                gap: "10px",
                width: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              },
            },
          }}
        >
          <Grid item xs={12} sm={6}>
            <Box>
              <Box
                width="40px"
                height="40px"
                borderRadius="50%"
                bgcolor={appColors.RADIAL_CHART.ITEM_COLORS[2]}
              />
              <Box>
                <Typography variant="h3" fontWeight="900">
                  {dataFundingRequestStats.submitted} Submitted
                </Typography>
                <Typography variant="subtitle2">Funding Requests</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Box
                width="40px"
                height="40px"
                borderRadius="50%"
                bgcolor={appColors.RADIAL_CHART.ITEM_COLORS[0]}
              />
              <Box>
                <Typography variant="h3" fontWeight="900">
                  {dataFundingRequestStats.signed} Signed
                </Typography>
                <Typography variant="subtitle2">
                  {(
                    (dataFundingRequestStats.signed /
                      dataFundingRequestStats.submitted) *
                    100
                  ).toFixed(2)}
                  % Grants
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
      {showFundingRequestsTable && fullWidthDivider}
      <ChartBlock
        noSplitText
        title="Eligibility"
        subtitle="To date"
        empty={!showEligibilityHeatmap}
        text="Eligibility for funding from the Global Fund is determined by country income classification and disease burden for HIV, tuberculosis and malaria. Below are the components which are eligible for an allocation for the selected allocation period, according to the Global Fund Eligibility Policy.<br/><br/>Eligibility for the 2023-2025 Allocation Period was determined in 2022 and documented in the 2023 Eligibility List. Eligibility does not guarantee a funding allocation. Learn more about Eligibility <a target='_blank' href='https://www.theglobalfund.org/en/applying-for-funding/understand-and-prepare/eligibility/'>here</a> or <a>see the full history of eligibility for this country</a>."
      >
        <Box height="32px" />
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
            <Info fontSize="small" />
          </Tooltip>
        </Box>
        <Table
          dataTree
          dataTreeStartExpanded
          id="eligibility-table"
          data={dataEligibilityTable}
          columns={ELIGIBILITY_TABLE_COLUMNS}
        />
      </ChartBlock>
      {showEligibilityHeatmap && fullWidthDivider}
      <ChartBlock
        noBottomToolbar
        title="Documents"
        subtitle="Applications"
        empty={!showDocumentsTable}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <Box height="64px" />
        <TableContainer
          dataTree
          id="documents-table"
          dataTreeStartExpanded
          data={dataDocumentsTable}
          columns={TABLE_VARIATION_6_COLUMNS}
        />
      </ChartBlock>
    </Box>
  );
};
