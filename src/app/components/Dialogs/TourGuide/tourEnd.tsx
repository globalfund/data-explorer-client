import { IconButton } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import React from "react";

export default function TourEnd({
  handleClose,
  open,
  reportType,
  toolBoxOpen,
}: {
  handleClose: () => void;
  open: boolean;
  reportType: "basic" | "advanced" | "ai";
  toolBoxOpen: boolean;
}) {
  return (
    <div
      css={`
        position: absolute;

        ${reportType === "basic" &&
        `top: 19.8rem; right: ${toolBoxOpen ? "-25%" : "-10%"};`}
        ${reportType === "advanced" &&
        `top: 2.4rem; right: ${toolBoxOpen ? "-29%" : "-10%"};`} 
        display: ${open ? "block" : "none"};
        transition: right 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;

        z-index: 100;
      `}
    >
      <div
        css={`
          position: relative;
          height: 136px;
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
          font-style: normal;
          font-weight: 350;
          line-height: 16px;
          p {
            font-weight: 500;
            font-size: 12px;
            margin-bottom: 0px;
          }

          ::after {
            content: "";
            position: absolute;
            border: 8px solid transparent;
            border-right-color: #231d2c;
            border-left: 0;
            left: -8px;
            top: 50%;
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
          onClick={handleClose}
        >
          <CloseOutlined color={"inherit"} fontSize={"inherit"} />
        </IconButton>
        <p>
          {reportType === "basic" &&
            " Good job! These grey rectangles are called placeholders. You drag and drop Chart or other Layout elements inside from the right panel."}
          {reportType === "advanced" &&
            "These grey rectangles are called placeholders. You drag and drop Chart or other Layout elements inside from the right panel"}
          <br />
          <br />
          That’s how you create a report. Easy right!
        </p>
        <button
          type="button"
          onClick={handleClose}
          css={`
            border: none;
            background: none;
            outline: none;
            color: #fff;
            text-decoration: underline;
            text-align: right;
            width: 100%;
            margin-top: 0px;
            cursor: pointer;
          `}
        >
          <b>Got it!</b>
        </button>
      </div>
    </div>
  );
}
