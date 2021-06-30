/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { Link, Switch, Route, useParams, Redirect } from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { InformationPanel } from "app/components/InformationPanel";
import { grantDetailTabs } from "app/components/PageHeader/components/tabs/data";
import { GrantInfoContent } from "app/modules/grant-detail-module/components/InfoContent";
import { PerformanceRatingModule } from "app/modules/grant-detail-module/components/sub-modules/performance-rating";
import { PerformanceFrameworkModule } from "app/modules/grant-detail-module/components/sub-modules/performance-framework";
import { GrantDetailBudgetsFlowWrapper } from "app/modules/viz-module/sub-modules/budgets/flow/data-wrappers/grantDetail";
import { GrantDetailGenericBudgetsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/budgets/time-cycle/data-wrappers/grantDetail";
import { GrantDetailInvestmentsDisbursedWrapper } from "app/modules/viz-module/sub-modules/investments/disbursed/data-wrappers/grantDetail";
import { GrantDetailInvestmentsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/investments/time-cycle/data-wrappers/grantDetail";
import { GrantDetailDocumentsModule } from "./components/sub-modules/documents";

export default function GrantDetail() {
  useTitle("The Data Explorer - Grant");
  const params = useParams<{ code: string; period: string; vizType: string }>();
  const [openInfoPanel, setOpenInfoPanel] = React.useState(false);
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
  // const links = useStoreState(
  //   (state) =>
  //     get(state.BudgetsFlow.data, "links", []) as {
  //       value: number;
  //       source: string;
  //       target: string;
  //     }[]
  // );

  React.useEffect(() => {
    document.body.style.background = "#fff";
    fetchGrantInfoData({
      filterString: `grantNumber=${params.code}`,
    });
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
          <GrantDetailBudgetsFlowWrapper code={params.code} />
        </Route>
        <Route
          path={`/grant/${params.code}/${params.period}/budgets/time-cycle`}
        >
          <GrantDetailGenericBudgetsTimeCycleWrapper code={params.code} />
        </Route>
        <Route
          path={`/grant/${params.code}/${params.period}/performance-rating`}
        >
          <PerformanceRatingModule code={params.code} />
        </Route>
        <Route
          path={`/grant/${params.code}/${params.period}/investments/disbursements`}
        >
          <GrantDetailInvestmentsDisbursedWrapper code={params.code} />
        </Route>
        <Route
          path={`/grant/${params.code}/${params.period}/investments/time-cycle`}
        >
          <GrantDetailInvestmentsTimeCycleWrapper code={params.code} />
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
        onButtonClick={() => setOpenInfoPanel(!openInfoPanel)}
      >
        <GrantInfoContent {...grantInfoData} />
      </InformationPanel>
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
