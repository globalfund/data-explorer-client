import React from "react";
import Box from "@material-ui/core/Box";
import { DndProvider } from "react-dnd";
import Container from "@material-ui/core/Container";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PrimaryButton } from "app/components/Styled/button";
import { SubheaderToolbar } from "app/modules/common/subheader-toolbar";
import { ReportCreateView } from "app/modules/report-module/views/create";
import { ReportInitialView } from "app/modules/report-module/views/initial";
import { ReportRightPanel } from "app/modules/report-module/components/right-panel";

export default function ReportModule() {
  const [buttonActive, setButtonActive] = React.useState(false);
  const [rightPanelOpen, setRightPanelOpen] = React.useState(true);
  const [reportName, setReportName] = React.useState("My First Report");
  const [currentView, setCurrentView] = React.useState<
    "initial" | "create" | "preview"
  >("initial");
  const [reportType, setReportType] = React.useState<"basic" | "advanced">(
    "basic"
  );

  const handleNextButton = () => {
    if (buttonActive) {
      setCurrentView("create");
      setButtonActive(false);
    }
  };

  const handleSetButtonActive = (
    active: boolean,
    type: "basic" | "advanced"
  ) => {
    console.log(type);
    setButtonActive(active);
    setReportType(type);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <SubheaderToolbar
        pageType="report"
        name={reportName}
        setName={setReportName}
      />
      <ReportRightPanel
        open={rightPanelOpen}
        currentView={currentView}
        onOpen={() => setRightPanelOpen(true)}
        onClose={() => setRightPanelOpen(false)}
      />
      <div
        css={`
          width: 100%;
          height: 100px;
        `}
      />
      {currentView === "create" && (
        <ReportCreateView reportType={reportType} open={rightPanelOpen} />
      )}
      {currentView === "initial" && (
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
      )}
    </DndProvider>
  );
}
