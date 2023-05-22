import React, { useEffect } from "react";
import get from "lodash/get";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";

export function AllocationsPeriods() {
  const dataPeriodOptions = useStoreState(
    (state) => get(state.AllocationsPeriods.data, "data", []) as string[]
  );

  const minMaxPeriod = `${
    dataPeriodOptions[dataPeriodOptions.length - 1].split("-")[1]
  } - ${dataPeriodOptions[0].split("-")[0]}`;

  const [periodList, setPeriodList] = React.useState(
    dataPeriodOptions.map((period: string) => ({
      label: period,
      value: period,
    }))
  );

  useEffect(() => {
    setPeriodList([...periodList, { label: "All", value: minMaxPeriod }]);
  }, []);

  const selectedPeriod = useStoreState(
    (state) => state.ToolBoxPanelAllocationsPeriodState.value
  );
  const setSelectedPeriod = useStoreActions(
    (actions) => actions.ToolBoxPanelAllocationsPeriodState.setValue
  );

  React.useEffect(
    () => setSelectedPeriod(get(dataPeriodOptions, "[0]", "2014 - 2016")),
    [dataPeriodOptions]
  );

  return (
    <ToolBoxPanelAggregateBy
      title="Period"
      selected={selectedPeriod}
      setSelected={setSelectedPeriod}
      options={periodList}
    />
  );
}
