import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { ReactComponent as ProcessingIcon } from "../assets/spin.svg";
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
      <ProcessingIcon
        css={`
          animation: spin 3s linear infinite;
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
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
