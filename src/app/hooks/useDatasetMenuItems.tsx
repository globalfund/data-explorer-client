import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";

export function useDatasetMenuItems(): React.ReactChild[] {
  const location = useLocation();
  return [
    <Link
      to="/datasets"
      css={`
        display: flex;
        align-items: center;

        > svg {
          margin-right: 16px;
          transform: rotate(-180deg) scale(0.5);

          > path {
            fill: #13183f;
          }
        }
      `}
    >
      <ArrowForwardIcon />
      <b>Datasets</b>
    </Link>,
    <Link to={`/viz/disbursements/treemap${location.search}`}>
      <b>Finance</b> - Disbursements Treemap
    </Link>,
    <Link to={`/viz/disbursements/time-cycle${location.search}`}>
      <b>Finance</b> - Disbursements Time-Cycle
    </Link>,
    <Link to={`/viz/disbursements/geomap${location.search}`}>
      <b>Finance</b> - Disbursements Geomap
    </Link>,
    <Link to={`/viz/signed/treemap${location.search}`}>
      <b>Finance</b> - Signed Treemap
    </Link>,
    <Link to={`/viz/signed/time-cycle${location.search}`}>
      <b>Finance</b> - Signed Time-Cycle
    </Link>,
    <Link to={`/viz/signed/geomap${location.search}`}>
      <b>Finance</b> - Signed Geomap
    </Link>,
    <Link to={`/viz/commitment/treemap${location.search}`}>
      <b>Finance</b> - Commitment Treemap
    </Link>,
    <Link to={`/viz/commitment/time-cycle${location.search}`}>
      <b>Finance</b> - Commitment Time-Cycle
    </Link>,
    <Link to={`/viz/commitment/geomap${location.search}`}>
      <b>Finance</b> - Commitment Geomap
    </Link>,
    <Link to={`/viz/budgets/flow${location.search}`}>
      <b>Finance</b> - Budgets Flow
    </Link>,
    <Link to={`/viz/budgets/time-cycle${location.search}`}>
      <b>Finance</b> - Budgets Time Cycle
    </Link>,
    <Link to={`/viz/budgets/geomap${location.search}`}>
      <b>Finance</b> - Budgets Geomap
    </Link>,
    <Link to={`/viz/allocations${location.search}`}>
      <b>Finance</b> - Allocations
    </Link>,
    <Link to={`/viz/allocations/geomap${location.search}`}>
      <b>Finance</b> - Allocations Geomap
    </Link>,
    <Link to={`/viz/eligibility${location.search}`}>
      <b>Other</b> - Eligibility
    </Link>,
    <Link to={`/viz/pledges-contributions/time-cycle${location.search}`}>
      <b>Finance</b> - Pledges & Contributions Time Cycle
    </Link>,
    <Link to={`/viz/pledges-contributions/geomap${location.search}`}>
      <b>Finance</b> - Pledges & Contributions Geomap
    </Link>,
    <Link to={`/viz/pledges-contributions/treemap${location.search}`}>
      <b>Finance</b> - Pledges & Contributions Treemap
    </Link>,
    <Link to={`/grants${location.search}`}>
      <b>Grants</b>
    </Link>,
    <Link to={`/results${location.search}`}>
      <b>Results</b>
    </Link>,
    <Link to={`/documents${location.search}`}>
      <b>Documents</b>
    </Link>,
  ];
}
