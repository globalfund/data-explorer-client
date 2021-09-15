import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export function BudgetsTimeCycleTooltip(props: Record<string, unknown>) {
  const valueKeys = filter(
    Object.keys(props),
    (key: string) =>
      key !== "year" && key.indexOf("Color") === -1 && key !== "amount"
  );

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
        Budgets · {props.year}
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
          <div css="font-weight: bold;">Total amount</div>
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
            <div css="font-weight: bold;">{key}</div>
            <div>{formatFinancialValue(get(props, key, 0) as number)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
