import React from "react";
import { useLocation } from "react-router-dom";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { TreemapTooltipProps } from "app/components/Charts/Investments/Disbursements/data";

export function TreemapTooltip(props: TreemapTooltipProps) {
  const { data } = props.node;
  const { pathname } = useLocation();

  let type = "Disbursements";

  if (pathname.indexOf("signed") > -1) {
    type = "Signed";
  } else if (pathname.indexOf("commitment") > -1) {
    type = "Commitment";
  }

  return (
    <div
      css={`
        color: #262c34;
        min-width: 350px;
        background: #f5f5f7;

        @media (max-width: 767px) {
          min-width: 0;
        }
      `}
    >
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
          line-height: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #dfe3e6;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
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

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 10px;
              }
            }
          }
        `}
      >
        <div
          css={`
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            > div {
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

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
          <div>{type}</div>
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
            <div>{stat.count}</div>
            <div>{formatFinancialValue(stat.investment)}</div>
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

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 10px;
              }
            }
          }
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
          <div
            css={`
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            Disbursed
          </div>
          <div>
            {formatFinancialValue(data.tooltip.totalInvestments.disbursed)}
          </div>
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
              width: ${data.tooltip.percValue}%;
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
          <div
            css={`
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            `}
          >
            Committed
          </div>
          <div>
            {formatFinancialValue(data.tooltip.totalInvestments.committed)}
          </div>
        </div>
        <div
          css={`
            width: 100%;
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
            Signed
          </div>
          <div>
            {formatFinancialValue(data.tooltip.totalInvestments.signed)}
          </div>
        </div>
      </div>
    </div>
  );
}
