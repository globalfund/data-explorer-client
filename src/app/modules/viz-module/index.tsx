/* third-party */
import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import findIndex from "lodash/findIndex";
import Cancel from "@material-ui/icons/Cancel";
import { useUnmount, useUpdateEffect } from "react-use";
import { Container, IconButton, useMediaQuery } from "@material-ui/core";
import { Switch, Route, useParams, useLocation } from "react-router-dom";
/* project */
import GrantsModule from "app/modules/grants-module";
import { PageHeader } from "app/components/PageHeader";
import ResultsModule from "app/modules/results-module";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import DocumentsModule from "app/modules/documents-module";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { MobileViewControl } from "app/components/Mobile/ViewsControl";
import { useDatasourcesDatasets } from "app/hooks/useDatasourcesDatasets";
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
  exploreTabs,
  TabProps,
} from "app/components/PageHeader/components/tabs/data";
import {
  filtergroups,
  pathnameToFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";

export default function VizModule() {
  const location = useLocation();
  const vizWrapperRef = React.useRef(null);
  const datasetMenuItems = useDatasetMenuItems();
  const { mappedDatasets } = useDatasourcesDatasets();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{ vizType: string; subType?: string }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(!isMobile);

  React.useEffect(() => {
    document.body.style.background = "#fff";
  }, []);

  React.useEffect(() => {
    if (!isMobile && !openToolboxPanel) {
      setOpenToolboxPanel(true);
    }
  }, [location.pathname]);

  useUpdateEffect(() => setOpenToolboxPanel(!isMobile), [isMobile]);

  const enabledTabs = filter(
    exploreTabs,
    (tab) => findIndex(mappedDatasets, (dt: string) => dt === tab.name) > -1
  ) as TabProps[];

  let pushValue = 0;
  const widthThreshold = (window.innerWidth - 1280) / 2;

  if (widthThreshold > 420) {
    pushValue = 0;
  } else if (widthThreshold < 0) {
    pushValue = 0;
  } else {
    pushValue = 420 - widthThreshold;
  }

  const showDatasourceSnackbar = useStoreState(
    (state) => state.DataSourceSnackbarVisibility.value
  );
  const setShowDatasourceSnackbar = useStoreActions(
    (store) => store.DataSourceSnackbarVisibility.setValue
  );

  useUnmount(() => {
    setShowDatasourceSnackbar(false);
  });

  function closeDatasourceSnackbar() {
    setShowDatasourceSnackbar(false);
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
        title="GF Dataset"
        // partialTitle={params.vizType.replace("-", " & ")}
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
        tabs={enabledTabs}
      />
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
          <Route path="/explore/budgets/flow">
            <GenericBudgetsFlowWrapper
              toolboxOpen={openToolboxPanel}
              setOpenToolboxPanel={setOpenToolboxPanel}
            />
          </Route>
          <Route path="/explore/budgets/time-cycle">
            <GenericBudgetsTimeCycleWrapper
              toolboxOpen={openToolboxPanel}
              setOpenToolboxPanel={setOpenToolboxPanel}
            />
          </Route>
          <Route path="/explore/budgets/map">
            <BudgetsGeoMap />
          </Route>
          {/* Disbursements */}
          <Route path="/explore/disbursements/treemap">
            <GenericInvestmentsDisbursedWrapper
              type="Disbursed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/explore/disbursements/table">
            <GenericInvestmentsTableWrapper />
          </Route>
          <Route path="/explore/disbursements/time-cycle">
            <GenericInvestmentsTimeCycleWrapper
              type="Disbursed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/explore/disbursements/map">
            <InvestmentsGeoMap type="Disbursed" />
          </Route>
          {/* Signed */}
          <Route path="/explore/signed/treemap">
            <GenericInvestmentsDisbursedWrapper
              type="Signed"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/explore/signed/table">
            <GenericInvestmentsTableWrapper />
          </Route>
          {/* <Route path="/explore/signed/time-cycle">
            <GenericInvestmentsTimeCycleWrapper
              type="Signed"
              toolboxOpen={openToolboxPanel}
            />
          </Route> */}
          <Route path="/explore/signed/map">
            <InvestmentsGeoMap type="Signed" />
          </Route>
          {/* Commitment */}
          <Route path="/explore/commitment/treemap">
            <GenericInvestmentsDisbursedWrapper
              type="Commitment"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/explore/commitment/table">
            <GenericInvestmentsTableWrapper />
          </Route>
          <Route path="/explore/commitment/time-cycle">
            <GenericInvestmentsTimeCycleWrapper
              type="Commitment"
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path="/explore/commitment/map">
            <InvestmentsGeoMap type="Committed" />
          </Route>
          {/* Allocations */}
          <Route path="/explore/allocations/map">
            <AllocationsGeoMap />
          </Route>
          <Route path="/explore/allocations">
            <AllocationsModule
              toolboxOpen={openToolboxPanel}
              setOpenToolboxPanel={setOpenToolboxPanel}
            />
          </Route>
          {/* Pledges & Contributions */}
          <Route path="/explore/pledges-contributions/time-cycle">
            <PledgesContributionsTimeCycleModule
              toolboxOpen={openToolboxPanel}
              setOpenToolboxPanel={setOpenToolboxPanel}
            />
          </Route>
          <Route path="/explore/pledges-contributions/table">
            <PledgesContributionsTable />
          </Route>
          <Route path="/explore/pledges-contributions/map">
            <PledgesContributionsGeoMap />
          </Route>
          <Route path="/explore/pledges-contributions/treemap">
            <PledgesContributionsTreemap />
          </Route>
          {/* Eligibility */}
          <Route path="/explore/eligibility/table">
            <GenericEligibilityWrapper />
          </Route>
          <Route path="/explore/eligibility">
            <EligibilityModule />
          </Route>
          {/* Grants */}
          <Route exact path="/explore/grants">
            <GrantsModule hideHeader />
          </Route>
          {/* Results */}
          <Route exact path="/explore/results">
            <ResultsModule hideHeader />
          </Route>
          {/* Documents */}
          <Route exact path="/explore/documents">
            <DocumentsModule hideHeader />
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
      {showDatasourceSnackbar && (
        <div
          css={`
            left: 0;
            bottom: 0;
            z-index: 21;
            width: 100vw;
            height: 48px;
            position: fixed;
            background: #fff;
            box-shadow: 0px 0px 10px rgb(152 161 170 / 60%);
          `}
        >
          <Container
            maxWidth="lg"
            css={`
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <div
              css={`
                display: flex;
                font-size: 16px;
                align-items: center;

                > svg {
                  margin-right: 12px;
                }
              `}
            >
              <svg width="32" height="32" viewBox="0 0 32 32">
                <g clip-path="url(#clip0_8_7055)">
                  <path
                    fill="#73d3cd"
                    d="M32 16C32 20.2435 30.3143 24.3131 27.3137 27.3137C24.3131 30.3143 20.2435 32 16 32C11.7565 32 7.68687 30.3143 4.68629 27.3137C1.68571 24.3131 0 20.2435 0 16C0 11.7565 1.68571 7.68687 4.68629 4.68629C7.68687 1.68571 11.7565 0 16 0C20.2435 0 24.3131 1.68571 27.3137 4.68629C30.3143 7.68687 32 11.7565 32 16ZM24.06 9.94C23.9171 9.79764 23.747 9.68555 23.5599 9.61043C23.3727 9.53531 23.1723 9.49872 22.9706 9.50282C22.769 9.50693 22.5703 9.55166 22.3863 9.63434C22.2023 9.71701 22.0369 9.83594 21.9 9.984L14.954 18.834L10.768 14.646C10.4837 14.381 10.1076 14.2368 9.71896 14.2437C9.33035 14.2505 8.95958 14.4079 8.68476 14.6828C8.40993 14.9576 8.25251 15.3284 8.24565 15.717C8.23879 16.1056 8.38304 16.4817 8.648 16.766L13.94 22.06C14.0826 22.2023 14.2523 22.3144 14.4392 22.3897C14.626 22.465 14.8261 22.5018 15.0275 22.4981C15.2289 22.4944 15.4275 22.4501 15.6114 22.368C15.7953 22.2858 15.9608 22.1675 16.098 22.02L24.082 12.04C24.3542 11.757 24.5046 11.3786 24.5008 10.9859C24.4971 10.5933 24.3395 10.2178 24.062 9.94H24.06Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_8_7055">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Awesome! You selected a dataset. Now on, you can start to explore
              the data!
            </div>
            <IconButton onClick={closeDatasourceSnackbar}>
              <Cancel htmlColor="#231d2c" />
            </IconButton>
          </Container>
        </div>
      )}
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
