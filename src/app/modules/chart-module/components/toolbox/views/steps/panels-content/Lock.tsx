/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { splitStrBasedOnCapitalLetters } from "app/utils/splitStrBasedOnCapitalLetters";

interface ChartToolBoxLockProps {
  filterOptionGroups: FilterGroupModel[];
}

export function ChartToolBoxLock(props: ChartToolBoxLockProps) {
  const enabledFilterOptionGroups = useStoreState(
    (state) => state.charts.enabledFilterOptionGroups.value
  );
  const setEnabledFilterOptionGroups = useStoreActions(
    (actions) => actions.charts.enabledFilterOptionGroups.setValue
  );

  const [drillDownSwitch, setDrillDownSwitch] = React.useState(false);

  const aggregationTypes = [
    "Locations",
    "Components",
    " Partner types ",
    "Grant status",
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.checked;
    let temp = [...enabledFilterOptionGroups];
    const isIn = find(temp, (item: string) => key === item);
    if (value && !isIn) {
      temp.push(key);
    } else if (!value && isIn) {
      temp = filter(temp, (group: string) => group !== key);
    }
    setEnabledFilterOptionGroups(temp);
  };

  return (
    <div css={``}>
      <div
        css={`
          width: 100%;
          max-height: calc(100vh - 540px);

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
          <Grid container>
            {props.filterOptionGroups.map((optionGroup: FilterGroupModel) => (
              <Grid item key={optionGroup.name} lg={6}>
                <FormControlLabel
                  key={optionGroup.name}
                  control={
                    <Checkbox
                      checked={
                        find(
                          enabledFilterOptionGroups,
                          (item: string) => optionGroup.name === item
                        ) !== undefined
                      }
                      onChange={handleChange}
                      name={optionGroup.name}
                      color="default"
                      disableRipple
                      disableTouchRipple
                      disableFocusRipple
                    />
                  }
                  label={splitStrBasedOnCapitalLetters(
                    `${optionGroup.name[0].toUpperCase()}${optionGroup.name.slice(
                      1
                    )}`
                  ).replace(/_/g, "")}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
        <hr
          css={`
            border: 0.6px solid #cfd4da;
            margin: auto;
            width: 350px;
            margin-top: 1rem;
            margin-bottom: 1rem;
          `}
        />
        <div
          css={`
            font-weight: 325;
            color: #262c34;
          `}
        >
          Aggregation Types
        </div>
        <FormGroup row>
          <Grid container>
            {aggregationTypes.map((name, index) => (
              <Grid item key={name} lg={6}>
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={true}
                      // onChange={handleChange}
                      // name={optionGroup.name}
                      color="default"
                      disableRipple
                      disableTouchRipple
                      disableFocusRipple
                    />
                  }
                  label={name}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
        <hr
          css={`
            border: 1px solid #cfd4da;
            margin: auto;
            width: 350px;
            margin-top: 1rem;
            margin-bottom: 1rem;
          `}
        />
        <div
          css={`
            display: flex;
            gap: 3rem;
            align-items: center;
            font-weight: 325;
            color: #262c34;
          `}
        >
          <p>Drill down function</p>
          <Switch
            checked={drillDownSwitch}
            onChange={(e) => setDrillDownSwitch(e.target.checked)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      </div>
    </div>
  );
}
