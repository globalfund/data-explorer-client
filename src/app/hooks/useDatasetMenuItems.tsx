/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { appColors } from "app/theme";
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
          color: ${appColors.APPBAR.DATASETS_MENU_ITEM_COLOR};
          font-size: 14px;
          padding: 10px 12px;
          align-items: center;
          justify-content: space-between;

          > svg {
            transition: all 0.2s ease-in-out;
            transform: rotate(${expanded ? "-" : ""}90deg) scale(0.5);

            > path {
              fill: ${appColors.COMMON.SECONDARY_COLOR_10};
            }
          }

          @media (min-width: 768px) {
            &:hover {
              color: ${appColors.COMMON.WHITE};
              background: ${appColors.COMMON.PRIMARY_COLOR_1};
              transition: background 0.2s ease-in-out;

              > svg {
                > path {
                  fill: ${appColors.COMMON.WHITE};
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
            color: ${appColors.COMMON.PRIMARY_COLOR_1};
            font-size: 14px;
            padding: 10px 15px;
            text-decoration: none;

            @media (min-width: 768px) {
              &:hover {
                color: ${appColors.COMMON.WHITE};
                font-weight: bold;
                background: ${appColors.COMMON.PRIMARY_COLOR_1};
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
              color: ${appColors.COMMON.WHITE};
              background: ${appColors.COMMON.PRIMARY_COLOR_1};
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
    <Link
      css={`
        @media (min-width: 768px) {
          &:hover {
            color: ${appColors.COMMON.WHITE};
            background: ${appColors.COMMON.PRIMARY_COLOR_1};
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
            color: ${appColors.COMMON.WHITE};
            background: ${appColors.COMMON.PRIMARY_COLOR_1};
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
