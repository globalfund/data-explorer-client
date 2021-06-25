import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

interface DropdownProps {
  value: string;
  options: string[];
  handleChange: (value: string) => void;
}

export function Dropdown(props: DropdownProps) {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.handleChange(event.target.value as string);
  };

  return (
    <FormControl
      css={`
        div {
          font-size: 12px;
        }
      `}
    >
      <Select value={props.value} onChange={handleChange}>
        {props.options.map((option: string) => (
          <MenuItem
            key={option}
            value={option}
            css={`
              font-size: 12px;
            `}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
