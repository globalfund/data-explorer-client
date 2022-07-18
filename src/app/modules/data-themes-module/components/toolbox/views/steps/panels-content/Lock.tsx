/* third-party */
import React from "react";
import get from "lodash/get";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
/* project */
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { splitStrBasedOnCapitalLetters } from "app/utils/splitStrBasedOnCapitalLetters";

interface DataThemesToolBoxLockProps {
  filterOptionGroups: FilterGroupModel[];
  setFilterOptionGroups: (key: string, value: boolean) => void;
}

export function DataThemesToolBoxLock(props: DataThemesToolBoxLockProps) {
  const [state, setState] = React.useState(
    props.filterOptionGroups.reduce(
      (a, v) => ({ ...a, [v.name]: v.enabled || false }),
      {}
    )
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilterOptionGroups(event.target.name, event.target.checked);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        overflow-y: auto;
        padding-right: 15px;
        flex-direction: column;

        .MuiFormControlLabel-label {
          font-size: 14px;
        }
      `}
    >
      <div>Filters</div>
      <FormGroup row>
        {props.filterOptionGroups.map((optionGroup: FilterGroupModel) => (
          <FormControlLabel
            key={optionGroup.name}
            control={
              <Checkbox
                checked={get(state, optionGroup.name, false)}
                onChange={handleChange}
                name={optionGroup.name}
                color="primary"
                disableRipple
                disableTouchRipple
                disableFocusRipple
              />
            }
            label={splitStrBasedOnCapitalLetters(
              `${optionGroup.name[0].toUpperCase()}${optionGroup.name.slice(1)}`
            ).replace(/_/g, "")}
          />
        ))}
      </FormGroup>
    </div>
  );
}
