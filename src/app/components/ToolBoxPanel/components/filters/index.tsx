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

interface ToolBoxPanelFiltersProps {
  groups: FilterGroupProps[];
}

export function ToolBoxPanelFilters(props: ToolBoxPanelFiltersProps) {
  const filterOptions = useFilterOptions({ returnFilterOptions: true });
  const [
    expandedGroup,
    setExpandedGroup,
  ] = React.useState<FilterGroupProps | null>(null);

  const actions = useStoreActions((store) => store.AppliedFiltersState);
  const data = useStoreState((state) => state.AppliedFiltersState);

  function resetAllFilters() {
    if (!isEqual(data, defaultAppliedFilters)) {
      actions.setAll(defaultAppliedFilters);
    }
  }

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        max-height: 100%;
        overflow-y: auto;
        padding: 15px 25px;
        flex-direction: column;

        &::-webkit-scrollbar {
          width: 4px;
          background: #495057;
        }
        &::-webkit-scrollbar-track {
          border-radius: 4px;
          background: #f5f5f7;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background: #495057;
        }

        @media (max-width: 767px) {
          padding: 16px;
        }
      `}
    >
      {!expandedGroup && (
        <React.Fragment>
          <div
            css={`
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid #dfe3e6;

              @media (max-width: 767px) {
                font-size: 18px;
              }
            `}
          >
            <b>Filters</b>
            <IconButton onClick={resetAllFilters}>
              <ResetIcon />
            </IconButton>
          </div>
          {props.groups.map((group: FilterGroupProps) => (
            <FilterGroup
              {...group}
              key={group.name}
              options={get(filterOptions, group.name, [])}
              expandGroup={() => setExpandedGroup(group)}
            />
          ))}
        </React.Fragment>
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
