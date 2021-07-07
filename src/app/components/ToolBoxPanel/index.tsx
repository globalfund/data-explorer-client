/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import Slide from "@material-ui/core/Slide";
import { useParams, useHistory } from "react-router-dom";
import { useAppliedFilters } from "app/hooks/useAppliedFilters";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { ToolBoxPanelTabs } from "app/components/ToolBoxPanel/components/tabs";
import { ToolBoxPanelFilters } from "app/components/ToolBoxPanel/components/filters";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { ToolBoxPanelControlRow } from "app/components/ToolBoxPanel/components/controlrow";
import { ToolBoxPanelGeoMapViews } from "app/components/ToolBoxPanel/components/geomapviews";
import { ToolBoxPanelIconButtons } from "app/components/ToolBoxPanel/components/iconbuttons";
import { ToolBoxPanelDonorViews } from "app/components/ToolBoxPanel/components/donormapviews";
import { ToolBoxPanelDonorMapTypes } from "app/components/ToolBoxPanel/components/donormaptypes";
import { ToolBoxPanelEligibilityAdvanced } from "app/components/ToolBoxPanel/components/eligibilityadvanced";
import { PerformanceFrameworkReportingPeriods } from "app/components/ToolBoxPanel/components/pf-reportingperiods";
import {
  getControlItems,
  ViewModel,
} from "app/components/ToolBoxPanel/utils/getControlItems";

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
  const { appliedFilters } = useAppliedFilters({
    type: "All",
  });
  const [selectedView, setSelectedView] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("Controls");
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
  const [geomapView, setGeomapView] = React.useState("countries");

  // aggregateBy control const
  const setSelectedAggregation = useStoreActions(
    (store) => store.ToolBoxPanelAggregateByState.setValue
  );
  const selectedAggregation = useStoreState(
    (state) => state.ToolBoxPanelAggregateByState.value
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

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (props.open) {
          props.onButtonClick();
        }
      }}
    >
      <Slide direction="left" in={props.open}>
        <div
          css={`
            right: 0;
            top: 48px;
            z-index: 20;
            width: 500px;
            position: fixed;
            background: #f5f5f7;
            height: calc(100vh - 48px);
            visibility: visible !important;

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
                top: 45%;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
                padding: 6px 40px;
                font-weight: bold;
                position: absolute;
                text-align: center;
                background: #495057;
                transform: rotate(-90deg);
                border-radius: 20px 20px 0px 0px;
                left: -${!visibleVScrollbar || props.open ? 84 : 88}px;
                font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
              `}
              onClick={() => props.onButtonClick()}
            >
              Toolbox
              {appliedFilters.length > 0 && (
                <div
                  css={`
                    top: 8px;
                    width: 6px;
                    height: 6px;
                    right: 30px;
                    background: #fff;
                    border-radius: 50%;
                    position: absolute;
                  `}
                />
              )}
            </div>
            <ToolBoxPanelTabs
              selected={selectedTab}
              onSelect={setSelectedTab}
              options={
                !props.isGrantDetail ? ["Controls", "Filters"] : ["Controls"]
              }
            />
            {(selectedTab === "Controls" || props.isGrantDetail) && (
              <React.Fragment>
                <ToolBoxPanelIconButtons />
                {controlItems.views.length > 0 && (
                  <ToolBoxPanelControlRow
                    title="Views"
                    selected={selectedView}
                    options={controlItems.views}
                    setSelected={setSelectedView}
                  />
                )}
                {controlItems.aggregates.length > 0 && (
                  <ToolBoxPanelControlRow
                    title="Aggregate by"
                    selected={selectedAggregation}
                    options={controlItems.aggregates}
                    setSelected={setSelectedAggregation}
                  />
                )}
                {/* {params.vizType === "investments" &&
                  params.subType === "geomap" && (
                    <ToolBoxPanelGeoMapViews
                      title="Views"
                      selected={geomapView}
                      setSelected={setGeomapView}
                    />
                  )} */}
                {params.vizType === "pledges-contributions" &&
                  params.subType === "geomap" && (
                    <React.Fragment>
                      <ToolBoxPanelDonorMapTypes />
                      <ToolBoxPanelDonorViews />
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
              </React.Fragment>
            )}
            {selectedTab === "Filters" && (
              <ToolBoxPanelFilters groups={props.filterGroups} />
            )}
          </div>
        </div>
      </Slide>
    </ClickAwayListener>
  );
}
