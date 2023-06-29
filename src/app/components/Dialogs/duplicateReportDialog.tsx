import { Modal, createStyles, makeStyles } from "@material-ui/core";
import React from "react";

interface Props {
  cardId?: number;

  modalType: string;
  enableButton: boolean;
  handleDuplicate: (id: number) => void;
  setModalType: (value: any) => void;
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
export default function DuplicateReportDialog(props: Props) {
  const classes = useStyles();

  return (
    <Modal
      open={props.modalType === "duplicate"}
      className={classes.modal}
      onClose={() => props.setModalType("")}
    >
      <div className={classes.paper}>
        <div
          css={`
            /* width: 100%; */
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
            Duplicate Report
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
            Duplicate your reports <br />
            and create multiple variants
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
            This report will be duplicated in your library, please introduce a
            name for the new report.
          </p>
          <div
            css={`
              margin-top: 27px;
            `}
          >
            <input
              type="text"
              placeholder='Type "DELETE" to confirm'
              onChange={props.handleInputChange}
              css={`
                border-radius: 16px;
                border: none;
                outline: none;
                background: #f1f3f5;
                height: 32.59px;
                width: 100%;
                padding-left: 19px !important;
              `}
            />
          </div>
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
              onClick={() => props.handleDuplicate(props.cardId as number)}
              disabled={!props.enableButton}
              css={`
                background: ${props.enableButton ? "#FA7355" : "#262C34"};
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
