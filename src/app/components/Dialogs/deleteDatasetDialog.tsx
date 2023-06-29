import {
  createStyles,
  IconButton,
  makeStyles,
  Modal,
  Theme,
} from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import React from "react";
import { useStyles } from "./deleteChartDialog";

interface Props {
  modalDisplay: boolean;
  setModalDisplay: (value: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (id: string) => void;
  cardId: string;
  enableButton: boolean;
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();

  return {
    top: `${top}%`,
    left: `47%`,
    transform: `translate(-${top}%, -47%)`,
  };
}

export default function DeleteDatasetDialog(props: Props) {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  return (
    <div>
      <Modal
        open={props.modalDisplay}
        onClose={() => props.setModalDisplay(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div
            css={`
              width: 80%;
              position: relative;
            `}
          >
            <IconButton
              onClick={() => props.setModalDisplay(false)}
              css={`
                position: absolute;
                right: -93px;
                top: -16px;
                color: "#231D2C";
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
              `}
            >
              Delete dataset
            </p>
            <p
              css={`
                margin-top: 3px;
              `}
            >
              Absolutely sure you want to delete the dataset(s)? <br />{" "}
              <b>This action is irreversible!</b>
            </p>
            <div
              css={`
                margin-top: 3rem;
              `}
            >
              <input
                type="text"
                placeholder='Type "DELETE" to confirm'
                onChange={props.handleInputChange}
                css={`
                  border: 1px solid #231d2c;
                  border-radius: 10px;
                  background: #ffffff;
                  height: 48px;
                  width: 100%;
                  padding: 0px 24px;
                  :focus,
                  :active,
                  :hover {
                    outline: 1px solid #6061e5;
                  }
                `}
              />
            </div>
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
              onClick={() => props.handleDelete(props.cardId)}
              disabled={!props.enableButton}
              css={`
                background: ${props.enableButton ? "#231D2C" : "#e4e4e4"};
                border-radius: 30px;
                width: 107px;
                height: 41px;
                outline: none;
                border: none;
                text-transform: uppercase;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              `}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
