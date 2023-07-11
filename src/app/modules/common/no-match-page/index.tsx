import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { appColors } from "app/theme";

// cc:refactor this component, inline css need to be moved to proper styled components

export const NoMatchPage = () => {
  const isLoading = document.getElementById("general-loader");
  const cmsData = useCMSData({ returnData: true });

  return (
    <div
      css={`
        position: relative;
        width: 100%;
        height: 100%;
        padding: 50px;
        display: ${isLoading ? "none" : "flex"};
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}
    >
      <div
        css={`
          font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
          font-size: 14px;
          font-weight: 500;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.71;
          letter-spacing: 0.1px;
          color: ${appColors.COMMON.SECONDARY_COLOR_19};
        `}
      >
        <div>{get(cmsData, "modulesCommon.noMatchOops", "")}</div>
      </div>
      <div
        css={`
          font-size: 120px;
          font-weight: bold;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: 2.15px;
          color: ${appColors.COMMON.SECONDARY_COLOR_19};
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        <div>{get(cmsData, "modulesCommon.noMatch404", "")}</div>
      </div>
      <div
        css={`
          font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
          font-size: 14px;
          font-weight: 600;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.71;
          letter-spacing: 1.25px;
          text-align: center;
          color: ${appColors.COMMON.SECONDARY_COLOR_19};
          margin-bottom: 50px;
        `}
      >
        <div>{get(cmsData, "modulesCommon.noMatchSorry", "")}</div>
      </div>
      <Link
        to="/"
        css={`
          text-decoration: none;
        `}
      >
        <div
          css={`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 204px;
            height: 46px;
            background: ${appColors.COMMON.PRIMARY_COLOR_1};
            border-radius: 20px;
          `}
        >
          <span
            css={`
              font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif;
              font-size: 14px;
              font-weight: 500;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.5;
              letter-spacing: 0.15px;
              color: white;
            `}
          >
            <div>{get(cmsData, "modulesCommon.noMatchBack", "")}</div>
          </span>
        </div>
      </Link>
    </div>
  );
};
