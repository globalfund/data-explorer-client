/* third-party */
import React from "react";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";

export function ToolBoxPanelBudgetTimeCycleYearSelector() {
  const drilldownPanelOptions = useStoreState(
    (state) => state.ToolBoxPanelBudgetTimeCycleDrilldownYearSelector.options
  );
  const vizSelected = useStoreState(
    (state) =>
      state.ToolBoxPanelBudgetTimeCycleDrilldownYearSelector.selectedOption
  );
  const setVizSelected = useStoreActions(
    (actions) =>
      actions.ToolBoxPanelBudgetTimeCycleDrilldownYearSelector.setSelectedOption
  );

  return (
    <span
      css={`
        width: 100%;
        margin-bottom: 20px;
        padding: 15px 35px 15px 25px;
        border-bottom: 1px solid #dfe3e6;
      `}
    >
      <DrillDownArrowSelector
        options={drilldownPanelOptions}
        selected={vizSelected as string}
        onChange={(value: string) => {
          setVizSelected(value);
        }}
      />
    </span>
  );
}
