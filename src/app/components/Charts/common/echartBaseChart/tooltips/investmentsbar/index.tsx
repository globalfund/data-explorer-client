import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import orderBy from "lodash/orderBy";
import { appColors } from "app/theme";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export function EchartsInvestmentsBarTooltip(props: {
  data: any;
  year: any;
  cmsData: any;
  isCumulative: boolean;
}) {
  const { data, year, cmsData, isCumulative } = props;

  return (
    <div
      css={`
        color: ${appColors.TIME_CYCLE.MOBILE_TOOLTIP_COLOR};
        min-width: 260px;
        position: relative;
        background: ${appColors.TIME_CYCLE.TOOLTIP_BACKGROUND_COLOR};
        border-radius: 20px;
      `}
    >
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
          line-height: 20px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {isCumulative
          ? "Cumulative"
          : get(cmsData, "componentsChartsInvestments.disbursed", "")}{" "}
        {year}
      </div>
      <div css="width: 100%;height: 12px;" />
      <div
        css={`
          display: flex;
          font-size: 12px;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <div
            css={`
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            {get(cmsData, "componentsChartsInvestments.totalAmount", "")}
          </div>
        </div>
        <div>{formatFinancialValue(sumBy(data, "value"))}</div>
      </div>
      <hr
        css={`
          width: 100%;
          margin: 10px 0;
          background: ${appColors.TIME_CYCLE.TOOLTIP_BORDER_COLOR};
        `}
      />
      <div
        css={`
          gap: 6px;
          display: flex;
          font-size: 12px;
          flex-direction: column;

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 6px;
              }
            }
          }
        `}
      >
        {orderBy(data, "value", "desc").map((item: any) => (
          <div
            key={item.name}
            css={`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            `}
          >
            <div
              css={`
                display: flex;
                align-items: center;
              `}
            >
              <div
                css={`
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  margin-right: 12px;
                  background: ${item.color};
                `}
              />
              <div
                css={`
                  font-weight: bold;
                  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
                `}
              >
                {item.name}
              </div>
            </div>
            <div>{formatFinancialValue(item.value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
