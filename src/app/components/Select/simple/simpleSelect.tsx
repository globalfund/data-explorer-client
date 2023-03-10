import { InputBase, MenuItem } from "@material-ui/core";
import React from "react";

import { StyledSelect, StyledInput } from "./style";

interface Props {
  value: string;
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
export default function SimpleSelect(prop: Props) {
  // const [value, setValue] = React.useState("");
  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setValue(event.target.value as string);
  // };
  console.log(prop.value, "value");
  // const menuItems = [
  //   { value: "1", label: "One" },
  //   { value: "2", label: "Two" },
  //   { value: "3", label: "Three" },
  // ];
  return (
    <div>
      <StyledSelect
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={prop.value}
        onChange={prop.handleChange}
        input={<StyledInput />}
      >
        {prop.menuItems.map((item) => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </StyledSelect>
    </div>
  );
}
