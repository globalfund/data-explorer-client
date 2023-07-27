import React from "react";
import { createStyles, makeStyles, Modal } from "@material-ui/core";

interface Props {
  cardId?: string;
  modalType: string;
  chartName: string;
  setModalType: (value: any) => void;
  handleDelete: (id?: string) => void;
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

export default function DeleteChartDialog(props: Props) {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={props.modalType === "delete"}
      onClose={() => props.setModalType("")}
    >
      <div className={classes.paper}>
        <div
          css={`
            width: 434px;
            height: 324px;
            padding: 24px;
            display: flex;
            position: relative;
            border-radius: 16px;
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          <div>
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
              Delete Chart?
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
              Proceed with caution! <br />
              No turning back after this action
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
              Are you sure you want to delete your chart, [{props.chartName}]?
              Please keep in mind that once deleted, you won't be able to access
              it again.
            </p>
          </div>
          <div
            css={`
              gap: 13px;
              display: flex;
              justify-content: flex-end;

              button {
                font-size: 14px;
                cursor: pointer;
                font-weight: 600;
                letter-spacing: 1px;
                font-family: "Inter", sans-serif;
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
              onClick={() => props.handleDelete(props.cardId)}
              css={`
                background: #fa7355;
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
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
