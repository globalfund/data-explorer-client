/* third-party */
import React from "react";
import isEmpty from "lodash/isEmpty";
import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { DataThemesCommonChart } from "app/modules/data-themes-module/components/common-chart";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { DataThemesBuilderExportProps } from "app/modules/data-themes-module/sub-modules/theme-builder/views/export/data";

export function DataThemesBuilderExport(props: DataThemesBuilderExportProps) {
  useTitle("Data Themes - Export");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const containerRef = React.useRef<HTMLDivElement>(null);

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );
  const setActivePanels = useStoreActions(
    (state) => state.dataThemes.activePanels.setValue
  );

  React.useEffect(() => {
    // When the Export component is rendered, we are at step 7.
    setActivePanels({
      tabIndex: activeTabIndex,
      vizIndex: activeVizIndex,
      panel: 7,
    });
  }, []);

  if (
    (stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset ===
      null &&
      !props.loading) ||
    isEmpty(mapping[activeTabIndex][activeVizIndex])
  ) {
    history.push(`/data-themes/${page}/data`);
  }

  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>
        <div
          ref={containerRef}
          css={`
            width: calc(100% - 24px);
            height: calc(100vh - 225px);
          `}
        >
          <DataThemesCommonChart
            containerRef={containerRef}
            renderedChart={props.renderedChart}
            setRawViz={props.setRawViz}
            visualOptions={props.visualOptions}
            setVisualOptions={props.setVisualOptions}
          />
        </div>
      </div>
    </div>
  );
}
