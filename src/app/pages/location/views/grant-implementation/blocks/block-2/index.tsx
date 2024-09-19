import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import Grid from "@mui/material/Grid";
import findIndex from "lodash/findIndex";
import { useParams } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { ChartBlock } from "app/components/chart-block";
import { CYCLES, CycleProps } from "app/pages/home/data";
import { SankeyChart } from "app/components/charts/sankey";
import { getCMSDataField } from "app/utils/getCMSDataField";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import { SankeyChartData } from "app/components/charts/sankey/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useGetDatasetLatestUpdate } from "app/hooks/useGetDatasetLatestUpdate";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";

export const LocationGrantImplementationBlock2 = () => {
  const cmsData = useCMSData({ returnData: true });
  const latestUpdateDate = useGetDatasetLatestUpdate({
    dataset: "budgets",
  });
  const params = useParams<{ id: string; tab: string }>();
  const paramsId = params.id?.replace("|", "%2F");

  const [chart2Cycles, setChart2Cycles] = React.useState<CycleProps[]>([]);

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
  const budgetsCycles = useStoreState(
    (state) =>
      get(state.GeographyBudgetsCycles, "data.data", []) as {
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

  const handleChartCycleChange = (cycle: CycleProps) => {
    let cycles: CycleProps[] = chart2Cycles;
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

  useUpdateEffect(() => {
    let filterString = `geographies=${paramsId}`;
    if (chart2Cycles.length > 0) {
      // const years = chart2Cycles.map(
      //   (cycle) => cycle.value.replace(/ /g, "").split("-")[0]
      // );
      // const yearsTo = chart2Cycles.map(
      //   (cycle) => cycle.value.replace(/ /g, "").split("-")[1]
      // );
      // filterString += `${
      //   filterString.length > 0 ? "&" : ""
      // }years=${encodeURIComponent(
      //   years.join(",")
      // )}&yearsTo=${encodeURIComponent(yearsTo.join(","))}`;
      filterString += `&cycleNames=${chart2Cycles
        .map((c) => c.value)
        .join(",")}`;
    }
    fetchBudgetSankeyChart({
      filterString,
      routeParams: {
        componentField: "activityAreaGroup",
        geographyGrouping: "Standard View",
      },
    });
  }, [chart2Cycles]);

  React.useEffect(() => {
    if (budgetsCycles.length > 0) {
      setChart2Cycles([budgetsCycles[budgetsCycles.length - 1]]);
    }
  }, [budgetsCycles]);

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

  const exportChartData = React.useMemo(() => {
    return {
      headers: ["Source", "Target", "Value"],
      data: dataBudgetSankeyChart.links.map((link: any) => {
        return [link.source, link.target, link.value];
      }),
    };
  }, [dataBudgetSankeyChart]);

  const showBudgetSankeyChart = dataBudgetSankeyChart.links.length > 0;

  return (
    <ChartBlock
      id="budget"
      title={totalBudget}
      subtitle={getCMSDataField(
        cmsData,
        "pagesLocationGrantImplementation.budgetsSubtitle",
        "Grant Budgets"
      )}
      selectedCycles={chart2Cycles}
      // dropdownSelected={chart2Dropdown}
      loading={loadingBudgetSankeyChart}
      // dropdownItems={CHART_2_DROPDOWN_ITEMS}
      // handleDropdownChange={setChart2Dropdown}
      empty={!showBudgetSankeyChart && chart2Cycles.length === 0}
      handleCycleChange={(value) => handleChartCycleChange(value)}
      cycles={budgetsCyclesAll.map((c) => ({
        name: c.value,
        value: c.value,
        disabled: findIndex(budgetsCycles, { value: c.value }) === -1,
      }))}
      latestUpdate={latestUpdateDate}
      data={exportChartData}
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
          {getCMSDataField(
            cmsData,
            "pagesLocationGrantImplementation.budgetsLabel1",
            "Total budgets"
          )}
        </Grid>
        <Grid item xs={3}>
          {getCMSDataField(
            cmsData,
            "pagesLocationGrantImplementation.budgetsLabel2",
            "Landscape 1"
          )}
        </Grid>
        <Grid item xs={3}>
          {getCMSDataField(
            cmsData,
            "pagesLocationGrantImplementation.budgetsLabel3",
            "Landscape 2"
          )}
        </Grid>
        <Grid item xs={3}>
          {getCMSDataField(
            cmsData,
            "pagesLocationGrantImplementation.budgetsLabel4",
            "Cost Category"
          )}
        </Grid>
      </Grid>
      <SankeyChart data={dataBudgetSankeyChart} />
    </ChartBlock>
  );
};
