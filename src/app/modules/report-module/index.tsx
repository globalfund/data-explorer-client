import React, { useRef } from "react";
import { v4 } from "uuid";
import get from "lodash/get";
import filter from "lodash/filter";
import Box from "@material-ui/core/Box";
import { DndProvider } from "react-dnd";
import { useRecoilState } from "recoil";
import cloneDeep from "lodash/cloneDeep";
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
import RowFrame, {
  Divider,
} from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import {
  reportContentWidthsAtom,
  ReportContentWidthsType,
  persistedReportStateAtom,
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
import { IHeaderDetails } from "./components/right-panel/data";
import { useUpdateEffect } from "react-use";

interface RowFrameProps {
  structure:
    | "oneByOne"
    | "oneByTwo"
    | "oneByThree"
    | "oneByFour"
    | "oneByFive"
    | "oneToFour"
    | "fourToOne"
    | null;
  items: (string | object)[];
  id: string;
  content: (string | object | null)[];
  contentWidths: ReportContentWidthsType[];
  contentTypes: ("text" | "divider" | "chart" | null)[];
}

export default function ReportModule() {
  const history = useHistory();
  const location = useLocation();
  const reportOrderRef = useRef<string[]>([]);
  const framesArrayRef = useRef<IFramesArray[]>([]);
  const headerDetailsRef = useRef<IHeaderDetails>({} as IHeaderDetails);
  const AppliedHeaderDetailsRef = useRef<IHeaderDetails>({} as IHeaderDetails);
  const reportNameRef = useRef<string>("");

  const { page, view } = useParams<{
    page: string;
    view: "initial" | "edit" | "create" | "preview" | "ai-template";
  }>();

  const [persistedReportState, setPersistedReportState] = useRecoilState(
    persistedReportStateAtom
  );
  const buttonActive = React.useState(false)[0];
  const [rightPanelOpen, setRightPanelOpen] = React.useState(true);
  const [reportName, setReportName] = React.useState("My First Report");
  const [reportType, setReportType] = React.useState<
    "basic" | "advanced" | "ai"
  >("basic");

  const localReportState = JSON.parse(persistedReportState.framesArray);

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

  const [reportContentWidths, setReportContentWidths] = useRecoilState(
    reportContentWidthsAtom
  );

  const handleRowFrameItemAddition = (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart" | "image"
  ) => {
    setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));
      const frameId = tempPrev.findIndex((frame) => frame.id === rowId);
      if (frameId === -1) {
        return [...tempPrev];
      }
      tempPrev[frameId].content[itemIndex] = itemContent;
      tempPrev[frameId].contentTypes[itemIndex] = itemContentType;
      return [...tempPrev];
    });
  };

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

  const handleRowFrameItemResize = (
    rowId: string,
    itemIndex: number,
    width: number,
    reportContentWidths_: ReportContentWidthsType[]
  ) => {
    setFramesArray((prev) => {
      if (!stopInitializeFramesWidth) {
        setStopInitializeFramesWidth(true);
      }
      const tempPrev = cloneDeep(prev);
      tempPrev.sort(
        (a, b) => reportOrder.indexOf(a.id) - reportOrder.indexOf(b.id)
      );
      const frameIndex = tempPrev.findIndex((frame) => frame.id === rowId);
      if (frameIndex === -1) {
        return prev;
      }
      const contentContainer = document.getElementById("content-container");
      const percentage = (width / contentContainer!.offsetWidth) * 100;
      tempPrev[frameIndex].contentWidths[itemIndex] = percentage;
      if (tempPrev[frameIndex].content.length > 1) {
        const remainingWidth = 100 - percentage;
        tempPrev[frameIndex].content.forEach((_, index) => {
          if (index !== itemIndex) {
            tempPrev[frameIndex].contentWidths[index] =
              remainingWidth / (tempPrev[frameIndex].content.length - 1);
          }
        });
      }
      tempPrev.forEach((frame, index) => {
        const indexContentWidths: number[] = get(
          reportContentWidths_,
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
      if (view === "edit") {
        alignFramesWContentWidths(tempPrev);
      }
      return [...tempPrev];
    });
  };

  const handleRowFrameItemRemoval = (rowId: string, itemIndex: number) => {
    setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));
      const frameId = tempPrev.findIndex((frame) => frame.id === rowId);
      if (frameId === -1) {
        return [...tempPrev];
      }
      if (tempPrev[frameId].contentTypes[itemIndex] === "chart") {
        const chartId = tempPrev[frameId].content[itemIndex] as string;
        setPickedCharts((prevPickedCharts) =>
          filter(prevPickedCharts, (chart: string) => chart !== chartId)
        );
      }
      tempPrev[frameId].content[itemIndex] = null;
      tempPrev[frameId].contentTypes[itemIndex] = null;
      return [...tempPrev];
    });
  };

  const handleRowFrameStructureTypeSelection = (
    rowIndex: number,
    structure:
      | null
      | "oneByOne"
      | "oneByTwo"
      | "oneByThree"
      | "oneByFour"
      | "oneToFour"
      | "fourToOne"
      | "twoToThree"
      | "threeToTwo"
  ) => {
    let content: (string | object | null)[] = [];
    let contentTypes: ("text" | "divider" | "chart" | null)[] = [];
    let contentWidths: number[] = [];
    switch (structure) {
      case "oneByOne":
        content = [null];
        contentTypes = [null];
        contentWidths = [100];
        break;
      case "oneByTwo":
        content = [null, null];
        contentTypes = [null, null];
        contentWidths = [50, 50];
        break;
      case "oneByThree":
        content = [null, null, null];
        contentTypes = [null, null, null];
        contentWidths = [33, 33, 33];
        break;
      case "oneByFour":
        content = [null, null, null, null];
        contentTypes = [null, null, null, null];
        contentWidths = [25, 25, 25, 25];
        break;

      case "fourToOne":
        content = [null, null];
        contentTypes = [null, null];
        contentWidths = [75, 25];
        break;
      case "oneToFour":
        content = [null, null];
        contentTypes = [null, null];
        contentWidths = [25, 75];
        break;
      case "twoToThree":
        content = [null, null];
        contentTypes = [null, null];
        contentWidths = [40, 60];
        break;
      case "threeToTwo":
        content = [null, null];
        contentTypes = [null, null];
        contentWidths = [60, 40];
        break;
      default:
        break;
    }

    setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));

      tempPrev[rowIndex].content = content;
      tempPrev[rowIndex].contentTypes = contentTypes;
      tempPrev[rowIndex].contentWidths = contentWidths;
      tempPrev[rowIndex].structure = structure;
      if (view === "edit") {
        const newReportContentWidths = cloneDeep(reportContentWidths);
        if (newReportContentWidths[rowIndex]) {
          newReportContentWidths[rowIndex].widths = contentWidths;
        } else {
          newReportContentWidths.push({
            id: tempPrev[rowIndex].id,
            widths: contentWidths,
          });
        }
        setReportContentWidths(newReportContentWidths);
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

  const toggleRowFrameHandle = (rowId: string, state: boolean) => {
    setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));

      tempPrev.sort(
        (a, b) =>
          reportOrderRef.current.indexOf(a.id) -
          reportOrderRef.current.indexOf(b.id)
      );

      const frameId = tempPrev.findIndex((frame) => frame.id === rowId);
      if (frameId === -1) {
        return [...tempPrev];
      }

      tempPrev[frameId].isHandleOpen = state;
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

  const uniqueID = v4();

  const [framesArray, setFramesArray] = React.useState<IFramesArray[]>([]);

  useUpdateEffect(() => {
    if (view !== "edit") {
      alignFramesWContentWidths(framesArray);
    }
  }, [framesArray, view]);

  React.useEffect(() => {
    if (view === "edit" && !rightPanelOpen) {
      setRightPanelOpen(true);
    }
  }, [view]);

  //sets report state to persisted report state
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
              return {
                id: rowFrame.id,

                frame: isDivider ? (
                  <Divider delete={deleteFrame} dividerId={uniqueID} />
                ) : (
                  <RowFrame
                    key={rowFrame.id}
                    rowId={rowFrame.id}
                    rowIndex={index}
                    forceSelectedType={rowFrame.structure ?? undefined}
                    deleteFrame={deleteFrame}
                    handleRowFrameItemAddition={handleRowFrameItemAddition}
                    handleRowFrameItemRemoval={handleRowFrameItemRemoval}
                    handleRowFrameStructureTypeSelection={
                      handleRowFrameStructureTypeSelection
                    }
                    previewItems={rowFrame.items}
                    handlePersistReportState={handlePersistReportState}
                    handleRowFrameItemResize={handleRowFrameItemResize}
                    toggleRowFrameHandle={toggleRowFrameHandle}
                  />
                ),
                content: rowFrame.content,
                contentWidths: rowFrame.contentWidths,
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
        frame: (
          <RowFrame
            rowIndex={0}
            rowId={id}
            deleteFrame={deleteFrame}
            handleRowFrameItemAddition={handleRowFrameItemAddition}
            handleRowFrameItemRemoval={handleRowFrameItemRemoval}
            handleRowFrameStructureTypeSelection={
              handleRowFrameStructureTypeSelection
            }
            handlePersistReportState={handlePersistReportState}
            handleRowFrameItemResize={handleRowFrameItemResize}
            toggleRowFrameHandle={toggleRowFrameHandle}
          />
        ),
        content: [],
        contentWidths: [],
        contentTypes: [],
        structure: null,
        isHandleOpen: false,
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
    setReportName("My First Report");
  };

  const onSave = () => {
    if (!isPreviewSaveEnabled) {
      alert("Please add content to all rows");
      return;
    }
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
              pickedCharts={pickedCharts}
              setPickedCharts={setPickedCharts}
              deleteFrame={deleteFrame}
              reportType={reportType}
              framesArray={framesArray}
              headerDetails={headerDetails}
              setFramesArray={setFramesArray}
              setHeaderDetails={setHeaderDetails}
              handleRowFrameItemAddition={handleRowFrameItemAddition}
              handleRowFrameItemRemoval={handleRowFrameItemRemoval}
              handleRowFrameStructureTypeSelection={
                handleRowFrameStructureTypeSelection
              }
              handlePersistReportState={handlePersistReportState}
              handleRowFrameItemResize={handleRowFrameItemResize}
              toggleRowFrameHandle={toggleRowFrameHandle}
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
              handleRowFrameItemAddition={handleRowFrameItemAddition}
              handleRowFrameItemRemoval={handleRowFrameItemRemoval}
              handlePersistReportState={handlePersistReportState}
              handleRowFrameStructureTypeSelection={
                handleRowFrameStructureTypeSelection
              }
              handleRowFrameItemResize={handleRowFrameItemResize}
              stopInitializeFramesWidth={stopInitializeFramesWidth}
              setStopInitializeFramesWidth={setStopInitializeFramesWidth}
              toggleRowFrameHandle={toggleRowFrameHandle}
            />
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
      </div>
    </DndProvider>
  );
}
