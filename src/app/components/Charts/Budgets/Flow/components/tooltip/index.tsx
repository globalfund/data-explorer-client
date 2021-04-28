import React from "react";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { BudgetsFlowTooltipProps } from "app/components/Charts/Budgets/Flow/data";

export function BudgetsFlowTooltip(props: BudgetsFlowTooltipProps) {
  return (
    <div
      css={`
        color: #262c34;
        background: #f5f5f7;
        border-radius: 20px;
      `}
    >
      <div
        css={`
          top: -4px;
          width: 8px;
          height: 8px;
          position: absolute;
          border-radius: 50%;
          background: #262c34;
          left: calc(50% - 4px);
        `}
      />
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
        `}
      >
        {formatFinancialValue(props.value)}
      </div>
      <div css="width: 100%;height: 15px;" />
      <div
        css={`
          font-size: 12px;
        `}
      >
        {props.source}
        <br />
        <span css="padding-left: 5px;">
          <span css="margin-right: 5px;">{`>`}</span>
          {props.target}
        </span>
      </div>
    </div>
  );
}
