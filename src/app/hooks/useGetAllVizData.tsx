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
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";

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
  const signedTimeCycle = useStoreState(
    (state) =>
      get(state.SignedTimeCycle.data, "data", []) as Record<string, unknown>[]
  );
  const signedTreemap = useStoreState(
    (state) =>
      get(
        state.SignedTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const commitmentTimeCycle = useStoreState(
    (state) =>
      get(state.CommitmentTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const commitmentTreemap = useStoreState(
    (state) =>
      get(
        state.CommitmentTreemap.data,
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
  const grantDetailSignedTimeCycle = useStoreState(
    (state) => state.GrantDetailSignedTimeCycle.data
  );
  const grantDetailCommitmentTimeCycle = useStoreState(
    (state) => state.GrantDetailCommitmentTimeCycle.data
  );
  const grantDetailDisbursementsTreemap = useStoreState(
    (state) => state.GrantDetailDisbursementsTreemap.data
  );
  const grantDetailSignedTreemap = useStoreState(
    (state) => state.GrantDetailSignedTreemap.data
  );
  const grantDetailCommitmentTreemap = useStoreState(
    (state) => state.GrantDetailCommitmentTreemap.data
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
  const locationDetailDisbursementsTreemap = useStoreState(
    (state) =>
      get(
        state.LocationDetailDisbursementsTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const locationDetailSignedTreemap = useStoreState(
    (state) =>
      get(
        state.LocationDetailSignedTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const locationDetailCommitmentTreemap = useStoreState(
    (state) =>
      get(
        state.LocationDetailCommitmentTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
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
  const pledgesContributionsTreemap = useStoreState(
    (state) =>
      get(
        state.PledgesContributionsTreemap.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const resultsList = useStoreState(
    (state) => get(state.ResultsList.data, "data", []) as ResultListItemModel[]
  );
  const partnerDetailDisbursementsTreemap = useStoreState(
    (state) =>
      get(
        state.PartnerDetailDisbursementsTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const partnerDetailSignedTreemap = useStoreState(
    (state) =>
      get(
        state.PartnerDetailSignedTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const partnerDetailCommitmentTreemap = useStoreState(
    (state) =>
      get(
        state.PartnerDetailCommitmentTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const partnerDetailBudgetsFlow = useStoreState(
    (state) =>
      get(state.PartnerDetailBudgetsFlow.data, "links", []) as {
        value: number;
        source: string;
        target: string;
      }[]
  );
  const partnerDetailBudgetsTimeCycle = useStoreState(
    (state) =>
      get(state.PartnerDetailBudgetsTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );

  return {
    // Allocations
    "/viz/allocations": allocations,
    "/viz/allocations/map": {
      countries: allocationsGeomap,
      multicountries: allocationsMCGeomap,
    },
    // Budgets
    "/viz/budgets/flow": budgetsFlow,
    "/viz/budgets/time-cycle": budgetsTimeCycle,
    "/viz/budgets/map": {
      countries: budgetsGeomap,
      multicountries: budgetsMCGeomap,
    },
    // Disbursements
    "/viz/disbursements/map": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/viz/disbursements/time-cycle": disbursementsTimeCycle,
    "/viz/disbursements/treemap": disbursementsTreemap,
    "/viz/disbursements/table": disbursementsTreemap,
    // Signed
    "/viz/signed/map": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/viz/signed/time-cycle": signedTimeCycle,
    "/viz/signed/treemap": signedTreemap,
    "/viz/signed/table": signedTreemap,
    // Commitment
    "/viz/commitment/map": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/viz/commitment/time-cycle": commitmentTimeCycle,
    "/viz/commitment/treemap": commitmentTreemap,
    "/viz/commitment/table": commitmentTreemap,
    // Eligibility
    "/viz/eligibility": eligibility,
    "/viz/eligibility/table": eligibility,
    // Pledges & Contributions
    "/viz/pledges-contributions/map": pledgesContributionsGeomap,
    "/viz/pledges-contributions/table": pledgesContributionsGeomap,
    "/viz/pledges-contributions/treemap": pledgesContributionsTreemap,
    "/viz/pledges-contributions/time-cycle": pledgesContributionsTimeCycle,
    // Grant Budgets
    "/grant/<code>/budgets/flow": grantDetailBudgetsFlow,
    "/grant/<code>/budgets/time-cycle": grantDetailBudgetsTimeCycle,
    "/grant/<code>/budgets/map": {
      countries: budgetsGeomap,
      multicountries: budgetsMCGeomap,
    },
    // Grant Disbursements
    "/grant/<code>/disbursements/time-cycle": grantDetailDisbursementsTimeCycle,
    "/grant/<code>/investments/disbursements": grantDetailDisbursementsTreemap,
    "/grant/<code>/investments/table": grantDetailDisbursementsTreemap,
    // Grant Signed
    "/grant/<code>/signed/time-cycle": grantDetailSignedTimeCycle,
    "/grant/<code>/signed/disbursements": grantDetailSignedTreemap,
    "/grant/<code>/signed/table": grantDetailSignedTreemap,
    // Grant Commitment
    "/grant/<code>/commitment/time-cycle": grantDetailCommitmentTimeCycle,
    "/grant/<code>/commitment/disbursements": grantDetailCommitmentTreemap,
    "/grant/<code>/commitment/table": grantDetailCommitmentTreemap,
    // Grant Documents
    "/grant/<code>/documents": grantDetailDocuments,
    // Grant Performance Framework
    "/grant/<code>/performance-framework": grantDetailPerformanceFramework,
    // Grant Performance Rating
    "/grant/<code>/performance-rating": grantDetailPerformanceRating,
    // Location Eligibility
    "/location/<code>/eligibility": eligibilityCountry,
    "/location/<code>/eligibility/table": eligibilityCountry,
    // Location Disbursements
    "/location/<code>/disbursements/treemap":
      locationDetailDisbursementsTreemap,
    "/location/<code>/disbursements/table": locationDetailDisbursementsTreemap,
    "/location/<code>/disbursements/map": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/location/<code>/disbursements/time-cycle": disbursementsTimeCycle,
    // Location Signed
    "/location/<code>/signed/treemap": locationDetailSignedTreemap,
    "/location/<code>/signed/table": locationDetailSignedTreemap,
    "/location/<code>/signed/map": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/location/<code>/signed/time-cycle": disbursementsTimeCycle,
    // Location Commitment
    "/location/<code>/commitment/treemap": locationDetailCommitmentTreemap,
    "/location/<code>/commitment/table": locationDetailCommitmentTreemap,
    "/location/<code>/commitment/map": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/location/<code>/commitment/time-cycle": disbursementsTimeCycle,
    // Location Budgets
    "/location/<code>/budgets/flow": locationDetailBudgetsFlow,
    "/location/<code>/budgets/time-cycle": locationDetailBudgetsTimeCycle,
    "/location/<code>/budgets/map": {
      countries: budgetsGeomap,
      multicountries: budgetsMCGeomap,
    },
    // Location Documents
    "/location/<code>/documents": locationDetailDocuments,
    // Location Allocation
    "/location/<code>/allocations": allocations,
    // Location Grants
    "/location/<code>/grants": grantsList,
    "/location/<code>/grants/list": grantsList,
    // Location Results
    "/location/<code>/results": resultsList,
    // Grants
    "/grants": grantsList,
    // Results
    "/results": resultsList,
    // Documents
    "/documents": documents,
    // Partner Disbursements
    "/partner/<code>/disbursements/treemap": partnerDetailDisbursementsTreemap,
    "/partner/<code>/disbursements/table": partnerDetailDisbursementsTreemap,
    "/partner/<code>/disbursements/map": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/partner/<code>/disbursements/time-cycle": disbursementsTimeCycle,
    // Partner Signed
    "/partner/<code>/signed/treemap": partnerDetailSignedTreemap,
    "/partner/<code>/signed/table": partnerDetailSignedTreemap,
    "/partner/<code>/signed/map": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/partner/<code>/signed/time-cycle": disbursementsTimeCycle,
    // Partner Commitment
    "/partner/<code>/commitment/treemap": partnerDetailCommitmentTreemap,
    "/partner/<code>/commitment/table": partnerDetailCommitmentTreemap,
    "/partner/<code>/commitment/map": {
      countries: disbursementsGeomap,
      multicountries: disbursementsMCGeomap,
    },
    "/partner/<code>/commitment/time-cycle": disbursementsTimeCycle,
    // Partner Budgets
    "/partner/<code>/budgets/flow": partnerDetailBudgetsFlow,
    "/partner/<code>/budgets/time-cycle": partnerDetailBudgetsTimeCycle,
    "/partner/<code>/budgets/map": {
      countries: budgetsGeomap,
      multicountries: budgetsMCGeomap,
    },
    // Partner Grants
    "/partner/<code>/grants": grantsList,
    "/partner/<code>/grants/list": grantsList,
  };
}
