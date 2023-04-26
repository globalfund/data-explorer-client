import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";

const { persistAtom } = recoilPersist();

export interface BreadCrumbItem {
  name: string;
  path: string;
  id: string;
  vizLevel?: number;
  vizSelected?:
    | string
    | {
        id: string | undefined;
        filterStr: string | undefined;
      };
}
export const cmsDataAtom = atom({
  key: "cmsDataAtom",
  default: {
    componentsAppBar: {},
    componentsChartsBudgets: {},
    componentsChartsCommon: {},
    componentsChartsEligibility: {},
    componentsChartsGeomap: {},
    componentsChartsGrants: {},
    componentsChartsInvestments: {},
    componentsChartsNetwork: {},
    componentsChartsPerformanceRating: {},
    componentsChartsPledges: {},
    componentsCookieDialog: {},
    componentsDatasetCarousel: {},
    componentsInformationPanel: {},
    componentsMobile: {},
    componentsPageHeader: {},
    componentsPerformanceFrameworkComponents: {},
    componentsSearch: {},
    componentsSlideInPanel: {},
    modulesLanding: {},
    modulesAbout: {},
    modulesCommon: {},
    modulesCountryDetail: {},
    modulesDatasets: {},
    modulesGrantDetail: {},
    modulesGrants: {},
  },
  effects_UNSTABLE: [persistAtom],
});

export const breadCrumbItems = atom<BreadCrumbItem[]>({
  key: "breadCrumbItems",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const filterExpandedGroup = atom<FilterGroupProps | null>({
  key: "filterExpandedGroup",
  default: null,
});

export const selectedViewAtom = atom<string>({
  key: "selectedViewAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const locationAccessToFundingCycleAtom = atom<string | null>({
  key: "locationAccessToFundingCycleAtom",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
