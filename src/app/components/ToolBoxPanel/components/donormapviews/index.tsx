import React from "react";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";

export function ToolBoxPanelDonorViews() {
  const cmsData = useCMSData({ returnData: true });
  const checked = useStoreState(
    (state) => state.ToolBoxPanelDonorMapViewState.value
  );
  const setChecked = useStoreActions(
    (actions) => actions.ToolBoxPanelDonorMapViewState.setValue
  );

  return (
    <ToolBoxPanelAggregateBy
      title={get(cmsData, "componentsSidebar.aggregateBy", "")}
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
