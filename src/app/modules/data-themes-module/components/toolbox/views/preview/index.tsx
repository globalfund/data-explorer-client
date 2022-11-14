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
import { DataThemesToolBoxPreviewProps } from "app/modules/data-themes-module/components/toolbox/views/preview/data";
import { FilterGroup } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters/components/FilterGroup";
import { ExpandedFilterGroup } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters/components/ExpandedFilterGroup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "app/modules/data-themes-module/components/toolbox/views/steps";

export function DataThemesToolBoxPreview(props: DataThemesToolBoxPreviewProps) {
  const { filterOptionGroups } = props;
  const [expandedGroup, setExpandedGroup] =
    React.useState<FilterGroupModel | null>(null);

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const enabledFilterOptionGroups = useStoreState(
    (state) => state.dataThemes.sync.enabledFilterOptionGroups.value
  );

  const appliedFilters = useStoreState(
    (state) => state.dataThemes.appliedFilters.value
  );
  const resetAppliedFilters = useStoreActions(
    (actions) => actions.dataThemes.appliedFilters.resetTabViz
  );

  const tabVizEnabledFilterOptionGroups = React.useMemo(() => {
    return get(
      enabledFilterOptionGroups,
      `[${activeTabIndex}][${activeVizIndex}]`,
      []
    );
  }, [activeTabIndex, activeVizIndex, enabledFilterOptionGroups]);

  const shownFilterOptionGroups: FilterGroupModel[] = React.useMemo(() => {
    return filter(
      filterOptionGroups || [],
      (group: FilterGroupModel) =>
        find(
          tabVizEnabledFilterOptionGroups,
          (item: string) => group.name === item
        ) !== undefined
    );
  }, [filterOptionGroups, tabVizEnabledFilterOptionGroups]);

  function onReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    resetAppliedFilters({
      tabIndex: props.tabIndex,
      vizIndex: props.vizIndex,
    });
    const temp = appliedFilters;
    temp[props.tabIndex][props.vizIndex] = {};
    props.loadDataFromAPI(temp);
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
            tabIndex={props.tabIndex}
            vizIndex={props.vizIndex}
            options={expandedGroup.options}
            goBack={() => setExpandedGroup(null)}
            loadDataFromAPI={props.loadDataFromAPI}
          />
        </div>
      )}
    </div>
  );
}
