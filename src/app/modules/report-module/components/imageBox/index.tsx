import React from "react";
import { ReactComponent as ImageIcon } from "app/modules/report-module/asset/img-element.svg";
import { IconButton } from "@material-ui/core";
import UploadImageDialog from "./dialog";
export default function ImageBox(props: {
  setImageFile: React.Dispatch<React.SetStateAction<{ image: File }>>;
}) {
  const [modalDisplay, setModalDisplay] = React.useState(false);
  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        background: #fff;
        button {
          padding: 4px;
          &:hover {
            background: transparent;
          }
        }
        svg {
          &:hover {
            path {
              fill: #000;
            }
          }
        }
      `}
    >
      <IconButton onClick={() => setModalDisplay(true)}>
        <>
          <ImageIcon />
        </>
      </IconButton>
      <p
        css={`
          text-align: center;
        `}
      >
        Select image
      </p>
      {modalDisplay && (
        <UploadImageDialog
          setImageFile={props.setImageFile}
          setModalDisplay={setModalDisplay}
          modalDisplay={modalDisplay}
        />
      )}
    </div>
  );
}
