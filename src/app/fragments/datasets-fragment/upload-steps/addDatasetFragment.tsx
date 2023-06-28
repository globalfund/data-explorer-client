import React, { useCallback, useEffect } from "react";
import Box from "@material-ui/core/Box";
import {
  uploadAreacss,
  uploadDatasetcss,
} from "app/fragments/datasets-fragment/style";
import { ReactComponent as UploadIcon } from "app/fragments/datasets-fragment/assets/upload.svg";
import { ReactComponent as LocalUploadIcon } from "app/fragments/datasets-fragment/assets/local-upload.svg";
import { ReactComponent as GoogleDriveIcon } from "app/fragments/datasets-fragment/assets/google-drive.svg";

import {
  DropzoneRootProps,
  DropzoneInputProps,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import { formatBytes } from "app/utils/formatBytes";
import useDrivePicker from "react-google-drive-picker";
import { PickerCallback } from "react-google-drive-picker/dist/typeDefs";
import axios from "axios";

interface Props {
  disabled: boolean;
}

interface DragAndDropProps {
  disabled: boolean;
  handleNext: () => void;
  setFile: React.Dispatch<React.SetStateAction<File | string | null>>;
}

export default function AddDatasetFragment(props: DragAndDropProps) {
  const [openPicker, authResponse] = useDrivePicker();
  const [fileData, setFileData] = React.useState<PickerCallback | null>(null);

  React.useEffect(() => {
    if (authResponse?.access_token && fileData?.docs) {
      axios({
        url: `https://www.googleapis.com/drive/v3/files/${fileData?.docs[0].id}?alt=media`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${authResponse?.access_token}`,
          "Content-Type": "application/vnd.google-apps.document",
        },
        responseType: "blob", // important
      }).then((response) => {
        console.log(response.data, "response.data");
        const b = response.data;
        const file = new File([b], fileData?.docs[0].name, { type: b.type });
        props.setFile(file);
        props.handleNext();
      });
    }
  }, [authResponse, fileData]);

  const ACCEPTED_FILES = {
    "text/csv": [".csv"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
    "application/xml": [".xml"],
    "application/vnd.ms-excel": [".xls"],
    "application/xhtml+xml": [".xhtml"],
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({ onDrop, accept: ACCEPTED_FILES });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      props.setFile(acceptedFiles[0]);
      props.handleNext();
    }
  }, [acceptedFiles]);

  function getTokenAndOpenPicker() {
    openPicker({
      clientId: process.env.REACT_APP_GOOGLE_API_CLIENT_ID as string,
      developerKey: process.env.REACT_APP_GOOGLE_API_DEV_KEY as string,
      viewId: "SPREADSHEETS",
      supportDrives: true,
      token: "",
      setSelectFolderEnabled: true,
      callbackFunction: (d: PickerCallback) => {
        console.log(d);
        setFileData(d);
      },
    });
  }

  function handleOpenPicker(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    getTokenAndOpenPicker();
  }

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {formatBytes(file.size)}
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));
  return (
    <>
      <DropZone
        disabled={props.disabled}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        fileRejections={fileRejections}
        acceptedFiles={acceptedFiles}
        handleOpenPicker={handleOpenPicker}
      />
      {fileRejections.length > 0 && fileRejectionItems}
    </>
  );
}

interface DropzoneProps extends Props {
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  isDragActive: boolean;
  fileRejections: FileRejection[];
  acceptedFiles: File[];
  isFocused?: boolean;
  isDragAccept?: boolean;
  isDragReject?: boolean;
  isFileDialogActive?: boolean;
  draggedFiles?: File[];
  rootRef?: React.RefObject<HTMLElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
  handleOpenPicker(e: React.MouseEvent<HTMLButtonElement>): void;
}

export const DropZone = (props: DropzoneProps) => {
  return (
    <>
      <div css={uploadDatasetcss} {...props.getRootProps()}>
        <div>
          <p>Add your file</p>
        </div>
        <div css={uploadAreacss(props.isDragActive)}>
          <input {...props.getInputProps()} />
          {!props.isDragActive && (
            <>
              <UploadIcon
                css={`
                  margin-top: 2rem;
                `}
              />
              <p
                css={`
                  font-weight: 500;
                  font-size: 12px;
                  color: #231d2c;
                  margin-top: 5px;
                `}
              >
                Supports: XLSX, CSV
              </p>
              <p
                css={`
                  font-size: 20px;
                  line-height: 24px;
                  font-style: normal;
                `}
              >
                Drag and Drop Spreadsheets File here <br /> or connect to Google
                Drive
              </p>
              <Box height={30} />
              <div
                css={`
                  display: flex;
                  gap: 1rem;
                `}
              >
                <label htmlFor="local-upload">
                  <LocalUploadIcon /> <p>Local upload</p>
                </label>

                <button type="button" onClick={props.handleOpenPicker}>
                  <GoogleDriveIcon /> <p>Connect to google drive</p>
                </button>
              </div>
              <Box height={80} />
              <p>
                <span
                  css={`
                    text-decoration: underline;
                    cursor: pointer;
                  `}
                >
                  Download spreadsheet templates
                </span>{" "}
                to help you get started
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
