import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IRowFrameStructure {
  rowType:
    | "oneByOne"
    | "oneByTwo"
    | "oneByThree"
    | "oneByFour"
    | "oneByFive"
    | "oneToFour"
    | "fourToOne"
    | "";

  disableAddRowStructureButton: boolean;
  index: number;
}

const { persistAtom } = recoilPersist();

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

export const homeDisplayAtom = atom<"data" | "charts" | "reports">({
  key: "homeDisplayAtom",
  default: "reports",
});

export const reportRightPanelViewAtom = atom<
  "elements" | "charts" | "editHeader"
>({
  key: "reportRightPanelViewAtom",
  default: "elements",
});

export const isDividerOrRowFrameDraggingAtom = atom<boolean>({
  key: "isDividerOrRowFrameDraggingAtom",
  default: false,
});

export const unSavedReportPreviewMode = atom<boolean>({
  key: "unSavedReportPreviewMode",
  default: false,
});

export interface ReportContentWidthsType {
  id: string;
  widths: number[];
}

export const reportContentWidthsAtom = atom<ReportContentWidthsType[]>({
  key: "reportContentWidths",
  default: [],
});

export const reportContentIsResizingAtom = atom<boolean>({
  key: "reportContentIsResizing",
  default: false,
});

export const reportContentContainerWidth = atom<number>({
  key: "reportContentContainerWidth",
  default: 0,
});
