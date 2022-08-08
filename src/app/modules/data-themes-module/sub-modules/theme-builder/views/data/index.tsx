/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/data/styles";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

interface DataThemesBuilderDataViewProps {
  tabIndex: number;
  vizIndex: number;
  loading: boolean;
  visualOptions: any;
  filterOptionGroups: FilterGroupModel[];
  data: { [key: string]: string | number | null }[];
  totalAvailable: number;
  deleteTab: (value: number) => void;
  loadDataset: (endpoint: string, rows: number) => Promise<boolean>;
  updateLocalStates: any;
}

export function DataThemesBuilderDataView(
  props: DataThemesBuilderDataViewProps
) {
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
      <DataThemesPageSubHeader
        data={props.data}
        loading={props.loading}
        visualOptions={props.visualOptions}
        filterOptionGroups={props.filterOptionGroups}
        updateLocalStates={props.updateLocalStates}
        tabsDisabled={true}
        deleteTab={props.deleteTab}
      />
      <DataThemesToolBox
        dataSteps
        openPanel={1}
        loading={false}
        data={props.data}
        loadDataset={props.loadDataset}
        totalAvailable={props.totalAvailable}
        forceNextEnabled={props.data.length > 0}
        filterOptionGroups={props.filterOptionGroups}
      />
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
