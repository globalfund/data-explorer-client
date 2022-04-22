/* third-party */
import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/data/styles";
import { DataThemesAddSectionButton } from "app/modules/data-themes-module/components/add-section-button";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";

export function DataThemesBuilderDataView() {
  useTitle("Data Themes - Select Data");

  const data = useStoreState(
    (state) =>
      get(state.dataThemes, "rawData.data.data", []) as {
        [key: string]: number | string | null;
      }[]
  );

  return (
    <div css={commonStyles.container}>
      <DataThemesPageSubHeader />
      <DataThemesToolBox
        dataSteps
        openPanel={1}
        forceNextEnabled={data.length > 0}
      />
      <div css={commonStyles.innercontainer}>
        <div css={styles.placeholder}>
          Start to build a data visualization
          <br />
          Please select a dataset in the right side panel
        </div>
        <DataThemesAddSectionButton />
      </div>
    </div>
  );
}
