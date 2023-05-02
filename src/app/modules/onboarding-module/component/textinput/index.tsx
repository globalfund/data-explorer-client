import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

interface Props {
  label: string;
  value: string;
  helperText?: React.ReactNode;
  setValue: (value: string) => void;
  type: "text" | "email" | "password";
}

export const StyledTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#231D2C",
    },
    "& label.MuiInputLabel-outlined.MuiInputLabel-marginDense": {
      transform: "translate(14px, 18px) scale(1)",
    },

    "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -5px) scale(0.8)",
    },
    "& label-outlined": {
      fontSize: "16px",
      fontFamily: "'GothamNarrow-Book', sans-serif",
      color: "#231D2C",
    },

    "& .MuiOutlinedInput-input": {
      padding: "2px 14px",
      height: "48px",
      backgroundColor: "#Fff",
    },
    "& .MuiFormHelperText-root": {
      color: "#231D2C",
      fontSize: "12px",
      fontWeight: 400,
      marginLeft: "0px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#231D2C",
    },
    "& .MuiOutlinedInput-multiline ": {
      backgroundColor: "#Fff",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#231D2C",
        borderRadius: "10px",
        paddingBottom: "4px",

        border: "1px solid #231d2c",
      },
      "&:hover fieldset": {
        borderColor: "#231D2C",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#231D2C",
      },
    },
  },
})(TextField);

export function OnboardingTextInput(props: Props) {
  return (
    <StyledTextField
      fullWidth
      size="small"
      id={props.label}
      type={props.type}
      variant="outlined"
      label={props.label}
      value={props.value}
      helperText={props.helperText}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        props.setValue(event.target.value)
      }
    />
  );
}
