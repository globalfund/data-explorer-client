import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { CYCLES } from "app/pages/home/data";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useStoreState } from "app/state/store/hooks";
import { ChartBlock } from "app/components/chart-block";
import { Heatmap } from "app/components/charts/heatmap";
import { RadialChart } from "app/components/charts/radial";
import { SankeyChart } from "app/components/charts/sankey";
import { RaceBarChart } from "app/components/charts/race-bar";
import { SankeyChartData } from "app/components/charts/sankey/data";
import { CHART_2_DROPDOWN_ITEMS } from "app/pages/grant/views/grant-implementation/data";
import {
  HeatmapDataItem,
  getPercentageColor,
} from "app/components/charts/heatmap/data";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";

export const GrantImplementation: React.FC = () => {
  const [chart2Dropdown, setChart2Dropdown] = React.useState(
    CHART_2_DROPDOWN_ITEMS[0].value
  );
  const [chart2Unit, setChart2Unit] = React.useState<"amount" | "percentage">(
    "percentage"
  );

  const dataFinancialValues = useStoreState((state) =>
    get(state.GrantOverview, "data.data[0]", {
      disbursement: 0,
      commitment: 0,
      signed: 0,
    })
  );
  const dataProgrameDates = useStoreState((state) => ({
    boardApprovedDate: get(
      state.GrantOverview,
      "data.data[0].boardApprovedDate"
    ),
    programStartDate: get(state.GrantOverview, "data.data[0].dates[0]"),
    programEndDate: get(state.GrantOverview, "data.data[0].dates[1]"),
  }));
  const dataBudgetSankeyChart = useStoreState(
    (state) =>
      get(state.GrantBudgetSankeyChart, "data.data[0]", {
        nodes: [],
        links: [],
      }) as SankeyChartData
  );
  const dataExpendituresHeatmap = useStoreState(
    (state) =>
      get(state.GrantExpendituresHeatmap, "data.data", []) as HeatmapDataItem[]
  );

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

  const radialChartData = React.useMemo(
    () => [
      {
        name: "Disbursed",
        value: dataFinancialValues.disbursement,
        itemStyle: {
          color: appColors.RADIAL_CHART.ITEM_COLORS[0],
        },
      },
      {
        name: "Committed",
        value: dataFinancialValues.commitment,
        itemStyle: {
          color: appColors.RADIAL_CHART.ITEM_COLORS[1],
        },
      },
    ],
    [dataFinancialValues]
  );

  const signedFormatted = React.useMemo(() => {
    const range = getRange([dataFinancialValues], ["signed"]);
    return `${getFinancialValueWithMetricPrefix(
      dataFinancialValues.signed,
      range.index,
      2
    )} ${range.abbr}`;
  }, [dataFinancialValues]);

  const raceBarChartData = React.useMemo(() => {
    const disbursementPercentage =
      (dataFinancialValues.disbursement / dataFinancialValues.commitment) * 100;
    const commitmentPercentage =
      (dataFinancialValues.commitment / dataFinancialValues.signed) * 100;
    return [
      {
        name: "Disbursed",
        value: dataFinancialValues.disbursement,
        color: "#0A2840",
        percentage: disbursementPercentage,
        sizePercentage: (disbursementPercentage * commitmentPercentage) / 100,
      },
      {
        name: "Committed",
        value: dataFinancialValues.commitment,
        color: "#013E77",
        percentage: commitmentPercentage,
      },
      {
        name: "Signed",
        value: dataFinancialValues.signed,
        color: "#00B5AE",
        percentage: 100,
      },
    ];
  }, [
    dataFinancialValues.disbursement,
    dataFinancialValues.commitment,
    dataFinancialValues.signed,
  ]);

  const disbursementsTotal = React.useMemo(() => {
    const range = getRange(
      [{ value: dataFinancialValues.disbursement }],
      ["value"]
    );
    return `US$${getFinancialValueWithMetricPrefix(
      dataFinancialValues.disbursement,
      range.index,
      2
    )} ${range.full}`;
  }, [dataFinancialValues.disbursement]);

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

  const showRadialChart = radialChartData.length > 0;
  const showBudgetSankeyChart =
    dataBudgetSankeyChart.nodes.length > 0 &&
    dataBudgetSankeyChart.links.length > 0;
  const showExpendituresHeatmap = dataExpendituresHeatmap.length > 0;

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <Grid
        container
        spacing={2}
        sx={{
          "> div": {
            position: "relative",
            "&:not(:last-of-type):after": {
              right: 0,
              bottom: 0,
              top: "21px",
              width: "1px",
              content: '""',
              height: "38px",
              position: "absolute",
              backgroundColor: "#000",
            },
            "> div > *": {
              maxWidth: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            },
          },
        }}
      >
        <Grid item xs={6} md={4}>
          <Box
            gap="10px"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="body2" fontWeight="700">
              Board Approved Date
            </Typography>
            <Typography variant="overline">
              {dataProgrameDates.boardApprovedDate}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box
            gap="10px"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="body2" fontWeight="700">
              Program Start Date
            </Typography>
            <Typography
              gap="4px"
              display="flex"
              variant="overline"
              alignItems="center"
            >
              {dataProgrameDates.programStartDate}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box
            gap="10px"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="body2" fontWeight="700">
              Program End Date
            </Typography>
            <Typography variant="overline">
              {dataProgrameDates.programEndDate}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {fullWidthDivider}
      <ChartBlock
        id="radial-chart"
        title={disbursementsTotal}
        subtitle="Disbursements"
        empty={!showRadialChart}
        infoType="global"
      >
        <RadialChart
          tooltipLabel="Amount"
          data={radialChartData}
          itemLabelFormatterType="name-value-percent"
        />
        <Box
          top="55%"
          display="flex"
          alignItems="center"
          position="absolute"
          flexDirection="column"
          justifyContent="center"
          right="calc(50% - 33px)"
        >
          <Box
            width="17px"
            height="17px"
            borderRadius="50%"
            bgcolor={appColors.RADIAL_CHART.ITEM_COLORS[2]}
          />
          <Typography variant="body2" fontWeight="700">
            Signed
          </Typography>
          <Typography variant="body2">{signedFormatted}</Typography>
        </Box>
        <RaceBarChart data={raceBarChartData} />
      </ChartBlock>
      {showRadialChart && fullWidthDivider}
      {fullWidthDivider}
      <ChartBlock
        id="budget"
        title={totalBudget}
        subtitle="Grant Budgets"
        empty={!showBudgetSankeyChart}
        infoType="budgets"
      >
        <Grid
          container
          spacing={4}
          sx={{
            color: "#464646",
            fontSize: "10px",
            marginTop: "8px",
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
      {showBudgetSankeyChart && showExpendituresHeatmap && fullWidthDivider}
      <ChartBlock
        cycles={CYCLES}
        id="expenditures"
        subtitle="To date"
        title="Expenditures"
        empty={!showExpendituresHeatmap}
        dropdownSelected={chart2Dropdown}
        dropdownItems={CHART_2_DROPDOWN_ITEMS}
        handleDropdownChange={setChart2Dropdown}
        unitButtons={chart2UnitButtons}
        infoType="expenditures"
      >
        <Heatmap
          valueType="amount"
          contentProp="value"
          hoveredLegend={null}
          columnCategory="cycle"
          rowCategory="component"
          data={dataExpendituresHeatmap}
          getItemColor={getPercentageColor}
          columnHeader="Principal Recipients"
          rowHeader="Components"
        />
      </ChartBlock>
    </Box>
  );
};
