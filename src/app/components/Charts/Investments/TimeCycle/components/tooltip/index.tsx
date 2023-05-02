import React from "react";
import get from "lodash/get";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useCMSData } from "app/hooks/useCMSData";

export function InvestmentsTimeCycleTooltip(props: any) {
  const cmsData = useCMSData({ returnData: true });

  return (
    <div
      css={`
        color: #231d2c;
        min-width: 250px;
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
        Year {props.indexValue}
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
            {get(cmsData, "componentsChartsInvestments.totalAmount", "")}
          </div>
          <div>{formatFinancialValue(props.value as number)}</div>
        </div>
        {get(props.data, `${props.id}Children`, []).map((child: any) => (
          <div
            key={child.name}
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
              {child.name}
            </div>
            <div>{formatFinancialValue(get(child, "value", 0) as number)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
