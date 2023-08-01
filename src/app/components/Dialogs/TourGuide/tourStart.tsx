import React from "react";
import { CloseOutlined } from "@material-ui/icons";
import { IconButton, Modal, createStyles, makeStyles } from "@material-ui/core";
import { SetterOrUpdater } from "recoil";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

export const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
    paper: {
      outline: 0,
      width: 544,
      borderRadius: "10px",
      paddingRight: "1rem",
      position: "absolute",
      paddingLeft: "3.5rem",
      backgroundColor: "#fff",
      boxShadow:
        "0px 14.8787px 22.318px rgba(0, 0, 0, 0.05), 0px 4.4636px 7.43933px rgba(0, 0, 0, 0.05), 0px 0.743933px 7.43933px rgba(0, 0, 0, 0.05)",
    },
  })
);
export default function TourStart(props: {
  setStep: SetterOrUpdater<number>;
  handleClose: () => void;
  open: boolean;
}) {
  const classes = useStyles();

  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.handleClose();
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <div className={classes.paper}>
        <div
          css={`
            width: 90%;
            position: relative;
          `}
        >
          <IconButton
            onClick={() => {
              props.handleClose();
            }}
            css={`
              position: absolute;
              right: -60px;
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
            Welcome to the Dx report builder!
          </p>
          <p
            css={`
              margin-top: 19px;
              font-size: 14px;
              line-height: normal;
            `}
          >
            <b>Are you ready to create your first report?</b>
          </p>
          <p
            css={`
              margin-top: 22px;
              font-size: 14px;
              line-height: normal;
            `}
          >
            Need some help? Follow this quick intro to get familiar with the
            tools!
          </p>
        </div>
        <div
          css={`
            display: flex;
            justify-content: flex-end;
            gap: 20px;
            margin-top: 3rem;
            margin-bottom: 2rem;
            padding-right: 1rem;
            button {
              font-family: "Inter", sans-serif;
              font-size: 14px;
              font-weight: 500;
            }
          `}
        >
          <button
            type="button"
            onClick={() => {
              props.handleClose();
            }}
            css={`
              background: #e4e4e4;
              padding: 12px 27px;
              border-radius: 30px;
              width: 93px;
              height: 41px;
              outline: none;
              border: none;
              text-transform: uppercase;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #231d2c;

              cursor: pointer;
              &:hover {
                opacity: 0.9;
              }
            `}
          >
            Skip
          </button>

          <button
            type="button"
            onClick={() => {
              props.setStep(1);
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
            Start
          </button>
        </div>
      </div>
    </Modal>
  );
}
