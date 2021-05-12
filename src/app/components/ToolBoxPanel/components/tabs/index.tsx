import React from "react";

interface ToolBoxPanelTabsProps {
  selected: string;
  onSelect: (tab: string) => void;
}

export function ToolBoxPanelTabs(props: ToolBoxPanelTabsProps) {
  return (
    <div
      css={`
        width: 100%;
        display: flex;
        flex-direction: row;

        > div {
          width: 50%;
          color: #fff;
          padding: 12px 0;
          font-size: 14px;
          font-weight: bold;
          text-align: center;

          &:hover {
            cursor: pointer;
            background: #495057;
          }
        }
      `}
    >
      <div
        role="button"
        onClick={() => props.onSelect("Control")}
        css={`
          background: ${props.selected === "Control" ? "#495057" : "#98a1aa"};
        `}
      >
        Control
      </div>
      <div
        role="button"
        onClick={() => props.onSelect("Filters")}
        css={`
          background: ${props.selected === "Filters" ? "#495057" : "#98a1aa"};
        `}
      >
        Filters
      </div>
    </div>
  );
}
