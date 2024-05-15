import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { appColors } from "app/theme";
import { CYCLES } from "app/pages/home/data";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { PieChart } from "app/components/charts/pie";
import { useStoreState } from "app/state/store/hooks";
import { LineChart } from "app/components/charts/line";
import { ChartBlock } from "app/components/chart-block";
import { Heatmap } from "app/components/charts/heatmap";
import { SankeyChart } from "app/components/charts/sankey";
import { TableContainer } from "app/components/table-container";
import { LineChartDataItem } from "app/components/charts/line/data";
import { SankeyChartData } from "app/components/charts/sankey/data";
import { ChartBlockCycles } from "app/components/chart-block/components/cycles";
import {
  CHART_1_DROPDOWN_ITEMS,
  CHART_2_DROPDOWN_ITEMS,
} from "app/pages/location/views/grant-implementation/data";
import {
  HeatmapDataItem,
  getPercentageColor,
} from "app/components/charts/heatmap/data";
import {
  STORY_DATA_VARIANT_1 as PIE_CHART_DATA_1,
  STORY_DATA_VARIANT_2 as PIE_CHART_DATA_2,
  STORY_DATA_VARIANT_3 as PIE_CHART_DATA_3,
} from "app/components/charts/pie/data";
import {
  TABLE_VARIATION_5_DATA,
  TABLE_VARIATION_5_COLUMNS,
} from "app/components/table/data";

export const GrantImplementation: React.FC = () => {
  const [chart1Cycle, setChart1Cycle] = React.useState(CYCLES[0]);
  const [chart2Cycle, setChart2Cycle] = React.useState(CYCLES[0]);
  const [chart3Cycle, setChart3Cycle] = React.useState(CYCLES[0]);
  const [chart4Cycle, setChart4Cycle] = React.useState(CYCLES[0]);

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
      get(
        state.GeographyDisbursementsLineChart,
        "data.data",
        []
      ) as LineChartDataItem[]
  );
  const keysDisbursementsLineChart = useStoreState(
    (state) =>
      get(
        state.GeographyDisbursementsLineChart,
        "data.xAxisKeys",
        []
      ) as string[]
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
  const dataExpendituresHeatmap = useStoreState(
    (state) =>
      get(
        state.GeographyExpendituresHeatmap,
        "data.data",
        []
      ) as HeatmapDataItem[]
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
      default:
        break;
    }
  };

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

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <ChartBlock
        cycles={CYCLES}
        title="$84 Billion"
        selectedCycle={chart1Cycle}
        dropdownSelected={chart1Dropdown}
        subtitle="Disbursed with 18 Grants"
        dropdownItems={CHART_1_DROPDOWN_ITEMS}
        handleDropdownChange={setChart1Dropdown}
        handleCycleChange={(value) => handleChartCycleChange(value, 1)}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <LineChart
          data={dataDisbursementsLineChart}
          xAxisKeys={keysDisbursementsLineChart}
        />
      </ChartBlock>
      <Box height="64px" />
      <ChartBlock
        title="Budget"
        cycles={CYCLES}
        selectedCycle={chart2Cycle}
        dropdownSelected={chart2Dropdown}
        dropdownItems={CHART_2_DROPDOWN_ITEMS}
        handleDropdownChange={setChart2Dropdown}
        subtitle="to date with transparent budgets"
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
      <Box height="64px" />
      <ChartBlock
        cycles={CYCLES}
        subtitle="To date"
        title="Expenditures"
        selectedCycle={chart3Cycle}
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
      <Box height="64px" />
      <ChartBlock
        title="18 Grants"
        subtitle="to date"
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <Box height="16px" />
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
            <PieChart data={PIE_CHART_DATA_1} />
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
            <PieChart data={PIE_CHART_DATA_2} />
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
            <PieChart data={PIE_CHART_DATA_3} />
          </Box>
        </Box>
      </ChartBlock>
      <Box height="64px" />
      <ChartBlockCycles
        cycles={CYCLES}
        selectedCycle={chart4Cycle}
        handleCycleChange={(value: string) => handleChartCycleChange(value, 4)}
      />
      <TableContainer
        withCycles
        id="financial-insights-table"
        data={TABLE_VARIATION_5_DATA}
        columns={TABLE_VARIATION_5_COLUMNS}
      />
    </Box>
  );
};
