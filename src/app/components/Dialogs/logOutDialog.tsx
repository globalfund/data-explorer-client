import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useStyles } from "./deleteChartDialog";
import { CloseOutlined } from "@material-ui/icons";
import { IconButton, Modal } from "@material-ui/core";

interface Props {
  modalDisplay: boolean;
  setModalDisplay: (value: boolean) => void;
}

export default function LogOutDialog(props: Props) {
  const classes = useStyles();
  const { logout } = useAuth0();

  return (
    <div>
      <Modal
        open={props.modalDisplay}
        onClose={() => props.setModalDisplay(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            top: `21vh`,
            left: `61vh`,
            height: "264px",
          }}
          className={classes.paper}
        >
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
                margin-top: 2.5rem;
              `}
            >
              Log out
            </p>
            <p
              css={`
                margin-top: 3px;
              `}
            >
              Are you sure you want to log out?
            </p>
          </div>
          <div
            css={`
              display: flex;
              justify-content: flex-end;
              margin-top: 4rem;
              gap: 2rem;
              margin-bottom: 2rem;
              padding-right: 1rem;
            `}
          >
            <button
              type="button"
              onClick={() => props.setModalDisplay(false)}
              css={`
                background: transparent;
                border-radius: 30px;
                width: 107px;
                height: 41px;
                outline: none;
                border: none;
                text-transform: uppercase;
                color: #231d2c;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              `}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => logout()}
              css={`
                background: #231d2c;
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
              Log out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
