import React from "react";
import Container from "@material-ui/core/Container";
import { SubheaderToolbar } from "app/modules/common/subheader-toolbar";
import { ReportCreateView } from "app/modules/report-module/views/create";
import { ReportInitialView } from "app/modules/report-module/views/initial";
import { ReportRightPanel } from "app/modules/report-module/components/right-panel";

export default function ReportModule() {
  const [rightPanelOpen, setRightPanelOpen] = React.useState(true);
  const [reportName, setReportName] = React.useState("My First Report");
  const [currentView, setCurrentView] = React.useState<
    "initial" | "create" | "preview"
  >("initial");

  return (
    <div>
      <SubheaderToolbar
        pageType="report"
        name={reportName}
        setName={setReportName}
      />
      <ReportRightPanel
        open={rightPanelOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpen={() => setRightPanelOpen(true)}
        onClose={() => setRightPanelOpen(false)}
      />
      <div
        css={`
          width: 100%;
          height: 150px;
        `}
      />
      <Container maxWidth="lg">
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
          {currentView === "initial" && (
            <ReportInitialView setCurrentView={setCurrentView} />
          )}
          {currentView === "create" && <ReportCreateView />}
        </div>
      </Container>
    </div>
  );
}
