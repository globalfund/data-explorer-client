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
          color: #262c34;
          font-size: 14px;
          padding: 6px 12px;
          align-items: center;
          justify-content: space-between;

          > svg {
            transition: all 0.2s ease-in-out;
            transform: rotate(${expanded ? "-" : ""}90deg) scale(0.5);

            > path {
              fill: #13183f;
            }
          }

          &:hover {
            color: #fff;
            background: #495057;
            transition: background 0.2s ease-in-out;

            > svg {
              > path {
                fill: #fff;
              }
            }
          }
        `}
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
            color: #495057;
            font-size: 14px;
            padding: 6px 12px;
            text-decoration: none;
            border-top: 1px solid #dfe3e6;

            &:hover {
              color: #fff;
              background: #495057;
              transition: background 0.2s ease-in-out;
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
    <Link
      to="/datasets"
      css={`
        width: 100%;
        display: flex;
        color: #262c34;
        font-size: 14px;
        padding: 6px 12px;
        align-items: center;
        text-decoration: none;

        > svg {
          margin-right: 16px;
          transform: rotate(-180deg) scale(0.5);

          > path {
            fill: #13183f;
          }
        }

        &:hover {
          color: #fff;
          background: #495057;
          transition: background 0.2s ease-in-out;

          > svg {
            > path {
              fill: #fff;
            }
          }
        }
      `}
    >
      <ArrowForwardIcon />
      <b>Datasets</b>
    </Link>,
    <Expandable label="Finance">
      <Link to={`/viz/signed/treemap${location.search}`}>Signed</Link>
      <Link to={`/viz/commitment/treemap${location.search}`}>Commitment</Link>
      <Link to={`/viz/disbursements/treemap${location.search}`}>
        Disbursement
      </Link>
      <Link to={`/viz/budgets/flow${location.search}`}>Budgets</Link>
      <Link to={`/viz/allocations${location.search}`}>Allocation</Link>
      <Link to={`/viz/pledges-contributions/treemap${location.search}`}>
        Pledges & Contributions
      </Link>
    </Expandable>,
    <Expandable label="Other">
      <Link to={`/viz/eligibility${location.search}`}>Eligibility</Link>
    </Expandable>,
    <Link
      css={`
        &:hover {
          color: #fff;
          background: #495057;
          transition: background 0.2s ease-in-out;
        }
      `}
      to={`/grants${location.search}`}
    >
      <b>Grants</b>
    </Link>,
    <Link
      css={`
        &:hover {
          color: #fff;
          background: #495057;
          transition: background 0.2s ease-in-out;
        }
      `}
      to={`/results/overview${location.search}`}
    >
      <b>Results</b>
    </Link>,
    <Link
      css={`
        &:hover {
          color: #fff;
          background: #495057;
          transition: background 0.2s ease-in-out;
        }
      `}
      to={`/documents${location.search}`}
    >
      <b>Documents</b>
    </Link>,
  ];
}
