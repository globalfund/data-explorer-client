import React from "react";
import get from "lodash/get";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";

export function AllocationsPeriods() {
  const dataPeriodOptions = useStoreState(
    (state) => get(state.AllocationsPeriods.data, "data", []) as string[]
  );

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
      options={dataPeriodOptions.map((period: string) => ({
        label: period,
        value: period,
      }))}
    />
  );
}
