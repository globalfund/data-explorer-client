import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
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
import { BarChartDataItem } from "app/components/charts/bar/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { HomeResultsStats } from "app/pages/home/components/results-stats";
import { applyResultValueFormula } from "app/utils/applyResultValueFormula";
import { StatCompProps } from "app/pages/home/components/results-stats/data";
import { STORY_DATA_VARIANT_2 as TREEMAP_DATA } from "app/components/charts/treemap/data";
import { STORY_DATA_VARIANT_1 as LINE_CHART_DATA } from "app/components/charts/line/data";
import { STORY_DATA_VARIANT_2 as RADIAL_CHART_DATA } from "app/components/charts/radial/data";
import {
  CYCLES,
  CHART_4_DROPDOWN_ITEMS,
  CHART_5_DROPDOWN_ITEMS,
  LINE_CHART_X_AXIS_KEYS,
} from "app/pages/home/data";
import {
  getPercentageColor,
  STORY_DATA_VARIANT_1 as HEATMAP_DATA,
} from "app/components/charts/heatmap/data";

export const Home: React.FC = () => {
  const [chart1Cycle, setChart1Cycle] = React.useState(CYCLES[0]);
  const [chart2Cycle, setChart2Cycle] = React.useState(CYCLES[0]);
  const [chart3Cycle, setChart3Cycle] = React.useState(CYCLES[0]);
  const [chart4Cycle, setChart4Cycle] = React.useState(CYCLES[0]);
  const [chart5Cycle, setChart5Cycle] = React.useState(CYCLES[0]);

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
  const fetchPledgesContributionsBarChart = useStoreActions(
    (actions) => actions.HomePledgesContributionsBarChart.fetch
  );

  const handleChartCycleChange = (cycle: string, index: number) => {
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
      case 4:
        setChart4Cycle(cycle);
        break;
      case 5:
        setChart5Cycle(cycle);
        break;
      default:
        break;
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
          onClick={() => setChart5Unit("percentage")}
          sx={{
            color: chart5Unit === "percentage" ? "#fff" : "#000",
            background: chart5Unit === "percentage" ? "#000" : "#F1F3F4",
          }}
        >
          %
        </IconButton>
        <IconButton
          onClick={() => setChart5Unit("amount")}
          sx={{
            color: chart5Unit === "amount" ? "#fff" : "#000",
            background: chart5Unit === "amount" ? "#000" : "#F1F3F4",
          }}
        >
          $
        </IconButton>
      </Box>
    ),
    [chart5Unit]
  );

  React.useEffect(() => {
    fetchResultsStats({
      filterString: "cycle=2022",
    });
    fetchPledgesContributionsBarChart({});
  }, []);

  const totalPledge = React.useMemo(() => {
    const v = applyResultValueFormula(
      sumBy(dataPledgesContributionsBarChart, "value"),
      3
    );
    return `${v.number} ${v.text}`;
  }, [dataPledgesContributionsBarChart]);

  const totalContribution = React.useMemo(() => {
    const v = applyResultValueFormula(
      sumBy(dataPledgesContributionsBarChart, "value1"),
      3
    );
    return `${v.number} ${v.text}`;
  }, [dataPledgesContributionsBarChart]);

  return (
    <Box padding="60px 0">
      <HomeHero />
      <Box height="64px" />
      <HomeResultsStats stats={dataResultsStats} />
      <Box height="64px" />
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box width="800px">
          <Search />
        </Box>
      </Box>
      <Box height="64px" />
      <ChartBlock
        cycles={CYCLES}
        title="$84 Billion"
        selectedCycle={chart1Cycle}
        subtitle="Funds raised to date"
        handleCycleChange={(value) => handleChartCycleChange(value, 1)}
        text="Government, private sector, nongovernment and other donor pledges and contributions"
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
      <Box height="64px" />
      <ChartBlock
        cycles={CYCLES}
        title="$84 Million"
        selectedCycle={chart2Cycle}
        subtitle="125 countries with approved Grants in Cycle 4"
        handleCycleChange={(value) => handleChartCycleChange(value, 2)}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <RadialChart data={RADIAL_CHART_DATA} itemLabelFormatterType="name" />
      </ChartBlock>
      <Box height="64px" />
      <ChartBlock
        cycles={CYCLES}
        title="557k Budgeted"
        selectedCycle={chart3Cycle}
        subtitle="With transparent budget data"
        handleCycleChange={(value) => handleChartCycleChange(value, 3)}
        text="Our Grant Implementation programs are developed meticulously, each Grant follows a well executed plan, always supervised by TGF Implementation team."
      >
        <Treemap data={TREEMAP_DATA} />
      </ChartBlock>
      <Box height="64px" />
      <ChartBlock
        cycles={CYCLES}
        title="$84 Billion"
        selectedCycle={chart4Cycle}
        dropdownSelected={chart4Dropdown}
        dropdownItems={CHART_4_DROPDOWN_ITEMS}
        subtitle="Disbursed within 5431 Grants"
        handleDropdownChange={setChart4Dropdown}
        handleCycleChange={(value) => handleChartCycleChange(value, 4)}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <LineChart data={LINE_CHART_DATA} xAxisKeys={LINE_CHART_X_AXIS_KEYS} />
      </ChartBlock>
      <Box height="64px" />
      <ChartBlock
        cycles={CYCLES}
        subtitle="To date"
        title="Expenditures"
        selectedCycle={chart5Cycle}
        dropdownSelected={chart5Dropdown}
        dropdownItems={CHART_5_DROPDOWN_ITEMS}
        handleDropdownChange={setChart5Dropdown}
        handleCycleChange={(value) => handleChartCycleChange(value, 5)}
        text="Our Grant Implementation programs are developed meticulously, each Grant follows a well executed plan, always supervised by TGF Implementation team."
        unitButtons={chart5UnitButtons}
      >
        <Heatmap
          data={HEATMAP_DATA}
          hoveredLegend={null}
          valueType={chart5Unit}
          columnCategory="component"
          rowCategory="principalRecipient"
          getItemColor={getPercentageColor}
          contentProp={chart5Unit === "percentage" ? "percentage" : "value"}
        />
      </ChartBlock>
    </Box>
  );
};
