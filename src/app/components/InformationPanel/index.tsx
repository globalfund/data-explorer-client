/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import Slide from "@material-ui/core/Slide";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

interface InformationPanelProps {
  open: boolean;
  onButtonClick: () => void;
  children: React.ReactNode;
}

export function InformationPanel(props: InformationPanelProps) {
  return (
    <ClickAwayListener
      onClickAway={() => {
        if (props.open) {
          props.onButtonClick();
        }
      }}
    >
      <Slide direction="right" in={props.open}>
        <div
          css={`
            left: 0;
            top: 133px;
            z-index: 2;
            width: 500px;
            position: fixed;
            background: #f5f5f7;
            height: calc(100% - 133px);
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
                right: -94px;
                font-size: 14px;
                cursor: pointer;
                padding: 6px 40px;
                font-weight: bold;
                position: absolute;
                text-align: center;
                background: #495057;
                transform: rotate(-90deg);
                border-radius: 0px 0px 20px 20px;
                transition: background 0.2s ease-in-out;

                &:hover {
                  background: #2e4df9;
                }
              `}
              onClick={() => props.onButtonClick()}
            >
              Information
            </div>
            {props.children}
          </div>
        </div>
      </Slide>
    </ClickAwayListener>
  );
}
