/* third-party */
import React from "react";
import get from "lodash/get";
/* project */
import BigLogo from "app/assets/BigLogo";
import { useCMSData } from "app/hooks/useCMSData";
import OverviewToolbar from "app/modules/common/overview-toolbar";
import { container, subtitle } from "app/modules/landing-module/styles";
import ChartsGrid from "app/modules/charts-overview-module/components/chartsGrid";

export default function ChartsOverviewModule() {
  const cmsData = useCMSData({ returnData: true });
  const [tableView, setTableView] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
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
            height: 74px;
          `}
        />
        <OverviewToolbar
          title="Charts"
          sortValue={sortValue}
          tableView={tableView}
          buttonTitle="New Chart"
          searchValue={searchValue}
          setSortValue={setSortValue}
          setTableView={setTableView}
          buttonPath="/chart/new/data"
          setSearchValue={setSearchValue}
          sortOptions={[
            {
              label: "Date",
              value: "createdDate",
            },
            {
              label: "Title",
              value: "name",
            },
          ]}
        />
        <ChartsGrid
          tableView={tableView}
          searchValue={searchValue}
          sortValue={sortValue}
        />
      </div>
    </div>
  );
}
