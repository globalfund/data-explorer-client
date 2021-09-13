import React from "react";
import get from "lodash/get";
import { css } from "styled-components/macro";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

interface Props {
  name: number;
  title: string;
  value: number;
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
`;

export function GrantsRadialTooltip(props: Props) {
  return (
    <React.Fragment>
      <div
        css={`
          color: #262c34;
          font-size: 18px;
          font-weight: bold;
        `}
      >
        {props.title}
      </div>
      <hr
        css={`
          margin: 15px 0;
          border-radius: 20px;
          border: 1px solid #dfe3e6;
        `}
      />
      <div css={rowcss}>
        <div>
          <b>Period</b>
        </div>
        <div>
          {get(props.years, "[0]", "")} - {get(props.years, "[1]", "")}
        </div>
      </div>
      <div css={rowcss}>
        <div>
          <b>Disbursements</b>
        </div>
        <div>{formatFinancialValue(props.value)}</div>
      </div>
      <div css={rowcss}>
        <div>
          <b>Component</b>
        </div>
        <div>{props.component}</div>
      </div>
      <div css={rowcss}>
        <div>
          <b>Status</b>
        </div>
        <div>{props.status}</div>
      </div>
      <div css={rowcss}>
        <div>
          <b>Latest Rating</b>
        </div>
        <div>{props.rating || "N/A"}</div>
      </div>
    </React.Fragment>
  );
}
