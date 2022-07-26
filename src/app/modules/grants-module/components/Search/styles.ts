import { css } from "styled-components/macro";

export const container = css`
  width: 100%;
  display: flex;
  position: relative;
  padding: 10px 20px;
  border-radius: 20px;
  background: #dfe3e6;
  box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);
`;

export const input = css`
  width: 100%;
  outline: none;
  color: #262c34;
  font-size: 14px;
  border-style: none;
  background: #dfe3e6;

  ::placeholder {
    color: #262c34;
    font-weight: bold;
  }

  &:focus::placeholder {
    opacity: 0.3;
  }
`;
