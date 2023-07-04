import React from "react";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";

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
