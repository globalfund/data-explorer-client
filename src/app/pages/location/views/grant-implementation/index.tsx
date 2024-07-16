import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import Box from "@mui/material/Box";
import { useTitle } from "react-use";
import Grid from "@mui/material/Grid";
import { appColors } from "app/theme";
import findIndex from "lodash/findIndex";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { PieChart } from "app/components/charts/pie";
import { LineChart } from "app/components/charts/line";
import { ChartBlock } from "app/components/chart-block";
import { Heatmap } from "app/components/charts/heatmap";
import { CYCLES, CycleProps } from "app/pages/home/data";
import { SankeyChart } from "app/components/charts/sankey";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import { TableContainer } from "app/components/table-container";
import { GrantCardProps } from "app/components/grant-card/data";
import { LineChartProps } from "app/components/charts/line/data";
import { getMonthFromNumber } from "app/utils/getMonthFromNumber";
import { PieChartDataItem } from "app/components/charts/pie/data";
import { SankeyChartData } from "app/components/charts/sankey/data";
import { TABLE_VARIATION_5_COLUMNS } from "app/components/table/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { CHART_1_DROPDOWN_ITEMS } from "app/pages/location/views/grant-implementation/data";
import {
  HeatmapDataItem,
  getPercentageColor,
} from "app/components/charts/heatmap/data";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";

export const GrantImplementation = () => {
  const params = useParams<{ id: string; tab: string }>();
  const paramsId = params.id?.replace("|", "%2F");

  const locationName = useStoreState((state) =>
    get(state.GeographyOverview, "data.data[0].name", params.id)
  );
  useTitle(`The Data Explorer - ${locationName}`);

  const [chart1Cycles, setChart1Cycles] = React.useState<CycleProps[]>([]);
  const [chart2Cycles, setChart2Cycles] = React.useState<CycleProps[]>([]);
  const [chart3Cycles, setChart3Cycles] = React.useState<CycleProps[]>([]);

  const [chart1Dropdown, setChart1Dropdown] = React.useState(
    CHART_1_DROPDOWN_ITEMS[0].value
  );
  // const [chart2Dropdown, setChart2Dropdown] = React.useState(
  //   CHART_2_DROPDOWN_ITEMS[0].value
  // );

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
      get(state.GeographyBudgetsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );
  const disbursementsCycles = useStoreState(
    (state) =>
      get(state.GeographyDisbursementsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );
  const expendituresCycles = useStoreState(
    (state) =>
      get(state.GeographyExpendituresCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );
  const budgetsCyclesAll = useStoreState(
    (state) =>
      get(state.BudgetsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );
  const disbursementsCyclesAll = useStoreState(
    (state) =>
      get(state.DisbursementsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );
  const expendituresCyclesAll = useStoreState(
    (state) =>
      get(state.ExpendituresCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );

  const handleChartCycleChange = (cycle: CycleProps, index: number) => {
    let cycles: CycleProps[] = [];
    let setCycle;
    let multi = true;
    switch (index) {
      case 1:
        cycles = chart1Cycles;
        setCycle = setChart1Cycles;
        break;
      case 2:
        cycles = chart2Cycles;
        setCycle = setChart2Cycles;
        multi = false;
        break;
      case 3:
        cycles = chart3Cycles;
        setCycle = setChart3Cycles;
        multi = false;
        break;
      default:
        break;
    }
    if (setCycle) {
      const cycleIndex = cycles.findIndex((c) => c.value === cycle.value);
      if (cycleIndex > -1) {
        cycles.splice(cycleIndex, 1);
      } else {
        cycles.push(cycle);
      }
      if (cycle.value === CYCLES[0].value) {
        cycles = [];
      }
      if (!multi) {
        cycles = [cycle];
      }
      setCycle([...cycles]);
    }
  };

  useUpdateEffect(() => {
    let filterString = `geographies=${paramsId}`;
    if (chart1Cycles.length > 0) {
      const yearFrom: string[] = [];
      const yearTo: string[] = [];
      chart1Cycles.forEach((cycle) => {
        const years = cycle.value.split(" - ");
        yearFrom.push(years[0]);
        yearTo.push(years[1]);
      });
      if (yearFrom.length > 0) {
        filterString += `&years=${yearFrom.join(",")}`;
      }
      if (yearTo.length > 0) {
        filterString += `${
          filterString.length > 0 ? "&" : ""
        }yearsTo=${yearTo.join(",")}`;
      }
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
  }, [chart1Cycles, chart1Dropdown]);

  useUpdateEffect(() => {
    let filterString = `geographies=${paramsId}`;
    if (chart2Cycles.length > 0) {
      const years = chart2Cycles.map(
        (cycle) => cycle.value.replace(/ /g, "").split("-")[0]
      );
      const yearsTo = chart2Cycles.map(
        (cycle) => cycle.value.replace(/ /g, "").split("-")[1]
      );
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }years=${encodeURIComponent(
        years.join(",")
      )}&yearsTo=${encodeURIComponent(yearsTo.join(","))}`;
    }
    fetchBudgetSankeyChart({
      filterString,
      routeParams: {
        componentField: "activityAreaGroup",
        geographyGrouping: "Standard View",
      },
    });
  }, [chart2Cycles]);

  useUpdateEffect(() => {
    let filterString = `geographies=${paramsId}`;
    if (chart3Cycles.length > 0) {
      filterString += `&periods=${chart3Cycles.map((c) => c.value).join(",")}`;
    }
    fetchExpendituresHeatmap({
      filterString,
      routeParams: {
        row: "principalRecipientType,principalRecipientSubType,principalRecipient",
        column: "component",
        componentField: "activityAreaGroup",
      },
    });
  }, [chart3Cycles]);

  React.useEffect(() => {
    if (budgetsCycles.length > 0) {
      setChart2Cycles([budgetsCycles[budgetsCycles.length - 1]]);
    }
  }, [budgetsCycles]);

  React.useEffect(() => {
    if (expendituresCycles.length > 0) {
      setChart3Cycles([expendituresCycles[expendituresCycles.length - 1]]);
    }
  }, [expendituresCycles]);

  const chart2UnitButtons = React.useMemo(
    () => (
      <Box
        gap="8px"
        display="flex"
        flexDirection="row"
        sx={{
          "& > button": {
            width: "40px",
            height: "32px",
            fontSize: "16px",
            borderRadius: "4px",
            border: `1px solid ${appColors.CHART_BLOCK_CYCLES.BUTTON_BORDER_COLOR}`,
            "&:hover": {
              color: appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR,
              background:
                appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR,
              borderColor:
                appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR,
            },
          },
        }}
      >
        <IconButton
          onClick={() => setChart2Unit("percentage")}
          sx={{
            color:
              chart2Unit === "percentage"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_TEXT_COLOR,
            background:
              chart2Unit === "percentage"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_BACKGROUND_COLOR,
            borderColor:
              chart2Unit === "percentage"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_BORDER_COLOR,
          }}
        >
          %
        </IconButton>
        <IconButton
          onClick={() => setChart2Unit("amount")}
          sx={{
            color:
              chart2Unit === "amount"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_TEXT_COLOR,
            background:
              chart2Unit === "amount"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_BACKGROUND_COLOR,
            borderColor:
              chart2Unit === "amount"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_BORDER_COLOR,
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
        datesStr = `${getMonthFromNumber(
          startDate.getMonth() + 1
        )} ${startDate.getFullYear()} - `;
      }
      if (endDate) {
        datesStr += `${getMonthFromNumber(
          endDate.getMonth() + 1
        )} ${endDate.getFullYear()}`;
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
    return `US$${getFinancialValueWithMetricPrefix(total, range.index, 2)} ${
      range.full
    }`;
  }, [dataDisbursementsLineChart]);

  const totalBudget = React.useMemo(() => {
    let total = 0;
    filter(dataBudgetSankeyChart.links, { source: "Total budget" }).forEach(
      (item) => {
        total += item.value;
      }
    );
    const range = getRange([{ value: total }], ["value"]);
    return `US$${getFinancialValueWithMetricPrefix(total, range.index, 2)} ${
      range.full
    }`;
  }, [dataBudgetSankeyChart]);

  const expendituresTotal = React.useMemo(() => {
    const total = sumBy(
      filter(
        dataExpendituresHeatmap,
        (item) => !item.parentRow && !item.parentColumn
      ),
      "value"
    );
    const range = getRange([{ value: total }], ["value"]);
    return `US$${getFinancialValueWithMetricPrefix(total, range.index, 2)} ${
      range.full
    }`;
  }, [dataExpendituresHeatmap]);

  const lineChartRange = React.useMemo(() => {
    const values: { value: number }[] = [];
    dataDisbursementsLineChart.data.forEach((item) => {
      item.data.forEach((value) => {
        values.push({ value });
      });
    });
    const range = getRange(values, ["value"]);
    return range;
  }, [dataDisbursementsLineChart.data]);

  const fullWidthDivider = (
    <React.Fragment>
      <Box height="2px" />
      <Divider
        sx={{
          left: "-50vw",
          width: "200vw",
          position: "relative",
          borderTopColor: "#868E96",
          "@media (max-width: 767px)": {
            display: "none",
          },
        }}
      />
      <Box height="2px" />
    </React.Fragment>
  );

  const showDisbursementsLineChart = dataDisbursementsLineChart.data.length > 0;
  const showBudgetSankeyChart = dataBudgetSankeyChart.links.length > 0;
  const showExpendituresHeatmap = dataExpendituresHeatmap.length > 0;
  const showGrantsTable = dataGrantsTable.length > 0;

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <ChartBlock
        showCycleAll
        id="disbursements"
        subtitle="Disbursements"
        title={disbursementsTotal}
        selectedCycles={chart1Cycles}
        dropdownSelected={chart1Dropdown}
        dropdownItems={CHART_1_DROPDOWN_ITEMS}
        loading={loadingDisbursementsLineChart}
        handleDropdownChange={setChart1Dropdown}
        handleCycleChange={(value) => handleChartCycleChange(value, 1)}
        empty={!showDisbursementsLineChart && chart1Cycles.length === 0}
        cycles={disbursementsCyclesAll.map((c) => ({
          name: c.value,
          value: c.value,
          disabled: findIndex(disbursementsCycles, { value: c.value }) === -1,
        }))}
        infoType="global"
      >
        <Box position="relative">
          <Typography
            bottom="20px"
            fontSize="10px"
            padding="7px 12px"
            borderRadius="4px"
            position="absolute"
            border="1px solid #DFE3E5"
            sx={{
              transformOrigin: "left",
              transform: "rotate(-90deg)",
            }}
          >
            Y Axis/<b>Disbursed Amount (US$ {lineChartRange.abbr})</b>
          </Typography>
          <LineChart {...dataDisbursementsLineChart} />
          <Typography
            left="40px"
            bottom="-20px"
            fontSize="10px"
            padding="7px 12px"
            borderRadius="4px"
            position="absolute"
            border="1px solid #DFE3E5"
          >
            X Axis/<b>Years</b>
          </Typography>
        </Box>
      </ChartBlock>
      {showDisbursementsLineChart && fullWidthDivider}
      <ChartBlock
        id="budget"
        title={totalBudget}
        subtitle="Grant Budgets"
        selectedCycles={chart2Cycles}
        // dropdownSelected={chart2Dropdown}
        loading={loadingBudgetSankeyChart}
        // dropdownItems={CHART_2_DROPDOWN_ITEMS}
        // handleDropdownChange={setChart2Dropdown}
        empty={!showBudgetSankeyChart && chart2Cycles.length === 0}
        handleCycleChange={(value) => handleChartCycleChange(value, 2)}
        cycles={budgetsCyclesAll.map((c) => ({
          name: c.value,
          value: c.value,
          disabled: findIndex(budgetsCycles, { value: c.value }) === -1,
        }))}
        infoType="budgets"
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
        <SankeyChart data={dataBudgetSankeyChart} />
      </ChartBlock>
      {showBudgetSankeyChart && fullWidthDivider}
      <ChartBlock
        id="expenditures"
        subtitle="Expenditures"
        title={expendituresTotal}
        selectedCycles={chart3Cycles}
        loading={loadingExpendituresHeatmap}
        empty={!showExpendituresHeatmap && chart3Cycles.length === 0}
        handleCycleChange={(value) => handleChartCycleChange(value, 3)}
        cycles={expendituresCyclesAll.map((c) => ({
          name: c.value,
          value: c.value,
          disabled: findIndex(expendituresCycles, { value: c.value }) === -1,
        }))}
        unitButtons={chart2UnitButtons}
        infoType="expenditures"
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
          columnHeader="Principal Recipients"
          rowHeader="Components"
        />
      </ChartBlock>
      {showExpendituresHeatmap && fullWidthDivider}
      <ChartBlock
        id="grants"
        title={`${countGrantsTable} Grants`}
        subtitle=""
        empty={!showGrantsTable && chart3Cycles.length === 0}
        infoType="global"
      >
        <Box height="16px" />
        <TableContainer
          withCycles
          id="financial-insights-table"
          data={dataGrantsTableFormatted}
          columns={TABLE_VARIATION_5_COLUMNS}
        />
        <Box
          height="64px"
          sx={{
            "@media (max-width: 767px)": {
              display: "none",
            },
          }}
        />
        <Box
          width="100%"
          padding="32px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{
            "@media (max-width: 767px)": {
              gap: "32px",
              padding: "16px 0",
              flexDirection: "column",
              "> div": {
                gap: 0,
                width: "100%",
              },
            },
          }}
          data-cy="location-pie-charts"
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
