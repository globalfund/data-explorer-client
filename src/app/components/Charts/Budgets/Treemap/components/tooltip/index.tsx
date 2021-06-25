import React from "react";
import { TreemapTooltipProps } from "app/components/Charts/Investments/Disbursements/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export function TreemapTooltip(props: TreemapTooltipProps) {
  const data = props.node.data;

  return (
    <div
      css={`
        color: #262c34;
        min-width: 350px;
        background: #f5f5f7;
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
          line-height: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #dfe3e6;
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
          border-bottom: 1px solid #dfe3e6;
        `}
      >
        <div
          css={`
            width: 100%;
            display: flex;
            font-weight: bold;
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
          <div>Component</div>
          <div>Budget</div>
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
