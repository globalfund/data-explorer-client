import React from "react";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import { IconButton } from "@material-ui/core";

export default function ToolboxSubHeader(props: {
  name: string;
  level: number;
  showResetButton?: boolean;
  resetFilters?: () => void;
}) {
  return (
    <div
      css={`
        border-bottom: 1px solid #dfe3e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 24px;
        padding-right: 24px;
        button {
          padding: 4px;
          color: #495057;
          cursor: pointer;
          :hover {
            background: transparent;
          }
        }
        div {
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
      {props.showResetButton && (
        <div>
          <span>Reset filters</span>{" "}
          <IconButton onClick={props.resetFilters}>
            <SettingsBackupRestoreIcon color="inherit" />
          </IconButton>
        </div>
      )}
    </div>
  );
}
