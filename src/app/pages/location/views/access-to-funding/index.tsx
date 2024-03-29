import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { appColors } from "app/theme";
import { CYCLES } from "app/pages/home/data";
import Typography from "@mui/material/Typography";
import { Heatmap } from "app/components/charts/heatmap";
import { ChartBlock } from "app/components/chart-block";
import { RadialChart } from "app/components/charts/radial";
import { RaceBarChart } from "app/components/charts/race-bar";
import { STORY_DATA_VARIANT_3 } from "app/components/charts/radial/data";
import { STORY_DATA_VARIANT_2 as RACE_BAR_DATA } from "app/components/charts/race-bar/data";
import {
  getEligibilityColor,
  STORY_DATA_VARIANT_2 as HEATMAP_DATA,
} from "app/components/charts/heatmap/data";
import { TableContainer } from "app/components/table-container";
import {
  TABLE_VARIATION_2_COLUMNS,
  TABLE_VARIATION_2_DATA,
  TABLE_VARIATION_6_COLUMNS,
  TABLE_VARIATION_6_DATA,
} from "app/components/table/data";

export const AccessToFunding: React.FC = () => {
  const [chart1Cycle, setChart1Cycle] = React.useState(CYCLES[0]);
  const [chart2Cycle, setChart2Cycle] = React.useState(CYCLES[0]);

  const handleChartCycleChange = (cycle: string, index: number) => {
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

  return (
    <Box paddingTop="64px" gap="24px" display="flex" flexDirection="column">
      <ChartBlock
        cycles={CYCLES}
        title="$184.65 Billion"
        selectedCycle={chart1Cycle}
        handleCycleChange={(value) => handleChartCycleChange(value, 1)}
        subtitle={`Funds Allocated ${
          chart1Cycle !== CYCLES[0] ? ` ${chart1Cycle}` : ""
        }`}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <RadialChart
          data={STORY_DATA_VARIANT_3}
          itemLabelFormatterType="name"
        />
      </ChartBlock>
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Box display="flex" alignItems="center" flexDirection="column">
          <Typography variant="h3" fontWeight="900">
            89.97 million
          </Typography>
          <Typography variant="subtitle2">
            Total Allocation
            {chart1Cycle !== CYCLES[0] ? ` ${chart1Cycle}` : ""}
          </Typography>
        </Box>
      </Box>
      <Box height="64px" />
      <ChartBlock
        noSplitText
        cycles={CYCLES}
        noBottomToolbar
        selectedCycle={chart2Cycle}
        title="1,846 Funding Requests"
        subtitle="Submitted to date"
        handleCycleChange={(value) => handleChartCycleChange(value, 2)}
        text="The Funding Request explains how the applicant would use Global Fund allocated funds, if approved. Funding Requests are reviewed by the Global Fund’s Technical Review Panel (TRP). Once approved by the TRP, the Funding Request is turned into one or more grants through the grant-making negotiation. The Grant Approvals Committee (GAC) reviews the final version of each grant and recommends implementation-ready grants to the Global Fund Board for approval. Funding Requests are submitted for internal Global Fund review, but the final grant is the legally-binding agreement.<br/><br/>Documents for a specific funding request can be downloaded by clicking the cloud icon. Documents from the 2017-2019 Allocation Period and earlier can be found by clicking on the “Documents’ tab above. If a Funding Request is not visible for the 2023-2025 Allocation Period and the country received an Allocation, it likely means that the applicant has not yet registered for a TRP Window."
      >
        <TableContainer
          dataTree
          withCycles
          id="funding-requests-table"
          data={TABLE_VARIATION_2_DATA}
          columns={TABLE_VARIATION_2_COLUMNS.slice(0, 7)}
          extraColumns={TABLE_VARIATION_2_COLUMNS.slice(7)}
        />
        <Box height="64px" />
        <RaceBarChart noValuesFormat data={RACE_BAR_DATA} />
      </ChartBlock>
      <Box height="64px" />
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
        <Grid item xs={12} sm={4}>
          <Box>
            <Box
              width="40px"
              height="40px"
              borderRadius="50%"
              bgcolor={appColors.RADIAL_CHART.ITEM_COLORS[2]}
            />
            <Box>
              <Typography variant="h3" fontWeight="900">
                233 Submitted
              </Typography>
              <Typography variant="subtitle2">Funding Requests</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box>
            <Box
              width="40px"
              height="40px"
              borderRadius="50%"
              bgcolor={appColors.RADIAL_CHART.ITEM_COLORS[1]}
            />
            <Box>
              <Typography variant="h3" fontWeight="900">
                215 Grants
              </Typography>
              <Typography variant="subtitle2">79% Making process</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box>
            <Box
              width="40px"
              height="40px"
              borderRadius="50%"
              bgcolor={appColors.RADIAL_CHART.ITEM_COLORS[0]}
            />
            <Box>
              <Typography variant="h3" fontWeight="900">
                212 Signed
              </Typography>
              <Typography variant="subtitle2">98% Grants</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box height="64px" />
      <ChartBlock
        noSplitText
        title="Eligibility"
        subtitle="To date"
        text="Eligibility for funding from the Global Fund is determined by country income classification and disease burden for HIV, tuberculosis and malaria. Below are the components which are eligible for an allocation for the selected allocation period, according to the Global Fund Eligibility Policy.<br/><br/>Eligibility for the 2023-2025 Allocation Period was determined in 2022 and documented in the 2023 Eligibility List. Eligibility does not guarantee a funding allocation. Learn more about Eligibility <a target='_blank' href='https://www.theglobalfund.org/en/applying-for-funding/understand-and-prepare/eligibility/'>here</a> or <a>see the full history of eligibility for this country</a>."
      >
        <Box height="32px" />
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box gap="12px" display="flex" flexDirection="row">
            <Typography variant="overline">Burder disease</Typography>
            <Typography variant="overline">
              <b>H</b> - High
            </Typography>
            <Typography variant="overline">
              <b>M</b> - Medium
            </Typography>
            <Typography variant="overline">
              <b>L</b> - Low
            </Typography>
          </Box>
          <Box
            gap="12px"
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{
              "> div": {
                gap: "4px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                "> div": {
                  width: "8px",
                  height: "8px",
                },
              },
            }}
          >
            <Box>
              <Box bgcolor={appColors.HEATMAP.CHART_ELIGIBILITY_COLORS[0]} />
              <Typography variant="overline">Eligible</Typography>
            </Box>
            <Box>
              <Box bgcolor={appColors.HEATMAP.CHART_ELIGIBILITY_COLORS[1]} />
              <Typography variant="overline">Transition</Typography>
            </Box>
            <Box>
              <Box bgcolor={appColors.HEATMAP.CHART_ELIGIBILITY_COLORS[2]} />
              <Typography variant="overline">Not Eligible</Typography>
            </Box>
          </Box>
        </Box>
        <Heatmap
          itemWidth={42}
          valueType="amount"
          data={HEATMAP_DATA}
          hoveredLegend={null}
          columnCategory="year"
          rowCategory="component"
          contentProp="diseaseBurden"
          getItemColor={getEligibilityColor}
        />
      </ChartBlock>
      <Box height="64px" />
      <ChartBlock
        noBottomToolbar
        title="Documents"
        subtitle="Applications"
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <Box height="64px" />
        <TableContainer
          dataTree
          id="documents-table"
          dataTreeStartExpanded
          data={TABLE_VARIATION_6_DATA}
          columns={TABLE_VARIATION_6_COLUMNS}
        />
      </ChartBlock>
    </Box>
  );
};
