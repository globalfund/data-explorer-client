import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { appColors } from "app/theme";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { CYCLES } from "app/pages/home/data";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { PieChart } from "app/components/charts/pie";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { LineChart } from "app/components/charts/line";
import { ChartBlock } from "app/components/chart-block";
import { Heatmap } from "app/components/charts/heatmap";
import { SankeyChart } from "app/components/charts/sankey";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { TableContainer } from "app/components/table-container";
import { GrantCardProps } from "app/components/grant-card/data";
import { LineChartProps } from "app/components/charts/line/data";
import { getMonthFromNumber } from "app/utils/getMonthFromNumber";
import { SankeyChartData } from "app/components/charts/sankey/data";
import { TABLE_VARIATION_5_COLUMNS } from "app/components/table/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  CHART_1_DROPDOWN_ITEMS,
  CHART_2_DROPDOWN_ITEMS,
  GrantImplementationProps,
} from "app/pages/location/views/grant-implementation/data";
import {
  HeatmapDataItem,
  getPercentageColor,
} from "app/components/charts/heatmap/data";
import {
  STORY_DATA_VARIANT_1 as PIE_CHART_DATA_1,
  STORY_DATA_VARIANT_2 as PIE_CHART_DATA_2,
  STORY_DATA_VARIANT_3 as PIE_CHART_DATA_3,
  PieChartDataItem,
} from "app/components/charts/pie/data";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";

export const GrantImplementation: React.FC<GrantImplementationProps> = (
  props: GrantImplementationProps
) => {
  const params = useParams<{ id: string; tab: string }>();

  const [chart1Cycle, setChart1Cycle] = React.useState(CYCLES[0]);
  const [chart2Cycle, setChart2Cycle] = React.useState(CYCLES[0]);
  const [chart3Cycle, setChart3Cycle] = React.useState(CYCLES[0]);

  const [chart1Dropdown, setChart1Dropdown] = React.useState(
    CHART_1_DROPDOWN_ITEMS[0].value
  );
  const [chart2Dropdown, setChart2Dropdown] = React.useState(
    CHART_2_DROPDOWN_ITEMS[0].value
  );

  const [chart2Unit, setChart2Unit] = React.useState<"amount" | "percentage">(
    "percentage"
  );

  const dataDisbursementsLineChart = useStoreState(
    (state) =>
      get(state.GeographyDisbursementsLineChart, "data", {
        data: [],
        xAxisKeys: [],
      }) as LineChartProps
  );
  const fetchDisbursementsLineChart = useStoreActions(
    (actions) => actions.GeographyDisbursementsLineChart.fetch
  );
  const loadingDisbursementsLineChart = useStoreState(
    (state) => state.GeographyDisbursementsLineChart.loading
  );
  const dataBudgetSankeyChart = useStoreState((state) => ({
    nodes: get(
      state.GeographyBudgetSankeyChart,
      "data.data.nodes",
      []
    ) as SankeyChartData["nodes"],
    links: get(
      state.GeographyBudgetSankeyChart,
      "data.data.links",
      []
    ) as SankeyChartData["links"],
  }));
  const fetchBudgetSankeyChart = useStoreActions(
    (actions) => actions.GeographyBudgetSankeyChart.fetch
  );
  const loadingBudgetSankeyChart = useStoreState(
    (state) => state.GeographyBudgetSankeyChart.loading
  );
  const dataExpendituresHeatmap = useStoreState(
    (state) =>
      get(
        state.GeographyExpendituresHeatmap,
        "data.data",
        []
      ) as HeatmapDataItem[]
  );
  const fetchExpendituresHeatmap = useStoreActions(
    (actions) => actions.GeographyExpendituresHeatmap.fetch
  );
  const loadingExpendituresHeatmap = useStoreState(
    (state) => state.GeographyExpendituresHeatmap.loading
  );
  const dataGrantsPieCharts = useStoreState(
    (state) =>
      get(state.GeographyGrantsPieCharts, "data.data", {
        pie1: [],
        pie2: [],
        pie3: [],
      }) as {
        pie1: PieChartDataItem[];
        pie2: PieChartDataItem[];
        pie3: PieChartDataItem[];
      }
  );
  const dataGrantsTable = useStoreState(
    (state) =>
      get(state.GeographyGrantsTable, "data.data", []) as GrantCardProps[]
  );
  const countGrantsTable = useStoreState((state) =>
    get(state.GeographyGrantsTable, "data.count", 0)
  );
  const budgetsCycles = useStoreState(
    (state) =>
      get(state.BudgetsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );
  const disbursementsCycles = useStoreState(
    (state) =>
      get(state.DisbursementsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );
  const expendituresCycles = useStoreState(
    (state) =>
      get(state.ExpendituresCycles, "data.data", []) as {
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
      case 3:
        setChart3Cycle(cycle);
        break;
      default:
        break;
    }
  };

  useUpdateEffect(() => {
    let filterString = `geographies=${params.id}`;
    if (chart1Cycle.value !== CYCLES[0].value) {
      filterString += `&periods=${chart1Cycle.value}`;
    }
    fetchDisbursementsLineChart({
      filterString,
      routeParams: {
        componentField:
          chart1Dropdown === CHART_1_DROPDOWN_ITEMS[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
  }, [chart1Cycle, chart1Dropdown]);

  useUpdateEffect(() => {
    let filterString = `geographies=${params.id}`;
    if (chart2Cycle.value !== CYCLES[0].value) {
      filterString += `&periods=${chart2Cycle.value}`;
    }
    fetchBudgetSankeyChart({
      filterString,
      routeParams: {
        componentField:
          chart2Dropdown === CHART_2_DROPDOWN_ITEMS[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
  }, [chart2Cycle, chart2Dropdown]);

  useUpdateEffect(() => {
    let filterString = `geographies=${params.id}`;
    if (chart3Cycle.value !== CYCLES[0].value) {
      filterString += `&periods=${chart3Cycle.value}`;
    }
    fetchExpendituresHeatmap({
      filterString,
      routeParams: {
        row: "principalRecipientType,principalRecipient",
        column: "component",
        componentField: "activityAreaGroup",
      },
    });
  }, [chart3Cycle]);

  const chart2UnitButtons = React.useMemo(
    () => (
      <Box
        gap="8px"
        display="flex"
        flexDirection="row"
        sx={{
          "& > button": {
            padding: "0",
            width: "32px",
            height: "32px",
            fontSize: "12px",
            borderRadius: "8px",
            "&:hover": {
              color: "#fff",
              background: "#000",
            },
          },
        }}
      >
        <IconButton
          onClick={() => setChart2Unit("percentage")}
          sx={{
            color: chart2Unit === "percentage" ? "#fff" : "#000",
            background: chart2Unit === "percentage" ? "#000" : "#F1F3F4",
          }}
        >
          %
        </IconButton>
        <IconButton
          onClick={() => setChart2Unit("amount")}
          sx={{
            color: chart2Unit === "amount" ? "#fff" : "#000",
            background: chart2Unit === "amount" ? "#000" : "#F1F3F4",
          }}
        >
          $
        </IconButton>
      </Box>
    ),
    [chart2Unit]
  );

  const dataGrantsTableFormatted = React.useMemo(() => {
    return dataGrantsTable.map((item) => {
      let datesStr = "";
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      if (startDate) {
        datesStr = `${getMonthFromNumber(startDate.getMonth() + 1)} ${startDate.getFullYear()} - `;
      }
      if (endDate) {
        datesStr += `${getMonthFromNumber(endDate.getMonth() + 1)} ${endDate.getFullYear()}`;
      }
      return {
        grantId: item.number,
        startEndDate: datesStr,
        geography: item.location,
        component: item.component,
        principalRecipient: item.principalRecipient,
        status: item.status,
        signed: item.signed,
        disbursed: item.disbursed,
      };
    });
  }, [dataGrantsTable]);

  const disbursementsTotal = React.useMemo(() => {
    let total = 0;
    dataDisbursementsLineChart.data.forEach((item) => {
      total += sumBy(item.data);
    });
    const range = getRange([{ value: total }], ["value"]);
    return `US$${getFinancialValueWithMetricPrefix(total, range.index, 2)} ${range.full}`;
  }, [dataDisbursementsLineChart]);

  const pagination = React.useMemo(
    () => (
      <Box gap="8px" padding="0 32px" display="flex" alignItems="center">
        <Typography fontSize="12px">
          {(props.page - 1) * 9 + 1}-{props.page * 9} of {countGrantsTable}
        </Typography>
        <IconButton
          sx={{ padding: 0 }}
          onClick={() => {
            if (props.page > 1) props.setPage(props.page - 1);
          }}
        >
          <ArrowBack htmlColor="#000" sx={{ fontSize: "16px" }} />
        </IconButton>
        <IconButton
          sx={{ padding: 0 }}
          onClick={() => {
            if (props.page < countGrantsTable / 9)
              props.setPage(props.page + 1);
          }}
        >
          <ArrowForward htmlColor="#000" sx={{ fontSize: "16px" }} />
        </IconButton>
      </Box>
    ),
    [countGrantsTable, props.page]
  );

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

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <ChartBlock
        title={disbursementsTotal}
        selectedCycle={chart1Cycle}
        cycles={disbursementsCycles}
        dropdownSelected={chart1Dropdown}
        dropdownItems={CHART_1_DROPDOWN_ITEMS}
        loading={loadingDisbursementsLineChart}
        handleDropdownChange={setChart1Dropdown}
        empty={dataDisbursementsLineChart.data.length === 0}
        subtitle={`Disbursed within ${countGrantsTable} Grants`}
        handleCycleChange={(value) => handleChartCycleChange(value, 1)}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <LineChart {...dataDisbursementsLineChart} />
      </ChartBlock>
      {fullWidthDivider}
      <ChartBlock
        title="Budget"
        cycles={budgetsCycles}
        selectedCycle={chart2Cycle}
        dropdownSelected={chart2Dropdown}
        loading={loadingBudgetSankeyChart}
        dropdownItems={CHART_2_DROPDOWN_ITEMS}
        handleDropdownChange={setChart2Dropdown}
        subtitle="to date with transparent budgets"
        empty={dataBudgetSankeyChart.links.length === 0}
        handleCycleChange={(value) => handleChartCycleChange(value, 2)}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <Grid
          container
          spacing={4}
          sx={{
            color: "#464646",
            fontSize: "10px",
            fontWeight: "700",
          }}
        >
          <Grid item xs={3}>
            Total Budgets
          </Grid>
          <Grid item xs={3}>
            Landscape 1
          </Grid>
          <Grid item xs={3}>
            Landscape 2
          </Grid>
          <Grid item xs={3}>
            Cost Category
          </Grid>
        </Grid>
        <Box
          sx={{
            "#sankey-chart": {
              height: "1000px",
            },
          }}
        >
          <SankeyChart data={dataBudgetSankeyChart} />
        </Box>
      </ChartBlock>
      {fullWidthDivider}
      <ChartBlock
        subtitle="To date"
        title="Expenditures"
        cycles={expendituresCycles}
        selectedCycle={chart3Cycle}
        loading={loadingExpendituresHeatmap}
        empty={dataExpendituresHeatmap.length === 0}
        handleCycleChange={(value) => handleChartCycleChange(value, 3)}
        text="Our Grant Implementation programs are developed meticulously, each Grant follows a well executed plan, always supervised by TGF Implementation team."
        unitButtons={chart2UnitButtons}
      >
        <Heatmap
          valueType={chart2Unit}
          data={dataExpendituresHeatmap}
          contentProp={chart2Unit === "percentage" ? "percentage" : "value"}
          hoveredLegend={null}
          columnCategory="cycle"
          rowCategory="component"
          getItemColor={getPercentageColor}
          bgColor={appColors.HEATMAP.CHART_BG_COLOR}
        />
      </ChartBlock>
      {fullWidthDivider}
      <ChartBlock
        title={`${countGrantsTable} Grants`}
        subtitle="to date"
        empty={dataGrantsTable.length === 0}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <Box height="16px" />
        <TableContainer
          withCycles
          id="financial-insights-table"
          data={dataGrantsTableFormatted}
          columns={TABLE_VARIATION_5_COLUMNS}
        />
        <Box height="16px" />
        {pagination}
        <Box height="64px" />
        <Box
          width="100%"
          padding="32px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box
            gap="16px"
            display="flex"
            alignItems="center"
            width="calc(100% / 3)"
            flexDirection="column"
          >
            <Typography color="#000" fontSize="18px" fontWeight="700">
              Components
            </Typography>
            <PieChart data={dataGrantsPieCharts.pie1} />
          </Box>
          <Box
            gap="16px"
            display="flex"
            alignItems="center"
            width="calc(100% / 3)"
            flexDirection="column"
          >
            <Typography color="#000" fontSize="18px" fontWeight="700">
              Principal Recipients
            </Typography>
            <PieChart data={dataGrantsPieCharts.pie2} />
          </Box>
          <Box
            gap="16px"
            display="flex"
            alignItems="center"
            width="calc(100% / 3)"
            flexDirection="column"
          >
            <Typography color="#000" fontSize="18px" fontWeight="700">
              Investments
            </Typography>
            <PieChart data={dataGrantsPieCharts.pie3} />
          </Box>
        </Box>
      </ChartBlock>
    </Box>
  );
};
