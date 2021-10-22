import React from "react";
import { Link } from "react-router-dom";

interface Props {
  height?: string;
}

export function NoDataLabel(props: Props) {
  return (
    <div
      css={`
        top: 0;
        left: 0;
        width: 100%;
        height: ${props.height ? props.height : "100%"};
        display: flex;
        color: #262c34;
        font-size: 12px;
        font-weight: 500;
        position: absolute;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        a {
          color: #262c34;
        }

        > div {
          padding: 10px;
          border-radius: 4px;
          background: #dfe3e6;

          > div {
            background: #dfe3e6 !important;
          }
        }
      `}
    >
      <div>
        <div>No data reported by The Global Fund</div>
        <div>
          For more information please visit: <Link to="/faq">FAQ</Link>
        </div>
      </div>
    </div>
  );
}
