/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import IconButton from "@material-ui/core/IconButton";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { CloseIcon } from "app/assets/icons/Close";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { splitStrBasedOnCapitalLetters } from "app/utils/splitStrBasedOnCapitalLetters";
import {
  FilterGroupModel,
  FilterGroupOptionModel,
} from "app/components/ToolBoxPanel/components/filters/data";

interface FilterGroupCompProps extends FilterGroupModel {
  expandGroup: () => void;
  loadDataFromAPI?: (customAppliedFilters?: { [key: string]: any[] }) => void;
}

export function FilterGroup(props: FilterGroupCompProps) {
  const [flattenOptions, setFlattenOptions] = React.useState<
    FilterGroupOptionModel[]
  >([]);
  const allAppliedFilters = useStoreState(
    (state) => state.charts.appliedFilters.value
  );
  const appliedFilters = useStoreState((state) =>
    get(state.charts.appliedFilters.value, props.name, [])
  );
  const setAppliedFilters = useStoreActions(
    (actions) => actions.charts.appliedFilters.setValue
  );

  function onFilterRemove(option: string) {
    setAppliedFilters({
      key: props.name,
      value: filter(appliedFilters, (af: string) => af !== option),
    });
    if (props.loadDataFromAPI) {
      const temp = allAppliedFilters;
      temp[props.name] = filter(appliedFilters, (af: string) => af !== option);
      if (temp[props.name].length === 0) {
        delete temp[props.name];
      }
      props.loadDataFromAPI(temp);
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
        {splitStrBasedOnCapitalLetters(
          `${props.name[0].toUpperCase()}${props.name.slice(1)}`
        ).replace(/_/g, "")}
        <IconButton>
          <TriangleXSIcon />
        </IconButton>
      </div>
      {appliedFilters.length > 0 && (
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
          `}
        >
          {appliedFilters.map((option: string) => {
            const fOption = find(flattenOptions, { value: option });
            return (
              <div
                key={option}
                css={`
                  gap: 6px;
                  display: flex;
                  color: #495057;
                  font-size: 14px;
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
