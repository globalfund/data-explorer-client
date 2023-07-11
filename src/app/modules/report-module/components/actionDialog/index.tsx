import React from "react";
import { createStyles, IconButton, makeStyles, Modal } from "@material-ui/core";

interface Props {
  modalDisplay: boolean;
  setModalDisplay: (value: any) => void;
  title: string;
  subtitle: React.ReactNode;
  description: string;
  buttonTitle: string;
  modalType: "edit-row" | "delete-row" | "";
  action: () => void;
}

export const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    paper: {
      outline: 0,
      borderRadius: "16px",
      position: "absolute",
      backgroundColor: "#fff",
      boxShadow:
        "0px 14.8787px 22.318px rgba(0, 0, 0, 0.05), 0px 4.4636px 7.43933px rgba(0, 0, 0, 0.05), 0px 0.743933px 7.43933px rgba(0, 0, 0, 0.05)",
    },
  })
);

export default function ReportActionDialog(props: Props) {
  const classes = useStyles();

  return (
    <Modal
      open={props.modalDisplay}
      className={classes.modal}
      onClose={() => props.setModalDisplay(false)}
    >
      <div className={classes.paper}>
        <div
          css={`
            width: calc(52vw - 434px);
            height: 324px;
            padding: 24px;
            border-radius: 16px;
            position: relative;
          `}
        >
          <p
            css={`
              font-size: 24px;
              font-family: "Inter", sans-serif;
              font-weight: 700;
              color: #262c34;
              margin-bottom: 0px;
              margin-top: 0px;
            `}
          >
            {props.title}
          </p>
          <p
            css={`
              font-size: 14px;
              font-family: "Inter", sans-serif;
              color: #262c34;
              font-weight: 700;
              line-height: 20px;
              width: 65%;
            `}
          >
            {props.subtitle}
          </p>
          <p
            css={`
              font-size: 14px;
              font-family: "Gotham Narrow", sans-serif;
              font-weight: 325;
              line-height: 16.6px;

              color: #b6b6b6;
              width: 90%;
              margin-top: 19px;
            `}
          >
            {props.description}
          </p>

          <div
            css={`
              height: 70px;
            `}
          />
          <div
            css={`
              display: flex;
              justify-content: flex-end;
              margin-top: 20px;
              gap: 13px;
              padding-right: 1rem;
              button {
                font-size: 14px;
                font-family: "Inter", sans-serif;
                font-weight: 600;
                cursor: pointer;
              }
            `}
          >
            <button
              type="button"
              onClick={() => props.setModalDisplay(false)}
              css={`
                background: transparent;
                outline: none;
                border: none;
                color: #252c34;
              `}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={props.action}
              css={`
                background: ${props.modalType === "delete-row"
                  ? "#ff4d4f"
                  : "#252c34"};
                border-radius: 8px;
                width: 108px;
                height: 32.59px;
                outline: none;
                border: none;

                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              {props.buttonTitle}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}