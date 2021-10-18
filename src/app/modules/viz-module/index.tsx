/* third-party */
import React from "react";
import get from "lodash/get";
import { useMediaQuery } from "@material-ui/core";
import { Switch, Route, useParams, useLocation } from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { BudgetsGeoMap } from "app/modules/viz-module/sub-modules/budgets/geomap";
import { AllocationsModule } from "app/modules/viz-module/sub-modules/allocations";
import { EligibilityModule } from "app/modules/viz-module/sub-modules/eligibility";
import { InvestmentsGeoMap } from "app/modules/viz-module/sub-modules/investments/geomap";
import { AllocationsGeoMap } from "app/modules/viz-module/sub-modules/allocations/geomap";
import { PledgesContributionsTable } from "app/modules/viz-module/sub-modules/pledgescontributions/table";
import { PledgesContributionsGeoMap } from "app/modules/viz-module/sub-modules/pledgescontributions/geomap";
import { PledgesContributionsTreemap } from "app/modules/viz-module/sub-modules/pledgescontributions/treemap";
import { GenericBudgetsFlowWrapper } from "app/modules/viz-module/sub-modules/budgets/flow/data-wrappers/generic";
import { GenericEligibilityWrapper } from "app/modules/viz-module/sub-modules/eligibility/table/data-wrappers/generic";
import { PledgesContributionsTimeCycleModule } from "app/modules/viz-module/sub-modules/pledgescontributions/time-cycle";
import { GenericInvestmentsTableWrapper } from "app/modules/viz-module/sub-modules/investments/table/data-wrappers/generic";
import { GenericBudgetsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/budgets/time-cycle/data-wrappers/generic";
import { GenericInvestmentsDisbursedWrapper } from "app/modules/viz-module/sub-modules/investments/disbursed/data-wrappers/generic";
import { GenericInvestmentsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/investments/time-cycle/data-wrappers/generic";
import {
  filtergroups,
  pathnameToFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";

export default function VizModule() {
  const location = useLocation();
  const datasetMenuItems = useDatasetMenuItems();
  const params = useParams<{ vizType: string; subType?: string }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(true);

  React.useEffect(() => {
    document.body.style.background = "#fff";
  }, []);

  React.useEffect(() => {
    if (!openToolboxPanel) {
      setOpenToolboxPanel(true);
    }
  }, [location.pathname]);

  let pushValue = 0;
  const widthThreshold = (window.innerWidth - 1280) / 2;

  if (widthThreshold > 420) {
    pushValue = 0;
  } else if (widthThreshold < 0) {
    pushValue = 0;
  } else {
    pushValue = 420 - widthThreshold;
  }

  const isSmallScreen = useMediaQuery("(max-width: 960px)");

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
            menuitems: datasetMenuItems,
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
        onToolboxSmBtnClick={
          isSmallScreen
            ? () => setOpenToolboxPanel(!openToolboxPanel)
            : undefined
        }
      />
      <div css="width: 100%;height: 25px;" />
      <div
        id="export-view-div"
        css={`
          height: 100%;
          align-self: flex-start;
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${openToolboxPanel ? `calc(100% - ${pushValue}px)` : "100%"};
        `}
      >
        <Switch>
          {/* Budgets */}
          <Route path="/viz/budgets/flow">
            <GenericBudgetsFlowWrapper toolboxOpen={openToolboxPanel} />
          </Route>
          <Route path="/viz/budgets/time-cycle">
            <GenericBudgetsTimeCycleWrapper toolboxOpen={openToolboxPanel} />
          </Route>
          <Route path="/viz/budgets/map">
            <BudgetsGeoMap />
          </Route>
          {/* Disbursements */}
          <Route path="/viz/disbursements/treemap">
            <GenericInvestmentsDisbursedWrapper
              type="Disbursed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/viz/disbursements/table">
            <GenericInvestmentsTableWrapper />
          </Route>
          <Route path="/viz/disbursements/time-cycle">
            <GenericInvestmentsTimeCycleWrapper
              type="Disbursed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/viz/disbursements/map">
            <InvestmentsGeoMap type="Disbursed" />
          </Route>
          {/* Signed */}
          <Route path="/viz/signed/treemap">
            <GenericInvestmentsDisbursedWrapper
              type="Signed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/viz/signed/table">
            <GenericInvestmentsTableWrapper />
          </Route>
          <Route path="/viz/signed/time-cycle">
            <GenericInvestmentsTimeCycleWrapper
              type="Signed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/viz/signed/map">
            <InvestmentsGeoMap type="Signed" />
          </Route>
          {/* Commitment */}
          <Route path="/viz/commitment/treemap">
            <GenericInvestmentsDisbursedWrapper
              type="Commitment"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/viz/commitment/table">
            <GenericInvestmentsTableWrapper />
          </Route>
          <Route path="/viz/commitment/time-cycle">
            <GenericInvestmentsTimeCycleWrapper
              type="Commitment"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/viz/commitment/map">
            <InvestmentsGeoMap type="Committed" />
          </Route>
          {/* Allocations */}
          <Route path="/viz/allocations/map">
            <AllocationsGeoMap />
          </Route>
          <Route path="/viz/allocations">
            <AllocationsModule toolboxOpen={openToolboxPanel} />
          </Route>
          {/* Pledges & Contributions */}
          <Route path="/viz/pledges-contributions/time-cycle">
            <PledgesContributionsTimeCycleModule
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/viz/pledges-contributions/table">
            <PledgesContributionsTable />
          </Route>
          <Route path="/viz/pledges-contributions/map">
            <PledgesContributionsGeoMap />
          </Route>
          <Route path="/viz/pledges-contributions/treemap">
            <PledgesContributionsTreemap />
          </Route>
          {/* Eligibility */}
          <Route path="/viz/eligibility/table">
            <GenericEligibilityWrapper />
          </Route>
          <Route path="/viz/eligibility">
            <EligibilityModule />
          </Route>
        </Switch>
      </div>
      <ToolBoxPanel
        open={openToolboxPanel}
        onCloseBtnClick={() => setOpenToolboxPanel(!openToolboxPanel)}
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
          z-index: 15;
          width: 100%;
          height: 100%;
          position: fixed;
          background: rgba(35, 35, 35, 0.5);
          opacity: ${openToolboxPanel && widthThreshold < 0}? 1 : 0};
          visibility: ${
            openToolboxPanel && widthThreshold < 0 ? "visible" : "hidden"
          };
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
