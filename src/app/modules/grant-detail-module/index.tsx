/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
  Link,
  Switch,
  Route,
  useParams,
  Redirect,
  useLocation,
} from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { InformationPanel } from "app/components/InformationPanel";
import { grantDetailTabs } from "app/components/PageHeader/components/tabs/data";
import {
  GrantDetailPeriod,
  GrantDetailPeriodInformation,
  GrantInfoContent,
} from "app/modules/grant-detail-module/components/InfoContent";
import { filtergroups } from "app/components/ToolBoxPanel/components/filters/data";
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
  const location = useLocation();
  const params = useParams<{ code: string; period: string; vizType: string }>();
  const [openInfoPanel, setOpenInfoPanel] = React.useState(true);
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);

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
  const grantPeriodsData = useStoreState(
    (state) =>
      get(state.GrantDetailPeriods.data, "data", []) as GrantDetailPeriod[]
  );
  const fetchGrantPeriodInfoData = useStoreActions(
    (store) => store.GrantDetailPeriodInfo.fetch
  );
  const grantPeriodInfoData = useStoreState(
    (state) =>
      get(state.GrantDetailPeriodInfo.data, "data[0]", {
        disbursed: 0,
        committed: 0,
        signed: 0,
        rating: "",
      }) as GrantDetailPeriodInformation
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
        title={grantInfoData.title}
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
            name: params.code,
          },
        ]}
        tabs={grantDetailTabs}
      />
      <div css="width: 100%;height: 25px;" />
      <Switch>
        <Route
          exact
          path={`/grant/${params.code}/${params.period}/investments`}
        >
          <Redirect to={`/grant/${params.code}/investments/disbursements`} />
        </Route>
        <Route path={`/grant/${params.code}/${params.period}/budgets/flow`}>
          <GrantDetailBudgetsFlowWrapper
            code={params.code}
            implementationPeriod={params.period}
          />
        </Route>
        <Route
          path={`/grant/${params.code}/${params.period}/budgets/time-cycle`}
        >
          <GrantDetailGenericBudgetsTimeCycleWrapper
            code={params.code}
            implementationPeriod={params.period}
          />
        </Route>
        <Route
          path={`/grant/${params.code}/${params.period}/performance-rating`}
        >
          <PerformanceRatingModule
            code={params.code}
            implementationPeriod={params.period}
          />
        </Route>
        <Route
          path={`/grant/${params.code}/${params.period}/investments/disbursements`}
        >
          <GrantDetailInvestmentsDisbursedWrapper
            code={params.code}
            implementationPeriod={params.period}
          />
        </Route>
        <Route
          path={`/grant/${params.code}/${params.period}/investments/table`}
        >
          <GrantDetailInvestmentsTableWrapper
            code={params.code}
            implementationPeriod={params.period}
          />
        </Route>
        <Route
          path={`/grant/${params.code}/${params.period}/investments/time-cycle`}
        >
          <GrantDetailInvestmentsTimeCycleWrapper
            code={params.code}
            implementationPeriod={params.period}
          />
        </Route>
        <Route path={`/grant/${params.code}/${params.period}/documents`}>
          <GrantDetailDocumentsModule code={params.code} />
        </Route>
        <Route
          path={`/grant/${params.code}/${params.period}/performance-framework`}
        >
          <PerformanceFrameworkModule
            code={params.code}
            implementationPeriod={params.period}
          />
        </Route>
      </Switch>
      <InformationPanel
        open={openInfoPanel}
        buttonLabel="Overview"
        onButtonClick={() => setOpenInfoPanel(!openInfoPanel)}
      >
        <GrantInfoContent
          {...grantInfoData}
          periods={grantPeriodsData}
          rating={grantPeriodInfoData.rating}
          investments={{
            disbursed: grantPeriodInfoData.disbursed,
            committed: grantPeriodInfoData.committed,
            signed: grantPeriodInfoData.signed,
          }}
        />
      </InformationPanel>
      <ToolBoxPanel
        isGrantDetail
        open={openToolboxPanel}
        filterGroups={filtergroups}
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
