import React from "react";

export default function Processing() {
  return (
    <div
      css={`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      `}
    >
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
