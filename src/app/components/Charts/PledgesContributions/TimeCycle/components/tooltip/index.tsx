import React from "react";
import get from "lodash/get";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export function PledgesContributionsTimeCycleTooltip(props: any) {
  return (
    <div
      css={`
        color: #262c34;
        min-width: 250px;
        padding: 16px 25px;
        position: relative;
        background: #f5f5f7;
        border-radius: 20px;
      `}
    >
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
          line-height: 20px;
          margin-bottom: 20px;
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
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div css="font-weight: bold;text-transform: capitalize;">
            {props.id}
          </div>
          <div>{formatFinancialValue(props.value as number)}</div>
        </div>
      </div>
    </div>
  );
}
