/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";

export function DataThemesBuilderInitialView() {
  useTitle("Data Themes - Create");

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
    // When the initial component is rendered, we are at step 0.
    setActivePanels({
      tabIndex: activeTabIndex,
      vizIndex: activeVizIndex,
      panel: 0,
    });
  }, []);

  return (
    <div css={styles.container}>
      <div css={styles.innercontainer}></div>
    </div>
  );
}
