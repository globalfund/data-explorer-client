import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreState, useStoreActions } from "app/state/store/hooks";

export function ToolBoxPanelDonorViews() {
  const checked = useStoreState(
    (state) => state.ToolBoxPanelDonorMapViewState.value
  );
  const setChecked = useStoreActions(
    (actions) => actions.ToolBoxPanelDonorMapViewState.setValue
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
      <b>Views</b>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="donor-map-types"
          name="donor-map-types"
          value={checked}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Public Sector"
            label="Public Sector view"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            value="Affordable Medicines Facility - malaria (AMFm)"
            label="Affordable Medicines Facility - malaria (AMFm) view"
          />
          <FormControlLabel
            value="Debt2Health"
            label="Debt2Health view"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            value="Private Sector & Nongovernment"
            label="Private Sector & Nongovernment view"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
