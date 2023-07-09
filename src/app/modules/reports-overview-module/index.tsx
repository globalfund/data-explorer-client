/* third-party */
import React from "react";
import get from "lodash/get";

/* project */
import BigLogo from "app/assets/BigLogo";
import { useCMSData } from "app/hooks/useCMSData";
import { container, subtitle } from "app/modules/landing-module/styles";
import Toolbar from "app/modules/reports-overview-module/components/toolbar";
import ReportsGrid from "./components/reportsGrid";

export default function ReportsOverviewModule() {
  const cmsData = useCMSData({ returnData: true });
  const [tableView, setTableView] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [openSearch, setOpenSearch] = React.useState(false);
  const [sortValue, setSortValue] = React.useState("createdDate");
  return (
    <div css={container}>
      <div
        css={`
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 80px;
          @media (max-width: 600px) {
            > svg {
              width: 100%;
            }
          }
        `}
      >
        <BigLogo />
        <div css={subtitle}>{get(cmsData, "modulesLanding.subTitle", "")}</div>
        <div
          css={`
            height: 102px;
          `}
        />
        <Toolbar
          setTableView={setTableView}
          sortBy={sortValue}
          tableView={tableView}
        />
        <ReportsGrid
          searchStr={searchValue}
          sortBy={sortValue}
          tableView={tableView}
        />
      </div>
    </div>
  );
}
