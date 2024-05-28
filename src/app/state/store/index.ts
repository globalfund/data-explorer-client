import { createStore, persist } from "easy-peasy";
import { StoreModel } from "app/state/api/interfaces";
import { CMSData } from "app/state/api/action-reducers/sync";
import GlobalSearch from "app/state/api/action-reducers/search";
import { GrantInfo } from "app/state/api/action-reducers/grant/info";
import { GrantList } from "app/state/api/action-reducers/grants/list";
import modulesAbout from "app/state/api/action-reducers/cms/modulesAbout";
import modulesCommon from "app/state/api/action-reducers/cms/modulesCommon";
import { HomeResultsStats } from "app/state/api/action-reducers/home/stats";
import modulesGrants from "app/state/api/action-reducers/cms/modulesGrants";
import { GeographyList } from "app/state/api/action-reducers/geography/list";
import { GrantOverview } from "app/state/api/action-reducers/grant/overview";
import countrySummary from "app/state/api/action-reducers/cms/countrySummary";
import DonorFilterOptions from "app/state/api/action-reducers/filters/donors";
import modulesLanding from "app/state/api/action-reducers/cms/modulesLanding";
import StatusFilterOptions from "app/state/api/action-reducers/filters/status";
import componentsTable from "app/state/api/action-reducers/cms/componentsTable";
import modulesDatasets from "app/state/api/action-reducers/cms/modulesDatasets";
import { AppliedFiltersState } from "app/state/api/action-reducers/sync/filters";
import componentsAppBar from "app/state/api/action-reducers/cms/componentsAppBar";
import componentsSearch from "app/state/api/action-reducers/cms/componentsSearch";
import componentsMobile from "app/state/api/action-reducers/cms/componentsMobile";
import LocationFilterOptions from "app/state/api/action-reducers/filters/locations";
import componentsSidebar from "app/state/api/action-reducers/cms/componentsSidebar";
import modulesGrantDetail from "app/state/api/action-reducers/cms/modulesGrantDetail";
import { AnnualResultsStats } from "app/state/api/action-reducers/annual-results/stats";
import { AnnualResultsTable } from "app/state/api/action-reducers/annual-results/table";
import { HomeBudgetsTreemap } from "app/state/api/action-reducers/home/budgets-treemap";
import notesAndDisclaimers from "app/state/api/action-reducers/cms/notesAndDisclaimers";
import componentsDialogBox from "app/state/api/action-reducers/cms/componentsDialogBox";
import componentsPageHeader from "app/state/api/action-reducers/cms/componentsPageHeader";
import modulesCountryDetail from "app/state/api/action-reducers/cms/modulesCountryDetail";
import PartnerTypeFilterOptions from "app/state/api/action-reducers/filters/partnerTypes";
import { GeographyResultStats } from "app/state/api/action-reducers/geography/results-stats";
import { AccessToFundingStats } from "app/state/api/action-reducers/access-to-funding/stats";
import componentsChartsCommon from "app/state/api/action-reducers/cms/componentsChartsCommon";
import componentsChartsGeomap from "app/state/api/action-reducers/cms/componentsChartsGeomap";
import componentsChartsGrants from "app/state/api/action-reducers/cms/componentsChartsGrants";
import componentsCookieDialog from "app/state/api/action-reducers/cms/componentsCookieDialog";
import { GeographyResultsTable } from "app/state/api/action-reducers/geography/results-table";
import componentsSlideInPanel from "app/state/api/action-reducers/cms/componentsSlideInPanel";
import modulesFundingRequests from "app/state/api/action-reducers/cms/modulesFundingRequests";
import componentsChartsBudgets from "app/state/api/action-reducers/cms/componentsChartsBudgets";
import componentsChartsNetwork from "app/state/api/action-reducers/cms/componentsChartsNetwork";
import componentsChartsPledges from "app/state/api/action-reducers/cms/componentsChartsPledges";
import { FundingRequestsTableGeneric } from "app/state/api/action-reducers/viz/fundingRequests";
import { FinancialInsightsStats } from "app/state/api/action-reducers/financial-insights/stats";
import { GrantBudgetSankeyChart } from "app/state/api/action-reducers/grant/budget-sankey-chart";
import { HomeExpendituresHeatmap } from "app/state/api/action-reducers/home/expenditures-heatmap";
import { GeographyDocumentsTable } from "app/state/api/action-reducers/geography/documents-table";
import { AnnualResultsPolyline } from "app/state/api/action-reducers/annual-results/polyline-tree";
import componentsDatasetCarousel from "app/state/api/action-reducers/cms/componentsDatasetCarousel";
import { GrantExpendituresHeatmap } from "app/state/api/action-reducers/grant/expenditures-heatmap";
import { GrantTargetsResultsTable } from "app/state/api/action-reducers/grant/targets-results-table";
import componentsInformationPanel from "app/state/api/action-reducers/cms/componentsInformationPanel";
import { ResourceMobilizationStats } from "app/state/api/action-reducers/resource-mobilization/stats";
import componentsChartsEligibility from "app/state/api/action-reducers/cms/componentsChartsEligibility";
import componentsChartsInvestments from "app/state/api/action-reducers/cms/componentsChartsInvestments";
import { GrantDisbursementsBarChart } from "app/state/api/action-reducers/grant/disbursements-bar-chart";
import { HomeAllocationsRadialChart } from "app/state/api/action-reducers/home/allocations-radial-chart";
import { HomeDisbursementsLineChart } from "app/state/api/action-reducers/home/disbursements-line-chart";
import { GeographyBudgetSankeyChart } from "app/state/api/action-reducers/geography/budgets-sankey-chart";
import { GeographyEligibilityHeatmap } from "app/state/api/action-reducers/geography/eligibility-heatmap";
import ReplenishmentPeriodFilterOptions from "app/state/api/action-reducers/filters/replenishment-periods";
import { GeographyExpendituresHeatmap } from "app/state/api/action-reducers/geography/expenditures-heatmap";
import { FinancialInsightsBudgetTable } from "app/state/api/action-reducers/financial-insights/budget-table";
import { GeographyFundingRequestsTable } from "app/state/api/action-reducers/geography/funding-requests-table";
import { GeographyResultsDocumentsTable } from "app/state/api/action-reducers/geography/results-documents-table";
import { FinancialInsightsBudgetTreemap } from "app/state/api/action-reducers/financial-insights/budget-treemap";
import { AccessToFundingAllocationTable } from "app/state/api/action-reducers/access-to-funding/allocation-table";
import { GeographyAllocationsRadialChart } from "app/state/api/action-reducers/geography/allocations-radial-chart";
import { GeographyDisbursementsLineChart } from "app/state/api/action-reducers/geography/disbursements-line-chart";
import { AccessToFundingEligibilityTable } from "app/state/api/action-reducers/access-to-funding/eligibility-table";
import componentsChartsPerformanceRating from "app/state/api/action-reducers/cms/componentsChartsPerformanceRating";
import { FinancialInsightsBudgetBreakdown } from "app/state/api/action-reducers/financial-insights/budget-breakdown";
import { HomePledgesContributionsBarChart } from "app/state/api/action-reducers/home/pledges-contributions-bar-chart";
import { AccessToFundingAllocationTreemap } from "app/state/api/action-reducers/access-to-funding/allocation-treemap";
import { AccessToFundingAllocationSunburst } from "app/state/api/action-reducers/access-to-funding/allocation-sunburst";
import { FinancialInsightsCountryAbsorption } from "app/state/api/action-reducers/financial-insights/country-absorption";
import { FinancialInsightsExpendituresTable } from "app/state/api/action-reducers/financial-insights/expenditures-table";
import { FinancialInsightsBudgetUtilisation } from "app/state/api/action-reducers/financial-insights/budget-utilisation";
import { FinancialInsightsDisbursementsTable } from "app/state/api/action-reducers/financial-insights/disbursements-table";
import { AccessToFundingAllocationBarSeries } from "app/state/api/action-reducers/access-to-funding/allocation-bar-series";
import { ResourceMobilizationTable } from "app/state/api/action-reducers/resource-mobilization/pledges-contributions-table";
import { AccessToFundingFundingRequestsTable } from "app/state/api/action-reducers/access-to-funding/funding-requests-table";
import { FinancialInsightsExpendituresHeatmap } from "app/state/api/action-reducers/financial-insights/expenditures-heatmap";
import { GeographyResourceMobilizationBarChart } from "app/state/api/action-reducers/geography/resource-mobilization-bar-chart";
import { FinancialInsightsExpendituresBarChart } from "app/state/api/action-reducers/financial-insights/expenditures-bar-chart";
import { ResourceMobilizationSunburst } from "app/state/api/action-reducers/resource-mobilization/pledges-contributions-sunburst";
import { FinancialInsightsDisbursementsBarChart } from "app/state/api/action-reducers/financial-insights/disbursements-bar-chart";
import componentsPerformanceFrameworkComponents from "app/state/api/action-reducers/cms/componentsPerformanceFrameworkComponents";
import { FinancialInsightsDisbursementsLineChart } from "app/state/api/action-reducers/financial-insights/disbursements-line-chart";
import { FinancialInsightsDisbursementUtilisation } from "app/state/api/action-reducers/financial-insights/disbursement-utilisation";
import { ResourceMobilizationExpandableBarChart } from "app/state/api/action-reducers/resource-mobilization/pledges-contributions-expandable-bar-chart";
import ComponentFilterOptions, {
  ResultsComponentFilterOptions,
} from "app/state/api/action-reducers/filters/components";
import {
  GeographyGrantsTable,
  GeographyGrantsPieCharts,
} from "app/state/api/action-reducers/geography/grants";
import {
  GeographyOverview,
  GeographyOverviewCoordinatingMechanismsContacts,
} from "app/state/api/action-reducers/geography/overview";
import {
  EligibilityYears,
  EligibilityStatusCodelist,
  EligibilityDiseaseBurdenCodelist,
} from "app/state/api/action-reducers/viz/eligibility";
import {
  AllocationsCycles,
  AnnualResultsCycles,
  BudgetsCycles,
  DisbursementsCycles,
  ExpendituresCycles,
  FundingRequestsCycles,
  PledgesContributionsCycles,
} from "app/state/api/action-reducers/filters/cycles";

const storeContent: StoreModel = {
  // homepage
  HomeResultsStats: persist(HomeResultsStats),
  HomePledgesContributionsBarChart: persist(HomePledgesContributionsBarChart),
  HomeAllocationsRadialChart: persist(HomeAllocationsRadialChart),
  HomeBudgetsTreemap: persist(HomeBudgetsTreemap),
  HomeDisbursementsLineChart: persist(HomeDisbursementsLineChart),
  HomeExpendituresHeatmap: persist(HomeExpendituresHeatmap),
  // resource mobilization
  ResourceMobilizationStats: persist(ResourceMobilizationStats),
  ResourceMobilizationExpandableBarChart: persist(
    ResourceMobilizationExpandableBarChart
  ),
  ResourceMobilizationSunburst: persist(ResourceMobilizationSunburst),
  ResourceMobilizationTable: persist(ResourceMobilizationTable),
  // geographies
  GeographyList: persist(GeographyList),
  // access to funding
  AccessToFundingStats: persist(AccessToFundingStats),
  AccessToFundingEligibilityTable: persist(AccessToFundingEligibilityTable),
  AccessToFundingAllocationBarSeries: persist(
    AccessToFundingAllocationBarSeries
  ),
  AccessToFundingAllocationSunburst: persist(AccessToFundingAllocationSunburst),
  AccessToFundingAllocationTreemap: persist(AccessToFundingAllocationTreemap),
  AccessToFundingAllocationTable: persist(AccessToFundingAllocationTable),
  AccessToFundingFundingRequestsTable: persist(
    AccessToFundingFundingRequestsTable
  ),
  // financial insights
  FinancialInsightsStats: persist(FinancialInsightsStats),
  FinancialInsightsDisbursementsBarChart: persist(
    FinancialInsightsDisbursementsBarChart
  ),
  FinancialInsightsDisbursementsLineChart: persist(
    FinancialInsightsDisbursementsLineChart
  ),
  FinancialInsightsDisbursementsTable: persist(
    FinancialInsightsDisbursementsTable
  ),
  FinancialInsightsBudgetBreakdown: persist(FinancialInsightsBudgetBreakdown),
  FinancialInsightsBudgetUtilisation: persist(
    FinancialInsightsBudgetUtilisation
  ),
  FinancialInsightsCountryAbsorption: persist(
    FinancialInsightsCountryAbsorption
  ),
  FinancialInsightsDisbursementUtilisation: persist(
    FinancialInsightsDisbursementUtilisation
  ),
  FinancialInsightsBudgetTreemap: persist(FinancialInsightsBudgetTreemap),
  FinancialInsightsBudgetTable: persist(FinancialInsightsBudgetTable),
  FinancialInsightsExpendituresHeatmap: persist(
    FinancialInsightsExpendituresHeatmap
  ),
  FinancialInsightsExpendituresBarChart: persist(
    FinancialInsightsExpendituresBarChart
  ),
  FinancialInsightsExpendituresTable: persist(
    FinancialInsightsExpendituresTable
  ),
  // annual results
  AnnualResultsStats: persist(AnnualResultsStats),
  AnnualResultsPolyline: persist(AnnualResultsPolyline),
  AnnualResultsTable: persist(AnnualResultsTable),
  // grants
  GrantList: persist(GrantList),
  // location
  GeographyOverview: persist(GeographyOverview),
  GeographyOverviewCoordinatingMechanismsContacts: persist(
    GeographyOverviewCoordinatingMechanismsContacts
  ),
  GeographyResourceMobilizationBarChart: persist(
    GeographyResourceMobilizationBarChart
  ),
  GeographyAllocationsRadialChart: persist(GeographyAllocationsRadialChart),
  GeographyFundingRequestsTable: persist(GeographyFundingRequestsTable),
  GeographyEligibilityHeatmap: persist(GeographyEligibilityHeatmap),
  GeographyDocumentsTable: persist(GeographyDocumentsTable),
  GeographyDisbursementsLineChart: persist(GeographyDisbursementsLineChart),
  GeographyBudgetSankeyChart: persist(GeographyBudgetSankeyChart),
  GeographyExpendituresHeatmap: persist(GeographyExpendituresHeatmap),
  GeographyGrantsPieCharts: persist(GeographyGrantsPieCharts),
  GeographyGrantsTable: persist(GeographyGrantsTable),
  GeographyResultStats: persist(GeographyResultStats),
  GeographyResultsTable: persist(GeographyResultsTable),
  GeographyResultsDocumentsTable: persist(GeographyResultsDocumentsTable),
  // grant
  GrantInfo: persist(GrantInfo),
  GrantOverview: persist(GrantOverview),
  GrantDisbursementsBarChart: persist(GrantDisbursementsBarChart),
  GrantBudgetSankeyChart: persist(GrantBudgetSankeyChart),
  GrantExpendituresHeatmap: persist(GrantExpendituresHeatmap),
  GrantTargetsResultsTable: persist(GrantTargetsResultsTable),
  // search
  GlobalSearch: persist(GlobalSearch),
  // filter options api
  LocationFilterOptions: persist(LocationFilterOptions),
  ComponentFilterOptions: persist(ComponentFilterOptions),
  PartnerTypeFilterOptions: persist(PartnerTypeFilterOptions),
  StatusFilterOptions: persist(StatusFilterOptions),
  ReplenishmentPeriodFilterOptions: persist(ReplenishmentPeriodFilterOptions),
  DonorFilterOptions: persist(DonorFilterOptions),
  EligibilityStatusCodelist: persist(EligibilityStatusCodelist),
  EligibilityDiseaseBurdenCodelist: persist(EligibilityDiseaseBurdenCodelist),
  EligibilityYearsCodelist: persist(EligibilityStatusCodelist),
  EligibilityYears: persist(EligibilityYears),
  FundingRequestsTRPWindowCodelist: persist(FundingRequestsTableGeneric),
  FundingRequestsPortfolioCategoryCodelist: persist(
    FundingRequestsTableGeneric
  ),
  LocationAccessToFunding: {
    GrantCycles: persist(FundingRequestsTableGeneric),
  },
  AllocationsCycles: persist(AllocationsCycles),
  FundingRequestsCycles: persist(FundingRequestsCycles),
  AnnualResultsCycles: persist(AnnualResultsCycles),
  BudgetsCycles: persist(BudgetsCycles),
  PledgesContributionsCycles: persist(PledgesContributionsCycles),
  DisbursementsCycles: persist(DisbursementsCycles),
  ExpendituresCycles: persist(ExpendituresCycles),
  ResultsComponentFilterOptions: persist(ResultsComponentFilterOptions),
  // sync state variables
  AppliedFiltersState: persist(AppliedFiltersState),
  // CMS API
  CMSData: persist(CMSData),
  cms: {
    componentsAppBar: persist(componentsAppBar),
    componentsTable: persist(componentsTable),
    componentsDialogBox: persist(componentsDialogBox),

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
    componentsSidebar: persist(componentsSidebar),
    modulesLanding: persist(modulesLanding),
    modulesAbout: persist(modulesAbout),
    modulesCommon: persist(modulesCommon),
    modulesCountryDetail: persist(modulesCountryDetail),
    modulesDatasets: persist(modulesDatasets),
    modulesGrantDetail: persist(modulesGrantDetail),
    modulesGrants: persist(modulesGrants),
    modulesFundingRequests: persist(modulesFundingRequests),
    countrySummary: persist(countrySummary),
    notesAndDisclaimers: persist(notesAndDisclaimers),
  },
};

export const store = createStore(storeContent);
