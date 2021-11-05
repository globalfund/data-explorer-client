import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useParams, useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { ResultsYear } from "app/components/ToolBoxPanel/components/resultsyear";
import { ToolBoxPanelFilters } from "app/components/ToolBoxPanel/components/filters";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { EligibilityYear } from "app/components/ToolBoxPanel/components/eligibilityyear";
import { ToolBoxPanelControlRow } from "app/components/ToolBoxPanel/components/controlrow";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";
import { ToolBoxPanelDonorViews } from "app/components/ToolBoxPanel/components/donormapviews";
import { AllocationsPeriods } from "app/components/ToolBoxPanel/components/allocationsperiods";
import { ToolBoxPanelDonorMapTypes } from "app/components/ToolBoxPanel/components/donormaptypes";
import { GrantImplementationPeriods } from "app/components/ToolBoxPanel/components/grantperiods";
import { ToolBoxPanelDisbursementsSlider } from "app/components/ToolBoxPanel/components/disbursementslider";
import { ToolBoxPanelEligibilityAdvanced } from "app/components/ToolBoxPanel/components/eligibilityadvanced";
import { PerformanceFrameworkReportingPeriods } from "app/components/ToolBoxPanel/components/pf-reportingperiods";
import {
  ViewModel,
  getControlItems,
} from "app/components/ToolBoxPanel/utils/getControlItems";

export function SubToolBoxPanel(props: { filterGroups: FilterGroupProps[] }) {
  const history = useHistory();
  const params = useParams<{
    code?: string;
    period?: string;
    vizType: string;
    subType?: string;
  }>();
  const [selectedView, setSelectedView] = React.useState("");
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
    <>
      {isGrantDetail &&
        history.location.pathname.indexOf("/overview") === -1 && (
          <GrantImplementationPeriods />
        )}
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
        params.subType === "map") ||
        (params.vizType === "allocations" && params.subType === "map") ||
        (params.vizType === "budgets" && params.subType === "map")) && (
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
        (params.subType === "map" || params.subType === "table") && (
          <React.Fragment>
            <ToolBoxPanelDonorViews />
          </React.Fragment>
        )}
      {params.vizType === "pledges-contributions" &&
        (params.subType === "map" ||
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
      {(params.vizType === "commitment" ||
        params.vizType === "disbursements" ||
        params.vizType === "signed") &&
        params.subType === "treemap" && <ToolBoxPanelDisbursementsSlider />}
      {!isGrantDetail && <ToolBoxPanelFilters groups={props.filterGroups} />}
    </>
  );
}
