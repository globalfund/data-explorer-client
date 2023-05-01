import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import React from "react";
interface State {
  password: string;
  showPassword: boolean;
}

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: {
    password: string;
    showPassword: boolean;
  };
  setValues: React.Dispatch<
    React.SetStateAction<{
      password: string;
      showPassword: boolean;
    }>
  >;
  label: string;
  name: string;
}
export default function PasswordInput(props: Props) {
  const useOutlinedInputStyles = makeStyles((theme) => ({
    root: {
      "&.MuiInputBase-root": {
        borderRadius: "10px",
        background: "white",
        height: "48px",
      },
      "&.MuiFormLabel-root": {
        color: "#231D2C",
      },
      "& $notchedOutline": {
        border: "1px solid #231D2C",
        // background: "white",
      },
      "&:hover $notchedOutline": {
        border: "1px solid #231D2C",
        borderRadius: "10px,",
      },
      "&$focused $notchedOutline": {
        border: "1px solid #231D2C",
        borderRadius: "10px,",
      },
    },
    label: {},
    focused: {},
    notchedOutline: {},
  }));
  const outlinedInputClasses = useOutlinedInputStyles();

  const handleClickShowPassword = () => {
    props.setValues({
      ...props.values,
      showPassword: !props.values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">
          {props.label}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={props.values.showPassword ? "text" : "password"}
          value={props.values.password}
          onChange={props.handleChange}
          name={props.name}
          label={props.label}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {props.values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          // labelWidth={70}
          fullWidth
          classes={outlinedInputClasses}
        />
      </FormControl>
    </div>
  );
}
