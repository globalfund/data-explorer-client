import React from "react";
import Container from "@material-ui/core/Container";
import { SubheaderToolbar } from "app/modules/common/subheader-toolbar";
import { ReportCreateView } from "app/modules/report-module/views/create";
import { ReportInitialView } from "app/modules/report-module/views/initial";
import { ReportRightPanel } from "app/modules/report-module/components/right-panel";

export default function ReportModule() {
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
        currentView={currentView}
        setCurrentView={setCurrentView}
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
            width: calc(100vw - ((100vw - 1280px) / 2) - 400px - 50px);

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
