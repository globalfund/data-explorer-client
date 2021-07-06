/* third-party */
import React from "react";
import get from "lodash/get";
import { Link, Switch, Route, useParams, useLocation } from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { AllocationsModule } from "app/modules/viz-module/sub-modules/allocations";
import { EligibilityModule } from "app/modules/viz-module/sub-modules/eligibility";
import { InvestmentsGeoMap } from "app/modules/viz-module/sub-modules/investments/geomap";
import { PledgesContributionsGeoMap } from "app/modules/viz-module/sub-modules/pledgescontributions/geomap";
import { GenericBudgetsFlowWrapper } from "app/modules/viz-module/sub-modules/budgets/flow/data-wrappers/generic";
import { PledgesContributionsTimeCycleModule } from "app/modules/viz-module/sub-modules/pledgescontributions/time-cycle";
import { GenericBudgetsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/budgets/time-cycle/data-wrappers/generic";
import { GenericInvestmentsDisbursedWrapper } from "app/modules/viz-module/sub-modules/investments/disbursed/data-wrappers/generic";
import { GenericInvestmentsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/investments/time-cycle/data-wrappers/generic";
import {
  filtergroups,
  pathnameToFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";

export default function VizModule() {
  const location = useLocation();
  const params = useParams<{ vizType: string; subType?: string }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);

  React.useEffect(() => {
    document.body.style.background = "#fff";
  }, []);

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <PageHeader
        title="Finance"
        breadcrumbs={[
          { name: "Home", link: "/" },
          {
            name: "Datasets",
            menuitems: [
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
              <Link to={`/viz/investments/disbursements${location.search}`}>
                <b>Finance</b>-Investments/Disbursements
              </Link>,
              <Link to={`/viz/investments/time-cycle${location.search}`}>
                <b>Finance</b>-Investments/Time-Cycle
              </Link>,
              <Link to={`/viz/investments/geomap${location.search}`}>
                <b>Finance</b>-Investments/GeoMap
              </Link>,
              <Link to={`/viz/budgets/flow${location.search}`}>
                <b>Finance</b>-Budgets Flow
              </Link>,
              <Link to={`/viz/budgets/time-cycle${location.search}`}>
                <b>Finance</b>-Budgets Time Cycle
              </Link>,
              <Link to={`/viz/allocations${location.search}`}>
                <b>Finance</b>-Allocations
              </Link>,
              <Link to={`/viz/eligibility${location.search}`}>
                <b>Finance</b>-Eligibility
              </Link>,
              <Link
                to={`/viz/pledges-contributions/time-cycle${location.search}`}
              >
                <b>Finance</b>-Pledges & Contributions Time Cycle
              </Link>,
              <Link to={`/viz/pledges-contributions/geomap${location.search}`}>
                <b>Finance</b>-Pledges & Contributions GeoMap
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
            ],
          },
          {
            name: `${params.vizType
              .slice(0, 1)
              .toUpperCase()}${params.vizType.slice(1)}${
              params.subType ? " · " : ""
            }${
              params.subType
                ? `${params.subType
                    .slice(0, 1)
                    .toUpperCase()}${params.subType.slice(1)}`
                : ""
            }`,
          },
        ]}
        // drilldowns={[
        //   { name: "Dataset" },
        //   { name: "Drill down level one" },
        //   { name: "Drill down level two" },
        // ]}
      />
      <div css="width: 100%;height: 25px;" />
      <Switch>
        <Route path="/viz/budgets/flow">
          <GenericBudgetsFlowWrapper />
        </Route>
        <Route path="/viz/budgets/time-cycle">
          <GenericBudgetsTimeCycleWrapper />
        </Route>
        <Route path="/viz/investments/disbursements">
          <GenericInvestmentsDisbursedWrapper />
        </Route>
        <Route path="/viz/investments/time-cycle">
          <GenericInvestmentsTimeCycleWrapper />
        </Route>
        <Route path="/viz/investments/geomap">
          <InvestmentsGeoMap />
        </Route>
        <Route path="/viz/allocations">
          <AllocationsModule />
        </Route>
        <Route path="/viz/pledges-contributions/time-cycle">
          <PledgesContributionsTimeCycleModule />
        </Route>
        <Route path="/viz/pledges-contributions/geomap">
          <PledgesContributionsGeoMap />
        </Route>
        <Route path="/viz/eligibility">
          <EligibilityModule />
        </Route>
      </Switch>
      <ToolBoxPanel
        open={openToolboxPanel}
        onButtonClick={() => setOpenToolboxPanel(!openToolboxPanel)}
        filterGroups={get(
          pathnameToFilterGroups,
          location.pathname,
          filtergroups
        )}
      />
      <div
        css={`
          left: 0;
          top: 48px;
          z-index: 10;
          width: 100%;
          height: 100%;
          position: fixed;
          background: rgba(35, 35, 35, 0.5);
          opacity: ${openToolboxPanel ? 1 : 0};
          visibility: ${openToolboxPanel ? "visible" : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
