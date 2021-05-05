import React from "react";
import Slide from "@material-ui/core/Slide";

interface InformationPanelProps {
  open: boolean;
  onButtonClick: () => void;
  children: React.ReactNode;
}

export function InformationPanel(props: InformationPanelProps) {
  return (
    <Slide direction="right" in={props.open}>
      <div
        css={`
          left: 0;
          top: 133px;
          z-index: 2;
          width: 500px;
          position: absolute;
          background: #f5f5f7;
          height: calc(100vh - 133px);
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
            css={`
              top: 45%;
              color: #fff;
              right: -74px;
              font-size: 14px;
              cursor: pointer;
              padding: 5px 20px;
              font-weight: bold;
              position: absolute;
              text-align: center;
              background: #495057;
              transform: rotate(-90deg);
              border-radius: 0px 0px 20px 20px;
            `}
            onClick={() => props.onButtonClick()}
          >
            Information
          </div>
          {props.children}
        </div>
      </div>
    </Slide>
  );
}
