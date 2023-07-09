import React from "react";
import { createStyles, IconButton, makeStyles, Modal } from "@material-ui/core";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";

interface Props {
  modalDisplay: boolean;
  setModalDisplay: (value: any) => void;
  setImageFile: React.Dispatch<React.SetStateAction<{ image: File }>>;
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

export default function UploadImageDialog(props: Props) {
  const classes = useStyles();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && props.setImageFile({ image: e.target.files[0] });
  };
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
            Upload image
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
            Upload an image from your <br />
            local computer
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
            Format images allowed <br />
            are jpeg and png.
          </p>
          <div
            css={`
              height: 10px;
            `}
          />
          <div
            css={`
              display: flex;
              justify-content: center;
            `}
          >
            <label htmlFor="img-upload">
              <div
                css={`
                  border-radius: 100px;
                  background: #dfe3e5;
                  width: 188px;
                  height: 48px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 8px;
                  font-size: 14px;
                  font-family: "Inter", sans-serif;
                  color: #262c34;
                `}
              >
                <DesktopWindowsIcon /> Local upload
              </div>
              <input
                type="file"
                name="image_file"
                id="img-upload"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div
            css={`
              height: 50px;
            `}
          />
          <div
            css={`
              display: flex;
              justify-content: flex-end;
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
          </div>
        </div>
      </div>
    </Modal>
  );
}
