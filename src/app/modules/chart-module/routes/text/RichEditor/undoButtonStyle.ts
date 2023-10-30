import { css } from "styled-components";

export const undoButtonStyle = css`
  box-sizing: border-box;
  border: 1px solid #ddd;
  height: 1.5em;
  color: #888;
  border-radius: 1.5em;
  line-height: 1.2em;
  cursor: pointer;

  width: 2.5em;
  font-weight: bold;
  font-size: 1.5em;
  padding: 0;
  margin: 0;
  &:focus {
    background-color: #eee;
    color: #999;
    outline: 0; /* reset for :focus */
  }
  &:hover {
    background-color: #eee;
    color: #999;
  }
  &:active {
    background-color: #ddd;
    color: #777;
  }
  &:disabled {
    background-color: #f5f5f5;
    color: #ccc;
  }
`;