import React from "react";
import { Button } from "@material-ui/core";
import { SubToolBoxPanel } from "./subToolBox";
import { ToolBoxPanelProps } from ".";

export function ToolBoxPage(props: ToolBoxPanelProps) {
  return (
    <>
      <SubToolBoxPanel filterGroups={props.filterGroups} />
    </>
  );
}
