/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { DataThemesDataTable } from "app/modules/data-themes-module/components/data-table";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";

interface DataThemesBuilderPreviewProps {
  loading: boolean;
  data: {
    [key: string]: string | number | null;
  }[];
  filterOptionGroups: FilterGroupModel[];
  loadDataset: (endpoint: string) => Promise<boolean>;
}

export function DataThemesBuilderPreview(props: DataThemesBuilderPreviewProps) {
  useTitle("Data Themes - Preview");

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
    // When the Preview component is rendered, we are at step 1.
    setActivePanels({
      tabIndex: activeTabIndex,
      vizIndex: activeVizIndex,
      panel: 1,
    });
    if (props.data.length === 0) {
      props.loadDataset(
        `data-themes/sample-data/${stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset}`
      );
    }
  }, []);

  return (
    <div css={commonStyles.container}>
      {props.loading && <PageLoader />}
      <div css={commonStyles.innercontainer}>
        {/* <DataThemesDataTable data={props.data} /> */}
      </div>
    </div>
  );
}
