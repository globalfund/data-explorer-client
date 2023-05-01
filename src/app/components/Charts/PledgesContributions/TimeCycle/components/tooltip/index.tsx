import React from "react";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export function PledgesContributionsTimeCycleTooltip(props: any) {
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
        {props.indexValue}
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
              text-transform: capitalize;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            {props.id}
          </div>
          <div>{formatFinancialValue(props.value as number)}</div>
        </div>
      </div>
    </div>
  );
}
