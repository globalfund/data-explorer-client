import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { CYCLES, CycleProps } from "app/pages/home/data";
import Typography from "@mui/material/Typography";
import { BarChart } from "app/components/charts/bar";
import { ChartBlock } from "app/components/chart-block";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import { BarChartDataItem } from "app/components/charts/bar/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  getFinancialValueWithMetricPrefix,
  getRange,
} from "app/utils/getFinancialValueWithMetricPrefix";
import { useCMSData } from "app/hooks/useCMSData";

export const ResourceMobilization: React.FC = () => {
  const cmsData = useCMSData({ returnData: true });
  const params = useParams<{ id: string; tab: string }>();

  const [chart1Cycles, setChart1Cycles] = React.useState<CycleProps[]>([]);

  const dataRMBarChart = useStoreState(
    (state) =>
      get(
        state.GeographyResourceMobilizationBarChart,
        "data.data",
        []
      ) as BarChartDataItem[]
  );
  const loadingRMBarChart = useStoreState(
    (state) => state.GeographyResourceMobilizationBarChart.loading
  );
  const fetchRMBarChart = useStoreActions(
    (actions) => actions.GeographyResourceMobilizationBarChart.fetch
  );
  const cycles = useStoreState(
    (state) =>
      get(state.GeographyPledgesContributionsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );

  const handleChartCycleChange = (cycle: CycleProps) => {
    const cycleIndex = cycles.findIndex((c) => c.value === cycle.value);

    if (cycleIndex === -1) {
      setChart1Cycles((prev) => [...prev, cycle]);
    } else {
      setChart1Cycles((prev) => prev.filter((c) => c.value !== cycle.value));
    }
  };

  useUpdateEffect(() => {
    let filterString = `donors=${params.id}`;
    if (chart1Cycles.length > 0) {
      filterString += `&periods=${chart1Cycles.map((c) => c.value).join(",")}`;
    }
    fetchRMBarChart({ filterString });
  }, [chart1Cycles]);

  const totalPledge = React.useMemo(() => {
    const value = sumBy(dataRMBarChart, "value");
    const range = getRange([{ value }], ["value"]);
    return `${getFinancialValueWithMetricPrefix(value, range.index, 2)} ${
      range.full
    }`;
  }, [dataRMBarChart]);

  const totalContribution = React.useMemo(() => {
    const value = sumBy(dataRMBarChart, "value1");
    const range = getRange([{ value }], ["value"]);
    return `${getFinancialValueWithMetricPrefix(value, range.index, 2)} ${
      range.full
    }`;
  }, [dataRMBarChart]);

  return (
    <Box>
      <ChartBlock
        cycles={cycles}
        id="resource-mobilization"
        loading={loadingRMBarChart}
        selectedCycles={chart1Cycles}
        title={`US$${totalContribution}`}
        subtitle={get(
          cmsData,
          "pagesLocationResourceMobilization.title",
          "Funds Contributed to date"
        )}
        handleCycleChange={handleChartCycleChange}
        empty={dataRMBarChart.length === 0 && chart1Cycles.length === 0}
        text={get(
          cmsData,
          "pagesLocationResourceMobilization.text",
          "Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
        )}
      >
        <BarChart
          data={dataRMBarChart}
          valueLabels={{
            value: get(
              cmsData,
              "pagesLocationResourceMobilization.barchartLabel1",
              "Pledge"
            ),
            value1: get(
              cmsData,
              "pagesLocationResourceMobilization.barchartLabel2",
              "Contribution"
            ),
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
            US${totalPledge}
          </Typography>
          <Typography variant="subtitle2">
            {get(
              cmsData,
              "pagesLocationResourceMobilization.statsLabel1",
              "Total Pledge"
            )}
            {chart1Cycles.length > 0
              ? ` ${chart1Cycles.map((c) => c.name).join(",")}`
              : ""}
          </Typography>
        </Box>
        <Box
          width="50%"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h3" fontWeight="900">
            US${totalContribution}
          </Typography>
          <Typography variant="subtitle2">
            {get(
              cmsData,
              "pagesLocationResourceMobilization.statsLabel2",
              "Total Contribution"
            )}
            {chart1Cycles.length > 0
              ? ` ${chart1Cycles.map((c) => c.name).join(",")}`
              : ""}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
