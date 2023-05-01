/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/data/styles";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";

export function ChartModuleDataView() {
  useTitle("DX DataXplorer - Select Data");

  const setActivePanels = useStoreActions(
    (state) => state.charts.activePanels.setValue
  );

  React.useEffect(() => {
    // When the Data View component is rendered, we are at step 1.
    setActivePanels(1);
  }, []);

  return (
    <div css={commonStyles.innercontainer}>
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
          width: 100%;
          height: 362px;
          display: flex;
          max-width: 1280px;
          background: #dfe3e6;
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
