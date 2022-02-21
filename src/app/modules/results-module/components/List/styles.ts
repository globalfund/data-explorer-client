import { css } from "styled-components/macro";

export const listitem = (outline: boolean) => css`
  height: 210px;
  display: flex;
  color: #262c34;
  background: #f5f5f7;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid ${outline ? "#13183F" : "#f5f5f7"};
`;

export const row = (size: number, style: string) => css`
  display: flex;
  margin: 16px 0;
  padding: 0 20px;
  flex-direction: row;
  font-size: ${size}px;
  font-weight: ${style};
  justify-content: space-between;
  font-family: "GothamNarrow-${style === "bold" ? "Bold" : "Book"}",
    "Helvetica Neue", sans-serif;
`;

export const buttonrow = (position: "up" | "down") => css`
  gap: 20px;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  padding: 16px 20px;
  flex-direction: row;
  align-items: center;
  transition: background 0.2s ease-in-out;
  color: ${position === "up" ? "#fff" : "#495057"};
  background: ${position === "up" ? "#495057" : "transparent"};
  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  border-${position === "up" ? "bottom" : "top"}: 1px solid #c7cdd1;
  border-radius: ${position === "up" ? "20px 20px 0 0" : "0 0 20px 20px"};

  > * {
    @supports (-webkit-touch-callout: none) and (not (translate: none)) {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }

  svg {
    transform: rotate(${position === "up" ? "180deg" : "0deg"});
    
    path {
      fill: ${position === "up" ? "#fff" : "#495057"};
    }
  }

  &:hover {
    cursor: pointer;
    color: ${position === "down" ? "#fff" : "#495057"};
    background: ${position === "down" ? "#13183F" : "transparent"};

    path {
      fill: ${position === "down" ? "#fff" : "#495057"};
    }
  }
`;

export const locationlist = css`
  gap: 6px;
  color: #fff;
  display: flex;
  overflow-y: auto;
  max-height: 150px;
  min-height: 150px;
  padding: 14px 20px;
  background: #495057;
  flex-direction: column;
  border-radius: 0 0 20px 20px;

  > * {
    @supports (-webkit-touch-callout: none) and (not (translate: none)) {
      &:not(:last-child) {
        margin-right: 6px;
      }
    }
  }

  > div {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`;
