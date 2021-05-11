/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import Slide from "@material-ui/core/Slide";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

interface ToolBoxPanelProps {
  open: boolean;
  onButtonClick: () => void;
  children: React.ReactNode;
}

export function ToolBoxPanel(props: ToolBoxPanelProps) {
  const [visibleVScrollbar, setVisibleVScrollbar] = React.useState(
    document.body.scrollHeight > document.body.clientHeight
  );

  React.useLayoutEffect(() => {
    setVisibleVScrollbar(
      document.body.scrollHeight > document.body.clientHeight
    );
  });

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (props.open) {
          props.onButtonClick();
        }
      }}
    >
      <Slide direction="left" in={props.open}>
        <div
          css={`
            right: 0;
            top: 48px;
            z-index: 20;
            width: 500px;
            position: fixed;
            background: #f5f5f7;
            height: calc(100vh - 48px);
            visibility: visible !important;

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
            <div
              role="button"
              tabIndex={-1}
              css={`
                top: 45%;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
                padding: 6px 40px;
                font-weight: bold;
                position: absolute;
                text-align: center;
                background: #495057;
                transform: rotate(-90deg);
                border-radius: 20px 20px 0px 0px;
                left: -${!visibleVScrollbar || props.open ? 82 : 97}px;
              `}
              onClick={() => props.onButtonClick()}
            >
              Toolbox
            </div>
            {props.children}
          </div>
        </div>
      </Slide>
    </ClickAwayListener>
  );
}
