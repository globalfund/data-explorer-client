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
  expandedGroup?: FilterGroupProps | null;
  appliedFilters?: { [key: string]: string[] };
  defaultAppliedFilters?: { [key: string]: string[] };
  groupAppliedFiltersPathKey?: { [key: string]: string };
  setExpandedGroup?: (group: FilterGroupProps | null) => void;
  setAppliedFilters?: (filters: { [key: string]: string[] }) => void;
}

export function ToolBoxPanelFilters(props: ToolBoxPanelFiltersProps) {
  const filterOptions = useFilterOptions({ returnFilterOptions: true });

  const [expandedGroup, setExpandedGroup] = useRecoilState(filterExpandedGroup);
  const actions = useStoreActions((store) => store.AppliedFiltersState);
  const data = useStoreState((state) => state.AppliedFiltersState);

  function resetAllFilters() {
    if (
      props.setAppliedFilters &&
      props.defaultAppliedFilters &&
      props.appliedFilters
    ) {
      if (!isEqual(data, props.defaultAppliedFilters)) {
        props.setAppliedFilters(props.defaultAppliedFilters);
      }
    } else {
      if (!isEqual(data, defaultAppliedFilters)) {
        actions.setAll(defaultAppliedFilters);
      }
    }
  }

  function setGroupAppliedFilters(group: string, filters: string[]) {
    const appliedFilterPathKey = get(
      props.groupAppliedFiltersPathKey,
      group,
      null
    );
    if (
      appliedFilterPathKey &&
      props.setAppliedFilters &&
      props.appliedFilters
    ) {
      props.setAppliedFilters({
        ...props.appliedFilters,
        [appliedFilterPathKey]: filters,
      });
    }
  }

  const options = React.useMemo(() => {
    if (props.setExpandedGroup && props.expandedGroup) {
      return get(filterOptions, props.expandedGroup.name, []);
    } else if (!props.setExpandedGroup && expandedGroup) {
      return get(filterOptions, expandedGroup.name, []);
    }
    return [];
  }, [
    filterOptions,
    expandedGroup,
    props.expandedGroup,
    props.setExpandedGroup,
  ]);

  if (props.groups.length === 0) {
    return <React.Fragment />;
  }

  const expandedGroupValue =
    props.expandedGroup !== undefined
      ? props.expandedGroup
      : expandedGroup
      ? expandedGroup
      : null;

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        // max-height: 100%;
        // overflow-y: auto;
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
            padding-bottom: ${expandedGroupValue ? 100 : 200}px;
          }
        }
      `}
    >
      {!expandedGroupValue && (
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
              expandGroup={() => {
                if (props.setExpandedGroup) {
                  props.setExpandedGroup(group);
                } else {
                  setExpandedGroup(group);
                }
              }}
              appliedFilters={
                props.appliedFilters
                  ? get(
                      props.appliedFilters,
                      get(
                        props.groupAppliedFiltersPathKey,
                        `["${group.name}"]`,
                        group.name
                      ),
                      []
                    )
                  : undefined
              }
              setAppliedFilters={
                props.setAppliedFilters
                  ? (filters: string[]) =>
                      setGroupAppliedFilters(group.name, filters)
                  : undefined
              }
            />
          ))}
        </div>
      )}
      <div
        css={`
          transition: height 2s ease;
          height: ${expandedGroupValue ? "calc(100% - 8px)" : "0"};
        `}
      >
        {expandedGroupValue ? (
          <ExpandedFilterGroup
            {...expandedGroupValue}
            expandedGroup={expandedGroupValue}
            goBack={() => {
              if (props.setExpandedGroup) {
                props.setExpandedGroup(null);
              } else {
                setExpandedGroup(null);
              }
            }}
            options={options}
            appliedFilters={
              props.appliedFilters
                ? get(
                    props.appliedFilters,
                    get(
                      props.groupAppliedFiltersPathKey,
                      `["${expandedGroupValue.name}"]`,
                      expandedGroupValue.name
                    ),
                    []
                  )
                : undefined
            }
            setAppliedFilters={
              props.setAppliedFilters
                ? (filters: string[]) =>
                    setGroupAppliedFilters(expandedGroupValue.name, filters)
                : undefined
            }
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
