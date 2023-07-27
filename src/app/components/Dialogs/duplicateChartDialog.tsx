import React from "react";
import { Modal, createStyles, makeStyles } from "@material-ui/core";

interface Props {
  cardId?: string;
  modalType: string;
  duplicateName: string;
  setModalType: (value: any) => void;
  handleDuplicate: (id?: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

export default function DuplicateChartDialog(props: Props) {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={props.modalType === "duplicate"}
      onClose={() => props.setModalType("")}
    >
      <div className={classes.paper}>
        <div
          css={`
            width: 434px;
            height: 324px;
            padding: 24px;
            position: relative;
            border-radius: 16px;
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
            Duplicate Chart
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
            Duplicate your charts <br />
            and create multiple variants
          </p>
          <p
            css={`
              width: 90%;
              color: #b6b6b6;
              font-size: 14px;
              font-weight: 400;
              line-height: 16.6px;
              font-family: "Gotham Narrow", sans-serif;
            `}
          >
            This chart will be duplicated in your library, please introduce a
            name for the new chart.
          </p>
          <div
            css={`
              height: 45px;
            `}
          />
          <div>
            <input
              type="text"
              value={props.duplicateName}
              placeholder={props.duplicateName}
              onChange={props.handleInputChange}
              css={`
                border-radius: 16px;
                border: none;
                outline: none;
                background: #f1f3f5;
                height: 32.59px;
                width: 100%;
                font-family: "Inter", sans-serif;
                font-size: 14px;
                color: #2e4063;

                padding-left: 19px !important;
                ::placeholder {
                  color: #2e4063;
                }
              `}
            />
          </div>
          <div
            css={`
              display: flex;
              justify-content: flex-end;
              margin-top: 25px;
              gap: 13px;
              button {
                font-size: 14px;
                font-family: "Inter", sans-serif;
                font-weight: 600;
                cursor: pointer;
                letter-spacing: 1px;
              }
            `}
          >
            <button
              type="button"
              onClick={() => props.setModalType("")}
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
              onClick={() => props.handleDuplicate(props.cardId)}
              css={`
                background: #262c34;
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
              Duplicate
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
