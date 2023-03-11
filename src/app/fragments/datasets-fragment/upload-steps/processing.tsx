import React from "react";
import { RotatingLines } from "react-loader-spinner";
export default function Processing() {
  return (
    <div
      css={`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
      `}
    >
      <RotatingLines
        strokeColor="grey"
        strokeWidth="2"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
      <div>
        <p
          css={`
            font-size: 18px;
            color: #98a1aa;
            text-align: center;
          `}
        >
          <b>Data is being processed</b>{" "}
        </p>
      </div>
    </div>
  );
}
