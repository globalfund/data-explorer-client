import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

interface Props {
  height?: string;
}

export function NoDataLabel(props: Props) {
  const cmsData = useCMSData({ returnData: true });

  return (
    <div
      css={`
        left: 0;
        width: 100%;
        display: flex;
        color: #262c34;
        font-size: 12px;
        font-weight: 500;
        position: absolute;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        ${props.height ? "top: 0;" : ""}
        height: ${props.height ? props.height : "50%"};

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
        <div>{get(cmsData, "componentsChartsCommon.noData", "")}</div>
        <div>
        {get(cmsData, "componentsChartsCommon.moreInfo", "")} <Link to="/faq">{get(cmsData, "componentsChartsCommon.moreInfoLink", "")}</Link>
        </div>
      </div>
    </div>
  );
}
