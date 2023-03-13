/* third-party */
import React from "react";
import Popover, { PopoverOrigin } from "@material-ui/core/Popover";

interface Props {
  handleClose: () => void;
  anchorOrigin: PopoverOrigin;
  anchorEl: HTMLElement | null;
  transformOrigin: PopoverOrigin;
  onItemClick: (value: string) => void;
  selected: string;
  items: {
    value: string;
    content: string | React.ReactNode;
  }[];
}

export function DataThemesToolbarPopover(props: Props) {
  const open = Boolean(props.anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={props.anchorOrigin}
      transformOrigin={props.transformOrigin}
      css={`
        .MuiPaper-root {
          width: 125px;
          background: #fff;
          border-radius: 7px;
          box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
        }
      `}
    >
      {props.items.map((item) => (
        <div
          key={item.value}
          onClick={() => props.onItemClick(item.value)}
          css={`
            width: 100%;
            color: #000;
            font-size: 14px;
            padding: 8px 12px;
            cursor: ${props.selected === item.value ? "default" : "pointer"};

            ${props.selected === item.value &&
            `
              color: #fff;
              background: #262c34;

              svg {
                > path {
                  fill: #fff;
                }
              }
            `}

            &:not(:last-child) {
              border-bottom: 1px solid #f1f3f5;
            }

            &:hover {
              color: #fff;
              background: #262c34;

              svg {
                > path {
                  fill: #fff;
                }
              }
            }

            > div {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          `}
        >
          {item.content}
        </div>
      ))}
    </Popover>
  );
}
