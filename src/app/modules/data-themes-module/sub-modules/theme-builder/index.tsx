import React from "react";
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/styles";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { DataThemesAddSectionButton } from "app/modules/data-themes-module/components/add-section-button";

export function DataThemesBuilder() {
  return (
    <div css={styles.container}>
      <DataThemesPageSubHeader />
      <DataThemesToolBox />
      <div css={styles.innercontainer}>
        <DataThemesAddSectionButton />
      </div>
    </div>
  );
}
