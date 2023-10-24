import React from "react";
import { WarningOutlined } from "@material-ui/icons";

export function NotAuthorizedMessageModule(props: {
  asset: "chart" | "report";
}) {
  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #e75656;
        font-size: 24px;
        line-height: 15px;
        font-weight: bold;
        font-family: "Gotham Narrow", sans-serif;
        text-align: center;
      `}
    >
      <WarningOutlined htmlColor="#e75656" fontSize="large" />
      <p>You are not authorized to view this {props.asset}</p>
    </div>
  );
}
