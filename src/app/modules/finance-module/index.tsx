/* third-party */
import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { useTitle, useUpdateEffect } from "react-use";
import { Switch, Route, useParams } from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { MobileViewControl } from "app/components/Mobile/ViewsControl";
import { financeTabs } from "app/components/PageHeader/components/tabs/data";
import { BudgetsGeoMap } from "app/modules/viz-module/sub-modules/budgets/geomap";
import { InvestmentsGeoMap } from "app/modules/viz-module/sub-modules/investments/geomap";
import { pathnameToFilterGroups } from "app/components/ToolBoxPanel/components/filters/data";
import { GenericBudgetsFlowWrapper } from "app/modules/viz-module/sub-modules/budgets/flow/data-wrappers/generic";
import { GenericInvestmentsTableWrapper } from "app/modules/viz-module/sub-modules/investments/table/data-wrappers/generic";
import { GenericBudgetsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/budgets/time-cycle/data-wrappers/generic";
import { GenericInvestmentsDisbursedWrapper } from "app/modules/viz-module/sub-modules/investments/disbursed/data-wrappers/generic";
import { GenericInvestmentsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/investments/time-cycle/data-wrappers/generic";

export default function FinanceModule() {
  useTitle("The Global Fund - Finance");
  const vizWrapperRef = React.useRef(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{ vizType: string }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(!isMobile);

  React.useEffect(() => {
    document.body.style.background = "#fff";
  }, []);

  React.useEffect(() => {
    if (!isMobile && !openToolboxPanel) {
      setOpenToolboxPanel(true);
    }
  }, [params.vizType]);

  useUpdateEffect(() => setOpenToolboxPanel(!isMobile), [isMobile]);

  let pushValue = 0;
  const widthThreshold = (window.innerWidth - 1280) / 2;

  if (widthThreshold > 420) {
    pushValue = 0;
  } else if (widthThreshold < 0) {
    pushValue = 0;
  } else {
    pushValue = 400 - widthThreshold;
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
      <PageHeader
        isDetail
        isFinance
        title="Finance"
        breadcrumbs={[]}
        tabs={financeTabs}
      />
      <PageTopSpacer />
      {isMobile && (
        <React.Fragment>
          <MobileViewControl tabs={financeTabs} isFinance />
          <div
            css={`
              width: 100%;
              height: 25px;

              @media (max-width: 767px) {
                height: 12px;
              }
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
          <Route path="/budgets/flow">
            <GenericBudgetsFlowWrapper toolboxOpen={openToolboxPanel} />
          </Route>
          <Route path="/budgets/time-cycle">
            <GenericBudgetsTimeCycleWrapper toolboxOpen={openToolboxPanel} />
          </Route>
          <Route path="/budgets/map">
            <BudgetsGeoMap />
          </Route>
          {/* Disbursements */}
          <Route path="/disbursements/treemap">
            <GenericInvestmentsDisbursedWrapper
              type="Disbursed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/disbursements/table">
            <GenericInvestmentsTableWrapper />
          </Route>
          <Route path="/disbursements/time-cycle">
            <GenericInvestmentsTimeCycleWrapper
              type="Disbursed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/disbursements/map">
            <InvestmentsGeoMap type="Disbursed" />
          </Route>
          {/* Signed */}
          <Route path="/signed/treemap">
            <GenericInvestmentsDisbursedWrapper
              type="Signed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/signed/table">
            <GenericInvestmentsTableWrapper />
          </Route>
          <Route path="/signed/time-cycle">
            <GenericInvestmentsTimeCycleWrapper
              type="Signed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/signed/map">
            <InvestmentsGeoMap type="Signed" />
          </Route>
          {/* Commitment */}
          <Route path="/commitment/treemap">
            <GenericInvestmentsDisbursedWrapper
              type="Commitment"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/commitment/table">
            <GenericInvestmentsTableWrapper />
          </Route>
          <Route path="/commitment/time-cycle">
            <GenericInvestmentsTimeCycleWrapper
              type="Commitment"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/commitment/map">
            <InvestmentsGeoMap type="Committed" />
          </Route>
        </Switch>
      </div>
      <div
        css={`
          @media (max-width: 767px) {
            width: 100%;
            height: 90px;
          }
        `}
      />
      <ToolBoxPanel
        isFinance
        open={openToolboxPanel}
        vizWrapperRef={vizWrapperRef}
        filterGroups={pathnameToFilterGroups.finance}
        onCloseBtnClick={(value?: boolean) =>
          setOpenToolboxPanel(value !== undefined ? value : !openToolboxPanel)
        }
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
          opacity: ${isToolboxOvervlayVisible()};
          visibility: ${isToolboxOvervlayVisible() ? "visible" : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
