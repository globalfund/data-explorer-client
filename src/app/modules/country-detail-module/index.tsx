/* third-party */
import React from "react";
import { Link, Switch, Route, useParams, Redirect } from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { GrantsViz } from "app/components/Charts/Grants";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { DocumentsSubModule } from "app/modules/common/documents";
import { InformationPanel } from "app/components/InformationPanel";
import { ScatterPlot } from "app/components/Charts/Eligibility/Scatterplot";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { countryDetailTabs } from "app/components/PageHeader/components/tabs/data";
import { AllocationsModule } from "app/modules/viz-module/sub-modules/allocations";
import { BudgetsFlowModule } from "app/modules/viz-module/sub-modules/budgets/flow";
import { InvestmentsGeoMap } from "app/modules/viz-module/sub-modules/investments/geomap";
import { LocationInfoContent } from "app/modules/country-detail-module/components/InfoContent";
import { BudgetsTimeCycleModule } from "app/modules/viz-module/sub-modules/budgets/time-cycle";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";
import { InvestmentsTimeCycleModule } from "app/modules/viz-module/sub-modules/investments/time-cycle";

export default function CountryDetail() {
  const params = useParams<{ code: string; vizType: string }>();
  const [openInfoPanel, setOpenInfoPanel] = React.useState(false);
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
        title={params.code}
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
        tabs={countryDetailTabs}
      />
      <div css="width: 100%;height: 25px;" />
      <Switch>
        <Route exact path={`/location/${params.code}/investments`}>
          <Redirect to={`/location/${params.code}/investments/disbursements`} />
        </Route>
        <Route path={`/location/${params.code}/budgets/flow`}>
          <BudgetsFlowModule />
        </Route>
        <Route path={`/location/${params.code}/budgets/time-cycle`}>
          <BudgetsTimeCycleModule />
        </Route>
        <Route path={`/location/${params.code}/investments/disbursements`}>
          <InvestmentsDisbursedModule data={mockdata2} />
        </Route>
        <Route path={`/location/${params.code}/investments/time-cycle`}>
          <InvestmentsTimeCycleModule />
        </Route>
        <Route path={`/location/${params.code}/investments/geomap`}>
          <InvestmentsGeoMap />
        </Route>
        <Route path={`/location/${params.code}/allocation`}>
          <AllocationsModule />
        </Route>
        <Route path={`/location/${params.code}/eligibility`}>
          <ScatterPlot />
        </Route>
        <Route path={`/location/${params.code}/grants`}>
          <GrantsViz />
        </Route>
        <Route path={`/location/${params.code}/documents`}>
          <DocumentsSubModule />
        </Route>
      </Switch>
      <InformationPanel
        open={openInfoPanel}
        onButtonClick={() => setOpenInfoPanel(!openInfoPanel)}
      >
        <LocationInfoContent
          title={params.code}
          code={params.code}
          investments={{ disbursed: 0, committed: 0, signed: 0 }}
          multicountries={[{ name: "MC A", code: "MC_A" }]}
          manager={{
            name: "Manager A",
            email: "manager@mca.org",
          }}
        />
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
