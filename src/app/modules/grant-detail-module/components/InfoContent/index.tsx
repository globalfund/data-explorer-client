import React from "react";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import { LocationIcon } from "app/assets/icons/Location";
import { ComponentIcon } from "app/assets/icons/Component";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { ratingValues } from "app/components/Charts/PerformanceRating/data";

interface GrantInfoContentProps {
  title: string;
  code: string;
  rating: string | null;
  status: string;
  location: string;
  component: string;
  description: string | null;
  investments: {
    disbursed: number;
    committed: number;
    signed: number;
  };
  manager: {
    name: string;
    email: string;
  };
  periods: GrantDetailPeriod[];
}

export interface GrantDetailPeriod {
  number: number;
  startDate: string;
  endDate: string;
}

export interface GrantDetailPeriodInformation {
  disbursed: number;
  committed: number;
  signed: number;
  rating: string;
}

export function GrantInfoContent(props: GrantInfoContentProps) {
  const cmsData = useCMSData({ returnData: true });

  return (
    <div
      css={`
        display: flex;
        overflow-y: auto;
        padding: 30px 50px;
        flex-direction: column;

        &::-webkit-scrollbar {
          width: 5px;
          background: #231d2c;
        }
        &::-webkit-scrollbar-track {
          background: #dfe3e6;
        }
        &::-webkit-scrollbar-thumb {
          background: #231d2c;
        }

        * {
          color: #231d2c;
        }
      `}
    >
      <div
        css={`
          font-size: 12px;
          margin-bottom: 20px;
        `}
      >
        {get(cmsData, "modulesGrantDetail.grantStatus", "")} {props.status}
      </div>
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 20px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {props.title}
      </div>
      <div
        css={`
          gap: 6px;
          display: flex;
          font-size: 12px;
          margin-bottom: 10px;
          flex-direction: row;
          align-items: center;

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 6px;
              }
            }
          }
        `}
      >
        <LocationIcon />
        <div>
          {get(cmsData, "modulesGrantDetail.location", "")}{" "}
          <b>{props.location}</b>
        </div>
      </div>
      <div
        css={`
          gap: 6px;
          display: flex;
          font-size: 12px;
          margin-bottom: 20px;
          flex-direction: row;
          align-items: center;

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 6px;
              }
            }
          }
        `}
      >
        <ComponentIcon />
        <div>
          {get(cmsData, "modulesGrantDetail.component", "")}{" "}
          <b>{props.component}</b>
        </div>
      </div>
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {get(cmsData, "modulesGrantDetail.rating", "")}
      </div>
      <div
        css={`
          gap: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 20px;

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 12px;
              }
            }
          }
        `}
      >
        {ratingValues.map((value: string) => (
          <div
            key={value}
            css={`
              width: 30px;
              height: 30px;
              display: flex;
              font-size: 12px;
              border-radius: 50%;
              align-items: center;
              justify-content: center;
              border: 2px solid #231d2c;
              opacity: ${(props.rating || ratingValues[0]) === value ? 1 : 0.3};
            `}
          >
            {value}
          </div>
        ))}
      </div>
      <div
        css={`
          font-size: 12px;
          margin-bottom: 20px;
        `}
      >
        {props.description}
      </div>
      <div
        css={`
          font-size: 12px;
        `}
      >
        <b>{get(cmsData, "modulesGrantDetail.disbursed", "")} </b>
        {formatFinancialValue(props.investments.disbursed)}
      </div>
      <div
        css={`
          font-size: 12px;
        `}
      >
        <b>{get(cmsData, "modulesGrantDetail.committed", "")} </b>
        {formatFinancialValue(props.investments.committed)}
      </div>
      <div
        css={`
          font-size: 12px;
          margin-bottom: 40px;
        `}
      >
        <b>{get(cmsData, "modulesGrantDetail.signed", "")} </b>
        {formatFinancialValue(props.investments.signed)}
      </div>
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {get(cmsData, "modulesGrantDetail.fundManager", "")}
      </div>
      <div
        css={`
          font-size: 12px;
        `}
      >
        {props.manager.name}
      </div>
      <a href={`mailto:${props.manager.email}`}>
        <img alt="" src="/static/fundportfoliomanager.png" />
      </a>
    </div>
  );
}
