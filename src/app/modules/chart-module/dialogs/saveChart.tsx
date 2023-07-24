import React from "react";
import { createStyles, makeStyles, Modal } from "@material-ui/core";

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  saveModalContent: {
    title: string;
    description: string;
    buttonTitle: string;
    subText: string;
    action: () => void;
  };
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

export default function SaveChartCreationDialog(props: Props) {
  const classes = useStyles();
  return (
    <Modal
      open={props.modalOpen}
      className={classes.modal}
      onClose={() => props.setModalOpen(false)}
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
            {props.saveModalContent.title}
          </p>
          <p
            css={`
              font-size: 14px;
              font-family: "Inter", sans-serif;
              color: #262c34;
              font-weight: 700;
              line-height: 20px;
            `}
          >
            {props.saveModalContent.description}
          </p>
          <p
            css={`
              font-size: 14px;
              font-family: "Gotham Narrow", sans-serif;
              font-weight: 325;
              line-height: 16.6px;

              color: #b6b6b6;
              width: 90%;
            `}
          >
            {props.saveModalContent.subText}
          </p>
          <div
            css={`
              height: 85px;
            `}
          />

          <div
            css={`
              display: flex;
              justify-content: flex-end;
              margin-top: 20px;
              gap: 13px;
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
              onClick={() => props.setModalOpen(false)}
              css={`
                background: #262c34;
                outline: none;
                border: none;
                color: #fff;
                width: 179px;
                height: 33px;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              Continue editing
            </button>
            <button
              type="button"
              onClick={props.saveModalContent.action}
              css={`
                background: #262c34;

                border-radius: 8px;
                width: 141px;
                height: 33px;
                outline: none;
                border: none;

                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              {props.saveModalContent.buttonTitle}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
