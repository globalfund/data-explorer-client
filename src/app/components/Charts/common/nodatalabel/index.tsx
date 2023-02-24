import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { appColors } from "app/theme";

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
        color: ${appColors.COMMON.PRIMARY_COLOR_1};
        font-size: 12px;
        font-weight: 500;
        position: absolute;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        ${props.height ? "top: 0;" : ""}
        height: ${props.height ? props.height : "50%"};

        a {
          color: ${appColors.COMMON.PRIMARY_COLOR_1};
        }

        > div {
          padding: 10px;
          border-radius: 4px;
          background: ${appColors.COMMON.SECONDARY_COLOR_7};

          > div {
            background: ${appColors.COMMON.SECONDARY_COLOR_7} !important;
          }
        }
      `}
    >
      <div>
        <div>{get(cmsData, "componentsChartsCommon.noData", "")}</div>
        <div>
          {get(cmsData, "componentsChartsCommon.moreInfo", "")}{" "}
          <Link to="/faq">
            {get(cmsData, "componentsChartsCommon.moreInfoLink", "")}
          </Link>
        </div>
      </div>
    </div>
  );
}
