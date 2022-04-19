import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { styles } from "app/modules/data-themes-module/components/toolbox/styles";

export function DataThemesToolBox() {
  return (
    <div css={styles.container}>
      <h5>Guide</h5>
      <h6>You can add following contents in the theme</h6>
      <div css={styles.contentlist}>
        <div>
          <div>
            <BarChartIcon htmlColor="#262C34" />
          </div>
          Data visualisation
        </div>
        <div>
          <div>
            <SearchIcon htmlColor="#262C34" />
          </div>
          Search
        </div>
        <div>
          <div>
            <DashboardIcon htmlColor="#262C34" />
          </div>
          Data theme templates
        </div>
      </div>
    </div>
  );
}
