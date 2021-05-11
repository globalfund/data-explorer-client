/* third-party */
import React from "react";
import { Link } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageHeader } from "app/components/PageHeader";
import { ArrowForwardIcon } from "app/assets/icons/ArrowForward";
import { InformationPanel } from "app/components/InformationPanel";
import { Search } from "app/modules/results-module/components/Search";
import { ResultsList } from "app/modules/results-module/components/List";
import { ResultsInfoContent } from "app/modules/results-module/components/InfoContent";
import {
  resultsmockitems,
  sidePanelInfoData,
} from "app/modules/results-module/data";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";

export default function ResultsModule() {
  useTitle("The Data Explorer - Results");
  const [openInfoPanel, setOpenInfoPanel] = React.useState(true);
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);

  React.useEffect(() => {
    document.body.style.background = "#fff";
  }, []);

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <PageHeader
        title="Results"
        breadcrumbs={[
          { name: "Home", link: "/" },
          {
            name: "Datasets",
            menuitems: [
              <Link
                to="/datasets"
                css={`
                  display: flex;
                  align-items: center;

                  > svg {
                    margin-right: 16px;
                    transform: rotate(-180deg) scale(0.5);

                    > path {
                      fill: #13183f;
                    }
                  }
                `}
              >
                <ArrowForwardIcon />
                <b>Datasets</b>
              </Link>,
              <Link to="/viz/investments/disbursements">
                <b>Finance</b>-Investments/Disbursements
              </Link>,
              <Link to="/viz/investments/time-cycle">
                <b>Finance</b>-Investments/Time-Cycle
              </Link>,
              <Link to="/viz/budgets/flow">
                <b>Finance</b>-Budgets Flow
              </Link>,
              <Link to="/viz/budgets/time-cycle">
                <b>Finance</b>-Budgets Time Cycle
              </Link>,
              <Link to="/viz/allocations">
                <b>Finance</b>-Allocations
              </Link>,
              <Link to="/viz/eligibility">
                <b>Finance</b>-Eligibility
              </Link>,
              <Link to="/viz/pledges-contributions/time-cycle">
                <b>Finance</b>-Pledges & Contributions Time Cycle
              </Link>,
              <Link to="/grants">
                <b>Grants</b>
              </Link>,
              <Link to="/results">
                <b>Results</b>
              </Link>,
              <Link to="/documents">
                <b>Documents</b>
              </Link>,
            ],
          },
          { name: "Results" },
        ]}
      />
      <InformationPanel
        open={openInfoPanel}
        onButtonClick={() => setOpenInfoPanel(!openInfoPanel)}
      >
        <ResultsInfoContent {...sidePanelInfoData} />
      </InformationPanel>
      <ToolBoxPanel
        open={openToolboxPanel}
        onButtonClick={() => setOpenToolboxPanel(!openToolboxPanel)}
      >
        <div />
      </ToolBoxPanel>
      <div css="width: 100%;height: 25px;" />
      <div
        css={`
          width: 100%;
        `}
      >
        <Search />
        <div css="width: 100%;height: 25px;" />
        <ResultsList listitems={resultsmockitems} />
      </div>
      <div css="width: 100%;height: 25px;" />
      <div
        css={`
          left: 0;
          top: 48px;
          z-index: 10;
          width: 100%;
          height: 100%;
          position: fixed;
          background: rgba(35, 35, 35, 0.5);
          opacity: ${openToolboxPanel ? 1 : 0};
          visibility: ${openToolboxPanel ? "visible" : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </div>
  );
}
