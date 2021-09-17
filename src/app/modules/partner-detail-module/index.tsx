/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle } from "react-use";
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

  if (widthThreshold > 500) {
    pushValue = 0;
  } else if (widthThreshold < 0) {
    pushValue = 0;
  } else {
    pushValue = 500 - widthThreshold;
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
            <Redirect
              to={`/partner/${params.code}/investments/disbursements`}
            />
          </Route>
          <Route path={`/partner/${params.code}/investments/disbursements`}>
            <PartnerDetailInvestmentsDisbursedWrapper code={paramCode} />
          </Route>
          <Route path={`/partner/${params.code}/investments/table`}>
            <PartnerInvestmentsTableWrapper code={paramCode} />
          </Route>
          <Route path={`/partner/${params.code}/investments/time-cycle`}>
            <PartnerDetailInvestmentsTimeCycleWrapper code={paramCode} />
          </Route>
          <Route path={`/partner/${params.code}/investments/geomap`}>
            <InvestmentsGeoMap code={paramCode} detailFilterType="partners" />
          </Route>
          <Route path={`/partner/${params.code}/budgets/flow`}>
            <PartnerDetailBudgetsFlowWrapper code={paramCode} />
          </Route>
          <Route path={`/partner/${params.code}/budgets/time-cycle`}>
            <PartnerDetailGenericBudgetsTimeCycleWrapper code={paramCode} />
          </Route>
          <Route path={`/partner/${params.code}/budgets/geomap`}>
            <BudgetsGeoMap code={paramCode} detailFilterType="partners" />
          </Route>
          <Route path={`/partner/${params.code}/grants/list`}>
            <GrantsModule code={paramCode} detailFilterType="partners" />
          </Route>
          <Route path={`/partner/${params.code}/grants`}>
            <LocationGrants code={paramCode} detailFilterType="partners" />
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
        onButtonClick={() => setOpenToolboxPanel(!openToolboxPanel)}
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
