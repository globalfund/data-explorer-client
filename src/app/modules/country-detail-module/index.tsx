/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle } from "react-use";
import { useMediaQuery } from "@material-ui/core";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { Switch, Route, useParams, useLocation } from "react-router-dom";
/* project */
import GrantsModule from "app/modules/grants-module";
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { BudgetsGeoMap } from "app/modules/viz-module/sub-modules/budgets/geomap";
import { countryDetailTabs } from "app/components/PageHeader/components/tabs/data";
import { AllocationsModule } from "app/modules/viz-module/sub-modules/allocations";
import { LocationGrants } from "app/modules/country-detail-module/sub-modules/grants";
import { InvestmentsGeoMap } from "app/modules/viz-module/sub-modules/investments/geomap";
import { LocationDetailOverviewModule } from "app/modules/country-detail-module/sub-modules/overview";
import { LocationDetailDocumentsModule } from "app/modules/country-detail-module/sub-modules/documents";
import { LocationDetailEligibilityWrapper } from "app/modules/viz-module/sub-modules/eligibility/data-wrappers/location";
import { GenericInvestmentsTableWrapper } from "app/modules/viz-module/sub-modules/investments/table/data-wrappers/generic";
import { LocationEligibilityTableWrapper } from "app/modules/viz-module/sub-modules/eligibility/table/data-wrappers/location";
import { LocationDetailBudgetsFlowWrapper } from "app/modules/viz-module/sub-modules/budgets/flow/data-wrappers/locationDetail";
import { GenericInvestmentsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/investments/time-cycle/data-wrappers/generic";
import { LocationDetailGenericBudgetsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/budgets/time-cycle/data-wrappers/locationDetail";
import { LocationDetailInvestmentsDisbursedWrapper } from "app/modules/viz-module/sub-modules/investments/disbursed/data-wrappers/locationDetail";
import {
  filtergroups,
  pathnameToFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";

export default function CountryDetail() {
  useTitle("The Data Explorer - Location");
  const location = useLocation();
  const datasetMenuItems = useDatasetMenuItems();
  const params = useParams<{ code: string; vizType: string }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(true);

  // api call & data
  const fetchLocationInfoData = useStoreActions(
    (store) => store.LocationDetailInfo.fetch
  );
  const locationInfoData = useStoreState((state) =>
    get(state.LocationDetailInfo.data, "data[0]", {
      id: "",
      locationName: "",
      disbursed: 0,
      committed: 0,
      signed: 0,
      countries: [],
      multicountries: [],
      portfolioManager: "",
      portfolioManagerEmail: "",
    })
  );
  const clearEligibilityData = useStoreActions(
    (store) => store.EligibilityCountry.clear
  );

  const paramCode = params.code.replace(/\|/g, "/");

  React.useEffect(() => {
    document.body.style.background = "#fff";
    fetchLocationInfoData({
      filterString: `locations=${paramCode}`,
    });

    return () => clearEligibilityData();
  }, [paramCode]);

  React.useEffect(() => {
    setOpenToolboxPanel(true);
  }, [params.vizType]);

  let pushValue = 0;
  const widthThreshold = (window.innerWidth - 1280) / 2;

  if (widthThreshold > 420) {
    pushValue = 0;
  } else if (widthThreshold < 0) {
    pushValue = 0;
  } else {
    pushValue = 500 - widthThreshold;
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
        title={locationInfoData.locationName}
        breadcrumbs={[
          { name: "Home", link: "/" },
          {
            name: "Datasets",
            menuitems: datasetMenuItems,
          },
          {
            name: locationInfoData.locationName,
          },
        ]}
        tabs={countryDetailTabs}
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
          {/* Overview */}
          <Route path={`/location/${params.code}/overview`}>
            <LocationDetailOverviewModule code={params.code} />
          </Route>
          {/* Budgets */}
          <Route path={`/location/${params.code}/budgets/flow`}>
            <LocationDetailBudgetsFlowWrapper
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/${params.code}/budgets/time-cycle`}>
            <LocationDetailGenericBudgetsTimeCycleWrapper
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/${params.code}/budgets/geomap`}>
            <BudgetsGeoMap code={paramCode} detailFilterType="locations" />
          </Route>
          {/* Disbursements */}
          <Route path={`/location/${params.code}/disbursements/treemap`}>
            <LocationDetailInvestmentsDisbursedWrapper
              code={paramCode}
              type="Disbursed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/${params.code}/disbursements/table`}>
            <GenericInvestmentsTableWrapper code={paramCode} />
          </Route>
          <Route path={`/location/${params.code}/disbursements/time-cycle`}>
            <GenericInvestmentsTimeCycleWrapper
              type="Disbursed"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/${params.code}/disbursements/geomap`}>
            <InvestmentsGeoMap
              type="Disbursed"
              code={paramCode}
              detailFilterType="locations"
            />
          </Route>
          {/* Signed */}
          <Route path={`/location/${params.code}/signed/treemap`}>
            <LocationDetailInvestmentsDisbursedWrapper
              code={paramCode}
              type="Signed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/${params.code}/signed/table`}>
            <GenericInvestmentsTableWrapper code={paramCode} />
          </Route>
          <Route path={`/location/${params.code}/signed/time-cycle`}>
            <GenericInvestmentsTimeCycleWrapper
              type="Signed"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/${params.code}/signed/geomap`}>
            <InvestmentsGeoMap
              type="Signed"
              code={paramCode}
              detailFilterType="locations"
            />
          </Route>
          {/* Commitment */}
          <Route path={`/location/${params.code}/commitment/treemap`}>
            <LocationDetailInvestmentsDisbursedWrapper
              code={paramCode}
              type="Commitment"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/${params.code}/commitment/table`}>
            <GenericInvestmentsTableWrapper code={paramCode} />
          </Route>
          <Route path={`/location/${params.code}/commitment/time-cycle`}>
            <GenericInvestmentsTimeCycleWrapper
              type="Commitment"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/${params.code}/commitment/geomap`}>
            <InvestmentsGeoMap
              type="Committed"
              code={paramCode}
              detailFilterType="locations"
            />
          </Route>
          {/* Allocations */}
          <Route path={`/location/${params.code}/allocation`}>
            <AllocationsModule
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          {/* Eligibility */}
          <Route path={`/location/${params.code}/eligibility/table`}>
            <LocationEligibilityTableWrapper code={paramCode} />
          </Route>
          <Route path={`/location/${params.code}/eligibility`}>
            <LocationDetailEligibilityWrapper code={paramCode} />
          </Route>
          {/* Grants */}
          <Route path={`/location/${params.code}/grants/list`}>
            <GrantsModule code={paramCode} detailFilterType="locations" />
          </Route>
          <Route path={`/location/${params.code}/grants`}>
            <LocationGrants code={paramCode} detailFilterType="locations" />
          </Route>
          {/* Documents */}
          <Route path={`/location/${params.code}/documents`}>
            <LocationDetailDocumentsModule
              mcName={params.code}
              isMultiCountry={params.code.length > 3}
              code={params.code.length > 3 ? locationInfoData.id : params.code}
            />
          </Route>
        </Switch>
      </div>
      <ToolBoxPanel
        open={openToolboxPanel}
        filterGroups={get(
          pathnameToFilterGroups,
          location.pathname.replace(params.code, "<code>"),
          filtergroups
        )}
        onCloseBtnClick={() => setOpenToolboxPanel(!openToolboxPanel)}
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
          opacity: ${openToolboxPanel && widthThreshold < 0 ? 1 : 0};
          visibility: ${openToolboxPanel && widthThreshold < 0
            ? "visible"
            : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
