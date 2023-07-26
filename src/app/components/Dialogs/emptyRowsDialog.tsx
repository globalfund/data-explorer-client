import React from "react";
import { useRecoilState } from "recoil";
import { useStyles } from "./deleteChartDialog";
import { CloseOutlined } from "@material-ui/icons";
import { IconButton, Modal } from "@material-ui/core";
import { emptyRowsAtom } from "app/state/recoil/atoms";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function EmptyRowsDialog() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useRecoilState(emptyRowsAtom);

  return (
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
            Empty rows
          </p>
          <p
            css={`
              margin-top: 19px;
              font-size: 14px;
              line-height: normal;
            `}
          >
            <b>
              We are unable to save the report as it contains rows with empty
              placeholders.
            </b>
          </p>
          <p
            css={`
              margin-top: 22px;
              font-size: 14px;
              line-height: normal;
            `}
          >
            Please fill in all the required information before proceeding.
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
  );
}
