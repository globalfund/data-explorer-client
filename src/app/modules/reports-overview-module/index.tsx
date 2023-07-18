/* third-party */
import React from "react";
import get from "lodash/get";

/* project */
import BigLogo from "app/assets/BigLogo";
import { useCMSData } from "app/hooks/useCMSData";
import { container, subtitle } from "app/modules/landing-module/styles";
import ReportsGrid from "./components/reportsGrid";
import OverviewToolbar from "../common/overview-toolbar";

export default function ReportsOverviewModule() {
  const cmsData = useCMSData({ returnData: true });
  const [tableView, setTableView] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const sortValue = "createdDate";
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
        <OverviewToolbar
          setTableView={setTableView}
          sortBy={sortValue}
          tableView={tableView}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          buttonPath="/report/new/create"
          buttonTitle="New Report"
          title="Reports"
        />
        <ReportsGrid tableView={tableView} />
      </div>
    </div>
  );
}
