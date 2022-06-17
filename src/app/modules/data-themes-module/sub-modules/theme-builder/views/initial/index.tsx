/* third-party */
import React from "react";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import useTitle from "react-use/lib/useTitle";
/* project */
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";

const emptyPromise = (v: string) =>
  new Promise<boolean>((resolve) => resolve(true));

interface DataThemesBuilderInitialViewProps {
  loading: boolean;
  visualOptions: any;
  filterOptionGroups: FilterGroupModel[];
  data: { [key: string]: string | number | null }[];
  updateLocalStates: any;
}

export function DataThemesBuilderInitialView(
  props: DataThemesBuilderInitialViewProps
) {
  useTitle("Data Themes - Create");

  const activeTabIndex = useStoreState((state) => state.dataThemes.activeTabIndex.value);
  const activeVizIndex = useStoreState((state) => state.dataThemes.activeVizIndex.value);
  const setActivePanels = useStoreActions((state) => state.dataThemes.activePanels.setValue);

  // When the initial component is rendered, we are at step 0.
  setActivePanels({tabIndex: activeTabIndex, vizIndex: activeVizIndex, panel: 0});

  return (
    <div css={styles.container}>
      <DataThemesPageSubHeader
        data={props.data}
        loading={props.loading}
        visualOptions={props.visualOptions}
        filterOptionGroups={props.filterOptionGroups}
        updateLocalStates={props.updateLocalStates}
        tabsDisabled={true}
      />
      <DataThemesToolBox
        guideView
        data={[]}
        loading={false}
        filterOptionGroups={[]}
        loadDataset={emptyPromise}
      />
      <div css={styles.innercontainer}></div>
    </div>
  );
}
