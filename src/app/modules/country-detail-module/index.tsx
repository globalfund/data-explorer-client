/* third-party */
import React from "react";
import get from "lodash/get";
import { useMediaQuery } from "@material-ui/core";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { Switch, Route, useParams, useLocation } from "react-router-dom";
/* project */
import GrantsModule from "app/modules/grants-module";
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { PageLoader } from "app/modules/common/page-loader";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { MobileViewControl } from "app/components/Mobile/ViewsControl";
import { useGetAllAvailableGrants } from "app/hooks/useGetAllAvailableGrants";
import { BudgetsGeoMap } from "app/modules/viz-module/sub-modules/budgets/geomap";
import { countryDetailTabs } from "app/components/PageHeader/components/tabs/data";
import { AllocationsModule } from "app/modules/viz-module/sub-modules/allocations";
import { LocationGrants } from "app/modules/country-detail-module/sub-modules/grants";
import { LocationResults } from "app/modules/country-detail-module/sub-modules/results";
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
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

export default function CountryDetail() {
  useTitle("The Data Explorer - Location");
  const location = useLocation();
  const vizWrapperRef = React.useRef(null);
  const datasetMenuItems = useDatasetMenuItems();
  const [search, setSearch] = React.useState("");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{
    code: string;
    vizType: string;
    subType?: string;
  }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(
    !isMobile && params.vizType !== "overview"
  );
  const { getAllAvailableGrants, loading } = useGetAllAvailableGrants(
    search,
    params.code,
    "locations"
  );

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
  const countrySummaryCMSAction = useStoreActions(
    (actions) => actions.cms.countrySummary.post
  );
  const clearCountrySummaryCMS = useStoreActions(
    (store) => store.cms.countrySummary.clear
  );
  const notesDisclaimersCMSAction = useStoreActions(
    (actions) => actions.cms.notesAndDisclaimers.post
  );
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const paramCode = params.code.replace(/\|/g, "/");

  React.useEffect(() => {
    if (location.pathname.indexOf("/overview") === -1) {
      document.body.style.background = "#fff";
    }
    countrySummaryCMSAction({
      values: {
        filter: { iso3: paramCode },
      },
    });
    notesDisclaimersCMSAction({
      values: {
        filter: { type: "COUNTRY_SUMMARY" },
      },
    });

    return () => {
      clearEligibilityData();
      clearCountrySummaryCMS();
    };
  }, [paramCode]);

  React.useEffect(() => {
    if (!isMobile && !openToolboxPanel && params.vizType !== "overview") {
      setOpenToolboxPanel(true);
    }
  }, [params.vizType]);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters({
      ...appliedFilters,
      locations: [paramCode],
    });
    fetchLocationInfoData({ filterString });
  }, [paramCode, appliedFilters]);

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
      {loading && <PageLoader />}
      <PageHeader
        isDetail
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
        tabs={
          params.code.length === 3
            ? countryDetailTabs
            : countryDetailTabs.slice(0, countryDetailTabs.length - 1)
        }
      />
      <PageTopSpacer />
      {isMobile && (
        <React.Fragment>
          <MobileViewControl
            tabs={
              params.code.length === 3
                ? countryDetailTabs
                : countryDetailTabs.slice(0, countryDetailTabs.length - 1)
            }
          />
          <div
            css={`
              width: 100%;
              height: ${params.vizType === "grants" && !params.subType
                ? "5px"
                : "25px"};
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
          <Route path={`/location/:code/overview`}>
            <LocationDetailOverviewModule openToolboxPanel={openToolboxPanel} />
          </Route>
          {/* Budgets */}
          <Route path={`/location/:code/budgets/flow`}>
            <LocationDetailBudgetsFlowWrapper
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/:code/budgets/time-cycle`}>
            <LocationDetailGenericBudgetsTimeCycleWrapper
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/:code/budgets/map`}>
            <BudgetsGeoMap code={paramCode} detailFilterType="locations" />
          </Route>
          {/* Disbursements */}
          <Route path={`/location/:code/disbursements/treemap`}>
            <LocationDetailInvestmentsDisbursedWrapper
              code={paramCode}
              type="Disbursed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/:code/disbursements/table`}>
            <GenericInvestmentsTableWrapper code={paramCode} />
          </Route>
          <Route path={`/location/:code/disbursements/time-cycle`}>
            <GenericInvestmentsTimeCycleWrapper
              type="Disbursed"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/:code/disbursements/map`}>
            <InvestmentsGeoMap
              type="Disbursed"
              code={paramCode}
              detailFilterType="locations"
            />
          </Route>
          {/* Signed */}
          <Route path={`/location/:code/signed/treemap`}>
            <LocationDetailInvestmentsDisbursedWrapper
              code={paramCode}
              type="Signed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/:code/signed/table`}>
            <GenericInvestmentsTableWrapper code={paramCode} />
          </Route>
          {/* <Route path={`/location/:code/signed/time-cycle`}>
            <GenericInvestmentsTimeCycleWrapper
              type="Signed"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route> */}
          <Route path={`/location/:code/signed/map`}>
            <InvestmentsGeoMap
              type="Signed"
              code={paramCode}
              detailFilterType="locations"
            />
          </Route>
          {/* Commitment */}
          <Route path={`/location/:code/commitment/treemap`}>
            <LocationDetailInvestmentsDisbursedWrapper
              code={paramCode}
              type="Commitment"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/:code/commitment/table`}>
            <GenericInvestmentsTableWrapper code={paramCode} />
          </Route>
          <Route path={`/location/:code/commitment/time-cycle`}>
            <GenericInvestmentsTimeCycleWrapper
              type="Commitment"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/location/:code/commitment/map`}>
            <InvestmentsGeoMap
              type="Committed"
              code={paramCode}
              detailFilterType="locations"
            />
          </Route>
          {/* Allocations */}
          <Route path={`/location/:code/allocations`}>
            <AllocationsModule
              code={paramCode}
              toolboxOpen={openToolboxPanel}
              setOpenToolboxPanel={setOpenToolboxPanel}
            />
          </Route>
          {/* Eligibility */}
          <Route path={`/location/:code/eligibility/table`}>
            <LocationEligibilityTableWrapper code={paramCode} />
          </Route>
          <Route path={`/location/:code/eligibility`}>
            <LocationDetailEligibilityWrapper code={paramCode} />
          </Route>
          {/* Grants */}
          <Route path={`/location/:code/grants/list`}>
            <GrantsModule
              search={search}
              code={paramCode}
              setSearch={setSearch}
              detailFilterType="locations"
            />
          </Route>
          <Route path={`/location/:code/grants`}>
            <LocationGrants code={paramCode} detailFilterType="locations" />
          </Route>
          {/* Results */}
          <Route path={`/location/:code/results`}>
            <LocationResults code={paramCode} detailFilterType="locations" />
          </Route>
          {/* Documents */}
          <Route path={`/location/:code/documents`}>
            <LocationDetailDocumentsModule
              mcName={params.code}
              isMultiCountry={params.code.length > 3}
              code={params.code.length > 3 ? locationInfoData.id : params.code}
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
        isLocationDetail
        open={openToolboxPanel}
        vizWrapperRef={vizWrapperRef}
        filterGroups={get(
          pathnameToFilterGroups,
          location.pathname.replace(params.code, "<code>"),
          filtergroups
        )}
        onCloseBtnClick={(value?: boolean) =>
          setOpenToolboxPanel(value !== undefined ? value : !openToolboxPanel)
        }
        getAllAvailableGrants={
          params.vizType === "grants" && params.subType === "list"
            ? getAllAvailableGrants
            : undefined
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
