import React from "react";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";

export function ToolBoxPanelDonorMapTypes() {
  const checked = useStoreState(
    (state) => state.ToolBoxPanelDonorMapTypeState.value
  );
  const setChecked = useStoreActions(
    (actions) => actions.ToolBoxPanelDonorMapTypeState.setValue
  );

  return (
    <ToolBoxPanelAggregateBy
      title="Types"
      selected={checked}
      setSelected={setChecked}
      options={[
        { label: "Pledges", value: "Pledge" },
        { label: "Contributions", value: "Contribution" },
      ]}
    />
  );
}
