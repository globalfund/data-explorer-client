import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface ToolBoxPanelGeoMapViewsProps {
  title: string;
  selected: string;
  setSelected: (value: string) => void;
}

export function ToolBoxPanelGeoMapViews(props: ToolBoxPanelGeoMapViewsProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSelected((event.target as HTMLInputElement).value);
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
      <b>{props.title}</b>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={props.selected}
          onChange={handleChange}
        >
          <FormControlLabel
            value="countries"
            label="Countries"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            value="multicountries"
            label="Multi-countries"
            control={<Radio color="primary" />}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
