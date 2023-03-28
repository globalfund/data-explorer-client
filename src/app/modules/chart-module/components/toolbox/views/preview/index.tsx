/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import IconButton from "@material-ui/core/IconButton";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
/* project */
import { ResetIcon } from "app/assets/icons/Reset";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { FilterGroup } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters/components/FilterGroup";
import { ExpandedFilterGroup } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters/components/ExpandedFilterGroup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "app/modules/data-themes-module/components/toolbox/views/steps";
import { ChartToolBoxPreviewProps } from "app/modules/chart-module/components/toolbox/views/preview/data";

export function ChartToolBoxPreview(props: ChartToolBoxPreviewProps) {
  const { filterOptionGroups } = props;
  const [expandedGroup, setExpandedGroup] =
    React.useState<FilterGroupModel | null>(null);

  const enabledFilterOptionGroups = useStoreState(
    (state) => state.charts.enabledFilterOptionGroups.value
  );

  const resetAppliedFilters = useStoreActions(
    (actions) => actions.charts.appliedFilters.reset
  );

  const shownFilterOptionGroups: FilterGroupModel[] = React.useMemo(() => {
    return filter(
      filterOptionGroups || [],
      (group: FilterGroupModel) =>
        find(
          enabledFilterOptionGroups,
          (item: string) => group.name === item
        ) !== undefined
    );
  }, [filterOptionGroups, enabledFilterOptionGroups]);

  function onReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    resetAppliedFilters();
    props.loadDataFromAPI();
  }

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        overflow-y: auto;
        flex-direction: column;

        .MuiAccordion-root {
          margin: 0 !important;
        }
      `}
    >
      {!expandedGroup && (
        <Accordion square defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon htmlColor="#262C34" />}
            css={`
              && {
                > .MuiAccordionSummary-content {
                  position: relative;
                }
              }
            `}
          >
            Filters
            <IconButton
              size="small"
              onClick={onReset}
              css={`
                && {
                  top: 0;
                  right: 0;
                  padding: 0;
                  position: absolute;
                }
              `}
            >
              <ResetIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <div
              css={`
                width: 100%;
                display: flex;
                flex-direction: column;
              `}
            >
              {shownFilterOptionGroups.map((group: FilterGroupModel) => (
                <FilterGroup
                  key={group.name}
                  name={group.name}
                  options={group.options}
                  loadDataFromAPI={props.loadDataFromAPI}
                  expandGroup={() => setExpandedGroup(group)}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      )}
      {expandedGroup && (
        <div
          css={`
            height: 100%;
            padding: 16px;
          `}
        >
          <ExpandedFilterGroup
            name={expandedGroup.name}
            options={expandedGroup.options}
            goBack={() => setExpandedGroup(null)}
            loadDataFromAPI={props.loadDataFromAPI}
          />
        </div>
      )}
    </div>
  );
}
