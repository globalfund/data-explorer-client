import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import { useCMSData } from "app/hooks/useCMSData";
import { ChartBlock } from "app/components/chart-block";
import { Treemap } from "app/components/charts/treemap";
import { getCMSDataField } from "app/utils/getCMSDataField";
import { TreemapDataItem } from "app/components/charts/treemap/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useGetDatasetLatestUpdate } from "app/hooks/useGetDatasetLatestUpdate";
import {
  CYCLES,
  CycleProps,
  CHART_3_DROPDOWN_ITEMS,
} from "app/pages/home/data";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";

export const HomeBlock3: React.FC = () => {
  const cmsData = useCMSData({ returnData: true });
  const latestUpdateDate = useGetDatasetLatestUpdate({
    dataset: "budgets",
  });

  const [chart3Cycles, setChart3Cycles] = React.useState<CycleProps[]>([]);

  const [chart3Dropdown, setChart3Dropdown] = React.useState(
    CHART_3_DROPDOWN_ITEMS[1].value
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
  const budgetsCycles = useStoreState(
    (state) =>
      get(state.BudgetsCycles, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );

  const handleChartCycleChange = (cycle: CycleProps) => {
    let cycles = [...chart3Cycles];
    let setCycle = setChart3Cycles;
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

  const reloadBudgetsTreemap = (
    cycles: CycleProps[],
    componentField: string
  ) => {
    let filterString = "";
    if (cycles.length > 0) {
      // const yearFrom: string[] = [];
      // const yearTo: string[] = [];
      // cycles.forEach((cycle) => {
      //   const years = cycle.value.split(" - ");
      //   yearFrom.push(years[0]);
      //   yearTo.push(years[1]);
      // });
      // if (yearFrom.length > 0) {
      //   filterString = `years=${yearFrom.join(",")}`;
      // }
      // if (yearTo.length > 0) {
      //   filterString += `${
      //     filterString.length > 0 ? "&" : ""
      //   }yearsTo=${yearTo.join(",")}`;
      // }
      filterString = `${filterString.length > 0 ? "&" : ""}cycleNames=${cycles
        .map((c) => c.value)
        .join(",")}`;
    }
    fetchBudgetsTreemap({
      filterString,
      routeParams: {
        componentField:
          componentField === CHART_3_DROPDOWN_ITEMS[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping: "Standard View",
      },
    });
  };

  React.useEffect(() => {
    reloadBudgetsTreemap(chart3Cycles, chart3Dropdown);
  }, [chart3Cycles, chart3Dropdown]);

  React.useEffect(() => {
    if (budgetsCycles.length > 0) {
      setChart3Cycles([budgetsCycles[budgetsCycles.length - 1]]);
    }
  }, [budgetsCycles]);

  const totalBudget = React.useMemo(() => {
    const total = sumBy(dataBudgetsTreemap, "value");
    const range = getRange([{ value: total }], ["value"]);
    return `US$${getFinancialValueWithMetricPrefix(total, range.index, 2)} ${
      range.full
    }`;
  }, [dataBudgetsTreemap]);

  const exportChartData = React.useMemo(() => {
    return {
      headers: ["Component", "Amount"],
      data: dataBudgetsTreemap.map((item) => [item.name, item.value]),
    };
  }, [dataBudgetsTreemap]);

  return (
    <ChartBlock
      id="budgets"
      title={totalBudget}
      exportName="grant-budgets"
      subtitle={getCMSDataField(
        cmsData,
        "pagesHome.grantBudgetsSubtitle",
        "Grant Budgets"
      )}
      data={exportChartData}
      selectedCycles={chart3Cycles}
      latestUpdate={latestUpdateDate}
      loading={loadingBudgetsTreemap}
      // dropdownSelected={chart3Dropdown}
      dropdownItems={CHART_3_DROPDOWN_ITEMS}
      empty={dataBudgetsTreemap.length === 0}
      handleDropdownChange={setChart3Dropdown}
      handleCycleChange={(value) => handleChartCycleChange(value)}
      cycles={budgetsCycles.map((c) => ({
        name: c.value,
        value: c.value,
      }))}
      infoType="budgets"
    >
      <Treemap data={dataBudgetsTreemap} />
    </ChartBlock>
  );
};
