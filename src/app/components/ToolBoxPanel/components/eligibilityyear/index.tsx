import React from "react";
import get from "lodash/get";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";

export function EligibilityYear() {
  const dataYearOptions = useStoreState(
    (state) => get(state.EligibilityYears.data, "data", []) as string[]
  );

  const selectedYear = useStoreState(
    (state) => state.ToolBoxPanelEligibilityYearState.value
  );
  const setSelectedYear = useStoreActions(
    (actions) => actions.ToolBoxPanelEligibilityYearState.setValue
  );

  React.useEffect(() => setSelectedYear(get(dataYearOptions, "[0]", "2020")), [
    dataYearOptions,
  ]);

  return (
    <ToolBoxPanelAggregateBy
      title="Year"
      selected={selectedYear}
      setSelected={setSelectedYear}
      options={dataYearOptions.map((year: string) => ({
        label: year,
        value: year,
      }))}
    />
  );
}
