import { InputBase, MenuItem } from "@material-ui/core";
import React from "react";
import { StyledSelect, StyledInput } from "./style";

interface Props {
  value: string;
  width: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  menuItems: {
    value: string;
    label: string;
  }[];

  handleChange: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => void;
}
export default function SimpleSelect(props: Props) {
  return (
    <div>
      <StyledSelect
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={props.value}
        onChange={props.handleChange}
        input={<StyledInput />}
        width={props.width}
      >
        {props.menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </div>
  );
}
