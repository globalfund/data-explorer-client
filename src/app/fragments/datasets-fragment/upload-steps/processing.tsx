import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { ReactComponent as ProcessingIcon } from "../assets/spin.svg";
import { ReactComponent as ErrorICon } from "../assets/error-icon.svg";

interface Props {
  setProcessingError: React.Dispatch<React.SetStateAction<boolean>>;
  processingError: boolean;
}
export default function Processing(props: Props) {
  return (
    <>
      {props.processingError ? (
        <div
          css={`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #e75656;
            margin-top: 13rem;
          `}
        >
          <ErrorICon />
          <div
            css={`
              height: 1.2rem;
            `}
          />
          <p
            css={`
              font-size: 18px;
              text-align: center;
            `}
          >
            <b>
              Data could not be processed, please try again <br /> or contact
              your administrator
            </b>
          </p>

          <p
            css={`
              margin-top: -10px;
            `}
          >
            Error{" "}
          </p>
        </div>
      ) : (
        <div
          css={`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
          `}
        >
          <ProcessingIcon
            css={`
              animation: spin 3s linear infinite;
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}
          />
          <div>
            <p
              css={`
                font-size: 18px;
                color: #98a1aa;
                text-align: center;
              `}
            >
              <b>Data is being processed</b>{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
