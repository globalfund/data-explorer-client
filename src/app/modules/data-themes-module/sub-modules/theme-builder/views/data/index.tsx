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
    <div
      css={`
        ${commonStyles.container};
        position: relative;
      `}
    >
      <div
        id="extra-loader"
        css={`
          display: none;
        `}
      >
        <PageLoader />
      </div>
      <div
        css={`
          left: 0rem;
          top: 5rem;
          width: 921px;
          height: 362.6px;

          background: #dfe3e6;
          max-width: 1280px;
          position: absolute;
          align-self: center;
          display: flex;
          justify-content: center;
        `}
      >
        <div css={styles.placeholder}>
          <b>
            Build your interactive chart
            <br />
            Please select a dataset in the right side panel
          </b>
        </div>
      </div>
    </div>
  );
}
