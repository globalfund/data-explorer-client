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
import GrantsModule from "app/modules/grants-module";
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { InformationPanel } from "app/components/InformationPanel";
import { countryDetailTabs } from "app/components/PageHeader/components/tabs/data";
import { AllocationsModule } from "app/modules/viz-module/sub-modules/allocations";
import { InvestmentsGeoMap } from "app/modules/viz-module/sub-modules/investments/geomap";
import { LocationInfoContent } from "app/modules/country-detail-module/components/InfoContent";
import { LocationDetailDocumentsModule } from "app/modules/country-detail-module/sub-modules/documents";
import { LocationDetailEligibilityWrapper } from "app/modules/viz-module/sub-modules/eligibility/data-wrappers/location";
import { LocationDetailBudgetsFlowWrapper } from "app/modules/viz-module/sub-modules/budgets/flow/data-wrappers/locationDetail";
import { GenericInvestmentsDisbursedWrapper } from "app/modules/viz-module/sub-modules/investments/disbursed/data-wrappers/generic";
import { GenericInvestmentsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/investments/time-cycle/data-wrappers/generic";
import { LocationDetailGenericBudgetsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/budgets/time-cycle/data-wrappers/locationDetail";
import {
  filtergroups,
  pathnameToFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";

export default function CountryDetail() {
  useTitle("The Data Explorer - Location");
  const location = useLocation();
  const params = useParams<{ code: string; vizType: string }>();
  const [openInfoPanel, setOpenInfoPanel] = React.useState(false);
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);

  // api call & data
  const fetchLocationInfoData = useStoreActions(
    (store) => store.LocationDetailInfo.fetch
  );
  const locationInfoData = useStoreState((state) =>
    get(state.LocationDetailInfo.data, "data[0]", {
      locationName: "",
      disbursed: 0,
      committed: 0,
      signed: 0,
      multicountries: [],
      portfolioManager: "",
      portfolioManagerEmail: "",
    })
  );

  React.useEffect(() => {
    document.body.style.background = "#fff";
    fetchLocationInfoData({
      filterString: `locations=${params.code}`,
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
        title={locationInfoData.locationName}
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
            name: locationInfoData.locationName,
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
          <LocationDetailBudgetsFlowWrapper code={params.code} />
        </Route>
        <Route path={`/location/${params.code}/budgets/time-cycle`}>
          <LocationDetailGenericBudgetsTimeCycleWrapper code={params.code} />
        </Route>
        <Route path={`/location/${params.code}/investments/disbursements`}>
          <GenericInvestmentsDisbursedWrapper code={params.code} />
        </Route>
        <Route path={`/location/${params.code}/investments/time-cycle`}>
          <GenericInvestmentsTimeCycleWrapper code={params.code} />
        </Route>
        <Route path={`/location/${params.code}/investments/geomap`}>
          <InvestmentsGeoMap code={params.code} />
        </Route>
        <Route path={`/location/${params.code}/allocation`}>
          <AllocationsModule code={params.code} />
        </Route>
        <Route path={`/location/${params.code}/eligibility`}>
          <LocationDetailEligibilityWrapper code={params.code} />
        </Route>
        <Route path={`/location/${params.code}/documents`}>
          <LocationDetailDocumentsModule code={params.code} />
        </Route>
        <Route path={`/location/${params.code}/grants`}>
          <GrantsModule code={params.code} />
        </Route>
      </Switch>
      <InformationPanel
        open={openInfoPanel}
        onButtonClick={() => setOpenInfoPanel(!openInfoPanel)}
      >
        <LocationInfoContent
          title={locationInfoData.locationName}
          code={params.code}
          investments={{
            disbursed: locationInfoData.disbursed,
            committed: locationInfoData.committed,
            signed: locationInfoData.signed,
          }}
          multicountries={locationInfoData.multicountries}
          manager={{
            name: locationInfoData.portfolioManager,
            email: locationInfoData.portfolioManagerEmail,
          }}
        />
      </InformationPanel>
      <ToolBoxPanel
        open={openToolboxPanel}
        filterGroups={get(
          pathnameToFilterGroups,
          location.pathname.replace(params.code, "<code>"),
          filtergroups
        )}
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
