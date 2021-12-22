import React from "react";
import { ComponentIcon } from "app/assets/icons/Component";
import {
  ResultsInfoContentProps,
  ResultsInfoContentStatsProps,
} from "app/modules/results-module/data";

function evenRound(num: number, decimalPlaces: number) {
  const d = decimalPlaces || 0;
  const m = 10 ** d;
  const n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
  const i = Math.floor(n);
  const f = n - i;
  const e = 1e-8; // Allow for rounding errors in f
  const r =
    // eslint-disable-next-line no-nested-ternary
    f > 0.5 - e && f < 0.5 + e ? (i % 2 === 0 ? i : i + 1) : Math.round(n);
  return d ? r / m : r;
}

function fnum(x: number) {
  if (Number.isNaN(x)) {
    return {
      number: x,
      text: "",
    };
  }
  if (x < 9999) {
    return {
      number: evenRound(x, 0),
      text: "",
    };
  }
  if (x < 1000000) {
    return {
      number: evenRound(x, 2),
      text: "thousand",
    };
  }
  // if (x < 10000000) {
  //   const n =
  //     x.toString()[2] > 0 && x.toString()[3] > 0
  //       ? Math.round((x / 1000000) * 2) / 2
  //       : (x / 1000000).toFixed(2);
  //   return {
  //     number: Number(n),
  //     text: 'million'
  //   };
  // }
  if (x < 10000000) {
    return {
      number: evenRound(x / 1000000, 2),
      text: "million",
    };
  }
  if (x < 100000000) {
    return {
      number: evenRound(x / 1000000, 2),
      text: "million",
    };
  }
  if (x < 1000000000) {
    return {
      number: Math.round(x / 1000000),
      text: "million",
    };
  }
  if (x < 1000000000000) {
    return {
      number: Math.round(x / 1000000000),
      text: "billion",
    };
  }
  return {
    number: 1,
    text: "T+",
  };
}

export function ResultsInfoContent(props: ResultsInfoContentProps) {
  return (
    <div
      css={`
        gap: 40px;
        display: flex;
        padding: 30px 50px;
        flex-direction: column;

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
      `}
    >
      <div
        css={`
          color: #262c34;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.5px;
        `}
      >
        {props.description}
      </div>
      {props.stats.map((stat: ResultsInfoContentStatsProps) => (
        <StatItem {...stat} key={stat.name} />
      ))}
    </div>
  );
}

function StatItem(props: ResultsInfoContentStatsProps) {
  const fValue = fnum(props.value);

  return (
    <div
      css={`
        gap: 12px;
        display: flex;
        color: #262c34;
        font-size: 14px;
        flex-direction: column;

        > * {
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            &:not(:last-child) {
              margin-right: 12px;
            }
          }
        }
      `}
    >
      <div
        css={`
          gap: 6px;
          display: flex;
          font-weight: bold;
          flex-direction: row;
          align-items: center;
          text-transform: uppercase;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

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
        <b>{props.name}</b>
      </div>
      <div
        css={`
          font-size: 40px;
          font-weight: bold;
          line-height: 24px;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
        `}
      >
        {fValue.number} {fValue.text}
      </div>
      <div>{props.description}</div>
    </div>
  );
}
