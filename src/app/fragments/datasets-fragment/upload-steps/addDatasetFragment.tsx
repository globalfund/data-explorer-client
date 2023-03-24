import React from "react";
import { ReactComponent as UploadIcon } from "../assets/upload.svg";
import { ReactComponent as LocalUploadIcon } from "../assets/local-upload.svg";
import { ReactComponent as GoogleDriveIcon } from "../assets/google-drive.svg";
import { uploadAreacss, uploadDatasetcss } from "../style";
import { Box } from "@material-ui/core";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";

interface Props {
  handleNext: () => void;
}
export default function AddDatasetFragment(props: Props) {
  return (
    <>
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
            <input
              id="local-upload"
              type="file"
              hidden
              onChange={props.handleNext}
            />
            <label htmlFor="local-upload">
              <LocalUploadIcon /> <p>Local upload</p>
            </label>
            <button type="button">
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
        </div>
      </div>
    </>
  );
}
