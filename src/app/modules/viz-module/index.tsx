/* third-party */
import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { useUpdateEffect } from "react-use";
import { useMediaQuery } from "@material-ui/core";
import { Switch, Route, useParams, useLocation } from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import BreadCrumbs from "app/components/Charts/common/breadcrumbs";
import { MobileViewControl } from "app/components/Mobile/ViewsControl";
import { BudgetsGeoMap } from "app/modules/viz-module/sub-modules/budgets/geomap";
import { AllocationsModule } from "app/modules/viz-module/sub-modules/allocations";
import { EligibilityModule } from "app/modules/viz-module/sub-modules/eligibility";
import { InvestmentsGeoMap } from "app/modules/viz-module/sub-modules/investments/geomap";
import { AllocationsGeoMap } from "app/modules/viz-module/sub-modules/allocations/geomap";
import { AllocationsTableModule } from "app/modules/viz-module/sub-modules/allocations/table";
import { EligibilityTableModuleWrapper } from "app/modules/viz-module/sub-modules/eligibility/table";
import { PledgesContributionsTable } from "app/modules/viz-module/sub-modules/pledgescontributions/table";
import { PledgesContributionsGeoMap } from "app/modules/viz-module/sub-modules/pledgescontributions/geomap";
import { PledgesContributionsTreemap } from "app/modules/viz-module/sub-modules/pledgescontributions/treemap";
import { GenericBudgetsFlowWrapper } from "app/modules/viz-module/sub-modules/budgets/flow/data-wrappers/generic";
import { PledgesContributionsTimeCycleModule } from "app/modules/viz-module/sub-modules/pledgescontributions/time-cycle";
import { GenericInvestmentsTableWrapper } from "app/modules/viz-module/sub-modules/investments/table/data-wrappers/generic";
import { GenericBudgetsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/budgets/time-cycle/data-wrappers/generic";
import { GenericFundingRequestWrapper } from "app/modules/viz-module/sub-modules/fundingRequests/table/data-wrappers/generic";
import { GenericInvestmentsDisbursedWrapper } from "app/modules/viz-module/sub-modules/investments/disbursed/data-wrappers/generic";
import { GenericInvestmentsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/investments/time-cycle/data-wrappers/generic";
import {
  filtergroups,
  pathnameToFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";

export default function VizModule() {
  const location = useLocation();
  const vizWrapperRef = React.useRef(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{ vizType: string; subType?: string }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(!isMobile);

  React.useEffect(() => {
    document.body.style.background = appColors.COMMON.PAGE_BACKGROUND_COLOR_1;
  }, []);

  React.useEffect(() => {
    if (!isMobile && !openToolboxPanel) {
      setOpenToolboxPanel(true);
    }
  }, [location.pathname]);

  useUpdateEffect(() => setOpenToolboxPanel(!isMobile), [isMobile]);

  let pushValue = 0;
  const widthThreshold = (window.innerWidth - 1280) / 2;

  if (widthThreshold > 420) {
    pushValue = 0;
  } else if (widthThreshold < 0) {
    pushValue = 0;
  } else {
    pushValue = 450 - widthThreshold;
  }

  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  function isToolboxOvervlayVisible() {
    if (isSmallScreen) return 0;
    if (openToolboxPanel && widthThreshold < 0) return 1;
    return 0;
  }

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
      <BreadCrumbs />
      <PageHeader title={params.vizType.replace("-", " & ")} />
      <PageTopSpacer />
      {isMobile && (
        <React.Fragment>
          <MobileViewControl />
          <div
            css={`
              width: 100%;
              height: 15px;
            `}
          />
        </React.Fragment>
      )}
      <div
        id="export-view-div"
        css={`
          height: 100%;
          align-self: flex-start;
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${openToolboxPanel ? `calc(100% - ${pushValue}px)` : "100%"};
        `}
        ref={vizWrapperRef}
      >
        <Switch>
          {/* Budgets */}
          <Route path="/viz/budgets/flow">
            <GenericBudgetsFlowWrapper
              toolboxOpen={openToolboxPanel}
              setOpenToolboxPanel={setOpenToolboxPanel}
            />
          </Route>
          <Route path="/viz/budgets/time-cycle">
            <GenericBudgetsTimeCycleWrapper
              toolboxOpen={openToolboxPanel}
              setOpenToolboxPanel={setOpenToolboxPanel}
            />
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
          {/* <Route path="/viz/signed/time-cycle">
            <GenericInvestmentsTimeCycleWrapper
              type="Signed"
              toolboxOpen={openToolboxPanel}
            />
          </Route> */}
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
          <Route path="/viz/allocations/table">
            <AllocationsTableModule
              toolboxOpen={openToolboxPanel}
              setOpenToolboxPanel={setOpenToolboxPanel}
            />
          </Route>
          <Route path="/viz/allocations">
            <AllocationsModule
              toolboxOpen={openToolboxPanel}
              setOpenToolboxPanel={setOpenToolboxPanel}
            />
          </Route>
          {/* Pledges & Contributions */}
          <Route path="/viz/pledges-contributions/time-cycle">
            <PledgesContributionsTimeCycleModule />
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
            <EligibilityTableModuleWrapper />
          </Route>
          <Route path="/viz/eligibility">
            <EligibilityModule />
          </Route>
          {/* Funding Request */}
          <Route path="/viz/funding-requests/table">
            <GenericFundingRequestWrapper />
          </Route>
        </Switch>
      </div>
      <div
        css={`
          @media (max-width: 767px) {
            width: 100%;
            height: 140px;
          }
        `}
      />
      <ToolBoxPanel
        open={openToolboxPanel}
        vizWrapperRef={vizWrapperRef}
        onCloseBtnClick={(value?: boolean) =>
          setOpenToolboxPanel(value !== undefined ? value : !openToolboxPanel)
        }
        filterGroups={get(
          pathnameToFilterGroups,
          location.pathname,
          filtergroups
        )}
        css={`
          z-index: 1;
        `}
      />
      <div
        css={`
          left: 0;
          top: 45px;
          z-index: 15;
          width: 100%;
          height: 100%;
          position: fixed;
          background: rgba(35, 35, 35, 0.5);
          opacity: ${isToolboxOvervlayVisible()};
          visibility: ${isToolboxOvervlayVisible() === 1
            ? "visible"
            : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
