import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, withStyles, Theme } from "@material-ui/core/styles";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      fontSize: 16,
      fontWeight: 400,
      outline: "none",
      position: "relative",
      borderRadius: "20px",
      backgroundColor: "#DFE3E6",
      textTransform: "capitalize",
      border: "1px solid #ced4da",
      padding: "10px 26px 10px 12px",
      fontFamily: "GothamNarrow-Book",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        outline: "none",
        borderRadius: "20px",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

interface DropdownProps {
  value: string;
  options: string[];
  handleChange: (value: string) => void;
  enablePortal?: boolean;
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
      <Select
        inputProps={{
          id: "generic-dropdown-input",
        }}
        value={props.value}
        onChange={handleChange}
        MenuProps={{ disablePortal: !props.enablePortal }}
        input={<BootstrapInput />}
      >
        {props.options.map((option: string) => (
          <MenuItem
            key={option}
            value={option}
            css={`
              font-size: 12px;
              text-transform: capitalize;
            `}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
