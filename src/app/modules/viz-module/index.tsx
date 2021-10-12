/* third-party */
import React from "react";
import get from "lodash/get";
import { Switch, Route, useParams, useLocation } from "react-router-dom";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
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
  filtergroups,
  pathnameToFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";
import { ToolBoxPage } from "app/components/ToolBoxPanel/indexsm";
import { IconButton, Tooltip, useMediaQuery } from "@material-ui/core";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";

export default function VizModule() {
  const location = useLocation();
  const datasetMenuItems = useDatasetMenuItems();
  const params = useParams<{ vizType: string; subType?: string }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(true);
  const [openToolboxPage, setOpenToolboxPage] = React.useState(false);

  React.useEffect(() => {
    document.body.style.background = "#fff";
  }, []);

  let pushValue = 0;
  const widthThreshold = (window.innerWidth - 1280) / 2;

  if (widthThreshold > 500) {
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
        title="Finance"
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
      />
      {/* TODO: added the icon to the pageHeader component, cant find the same icon with the figma file */}
      {isSmallScreen && (
        <>
          <div
            css={`
            display: flex;
            width: 100%;
            justify-content: flex-end;
        }
            `}
          >
            <Tooltip
              title="Tap to open the toolbox"
              aria-label="open the toolbox"
              placement="bottom-end"
              arrow
            >
              <IconButton
                css={`
                  align-self: flex-end;
                `}
              >
                <TuneOutlinedIcon
                  onClick={() => {
                    setOpenToolboxPage(!openToolboxPage);
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </>
      )}
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
          <Route path="/viz/budgets/flow">
            <GenericBudgetsFlowWrapper />
          </Route>
          <Route path="/viz/budgets/time-cycle">
            <GenericBudgetsTimeCycleWrapper />
          </Route>
          <Route path="/viz/budgets/geomap">
            <BudgetsGeoMap />
          </Route>
          <Route path="/viz/investments/disbursements">
            <GenericInvestmentsDisbursedWrapper />
          </Route>
          <Route path="/viz/investments/table">
            <GenericInvestmentsTableWrapper />
          </Route>
          <Route path="/viz/investments/time-cycle">
            <GenericInvestmentsTimeCycleWrapper />
          </Route>
          <Route path="/viz/investments/geomap">
            <InvestmentsGeoMap />
          </Route>
          <Route path="/viz/allocations/geomap">
            <AllocationsGeoMap />
          </Route>
          <Route path="/viz/allocations">
            <AllocationsModule />
          </Route>
          <Route path="/viz/pledges-contributions/time-cycle">
            <PledgesContributionsTimeCycleModule />
          </Route>
          <Route path="/viz/pledges-contributions/table">
            <PledgesContributionsTable />
          </Route>
          <Route path="/viz/pledges-contributions/geomap">
            <PledgesContributionsGeoMap />
          </Route>
          <Route path="/viz/pledges-contributions/treemap">
            <PledgesContributionsTreemap />
          </Route>
          <Route path="/viz/eligibility/table">
            <GenericEligibilityWrapper />
          </Route>
          <Route path="/viz/eligibility">
            <EligibilityModule />
          </Route>
        </Switch>
      </div>
      {isSmallScreen ? (
        <ToolBoxPage
          open={openToolboxPage}
          onButtonClick={() => setOpenToolboxPage(!openToolboxPage)}
          filterGroups={get(
            pathnameToFilterGroups,
            location.pathname,
            filtergroups
          )}
        />
      ) : (
        <>
          <ToolBoxPanel
            open={openToolboxPanel}
            onButtonClick={() => setOpenToolboxPanel(!openToolboxPanel)}
            filterGroups={get(
              pathnameToFilterGroups,
              location.pathname,
              filtergroups
            )}
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
          opacity: ${openToolboxPanel && widthThreshold < 0}? 1 : 0};
          visibility: ${
            openToolboxPanel && widthThreshold < 0 ? "visible" : "hidden"
          };
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
          />
        </>
      )}
    </div>
  );
}
