import React, { useCallback, useEffect } from "react";
import Box from "@material-ui/core/Box";
import {
  uploadAreacss,
  uploadDatasetcss,
} from "app/fragments/datasets-fragment/style";
import { ReactComponent as UploadIcon } from "app/fragments/datasets-fragment/assets/upload.svg";
import { ReactComponent as LocalUploadIcon } from "app/fragments/datasets-fragment/assets/local-upload.svg";
import { ReactComponent as GoogleDriveIcon } from "app/fragments/datasets-fragment/assets/google-drive.svg";
import { Tooltip } from "@material-ui/core";
import {
  DropzoneRootProps,
  DropzoneInputProps,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import { formatBytes } from "app/utils/formatBytes";

interface Props {
  disabled: boolean;
}

interface DragAndDropProps {
  disabled: boolean;
  handleNext: () => void;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function AddDatasetFragment(props: DragAndDropProps) {
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
    props.setFile(acceptedFiles[0]);
    if (acceptedFiles.length > 0) {
      props.handleNext();
    }
  }, [acceptedFiles]);

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
                <Tooltip title="Not yet implemented">
                  <button
                    type="button"
                    css={`
                      opacity: 0.6;
                    `}
                  >
                    <GoogleDriveIcon /> <p>Connect to google drive</p>
                  </button>
                </Tooltip>
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
