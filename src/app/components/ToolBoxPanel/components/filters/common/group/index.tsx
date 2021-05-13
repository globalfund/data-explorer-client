import React from "react";
import { CloseIcon } from "app/assets/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";

interface FilterGroupCompProps extends FilterGroupProps {
  expandGroup: () => void;
}

export function FilterGroup(props: FilterGroupCompProps) {
  return (
    <div
      css={`
        gap: 6px;
        width: 100%;
        display: flex;
        padding: 15px 0;
        flex-direction: column;
        border-bottom: 1px solid #dfe3e6;
      `}
    >
      <div
        css={`
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          > button {
            margin-right: 6px;
            transform: rotate(90deg);
          }
        `}
      >
        {props.name}
        <IconButton onClick={props.expandGroup}>
          <TriangleXSIcon />
        </IconButton>
      </div>
      {props.selectedOptions.length > 0 && (
        <div
          css={`
            gap: 6px;
            width: 100%;
            display: flex;
            padding: 5px 0;
            max-width: 100%;
            overflow-x: auto;
            flex-direction: row;

            &::-webkit-scrollbar {
              height: 4px;
              background: #495057;
            }
            &::-webkit-scrollbar-track {
              border-radius: 4px;
              background: #f5f5f7;
            }
            &::-webkit-scrollbar-thumb {
              border-radius: 4px;
              background: #495057;
            }
          `}
        >
          {props.selectedOptions.map((option: string) => (
            <div
              key={option}
              css={`
                gap: 6px;
                display: flex;
                color: #495057;
                font-size: 10px;
                background: #fff;
                padding: 5px 10px;
                border-radius: 20px;
                flex-direction: row;
                justify-content: space-between;

                > div {
                  max-width: 100px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }

                > svg:hover {
                  cursor: pointer;
                }
              `}
            >
              <div>{option}</div>
              <CloseIcon />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
