/* third-party */
import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { mockdata1 } from "app/components/Charts/Investments/Disbursements/data";
import { AllocationsModule } from "app/modules/viz-module/sub-modules/allocations";
import { EligibilityModule } from "app/modules/viz-module/sub-modules/eligibility";
import { BudgetsFlowModule } from "app/modules/viz-module/sub-modules/budgets/flow";
import { InvestmentsGeoMap } from "app/modules/viz-module/sub-modules/investments/geomap";
import { BudgetsTimeCycleModule } from "app/modules/viz-module/sub-modules/budgets/time-cycle";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";
import { InvestmentsTimeCycleModule } from "app/modules/viz-module/sub-modules/investments/time-cycle";
import { PledgesContributionsGeoMap } from "app/modules/viz-module/sub-modules/pledgescontributions/geomap";
import { PledgesContributionsTimeCycleModule } from "app/modules/viz-module/sub-modules/pledgescontributions/time-cycle";

export default function VizModule() {
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
              <Link to="/viz/investments/disbursements">
                <b>Finance</b>-Investments/Disbursements
              </Link>,
              <Link to="/viz/investments/time-cycle">
                <b>Finance</b>-Investments/Time-Cycle
              </Link>,
              <Link to="/viz/investments/geomap">
                <b>Finance</b>-Investments/GeoMap
              </Link>,
              <Link to="/viz/budgets/flow">
                <b>Finance</b>-Budgets Flow
              </Link>,
              <Link to="/viz/budgets/time-cycle">
                <b>Finance</b>-Budgets Time Cycle
              </Link>,
              <Link to="/viz/allocations">
                <b>Finance</b>-Allocations
              </Link>,
              <Link to="/viz/eligibility">
                <b>Finance</b>-Eligibility
              </Link>,
              <Link to="/viz/pledges-contributions/time-cycle">
                <b>Finance</b>-Pledges & Contributions Time Cycle
              </Link>,
              <Link to="/viz/pledges-contributions/geomap">
                <b>Finance</b>-Pledges & Contributions GeoMap
              </Link>,
              <Link to="/grants">
                <b>Grants</b>
              </Link>,
              <Link to="/results">
                <b>Results</b>
              </Link>,
              <Link to="/documents">
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
          <BudgetsFlowModule />
        </Route>
        <Route path="/viz/budgets/time-cycle">
          <BudgetsTimeCycleModule />
        </Route>
        <Route path="/viz/investments/disbursements">
          <InvestmentsDisbursedModule data={mockdata1} />
        </Route>
        <Route path="/viz/investments/time-cycle">
          <InvestmentsTimeCycleModule />
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
