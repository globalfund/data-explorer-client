/* third-party */
import React from "react";
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
import ToolboxSubHeader from "app/modules/chart-module/components/toolbox/views/steps/sub-header";
import { withStyles } from "@material-ui/core";

interface ChartToolBoxLockProps {
  filterOptionGroups: FilterGroupModel[];
}
const StyledSwitch = withStyles({
  switchBase: {
    color: "#fff !important",
    "&$checked": {
      backgroundColor: "#1B73F9 !important",
      "& + $track": {
        backgroundColor: "#1B73F9 !important",
        borderColor: "#1B73F9 !important",
      },
    },

    "&$checked + $track": {
      backgroundColor: "#1B73F9 !important",
    },
  },
})(Switch);

export function ChartToolBoxLock(props: ChartToolBoxLockProps) {
  const enabledFilterOptionGroups = useStoreState(
    (state) => state.charts.enabledFilterOptionGroups.value
  );
  const setEnabledFilterOptionGroups = useStoreActions(
    (actions) => actions.charts.enabledFilterOptionGroups.setValue
  );
  const clearEnabledFilterOptionGroups = useStoreActions(
    (actions) => actions.charts.enabledFilterOptionGroups.clear
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
  const handleResetFilters = () => {
    clearEnabledFilterOptionGroups();
  };

  return (
    <div>
      <ToolboxSubHeader
        name="Lock"
        level={6}
        showResetButton
        resetFilters={handleResetFilters}
      />

      <div
        css={`
          width: 90%;
          margin: auto;
          padding-bottom: 15px;
          max-height: calc(100vh - 50px);

          display: flex;
          overflow-y: auto;
          padding-right: 15px;
          flex-direction: column;
          overflow-x: hidden;

          &::-webkit-scrollbar {
            width: 5px;
            height: 1px;

            background: #262c34;
          }
          &::-webkit-scrollbar-track {
            background: #f1f3f5;
            width: 1px;

            height: 1px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background: #262c34;
          }
          .MuiFormControlLabel-label {
            font-size: 14px;
          }
        `}
      >
        <div
          css={`
            margin-top: 30px;
          `}
        >
          Filters
        </div>
        <FormGroup
          row
          css={`
            padding-left: 25px;
          `}
        >
          <Grid container spacing={1}>
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
                      color="primary"
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
            margin-bottom: 5px;
          `}
        >
          Aggregation Types
        </div>
        <FormGroup
          row
          css={`
            padding-left: 25px;
          `}
        >
          <Grid container spacing={1}>
            {aggregationTypes.map((name, index) => (
              <Grid item key={name} lg={6}>
                <FormControlLabel
                  key={`${index + name}`}
                  control={
                    <Checkbox
                      checked={false}
                      color="primary"
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
            border: 0.6px solid #cfd4da;
            margin: auto;
            width: 350px;
            margin-top: 1rem;
            margin-bottom: 1rem;
          `}
        />
        <div
          css={`
            display: flex;
            justify-content: space-between;
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
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
}
