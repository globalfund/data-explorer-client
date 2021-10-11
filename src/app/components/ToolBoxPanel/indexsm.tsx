import React from "react";
import { SubToolBoxPanel } from "./subToolBox";
import { ToolBoxPanelProps } from ".";

export function ToolBoxPage(props: ToolBoxPanelProps) {
  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        flex-direction: column;
      `}
    >
      <SubToolBoxPanel filterGroups={props.filterGroups} />
    </div>
  );
}
