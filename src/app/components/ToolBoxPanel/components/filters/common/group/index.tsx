import React from "react";
import find from "lodash/find";
import filter from "lodash/filter";
import { appColors } from "app/theme";
import { CloseIcon } from "app/assets/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { useAppliedFilters } from "app/hooks/useAppliedFilters";
import {
  FilterGroupModel,
  FilterGroupOptionModel,
} from "app/components/ToolBoxPanel/components/filters/data";

interface FilterGroupCompProps extends FilterGroupModel {
  expandGroup: () => void;
  appliedFilters?: string[];
  setAppliedFilters?: (filters: string[]) => void;
}

export function FilterGroup(props: FilterGroupCompProps) {
  const [flattenOptions, setFlattenOptions] = React.useState<
    FilterGroupOptionModel[]
  >([]);
  const {
    appliedFilters,
    setAppliedFilters,
    appliedFiltersChildren,
    setAppliedFiltersChildren,
    appliedFiltersGrandChildren,
    setAppliedFiltersGrandChildren,
  } = useAppliedFilters({
    type: props.name,
  });

  function onFilterRemove(option: string) {
    let fAppliedFilterOption: FilterGroupOptionModel | undefined;
    props.options.every((o) => {
      if (o.value === option) {
        fAppliedFilterOption = o;
        return false;
      } else if (o.subOptions) {
        o.subOptions.every((so) => {
          if (so.value === option) {
            fAppliedFilterOption = so;
            return false;
          } else if (so.subOptions) {
            so.subOptions.every((sso) => {
              if (sso.value === option) {
                fAppliedFilterOption = sso;
                return false;
              }
            });
          }
        });
        if (fAppliedFilterOption) {
          return false;
        }
      }
    });
    const allOptionSubOptions: FilterGroupOptionModel[] = [];
    if (fAppliedFilterOption && fAppliedFilterOption.subOptions) {
      allOptionSubOptions.push(fAppliedFilterOption);
      fAppliedFilterOption.subOptions.forEach((so) => {
        allOptionSubOptions.push(so);
        if (so.subOptions) {
          so.subOptions.forEach((sso) => {
            allOptionSubOptions.push(sso);
          });
        }
      });
    }
    let newAppliedFilters = filter(
      props.appliedFilters || appliedFilters,
      (af: string) => af !== option
    );
    if (allOptionSubOptions.length > 0) {
      newAppliedFilters = filter(
        newAppliedFilters,
        (af: string) => !find(allOptionSubOptions, (so) => so.value === af)
      );
    }
    if (props.setAppliedFilters) {
      props.setAppliedFilters(newAppliedFilters);
    } else {
      setAppliedFilters(newAppliedFilters);
    }
    if (setAppliedFiltersChildren && appliedFiltersChildren) {
      let newAppliedFiltersChildren = [...appliedFiltersChildren];
      newAppliedFiltersChildren = filter(
        newAppliedFiltersChildren,
        (af: string) => af !== option
      );
      if (allOptionSubOptions.length > 0) {
        newAppliedFiltersChildren = filter(
          newAppliedFiltersChildren,
          (af: string) => !find(allOptionSubOptions, (so) => so.value === af)
        );
      }
      setAppliedFiltersChildren(newAppliedFiltersChildren);
    }
    if (setAppliedFiltersGrandChildren && appliedFiltersGrandChildren) {
      let newAppliedFilterGrandChildren = [...appliedFiltersGrandChildren];
      newAppliedFilterGrandChildren = filter(
        newAppliedFilterGrandChildren,
        (af: string) => af !== option
      );
      if (allOptionSubOptions.length > 0) {
        newAppliedFilterGrandChildren = filter(
          newAppliedFilterGrandChildren,
          (af: string) => !find(allOptionSubOptions, (so) => so.value === af)
        );
      }
      setAppliedFiltersGrandChildren(newAppliedFilterGrandChildren);
    }
  }

  function traverseOptions(
    options: FilterGroupOptionModel[],
    arr: FilterGroupOptionModel[]
  ) {
    options.forEach((option: FilterGroupOptionModel) => {
      arr.push({
        label: option.label,
        value: option.value,
      });
      if (option.subOptions) {
        traverseOptions(option.subOptions, arr);
      }
    });
  }

  React.useEffect(() => {
    const opts: FilterGroupOptionModel[] = [];
    traverseOptions(props.options, opts);
    setFlattenOptions(opts);
  }, [props.options]);

  return (
    <div
      css={`
        gap: 6px;
        width: 100%;
        display: flex;
        padding: 15px 0;
        flex-direction: column;
        border-bottom: 1px solid
          ${appColors.TOOLBOX.SECTION_BORDER_BOTTOM_COLOR};

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 6px;
            }
          }
        }
      `}
    >
      <div
        onClick={props.expandGroup}
        css={`
          width: 100%;
          display: flex;
          font-size: 14px;
          cursor: pointer;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          > button {
            margin-right: 6px;
            transform: rotate(90deg);
          }
        `}
      >
        {props.name}
        <IconButton>
          <TriangleXSIcon />
        </IconButton>
      </div>
      {[
        ...(props.appliedFilters || appliedFilters),
        ...(appliedFiltersChildren || []),
        ...(appliedFiltersGrandChildren || []),
      ].length > 0 && (
        <div
          css={`
            gap: 6px;
            width: 100%;
            display: flex;
            padding: 5px 0;
            max-width: 100%;
            overflow-x: auto;
            flex-direction: row;

            > * {
              @supports (-webkit-touch-callout: none) and
                (not (translate: none)) {
                &:not(:last-child) {
                  margin-right: 6px;
                }
              }
            }

            &::-webkit-scrollbar {
              height: 4px;
              background: ${appColors.TOOLBOX
                .FILTERS_SCROLLBAR_BACKGROUND_COLOR};
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
          `}
        >
          {[
            ...(props.appliedFilters || appliedFilters),
            ...(appliedFiltersChildren || []),
            ...(appliedFiltersGrandChildren || []),
          ].map((option: string) => {
            const fOption = find(flattenOptions, { value: option });
            return (
              <div
                key={option}
                css={`
                  gap: 6px;
                  display: flex;
                  color: ${appColors.TOOLBOX.FILTER_PILL_TEXT_COLOR};
                  font-size: 10px;
                  background: ${appColors.TOOLBOX.FILTER_PILL_BACKGROUND_COLOR};
                  padding: 5px 10px;
                  border-radius: 20px;
                  flex-direction: row;
                  justify-content: space-between;

                  > * {
                    @supports (-webkit-touch-callout: none) and
                      (not (translate: none)) {
                      &:not(:last-child) {
                        margin-right: 6px;
                      }
                    }
                  }

                  > div {
                    max-width: 100px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }

                  > svg:hover {
                    cursor: pointer;
                  }
                `}
              >
                <div>{fOption ? fOption.label : option}</div>
                <CloseIcon
                  role="button"
                  onClick={() => onFilterRemove(option)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
