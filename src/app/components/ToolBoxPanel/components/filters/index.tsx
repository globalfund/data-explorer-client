import React from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import { appColors } from "app/theme";
import { useRecoilState } from "recoil";
import Button from "@material-ui/core/Button";
import { ResetIcon } from "app/assets/icons/Reset";
import { filterExpandedGroup } from "app/state/recoil/atoms";
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

  const [expandedGroup, setExpandedGroup] = useRecoilState(filterExpandedGroup);
  const actions = useStoreActions((store) => store.AppliedFiltersState);
  const data = useStoreState((state) => state.AppliedFiltersState);

  function resetAllFilters() {
    if (!isEqual(data, defaultAppliedFilters)) {
      actions.setAll(defaultAppliedFilters);
    }
  }

  const options = React.useMemo(() => {
    if (expandedGroup) {
      return get(filterOptions, expandedGroup.name, []);
    }
    return [];
  }, [filterOptions, expandedGroup]);

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
        padding: 15px 25px;
        flex-direction: column;

        &::-webkit-scrollbar {
          width: 4px;
          background: ${appColors.TOOLBOX.FILTERS_SCROLLBAR_BACKGROUND_COLOR};
        }
        &::-webkit-scrollbar-track {
          border-radius: 4px;
          background: ${appColors.TOOLBOX
            .FILTERS_SCROLLBAR_TRACK_BACKGROUND_COLOR};
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background: ${appColors.TOOLBOX
            .FILTERS_SCROLLBAR_THUMB_BACKGROUND_COLOR};
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
        <div>
          <div
            css={`
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid
                ${appColors.TOOLBOX.SECTION_BORDER_BOTTOM_COLOR};

              @media (max-width: 767px) {
                font-size: 18px;
              }
            `}
          >
            <b>Filters</b>
            <Button
              endIcon={<ResetIcon />}
              onClick={resetAllFilters}
              css={`
                text-transform: capitalize;
              `}
            >
              Reset filters
            </Button>
          </div>
          {props.groups.map((group: FilterGroupProps) => (
            <FilterGroup
              {...group}
              key={group.name}
              options={get(filterOptions, group.name, [])}
              expandGroup={() => setExpandedGroup(group)}
            />
          ))}
        </div>
      )}
      <div
        css={`
          transition: height 2s ease;
          height: ${expandedGroup ? "calc(100% - 8px)" : "0"};
        `}
      >
        {expandedGroup ? (
          <ExpandedFilterGroup
            {...expandedGroup}
            goBack={() => setExpandedGroup(null)}
            options={options}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
