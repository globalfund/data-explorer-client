import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { useLocation } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { TreemapTooltipProps } from "app/components/Charts/Investments/Disbursements/data";

export function TreemapTooltip(props: TreemapTooltipProps) {
  const { data } = props.node;
  const { pathname } = useLocation();
  const cmsData = useCMSData({ returnData: true });

  let type = "Disbursements";

  if (pathname.indexOf("signed") > -1) {
    type = "Signed";
  } else if (pathname.indexOf("commitment") > -1) {
    type = "Commitment";
  }

  return (
    <div
      css={`
        color: ${appColors.TREEMAP.TOOLTIP_COLOR};
        min-width: 350px;
        max-width: 350px;
        background: ${appColors.TREEMAP.TOOLTIP_BACKGROUND_COLOR};

        @media (max-width: 767px) {
          min-width: 0;
        }
      `}
    >
      <div
        css={`
          width: 100%;
          font-size: 18px;
          font-weight: bold;
          line-height: 20px;
          padding-bottom: 16px;
          text-overflow: break-word;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          border-bottom: 1px solid ${appColors.TREEMAP.TOOLTIP_BORDER_COLOR};
        `}
      >
        {data.tooltip.header}
      </div>
      <div
        css={`
          gap: 10px;
          display: flex;
          font-size: 12px;
          padding: 16px 0;
          flex-direction: column;
          border-bottom: 1px solid ${appColors.TREEMAP.TOOLTIP_BORDER_COLOR};

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

              &:nth-of-type(3) {
                width: 50%;
                text-align: right;
              }
            }
          `}
        >
          <div>{get(cmsData, "componentsChartsInvestments.component", "")}</div>
          <div>{get(cmsData, "componentsChartsInvestments.grants", "")}</div>
          <div>{type}</div>
        </div>
        {data.tooltip.componentsStats.map((stat: any) => (
          <div
            key={stat.name}
            css={`
              width: 100%;
              display: flex;
              font-size: 12px;
              flex-direction: row;
              justify-content: space-between;

              > div {
                &:nth-of-type(1) {
                  width: 30%;
                  text-align: start;
                }

                &:nth-of-type(2) {
                  width: 20%;
                  text-align: right;
                }

                &:nth-of-type(3) {
                  width: 50%;
                  text-align: right;
                }
              }
            `}
          >
            <div>{stat.name}</div>
            <div>{stat.count}</div>
            <div>{formatFinancialValue(stat.investment)}</div>
          </div>
        ))}
      </div>
      <div
        css={`
          gap: 10px;
          display: flex;
          font-size: 12px;
          padding-top: 16px;
          flex-direction: column;

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
          `}
        >
          <div
            css={`
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            {get(cmsData, "componentsChartsInvestments.disbursed", "")}
          </div>
          <div>
            {formatFinancialValue(data.tooltip.totalInvestments.disbursed)}
          </div>
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
              width: ${data.tooltip.percValue}%;
              background: ${appColors.TREEMAP.TOOLTIP_PROGRESS_BAR_COLOR};
            `}
          />
        </div>
        <div
          css={`
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div
            css={`
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            {get(cmsData, "componentsChartsInvestments.committed", "")}
          </div>
          <div>
            {formatFinancialValue(data.tooltip.totalInvestments.committed)}
          </div>
        </div>
        <div
          css={`
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div
            css={`
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            {get(cmsData, "componentsChartsInvestments.signed", "")}
          </div>
          <div>
            {formatFinancialValue(data.tooltip.totalInvestments.signed)}
          </div>
        </div>
      </div>
    </div>
  );
}
