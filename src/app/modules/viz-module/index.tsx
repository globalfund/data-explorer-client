/* third-party */
import React from "react";
import { Link, Switch, Route } from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { AllocationsModule } from "app/modules/viz-module/sub-modules/allocations";
import { BudgetsFlowModule } from "app/modules/viz-module/sub-modules/budgets/flow";
import { BudgetsTimeCycleModule } from "app/modules/viz-module/sub-modules/budgets/time-cycle";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";
import { InvestmentsTimeCycleModule } from "app/modules/viz-module/sub-modules/investments/time-cycle";

export default function VizModule() {
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
              <Link to="/viz/investments">
                <b>Finance</b>-Investments
              </Link>,
              <Link to="/viz/budgets/flow">
                <b>Finance</b>-Budgets
              </Link>,
              <Link to="/viz/allocation">
                <b>Finance</b>-Allocation
              </Link>,
              <Link to="/viz/eligibility">
                <b>Finance</b>-Eligibility
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
          <InvestmentsDisbursedModule />
        </Route>
        <Route path="/viz/investments/time-cycle">
          <InvestmentsTimeCycleModule />
        </Route>
        <Route path="/viz/allocations">
          <AllocationsModule />
        </Route>
      </Switch>
    </div>
  );
}
