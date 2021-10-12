import React from "react";
import { IconButton, Slide } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { SubToolBoxPanel } from "./subToolBox";
import { ToolBoxPanelProps } from ".";

export function ToolBoxPage(props: ToolBoxPanelProps) {
  return (
    <Slide direction="left" in={props.open}>
      <div
        css={`
          right: 0;
          top: 133px;
          z-index: 20;
          width: 500px;
          position: fixed;
          background: #f5f5f7;
          height: calc(100vh - 133px);
          visibility: visible !important;
          box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);

          @media (max-width: 500px) {
            width: calc(100vw - 50px);
          }
        `}
      >
        <div
          css={`
            width: 100%;
            height: 100%;
            display: flex;
            position: relative;
            flex-direction: column;
          `}
        >
          <div>
            <div css="height:24px;background-color: #373D43;width:100%;">
              <IconButton
                css="width:12px;height:12px;"
                onClick={props.onButtonClick}
              >
                <CloseOutlinedIcon htmlColor="#ffffff" viewBox=" -4 -4 30 30" />
              </IconButton>
            </div>
            <SubToolBoxPanel filterGroups={props.filterGroups} />
          </div>
        </div>
      </div>
    </Slide>
  );
}
