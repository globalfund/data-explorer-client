import React from "react";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { GeomapTooltipProps } from "app/components/Charts/GeoMap/data";

export function GeomapTooltip(props: GeomapTooltipProps) {
  return (
    <div
      css={`
        color: #262c34;
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
        {props.name}
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
                width: 30%;
                text-align: start;
              }

              &:nth-of-type(2) {
                width: 20%;
                text-align: right;
              }

              &:nth-of-type(3) {
                width: 50%;
                text-align: right;
              }
            }
          `}
        >
          <div>Component</div>
          <div>Grants</div>
          <div>Disbursements</div>
        </div>
        {props.data.components.map((stat: any) => (
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
                  width: 30%;
                  text-align: start;
                }

                &:nth-of-type(2) {
                  width: 20%;
                  text-align: right;
                }

                &:nth-of-type(3) {
                  width: 50%;
                  text-align: right;
                }
              }
            `}
          >
            <div>{stat.name}</div>
            <div>{stat.activitiesCount}</div>
            <div>{formatFinancialValue(stat.value)}</div>
          </div>
        ))}
      </div>
      <div
        css={`
          gap: 10px;
          display: flex;
          font-size: 12px;
          padding-top: 16px;
          flex-direction: column;
        `}
      >
        <div
          css={`
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div>
            <b>Disbursed</b>
          </div>
          <div>{formatFinancialValue(props.data.disbursed)}</div>
        </div>
        <div
          css={`
            width: 100%;
            height: 5px;
            border-radius: 20px;
            background: #c7cdd1;
          `}
        >
          <div
            css={`
              height: 5px;
              border-radius: 20px;
              background: #373d43;
              width: ${(props.data.disbursed * 100) / props.data.committed}%;
            `}
          />
        </div>
        <div
          css={`
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div>
            <b>Committed</b>
          </div>
          <div>{formatFinancialValue(props.data.committed)}</div>
        </div>
        <div
          css={`
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <div>
            <b>Signed</b>
          </div>
          <div>{formatFinancialValue(props.data.signed)}</div>
        </div>
      </div>
    </div>
  );
}
