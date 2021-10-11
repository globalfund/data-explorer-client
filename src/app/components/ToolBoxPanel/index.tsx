/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import Slide from "@material-ui/core/Slide";
import { useParams, useHistory } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { ToolBoxPanelFilters } from "app/components/ToolBoxPanel/components/filters";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { ToolBoxPanelControlRow } from "app/components/ToolBoxPanel/components/controlrow";
import { ToolBoxPanelIconButtons } from "app/components/ToolBoxPanel/components/iconbuttons";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";
import { ToolBoxPanelDonorViews } from "app/components/ToolBoxPanel/components/donormapviews";
import { ToolBoxPanelDonorMapTypes } from "app/components/ToolBoxPanel/components/donormaptypes";
import { GrantImplementationPeriods } from "app/components/ToolBoxPanel/components/grantperiods";
import { ToolBoxPanelEligibilityAdvanced } from "app/components/ToolBoxPanel/components/eligibilityadvanced";
import { PerformanceFrameworkReportingPeriods } from "app/components/ToolBoxPanel/components/pf-reportingperiods";
import {
  getControlItems,
  ViewModel,
} from "app/components/ToolBoxPanel/utils/getControlItems";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { AllocationsPeriods } from "./components/allocationsperiods";
import { EligibilityYear } from "./components/eligibilityyear";
import { ResultsYear } from "./components/resultsyear";

interface ToolBoxPanelProps {
  open: boolean;
  isGrantDetail?: boolean;
  onButtonClick: () => void;
  filterGroups: FilterGroupProps[];
}

export function ToolBoxPanel(props: ToolBoxPanelProps) {
  const history = useHistory();
  const params = useParams<{
    code?: string;
    period?: string;
    vizType: string;
    subType?: string;
  }>();
  const [selectedView, setSelectedView] = React.useState("");
  const [visibleVScrollbar, setVisibleVScrollbar] = React.useState(
    document.body.scrollHeight > document.body.clientHeight
  );
  const [controlItems, setControlItems] = React.useState<{
    views: ViewModel[];
    aggregates: ViewModel[];
  }>(
    getControlItems(
      params.vizType,
      history.location.pathname,
      params.code,
      params.period
    )
  );

  // aggregateBy control const
  const setSelectedAggregation = useStoreActions(
    (store) => store.ToolBoxPanelAggregateByState.setValue
  );
  const selectedAggregation = useStoreState(
    (state) => state.ToolBoxPanelAggregateByState.value
  );

  // geomanpView control const
  const setGeomapView = useStoreActions(
    (store) => store.ToolBoxPanelInvestmentsMapViewState.setValue
  );
  const geomapView = useStoreState(
    (state) => state.ToolBoxPanelInvestmentsMapViewState.value
  );

  // performance framework periods data
  const performanceFrameworkPeriods = useStoreState((state) =>
    get(state.GrantDetailPerformanceFramework.data, "periods", [])
  );

  function getSelectedView() {
    let view: ViewModel | undefined;
    if (params.code) {
      view = find(
        controlItems.views,
        (v: ViewModel) =>
          v.link?.replace("viz", `location/${params.code}`) ===
          history.location.pathname
      );
    } else {
      view = find(controlItems.views, { link: history.location.pathname });
    }
    if (view) {
      return view.value;
    }
    return "";
  }

  React.useLayoutEffect(() => {
    setVisibleVScrollbar(
      document.body.scrollHeight > document.body.clientHeight
    );
  }, []);

  React.useEffect(() => {
    setVisibleVScrollbar(
      document.body.scrollHeight > document.body.clientHeight
    );
  }, [history.location.pathname]);

  React.useEffect(
    () =>
      setControlItems(
        getControlItems(
          params.vizType,
          history.location.pathname,
          params.code,
          params.period
        )
      ),
    [params.vizType]
  );

  React.useEffect(() => setSelectedView(getSelectedView()), [
    controlItems.views,
    history.location.pathname,
  ]);

  React.useEffect(() => {
    setSelectedAggregation(
      controlItems.aggregates.length > 0 ? controlItems.aggregates[0].value : ""
    );
  }, [controlItems.aggregates]);

  const isGrantDetail = history.location.pathname.indexOf("/grant/") > -1;
  const isResultsPage = history.location.pathname.indexOf("/results") > -1;
  const isLocationDetail = history.location.pathname.indexOf("/location/") > -1;

  return (
    <ClickAwayListener
      onClickAway={(event: React.MouseEvent<Document, MouseEvent>) => {
        if (props.open && get(event.target, "tagName", "") !== "A") {
          props.onButtonClick();
        }
      }}
    >
      <Slide direction="left" in={props.open}>
        <div
          css={`
            right: 0;
            z-index: 20;
            width: 500px;
            position: fixed;
            background: #f5f5f7;
            visibility: visible !important;
            top: ${!props.isGrantDetail ? 133 : 168}px;
            box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
            height: calc(100vh - ${!props.isGrantDetail ? 133 : 168}px);

            @media (max-width: 500px) {
              width: calc(100vw - 50px);
            }
          `}
        >
          <div
            css={`
              width: 100%;
              height: 100%;
              display: flex;
              position: relative;
              flex-direction: column;
            `}
          >
            <div
              role="button"
              tabIndex={-1}
              css={`
                top: 38%;
                color: #fff;
                width: 16px;
                height: 133px;
                display: flex;
                cursor: pointer;
                position: absolute;
                background: #495057;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                border-radius: 10px 0px 0px 10px;
                transition: background 0.2s ease-in-out;
                left: -${!visibleVScrollbar || props.open ? 17 : 22}px;

                &:hover {
                  background: #13183f;
                }

                > svg {
                  transform: rotate(${!props.open ? "-" : ""}90deg);
                  > path {
                    fill: #fff;
                  }
                }
              `}
              onClick={() => props.onButtonClick()}
            >
              <TriangleXSIcon />
            </div>
            <ToolBoxPanelIconButtons />
            {isGrantDetail && <GrantImplementationPeriods />}
            {controlItems.views.length > 0 && (
              <ToolBoxPanelControlRow
                title="Views"
                selected={selectedView}
                options={controlItems.views}
                setSelected={setSelectedView}
              />
            )}
            {controlItems.aggregates.length > 0 && (
              <ToolBoxPanelAggregateBy
                title="Aggregate by"
                selected={selectedAggregation}
                options={controlItems.aggregates}
                setSelected={setSelectedAggregation}
              />
            )}
            {(params.vizType === "allocations" ||
              params.vizType === "allocation") && <AllocationsPeriods />}
            {params.vizType === "eligibility" && !isLocationDetail && (
              <EligibilityYear />
            )}
            {isResultsPage && <ResultsYear />}
            {(((params.vizType === "commitment" ||
              params.vizType === "disbursements" ||
              params.vizType === "signed") &&
              params.subType === "geomap") ||
              (params.vizType === "allocations" &&
                params.subType === "geomap") ||
              (params.vizType === "budgets" &&
                params.subType === "geomap")) && (
              <ToolBoxPanelAggregateBy
                title="Aggregate by"
                selected={geomapView}
                setSelected={setGeomapView}
                options={[
                  { label: "Countries", value: "countries" },
                  { label: "Multi-countries", value: "multicountries" },
                ]}
              />
            )}
            {params.vizType === "pledges-contributions" &&
              (params.subType === "geomap" || params.subType === "table") && (
                <React.Fragment>
                  <ToolBoxPanelDonorViews />
                </React.Fragment>
              )}
            {params.vizType === "pledges-contributions" &&
              (params.subType === "geomap" ||
                params.subType === "table" ||
                params.subType === "treemap") && (
                <React.Fragment>
                  <ToolBoxPanelDonorMapTypes />
                </React.Fragment>
              )}
            {params.code && params.vizType === "eligibility" && (
              <ToolBoxPanelEligibilityAdvanced />
            )}
            {params.code &&
              params.period &&
              params.vizType === "performance-framework" && (
                <PerformanceFrameworkReportingPeriods
                  periods={performanceFrameworkPeriods}
                />
              )}
            {!isGrantDetail && (
              <ToolBoxPanelFilters groups={props.filterGroups} />
            )}
          </div>
        </div>
      </Slide>
    </ClickAwayListener>
  );
}
