import React from "react";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";

export function ToolBoxPanelDonorViews() {
  const checked = useStoreState(
    (state) => state.ToolBoxPanelDonorMapViewState.value
  );
  const setChecked = useStoreActions(
    (actions) => actions.ToolBoxPanelDonorMapViewState.setValue
  );

  return (
    <ToolBoxPanelAggregateBy
      title="Aggregate by"
      selected={checked}
      setSelected={setChecked}
      options={[
        { label: "Public Sector", value: "Public Sector" },
        {
          label: "Affordable Medicines Facility - malaria (AMFm)",
          value: "Affordable Medicines Facility - malaria (AMFm)",
        },
        { label: "Debt2Health", value: "Debt2Health" },
        {
          label: "Private Sector & Nongovernment",
          value: "Private Sector & Nongovernment",
        },
      ]}
    />
  );
}
