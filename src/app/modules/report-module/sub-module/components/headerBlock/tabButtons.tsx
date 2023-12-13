import React from "react";
import { ReactComponent as AddIcon } from "app/modules/report-module/asset/add-img.svg";
export default function TabButtons() {
  return (
    <div
      css={`
        display: flex;
        position: absolute;
        bottom: 0;
        right: 88px;
      `}
    >
      <div
        css={`
          display: flex;
          width: 102px;
          height: 34px;
          padding: 7px 18px;
          justify-content: center;
          align-items: center;
          border-radius: 16px 0px 0px 0px;
          background: #373d43;
          color: #fff;
          font-size: 14px;
          font-family: " Gotham Narrow", sans-serif;
          font-weight: 400;
          line-height: 20px;
        `}
      >
        <b>Tab 1</b>
      </div>
      <div
        css={`
          width: 52px;
          height: 34px;
          justify-content: center;
          align-items: center;
          display: flex;
          border-radius: 0px 16px 0px 0px;
          background: #c7cdd1;
          svg {
            height: 19px;
            width: 19px;
          }
        `}
      >
        <AddIcon />
      </div>
    </div>
  );
}
