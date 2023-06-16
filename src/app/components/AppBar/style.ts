import { css } from "styled-components/macro";

export const headercss = css`
  width: 100%;
  height: 100%;

  background-color: #f2f7fd;

  a {
    text-decoration: none;
    color: #231d2c;
    font-size: 14px;
    :hover {
      color: #cea8bc;
    }
  }
  button {
    height: 33.58px;
    padding: 9.792px 35.496px;
    background: #dadaf8;
    border-radius: 24.48px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #231d2c;
    font-weight: 500;
    font-size: 11.424px;
    text-transform: uppercase;
    border: none;
    outline: none;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    /* left: calc(50% - 109.99px / 2 + 576px);
    position: absolute; */
  }
`;

export const logocss = css`
  display: flex;
  padding-top: 5px;
  margin-right: 64px;
  justify-content: center;
`;

export const loginBtn = css`
  height: 34px;
  padding: 9.792px 35.496px;
  background: #dadaf8;
  border-radius: 24.48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #231d2c;
  margin-left: 16px;
  text-transform: uppercase;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  a {
    text-decoration: none;
    font-weight: 500;
    font-size: 11.424px;
    &:hover {
      color: #231d2c;
    }
  }
`;

export const navLinkcss = (display: string, location: string) => css`
  a {
    color: ${display === location ? "#CEA8BC !important" : "#231D2C"};
  }
`;
