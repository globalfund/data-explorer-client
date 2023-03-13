/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";

interface ExpandableProps {
  label: string;
  children: React.ReactChild | React.ReactChild[];
}

function Expandable(props: ExpandableProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={`
          width: 100%;
          display: flex;
          color: #231d2c;
          font-size: 14px;
          padding: 10px 12px;
          align-items: center;
          justify-content: space-between;

          > svg {
            transition: all 0.2s ease-in-out;
            transform: rotate(${expanded ? "-" : ""}90deg) scale(0.5);

            > path {
              fill: #13183f;
            }
          }

          @media (min-width: 768px) {
            &:hover {
              color: #fff;
              background: #231d2c;
              transition: background 0.2s ease-in-out;

              > svg {
                > path {
                  fill: #fff;
                }
              }
            }
          }
        `}
        id="appbar-expandable-item"
        onClick={() => setExpanded(!expanded)}
      >
        <b>{props.label}</b>
        <ArrowForwardIcon />
      </div>
      <div
        css={`
          width: 100%;
          display: flex;
          flex-direction: column;

          a {
            width: 100%;
            color: #231d2c;
            font-size: 14px;
            padding: 10px 15px;
            text-decoration: none;

            @media (min-width: 768px) {
              &:hover {
                color: #fff;
                font-weight: bold;
                background: #231d2c;
                transition: background 0.2s ease-in-out;
              }
            }
          }
        `}
      >
        {expanded && props.children}
      </div>
    </div>
  );
}

export function useDatasetMenuItems(): React.ReactChild[] {
  const location = useLocation();
  return [
    // <Link
    //   to="/datasets"
    //   css={`
    //     width: 100%;
    //     display: flex;
    //     color: #231d2c;
    //     font-size: 14px;
    //     padding: 6px 12px;
    //     align-items: center;
    //     text-decoration: none;

    //     > svg {
    //       margin-right: 16px;
    //       transform: rotate(-180deg) scale(0.5);

    //       > path {
    //         fill: #13183f;
    //       }
    //     }

    //     @media (min-width: 768px) {
    //       &:hover {
    //         color: #fff;
    //         background: #231d2c;
    //         transition: background 0.2s ease-in-out;

    //         > svg {
    //           > path {
    //             fill: #fff;
    //           }
    //         }
    //       }
    //     }
    //   `}
    // >
    //   <ArrowForwardIcon />
    //   <b>Datasets</b>
    // </Link>,
    <Expandable label="Resource Mobilization">
      <Link to={`/viz/pledges-contributions/treemap${location.search}`}>
        Pledges & Contributions
      </Link>
    </Expandable>,
    <Expandable label="Access to Funding">
      <Link to={`/viz/eligibility${location.search}`}>Eligibility</Link>
      <Link to={`/viz/allocations${location.search}`}>Allocations</Link>
    </Expandable>,
    <Expandable label="Grant Implementation">
      <Link
        css={`
          @media (min-width: 768px) {
            &:hover {
              color: #fff;
              background: #262c34;
              transition: background 0.2s ease-in-out;
            }
          }
        `}
        to={`/grants${location.search}`}
      >
        Grants
      </Link>
      <Link to={`/viz/signed/treemap${location.search}`}>Signed Amounts</Link>
      <Link to={`/viz/commitment/treemap${location.search}`}>Commitments</Link>
      <Link to={`/viz/disbursements/treemap${location.search}`}>
        Disbursements
      </Link>
      <Link to={`/viz/budgets/flow${location.search}`}>Budgets</Link>
    </Expandable>,
    // <Expandable label="Access to Funding">
    //   <Link to={`/viz/eligibility${location.search}`}>Eligibility</Link>
    //   <Link to={`/viz/allocations${location.search}`}>Allocation</Link>
    // </Expandable>,
    // <Link
    //   css={`
    //     @media (min-width: 768px) {
    //       &:hover {
    //         color: #fff;
    //         background: #231d2c;
    //         transition: background 0.2s ease-in-out;
    //       }
    //     }
    //   `}
    //   to={`/grants${location.search}`}
    // >
    //   <b>Grants</b>
    // </Link>,
    <Link
      css={`
        @media (min-width: 768px) {
          &:hover {
            color: #fff;
            background: #231d2c;
            transition: background 0.2s ease-in-out;
          }
        }
      `}
      to={`/results${location.search}`}
    >
      <b>Annual Results</b>
    </Link>,
    <Link
      css={`
        @media (min-width: 768px) {
          &:hover {
            color: #fff;
            background: #231d2c;
            transition: background 0.2s ease-in-out;
          }
        }
      `}
      to={`/documents${location.search}`}
    >
      <b>Documents</b>
    </Link>,
  ];
}
