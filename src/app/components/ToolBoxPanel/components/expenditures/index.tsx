import React from "react";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";

const options = [
  {
    label: "Modules",
    value: "moduleInterventions",
  },
  {
    label: "Investment Landscape",
    value: "investmentLandscapes",
  },
];

export function ToolBoxPanelExpendituresDataBySelector() {
  const selectedOption = useStoreState(
    (state) => state.ToolBoxPanelExpendituresDataBySelector.selectedOption
  );
  const setSelectedOption = useStoreActions(
    (actions) =>
      actions.ToolBoxPanelExpendituresDataBySelector.setSelectedOption
  );

  return (
    <ToolBoxPanelAggregateBy
      title="See data by"
      selected={selectedOption}
      setSelected={setSelectedOption}
      options={options}
    />
  );
}
