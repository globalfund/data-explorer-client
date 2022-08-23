/* third-party */
import React from "react";
import get from "lodash/get";
import { useMediaQuery } from "@material-ui/core";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import {
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
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
import { MobileViewControl } from "app/components/Mobile/ViewsControl";
import { BudgetsGeoMap } from "app/modules/viz-module/sub-modules/budgets/geomap";
import { partnerDetailTabs } from "app/components/PageHeader/components/tabs/data";
import { LocationGrants } from "app/modules/country-detail-module/sub-modules/grants";
import { InvestmentsGeoMap } from "app/modules/viz-module/sub-modules/investments/geomap";
import { PartnerDetailBudgetsFlowWrapper } from "app/modules/viz-module/sub-modules/budgets/flow/data-wrappers/partnerDetail";
import { PartnerInvestmentsTableWrapper } from "app/modules/viz-module/sub-modules/investments/table/data-wrappers/partnerDetail";
import { PartnerDetailGenericBudgetsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/budgets/time-cycle/data-wrappers/partnerDetail";
import { PartnerDetailInvestmentsDisbursedWrapper } from "app/modules/viz-module/sub-modules/investments/disbursed/data-wrappers/partnerDetail";
import { PartnerDetailInvestmentsTimeCycleWrapper } from "app/modules/viz-module/sub-modules/investments/time-cycle/data-wrappers/partnerDetail";
import {
  filtergroups,
  pathnameToFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";

export default function PartnerDetail() {
  useTitle("The Data Explorer - Partner");
  const location = useLocation();
  const vizWrapperRef = React.useRef(null);
  const datasetMenuItems = useDatasetMenuItems();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(!isMobile);
  const params = useParams<{
    code: string;
    vizType: string;
    subType?: string;
  }>();

  // api call & data
  const fetchPartnerInfoData = useStoreActions(
    (store) => store.PartnerDetailInfo.fetch
  );
  const partnerInfoData = useStoreState((state) =>
    get(state.PartnerDetailInfo.data, "data", {
      partnerName: "",
    })
  );

  const paramCode = params.code.replace(/\|/g, "/");

  React.useEffect(() => {
    document.body.style.background = "#fff";
    fetchPartnerInfoData({
      filterString: `partners=${paramCode}`,
    });
  }, [paramCode]);

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
        title={partnerInfoData.partnerName}
        breadcrumbs={[
          { name: "Home", link: "/" },
          {
            name: "Datasets",
            menuitems: datasetMenuItems,
          },
          {
            name: partnerInfoData.partnerName,
          },
        ]}
        tabs={partnerDetailTabs}
      />
      <PageTopSpacer />
      {isMobile && (
        <React.Fragment>
          <MobileViewControl tabs={partnerDetailTabs} />
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
          <Route exact path={`/partner/${params.code}/investments`}>
            <Redirect to={`/partner/${params.code}/signed/treemap`} />
          </Route>
          {/* Disbursements */}
          <Route path={`/partner/${params.code}/disbursements/treemap`}>
            <PartnerDetailInvestmentsDisbursedWrapper
              type="Disbursed"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/partner/${params.code}/disbursements/table`}>
            <PartnerInvestmentsTableWrapper type="Disbursed" code={paramCode} />
          </Route>
          <Route path={`/partner/${params.code}/disbursements/time-cycle`}>
            <PartnerDetailInvestmentsTimeCycleWrapper
              type="Disbursed"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/partner/${params.code}/disbursements/map`}>
            <InvestmentsGeoMap
              type="Disbursed"
              code={paramCode}
              detailFilterType="partners"
            />
          </Route>
          {/* Signed */}
          <Route path={`/partner/${params.code}/signed/treemap`}>
            <PartnerDetailInvestmentsDisbursedWrapper
              type="Signed"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/partner/${params.code}/signed/table`}>
            <PartnerInvestmentsTableWrapper type="Signed" code={paramCode} />
          </Route>
          {/* <Route path={`/partner/${params.code}/signed/time-cycle`}>
            <PartnerDetailInvestmentsTimeCycleWrapper
              type="Signed"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route> */}
          <Route path={`/partner/${params.code}/signed/map`}>
            <InvestmentsGeoMap
              type="Signed"
              code={paramCode}
              detailFilterType="partners"
            />
          </Route>
          {/* Commitment */}
          <Route path={`/partner/${params.code}/commitment/treemap`}>
            <PartnerDetailInvestmentsDisbursedWrapper
              type="Commitment"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/partner/${params.code}/commitment/table`}>
            <PartnerInvestmentsTableWrapper
              type="Commitment"
              code={paramCode}
            />
          </Route>
          <Route path={`/partner/${params.code}/commitment/time-cycle`}>
            <PartnerDetailInvestmentsTimeCycleWrapper
              type="Commitment"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/partner/${params.code}/commitment/map`}>
            <InvestmentsGeoMap
              type="Committed"
              code={paramCode}
              detailFilterType="partners"
            />
          </Route>
          {/* Budgets */}
          <Route path={`/partner/${params.code}/budgets/flow`}>
            <PartnerDetailBudgetsFlowWrapper
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/partner/${params.code}/budgets/time-cycle`}>
            <PartnerDetailGenericBudgetsTimeCycleWrapper
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
          <Route path={`/partner/${params.code}/budgets/map`}>
            <BudgetsGeoMap code={paramCode} detailFilterType="partners" />
          </Route>
          {/* Grants */}
          <Route path={`/partner/${params.code}/grants/list`}>
            <GrantsModule code={paramCode} detailFilterType="partners" />
          </Route>
          <Route path={`/partner/${params.code}/grants`}>
            <LocationGrants code={paramCode} detailFilterType="partners" />
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
        vizWrapperRef={vizWrapperRef}
        filterGroups={get(
          pathnameToFilterGroups,
          location.pathname.replace(params.code, "<code>"),
          filtergroups
        )}
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
