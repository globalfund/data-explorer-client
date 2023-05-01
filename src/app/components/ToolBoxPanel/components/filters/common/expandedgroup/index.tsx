/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import find from "lodash/find";
import remove from "lodash/remove";
import isEqual from "lodash/isEqual";
import findIndex from "lodash/findIndex";
import Checkbox from "@material-ui/core/Checkbox";
import { ResetIcon } from "app/assets/icons/Reset";
import { SearchIcon } from "app/assets/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { useAppliedFilters } from "app/hooks/useAppliedFilters";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  FilterGroupModel,
  FilterGroupOptionModel,
  FilterGroupProps,
  FilterOptionProps,
} from "app/components/ToolBoxPanel/components/filters/data";

interface ExpandedFilterGroupProps extends FilterGroupModel, FilterGroupProps {
  goBack: () => void;
}

export function ExpandedFilterGroup(props: ExpandedFilterGroupProps) {
  const [value, setValue] = React.useState("");
  const [allSelected, setAllSelected] = React.useState(false);
  const [optionsToShow, setOptionsToShow] = React.useState(props.options);
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
  const [tmpAppliedFilters, setTmpAppliedFilters] = React.useState([
    ...appliedFilters,
  ]);
  const [tmpAppliedFiltersChildren, setTmpAppliedFiltersChildren] =
    React.useState([...(appliedFiltersChildren || [])]);
  const [tmpAppliedFiltersGrandChildren, setTmpAppliedFiltersGrandChildren] =
    React.useState([...(appliedFiltersGrandChildren || [])]);

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
    setAllSelected(
      tmpAppliedFilters.length +
        tmpAppliedFiltersChildren.length +
        tmpAppliedFiltersGrandChildren.length ===
        allOptionsCount
    );
  }, [
    tmpAppliedFilters,
    tmpAppliedFiltersChildren,
    tmpAppliedFiltersGrandChildren,
    props.options,
  ]);

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
    const tmpChildren = [...tmpAppliedFiltersChildren];
    const tmpGrandChildren = [...tmpAppliedFiltersGrandChildren];
    if (event.target.checked) {
      props.options.forEach((option: FilterGroupOptionModel) => {
        tmp.push(option.value);
        option.subOptions?.forEach((subOption: FilterGroupOptionModel) => {
          (!appliedFiltersChildren ? tmp : tmpChildren).push(subOption.value);
          subOption.subOptions?.forEach(
            (subSubOption: FilterGroupOptionModel) => {
              (!appliedFiltersChildren ? tmp : tmpGrandChildren).push(
                subSubOption.value
              );
            }
          );
        });
      });
      setTmpAppliedFilters(tmp);
      if (appliedFiltersChildren) {
        setTmpAppliedFiltersChildren(tmpChildren);
      }
      if (appliedFiltersGrandChildren) {
        setTmpAppliedFiltersGrandChildren(tmpGrandChildren);
      }
    } else {
      setTmpAppliedFilters([]);
      if (appliedFiltersChildren) {
        setTmpAppliedFiltersChildren([]);
      }
      if (appliedFiltersGrandChildren) {
        setTmpAppliedFiltersGrandChildren([]);
      }
    }
  }

  function handleApply() {
    if (!isEqual(appliedFilters, tmpAppliedFilters)) {
      setAppliedFilters(tmpAppliedFilters);
    }
    if (
      setAppliedFiltersChildren &&
      appliedFiltersChildren &&
      !isEqual(appliedFiltersChildren, tmpAppliedFiltersChildren)
    ) {
      setAppliedFiltersChildren(tmpAppliedFiltersChildren);
    }
    if (
      setAppliedFiltersGrandChildren &&
      appliedFiltersGrandChildren &&
      !isEqual(appliedFiltersGrandChildren, tmpAppliedFiltersGrandChildren)
    ) {
      setAppliedFiltersGrandChildren(tmpAppliedFiltersGrandChildren);
    }
    props.goBack();
  }

  function onOptionChange(
    checked: boolean,
    option: FilterGroupOptionModel,
    level: number
  ) {
    const tmp = [...tmpAppliedFilters];
    const tmpChildren = [...tmpAppliedFiltersChildren];
    const tmpGrandChildren = [...tmpAppliedFiltersGrandChildren];
    if (checked) {
      if (!appliedFiltersChildren || level === 1) {
        tmp.push(option.value);
      } else if (level === 2 && appliedFiltersChildren) {
        tmpChildren.push(option.value);
      } else if (level === 3 && appliedFiltersGrandChildren) {
        tmpGrandChildren.push(option.value);
      }
      if (props.addSubOptionFilters) {
        option.subOptions?.forEach((subOption: FilterGroupOptionModel) => {
          if (!appliedFiltersChildren) {
            tmp.push(subOption.value);
          } else if (level + 1 === 2 && appliedFiltersChildren) {
            tmpChildren.push(subOption.value);
          } else if (level + 1 === 3 && appliedFiltersGrandChildren) {
            tmpGrandChildren.push(subOption.value);
          }
          subOption.subOptions?.forEach(
            (subSubOption: FilterGroupOptionModel) => {
              if (!appliedFiltersChildren) {
                tmp.push(subSubOption.value);
              } else if (level + 1 === 2 && appliedFiltersChildren) {
                tmpChildren.push(subSubOption.value);
              } else if (level + 1 === 3 && appliedFiltersGrandChildren) {
                tmpGrandChildren.push(subSubOption.value);
              }
            }
          );
        });
      }
    } else {
      remove(tmp, (o: string) => o === option.value);
      remove(tmpChildren, (o: string) => o === option.value);
      remove(tmpGrandChildren, (o: string) => o === option.value);
      option.subOptions?.forEach((subOption: FilterGroupOptionModel) => {
        remove(tmp, (o: string) => o === subOption.value);
        remove(tmpChildren, (o: string) => o === subOption.value);
        remove(tmpGrandChildren, (o: string) => o === subOption.value);
        subOption.subOptions?.forEach(
          (subSubOption: FilterGroupOptionModel) => {
            remove(tmp, (o: string) => o === subSubOption.value);
            remove(tmpChildren, (o: string) => o === subSubOption.value);
            remove(tmpGrandChildren, (o: string) => o === subSubOption.value);
          }
        );
      });
    }
    setTmpAppliedFilters(tmp);
    setTmpAppliedFiltersChildren(tmpChildren);
    setTmpAppliedFiltersGrandChildren(tmpGrandChildren);
  }

  function resetFilters() {
    if (appliedFilters.length > 0) {
      setAppliedFilters([]);
      setTmpAppliedFilters([]);
    }
    if (
      appliedFiltersChildren &&
      setAppliedFiltersChildren &&
      appliedFiltersChildren.length > 0
    ) {
      setAppliedFiltersChildren([]);
      setTmpAppliedFiltersChildren([]);
    }
    if (
      appliedFiltersGrandChildren &&
      setAppliedFiltersGrandChildren &&
      appliedFiltersGrandChildren.length > 0
    ) {
      setAppliedFiltersGrandChildren([]);
      setTmpAppliedFiltersGrandChildren([]);
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
          {props.name}
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
          border-radius: 20px;
          background: #dfe3e6;
          box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);

          path {
            fill: #98a1aa;
          }
        `}
      >
        <input
          type="text"
          css={`
            width: 100%;
            outline: none;
            color: #231d2c;
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
        {optionsToShow.map((option: FilterGroupOptionModel) => (
          <FilterOption
            {...option}
            level={1}
            key={option.value}
            forceExpand={value.length > 0}
            onOptionChange={onOptionChange}
            selectedOptions={[
              ...tmpAppliedFilters,
              ...tmpAppliedFiltersChildren,
              ...tmpAppliedFiltersGrandChildren,
            ]}
            selected={
              find(
                [...tmpAppliedFilters, ...tmpAppliedFiltersChildren],
                (o: string) => o === option.value
              ) !== undefined
            }
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleApply}
        css={`
          color: #fff;
          margin: 30px 0;
          font-size: 14px;
          cursor: pointer;
          font-weight: bold;
          width: fit-content;
          padding: 10px 20px;
          border-style: none;
          border-radius: 20px;
          background: #231d2c;
          box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
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
