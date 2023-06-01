import { convertToRaw, EditorState, RawDraftContentState } from "draft-js";
import { atom, RecoilState } from "recoil";
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
  default: "data",
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
});

export const persistedReportStateAtom = atom<{
  headerDetails: {
    title: string;
    description: RawDraftContentState;
    showHeader: boolean;
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    dateColor: string;
  };
}>({
  key: "reportCreateStateAtom",
  default: {
    headerDetails: {
      title: "",
      description: convertToRaw(EditorState.createEmpty().getCurrentContent()),
      showHeader: true,
      backgroundColor: "#252c34",
      titleColor: "#ffffff",
      descriptionColor: "#ffffff",
      dateColor: "#ffffff",
    },
  },
  effects_UNSTABLE: [persistAtom],
});
