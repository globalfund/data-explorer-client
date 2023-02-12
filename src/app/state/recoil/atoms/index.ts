import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

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
