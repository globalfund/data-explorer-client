import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BarChart } from "app/components/charts/bar";
import { ChartBlock } from "app/components/chart-block";
import { CYCLES, CycleProps } from "app/pages/home/data";
import { BarChartDataItem } from "app/components/charts/bar/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { applyResultValueFormula } from "app/utils/applyResultValueFormula";

export const HomeBlock1: React.FC = () => {
  const [chart1Cycles, setChart1Cycles] = React.useState<CycleProps[]>([]);

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
  const pledgesContributionsCycles = useStoreState(
    (state) =>
      get(state.PledgesContributionsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );

  const handleChartCycleChange = (cycle: CycleProps) => {
    let cycles = [...chart1Cycles];
    const setCycle = setChart1Cycles;
    const multi = true;
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
  };

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

  React.useEffect(() => {
    reloadPledgesContributionsBarChart(chart1Cycles);
  }, [chart1Cycles]);

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

  return (
    <React.Fragment>
      <ChartBlock
        showCycleAll
        id="pledges-contributions"
        selectedCycles={chart1Cycles}
        title={`${totalPledge}`}
        subtitle="Pledges & Contributions"
        loading={loadingPledgesContributionsBarChart}
        empty={dataPledgesContributionsBarChart.length === 0}
        handleCycleChange={(value) => handleChartCycleChange(value)}
        cycles={pledgesContributionsCycles.map((c) => ({
          name: c.value,
          value: c.value,
        }))}
        infoType="pledges_contributions"
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
        sx={{
          "@media (max-width: 767px)": {
            gap: "76px",
            flexDirection: "column",
            "> div": {
              width: "100%",
            },
          },
        }}
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
    </React.Fragment>
  );
};
