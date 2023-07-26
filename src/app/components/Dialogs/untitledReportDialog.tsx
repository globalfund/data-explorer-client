import { IconButton, Modal } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import React from "react";
import { useStyles } from "./deleteChartDialog";
import { useRecoilState } from "recoil";
import { untitledReportAtom } from "app/state/recoil/atoms";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();

  return {
    top: `37%`,
    left: `56%`,
    transform: `translate(-${top}%, -47%)`,
  };
}

export default function UntitledReportDialog() {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const [open, setOpen] = useRecoilState(untitledReportAtom);
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div
            css={`
              width: 90%;
              position: relative;
            `}
          >
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
              css={`
                position: absolute;
                right: -70px;
                top: -30px;
                color: #231d2c;
              `}
            >
              <CloseOutlined color="inherit" />
            </IconButton>
            <p
              css={`
                font-weight: 400;
                font-size: 34px;
                color: #231d2c;
                line-height: 41px;
                margin-bottom: 0px;
                margin-left: 0;
                font-family: "Inter", sans-serif;
              `}
            >
              Untitled report
            </p>
            <p
              css={`
                margin-top: 19px;
                font-size: 14px;
                line-height: normal;
              `}
            >
              <b>You are attempting to save an untitled report.</b>
            </p>
            <p
              css={`
                margin-top: 22px;
                font-size: 14px;
                line-height: normal;
              `}
            >
              Please provide a title for the report before proceeding to ensure
              accurate organization and easy retrieval in the future.
            </p>
          </div>
          <div
            css={`
              display: flex;
              justify-content: flex-end;
              margin-top: 3rem;

              margin-bottom: 2rem;
              padding-right: 1rem;
            `}
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
              }}
              css={`
                background: #231d2c;
                padding: 12px 27px;
                border-radius: 30px;
                width: 93px;
                height: 41px;
                outline: none;
                border: none;
                text-transform: uppercase;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                &:hover {
                  opacity: 0.9;
                }
              `}
            >
              Okay
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
