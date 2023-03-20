import React from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { ResetIcon } from "app/assets/icons/Reset";
import IconButton from "@material-ui/core/IconButton";
import { useFilterOptions } from "app/hooks/useFilterOptions";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { FilterGroup } from "app/components/ToolBoxPanel/components/filters/common/group";
import { ExpandedFilterGroup } from "app/components/ToolBoxPanel/components/filters/common/expandedgroup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { ArrowDropDownSharp } from "@material-ui/icons";

interface ToolBoxPanelFiltersProps {
  groups: FilterGroupProps[];
}

export function ToolBoxPanelFilters(props: ToolBoxPanelFiltersProps) {
  const filterOptions = useFilterOptions({ returnFilterOptions: true });
  const [expandedGroup, setExpandedGroup] =
    React.useState<FilterGroupProps | null>(null);

  const actions = useStoreActions((store) => store.AppliedFiltersState);
  const data = useStoreState((state) => state.AppliedFiltersState);

  function resetAllFilters() {
    if (!isEqual(data, defaultAppliedFilters)) {
      actions.setAll(defaultAppliedFilters);
    }
  }

  if (props.groups.length === 0) {
    return <React.Fragment />;
  }

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        max-height: 100%;
        overflow-y: auto;
        flex-direction: column;

        &::-webkit-scrollbar {
          width: 4px;
          background: #231d2c;
        }
        &::-webkit-scrollbar-track {
          border-radius: 4px;
          background: #f4f4f4;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background: #231d2c;
        }

        @media (max-width: 767px) {
          padding: 16px;
          overflow-y: unset;

          @supports (-webkit-touch-callout: none) {
            height: unset;
            max-height: unset;
            padding-bottom: ${expandedGroup ? 100 : 200}px;
          }
        }
      `}
    >
      {!expandedGroup && (
        <Accordion
          square
          defaultExpanded
          css={`
            background: #f2f7fd;
          `}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownSharp htmlColor="#262C34" />}
            css={`
              border-bottom: 1px solid #e0e0e0;
              width: 90%;
              margin: auto;
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
              onClick={resetAllFilters}
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

          <AccordionDetails
            css={`
              width: 96%;
              margin: auto;
            `}
          >
            <div
              css={`
                width: 100%;
                display: flex;
                flex-direction: column;
              `}
            >
              {props.groups.map((group: FilterGroupProps) => (
                <FilterGroup
                  {...group}
                  key={group.name}
                  options={get(filterOptions, group.name, [])}
                  expandGroup={() => setExpandedGroup(group)}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      )}
      {expandedGroup && (
        <ExpandedFilterGroup
          {...expandedGroup}
          goBack={() => setExpandedGroup(null)}
          options={get(filterOptions, expandedGroup.name, [])}
        />
      )}
    </div>
  );
}
