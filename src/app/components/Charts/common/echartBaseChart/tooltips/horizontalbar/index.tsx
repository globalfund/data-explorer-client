import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import orderBy from "lodash/orderBy";
import { appColors } from "app/theme";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export function EchartsHorizontalBarTooltip(props: {
  data: any;
  cmsData: any;
}) {
  const { data, cmsData } = props;

  const valueKeys = filter(
    Object.keys(data),
    (key: string) =>
      key !== "year" && key.indexOf("Color") === -1 && key !== "amount"
  );

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
        {get(cmsData, "componentsChartsBudgets.timeCycleTooltipBudgets", "")}{" "}
        {data.year}
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
            Total amount
          </div>
        </div>
        <div>{formatFinancialValue(data.amount as number)}</div>
      </div>
      <hr
        css={`
          width: 100%;
          margin: 10px 0;
          background: #dfe3e5;
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
        {orderBy(valueKeys, (key) => data[key], "desc").map((key: string) => (
          <div
            key={key}
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
                  background: ${get(data, `${key}Color`, "#000")};
                `}
              />
              <div
                css={`
                  font-weight: bold;
                  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
                `}
              >
                {key}
              </div>
            </div>
            <div>{formatFinancialValue(get(data, key, 0) as number)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
