import React from "react";
import get from "lodash/get";
import { FeatureCollection } from "geojson";
import { useStoreState } from "app/state/store/hooks";
import { GrantListItemModel } from "app/modules/grants-module/data";
import {
  AllocationsGeoMapPinMarker,
  GeoMapPinMarker,
  InvestmentsGeoMapPinMarker,
} from "app/components/Charts/GeoMap/data";
import { ResultListItemModel } from "app/modules/results-module/data";
import { DotChartModel } from "app/components/Charts/Eligibility/DotChart/data";
import { EligibilityScatterplotDataModel } from "app/components/Charts/Eligibility/Scatterplot/data";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";

export function useGetAllVizData() {
  const allocations = useStoreState((state) => ({
    keys: get(state.Allocations.data, "keys", []),
    values: get(state.Allocations.data, "values", []),
  }));
  const allocationsGeomap = useStoreState(
    (state) =>
      ({
        type: "FeatureCollection",
        features: get(state.AllocationsGeomap.data, "data", []),
      } as FeatureCollection)
  );
  const allocationsMCGeomap = useStoreState(
    (state) =>
      get(
        state.AllocationsMCGeomap,
        "data.pins",
        []
      ) as AllocationsGeoMapPinMarker[]
  );
  const budgetsFlow = useStoreState(
    (state) =>
      get(state.BudgetsFlow.data, "links", []) as {
        value: number;
        source: string;
        target: string;
      }[]
  );
  const budgetsTimeCycle = useStoreState(
    (state) =>
      get(state.BudgetsTimeCycle.data, "data", []) as Record<string, unknown>[]
  );
  const budgetsGeomap = useStoreState(
    (state) =>
      ({
        type: "FeatureCollection",
        features: get(state.BudgetsGeomap.data, "data", []),
      } as FeatureCollection)
  );
  const budgetsMCGeomap = useStoreState(
    (state) =>
      get(
        state.BudgetsMCGeomap,
        "data.pins",
        []
      ) as AllocationsGeoMapPinMarker[]
  );
  const disbursementsGeomap = useStoreState(
    (state) =>
      ({
        type: "FeatureCollection",
        features: get(state.DisbursementsGeomap.data, "data", []),
      } as FeatureCollection)
  );
  const disbursementsMCGeomap = useStoreState(
    (state) =>
      get(
        state.DisbursementsGeomapMulticountries,
        "data.pins",
        []
      ) as InvestmentsGeoMapPinMarker[]
  );
  const disbursementsTimeCycle = useStoreState(
    (state) =>
      get(state.DisbursementsTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const disbursementsTreemap = useStoreState(
    (state) =>
      get(
        state.DisbursementsTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const documents = useStoreState((state) => state.Documents.data);
  const eligibility = useStoreState(
    (state) => get(state.Eligibility.data, "data", []) as DotChartModel[]
  );
  const eligibilityCountry = useStoreState(
    (state) =>
      get(
        state.EligibilityCountry.data,
        "data",
        []
      ) as EligibilityScatterplotDataModel[]
  );
  const grantDetailBudgetsFlow = useStoreState(
    (state) => state.GrantDetailBudgetsFlow.data
  );
  const grantDetailBudgetsTimeCycle = useStoreState(
    (state) => state.GrantDetailBudgetsTimeCycle.data
  );
  const grantDetailDisbursementsTimeCycle = useStoreState(
    (state) => state.GrantDetailDisbursementsTimeCycle.data
  );
  const grantDetailDisbursementsTreemap = useStoreState(
    (state) => state.GrantDetailDisbursementsTreemap.data
  );
  const grantDetailDocuments = useStoreState(
    (state) => state.GrantDetailDocuments.data
  );
  const grantDetailPerformanceFramework = useStoreState(
    (state) => state.GrantDetailPerformanceFramework.data
  );
  const grantDetailPerformanceRating = useStoreState(
    (state) => state.GrantDetailPerformanceRating.data
  );
  const grantsList = useStoreState(
    (state) => get(state.GrantsList.data, "data", []) as GrantListItemModel[]
  );
  const locationDetailBudgetsFlow = useStoreState(
    (state) =>
      get(state.LocationDetailBudgetsFlow.data, "links", []) as {
        value: number;
        source: string;
        target: string;
      }[]
  );
  const locationDetailBudgetsTimeCycle = useStoreState(
    (state) =>
      get(state.LocationDetailBudgetsTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const locationDetailDocuments = useStoreState(
    (state) => state.LocationDetailDocuments.data
  );
  const pledgesContributionsGeomap = useStoreState((state) => ({
    layers: {
      type: "FeatureCollection",
      features: get(state.PledgesContributionsGeomap.data, "layers", []),
    } as FeatureCollection,
    pins: get(
      state.PledgesContributionsGeomap.data,
      "pins",
      []
    ) as GeoMapPinMarker[],
  }));
  const pledgesContributionsTimeCycle = useStoreState(
    (state) =>
      get(state.PledgesContributionsTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const resultsList = useStoreState(
    (state) => get(state.ResultsList.data, "data", []) as ResultListItemModel[]
  );

  return {
    "/viz/allocations": allocations,
    "/viz/allocations/geomap": {
      countries: allocationsGeomap,
      multicountries: allocationsMCGeomap,
    },
    "/viz/budgets/flow": budgetsFlow,
    "/viz/budgets/time-cycle": budgetsTimeCycle,
    "/viz/budgets/geomap": {
      countries: budgetsGeomap,
      multicountries: budgetsMCGeomap,
    },
    "/viz/investments/geomap": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/viz/investments/time-cycle": disbursementsTimeCycle,
    "/viz/investments/disbursements": disbursementsTreemap,
    "/viz/investments/table": disbursementsTreemap,
    "/viz/eligibility": eligibility,
    "/viz/eligibility/table": eligibility,
    "/viz/pledges-contributions/geomap": pledgesContributionsGeomap,
    "/viz/pledges-contributions/table": pledgesContributionsGeomap,
    "/viz/pledges-contributions/time-cycle": pledgesContributionsTimeCycle,
    "/grant/<code>/budgets/flow": grantDetailBudgetsFlow,
    "/grant/<code>/budgets/time-cycle": grantDetailBudgetsTimeCycle,
    "/grant/<code>/budgets/geomap": {
      countries: budgetsGeomap,
      multicountries: budgetsMCGeomap,
    },
    "/grant/<code>/investments/time-cycle": grantDetailDisbursementsTimeCycle,
    "/grant/<code>/investments/disbursements": grantDetailDisbursementsTreemap,
    "/grant/<code>/investments/table": grantDetailDisbursementsTreemap,
    "/grant/<code>/documents": grantDetailDocuments,
    "/grant/<code>/performance-framework": grantDetailPerformanceFramework,
    "/grant/<code>/performance-rating": grantDetailPerformanceRating,
    "/location/<code>/eligibility": eligibilityCountry,
    "/location/<code>/eligibility/table": eligibilityCountry,
    "/location/<code>/investments/disbursements": disbursementsTreemap,
    "/location/<code>/investments/table": disbursementsTreemap,
    "/location/<code>/investments/geomap": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/location/<code>/investments/time-cycle": disbursementsTimeCycle,
    "/location/<code>/budgets/flow": locationDetailBudgetsFlow,
    "/location/<code>/budgets/time-cycle": locationDetailBudgetsTimeCycle,
    "/location/<code>/budgets/geomap": {
      countries: budgetsGeomap,
      multicountries: budgetsMCGeomap,
    },
    "/location/<code>/documents": locationDetailDocuments,
    "/location/<code>/allocation": allocations,
    "/location/<code>/grants": grantsList,
    "/grants": grantsList,
    "/results": resultsList,
    "/documents": documents,
  };
}
