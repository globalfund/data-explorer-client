import React from "react";
import find from "lodash/find";
import { Dropdown } from "app/components/Dropdown";
import { useParams, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const params = useParams<{ code: string; period: string; vizType: string }>();

  const selectedPeriod = find(
    props.periods,
    (p: GrantDetailPeriod) => p.number.toString() === params.period
  ) || { startDate: "", endDate: "" };

  function onSelectedPeriodChange(period: string) {
    const fPeriod = find(
      props.periods,
      (p: GrantDetailPeriod) => `${p.startDate} - ${p.endDate}` === period
    );
    if (fPeriod) {
      history.push(
        history.location.pathname.replace(
          `/${params.period}/`,
          `/${fPeriod.number.toString()}/`
        )
      );
    }
  }

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
          font-size: 12px;
          margin-bottom: 20px;
        `}
      >
        Grant status: {props.status}
      </div>
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 20px;
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
        `}
      >
        <LocationIcon />
        <div>
          Location: <b>{props.location}</b>
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
        `}
      >
        <ComponentIcon />
        <div>
          Component: <b>{props.component}</b>
        </div>
      </div>
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        `}
      >
        Implementation period
      </div>
      <div
        css={`
          gap: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 20px;
        `}
      >
        <Dropdown
          value={`${selectedPeriod.startDate} - ${selectedPeriod.endDate}`}
          handleChange={onSelectedPeriodChange}
          options={props.periods.map(
            (p: GrantDetailPeriod) => `${p.startDate} - ${p.endDate}`
          )}
        />
      </div>
      <div
        css={`
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        `}
      >
        Rating
      </div>
      <div
        css={`
          gap: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 20px;
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
              border: 2px solid #262c34;
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
