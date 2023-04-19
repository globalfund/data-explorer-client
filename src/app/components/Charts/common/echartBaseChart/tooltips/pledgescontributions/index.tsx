import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export function EchartsPledgesContributionsTooltip(props: {
  data: any;
  cmsData: any;
}) {
  const { data, cmsData } = props;

  return (
    <div
      css={`
        color: ${appColors.ALLOCATIONS.POLAR_BAR_TOOLTIP_COLOR};
        min-width: 350px;
        background: ${appColors.ALLOCATIONS.POLAR_BAR_TOOLTIP_BACKGROUND_COLOR};

        @media (max-width: 767px) {
          max-width: calc(100vw - 40px - 30px);
          min-width: calc(100vw - 40px - 30px);
        }
      `}
    >
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
          line-height: 20px;
          padding-bottom: 16px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          border-bottom: 1px solid
            ${appColors.ALLOCATIONS.POLAR_BAR_TOOLTIP_BORDER_COLOR};
        `}
      >
        {data.year}
      </div>
      <div
        css={`
          gap: 10px;
          display: flex;
          font-size: 12px;
          padding: 16px 0;
          flex-direction: column;
          border-bottom: 1px solid
            ${appColors.ALLOCATIONS.POLAR_BAR_TOOLTIP_BORDER_COLOR};

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 10px;
              }
            }
          }
        `}
      >
        <div
          css={`
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            > div {
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

              &:nth-of-type(1) {
                width: 30%;
                text-align: start;
              }

              &:nth-of-type(2) {
                width: 20%;
                text-align: right;
              }

              &:nth-of-type(2) {
                width: 70%;
                text-align: right;
              }
            }
          `}
        >
          <div>{get(cmsData, "componentsChartsInvestments.component", "")}</div>
          <div>Amount</div>
        </div>
        <div
          css={`
            width: 100%;
            display: flex;
            font-size: 12px;
            line-height: 12px;
            flex-direction: row;
            justify-content: space-between;

            > div {
              &:nth-of-type(1) {
                width: 30%;
                text-align: start;
              }

              &:nth-of-type(2) {
                width: 70%;
                text-align: right;
              }
            }
          `}
        >
          <div>Pledge</div>
          <div>{formatFinancialValue(data.pledge)}</div>
        </div>
        <div
          css={`
            width: 100%;
            display: flex;
            font-size: 12px;
            line-height: 12px;
            flex-direction: row;
            justify-content: space-between;

            > div {
              &:nth-of-type(1) {
                width: 30%;
                text-align: start;
              }

              &:nth-of-type(2) {
                width: 70%;
                text-align: right;
              }
            }
          `}
        >
          <div>Contribution</div>
          <div>{formatFinancialValue(data.contribution)}</div>
        </div>
      </div>
      <div
        css={`
          width: 100%;
          display: flex;
          padding: 12px 0;
          font-size: 12px;
          font-weight: bold;
          flex-direction: row;
          justify-content: space-between;
        `}
      >
        -- · {((data.contribution * 100) / data.pledge).toFixed(0)}%
      </div>
      <div
        css={`
          width: 100%;
          height: 5px;
          border-radius: 20px;
          background: ${appColors.TREEMAP
            .TOOLTIP_PROGRESS_BAR_BACKGROUND_COLOR};
        `}
      >
        <div
          css={`
            height: 5px;
            border-radius: 20px;
            width: ${(data.contribution * 100) / data.pledge}%;
            background: ${appColors.TREEMAP.TOOLTIP_PROGRESS_BAR_COLOR};
          `}
        />
      </div>
    </div>
  );
}
