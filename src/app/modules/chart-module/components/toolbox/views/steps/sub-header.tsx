import React from "react";

export default function SubHeader(props: { name: string; level: number }) {
  return (
    <div
      css={`
        border-bottom: 1px solid #dfe3e5;
        div {
          padding-left: 24px;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        p:nth-child(1) {
          width: 23px;
          height: 23px;
          background-color: #b1bcc8;
          color: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        p:nth-child(2) {
          font-family: "Gotham Narrow", sans-serif;
          font-size: 14px;
          font-weight: 700;
        }
      `}
    >
      <div>
        <p>{props.level}</p> <p>{props.name}</p>
      </div>
    </div>
  );
}
