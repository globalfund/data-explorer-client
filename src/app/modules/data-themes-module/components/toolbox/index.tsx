/* third-party */
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
/* project */
import { styles } from "app/modules/data-themes-module/components/toolbox/styles";
import { DataThemesToolBoxProps } from "app/modules/data-themes-module/components/toolbox/data";
import { DataThemesToolBoxSteps } from "app/modules/data-themes-module/components/toolbox/views/steps";

export function DataThemesToolBox(props: DataThemesToolBoxProps) {
  return (
    <div css={styles.container}>
      {props.guideView && (
        <section>
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
        </section>
      )}
      {props.dataSteps && (
        <DataThemesToolBoxSteps
          openPanel={props.openPanel}
          forceNextEnabled={props.forceNextEnabled}
          currentChartData={props.currentChartData}
        />
      )}
    </div>
  );
}
