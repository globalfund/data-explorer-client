import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { css } from "styled-components/macro";
import { useCMSData } from "app/hooks/useCMSData";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

interface Props {
  name: number;
  title: string;
  value: number;
  number: number;
  status: string;
  years: number[];
  component: string;
  rating: string | null;
}

const rowcss = css`
  display: flex;
  font-size: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > div:first-of-type {
    font-weight: bold;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  }
`;

export function GrantsRadialTooltip(props: Props) {
  const cmsData = useCMSData({ returnData: true });

  return (
    <React.Fragment>
      <div
        css={`
          color: ${appColors.COMMON.PRIMARY_COLOR_1};
          font-size: 18px;
          font-weight: bold;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {props.title}
      </div>
      <hr
        css={`
          margin: 15px 0;
          border-radius: 20px;
          border: 1px solid ${appColors.GRANTS.TOOLTIP_BORDER_COLOR};
        `}
      />
      <div css={rowcss}>
        <div>{get(cmsData, "componentsChartsGrants.tooltipNumber", "")}</div>
        <div>{props.number}</div>
      </div>
      <div css={rowcss}>
        <div>{get(cmsData, "componentsChartsGrants.tooltipPeriod", "")}</div>
        <div>
          {get(props.years, "[0]", "")} - {get(props.years, "[1]", "")}
        </div>
      </div>
      <div css={rowcss}>
        <div>
          {get(cmsData, "componentsChartsGrants.tooltipDisbursements", "")}
        </div>
        <div>{formatFinancialValue(props.value)}</div>
      </div>
      <div css={rowcss}>
        <div>{get(cmsData, "componentsChartsGrants.tooltipComponent", "")}</div>
        <div>{props.component}</div>
      </div>
      <div css={rowcss}>
        <div>{get(cmsData, "componentsChartsGrants.tooltipStatus", "")}</div>
        <div>{props.status}</div>
      </div>
      <div css={rowcss}>
        <div>{get(cmsData, "componentsChartsGrants.tooltipRating", "")}</div>
        <div>
          {props.rating ||
            get(cmsData, "componentsChartsGrants.tooltipRatingDefault", "")}
        </div>
      </div>
    </React.Fragment>
  );
}
