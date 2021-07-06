import React from "react";

interface ToolBoxPanelTabsProps {
  selected: string;
  options: string[];
  onSelect: (tab: string) => void;
}

export function ToolBoxPanelTabs(props: ToolBoxPanelTabsProps) {
  return (
    <div
      css={`
        width: 100%;
        display: flex;
        flex-direction: row;

        > button {
          color: #fff;
          outline: none;
          padding: 12px 0;
          font-size: 14px;
          line-height: 1.7;
          font-weight: bold;
          border-style: none;
          text-align: center;
          width: calc(100% / ${props.options.length});

          &:hover {
            cursor: pointer;
            background: #495057;
          }
        }
      `}
    >
      {props.options.map((option: string) => (
        <button
          key={option}
          type="button"
          onClick={() => props.onSelect(option)}
          css={`
            background: ${props.selected === option ? "#495057" : "#98a1aa"};
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
