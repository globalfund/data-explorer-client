import React from "react";
import { ReactComponent as RightArr } from "app/modules/home-module/assets/right-arr-icon.svg";

export default function TryUsBlock() {
  return (
    <div
      css={`
        background: #333333;
        box-shadow: 0px 4px 30px 4px rgba(206, 168, 188, 0.08);
        border-radius: 24px;
        display: flex;
        justify-content: space-between;
        padding: 44px;
        align-items: center;
        height: 215px;
        width: 100%;
      `}
    >
      <div>
        <p
          css={`
            color: #ffffff;
            font-size: 40px;
            line-height: 48px;
            font-family: "Gotham Narrow Bold", sans-serif;
            margin: 0;
          `}
        >
          <b>Give DataXplorer a try, on us </b>
        </p>{" "}
        <p
          css={`
            font-weight: 325;
            font-size: 24px;
            color: #f4f4f4;
            font-family: "Gotham Narrow Light", sans-serif;
          `}
        >
          DataXplorer turns your data directly into impact.
        </p>
      </div>
      <div
        css={`
          display: flex;
          flex-direction: column;
          gap: 42px;
          align-items: center;
          button {
            outline: none;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            font-family: "Inter", sans-serif;
            border-radius: 30px;
            text-transform: uppercase;
            cursor: pointer;
            :hover {
              opacity: 0.9;
            }
          }
          button:nth-child(1) {
            background: #e492bd;
            border-radius: 30px;
            width: 185.53px;
            height: 41px;
            padding: 12px 27px;
            gap: 10px;
            color: #ffffff;
            svg {
              path {
                fill: #ffffff;
              }
            }
          }
          button:nth-child(2) {
            background: #ffffff;
            color: #231d2c;

            width: 206.53px;
            height: 41px;
            padding: 12px 27px;
            gap: 10px;
          }
        `}
      >
        <button>
          <p>Try for free</p> <RightArr />
        </button>

        <button>
          <p>Contact sales</p> <RightArr />
        </button>
      </div>
    </div>
  );
}
