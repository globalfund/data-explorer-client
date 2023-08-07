import React from "react";
import { v4 } from "uuid";
import get from "lodash/get";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import { DndProvider } from "react-dnd";
import { useRecoilState } from "recoil";
import cloneDeep from "lodash/cloneDeep";
import Container from "@material-ui/core/Container";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { IHeaderDetails } from "./components/right-panel/data";
import AITemplate from "app/modules/report-module/views/ai-template";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { ReportEditView } from "app/modules/report-module/views/edit";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { SubheaderToolbar } from "app/modules/common/subheader-toolbar";
import { ReportModel, emptyReport } from "app/modules/report-module/data";
import { ReportCreateView } from "app/modules/report-module/views/create";
import { ReportPreviewView } from "app/modules/report-module/views/preview";
import { ReportInitialView } from "app/modules/report-module/views/initial";
import { ReportRightPanel } from "app/modules/report-module/components/right-panel";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import RowFrame, {
  Divider,
} from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  Redirect,
} from "react-router-dom";

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
import {
  reportContentWidthsAtom,
  ReportContentWidthsType,
  persistedReportStateAtom,
  reportContentHeightsAtom,
  reportRightPanelViewAtom,
  ReportContentHeightsType,
} from "app/state/recoil/atoms";
import {
  IFramesArray,
  IFramesArrayWithItems,
} from "app/modules/report-module/views/create/data";

export default function ReportModule() {
  const history = useHistory();
  const { page, view } = useParams<{
    page: string;
    view: "initial" | "edit" | "create" | "preview" | "ai-template";
  }>();

  const reportNameRef = React.useRef<string>("");
  const reportOrderRef = React.useRef<string[]>([]);
  const framesArrayRef = React.useRef<IFramesArray[]>([]);
  const headerDetailsRef = React.useRef<IHeaderDetails>({} as IHeaderDetails);
  const AppliedHeaderDetailsRef = React.useRef<IHeaderDetails>(
    {} as IHeaderDetails
  );

  const setRightPanelView = useRecoilState(reportRightPanelViewAtom)[1];

  const [persistedReportState, setPersistedReportState] = useRecoilState(
    persistedReportStateAtom
  );

  const [reportContentWidths, setReportContentWidths] = useRecoilState(
    reportContentWidthsAtom
  );

  const [reportContentHeights, setReportContentHeights] = useRecoilState(
    reportContentHeightsAtom
  );
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
  const [pickedCharts, setPickedCharts] = React.useState(
    localPickedCharts || []
  );

  const alignFramesWContentWidths = (framesArr: IFramesArray[]) => {
    let contentWidths: {
      id: string;
      widths: number[];
    }[] = [];
    framesArr.forEach((frame) => {
      contentWidths.push({
        id: frame.id,
        widths:
          frame.contentWidths?.length === 0 ? [100] : frame?.contentWidths,
      });
    });
    setReportContentWidths(contentWidths);
  };

  const alignFramesWContentHeights = (framesArr: IFramesArray[]) => {
    let contentHeights: {
      id: string;
      heights: number[];
    }[] = [];
    framesArr.forEach((frame) => {
      contentHeights.push({
        id: frame.id,
        heights:
          frame.contentHeights?.length === 0 ? [] : frame?.contentHeights,
      });
    });
    setReportContentHeights(contentHeights);
  };

  const handleRowFrameItemResize = (
    rowId: string,
    itemIndex: number,
    width: number,
    reportContentWidths: ReportContentWidthsType[],
    height: number
  ) => {
    setFramesArray((prev) => {
      if (!stopInitializeFramesWidth) {
        setStopInitializeFramesWidth(true);
      }
      const tempPrev = cloneDeep(prev);
      tempPrev.sort(
        (a, b) =>
          reportOrderRef.current.indexOf(a.id) -
          reportOrderRef.current.indexOf(b.id)
      );
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
      const uReportContentWidths: ReportContentWidthsType[] = [];
      for (const item of tempPrev) {
        const fItem = reportContentWidths.find((value) => value.id === item.id);
        if (fItem) uReportContentWidths.push(fItem);
      }
      tempPrev.forEach((frame, index) => {
        const indexContentWidths: number[] = get(
          uReportContentWidths,
          `[${index}].widths`,
          []
        );
        if (
          frame.content.length !== frame.contentWidths.length &&
          indexContentWidths.length
        ) {
          indexContentWidths.forEach((w, i) => {
            if (!frame.contentWidths[i]) {
              tempPrev[index].contentWidths[i] = w;
            }
          });
        }
      });
      if (tempPrev[frameIndex].contentHeights) {
        tempPrev[frameIndex].contentHeights[itemIndex] = height;
      } else {
        tempPrev[frameIndex].contentHeights = [];
        tempPrev[frameIndex].contentHeights[itemIndex] = height;
      }
      if (view === "edit") {
        alignFramesWContentWidths(tempPrev);
        alignFramesWContentHeights(tempPrev);
      }
      return [...tempPrev];
    });
  };

  const deleteFrame = (id: string) => {
    setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));
      const frameId = tempPrev.findIndex((frame) => frame.id === id);
      const contentArr = tempPrev[frameId].content;

      setPickedCharts((prevPickedCharts) => {
        return prevPickedCharts.filter((item) => !contentArr.includes(item));
      });

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
        framesArrayRef.current
          .sort(
            (a, b) =>
              reportOrderRef.current.indexOf(a.id) -
              reportOrderRef.current.indexOf(b.id)
          )
          .map((frame) => ({
            id: frame.id,
            structure: frame.structure,
            content: frame.content,
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
        setPickedCharts,
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
    if (view !== "edit" && view !== "preview") {
      alignFramesWContentWidths(framesArray);
      alignFramesWContentHeights(framesArray);
    }
  }, [framesArray, view]);

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
              return {
                id: rowFrame.id,

                frame: {
                  rowIndex: index,
                  rowId: rowFrame.id,

                  handlePersistReportState,
                  handleRowFrameItemResize,
                  setPickedCharts,
                  type: isDivider ? "divider" : "rowFrame",
                  forceSelectedType: rowFrame.structure ?? undefined,
                  previewItems: rowFrame.items,
                },

                type: rowFrame.type,
                content: rowFrame.content,
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

  const reportOrder = useStoreState(
    (state) => state.reports.orderData.value.order
  );

  //get current value of states for handlePersistReportState function
  reportOrderRef.current = reportOrder;
  headerDetailsRef.current = headerDetails;
  AppliedHeaderDetailsRef.current = appliedHeaderDetails;
  framesArrayRef.current = framesArray;
  reportNameRef.current = reportName;

  const reportOrderClear = useStoreActions(
    (actions) => actions.reports.orderData.clear
  );

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
    setFramesArray([
      {
        id,
        frame: {
          rowIndex: 0,
          rowId: id,

          handlePersistReportState,
          handleRowFrameItemResize,
          type: "rowFrame",
          setPickedCharts,
        },
        content: [],
        contentWidths: [],
        contentHeights: [],
        contentTypes: [],
        structure: null,
      },
    ]);
    setPickedCharts([]);
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

  const onSave = () => {
    const action = page === "new" ? reportCreate : reportEdit;
    action({
      patchId: page === "new" ? undefined : page,
      values: {
        name: reportName,
        showHeader: headerDetails.showHeader,
        title: headerDetails.showHeader ? headerDetails.title : undefined,
        subTitle: convertToRaw(
          headerDetails.showHeader
            ? headerDetails.description.getCurrentContent()
            : EditorState.createEmpty().getCurrentContent()
        ),
        rows: framesArray
          .sort((a, b) => reportOrder.indexOf(a.id) - reportOrder.indexOf(b.id))
          .map((frame) => ({
            structure: frame.structure,
            items: frame.content.map((item, index) =>
              frame.contentTypes[index] === "text"
                ? convertToRaw((item as EditorState).getCurrentContent())
                : item
            ),
          })),
        backgroundColor: appliedHeaderDetails.backgroundColor,
        titleColor: appliedHeaderDetails.titleColor,
        descriptionColor: appliedHeaderDetails.descriptionColor,
        contentWidths: reportContentWidths,
        contentHeights: reportContentHeights,
        dateColor: appliedHeaderDetails.dateColor,
      },
    });
  };

  React.useEffect(() => {
    return () => {
      reportEditClear();
      reportOrderClear();
      reportCreateClear();
      setPickedCharts([]);
      setReportContentWidths([]);
      setReportContentHeights([]);
      setRightPanelView("elements");
    };
  }, []);

  // sets report state to persisted report state
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
              return {
                id: rowFrame.id,

                frame: {
                  rowIndex: index,
                  rowId: rowFrame.id,

                  handlePersistReportState,
                  handleRowFrameItemResize,
                  setPickedCharts,
                  type: isDivider ? "divider" : "rowFrame",
                  forceSelectedType: rowFrame.structure ?? undefined,
                  previewItems: rowFrame.items,
                },

                type: rowFrame.type,
                content: rowFrame.content,
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

  React.useEffect(() => {
    setPickedCharts(localPickedCharts);
  }, [persistedReportState]);

  React.useEffect(() => {
    if (view !== "edit" && view !== "preview") {
      alignFramesWContentWidths(framesArray);
      alignFramesWContentHeights(framesArray);
    }
  }, [framesArray, view]);

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
      reportOrderClear();
      const id = reportCreateSuccess ? reportCreateData.id : page;
      history.push(`/report/${id}`);
    }
  }, [reportCreateSuccess, reportEditSuccess, reportCreateData]);

  return (
    <DndProvider backend={HTML5Backend}>
      {(reportCreateLoading || reportEditLoading) && <PageLoader />}
      {view !== "ai-template" && view !== "initial" && (
        <SubheaderToolbar
          pageType="report"
          onReportSave={onSave}
          setName={setReportName}
          forceEnablePreviewSave={isPreviewSaveEnabled}
          name={page !== "new" && !view ? reportGetData.name : reportName}
          reportName={reportName}
          appliedHeaderDetails={appliedHeaderDetails}
          framesArray={framesArray}
          headerDetails={headerDetails}
          setStopInitializeFramesWidth={setStopInitializeFramesWidth}
          handlePersistReportState={handlePersistReportState}
        />
      )}
      {view &&
        view !== "preview" &&
        view !== "initial" &&
        view !== "ai-template" && (
          <ReportRightPanel
            open={rightPanelOpen}
            currentView={view}
            pickedCharts={pickedCharts}
            setPickedCharts={setPickedCharts}
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
          <Container maxWidth="lg">
            <ReportInitialView
              resetReport={resetReport}
              setButtonActive={handleSetButtonActive}
            />
          </Container>
        </Route>
        <Route path="/report/:page/ai-template">
          <AITemplate />
        </Route>
        <Route path="/report/:page/create">
          <ReportCreateView
            open={rightPanelOpen}
            pickedCharts={pickedCharts}
            setPickedCharts={setPickedCharts}
            deleteFrame={deleteFrame}
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
            setPickedCharts={setPickedCharts}
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
          />
        </Route>
        <Route path="/report/:page/preview">
          <ReportPreviewView />
        </Route>
        <Route path="/report/:page">
          <ReportPreviewView />
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
