import { IconButton } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import React from "react";

export default function SelectStructure(props: {
  handleClose: () => void;
  open: boolean;
  toolBoxOpen: boolean;
}) {
  return (
    <div
      css={`
        position: absolute;
        top: 13rem;
        left: ${props.toolBoxOpen ? "0%" : "11%"};
        transition: left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;

        display: ${props.open ? "block" : "none"};
        z-index: 2;
      `}
    >
      <div
        css={`
          position: relative;
          height: 59px;
          width: 320px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          align-self: stretch;
          flex-shrink: 0;
          border-radius: 8px;
          background: #231d2c;
          color: #fff;
          font-family: "Gotham Narrow", sans-serif;
          font-size: 12px;
          font-style: normal;
          font-weight: 350;
          line-height: 16px;

          ::after {
            content: "";
            position: absolute;
            border: 8px solid transparent;
            border-bottom-color: #231d2c;
            border-top: 0;
            top: -8px;
            left: 50%;
            margin-left: -20px;
          }
          p {
            margin-top: 10px;
          }
        `}
      >
        <IconButton
          css={`
            padding: 0;
            font-size: 16px;
            margin: 0;
            position: absolute;
            top: 8px;
            right: 8px;
            color: #fff;
            &:hover {
              background: none;
              cursor: pointer;
            }
          `}
          onClick={props.handleClose}
        >
          <CloseOutlined color={"inherit"} fontSize={"inherit"} />
        </IconButton>
        <p>
          <b>Try it! Select what structure you want for your row!</b>
        </p>
      </div>
    </div>
  );
}
