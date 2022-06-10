/* third-party */
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { useStoreActions } from "app/state/store/hooks";
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

  /** TODO: Is this the correct action here? or should it only reset for the current active tab/vizualisation */
  const resetAppliedFilters = useStoreActions(
    (actions) => actions.dataThemes.appliedFilters.reset
  );

  function onReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    resetAppliedFilters();
  }

  return (
    <div
      css={`
        width: 100%;
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
              {filterOptionGroups.map((group: FilterGroupModel) => (
                <FilterGroup
                  key={group.name}
                  name={group.name}
                  options={group.options}
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
            padding: 16px;
          `}
        >
          <ExpandedFilterGroup
            name={expandedGroup.name}
            options={expandedGroup.options}
            goBack={() => setExpandedGroup(null)}
          />
        </div>
      )}
    </div>
  );
}
