import React from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { AllocationsRadialMobileTooltipProps } from "app/modules/viz-module/sub-modules/allocations/data";

export function AllocationsRadialMobileTooltip(
  props: AllocationsRadialMobileTooltipProps
) {
  return (
    <div
      css={`
        padding: 25px;
        color: #231d2c;
        background: #fff;
        border-radius: 20px;
        box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);
      `}
    >
      <div
        css={`
            display: flex;
            flex-direction: row;
            justify-content flex-end;

            path {
              fill: #2E4063;
            }
          `}
      >
        <IconButton
          onTouchStart={props.close}
          css={`
            padding: 0;
          `}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div
        css={`
          gap: 5px;
          display: flex;
          font-size: 12px;
          flex-direction: row;
          padding-bottom: 16px;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid #dfe3e6;

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 5px;
              }
            }
          }
        `}
      >
        <b>{props.label}</b>
        <div css="white-space: nowrap;">
          {formatFinancialValue(props.value)}
        </div>
      </div>
      <Button
        onTouchStart={props.drilldown}
        css={`
          width: 100%;
          margin-top: 20px;
          background: #dfe3e6;
          border-radius: 22px;

          &:hover {
            background: #dfe3e6;
          }

          > span {
            color: #231d2c;
            font-size: 14px;
            font-weight: bold;
            text-transform: none;
            font-family: "Inter", "Helvetica Neue", sans-serif;
          }
        `}
      >
        Drill down
      </Button>
    </div>
  );
}
