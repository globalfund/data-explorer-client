import React from "react";
import { Link } from "react-router-dom";
import { TickIcon } from "app/assets/icons/Tick";
import { ViewModel } from "../../utils/getControlItems";

interface ToolBoxPanelControlRowProps {
  title: string;
  selected: string;
  options: ViewModel[];
  setSelected: (value: string) => void;
}

export function ToolBoxPanelControlRow(props: ToolBoxPanelControlRowProps) {
  return (
    <div
      css={`
        gap: 12px;
        width: 100%;
        display: flex;
        padding: 15px 25px;
        flex-direction: column;
        border-bottom: 1px solid #dfe3e6;
      `}
    >
      <b>{props.title}</b>
      <div
        css={`
          gap: 12px;
          display: flex;
          flex-direction: row;
        `}
      >
        {props.options.map((option: ViewModel) =>
          option.link ? (
            <Link
              key={option.value}
              onClick={() => props.setSelected(option.value)}
              to={option.link}
              css={`
                gap: 6px;
                display: flex;
                font-size: 12px;
                padding: 8px 12px;
                flex-direction: row;
                border-radius: 20px;
                align-items: center;
                text-decoration: none;
                color: ${props.selected === option.value ? "#fff" : "#495057"};
                background: ${props.selected === option.value
                  ? "#495057"
                  : "#fff"};

                &:hover {
                  color: #fff;
                  cursor: pointer;
                  background: #495057;
                }
              `}
            >
              {props.selected === option.value && <TickIcon />}
              {option.label}
            </Link>
          ) : (
            <div
              role="button"
              key={option.value}
              onClick={() => props.setSelected(option.value)}
              css={`
                gap: 6px;
                display: flex;
                font-size: 12px;
                padding: 8px 12px;
                flex-direction: row;
                border-radius: 20px;
                align-items: center;
                color: ${props.selected === option.value ? "#fff" : "#495057"};
                background: ${props.selected === option.value
                  ? "#495057"
                  : "#fff"};

                &:hover {
                  color: #fff;
                  cursor: pointer;
                  background: #495057;
                }
              `}
            >
              {props.selected === option.value && <TickIcon />}
              {option.label}
            </div>
          )
        )}
      </div>
    </div>
  );
}
