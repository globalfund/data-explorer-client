import { createStore, persist } from "easy-peasy";
import { StoreModel } from "app/state/api/interfaces";

import { AppliedFiltersState } from "app/state/api/action-reducers/sync/filters";
import {
  PageHeaderVizDrilldownsState,
  ToolBoxPanelAggregateByState,
  ToolBoxPanelAllocationsPeriodState,
  ToolBoxPanelBudgetFlowDrilldownSelectors,
  ToolBoxPanelBudgetTimeCycleDrilldownYearSelector,
  ToolBoxPanelDisbursementsSliderValues,
  ToolBoxPanelDonorMapTypeState,
  ToolBoxPanelDonorMapViewState,
  ToolBoxPanelEligibilityAdvancedCheckboxState,
  ToolBoxPanelEligibilityYearState,
  ToolBoxPanelInvestmentsMapViewState,
  ToolBoxPanelPFPeriodState,
  ToolBoxPanelResultsYearState,
} from "app/state/api/action-reducers/sync";

import GrantsList from "app/state/api/action-reducers/viz/grantsList";
import Allocations, {
  AllocationsDrilldown,
  AllocationsGeomap,
  AllocationsMCGeomap,
  AllocationsPeriods,
} from "app/state/api/action-reducers/viz/allocations";
import BudgetsFlow, {
  BudgetsFlowDrilldownLevel1,
  BudgetsFlowDrilldownLevel2,
} from "app/state/api/action-reducers/viz/budgetsFlow";
import Eligibility, {
  EligibilityYears,
} from "app/state/api/action-reducers/viz/eligibility";
import BudgetsTimeCycle, {
  BudgetsTimeCycleDrilldownLevel1,
  BudgetsTimeCycleDrilldownLevel2,
} from "app/state/api/action-reducers/viz/budgetsTimeCycle";
import DisbursementsGeomap, {
  DisbursementsGeomapMulticountries,
} from "app/state/api/action-reducers/viz/disbursementsGeomap";
import DisbursementsTreemap, {
  DisbursementsTreemapDrilldown,
} from "app/state/api/action-reducers/viz/disbursementsTreemap";
import DisbursementsTimeCycle, {
  DisbursementsTimeCycleDrilldown,
} from "app/state/api/action-reducers/viz/disbursementsTimeCycle";
import PledgesContributionsGeomap from "app/state/api/action-reducers/viz/pledgesContributionsGeomap";
import PledgesContributionsTimeCycle, {
  PledgesContributionsTimeCycleDrilldown,
} from "app/state/api/action-reducers/viz/pledgesContributionsTimeCycle";

import GlobalSearch from "app/state/api/action-reducers/search";

import DonorFilterOptions from "app/state/api/action-reducers/filters/donors";
import StatusFilterOptions from "app/state/api/action-reducers/filters/status";
import LocationFilterOptions from "app/state/api/action-reducers/filters/locations";
import ComponentFilterOptions from "app/state/api/action-reducers/filters/components";
import PartnerTypeFilterOptions from "app/state/api/action-reducers/filters/partnerTypes";
import ReplenishmentPeriodFilterOptions from "app/state/api/action-reducers/filters/replenishmentPeriods";
import GrantDetailInfo from "app/state/api/action-reducers/grantDetail/infoPanel";
import GrantDetailDisbursementsTreemap from "app/state/api/action-reducers/grantDetail/disbursementsTreemap";
import GrantDetailDisbursementsTimeCycle from "app/state/api/action-reducers/grantDetail/disbursementsTimeCycle";
import GrantDetailPerformanceRating from "app/state/api/action-reducers/grantDetail/performanceRating";
import GrantDetailPerformanceFramework, {
  GrantDetailPerformanceFrameworkExpand,
} from "app/state/api/action-reducers/grantDetail/performanceFramework";
import Documents from "app/state/api/action-reducers/viz/documents";
import GrantDetailDocuments from "app/state/api/action-reducers/grantDetail/documents";
import GrantDetailPeriods from "app/state/api/action-reducers/grantDetail/periods";
import GrantDetailPeriodInfo from "app/state/api/action-reducers/grantDetail/periodInfo";
import LocationDetailInfo from "app/state/api/action-reducers/locationDetail/info";
import EligibilityCountry from "app/state/api/action-reducers/locationDetail/eligibility";
import LocationDetailDocuments from "app/state/api/action-reducers/locationDetail/documents";
import GrantDetailBudgetsFlow, {
  GrantDetailBudgetsFlowDrilldownLevel1,
  GrantDetailBudgetsFlowDrilldownLevel2,
} from "app/state/api/action-reducers/grantDetail/budgetsFlow";
import LocationDetailBudgetsFlow, {
  LocationDetailBudgetsFlowDrilldownLevel1,
  LocationDetailBudgetsFlowDrilldownLevel2,
} from "app/state/api/action-reducers/locationDetail/budgetsFlow";
import GrantDetailBudgetsTimeCycle, {
  GrantDetailBudgetsTimeCycleDrilldownLevel1,
  GrantDetailBudgetsTimeCycleDrilldownLevel2,
} from "app/state/api/action-reducers/grantDetail/budgetsTimeCycle";
import LocationDetailBudgetsTimeCycle, {
  LocationDetailBudgetsTimeCycleDrilldownLevel1,
  LocationDetailBudgetsTimeCycleDrilldownLevel2,
} from "app/state/api/action-reducers/locationDetail/budgetsTimeCycle";
import ResultsList, {
  ResultsStats,
  ResultsYears,
} from "app/state/api/action-reducers/viz/resultsList";
import LocationDetailDisbursementsTreemap from "../api/action-reducers/locationDetail/disbursementsTreemap";
import PledgesContributionsTreemap from "../api/action-reducers/viz/pledgesContributionsTreemap";
import BudgetsGeomap, {
  BudgetsMCGeomap,
} from "../api/action-reducers/viz/budgetsGeomap";
import LocationGrants from "../api/action-reducers/locationDetail/grants";
import PartnerDetailInfo from "../api/action-reducers/partnerDetail/info";
import PartnerDetailDisbursementsTreemap, {
  PartnerDetailDisbursementsTreemapDrilldown,
} from "../api/action-reducers/partnerDetail/disbursementsTreemap";
import PartnerDetailBudgetsFlow, {
  PartnerDetailBudgetsFlowDrilldownLevel1,
  PartnerDetailBudgetsFlowDrilldownLevel2,
} from "../api/action-reducers/partnerDetail/budgetsFlow";
import PartnerDetailBudgetsTimeCycle, {
  PartnerDetailBudgetsTimeCycleDrilldownLevel1,
  PartnerDetailBudgetsTimeCycleDrilldownLevel2,
} from "../api/action-reducers/partnerDetail/budgetsTimeCycle";
import SignedTreemap, {
  SignedTimeCycle,
  SignedTimeCycleDrilldown,
  SignedTreemapDrilldown,
} from "../api/action-reducers/viz/signed";
import CommitmentTreemap, {
  CommitmentTimeCycle,
  CommitmentTimeCycleDrilldown,
  CommitmentTreemapDrilldown,
} from "../api/action-reducers/viz/commitment";
import LocationDetailSignedTreemap from "../api/action-reducers/locationDetail/signedTreemap";
import LocationDetailCommitmentTreemap from "../api/action-reducers/locationDetail/commitmentTreemap";
import GrantDetailSignedTreemap from "../api/action-reducers/grantDetail/signedTreemap";
import GrantDetailCommitmentTreemap from "../api/action-reducers/grantDetail/commitmentTreemap";
import GrantDetailSignedTimeCycle from "../api/action-reducers/grantDetail/signedTimeCycle";
import GrantDetailCommitmentTimeCycle from "../api/action-reducers/grantDetail/commitmentTimeCycle";
import PartnerDetailCommitmentTreemap, {
  PartnerDetailCommitmentTreemapDrilldown,
} from "../api/action-reducers/partnerDetail/commitmentTreemap";
import PartnerDetailSignedTreemap, {
  PartnerDetailSignedTreemapDrilldown,
} from "../api/action-reducers/partnerDetail/signedTreemap";

import componentsAppBar from "app/state/api/action-reducers/cms/componentsAppBar";
import componentsChartsBudgets from "app/state/api/action-reducers/cms/componentsChartsBudgets";
import componentsChartsCommon from "app/state/api/action-reducers/cms/componentsChartsCommon";
import componentsChartsEligibility from "app/state/api/action-reducers/cms/componentsChartsEligibility";
import componentsChartsGeomap from "app/state/api/action-reducers/cms/componentsChartsGeomap";
import componentsChartsGrants from "app/state/api/action-reducers/cms/componentsChartsGrants";
import componentsChartsInvestments from "app/state/api/action-reducers/cms/componentsChartsInvestments";
import componentsChartsNetwork from "app/state/api/action-reducers/cms/componentsChartsNetwork";
import componentsChartsPerformanceRating from "app/state/api/action-reducers/cms/componentsChartsPerformanceRating";
import componentsChartsPledges from "app/state/api/action-reducers/cms/componentsChartsPledges";
import componentsCookieDialog from "app/state/api/action-reducers/cms/componentsCookieDialog";
import componentsDatasetCarousel from "app/state/api/action-reducers/cms/componentsDatasetCarousel";
import componentsInformationPanel from "app/state/api/action-reducers/cms/componentsInformationPanel";
import componentsMobile from "app/state/api/action-reducers/cms/componentsMobile";
import componentsPageHeader from "app/state/api/action-reducers/cms/componentsPageHeader";
import componentsPerformanceFrameworkComponents from "app/state/api/action-reducers/cms/componentsPerformanceFrameworkComponents";
import componentsSearch from "app/state/api/action-reducers/cms/componentsSearch";
import componentsSlideInPanel from "app/state/api/action-reducers/cms/componentsSlideInPanel";
import modulesLanding from "app/state/api/action-reducers/cms/modulesLanding";
import modulesAbout from "app/state/api/action-reducers/cms/modulesAbout";
import modulesCommon from "app/state/api/action-reducers/cms/modulesCommon";
import modulesCountryDetail from "app/state/api/action-reducers/cms/modulesCountryDetail";
import modulesDatasets from "app/state/api/action-reducers/cms/modulesDatasets";
import modulesGrantDetail from "app/state/api/action-reducers/cms/modulesGrantDetail";
import modulesGrants from "app/state/api/action-reducers/cms/modulesGrants";
import countrySummary from "../api/action-reducers/cms/countrySummary";
import notesAndDisclaimers from "../api/action-reducers/cms/notesAndDisclaimers";
import {
  DataPathActiveStep,
  DataPathPanelVisibilityState,
  DataPathStepsState,
} from "../api/action-reducers/sync/dataPath";

const storeContent: StoreModel = {
  // data viz api
  Documents: persist(Documents),
  GrantsList: persist(GrantsList),
  BudgetsFlow: persist(BudgetsFlow),
  BudgetsFlowDrilldownLevel1: persist(BudgetsFlowDrilldownLevel1),
  BudgetsFlowDrilldownLevel2: persist(BudgetsFlowDrilldownLevel2),
  Allocations: persist(Allocations),
  AllocationsPeriods: persist(AllocationsPeriods),
  AllocationsDrilldown: persist(AllocationsDrilldown),
  AllocationsGeomap: persist(AllocationsGeomap),
  AllocationsMCGeomap: persist(AllocationsMCGeomap),
  Eligibility: persist(Eligibility),
  EligibilityYears: persist(EligibilityYears),
  BudgetsGeomap: persist(BudgetsGeomap),
  BudgetsMCGeomap: persist(BudgetsMCGeomap),
  BudgetsTimeCycle: persist(BudgetsTimeCycle),
  BudgetsTimeCycleDrilldownLevel1: persist(BudgetsTimeCycleDrilldownLevel1),
  BudgetsTimeCycleDrilldownLevel2: persist(BudgetsTimeCycleDrilldownLevel2),
  DisbursementsGeomap: persist(DisbursementsGeomap),
  DisbursementsGeomapMulticountries: persist(DisbursementsGeomapMulticountries),
  DisbursementsTreemap: persist(DisbursementsTreemap),
  DisbursementsTreemapDrilldown: persist(DisbursementsTreemapDrilldown),
  DisbursementsTimeCycle: persist(DisbursementsTimeCycle),
  DisbursementsTimeCycleDrilldown: persist(DisbursementsTimeCycleDrilldown),
  SignedTreemap: persist(SignedTreemap),
  SignedTreemapDrilldown: persist(SignedTreemapDrilldown),
  SignedTimeCycle: persist(SignedTimeCycle),
  SignedTimeCycleDrilldown: persist(SignedTimeCycleDrilldown),
  CommitmentTreemap: persist(CommitmentTreemap),
  CommitmentTreemapDrilldown: persist(CommitmentTreemapDrilldown),
  CommitmentTimeCycle: persist(CommitmentTimeCycle),
  CommitmentTimeCycleDrilldown: persist(CommitmentTimeCycleDrilldown),
  PledgesContributionsGeomap: persist(PledgesContributionsGeomap),
  PledgesContributionsTimeCycle: persist(PledgesContributionsTimeCycle),
  PledgesContributionsTimeCycleDrilldown: persist(
    PledgesContributionsTimeCycleDrilldown
  ),
  PledgesContributionsTreemap: persist(PledgesContributionsTreemap),
  ResultsList: persist(ResultsList),
  ResultsStats: persist(ResultsStats),
  ResultsYears: persist(ResultsYears),
  // global search
  GlobalSearch: persist(GlobalSearch),
  // grant detail api
  GrantDetailInfo: persist(GrantDetailInfo),
  GrantDetailPeriods: persist(GrantDetailPeriods),
  GrantDetailPeriodInfo: persist(GrantDetailPeriodInfo),
  GrantDetailBudgetsFlow: persist(GrantDetailBudgetsFlow),
  GrantDetailBudgetsFlowDrilldownLevel1: persist(
    GrantDetailBudgetsFlowDrilldownLevel1
  ),
  GrantDetailBudgetsFlowDrilldownLevel2: persist(
    GrantDetailBudgetsFlowDrilldownLevel2
  ),
  GrantDetailBudgetsTimeCycle: persist(GrantDetailBudgetsTimeCycle),
  GrantDetailBudgetsTimeCycleDrilldownLevel1: persist(
    GrantDetailBudgetsTimeCycleDrilldownLevel1
  ),
  GrantDetailBudgetsTimeCycleDrilldownLevel2: persist(
    GrantDetailBudgetsTimeCycleDrilldownLevel2
  ),
  GrantDetailDisbursementsTreemap: persist(GrantDetailDisbursementsTreemap),
  GrantDetailDisbursementsTimeCycle: persist(GrantDetailDisbursementsTimeCycle),
  GrantDetailSignedTreemap: persist(GrantDetailSignedTreemap),
  GrantDetailSignedTimeCycle: persist(GrantDetailSignedTimeCycle),
  GrantDetailCommitmentTreemap: persist(GrantDetailCommitmentTreemap),
  GrantDetailCommitmentTimeCycle: persist(GrantDetailCommitmentTimeCycle),
  GrantDetailPerformanceRating: persist(GrantDetailPerformanceRating),
  GrantDetailPerformanceFramework: persist(GrantDetailPerformanceFramework),
  GrantDetailPerformanceFrameworkExpand: persist(
    GrantDetailPerformanceFrameworkExpand
  ),
  GrantDetailDocuments: persist(GrantDetailDocuments),
  // location detail api
  LocationDetailInfo: persist(LocationDetailInfo),
  EligibilityCountry: persist(EligibilityCountry),
  LocationDetailDisbursementsTreemap: persist(
    LocationDetailDisbursementsTreemap
  ),
  LocationDetailSignedTreemap: persist(LocationDetailSignedTreemap),
  LocationDetailCommitmentTreemap: persist(LocationDetailCommitmentTreemap),
  LocationDetailDocuments: persist(LocationDetailDocuments),
  LocationDetailBudgetsFlow: persist(LocationDetailBudgetsFlow),
  LocationDetailBudgetsFlowDrilldownLevel1: persist(
    LocationDetailBudgetsFlowDrilldownLevel1
  ),
  LocationDetailBudgetsFlowDrilldownLevel2: persist(
    LocationDetailBudgetsFlowDrilldownLevel2
  ),
  LocationDetailBudgetsTimeCycle: persist(LocationDetailBudgetsTimeCycle),
  LocationDetailBudgetsTimeCycleDrilldownLevel2: persist(
    LocationDetailBudgetsTimeCycleDrilldownLevel2
  ),
  LocationDetailBudgetsTimeCycleDrilldownLevel1: persist(
    LocationDetailBudgetsTimeCycleDrilldownLevel1
  ),
  LocationGrants: persist(LocationGrants),
  // partner detail api
  PartnerDetailInfo: persist(PartnerDetailInfo),
  PartnerDetailDisbursementsTreemap: persist(PartnerDetailDisbursementsTreemap),
  PartnerDetailDisbursementsTreemapDrilldown: persist(
    PartnerDetailDisbursementsTreemapDrilldown
  ),
  PartnerDetailSignedTreemap: persist(PartnerDetailSignedTreemap),
  PartnerDetailSignedTreemapDrilldown: persist(
    PartnerDetailSignedTreemapDrilldown
  ),
  PartnerDetailCommitmentTreemap: persist(PartnerDetailCommitmentTreemap),
  PartnerDetailCommitmentTreemapDrilldown: persist(
    PartnerDetailCommitmentTreemapDrilldown
  ),
  PartnerDetailBudgetsFlow: persist(PartnerDetailBudgetsFlow),
  PartnerDetailBudgetsFlowDrilldownLevel1: persist(
    PartnerDetailBudgetsFlowDrilldownLevel1
  ),
  PartnerDetailBudgetsFlowDrilldownLevel2: persist(
    PartnerDetailBudgetsFlowDrilldownLevel2
  ),
  PartnerDetailBudgetsTimeCycle: persist(PartnerDetailBudgetsTimeCycle),
  PartnerDetailBudgetsTimeCycleDrilldownLevel1: persist(
    PartnerDetailBudgetsTimeCycleDrilldownLevel1
  ),
  PartnerDetailBudgetsTimeCycleDrilldownLevel2: persist(
    PartnerDetailBudgetsTimeCycleDrilldownLevel2
  ),
  // filter options api
  LocationFilterOptions: persist(LocationFilterOptions),
  ComponentFilterOptions: persist(ComponentFilterOptions),
  PartnerTypeFilterOptions: persist(PartnerTypeFilterOptions),
  StatusFilterOptions: persist(StatusFilterOptions),
  ReplenishmentPeriodFilterOptions: persist(ReplenishmentPeriodFilterOptions),
  DonorFilterOptions: persist(DonorFilterOptions),
  // sync state variables
  AppliedFiltersState: persist(AppliedFiltersState),
  ToolBoxPanelPFPeriodState: persist(ToolBoxPanelPFPeriodState),
  PageHeaderVizDrilldownsState: persist(PageHeaderVizDrilldownsState),
  ToolBoxPanelAggregateByState: persist(ToolBoxPanelAggregateByState),
  ToolBoxPanelResultsYearState: persist(ToolBoxPanelResultsYearState),
  ToolBoxPanelDonorMapTypeState: persist(ToolBoxPanelDonorMapTypeState),
  ToolBoxPanelDonorMapViewState: persist(ToolBoxPanelDonorMapViewState),
  ToolBoxPanelEligibilityYearState: persist(ToolBoxPanelEligibilityYearState),
  ToolBoxPanelInvestmentsMapViewState: persist(
    ToolBoxPanelInvestmentsMapViewState
  ),
  ToolBoxPanelAllocationsPeriodState: persist(
    ToolBoxPanelAllocationsPeriodState
  ),
  ToolBoxPanelDisbursementsSliderValues,
  ToolBoxPanelEligibilityAdvancedCheckboxState: persist(
    ToolBoxPanelEligibilityAdvancedCheckboxState
  ),
  ToolBoxPanelBudgetFlowDrilldownSelectors,
  ToolBoxPanelBudgetTimeCycleDrilldownYearSelector,
  // sync data path vars
  DataPathPanelVisibilityState,
  DataPathSteps: persist(DataPathStepsState),
  DataPathActiveStep: DataPathActiveStep,
  // CMS API
  cms: {
    componentsAppBar: persist(componentsAppBar),
    componentsChartsBudgets: persist(componentsChartsBudgets),
    componentsChartsCommon: persist(componentsChartsCommon),
    componentsChartsEligibility: persist(componentsChartsEligibility),
    componentsChartsGeomap: persist(componentsChartsGeomap),
    componentsChartsGrants: persist(componentsChartsGrants),
    componentsChartsInvestments: persist(componentsChartsInvestments),
    componentsChartsNetwork: persist(componentsChartsNetwork),
    componentsChartsPerformanceRating: persist(
      componentsChartsPerformanceRating
    ),
    componentsChartsPledges: persist(componentsChartsPledges),
    componentsCookieDialog: persist(componentsCookieDialog),
    componentsDatasetCarousel: persist(componentsDatasetCarousel),
    componentsInformationPanel: persist(componentsInformationPanel),
    componentsMobile: persist(componentsMobile),
    componentsPageHeader: persist(componentsPageHeader),
    componentsPerformanceFrameworkComponents: persist(
      componentsPerformanceFrameworkComponents
    ),
    componentsSearch: persist(componentsSearch),
    componentsSlideInPanel: persist(componentsSlideInPanel),
    modulesLanding: persist(modulesLanding),
    modulesAbout: persist(modulesAbout),
    modulesCommon: persist(modulesCommon),
    modulesCountryDetail: persist(modulesCountryDetail),
    modulesDatasets: persist(modulesDatasets),
    modulesGrantDetail: persist(modulesGrantDetail),
    modulesGrants: persist(modulesGrants),
    countrySummary: persist(countrySummary),
    notesAndDisclaimers: persist(notesAndDisclaimers),
  },
};

export const store = createStore(storeContent);
