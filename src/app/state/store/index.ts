import { createStore, persist } from "easy-peasy";
import { StoreModel } from "app/state/api/interfaces";
import { CMSData } from "app/state/api/action-reducers/sync";
import GlobalSearch from "app/state/api/action-reducers/search";
import modulesAbout from "app/state/api/action-reducers/cms/modulesAbout";
import modulesCommon from "app/state/api/action-reducers/cms/modulesCommon";
import { HomeResultsStats } from "app/state/api/action-reducers/home/stats";
import modulesGrants from "app/state/api/action-reducers/cms/modulesGrants";
import { GeographyList } from "app/state/api/action-reducers/geography/list";
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
import ComponentFilterOptions from "app/state/api/action-reducers/filters/components";
import modulesGrantDetail from "app/state/api/action-reducers/cms/modulesGrantDetail";
import { HomeBudgetsTreemap } from "app/state/api/action-reducers/home/budgets-treemap";
import notesAndDisclaimers from "app/state/api/action-reducers/cms/notesAndDisclaimers";
import componentsDialogBox from "app/state/api/action-reducers/cms/componentsDialogBox";
import componentsPageHeader from "app/state/api/action-reducers/cms/componentsPageHeader";
import modulesCountryDetail from "app/state/api/action-reducers/cms/modulesCountryDetail";
import PartnerTypeFilterOptions from "app/state/api/action-reducers/filters/partnerTypes";
import componentsChartsCommon from "app/state/api/action-reducers/cms/componentsChartsCommon";
import componentsChartsGeomap from "app/state/api/action-reducers/cms/componentsChartsGeomap";
import componentsChartsGrants from "app/state/api/action-reducers/cms/componentsChartsGrants";
import componentsCookieDialog from "app/state/api/action-reducers/cms/componentsCookieDialog";
import componentsSlideInPanel from "app/state/api/action-reducers/cms/componentsSlideInPanel";
import modulesFundingRequests from "app/state/api/action-reducers/cms/modulesFundingRequests";
import componentsChartsBudgets from "app/state/api/action-reducers/cms/componentsChartsBudgets";
import componentsChartsNetwork from "app/state/api/action-reducers/cms/componentsChartsNetwork";
import componentsChartsPledges from "app/state/api/action-reducers/cms/componentsChartsPledges";
import { FundingRequestsTableGeneric } from "app/state/api/action-reducers/viz/fundingRequests";
import { HomeExpendituresHeatmap } from "app/state/api/action-reducers/home/expenditures-heatmap";
import componentsDatasetCarousel from "app/state/api/action-reducers/cms/componentsDatasetCarousel";
import componentsInformationPanel from "app/state/api/action-reducers/cms/componentsInformationPanel";
import { ResourceMobilizationStats } from "app/state/api/action-reducers/resource-mobilization/stats";
import componentsChartsEligibility from "app/state/api/action-reducers/cms/componentsChartsEligibility";
import componentsChartsInvestments from "app/state/api/action-reducers/cms/componentsChartsInvestments";
import { HomeAllocationsRadialChart } from "app/state/api/action-reducers/home/allocations-radial-chart";
import { HomeDisbursementsLineChart } from "app/state/api/action-reducers/home/disbursements-line-chart";
import ReplenishmentPeriodFilterOptions from "app/state/api/action-reducers/filters/replenishmentPeriods";
import componentsChartsPerformanceRating from "app/state/api/action-reducers/cms/componentsChartsPerformanceRating";
import { HomePledgesContributionsBarChart } from "app/state/api/action-reducers/home/pledges-contributions-bar-chart";
import { ResourceMobilizationTable } from "app/state/api/action-reducers/resource-mobilization/pledges-contributions-table";
import { ResourceMobilizationSunburst } from "app/state/api/action-reducers/resource-mobilization/pledges-contributions-sunburst";
import componentsPerformanceFrameworkComponents from "app/state/api/action-reducers/cms/componentsPerformanceFrameworkComponents";
import { ResourceMobilizationExpandableBarChart } from "app/state/api/action-reducers/resource-mobilization/pledges-contributions-expandable-bar-chart";
import {
  EligibilityYears,
  EligibilityStatusCodelist,
  EligibilityDiseaseBurdenCodelist,
} from "app/state/api/action-reducers/viz/eligibility";

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
