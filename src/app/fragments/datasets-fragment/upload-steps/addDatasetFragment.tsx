import React from "react";
import Box from "@material-ui/core/Box";
import {
  uploadAreacss,
  uploadDatasetcss,
} from "app/fragments/datasets-fragment/style";
import { ReactComponent as UploadIcon } from "app/fragments/datasets-fragment/assets/upload.svg";
import { ReactComponent as LocalUploadIcon } from "app/fragments/datasets-fragment/assets/local-upload.svg";
import { ReactComponent as GoogleDriveIcon } from "app/fragments/datasets-fragment/assets/google-drive.svg";
import { Tooltip } from "@material-ui/core";

interface Props {
  handleNext: () => void;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function AddDatasetFragment(props: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFile(e.target.files?.[0] || null);
    props.handleNext();
  };
  return (
    <div css={uploadDatasetcss}>
      <div>
        <p>Add your file</p>
      </div>
      <div css={uploadAreacss}>
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
          Drag and Drop Spreadsheets File here <br /> or connect to Google Drive
        </p>
        <Box height={30} />
        <div
          css={`
            display: flex;
            gap: 1rem;
          `}
        >
          <input
            id="local-upload"
            type="file"
            hidden
            onChange={handleFileChange}
          />
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
      </div>
    </div>
  );
}