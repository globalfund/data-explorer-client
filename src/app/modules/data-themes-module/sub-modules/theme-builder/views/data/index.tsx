/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/data/styles";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";

export function DataThemesBuilderDataView() {
  useTitle("Data Themes - Select Data");

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const setActivePanels = useStoreActions(
    (state) => state.dataThemes.activePanels.setValue
  );

  React.useEffect(() => {
    // When the Data View component is rendered, we are at step 1.
    setActivePanels({
      tabIndex: activeTabIndex,
      vizIndex: activeVizIndex,
      panel: 1,
    });
  }, []);

  return (
    <div css={commonStyles.container}>
      <div
        id="extra-loader"
        css={`
          display: none;
        `}
      >
        <PageLoader />
      </div>
      <div css={commonStyles.innercontainer}>
        <div css={styles.placeholder}>
          Start to build a data visualization
          <br />
          Please select a dataset in the right side panel
        </div>
      </div>
    </div>
  );
}
