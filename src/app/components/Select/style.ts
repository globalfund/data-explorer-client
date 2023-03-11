import { Select, InputBase } from "@material-ui/core";
import styled from "styled-components";

interface Props {
  width: string;
}
export const StyledSelect = styled(Select)`
  .MuiSelect-selectMenu {
    background: #ffffff;
    width: ${(props: Props) => props.width};
    height: 49px;
    border: 1px solid #231d2c;
    border-radius: 10px;
    display: flex;
    gap: 8px;
    align-items: center;
    display: flex;
    padding: 0 16px;
  }
  .MuiSelect-icon {
    color: black;
    margin-right: 11px;
  }
`;

export const StyledInput = styled(InputBase)`
  .MuiInputBase-root {
    border-radius: 10px;
  }
  .MuiInputBase-input {
  }
`;
