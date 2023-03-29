import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { useCMSData } from "app/hooks/useCMSData";
import { TreemapTooltipProps } from "app/components/Charts/Investments/Disbursements/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export function TreemapTooltip(props: TreemapTooltipProps) {
  const { data } = props.node;
  const cmsData = useCMSData({ returnData: true });

  return (
    <div
      css={`
        min-width: 350px;
        color: ${appColors.TREEMAP.TOOLTIP_COLOR};
        background: ${appColors.TREEMAP.TOOLTIP_BACKGROUND_COLOR};

        @media (max-width: 767px) {
          min-width: 0px;
        }
      `}
    >
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
          line-height: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid ${appColors.TREEMAP.TOOLTIP_BORDER_COLOR};
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
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
            font-weight: bold;
            flex-direction: row;
            justify-content: space-between;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

            > div {
              &:nth-of-type(1) {
                width: 50%;
                text-align: start;
              }

              &:nth-of-type(2) {
                width: 50%;
                text-align: right;
              }
            }
          `}
        >
          <div>
            {props.tooltipKeyLabel ||
              get(
                cmsData,
                "componentsChartsBudgets.treemapTooltipDefaultKeyLabel",
                ""
              )}
          </div>
          <div>{props.tooltipValueLabel}</div>
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
                  width: 50%;
                  text-align: start;
                }

                &:nth-of-type(2) {
                  width: 50%;
                  text-align: right;
                }
              }
            `}
          >
            <div>{stat.name}</div>
            <div>{formatFinancialValue(stat.value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
