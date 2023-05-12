import React from "react";
import { v4 } from "uuid";
import filter from "lodash/filter";
import Box from "@material-ui/core/Box";
import { DndProvider } from "react-dnd";
import Container from "@material-ui/core/Container";
import { EditorState, convertToRaw } from "draft-js";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PageLoader } from "app/modules/common/page-loader";
import { PrimaryButton } from "app/components/Styled/button";
import { NoMatchPage } from "app/modules/common/no-match-page";
import { ReportEditView } from "app/modules/report-module/views/edit";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { SubheaderToolbar } from "app/modules/common/subheader-toolbar";
import { ReportModel, emptyReport } from "app/modules/report-module/data";
import { ReportCreateView } from "app/modules/report-module/views/create";
import { IFramesArray } from "app/modules/report-module/views/create/data";
import { ReportPreviewView } from "app/modules/report-module/views/preview";
import { ReportInitialView } from "app/modules/report-module/views/initial";
import RowFrame from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import { ReportRightPanel } from "app/modules/report-module/components/right-panel";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  Redirect,
} from "react-router-dom";
import { unSavedReportPreviewMode } from "app/state/recoil/atoms";
import { useRecoilState } from "recoil";

export default function ReportModule() {
  const history = useHistory();
  const { page, view } = useParams<{
    page: string;
    view: "initial" | "edit" | "create" | "preview";
  }>();

  const [buttonActive, setButtonActive] = React.useState(false);
  const [rightPanelOpen, setRightPanelOpen] = React.useState(true);
  const [reportName, setReportName] = React.useState("My First Report");
  const [reportType, setReportType] = React.useState<
    "basic" | "advanced" | "ai"
  >("basic");
  const [pickedCharts, setPickedCharts] = React.useState<any[]>([]);
  const [reportPreviewMode, __] = useRecoilState(unSavedReportPreviewMode);
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

  const [isPreviewSaveEnabled, setIsPreviewSaveEnabled] = React.useState(false);

  const handleRowFrameItemAddition = (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
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
      | "oneByFive"
      | "oneToFour"
      | "fourToOne"
  ) => {
    let content: (string | object | null)[] = [];
    let contentTypes: ("text" | "divider" | "chart" | null)[] = [];
    switch (structure) {
      case "oneByOne":
        content = [null];
        contentTypes = [null];
        break;
      case "oneByTwo":
      case "fourToOne":
      case "oneByTwo":
        content = [null, null];
        contentTypes = [null, null];
        break;
      case "oneByThree":
        content = [null, null, null];
        contentTypes = [null, null, null];
        break;
      case "oneByFour":
        content = [null, null, null, null];
        contentTypes = [null, null, null, null];
        break;
      case "oneByFive":
        content = [null, null, null, null, null];
        contentTypes = [null, null, null, null, null];
        break;
      default:
        break;
    }
    setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));

      tempPrev[rowIndex].content = content;
      tempPrev[rowIndex].contentTypes = contentTypes;
      tempPrev[rowIndex].structure = structure;
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

  const id = v4();
  const [framesArray, setFramesArray] = React.useState<IFramesArray[]>([
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
        />
      ),
      content: [],
      contentTypes: [],
      structure: null,
    },
  ]);

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

  const handleNextButton = () => {
    if (buttonActive) {
      history.push(`/report/${page}/create`);
      setButtonActive(false);
    }
  };

  const handleSetButtonActive = (
    active: boolean,
    type: "basic" | "advanced" | "ai"
  ) => {
    setButtonActive(active);
    setReportType(type);
  };

  const resetFrames = () => {
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
          />
        ),
        content: [],
        contentTypes: [],
        structure: null,
      },
    ]);
  };

  const reportOrder = useStoreState(
    (state) => state.reports.orderData.value.order
  );

  const reportOrderClear = useStoreActions(
    (actions) => actions.reports.orderData.clear
  );

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
          .sort(function (a, b) {
            return reportOrder.indexOf(a.id) - reportOrder.indexOf(b.id);
          })
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
        dateColor: appliedHeaderDetails.dateColor,
      },
    });
  };

  React.useEffect(() => {
    return () => {
      reportEditClear();
      reportOrderClear();
      reportCreateClear();
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

  return (
    <DndProvider backend={HTML5Backend}>
      {(reportCreateLoading || reportEditLoading) && <PageLoader />}
      <SubheaderToolbar
        pageType="report"
        onReportSave={onSave}
        setName={setReportName}
        forceEnablePreviewSave={isPreviewSaveEnabled}
        name={page !== "new" && !view ? reportGetData.name : reportName}
      />
      {view &&
        view !== "preview" &&
        !reportPreviewMode &&
        view !== "initial" && (
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
          />
        )}
      <div
        css={`
          width: 100%;
          height: 98px;
        `}
      />
      <Switch>
        <Route path="/report/:page/initial">
          <Container maxWidth="lg">
            <Box height={50} />
            <ReportInitialView
              resetFrames={resetFrames}
              buttonActive={buttonActive}
              setButtonActive={handleSetButtonActive}
            />
            <div
              css={`
                height: calc(100vh - 450px);
              `}
            />
            <div
              css={`
                width: 100%;
                display: flex;
                padding-right: 20px;
                justify-content: flex-end;
              `}
            >
              <div
                css={`
                  color: #fff;
                  width: 200px;
                `}
              >
                <PrimaryButton
                  disabled={!buttonActive}
                  onClick={handleNextButton}
                  color={buttonActive ? "#231D2C" : "#E4E4E4"}
                >
                  use template
                </PrimaryButton>
              </div>
            </div>
          </Container>
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
          />
        </Route>
        <Route path="/report/:page/edit">
          <ReportEditView
            open={rightPanelOpen}
            setName={setReportName}
            setPickedCharts={setPickedCharts}
            framesArray={framesArray}
            headerDetails={headerDetails}
            setFramesArray={setFramesArray}
            setHeaderDetails={setHeaderDetails}
            setAppliedHeaderDetails={setAppliedHeaderDetails}
            handleRowFrameItemAddition={handleRowFrameItemAddition}
            handleRowFrameItemRemoval={handleRowFrameItemRemoval}
            handleRowFrameStructureTypeSelection={
              handleRowFrameStructureTypeSelection
            }
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
    </DndProvider>
  );
}
