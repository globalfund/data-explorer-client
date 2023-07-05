import { css } from "styled-components/macro";

export const rowFlexCss = css`
  display: flex;

  justify-content: center;
  align-items: center;
`;
export const searchInputCss = (openSearch: boolean) => css`
  background: #dfe3e5;
  display: flex;
  align-items: center;
  width: ${openSearch ? 385 : 0}px;
  height: 32px;
  border-radius: 20px;
  opacity: ${openSearch ? 1 : 0};
  transition: all 0.5s ease-in-out 0s;
  input {
    outline: none;
    height: 100%;
    width: 92%;
    color: #231d2c;
    font-size: 14px;
    background: inherit;
    border-style: none;
    border-radius: 20px;

    padding: 6px 16px !important;
  }
`;

export const iconButtonCss = (active?: boolean) => css`
  padding: 3px;
  ${active
    ? ` svg > circle {
      fill:  #231d2c;
    }
    svg > path,
    svg > g > path,
    svg > g > rect {
      fill: #fff;
    }`
    : ""}

  &:hover {
    background: transparent;
    padding: none;

    svg > circle {
      fill: #262c34;
    }
    svg > path,
    svg > g > path,
    svg > g > rect {
      fill: #fff;
    }
  }
`;

export const sortByItemCss = (active: boolean, index: number) => css`
  color: ${active ? "#fff" : "#252c34"};
  font-size: 14px;
  font-family: "Gotham Narrow", sans-serif;
  background: ${active ? "#262c34" : "transparent"};
  padding-left: 12px;
  height: 41.4px;
  display: flex;
  align-items: center;
  border-top-left-radius: ${index == 0 ? " 8px" : "0px"};
  border-top-right-radius: ${index == 0 ? " 8px" : "0px"};

  &:hover {
    cursor: pointer;
    background: #262c34;
    color: #fff;
    border-top: none;
  }
  border-top: ${index == 2 ? "1px solid #F1F3F5" : "none"};
`;
