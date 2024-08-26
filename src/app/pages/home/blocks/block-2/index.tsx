import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
import { useCMSData } from "app/hooks/useCMSData";
import { ChartBlock } from "app/components/chart-block";
import { CYCLES, CycleProps } from "app/pages/home/data";
import { RadialChart } from "app/components/charts/radial";
import { getCMSDataField } from "app/utils/getCMSDataField";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { RadialChartDataItem } from "app/components/charts/radial/data";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";

export const HomeBlock2: React.FC = () => {
  const [chart2Cycles, setChart2Cycles] = React.useState<CycleProps[]>([]);
  const cmsData = useCMSData({ returnData: true });

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
  const allocationsCycles = useStoreState(
    (state) =>
      get(state.AllocationsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );

  const handleChartCycleChange = (cycle: CycleProps) => {
    let cycles = chart2Cycles;
    let setCycle = setChart2Cycles;
    let multi = false;

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

  React.useEffect(() => {
    if (chart2Cycles.length > 0) {
      reloadAllocationsRadialChart(chart2Cycles);
    }
  }, [chart2Cycles]);

  React.useEffect(() => {
    if (allocationsCycles.length > 0) {
      setChart2Cycles([allocationsCycles[allocationsCycles.length - 1]]);
    }
  }, [allocationsCycles]);

  const allocationsTotal = React.useMemo(() => {
    const total = sumBy(dataAllocationsRadialChart, "value");
    const range = getRange([{ value: total }], ["value"]);
    return `US$${getFinancialValueWithMetricPrefix(total, range.index, 2)} ${
      range.full
    }`;
  }, [dataAllocationsRadialChart]);

  return (
    <ChartBlock
      id="allocations"
      subtitle={getCMSDataField(
        cmsData,
        "pagesHome.allocationsSubtitle",
        "Allocations"
      )}
      title={allocationsTotal}
      selectedCycles={chart2Cycles}
      loading={loadingAllocationsRadialChart}
      empty={dataAllocationsRadialChart.length === 0}
      handleCycleChange={(value) => handleChartCycleChange(value)}
      cycles={allocationsCycles.map((c) => ({
        name: c.value,
        value: c.value,
      }))}
      text={getCMSDataField(
        cmsData,
        "pagesHome.allocationsText",
        "The Global Fund is distinct from other organizations in that it gives countries (or groups of countries) an allocation and asks countries to describe how they will use those funds rather than asking for applications and then determining an amount per-country based on the merits of the various proposals received.<br/><br/>This provides greater predictability for countries and helps ensure that the programs being funded are not just the ones with the most capacity to write good applications."
      )}
      infoType="global"
    >
      <Box marginTop="-100px" marginBottom="-100px">
        <RadialChart
          tooltipLabel={get(
            cmsData,
            "pagesHome.allocationsTooltipLabel",
            "Total allocation amount"
          )}
          data={dataAllocationsRadialChart}
          itemLabelFormatterType="name"
        />
      </Box>
    </ChartBlock>
  );
};
