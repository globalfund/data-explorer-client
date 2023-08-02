import React from "react";
import { SetterOrUpdater } from "recoil";
import { CloseOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

export default function RowFrameIntro(props: {
  setStep: SetterOrUpdater<number>;
  handleClose: () => void;
  open: boolean;
  reportType: "basic" | "advanced" | "ai";
  toolBoxOpen: boolean;
}) {
  return (
    <div
      css={`
        position: absolute;
        ${props.reportType === "basic" &&
        `top: 13rem; left: ${props.toolBoxOpen ? "0.5%" : "10%"}; `}
        ${props.reportType === "advanced" && "top: 11.7rem; left: -5%;"} 
        transition: left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;

        display: ${props.open ? "block" : "none"};
        z-index: 2;
      `}
    >
      <div
        css={`
          position: relative;
          height: 114px;
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
          <b>
            The reports in Dx are created by rows. Whenever you want to add
            chart or text, you need to use the Row frame element and Select a
            structure for the row.
          </b>
        </p>
        <button
          type="button"
          onClick={() => {
            props.setStep(2);
          }}
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
          <b>Next</b>
        </button>
      </div>
    </div>
  );
}
