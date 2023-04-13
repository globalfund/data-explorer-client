import React from "react";
import sumBy from "lodash/sumBy";
import orderBy from "lodash/orderBy";
import { appColors } from "app/theme";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

interface EchartsSankeyLinkTooltipProps {
  value: number;
  source: string;
  target: string;
}

export function EchartsSankeyLinkTooltip(props: EchartsSankeyLinkTooltipProps) {
  return (
    <div
      css={`
        border-radius: 20px;
        color: ${appColors.BUDGETS_FLOW.TOOLTIP_COLOR};
        background: ${appColors.BUDGETS_FLOW.TOOLTIP_BACKGROUND_COLOR};
      `}
    >
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
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

interface EchartsSankeyNodeTooltipProps {
  id: string;
  components: {
    id: string;
    value: number;
    color: string;
  }[];
}

export function EchartsSankeyNodeTooltip(props: EchartsSankeyNodeTooltipProps) {
  const value = sumBy(props.components, "value");

  return (
    <div
      css={`
        min-width: 270px;
        border-radius: 20px;
        color: ${appColors.BUDGETS_FLOW.TOOLTIP_COLOR};
        background: ${appColors.BUDGETS_FLOW.TOOLTIP_BACKGROUND_COLOR};
      `}
    >
      <div
        css={`
          font-size: 18px;
          font-weight: bold;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {props.id}
      </div>
      <div css="width: 100%;height: 15px;" />
      <div
        css={`
          display: flex;
          padding: 4px 0;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <div
            css={`
              font-size: 12px;
            `}
          >
            Total amount
          </div>
        </div>
        <div>{formatFinancialValue(value)}</div>
      </div>
      <hr
        css={`
          width: 100%;
          margin: 15px 0;
          background: #dfe3e5;
        `}
      />
      <div>
        {orderBy(props.components, "value", "desc").map((component) => (
          <div
            key={component.id}
            css={`
              display: flex;
              padding: 4px 0;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <div
              css={`
                display: flex;
                align-items: center;
              `}
            >
              <div
                css={`
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  margin-right: 12px;
                  background: ${component.color};
                `}
              />
              <div
                css={`
                  font-size: 12px;
                `}
              >
                {component.id}
              </div>
            </div>
            <div>{formatFinancialValue(component.value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
