import React from "react";
import { Link } from "react-router-dom";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

interface LocationInfoContentProps {
  title: string;
  code: string;
  investments: {
    disbursed: number;
    committed: number;
    signed: number;
  };
  countries: {
    name: string;
    code: string;
  }[];
  multicountries: {
    name: string;
    code: string;
  }[];
  manager: {
    name: string;
    email: string;
  };
}

export function LocationInfoContent(props: LocationInfoContentProps) {
  const cmsData = useCMSData({ returnData: true });
  return (
    <div
      css={`
        display: flex;
        padding: 30px 50px;
        flex-direction: column;
        * {
          color: #262c34;
        }
      `}
    >
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
      {props.code.length === 3 && (
        <Link
          to={`/results?locations=${props.code}`}
          css={`
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 40px;
            text-decoration: none;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          {get(cmsData, "modulesCountryDetail.seeResultsStart", "")}{" "}
          {props.title}
          {get(cmsData, "modulesCountryDetail.seeResultsEnd", "")}
        </Link>
      )}
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 20px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {get(cmsData, "modulesCountryDetail.investments", "")}
      </div>
      <div
        css={`
          font-size: 12px;
        `}
      >
        <b>{get(cmsData, "modulesCountryDetail.disbursed", "")} </b>
        {formatFinancialValue(props.investments.disbursed)}
      </div>
      <div
        css={`
          font-size: 12px;
        `}
      >
        <b>{get(cmsData, "modulesCountryDetail.committed", "")} </b>
        {formatFinancialValue(props.investments.committed)}
      </div>
      <div
        css={`
          font-size: 12px;
          margin-bottom: 40px;
        `}
      >
        <b>{get(cmsData, "modulesCountryDetail.signed", "")} </b>
        {formatFinancialValue(props.investments.signed)}
      </div>
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 20px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {props.multicountries.length > 0 &&
          `Multicountries with ${props.title}`}
        {props.countries.length > 0 && `Countries in ${props.title}`}
      </div>
      <div
        css={`
          display: inline-block;
        `}
      >
        {props.multicountries.map(
          (mc: { name: string; code: string }, index: number) => (
            <React.Fragment key={mc.name}>
              <Link to={`/location/${mc.code}/overview`}>{mc.name}</Link>
              {index < props.multicountries.length - 1 && ", "}
            </React.Fragment>
          )
        )}
        {props.countries.map(
          (c: { name: string; code: string }, index: number) => (
            <React.Fragment key={c.name}>
              <Link to={`/location/${c.code}/overview`}>{c.name}</Link>
              {index < props.countries.length - 1 && ", "}
            </React.Fragment>
          )
        )}
      </div>
      <div
        css={`
          width: 100%;
          height: 40px;
        `}
      />
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {get(cmsData, "modulesCountryDetail.fundManager", "")}
      </div>
      <div
        css={`
          font-size: 12px;
        `}
      >
        {props.manager.name}
      </div>
      <a
        href={`mailto:${props.manager.email}`}
        css={`
          font-size: 12px;
        `}
      >
        {props.manager.email}
      </a>
    </div>
  );
}
