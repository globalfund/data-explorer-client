import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreState, useStoreActions } from "app/state/store/hooks";

export function ToolBoxPanelDonorMapTypes() {
  const checked = useStoreState(
    (state) => state.ToolBoxPanelDonorMapTypeState.value
  );
  const setChecked = useStoreActions(
    (actions) => actions.ToolBoxPanelDonorMapTypeState.setValue
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((event.target as HTMLInputElement).value);
  };

  return (
    <div
      css={`
        gap: 12px;
        width: 100%;
        display: flex;
        padding: 15px 25px;
        flex-direction: column;
        border-bottom: 1px solid #dfe3e6;

        span {
          font-size: 12px;
        }
      `}
    >
      <b>Types</b>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="donor-map-types"
          name="donor-map-types"
          value={checked}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Pledge"
            label="Pledges"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            value="Contribution"
            label="Contributions"
            control={<Radio color="primary" />}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
