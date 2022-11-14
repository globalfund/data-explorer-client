/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { splitStrBasedOnCapitalLetters } from "app/utils/splitStrBasedOnCapitalLetters";

interface DataThemesToolBoxLockProps {
  filterOptionGroups: FilterGroupModel[];
}

export function DataThemesToolBoxLock(props: DataThemesToolBoxLockProps) {
  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const enabledFilterOptionGroups = useStoreState(
    (state) => state.dataThemes.sync.enabledFilterOptionGroups.value
  );
  const setEnabledFilterOptionGroups = useStoreActions(
    (actions) => actions.dataThemes.sync.enabledFilterOptionGroups.setValue
  );

  const tabVizEnabledFilterOptionGroups = get(
    enabledFilterOptionGroups,
    `[${activeTabIndex}][${activeVizIndex}]`,
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.checked;
    let temp = [...tabVizEnabledFilterOptionGroups];
    const isIn = find(temp, (item: string) => key === item);
    if (value && !isIn) {
      temp.push(key);
    } else if (!value && isIn) {
      temp = filter(temp, (group: string) => group !== key);
    }
    setEnabledFilterOptionGroups({
      tab: activeTabIndex,
      viz: activeVizIndex,
      value: temp,
    });
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
                checked={
                  find(
                    tabVizEnabledFilterOptionGroups,
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
              `${optionGroup.name[0].toUpperCase()}${optionGroup.name.slice(1)}`
            ).replace(/_/g, "")}
          />
        ))}
      </FormGroup>
    </div>
  );
}
