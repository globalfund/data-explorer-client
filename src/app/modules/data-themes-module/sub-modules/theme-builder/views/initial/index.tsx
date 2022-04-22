/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { DataThemesAddSectionButton } from "app/modules/data-themes-module/components/add-section-button";

export function DataThemesBuilderInitialView() {
  useTitle("Data Themes - Create");

  return (
    <div css={styles.container}>
      <DataThemesPageSubHeader />
      <DataThemesToolBox guideView />
      <div css={styles.innercontainer}>
        <DataThemesAddSectionButton showCreateYourStoryText />
      </div>
    </div>
  );
}
