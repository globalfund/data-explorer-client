import React from "react";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { appColors } from "app/theme";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { useCMSData } from "app/hooks/useCMSData";
import IconButton from "@material-ui/core/IconButton";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import {
  BudgetsFlowTooltipProps,
  MobileBudgetsFlowTooltipProps,
} from "app/components/Charts/Budgets/Flow/data";

export function BudgetsFlowTooltip(props: BudgetsFlowTooltipProps) {
  return (
    <div
      css={`
        color: ${appColors.BUDGETS_FLOW.TOOLTIP_COLOR};
        background: ${appColors.BUDGETS_FLOW.TOOLTIP_BACKGROUND_COLOR};
        border-radius: 20px;
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

export function MobileBudgetsFlowTooltip(props: MobileBudgetsFlowTooltipProps) {
  const cmsData = useCMSData({ returnData: true });
  return (
    <div
      css={`
        padding: 25px;
        color: ${appColors.BUDGETS_FLOW.MOBILE_TOOLTIP_COLOR};
        background: ${appColors.BUDGETS_FLOW.MOBILE_TOOLTIP_BACKGROUND_COLOR};
        border-radius: 20px;
        box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);
        z-index: 2500;
      `}
    >
      {props.onClose && (
        <div
          css={`
            display: flex;
            flex-direction: row;
            justify-content flex-end;

            path {
              fill: ${appColors.BUDGETS_FLOW.MOBILE_TOOLTIP_CLOSE_ICON_COLOR};
            }
          `}
        >
          <IconButton
            onTouchStart={() => {
              if (props.onClose) {
                props.onClose();
              }
            }}
            css={`
              padding: 0;
            `}
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
      <div
        css={`
          gap: 5px;
          display: flex;
          font-size: 12px;
          flex-direction: row;
          padding-bottom: 16px;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid ${appColors.COMMON.SECONDARY_COLOR_7};

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 5px;
              }
            }
          }
        `}
      >
        <b>{props.id}</b>
        <div css="white-space: nowrap;">
          {formatFinancialValue(props.value)}
        </div>
      </div>
      <div
        css={`
          gap: 10px;
          display: flex;
          font-size: 12px;
          padding: 16px 0;
          flex-direction: column;
          border-bottom: 1px solid ${appColors.COMMON.SECONDARY_COLOR_7};

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
                width: 40%;
                text-align: start;
              }

              &:nth-of-type(2) {
                width: 20%;
                text-align: right;
              }

              &:nth-of-type(3) {
                width: 40%;
                text-align: right;
              }
            }
          `}
        >
          <div>
            {get(cmsData, "componentsChartsBudgets.flowTooltipComponent", "")}
          </div>
          <div>{get(cmsData, "componentsChartsInvestments.grants", "")}</div>
          <div>{get(cmsData, "componentsChartsBudgets.budget", "")}</div>
        </div>
        {orderBy(props.components, "value", "desc").map((stat: any) => (
          <div
            key={stat.id}
            css={`
              width: 100%;
              display: flex;
              font-size: 12px;
              flex-direction: row;
              justify-content: space-between;

              > div {
                &:nth-of-type(1) {
                  width: 40%;
                  text-align: start;
                }

                &:nth-of-type(2) {
                  width: 20%;
                  text-align: right;
                }

                &:nth-of-type(3) {
                  width: 40%;
                  text-align: right;
                }
              }
            `}
          >
            <div>{stat.id}</div>
            <div>{stat.count}</div>
            <div>{formatFinancialValue(stat.value)}</div>
          </div>
        ))}
      </div>
      {props.drilldown && (
        <Button
          onClick={() => {
            if (props.drilldown) {
              props.drilldown(props.id, props.filterStr);
            }
          }}
          css={`
            width: 100%;
            margin-top: 20px;
            border-radius: 22px;
            background: ${appColors.BUDGETS_FLOW
              .MOBILE_TOOLTIP_DRILLDOWN_BACKGROUND_COLOR};

            &:hover {
              background: ${appColors.BUDGETS_FLOW
                .MOBILE_TOOLTIP_DRILLDOWN_BACKGROUND_HOVER_COLOR};
            }

            > span > div {
              font-size: 14px;
              font-weight: bold;
              text-transform: none;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              color: ${appColors.BUDGETS_FLOW.MOBILE_TOOLTIP_DRILLDOWN_COLOR};
            }
          `}
        >
          <div>
            {get(cmsData, "componentsChartsBudgets.flowTooltipDrilldown", "")}
          </div>
        </Button>
      )}
    </div>
  );
}
