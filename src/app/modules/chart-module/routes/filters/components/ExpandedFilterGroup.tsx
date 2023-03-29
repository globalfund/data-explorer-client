/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import remove from "lodash/remove";
import isEqual from "lodash/isEqual";
import findIndex from "lodash/findIndex";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { ResetIcon } from "app/assets/icons/Reset";
import { SearchIcon } from "app/assets/icons/Search";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { splitStrBasedOnCapitalLetters } from "app/utils/splitStrBasedOnCapitalLetters";
import {
  FilterGroupModel,
  FilterGroupOptionModel,
  FilterGroupProps,
  FilterOptionProps,
} from "app/components/ToolBoxPanel/components/filters/data";

interface ExpandedFilterGroupProps extends FilterGroupModel, FilterGroupProps {
  goBack: () => void;
  loadDataFromAPI?: (customAppliedFilters?: { [key: string]: any[] }) => void;
}

export function ExpandedFilterGroup(props: ExpandedFilterGroupProps) {
  const [value, setValue] = React.useState("");
  const [allSelected, setAllSelected] = React.useState(false);
  const [optionsToShow, setOptionsToShow] = React.useState(props.options);

  const allAppliedFilters = useStoreState(
    (state) => state.charts.appliedFilters.value
  );
  const appliedFilters = useStoreState((state) =>
    get(state.charts.appliedFilters.value, props.name, [])
  );
  const setAppliedFilters = useStoreActions(
    (actions) => actions.charts.appliedFilters.setValue
  );

  const [tmpAppliedFilters, setTmpAppliedFilters] = React.useState([
    ...appliedFilters,
  ]);

  React.useEffect(() => {
    let allOptionsCount = 0;
    props.options.forEach((option: FilterGroupOptionModel) => {
      allOptionsCount += 1;
      allOptionsCount += option.subOptions ? option.subOptions.length : 0;
      option.subOptions?.forEach((subOption: FilterGroupOptionModel) => {
        allOptionsCount += subOption.subOptions
          ? subOption.subOptions.length
          : 0;
        subOption.subOptions?.forEach(
          (subSubOption: FilterGroupOptionModel) => {
            allOptionsCount += subSubOption.subOptions
              ? subSubOption.subOptions.length
              : 0;
            subSubOption.subOptions?.forEach(
              (subSubSubOption: FilterGroupOptionModel) => {
                allOptionsCount += subSubSubOption.subOptions
                  ? subSubSubOption.subOptions.length
                  : 0;
              }
            );
          }
        );
      });
    });
    setAllSelected(tmpAppliedFilters.length === allOptionsCount);
  }, [tmpAppliedFilters, props.options]);

  React.useEffect(() => {
    if (value.length === 0) {
      setOptionsToShow(props.options);
    } else {
      const options: FilterGroupOptionModel[] = [];
      props.options.forEach((option: FilterGroupOptionModel) => {
        if (option.label.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          options.push(option);
        } else if (option.subOptions) {
          option.subOptions.forEach((subOption: FilterGroupOptionModel) => {
            if (
              subOption.label.toLowerCase().indexOf(value.toLowerCase()) > -1
            ) {
              const fParentIndex = findIndex(options, { label: option.label });
              if (fParentIndex > -1) {
                options[fParentIndex].subOptions?.push(subOption);
              } else {
                options.push({
                  ...option,
                  subOptions: [subOption],
                });
              }
            } else if (subOption.subOptions) {
              subOption.subOptions.forEach(
                (subSubOption: FilterGroupOptionModel) => {
                  if (
                    (subSubOption.label || "")
                      .toLowerCase()
                      .indexOf(value.toLowerCase()) > -1
                  ) {
                    const fGrandParentIndex = findIndex(options, {
                      label: option.label,
                    });
                    if (fGrandParentIndex > -1) {
                      const fParentIndex = findIndex(
                        options[fGrandParentIndex]?.subOptions,
                        { label: subOption.label }
                      );
                      if (fParentIndex > -1) {
                        // @ts-ignore
                        options[fGrandParentIndex]?.subOptions[
                          fParentIndex
                        ]?.subOptions.push(subSubOption);
                      } else {
                        // @ts-ignore
                        options[fGrandParentIndex]?.subOptions.push({
                          ...subOption,
                          subOptions: [subSubOption],
                        });
                      }
                    } else {
                      options.push({
                        ...option,
                        subOptions: [
                          {
                            ...subOption,
                            subOptions: [subSubOption],
                          },
                        ],
                      });
                    }
                  }
                }
              );
            }
          });
        }
      });
      setOptionsToShow(options);
    }
  }, [value]);

  function handleChangeAll(event: React.ChangeEvent<HTMLInputElement>) {
    const tmp = [...tmpAppliedFilters];
    if (event.target.checked) {
      props.options.forEach((option: FilterGroupOptionModel) => {
        tmp.push(option.value);
      });
      setTmpAppliedFilters(tmp);
    } else {
      setTmpAppliedFilters([]);
    }
  }

  function handleApply() {
    if (!isEqual(appliedFilters, tmpAppliedFilters)) {
      setAppliedFilters({
        key: props.name,
        value: tmpAppliedFilters,
      });
      if (props.loadDataFromAPI) {
        const temp = allAppliedFilters;
        temp[props.name] = [
          ...get(temp, `["${props.name}"]`, []),
          ...tmpAppliedFilters,
        ];
        props.loadDataFromAPI(temp);
      }
    }
    props.goBack();
  }

  function onOptionChange(
    checked: boolean,
    option: FilterGroupOptionModel,
    level: number
  ) {
    const tmp = [...tmpAppliedFilters];
    if (checked) {
      tmp.push(option.value);
    } else {
      remove(tmp, (o: string) => o === option.value);
    }
    setTmpAppliedFilters(tmp);
  }

  function resetFilters() {
    if (appliedFilters.length > 0) {
      setAppliedFilters({
        key: props.name,
        value: [],
      });
      if (props.loadDataFromAPI) {
        const temp = allAppliedFilters;
        temp[props.name] = [];
        props.loadDataFromAPI(temp);
      }
      setTmpAppliedFilters([]);
    }
  }

  return (
    <React.Fragment>
      <div
        css={`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: row;
            align-items: center;

            > button {
              transform: rotate(-90deg);
            }
          `}
        >
          <IconButton onClick={props.goBack}>
            <TriangleXSIcon />
          </IconButton>
          <div
            css={`
              max-width: 170px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
          >
            {splitStrBasedOnCapitalLetters(
              `${props.name[0].toUpperCase()}${props.name.slice(1)}`
            ).replace(/_/g, "")}
          </div>
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={allSelected}
                onChange={handleChangeAll}
                disabled={value.length > 0}
              />
            }
            label="Select all"
          />
          <IconButton onClick={resetFilters}>
            <ResetIcon />
          </IconButton>
        </div>
      </div>
      <div
        css={`
          width: 100%;
          display: flex;
          position: relative;
          padding: 10px 20px;
          border-radius: 24px;
          margin-bottom: 18px;
          background: #dfe3e6;
          box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);

          path {
            fill: #495057;
          }
        `}
      >
        <input
          type="text"
          css={`
            width: 100%;
            outline: none;
            color: #495057;
            font-size: 14px;
            border-style: none;
            background: #dfe3e6;
          `}
          tabIndex={0}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
        <SearchIcon />
      </div>
      <div
        css={`
          width: 100%;
          height: 25px;
          border-bottom: 1px solid #dfe3e6;
        `}
      />
      <div
        css={`
          overflow-y: auto;
          max-height: calc(100% - 190px);

          @media (max-width: 767px) {
            max-height: unset;
            overflow-y: unset;
          }

          &::-webkit-scrollbar {
            width: 4px;
            border-radius: 4px;
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
        {optionsToShow.map((option: FilterGroupOptionModel) => (
          <FilterOption
            {...option}
            level={1}
            key={option.value}
            forceExpand={value.length > 0}
            onOptionChange={onOptionChange}
            selectedOptions={tmpAppliedFilters}
            selected={
              find(tmpAppliedFilters, (o: string) => o === option.value) !==
              undefined
            }
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleApply}
        css={`
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          margin-top: 30px;
          font-weight: bold;
          width: fit-content;
          padding: 10px 20px;
          border-style: none;
          border-radius: 20px;
          background: #495057;
          box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);
          font-family: "Inter", "Helvetica Neue", sans-serif;
        `}
      >
        Apply
      </button>
    </React.Fragment>
  );
}

function FilterOption(props: FilterOptionProps) {
  const [showSubOptions, setShowSubOptions] = React.useState(false);

  React.useEffect(() => {
    if (props.forceExpand && !showSubOptions) {
      setShowSubOptions(true);
    } else {
      setShowSubOptions(false);
    }
  }, [props.forceExpand]);

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #dfe3e6;
        border-bottom-style: ${props.subOptions ? "solid" : "none"};
      `}
    >
      <div
        css={`
          width: 100%;
          padding: 5px;
          display: flex;
          position: relative;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          > button {
            z-index: 3;
            margin-right: 6px;
            transform: rotate(${showSubOptions ? 0 : 180}deg);
          }
        `}
      >
        <FormControlLabel
          css={`
            && {
              z-index: 3;

              span {
                font-size: 14px;
              }
            }
          `}
          control={
            <Checkbox
              color="primary"
              checked={props.selected}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.onOptionChange(
                  e.target.checked,
                  {
                    label: props.label,
                    value: props.value,
                    subOptions: props.subOptions,
                  },
                  props.level
                )
              }
            />
          }
          label={props.label}
        />
        {props.subOptions && (
          <React.Fragment>
            <div
              css={`
                top: 0;
                left: 0;
                z-index: 2;
                width: 100%;
                height: 100%;
                cursor: pointer;
                position: absolute;
              `}
              onClick={() => setShowSubOptions(!showSubOptions)}
            />
            <IconButton onClick={() => setShowSubOptions(!showSubOptions)}>
              <TriangleXSIcon />
            </IconButton>
          </React.Fragment>
        )}
      </div>
      {props.subOptions && showSubOptions && (
        <div
          css={`
            gap: 6px;
            width: 100%;
            display: flex;
            padding-left: 25px;
            flex-direction: column;

            > * {
              @supports (-webkit-touch-callout: none) and
                (not (translate: none)) {
                &:not(:last-child) {
                  margin-right: 6px;
                }
              }
            }
          `}
        >
          {props.subOptions.map((option: FilterGroupOptionModel) => (
            <FilterOption
              {...option}
              key={option.value}
              level={props.level + 1}
              forceExpand={props.forceExpand}
              onOptionChange={props.onOptionChange}
              selectedOptions={props.selectedOptions}
              selected={
                find(
                  props.selectedOptions,
                  (o: string) => o === option.value
                ) !== undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
