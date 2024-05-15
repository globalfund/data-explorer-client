import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
import { CYCLES } from "app/pages/home/data";
import Typography from "@mui/material/Typography";
import { BarChart } from "app/components/charts/bar";
import { useStoreState } from "app/state/store/hooks";
import { ChartBlock } from "app/components/chart-block";
import { BarChartDataItem } from "app/components/charts/bar/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import {
  getFinancialValueWithMetricPrefix,
  getRange,
} from "app/utils/getFinancialValueWithMetricPrefix";

export const ResourceMobilization: React.FC = () => {
  const [chart1Cycle, setChart1Cycle] = React.useState(CYCLES[0]);

  const dataRMBarChart = useStoreState(
    (state) =>
      get(
        state.GeographyResourceMobilizationBarChart,
        "data.data",
        []
      ) as BarChartDataItem[]
  );

  const totalPledge = React.useMemo(() => {
    const value = sumBy(dataRMBarChart, "value");
    const range = getRange([{ value }], ["value"]);
    return `${getFinancialValueWithMetricPrefix(value, range.index, 2)} ${range.full}`;
  }, [dataRMBarChart]);

  const totalContribution = React.useMemo(() => {
    const value = sumBy(dataRMBarChart, "value1");
    const range = getRange([{ value }], ["value"]);
    return `${getFinancialValueWithMetricPrefix(value, range.index, 2)} ${range.full}`;
  }, [dataRMBarChart]);

  return (
    <Box paddingTop="64px">
      <ChartBlock
        cycles={CYCLES}
        title={`$${totalContribution}`}
        selectedCycle={chart1Cycle}
        subtitle="Funds Contributed to date"
        handleCycleChange={(value) => setChart1Cycle(value)}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <BarChart
          data={dataRMBarChart}
          valueLabels={{
            value: "Pledge",
            value1: "Contribution",
          }}
        />
      </ChartBlock>
      <Box
        width="100%"
        display="flex"
        marginTop="64px"
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
            ${totalPledge}
          </Typography>
          <Typography variant="subtitle2">
            Total Pledge{chart1Cycle !== CYCLES[0] ? ` ${chart1Cycle}` : ""}
          </Typography>
        </Box>
        <Box
          width="50%"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h3" fontWeight="900">
            ${totalContribution}
          </Typography>
          <Typography variant="subtitle2">
            Total Contribution
            {chart1Cycle !== CYCLES[0] ? ` ${chart1Cycle}` : ""}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
