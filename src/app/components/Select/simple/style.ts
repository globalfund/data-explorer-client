import { Select, InputBase } from "@material-ui/core";
import styled from "styled-components";

export const StyledSelect = styled(Select)`
  .MuiSelect-selectMenu {
    background: #ffffff;
    width: 165px;
    height: 49px;
    border: 1px solid #231d2c;
    border-radius: 10px;
    display: flex;
    align-items: center;
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
  .MuiSelect-icon {
    color: black;
  }
`;

export const StyledInput = styled(InputBase)`
  .MuiInputBase-root {
    border-radius: 10px;
  }
  .MuiInputBase-input {
    padding: 0;
  }
`;
