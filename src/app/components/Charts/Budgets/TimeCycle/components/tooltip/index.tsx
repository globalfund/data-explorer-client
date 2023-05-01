import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useCMSData } from "app/hooks/useCMSData";

export function BudgetsTimeCycleTooltip(props: Record<string, unknown>) {
  const valueKeys = filter(
    Object.keys(props),
    (key: string) =>
      key !== "year" && key.indexOf("Color") === -1 && key !== "amount"
  );
  const cmsData = useCMSData({ returnData: true });

  return (
    <div
      css={`
        color: #231d2c;
        min-width: 260px;
        padding: 16px 25px;
        position: relative;
        background: #f4f4f4;
        border-radius: 20px;
      `}
    >
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
          line-height: 20px;
          margin-bottom: 20px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {get(cmsData, "componentsChartsBudgets.timeCycleTooltipBudgets", "")}{" "}
        {props.year}
      </div>
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
        <div
          css={`
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
            Total amount
          </div>
          <div>{formatFinancialValue(props.amount as number)}</div>
        </div>
        {valueKeys.map((key: string) => (
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
                font-weight: bold;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
            >
              {key}
            </div>
            <div>{formatFinancialValue(get(props, key, 0) as number)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
