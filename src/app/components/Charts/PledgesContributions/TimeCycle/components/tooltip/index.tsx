import React from "react";
import { appColors } from "app/theme";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export function PledgesContributionsTimeCycleTooltip(props: any) {
  return (
    <div
      css={`
        color: ${appColors.TIME_CYCLE.TOOLTIP_COLOR};
        min-width: 250px;
        padding: 16px 25px;
        position: relative;
        border-radius: 20px;
        background: #f5f5f7;
        box-shadow: 0px 0px 10px 0px rgba(152, 161, 170, 0.6);
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
