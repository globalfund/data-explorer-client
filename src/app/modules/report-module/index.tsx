import React from "react";
import { v4 } from "uuid";
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

export default function ReportModule() {
  const history = useHistory();
  const { page, view } = useParams<{
    page: string;
    view: "initial" | "edit" | "create" | "preview";
  }>();

  const [buttonActive, setButtonActive] = React.useState(false);
  const [rightPanelOpen, setRightPanelOpen] = React.useState(true);
  const [reportName, setReportName] = React.useState("My First Report");
  const [reportType, setReportType] = React.useState<"basic" | "advanced">(
    "basic"
  );
  const [headerDetails, setHeaderDetails] = React.useState({
    title: "",
    description: EditorState.createEmpty(),
    showHeader: true,
    backgroundColor: "#252c34",
    titleColor: "#ffffff",
    descriptionColor: "#ffffff",
    dateColor: "#ffffff",
  });
  const [isPreviewSaveEnabled, setIsPreviewSaveEnabled] = React.useState(false);

  const handleRowFrameItemAddition = (
    rowIndex: number,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => {
    setFramesArray((prev) => {
      prev[rowIndex].content[itemIndex] = itemContent;
      prev[rowIndex].contentTypes[itemIndex] = itemContentType;
      return [...prev];
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
      prev[rowIndex].content = content;
      prev[rowIndex].contentTypes = contentTypes;
      prev[rowIndex].structure = structure;
      return [...prev];
    });
  };

  const [framesArray, setFramesArray] = React.useState<IFramesArray[]>([
    {
      id: v4(),
      frame: (
        <RowFrame
          rowIndex={0}
          deleteFrame={() => deleteFrame(0)}
          handleRowFrameItemAddition={handleRowFrameItemAddition}
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

  const deleteFrame = (index: number) => {
    setFramesArray((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };

  const handleNextButton = () => {
    if (buttonActive) {
      history.push(`/report/${page}/create`);
      setButtonActive(false);
    }
  };

  const handleSetButtonActive = (
    active: boolean,
    type: "basic" | "advanced"
  ) => {
    setButtonActive(active);
    setReportType(type);
  };

  const resetFrames = () => {
    setFramesArray([
      {
        id: v4(),
        frame: (
          <RowFrame
            rowIndex={0}
            deleteFrame={() => deleteFrame(0)}
            handleRowFrameItemAddition={handleRowFrameItemAddition}
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
        rows: framesArray.map((frame) => ({
          structure: frame.structure,
          items: frame.content.map((item, index) =>
            frame.contentTypes[index] === "text"
              ? convertToRaw((item as EditorState).getCurrentContent())
              : item
          ),
        })),
        backgroundColor: headerDetails.backgroundColor,
        titleColor: headerDetails.titleColor,
        descriptionColor: headerDetails.descriptionColor,
        dateColor: headerDetails.dateColor,
      },
    });
  };

  React.useEffect(() => {
    return () => {
      reportEditClear();
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
      {view && view !== "preview" && (
        <ReportRightPanel
          open={rightPanelOpen}
          currentView={view}
          headerDetails={headerDetails}
          setHeaderDetails={setHeaderDetails}
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
            <div
              css={`
                transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
                width: ${rightPanelOpen
                  ? "calc(100vw - ((100vw - 1280px) / 2) - 400px - 50px)"
                  : "100%"};

                @media (max-width: 1280px) {
                  width: calc(100vw - 400px);
                }
              `}
            >
              <ReportInitialView
                resetFrames={resetFrames}
                buttonActive={buttonActive}
                setButtonActive={handleSetButtonActive}
              />
            </div>
            <div
              css={`
                height: 55vh;
              `}
            />
            <div
              css={`
                display: flex;
                justify-content: flex-end;
                width: 86%;
                /* height: 40vh; */
                transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
                width: ${rightPanelOpen
                  ? "calc(100vw - ((100vw - 1280px) / 2) - 400px - 50px)"
                  : "100%"};
              `}
            >
              <div
                css={`
                  width: 19%;
                  padding-right: 20px;
                  color: #fff;
                `}
              >
                <PrimaryButton
                  color={buttonActive ? "#231D2C" : "#E4E4E4"}
                  disabled={!buttonActive}
                  onClick={handleNextButton}
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
            reportType={reportType}
            framesArray={framesArray}
            headerDetails={headerDetails}
            setFramesArray={setFramesArray}
            setHeaderDetails={setHeaderDetails}
            handleRowFrameItemAddition={handleRowFrameItemAddition}
            handleRowFrameStructureTypeSelection={
              handleRowFrameStructureTypeSelection
            }
          />
        </Route>
        <Route path="/report/:page/edit">
          <ReportEditView
            open={rightPanelOpen}
            setName={setReportName}
            framesArray={framesArray}
            headerDetails={headerDetails}
            setFramesArray={setFramesArray}
            setHeaderDetails={setHeaderDetails}
            handleRowFrameItemAddition={handleRowFrameItemAddition}
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
