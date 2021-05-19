import { formatFinancialValue } from "app/utils/formatFinancialValue";
import React from "react";
import { Link } from "react-router-dom";

interface LocationInfoContentProps {
  title: string;
  code: string;
  investments: {
    disbursed: number;
    committed: number;
    signed: number;
  };
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
        `}
      >
        {props.title}
      </div>
      <Link
        to={`/results`}
        css={`
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 40px;
          text-decoration: none;
        `}
      >
        See {props.title}'s results
      </Link>
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 20px;
        `}
      >
        Investments
      </div>
      <div
        css={`
          font-size: 12px;
        `}
      >
        <b>Disbursed: </b>
        {formatFinancialValue(props.investments.disbursed)}
      </div>
      <div
        css={`
          font-size: 12px;
        `}
      >
        <b>Committed: </b>
        {formatFinancialValue(props.investments.committed)}
      </div>
      <div
        css={`
          font-size: 12px;
          margin-bottom: 40px;
        `}
      >
        <b>Signed: </b>
        {formatFinancialValue(props.investments.signed)}
      </div>
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 20px;
        `}
      >
        Multicountries with {props.title}
      </div>
      {props.multicountries.map((mc: { name: string; code: string }) => (
        <Link key={mc.name} to={`/location/${mc.code}/investments`}>
          {mc.name}
        </Link>
      ))}
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
        `}
      >
        Fund Portfolio Manager
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
