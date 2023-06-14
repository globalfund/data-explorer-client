import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { convertToRaw, EditorState } from "draft-js";

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

export const unSavedReportPreviewModeAtom = atom<boolean>({
  key: "unSavedReportPreviewModeAtom",
  default: false,
});

export const createChartFromReportAtom = atom<{
  state: boolean;
  view: string;
  page: string;
}>({
  key: "createChartFromReportAtom",
  default: {
    state: false,
    view: "",
    page: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const persistedReportStateAtom = atom<{
  reportName: string;
  headerDetails: {
    title: string;
    description: string;
    showHeader: boolean;
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    dateColor: string;
  };
  appliedHeaderDetails: {
    title: string;
    description: string;
    showHeader: boolean;
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    dateColor: string;
  };
  framesArray: string;
}>({
  key: "reportCreateStateAtom",
  default: {
    reportName: "My First Report",
    headerDetails: {
      title: "",
      description: JSON.stringify(
        convertToRaw(EditorState.createEmpty().getCurrentContent())
      ),
      showHeader: true,
      backgroundColor: "#252c34",
      titleColor: "#ffffff",
      descriptionColor: "#ffffff",
      dateColor: "#ffffff",
    },
    appliedHeaderDetails: {
      title: "",
      description: JSON.stringify(
        convertToRaw(EditorState.createEmpty().getCurrentContent())
      ),
      showHeader: true,
      backgroundColor: "#252c34",
      titleColor: "#ffffff",
      descriptionColor: "#ffffff",
      dateColor: "#ffffff",
    },
    framesArray: JSON.stringify([]),
  },
  effects_UNSTABLE: [persistAtom],
});
