/* third-party */
import React from "react";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesDataTable } from "app/modules/data-themes-module/components/data-table";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

interface DataThemesBuilderPreviewProps {
  tabIndex: number;
  vizIndex: number;
  loading: boolean;
  data: {
    [key: string]: string | number | null;
  }[];
  allData: {
    [key: string]: string | number | null;
  }[];
  visualOptions: any;
  filterOptionGroups: FilterGroupModel[];
  loadDataset: (endpoint: string) => Promise<boolean>;
  updateLocalStates: any;
}

export function DataThemesBuilderPreview(props: DataThemesBuilderPreviewProps) {
  useTitle("Data Themes - Preview");

  const activeTabIndex = useStoreState((state) => state.dataThemes.activeTabIndex.value);
  const activeVizIndex = useStoreState((state) => state.dataThemes.activeVizIndex.value);
  const setActivePanels = useStoreActions((state) => state.dataThemes.activePanels.setValue);

  // When the Preview component is rendered, we are at step 1.
  setActivePanels({tabIndex: activeTabIndex, vizIndex: activeVizIndex, panel: 1});

  return (
    <div css={commonStyles.container}>
      {props.loading && <PageLoader />}
      <DataThemesPageSubHeader
        data={props.allData}
        loading={props.loading}
        visualOptions={props.visualOptions}
        filterOptionGroups={props.filterOptionGroups}
        updateLocalStates={props.updateLocalStates}
        tabsDisabled={true}
      />
      <DataThemesToolBox
        dataSteps
        openPanel={1}
        data={props.data}
        loading={props.loading}
        loadDataset={props.loadDataset}
        forceNextEnabled={props.data.length > 0}
        filterOptionGroups={props.filterOptionGroups}
      />
      <div css={commonStyles.innercontainer}>
        <DataThemesDataTable data={props.data} />
      </div>
    </div>
  );
}
