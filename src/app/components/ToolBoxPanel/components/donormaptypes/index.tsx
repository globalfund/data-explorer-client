import React from "react";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";
import { useCMSData } from "app/hooks/useCMSData";
import { get } from "lodash";

export function ToolBoxPanelDonorMapTypes() {
  const cmsData = useCMSData({ returnData: true });
  const checked = useStoreState(
    (state) => state.ToolBoxPanelDonorMapTypeState.value
  );
  const setChecked = useStoreActions(
    (actions) => actions.ToolBoxPanelDonorMapTypeState.setValue
  );

  return (
    <ToolBoxPanelAggregateBy
      title={get(cmsData, "componentsSidebar.aggregateByTypes", "")}
      selected={checked}
      setSelected={setChecked}
      options={[
        { label: "Pledges", value: "Pledge" },
        { label: "Contributions", value: "Contribution" },
      ]}
    />
  );
}
