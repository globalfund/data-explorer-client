/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle } from "react-use";
import { useMediaQuery } from "@material-ui/core";
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
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
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
  const datasetMenuItems = useDatasetMenuItems();
  const params = useParams<{ code: string; vizType: string }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(true);

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
        isGrantDetail
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
          <Route path={`/partner/${params.code}/signed/time-cycle`}>
            <PartnerDetailInvestmentsTimeCycleWrapper
              type="Signed"
              code={paramCode}
              toolboxOpen={openToolboxPanel}
            />
          </Route>
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
      <ToolBoxPanel
        isGrantDetail
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
