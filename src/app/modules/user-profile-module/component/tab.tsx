import React from "react";
import { tabcss } from "../style";

interface TabProps {
  title: string;
  active: boolean;
  handleClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  component: () => JSX.Element;
}

export default function Tab(props: TabProps) {
  return (
    <div onClick={props.handleClick} css={tabcss(props.active)}>
      <p>{props.title}</p>
      <p>{props.component()}</p>
    </div>
  );
}
