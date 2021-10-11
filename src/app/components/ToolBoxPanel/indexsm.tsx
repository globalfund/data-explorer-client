import React from "react";
import { IconButton } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { SubToolBoxPanel } from "./subToolBox";
import { ToolBoxPanelProps } from ".";

export function ToolBoxPage(props: ToolBoxPanelProps) {
  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        visibility: ${props.open ? "visible" : "hidden"};
        opacity: ${props.open ? 1 : 0};
        left: 0;
        top: 40px;
        position: fixed;
        z-index: 15;
      `}
    >
      <div>
        <div css="height:24px;background-color: #373D43;width:100%;">
          <IconButton
            css="
            width:12px;
            height:12px;"
            onClick={props.onButtonClick}
          >
            <CloseOutlinedIcon htmlColor="#ffffff" viewBox=" -7 -7 30 30" />
          </IconButton>
        </div>
        <SubToolBoxPanel filterGroups={props.filterGroups} />
      </div>
    </div>
  );
}
