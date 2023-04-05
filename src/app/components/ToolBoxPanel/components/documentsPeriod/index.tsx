import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { get } from "lodash";
import React from "react";
import { ToolBoxPanelAggregateBy } from "../aggregateby";

export default function DocumentsPeriods() {
  const dataPeriodOptions = useStoreState(
    (state) => get(state.DocumentsPeriods.data, "data", []) as string[]
  );
  const selectedPeriod = useStoreState(
    (state) => state.ToolBoxPanelDocumentsPeriodState.value
  );
  const setSelectedPeriod = useStoreActions(
    (actions) => actions.ToolBoxPanelDocumentsPeriodState.setValue
  );

  console.log(selectedPeriod, "dataPeriodOptions");

  React.useEffect(
    () => setSelectedPeriod(get(dataPeriodOptions, "[0]", "2014 - 2016")),
    [dataPeriodOptions]
  );

  return (
    <ToolBoxPanelAggregateBy
      title="Year"
      selected={selectedPeriod}
      setSelected={setSelectedPeriod}
      options={dataPeriodOptions.map((period: string) => ({
        label: period,
        value: period,
      }))}
    />
  );
}
