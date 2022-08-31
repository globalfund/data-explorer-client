/* third-party */
import React from "react";
import get from "lodash/get";
import { useMediaQuery } from "@material-ui/core";
import { useTitle, useUpdateEffect } from "react-use";
import { Switch, Route, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { MobileViewControl } from "app/components/Mobile/ViewsControl";
import { grantDetailTabs } from "app/components/PageHeader/components/tabs/data";
import { BudgetsGeoMap } from "app/modules/viz-module/sub-modules/budgets/geomap";
import { filtergroups } from "app/components/ToolBoxPanel/components/filters/data";
import { GrantDetailOverviewModule } from "app//modules/grant-detail-module/components/sub-modules/overview";
import { GrantDetailDocumentsModule } from "app/modules/grant-detail-module/components/sub-modules/documents";
import { PerformanceRatingModule } from "app/modules/grant-detail-module/components/sub-modules/performance-rating";
import { PerformanceFrameworkModule } from "app/modules/grant-detail-module/components/sub-modules/performance-framework";
import { GrantDetailBudgetsFlowWrapper } from "app/modules/viz-module/sub-modules/budgets/flow/data-wrappers/grantDetail";
import { GrantDetailInvestmentsTableWrapper } from "app/modules/viz-module/sub-modules/investments/table/data-wrappers/grantDetail";
import { GrantDetailGenericBudgetsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/budgets/time-cycle/data-wrappers/grantDetail";
import { GrantDetailInvestmentsDisbursedWrapper } from "app/modules/viz-module/sub-modules/investments/disbursed/data-wrappers/grantDetail";
import { GrantDetailInvestmentsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/investments/time-cycle/data-wrappers/grantDetail";

export default function GrantDetail() {
  useTitle("The Data Explorer - Grant");
  const vizWrapperRef = React.useRef(null);
  const datasetMenuItems = useDatasetMenuItems();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{ code: string; period: string; vizType: string }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(
    !isMobile && params.vizType !== "overview"
  );

  // api call & data
  const fetchGrantInfoData = useStoreActions(
    (store) => store.GrantDetailInfo.fetch
  );
  const grantInfoData = useStoreState((state) =>
    get(state.GrantDetailInfo.data, "data[0]", {
      title: "",
      code: "",
      rating: "",
      status: "",
      location: "",
      component: "",
      description: "",
      investments: {
        disbursed: 0,
        committed: 0,
        signed: 0,
      },
      manager: {
        name: "",
        email: "",
      },
    })
  );
  const fetchGrantPeriodsData = useStoreActions(
    (store) => store.GrantDetailPeriods.fetch
  );
  const fetchGrantPeriodInfoData = useStoreActions(
    (store) => store.GrantDetailPeriodInfo.fetch
  );

  React.useEffect(() => {
    document.body.style.background = "#fff";
    fetchGrantInfoData({
      filterString: `grantNumber=${params.code}`,
    });
    fetchGrantPeriodsData({
      filterString: `grantNumber=${params.code}`,
    });
  }, []);

  React.useEffect(() => {
    fetchGrantPeriodInfoData({
      filterString: `grantNumber=${params.code}&IPnumber=${params.period}`,
    });
  }, [params.period]);

  React.useEffect(() => {
    if (!isMobile && params.vizType !== "overview") {
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

  function isToolboxOvervlayVisible() {
    if (isSmallScreen) return 0;
    if (openToolboxPanel && widthThreshold < 0) return 1;
    return 0;
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
        isDetail
        title={grantInfoData.title}
        breadcrumbs={[
          { name: "Home", link: "/" },
          {
            name: "Datasets",
            menuitems: datasetMenuItems,
          },
          {
            name: params.code,
          },
        ]}
        tabs={grantDetailTabs}
      />
      <PageTopSpacer />
      {isMobile && (
        <React.Fragment>
          <MobileViewControl tabs={grantDetailTabs} />
          <div
            css={`
              width: 100%;
              height: 10px;
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
          {/* Overview */}
          <Route path={`/grant/${params.code}/${params.period}/overview`}>
            <GrantDetailOverviewModule />
          </Route>
          {/* Budgets */}
          <Route path={`/grant/${params.code}/${params.period}/budgets/flow`}>
            <GrantDetailBudgetsFlowWrapper
              code={params.code}
              toolboxOpen={openToolboxPanel}
              implementationPeriod={params.period}
            />
          </Route>
          <Route
            path={`/grant/${params.code}/${params.period}/budgets/time-cycle`}
          >
            <GrantDetailGenericBudgetsTimeCycleWrapper
              code={params.code}
              toolboxOpen={openToolboxPanel}
              implementationPeriod={params.period}
            />
          </Route>
          <Route path={`/grant/${params.code}/${params.period}/budgets/map`}>
            <BudgetsGeoMap
              grantCode={params.code}
              grantPeriod={params.period}
            />
          </Route>
          {/* Performance Rating */}
          <Route
            path={`/grant/${params.code}/${params.period}/performance-rating`}
          >
            <PerformanceRatingModule
              code={params.code}
              implementationPeriod={params.period}
            />
          </Route>
          {/* Disbursements */}
          <Route
            path={`/grant/${params.code}/${params.period}/disbursements/treemap`}
          >
            <GrantDetailInvestmentsDisbursedWrapper
              type="Disbursed"
              code={params.code}
              toolboxOpen={openToolboxPanel}
              implementationPeriod={params.period}
            />
          </Route>
          <Route
            path={`/grant/${params.code}/${params.period}/disbursements/table`}
          >
            <GrantDetailInvestmentsTableWrapper
              code={params.code}
              implementationPeriod={params.period}
            />
          </Route>
          <Route
            path={`/grant/${params.code}/${params.period}/disbursements/time-cycle`}
          >
            <GrantDetailInvestmentsTimeCycleWrapper
              type="Disbursed"
              code={params.code}
              toolboxOpen={openToolboxPanel}
              implementationPeriod={params.period}
            />
          </Route>
          {/* Signed */}
          <Route path={`/grant/${params.code}/${params.period}/signed/treemap`}>
            <GrantDetailInvestmentsDisbursedWrapper
              type="Signed"
              code={params.code}
              toolboxOpen={openToolboxPanel}
              implementationPeriod={params.period}
            />
          </Route>
          <Route path={`/grant/${params.code}/${params.period}/signed/table`}>
            <GrantDetailInvestmentsTableWrapper
              code={params.code}
              implementationPeriod={params.period}
            />
          </Route>
          {/* <Route
            path={`/grant/${params.code}/${params.period}/signed/time-cycle`}
          >
            <GrantDetailInvestmentsTimeCycleWrapper
              type="Signed"
              code={params.code}
              toolboxOpen={openToolboxPanel}
              implementationPeriod={params.period}
            />
          </Route> */}
          {/* Commitmeent */}
          <Route
            path={`/grant/${params.code}/${params.period}/commitment/treemap`}
          >
            <GrantDetailInvestmentsDisbursedWrapper
              type="Commitment"
              code={params.code}
              toolboxOpen={openToolboxPanel}
              implementationPeriod={params.period}
            />
          </Route>
          <Route
            path={`/grant/${params.code}/${params.period}/commitment/table`}
          >
            <GrantDetailInvestmentsTableWrapper
              code={params.code}
              implementationPeriod={params.period}
            />
          </Route>
          <Route
            path={`/grant/${params.code}/${params.period}/commitment/time-cycle`}
          >
            <GrantDetailInvestmentsTimeCycleWrapper
              type="Commitment"
              code={params.code}
              toolboxOpen={openToolboxPanel}
              implementationPeriod={params.period}
            />
          </Route>
          {/* Documents */}
          <Route path={`/grant/${params.code}/${params.period}/documents`}>
            <GrantDetailDocumentsModule code={params.code} />
          </Route>
          {/* Performance Framework */}
          <Route
            path={`/grant/${params.code}/${params.period}/performance-framework`}
          >
            <PerformanceFrameworkModule
              code={params.code}
              toolboxOpen={openToolboxPanel}
              implementationPeriod={params.period}
              setOpenToolboxPanel={setOpenToolboxPanel}
            />
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
        isGrantDetail
        open={openToolboxPanel}
        filterGroups={filtergroups}
        vizWrapperRef={vizWrapperRef}
        onCloseBtnClick={(value?: boolean) => {
          if (value !== undefined) {
            setOpenToolboxPanel(value);
          } else {
            setOpenToolboxPanel(!openToolboxPanel);
          }
        }}
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
