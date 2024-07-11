import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Divider from "@mui/material/Divider";
import { Search } from "app/components/search";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { BarChart } from "app/components/charts/bar";
import { LineChart } from "app/components/charts/line";
import { ChartBlock } from "app/components/chart-block";
import { Heatmap } from "app/components/charts/heatmap";
import { Treemap } from "app/components/charts/treemap";
import { HomeHero } from "app/pages/home/components/hero";
import { RadialChart } from "app/components/charts/radial";
import { LineChartProps } from "app/components/charts/line/data";
import { BarChartDataItem } from "app/components/charts/bar/data";
import { TreemapDataItem } from "app/components/charts/treemap/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { RadialChartDataItem } from "app/components/charts/radial/data";
import { HomeResultsStats } from "app/pages/home/components/results-stats";
import { applyResultValueFormula } from "app/utils/applyResultValueFormula";
import { StatCompProps } from "app/pages/home/components/results-stats/data";
import {
  CYCLES,
  CycleProps,
  CHART_4_DROPDOWN_ITEMS,
  CHART_5_DROPDOWN_ITEMS,
  CHART_3_DROPDOWN_ITEMS,
} from "app/pages/home/data";
import {
  HeatmapDataItem,
  getPercentageColor,
} from "app/components/charts/heatmap/data";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";

export const Home: React.FC = () => {
  const [chart1Cycles, setChart1Cycles] = React.useState<CycleProps[]>([]);
  const [chart2Cycles, setChart2Cycles] = React.useState<CycleProps[]>([]);
  const [chart3Cycles, setChart3Cycles] = React.useState<CycleProps[]>([]);
  const [chart4Cycles, setChart4Cycles] = React.useState<CycleProps[]>([]);
  const [chart5Cycles, setChart5Cycles] = React.useState<CycleProps[]>([]);

  const [chart3Dropdown, setChart3Dropdown] = React.useState(
    CHART_3_DROPDOWN_ITEMS[0].value
  );
  const [chart4Dropdown, setChart4Dropdown] = React.useState(
    CHART_4_DROPDOWN_ITEMS[0].value
  );
  const [chart5Dropdown, setChart5Dropdown] = React.useState(
    CHART_5_DROPDOWN_ITEMS[0].value
  );

  const [chart5Unit, setChart5Unit] = React.useState<"amount" | "percentage">(
    "percentage"
  );

  const dataResultsStats = useStoreState(
    (state) => get(state.HomeResultsStats, "data.stats", []) as StatCompProps[]
  );
  const loadingResultsStats = useStoreState((state) =>
    Boolean(state.HomeResultsStats.loading)
  );
  const fetchResultsStats = useStoreActions(
    (actions) => actions.HomeResultsStats.fetch
  );
  const dataPledgesContributionsBarChart = useStoreState(
    (state) =>
      get(
        state.HomePledgesContributionsBarChart,
        "data.data",
        []
      ) as BarChartDataItem[]
  );
  const loadingPledgesContributionsBarChart = useStoreState((state) =>
    Boolean(state.HomePledgesContributionsBarChart.loading)
  );
  const fetchPledgesContributionsBarChart = useStoreActions(
    (actions) => actions.HomePledgesContributionsBarChart.fetch
  );
  const dataAllocationsRadialChart = useStoreState(
    (state) =>
      get(
        state.HomeAllocationsRadialChart,
        "data.data.chart",
        []
      ) as RadialChartDataItem[]
  );
  const loadingAllocationsRadialChart = useStoreState((state) =>
    Boolean(state.HomeAllocationsRadialChart.loading)
  );
  const fetchAllocationsRadialChart = useStoreActions(
    (actions) => actions.HomeAllocationsRadialChart.fetch
  );
  const dataBudgetsTreemap = useStoreState(
    (state) =>
      get(state.HomeBudgetsTreemap, "data.data", []) as TreemapDataItem[]
  );
  const loadingBudgetsTreemap = useStoreState((state) =>
    Boolean(state.HomeBudgetsTreemap.loading)
  );
  const fetchBudgetsTreemap = useStoreActions(
    (actions) => actions.HomeBudgetsTreemap.fetch
  );
  const dataDisbursementsLineChart = useStoreState(
    (state) =>
      get(state.HomeDisbursementsLineChart, "data", {
        data: [],
        xAxisKeys: [],
      }) as LineChartProps
  );
  const loadingDisbursementsLineChart = useStoreState((state) =>
    Boolean(state.HomeDisbursementsLineChart.loading)
  );
  const fetchDisbursementsLineChart = useStoreActions(
    (actions) => actions.HomeDisbursementsLineChart.fetch
  );
  const dataExpendituresHeatmap = useStoreState(
    (state) =>
      get(state.HomeExpendituresHeatmap, "data.data", []) as HeatmapDataItem[]
  );
  const loadingExpendituresHeatmap = useStoreState((state) =>
    Boolean(state.HomeExpendituresHeatmap.loading)
  );
  const fetchExpendituresHeatmap = useStoreActions(
    (actions) => actions.HomeExpendituresHeatmap.fetch
  );
  const pledgesContributionsCycles = useStoreState(
    (state) =>
      get(state.PledgesContributionsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );
  const allocationsCycles = useStoreState(
    (state) =>
      get(state.AllocationsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
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
  const annualResultsCycles = useStoreState(
    (state) =>
      get(state.AnnualResultsCycles, "data.data", []) as {
        name: number;
        value: number;
      }[]
  );

  const handleChartCycleChange = (cycle: CycleProps, index: number) => {
    let cycles: {
      name: string;
      value: string;
    }[] = [];
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
        break;
      case 4:
        cycles = chart4Cycles;
        setCycle = setChart4Cycles;
        break;
      case 5:
        cycles = chart5Cycles;
        setCycle = setChart5Cycles;
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

  const chart5UnitButtons = React.useMemo(
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
          onClick={() => setChart5Unit("percentage")}
          sx={{
            color:
              chart5Unit === "percentage"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_TEXT_COLOR,
            background:
              chart5Unit === "percentage"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_BACKGROUND_COLOR,
            borderColor:
              chart5Unit === "percentage"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_BORDER_COLOR,
          }}
        >
          %
        </IconButton>
        <IconButton
          onClick={() => setChart5Unit("amount")}
          sx={{
            color:
              chart5Unit === "amount"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_TEXT_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_TEXT_COLOR,
            background:
              chart5Unit === "amount"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_BACKGROUND_COLOR,
            borderColor:
              chart5Unit === "amount"
                ? appColors.CHART_BLOCK_CYCLES.BUTTON_ACTIVE_BACKGROUND_COLOR
                : appColors.CHART_BLOCK_CYCLES.BUTTON_BORDER_COLOR,
          }}
        >
          $
        </IconButton>
      </Box>
    ),
    [chart5Unit]
  );

  const reloadPledgesContributionsBarChart = (
    cycles: {
      name: string;
      value: string;
    }[]
  ) => {
    let filterString = "";
    if (cycles.length > 0) {
      filterString = `periods=${cycles.map((c) => c.value).join(",")}`;
    }
    fetchPledgesContributionsBarChart({ filterString });
  };

  const reloadAllocationsRadialChart = (
    cycles: {
      name: string;
      value: string;
    }[]
  ) => {
    let filterString = "";
    if (cycles.length > 0) {
      filterString = `periods=${cycles.map((c) => c.value).join(",")}`;
    }
    fetchAllocationsRadialChart({ filterString });
  };

  const reloadBudgetsTreemap = (
    cycles: CycleProps[],
    componentField: string
  ) => {
    let filterString = "";
    if (cycles.length > 0) {
      const yearFrom: string[] = [];
      const yearTo: string[] = [];
      cycles.forEach((cycle) => {
        const years = cycle.value.split(" - ");
        yearFrom.push(years[0]);
        yearTo.push(years[1]);
      });
      if (yearFrom.length > 0) {
        filterString = `years=${yearFrom.join(",")}`;
      }
      if (yearTo.length > 0) {
        filterString += `${
          filterString.length > 0 ? "&" : ""
        }yearsTo=${yearTo.join(",")}`;
      }
    }
    fetchBudgetsTreemap({
      filterString,
      routeParams: {
        componentField:
          componentField === CHART_3_DROPDOWN_ITEMS[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
  };

  const reloadDisbursementsLineChart = (
    cycles: {
      name: string;
      value: string;
    }[],
    componentField: string
  ) => {
    let filterString = "";
    if (cycles.length > 0) {
      const yearFrom: string[] = [];
      const yearTo: string[] = [];
      cycles.forEach((cycle) => {
        const years = cycle.value.split(" - ");
        yearFrom.push(years[0]);
        yearTo.push(years[1]);
      });
      if (yearFrom.length > 0) {
        filterString = `years=${yearFrom.join(",")}`;
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
          componentField === CHART_4_DROPDOWN_ITEMS[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
  };

  const reloadExpendituresHeatmap = (
    cycles: {
      name: string;
      value: string;
    }[],
    componentField: string
  ) => {
    let filterString = "";
    if (cycles.length > 0) {
      const yearFrom: string[] = [];
      const yearTo: string[] = [];
      cycles.forEach((cycle) => {
        const years = cycle.value.split(" - ");
        yearFrom.push(years[0]);
        yearTo.push(years[1]);
      });
      if (yearFrom.length > 0) {
        filterString = `years=${yearFrom.join(",")}`;
      }
      if (yearTo.length > 0) {
        filterString += `${
          filterString.length > 0 ? "&" : ""
        }yearsTo=${yearTo.join(",")}`;
      }
    }
    fetchExpendituresHeatmap({
      filterString,
      routeParams: {
        row: "principalRecipientType,principalRecipientSubType,principalRecipient",
        column: "component",
        componentField:
          componentField === CHART_5_DROPDOWN_ITEMS[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
  };

  React.useEffect(() => {
    if (annualResultsCycles.length > 0) {
      fetchResultsStats({
        filterString: `cycle=${annualResultsCycles[0].value}`,
      });
    }
  }, [annualResultsCycles]);

  React.useEffect(() => {
    reloadPledgesContributionsBarChart(chart1Cycles);
  }, [chart1Cycles]);

  React.useEffect(() => {
    if (chart2Cycles.length > 0) {
      reloadAllocationsRadialChart(chart2Cycles);
    }
  }, [chart2Cycles]);

  React.useEffect(() => {
    reloadBudgetsTreemap(chart3Cycles, chart3Dropdown);
  }, [chart3Cycles, chart3Dropdown]);

  React.useEffect(() => {
    reloadDisbursementsLineChart(chart4Cycles, chart4Dropdown);
  }, [chart4Cycles, chart4Dropdown]);

  React.useEffect(() => {
    if (chart5Cycles.length > 0) {
      reloadExpendituresHeatmap(chart5Cycles, chart5Dropdown);
    }
  }, [chart5Cycles, chart5Dropdown]);

  React.useEffect(() => {
    if (allocationsCycles.length > 0) {
      setChart2Cycles([allocationsCycles[allocationsCycles.length - 1]]);
    }
  }, [allocationsCycles]);

  React.useEffect(() => {
    if (expendituresCycles.length > 0) {
      setChart5Cycles([expendituresCycles[expendituresCycles.length - 1]]);
    }
  }, [expendituresCycles]);

  const allocationsTotal = React.useMemo(() => {
    const total = sumBy(dataAllocationsRadialChart, "value");
    const range = getRange([{ value: total }], ["value"]);
    return `US$${getFinancialValueWithMetricPrefix(total, range.index, 2)} ${
      range.full
    }`;
  }, [dataAllocationsRadialChart]);

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

  const totalPledge = React.useMemo(() => {
    const v = applyResultValueFormula(
      sumBy(dataPledgesContributionsBarChart, "value"),
      3
    );
    return `US$${v.number} ${v.text}`;
  }, [dataPledgesContributionsBarChart]);

  const totalContribution = React.useMemo(() => {
    const v = applyResultValueFormula(
      sumBy(dataPledgesContributionsBarChart, "value1"),
      3
    );
    return `US$${v.number} ${v.text}`;
  }, [dataPledgesContributionsBarChart]);

  const totalBudget = React.useMemo(() => {
    const total = sumBy(dataBudgetsTreemap, "value");
    const range = getRange([{ value: total }], ["value"]);
    return `US$${getFinancialValueWithMetricPrefix(total, range.index, 2)} ${
      range.full
    }`;
  }, [dataBudgetsTreemap]);

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
    <Divider
      sx={{
        left: "-50vw",
        width: "200vw",
        position: "relative",
        borderTopColor: "#868E96",
      }}
    />
  );

  return (
    <Box padding="50px 0">
      <HomeHero />
      {fullWidthDivider}
      <Box height="50px" />
      <HomeResultsStats
        stats={dataResultsStats}
        loading={loadingResultsStats}
      />
      <Box height="64px" />
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box width="800px">
          <Search />
        </Box>
      </Box>
      <Box height="64px" />
      <ChartBlock
        showCycleAll
        id="pledges-contributions"
        selectedCycles={chart1Cycles}
        title={`${totalPledge}`}
        subtitle="Pledges & Contributions"
        loading={loadingPledgesContributionsBarChart}
        empty={dataPledgesContributionsBarChart.length === 0}
        handleCycleChange={(value) => handleChartCycleChange(value, 1)}
        cycles={pledgesContributionsCycles.map((c) => ({
          name: c.value,
          value: c.value,
        }))}
      >
        <BarChart
          data={dataPledgesContributionsBarChart}
          valueLabels={{
            value: "Pledge",
            value1: "Contribution",
          }}
        />
      </ChartBlock>
      <Box height="64px" />
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Box
          width="50%"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h3" fontWeight="900">
            {totalPledge}
          </Typography>
          <Typography variant="subtitle2">Pledge</Typography>
        </Box>
        <Box
          width="50%"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h3" fontWeight="900">
            {totalContribution}
          </Typography>
          <Typography variant="subtitle2">Contribution</Typography>
        </Box>
      </Box>
      <Box height="50px" />
      {fullWidthDivider}
      <Box height="50px" />
      <ChartBlock
        id="allocations"
        subtitle="Allocation"
        title={allocationsTotal}
        selectedCycles={chart2Cycles}
        loading={loadingAllocationsRadialChart}
        empty={dataAllocationsRadialChart.length === 0}
        handleCycleChange={(value) => handleChartCycleChange(value, 2)}
        cycles={allocationsCycles.map((c) => ({
          name: c.value,
          value: c.value,
        }))}
        text="The Global Fund is distinct from other organizations in that it gives countries (or groups of countries) an allocation and asks countries to describe how they will use those funds rather than asking for applications and then determining an amount per-country based on the merits of the various proposals received.<br/><br/>This provides greater predictability for countries and helps ensure that the programs being funded are not just the ones with the most capacity to write good applications."
      >
        <Box marginTop="-100px" marginBottom="-100px">
          <RadialChart
            tooltipLabel="Total allocation amount"
            data={dataAllocationsRadialChart}
            itemLabelFormatterType="name"
          />
        </Box>
      </ChartBlock>
      <Box height="50px" />
      {fullWidthDivider}
      <Box height="50px" />
      <ChartBlock
        showCycleAll
        id="budgets"
        title={totalBudget}
        subtitle="Grant Budgets"
        selectedCycles={chart3Cycles}
        loading={loadingBudgetsTreemap}
        dropdownSelected={chart3Dropdown}
        dropdownItems={CHART_3_DROPDOWN_ITEMS}
        empty={dataBudgetsTreemap.length === 0}
        handleDropdownChange={setChart3Dropdown}
        handleCycleChange={(value) => handleChartCycleChange(value, 3)}
        cycles={budgetsCycles.map((c) => ({
          name: c.value,
          value: c.value,
        }))}
      >
        <Treemap data={dataBudgetsTreemap} />
      </ChartBlock>
      <Box height="50px" />
      {fullWidthDivider}
      <Box height="50px" />
      <ChartBlock
        showCycleAll
        id="disbursements"
        subtitle="Disbursements"
        title={disbursementsTotal}
        selectedCycles={chart4Cycles}
        dropdownSelected={chart4Dropdown}
        dropdownItems={CHART_4_DROPDOWN_ITEMS}
        loading={loadingDisbursementsLineChart}
        handleDropdownChange={setChart4Dropdown}
        empty={dataDisbursementsLineChart.data.length === 0}
        handleCycleChange={(value) => handleChartCycleChange(value, 4)}
        cycles={disbursementsCycles.map((c) => ({
          name: c.value,
          value: c.value,
        }))}
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
      <Box height="50px" />
      {fullWidthDivider}
      <Box height="50px" />
      <ChartBlock
        id="expenditures"
        subtitle="Expenditures"
        title={expendituresTotal}
        selectedCycles={chart5Cycles}
        unitButtons={chart5UnitButtons}
        dropdownSelected={chart5Dropdown}
        loading={loadingExpendituresHeatmap}
        dropdownItems={CHART_5_DROPDOWN_ITEMS}
        handleDropdownChange={setChart5Dropdown}
        empty={dataExpendituresHeatmap.length === 0}
        handleCycleChange={(value) => handleChartCycleChange(value, 5)}
        cycles={expendituresCycles.map((c) => ({
          name: c.value,
          value: c.value,
        }))}
      >
        <Heatmap
          data={dataExpendituresHeatmap}
          hoveredLegend={null}
          valueType={chart5Unit}
          columnCategory="component"
          rowCategory="principalRecipient"
          getItemColor={getPercentageColor}
          contentProp={chart5Unit === "percentage" ? "percentage" : "value"}
          columnHeader="Principal Recipients"
          rowHeader="Components"
        />
      </ChartBlock>
    </Box>
  );
};
