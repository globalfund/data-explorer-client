import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";

export function ToolBoxPanelEligibilityAdvanced() {
  const checked = useStoreState(
    (state) => state.ToolBoxPanelEligibilityAdvancedCheckboxState.value
  );
  const setChecked = useStoreActions(
    (actions) => actions.ToolBoxPanelEligibilityAdvancedCheckboxState.setValue
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((event.target as HTMLInputElement).checked);
  };

  return (
    <div
      css={`
        gap: 12px;
        width: 100%;
        display: flex;
        padding: 15px 25px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #dfe3e6;

        span {
          font-size: 12px;
        }
      `}
    >
      <b>Advanced</b>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={checked}
            onChange={handleChange}
            name="checked"
          />
        }
        label="Show disease burden and income level"
      />
    </div>
  );
}
