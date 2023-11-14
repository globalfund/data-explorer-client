import React from "react";
import { v4 } from "uuid";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { DndProvider } from "react-dnd";
import { useRecoilState } from "recoil";
import { useAuth0 } from "@auth0/auth0-react";
import { useSessionStorage } from "react-use";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { IHeaderDetails } from "./components/right-panel/data";
import ReportEditView from "app/modules/report-module/views/edit";
import AITemplate from "app/modules/report-module/views/ai-template";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { SubheaderToolbar } from "../common/subheader-toolbar/SubheaderToolbar";
import {
  ReportContentHeightsType,
  ReportContentWidthsType,
  ReportModel,
  emptyReport,
} from "app/modules/report-module/data";
import ReportCreateView from "app/modules/report-module/views/create";
import { ReportPreviewView } from "app/modules/report-module/views/preview";
import { ReportInitialView } from "app/modules/report-module/views/initial";
import { IFramesArray } from "app/modules/report-module/views/create/data";
import { ReportRightPanel } from "app/modules/report-module/components/right-panel";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  Redirect,
} from "react-router-dom";
import {
  persistedReportStateAtom,
  reportRightPanelViewAtom,
} from "app/state/recoil/atoms";

interface RowFrameProps {
  structure:
    | "oneByOne"
    | "oneByTwo"
    | "oneByThree"
    | "oneByFour"
    | "oneByFive"
    | null;
  items: (string | object)[];
  id: string;
  content: (string | object | null)[];
  contentWidths: ReportContentWidthsType[];
  contentHeights: ReportContentHeightsType[];
  contentTypes: ("text" | "divider" | "chart" | null)[];
  type: "rowFrame" | "divider";
}

export default function ReportModule() {
  const { user } = useAuth0();
  const history = useHistory();
  const { page, view } = useParams<{
    page: string;
    view: "initial" | "edit" | "create" | "preview" | "ai-template";
  }>();
  const reportNameRef = React.useRef<string>("");
  const framesArrayRef = React.useRef<IFramesArray[]>([]);
  const headerDetailsRef = React.useRef<IHeaderDetails>({} as IHeaderDetails);
  const AppliedHeaderDetailsRef = React.useRef<IHeaderDetails>(
    {} as IHeaderDetails
  );

  const token = useSessionStorage("authToken", "")[0];

  const setRightPanelView = useRecoilState(reportRightPanelViewAtom)[1];

  const [persistedReportState, setPersistedReportState] = useRecoilState(
    persistedReportStateAtom
  );
  const [isPreviewView, setIsPreviewView] = React.useState(false);

  const localReportState = JSON.parse(persistedReportState.framesArray);

  let localPickedCharts: string[] = [];
  localReportState.map((data: any) => {
    return data.contentTypes.map((item: any, index: number) => {
      if (item === "chart") {
        localPickedCharts.push(data.content[index]);
      }
    });
  });

  const [rightPanelOpen, setRightPanelOpen] = React.useState(true);
  const [reportName, setReportName] = React.useState("Untitled report");
  const [hasSubHeaderTitleFocused, setHasSubHeaderTitleFocused] =
    React.useState(false);
  const [hasSubHeaderTitleBlurred, setHasSubHeaderTitleBlurred] =
    React.useState(false);

  const [isPreviewSaveEnabled, setIsPreviewSaveEnabled] = React.useState(false);
  const [reportType, setReportType] = React.useState<
    "basic" | "advanced" | "ai"
  >("basic");
  const [headerDetails, setHeaderDetails] = React.useState({
    title: "",
    description: EditorState.createEmpty(),
    showHeader: true,
    backgroundColor: "#252c34",
    titleColor: "#ffffff",
    descriptionColor: "#ffffff",
    dateColor: "#ffffff",
  });
  const [appliedHeaderDetails, setAppliedHeaderDetails] =
    React.useState(headerDetails);
  const [stopInitializeFramesWidth, setStopInitializeFramesWidth] =
    React.useState(false);

  React.useEffect(() => {
    //set report name back to untitled report if it is empty and user is not focused on subheader title
    if (reportName === "" && hasSubHeaderTitleBlurred) {
      setReportName("Untitled report");
    }
  }, [hasSubHeaderTitleBlurred]);

  const handleRowFrameItemResize = (
    rowId: string,
    itemIndex: number,
    width: number,

    height: number
  ) => {
    setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));
      const frameIndex = tempPrev.findIndex((frame) => frame.id === rowId);
      if (frameIndex === -1) {
        return prev;
      }
      const contentContainer = document.getElementById("content-container");
      const percentage =
        ((width + (tempPrev[frameIndex].structure !== "oneByOne" ? 30 : 0)) /
          contentContainer!.offsetWidth) *
        100;
      tempPrev[frameIndex].contentWidths[itemIndex] = percentage;
      if (tempPrev[frameIndex].content.length > 1) {
        let remainingWidth = 100 - percentage;
        tempPrev[frameIndex].content.forEach((_, index) => {
          if (index < itemIndex) {
            remainingWidth -= tempPrev[frameIndex].contentWidths[index];
          }
          if (index > itemIndex) {
            tempPrev[frameIndex].contentWidths[index] =
              remainingWidth / (tempPrev[frameIndex].content.length - index);
          }
        });
      }
      if (tempPrev[frameIndex].contentHeights) {
        tempPrev[frameIndex].contentHeights[itemIndex] = height;
      } else {
        tempPrev[frameIndex].contentHeights = [];
        tempPrev[frameIndex].contentHeights[itemIndex] = height;
      }
      return [...tempPrev];
    });
  };

  const deleteFrame = (id: string) => {
    setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));
      const frameId = tempPrev.findIndex((frame) => frame.id === id);

      tempPrev.splice(frameId, 1);
      return [...tempPrev];
    });
  };

  const handlePersistReportState = () => {
    // does not have up to date values of states so we use refs
    setPersistedReportState({
      ...persistedReportState,
      reportName: reportNameRef.current,
      headerDetails: {
        ...headerDetailsRef.current,
        description: JSON.stringify(
          convertToRaw(headerDetailsRef.current.description.getCurrentContent())
        ),
      },
      appliedHeaderDetails: {
        ...AppliedHeaderDetailsRef.current,
        description: JSON.stringify(
          convertToRaw(
            AppliedHeaderDetailsRef.current.description.getCurrentContent()
          )
        ),
      },
      framesArray: JSON.stringify(
        framesArrayRef.current.map((frame) => ({
          id: frame.id,
          structure: frame.structure,
          content: frame.content.map((item, index) =>
            frame.contentTypes[index] === "text"
              ? convertToRaw((item as EditorState).getCurrentContent())
              : item
          ),
          contentTypes: frame.contentTypes,
          contentWidths: frame.contentWidths,
          contentHeights: frame.contentHeights,
          items: frame.content.map((item, index) =>
            frame.contentTypes[index] === "text"
              ? convertToRaw((item as EditorState).getCurrentContent())
              : item
          ),
        }))
      ),
    });
  };

  const id = v4();

  const [framesArray, setFramesArray] = React.useState<IFramesArray[]>([
    {
      id,
      frame: {
        rowIndex: 0,
        rowId: id,
        handlePersistReportState,
        handleRowFrameItemResize,
        type: "rowFrame",
      },
      content: [],
      contentWidths: [],
      contentHeights: [],
      contentTypes: [],
      structure: null,
    },
  ]);

  React.useEffect(() => {
    if (view === "edit" && !rightPanelOpen) {
      setRightPanelOpen(true);
    }
  }, [view]);

  //sets report state to persisted report state
  React.useEffect(() => {
    setReportName(persistedReportState.reportName || "Untitled report");
    setHeaderDetails({
      ...persistedReportState.headerDetails,

      description: EditorState.createWithContent(
        convertFromRaw(
          JSON.parse(persistedReportState.headerDetails.description)
        )
      ),
    });

    setAppliedHeaderDetails({
      ...persistedReportState.appliedHeaderDetails,

      description: EditorState.createWithContent(
        convertFromRaw(
          JSON.parse(persistedReportState.appliedHeaderDetails.description)
        )
      ),
    });

    const localFramesArray =
      JSON.parse(persistedReportState.framesArray || "[]").length > 0
        ? JSON.parse(persistedReportState.framesArray).map(
            (rowFrame: RowFrameProps, index: number) => {
              const isDivider =
                rowFrame.content &&
                rowFrame.content.length === 1 &&
                rowFrame.content[0] === ReportElementsType.DIVIDER;

              const content = rowFrame?.items?.map((item, index) => {
                return rowFrame.contentTypes[index] === "text"
                  ? EditorState.createWithContent(convertFromRaw(item as any))
                  : item;
              });
              return {
                id: rowFrame.id,

                frame: {
                  rowIndex: index,
                  rowId: rowFrame.id,

                  handlePersistReportState,
                  handleRowFrameItemResize,
                  type: isDivider ? "divider" : "rowFrame",
                  forceSelectedType: rowFrame.structure ?? undefined,
                  previewItems: content,
                },

                type: rowFrame.type,
                content: content ?? [],
                contentWidths: rowFrame.contentWidths,
                contentHeights: rowFrame.contentHeights,
                contentTypes: rowFrame.contentTypes,
                structure: rowFrame.structure,
              };
            }
          )
        : framesArray;

    setFramesArray(localFramesArray);
  }, [persistedReportState]);

  const reportCreateData = useStoreState(
    (state) =>
      (state.reports.ReportCreate.crudData ?? emptyReport) as ReportModel
  );
  const clearChart = useStoreActions(
    (actions) => actions.charts.ChartGet.clear
  );

  const resetDataset = useStoreActions(
    (actions) => actions.charts.dataset.reset
  );
  const resetChartType = useStoreActions(
    (actions) => actions.charts.chartType.reset
  );
  const resetMapping = useStoreActions(
    (actions) => actions.charts.mapping.reset
  );

  const reportGetData = useStoreState(
    (state) => (state.reports.ReportGet.crudData ?? emptyReport) as ReportModel
  );

  const reportCreateLoading = useStoreState(
    (state) => state.reports.ReportCreate.loading
  );

  const reportCreateSuccess = useStoreState(
    (state) => state.reports.ReportCreate.success
  );

  const reportCreate = useStoreActions(
    (actions) => actions.reports.ReportCreate.post
  );

  const reportCreateClear = useStoreActions(
    (actions) => actions.reports.ReportCreate.clear
  );

  const reportEditLoading = useStoreState(
    (state) => state.reports.ReportUpdate.loading
  );

  const reportEditSuccess = useStoreState(
    (state) => state.reports.ReportUpdate.success
  );

  const reportEdit = useStoreActions(
    (actions) => actions.reports.ReportUpdate.patch
  );

  const reportEditClear = useStoreActions(
    (actions) => actions.reports.ReportUpdate.clear
  );

  const reportError401 = useStoreState(
    (state) =>
      get(state.reports.ReportGet.errorData, "data.error.statusCode", 0) === 401
  );

  React.useEffect(() => {
    return () => {
      resetDataset();
      resetChartType();
      reportEditClear();
      reportCreateClear();
      resetMapping();
      clearChart();
      setRightPanelView("elements");
      setFramesArray([]);
    };
  }, []);

  //get current value of states for handlePersistReportState function
  headerDetailsRef.current = headerDetails;
  AppliedHeaderDetailsRef.current = appliedHeaderDetails;
  framesArrayRef.current = framesArray;
  reportNameRef.current = reportName;

  const handleSetButtonActive = (type: "basic" | "advanced" | "ai") => {
    setReportType(type);
    if (type === "ai") {
      history.push(`/report/${page}/ai-template`);
    } else {
      history.push(`/report/${page}/create`);
    }
  };

  const resetReport = () => {
    const id = v4();
    setPersistedReportState({
      reportName: "Untitled report",
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
      framesArray: JSON.stringify([
        {
          id,
          frame: {
            rowIndex: 0,
            rowId: id,
            handlePersistReportState,
            handleRowFrameItemResize,
            type: "rowFrame",
          },
          content: [],
          contentWidths: [],
          contentHeights: [],
          contentTypes: [],
          structure: null,
        },
      ]),
    });
    setFramesArray([
      {
        id,
        frame: {
          rowIndex: 0,
          rowId: id,

          handlePersistReportState,
          handleRowFrameItemResize,
          type: "rowFrame",
        },
        content: [],
        contentWidths: [],
        contentHeights: [],
        contentTypes: [],
        structure: null,
      },
    ]);
    setHeaderDetails({
      title: "",
      description: EditorState.createEmpty(),
      showHeader: true,
      backgroundColor: "#252c34",
      titleColor: "#ffffff",
      descriptionColor: "#ffffff",
      dateColor: "#ffffff",
    });
    setReportName("Untitled report");
    setRightPanelView("elements");
    setRightPanelOpen(true);
  };

  const onSave = async () => {
    const action = page === "new" ? reportCreate : reportEdit;
    action({
      token,
      patchId: page === "new" ? undefined : page,
      values: {
        name: reportName,
        authId: user?.sub,
        showHeader: headerDetails.showHeader,
        title: headerDetails.showHeader ? headerDetails.title : undefined,
        subTitle: convertToRaw(
          headerDetails.showHeader
            ? headerDetails.description.getCurrentContent()
            : EditorState.createEmpty().getCurrentContent()
        ),
        rows: framesArray.map((frame) => ({
          structure: frame.structure,
          items: frame.content.map((item, index) =>
            frame.contentTypes[index] === "text"
              ? convertToRaw((item as EditorState).getCurrentContent())
              : item
          ),
          contentWidths: {
            id: frame.id,
            widths: frame.contentWidths,
          },
          contentHeights: {
            id: frame.id,
            heights: frame.contentHeights,
          },
        })),
        backgroundColor: appliedHeaderDetails.backgroundColor,
        titleColor: appliedHeaderDetails.titleColor,
        descriptionColor: appliedHeaderDetails.descriptionColor,
        dateColor: appliedHeaderDetails.dateColor,
      },
    });
  };

  React.useEffect(() => {
    if (view === "edit" && !rightPanelOpen) {
      setRightPanelOpen(true);
    }
  }, [view]);

  React.useEffect(() => {
    let textValue = !(
      reportName === "Untitled report" &&
      !headerDetails.description.getCurrentContent().hasText() &&
      isEmpty(headerDetails.title) &&
      framesArray.length === 1
    );

    let framesArrayState = framesArray.some(
      (frame) =>
        frame.content.length !== 0 ||
        frame.contentTypes.length !== 0 ||
        frame.structure !== null
    );

    setIsPreviewSaveEnabled(textValue || framesArrayState);
  }, [reportName, framesArray, headerDetails]);

  React.useEffect(() => {
    if (
      (reportCreateSuccess &&
        reportCreateData.id &&
        reportCreateData.id.length > 0) ||
      reportEditSuccess
    ) {
      const id = reportCreateSuccess ? reportCreateData.id : page;
      history.push(`/report/${id}`);
    }
  }, [reportCreateSuccess, reportEditSuccess, reportCreateData]);

  return (
    <DndProvider backend={HTML5Backend}>
      {(reportCreateLoading || reportEditLoading) && <PageLoader />}
      {!reportError401 && view !== "ai-template" && view !== "initial" && (
        <SubheaderToolbar
          pageType="report"
          onReportSave={onSave}
          setName={setReportName}
          setHasSubHeaderTitleFocused={setHasSubHeaderTitleFocused}
          setHasSubHeaderTitleBlurred={setHasSubHeaderTitleBlurred}
          forceEnablePreviewSave={isPreviewSaveEnabled}
          name={page !== "new" && !view ? reportGetData.name : reportName}
          reportName={reportName}
          appliedHeaderDetails={appliedHeaderDetails}
          framesArray={framesArray}
          headerDetails={headerDetails}
          setStopInitializeFramesWidth={setStopInitializeFramesWidth}
          handlePersistReportState={handlePersistReportState}
          isPreviewView={isPreviewView}
        />
      )}
      {view &&
        view !== "preview" &&
        view !== "initial" &&
        view !== "ai-template" && (
          <ReportRightPanel
            open={rightPanelOpen}
            currentView={view}
            headerDetails={headerDetails}
            setHeaderDetails={setHeaderDetails}
            appliedHeaderDetails={appliedHeaderDetails}
            setAppliedHeaderDetails={setAppliedHeaderDetails}
            onOpen={() => setRightPanelOpen(true)}
            onClose={() => setRightPanelOpen(false)}
            showHeaderItem={!headerDetails.showHeader}
            framesArray={framesArray}
            reportName={reportName}
            handlePersistReportState={handlePersistReportState}
          />
        )}
      <div
        css={`
          width: 100%;
          height: ${view === "ai-template" ? "40px" : "98px"};
        `}
      />
      <Switch>
        <Route path="/report/:page/initial">
          <ReportInitialView
            resetReport={resetReport}
            setButtonActive={handleSetButtonActive}
          />
        </Route>
        <Route path="/report/:page/ai-template">
          <AITemplate />
        </Route>
        <Route path="/report/:page/create">
          <ReportCreateView
            open={rightPanelOpen}
            view={view}
            setReportName={setReportName}
            reportName={reportName}
            deleteFrame={deleteFrame}
            hasSubHeaderTitleFocused={hasSubHeaderTitleFocused}
            reportType={reportType}
            framesArray={framesArray}
            headerDetails={headerDetails}
            setFramesArray={setFramesArray}
            setHeaderDetails={setHeaderDetails}
            handlePersistReportState={handlePersistReportState}
            handleRowFrameItemResize={handleRowFrameItemResize}
          />
        </Route>
        <Route path="/report/:page/edit">
          <ReportEditView
            open={rightPanelOpen}
            setName={setReportName}
            localPickedCharts={localPickedCharts}
            framesArray={framesArray}
            headerDetails={headerDetails}
            setFramesArray={setFramesArray}
            setHeaderDetails={setHeaderDetails}
            setAppliedHeaderDetails={setAppliedHeaderDetails}
            handlePersistReportState={handlePersistReportState}
            handleRowFrameItemResize={handleRowFrameItemResize}
            stopInitializeFramesWidth={stopInitializeFramesWidth}
            setStopInitializeFramesWidth={setStopInitializeFramesWidth}
            view={view}
          />
        </Route>
        <Route path="/report/:page/preview">
          <ReportPreviewView setIsPreviewView={setIsPreviewView} />
        </Route>
        <Route path="/report/:page">
          <ReportPreviewView setIsPreviewView={setIsPreviewView} />
        </Route>
        <Route path="/report/new">
          <Redirect to="/report/new/initial" />
        </Route>
        <Route path="*">
          <NoMatchPage />
        </Route>
      </Switch>
    </DndProvider>
  );
}
