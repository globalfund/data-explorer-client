import React from "react";
import find from "lodash/find";
import filter from "lodash/filter";
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
    setAppliedFilters(filter(appliedFilters, (af: string) => af !== option));
    if (setAppliedFiltersChildren && appliedFiltersChildren) {
      setAppliedFiltersChildren(
        filter(appliedFiltersChildren, (af: string) => af !== option)
      );
    }
    if (setAppliedFiltersGrandChildren && appliedFiltersGrandChildren) {
      setAppliedFiltersGrandChildren(
        filter(appliedFiltersGrandChildren, (af: string) => af !== option)
      );
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
        border-bottom: 1px solid #dfe3e6;

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
        ...appliedFilters,
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
          `}
        >
          {[
            ...appliedFilters,
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
                  color: #231d2c;
                  font-size: 10px;
                  background: #fff;
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
