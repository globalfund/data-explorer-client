import React, { useRef } from "react";
import { v4 } from "uuid";
import Box from "@material-ui/core/Box";
import { DndProvider } from "react-dnd";
import { useRecoilState, useResetRecoilState } from "recoil";
import Container from "@material-ui/core/Container";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PageLoader } from "app/modules/common/page-loader";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { ReportEditView } from "app/modules/report-module/views/edit";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { SubheaderToolbar } from "app/modules/common/subheader-toolbar";
import { ReportModel, emptyReport } from "app/modules/report-module/data";
import { ReportCreateView } from "app/modules/report-module/views/create";
import { IFramesArray } from "app/modules/report-module/views/create/data";
import { ReportPreviewView } from "app/modules/report-module/views/preview";
import { ReportInitialView } from "app/modules/report-module/views/initial";
import { ReportRightPanel } from "app/modules/report-module/components/right-panel";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";

import {
  ReportContentWidthsType,
  persistedReportStateAtom,
  ReportContentHeightsType,
  chartHolderAtom,
} from "app/state/recoil/atoms";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  Redirect,
  useLocation,
} from "react-router-dom";

import AITemplate from "app/modules/report-module/views/ai-template";
import { IHeaderDetails } from "app/modules/report-module/components/right-panel/data";

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
  const history = useHistory();
  const location = useLocation();
  const reportOrderRef = useRef<string[]>([]);
  const framesArrayRef = useRef<IFramesArray[]>([]);
  const headerDetailsRef = useRef<IHeaderDetails>({} as IHeaderDetails);
  const AppliedHeaderDetailsRef = useRef<IHeaderDetails>({} as IHeaderDetails);
  const reportNameRef = useRef<string>("");
  const [reportName, setReportName] = React.useState("My First Report");
  const [reportType, setReportType] = React.useState<
    "basic" | "advanced" | "ai"
  >("basic");
  const { page, view } = useParams<{
    page: string;
    view: "initial" | "edit" | "create" | "preview" | "ai-template";
  }>();

  const [persistedReportState, setPersistedReportState] = useRecoilState(
    persistedReportStateAtom
  );
  const localReportState = JSON.parse(persistedReportState.framesArray);
  const resetChartHolderAtomState = useResetRecoilState(chartHolderAtom);
  const clearChart = useStoreActions(
    (actions) => actions.charts.ChartGet.clear
  );
  const resetDataset = useStoreActions(
    (actions) => actions.charts.dataset.reset
  );
  const buttonActive = React.useState(false)[0];
  const [rightPanelOpen, setRightPanelOpen] = React.useState(true);
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

  let localPickedCharts: string[] = [];
  localReportState.map((data: any, _i: number) => {
    return data.contentTypes.map((item: any, index: number) => {
      if (item === "chart") {
        localPickedCharts.push(data.content[index]);
      }
    });
  });

  const [pickedCharts, setPickedCharts] = React.useState<any[]>(
    localPickedCharts || []
  );
  React.useEffect(() => {
    setPickedCharts(localPickedCharts);
  }, [persistedReportState]);

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
  const [isPreviewSaveEnabled, setIsPreviewSaveEnabled] = React.useState(false);

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
      const contentArr = tempPrev[frameId].content;

      setPickedCharts((prevPickedCharts) => {
        return prevPickedCharts.filter((item) => !contentArr.includes(item));
      });

      tempPrev.splice(frameId, 1);
      return [...tempPrev];
    });
  };

  const handlePersistReportState = () => {
    //does not have up to date values of states so we use refs
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
          .sort(function (a, b) {
            return (
              reportOrderRef.current.indexOf(a.id) -
              reportOrderRef.current.indexOf(b.id)
            );
          })
          .map((frame) => ({
            id: frame.id,
            structure: frame.structure,
            content: frame.content,
            contentTypes: frame.contentTypes,
            contentWidths: frame.contentWidths,

            items: frame.content.map((item, index) =>
              frame.contentTypes[index] === "text"
                ? convertToRaw((item as EditorState).getCurrentContent())
                : item
            ),
          }))
      ),
    });
  };

  const [framesArray, setFramesArray] = React.useState<IFramesArray[]>([]);

  React.useEffect(() => {
    if (view === "edit" && !rightPanelOpen) {
      setRightPanelOpen(true);
    }
  }, [view]);

  // sets report state to persisted report state
  React.useEffect(() => {
    setReportName(persistedReportState.reportName || "My First Report");
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

              const content = rowFrame.items.map((item, index) => {
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
                  setPickedCharts,
                  type: isDivider ? "divider" : "rowFrame",
                  forceSelectedType: rowFrame.structure ?? undefined,
                  previewItems: content,
                },
                type: rowFrame.type,
                content,

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

  // get current value of states for handlePersistReportState function
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
    setFramesArray([]);
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
    setReportName("My First Report");
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
        // contentWidths: reportContentWidths,
        // chartTypes: filter(
        //   pickedCharts.map((pc) => {
        //     const chart = chartList.find((c) => c.id === pc);
        //     return chart?.vizType;
        //   }),
        //   (ct) => ct !== undefined
        // ),
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
      clearChart();
      resetDataset();
      resetChartHolderAtomState();
    };
  }, []);

  React.useEffect(() => {
    let value = reportName.length !== 0 && framesArray.length !== 0;
    framesArray.forEach((frame) => {
      if (
        frame.content.length === 0 ||
        frame.contentTypes.length === 0 ||
        frame.content.length !== frame.contentTypes.length ||
        frame.content.findIndex((item) => item === null) > -1
      ) {
        value = false;
      }
      setIsPreviewSaveEnabled(value);
    });
  }, [reportName, framesArray]);

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

  React.useEffect(() => {
    const containers = document.getElementsByClassName(
      "main-container"
    ) as HTMLCollectionOf<HTMLElement>;
    document.body.style.background = "#fff";
    for (const container of containers) {
      container.style.maxWidth = "none";
      container.style.paddingLeft = "0px";
      container.style.paddingRight = "0px";
    }
    return () => {
      for (const container of containers) {
        container.style.maxWidth = "1280px";
        container.style.padding = "0 24px";
      }
    };
  }, [location.pathname]);

  return (
    <DndProvider backend={HTML5Backend}>
      {(reportCreateLoading || reportEditLoading) && <PageLoader />}
      {view !== "ai-template" && (
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
            onSave={onSave}
          />
        )}
      <div
        css={`
          width: 100%;
          height: ${view === "ai-template" ? "40px" : "98px"};
        `}
      />
      <div>
        <Switch>
          <Route path="/report/:page/initial">
            <Container maxWidth="lg">
              <Box height={50} />
              <ReportInitialView
                resetReport={resetReport}
                buttonActive={buttonActive}
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
              view={view}
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
              view={view}
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
          <Route path="/report/:page">
            <ReportPreviewView setIsPreviewView={() => {}} />
          </Route>
          <Route path="/report/new">
            <Redirect to="/report/new/initial" />
          </Route>
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </div>
    </DndProvider>
  );
}
