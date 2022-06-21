/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
// import { RichTextField } from "app/modules/data-themes-module/components/rich-text-field";

const emptyPromise = (v: string) =>
  new Promise<boolean>((resolve) => resolve(true));

interface DataThemesBuilderTextViewProps {
  loading: boolean;
  visualOptions: any;
  filterOptionGroups: any;
  data: any;
  updateLocalStates: any;
}

export function DataThemesBuilderTextView(
  props: DataThemesBuilderTextViewProps
) {
  useTitle("Data Themes - Input text");

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const textContent = useStoreState(
    (state) => state.dataThemes.textContent.value
  );
  const setTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.setValue
  );

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
        textView
        data={[]}
        loading={false}
        filterOptionGroups={[]}
        loadDataset={emptyPromise}
      />
      <div css={styles.innercontainer} onClick={() => {setTextContent({tab: activeTabIndex, viz: activeVizIndex, value: "You clicked it!!!"})}}>
          input field goes here {/* <RichTextField /> */}
          current content is: {textContent[activeTabIndex][activeVizIndex]}
      </div>
    </div>
  );
}
