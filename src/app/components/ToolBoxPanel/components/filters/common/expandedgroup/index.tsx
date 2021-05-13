import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { ResetIcon } from "app/assets/icons/Reset";
import { SearchIcon } from "app/assets/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { container, input } from "app/components/Search/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  FilterGroupModel,
  FilterGroupOptionModel,
  FilterGroupProps,
} from "app/components/ToolBoxPanel/components/filters/data";

interface ExpandedFilterGroupProps extends FilterGroupModel, FilterGroupProps {
  goBack: () => void;
}

export function ExpandedFilterGroup(props: ExpandedFilterGroupProps) {
  const [value, setValue] = React.useState("");
  const [allSelected, setAllSelected] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllSelected(event.target.checked);
  };

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
          <b>{props.name}</b>
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={allSelected}
                onChange={handleChange}
              />
            }
            label="Select all"
          />
          <IconButton>
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
      {props.options.map((option: FilterGroupOptionModel) => (
        <FilterOption {...option} key={option.value} />
      ))}
      <div
        css={`
          width: 100%;
          height: 50px;
        `}
      />
      <button
        type="button"
        onClick={props.goBack}
        css={`
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          font-weight: bold;
          width: fit-content;
          padding: 10px 20px;
          border-radius: 20px;
          background: #495057;
          box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);
        `}
      >
        Apply
      </button>
    </React.Fragment>
  );
}

function FilterOption(props: FilterGroupOptionModel) {
  const [showSubOptions, setShowSubOptions] = React.useState(false);

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
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          > button {
            margin-right: 6px;
            transform: rotate(${showSubOptions ? 0 : 180}deg);
          }
        `}
      >
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              // checked={false}
              // onChange={handleChange}
            />
          }
          label={props.label}
        />
        {props.subOptions && (
          <IconButton onClick={() => setShowSubOptions(!showSubOptions)}>
            <TriangleXSIcon />
          </IconButton>
        )}
      </div>
      {props.subOptions && showSubOptions && (
        <div
          css={`
            gap: 6px;
            width: 100%;
            display: flex;
            overflow-y: auto;
            max-height: 300px;
            padding-left: 25px;
            flex-direction: column;

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
          {props.subOptions.map((option: FilterGroupOptionModel) => (
            <FilterOption {...option} />
          ))}
        </div>
      )}
    </div>
  );
}
