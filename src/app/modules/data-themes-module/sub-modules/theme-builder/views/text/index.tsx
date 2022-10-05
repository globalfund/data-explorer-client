/* third-party */
import useTitle from "react-use/lib/useTitle";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { RichEditor } from "app/modules/data-themes-module/sub-modules/theme-builder/views/text/RichEditor";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

const emptyPromise = (v: string) =>
  new Promise<boolean>((resolve) => resolve(true));

interface DataThemesBuilderTextViewProps {
  loading: boolean;
  visualOptions: any;
  filterOptionGroups: any;
  data: any;
  updateLocalStates: any;
  deleteTab: (value: number) => void;
  themeData: {
    id: number;
    count: number;
    data: { [key: string]: string | number | null }[];
    filterOptionGroups: FilterGroupModel[];
  }[][];
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

  return (
    <div css={styles.container}>
      <DataThemesPageSubHeader
        data={props.data}
        loading={props.loading}
        visualOptions={props.visualOptions}
        filterOptionGroups={props.filterOptionGroups}
        updateLocalStates={props.updateLocalStates}
        themeData={props.themeData}
        tabsDisabled={true}
        deleteTab={props.deleteTab}
      />
      <DataThemesToolBox
        textView
        data={[]}
        loading={false}
        filterOptionGroups={[]}
        loadDataset={emptyPromise}
      />
      <RichEditor
        editMode={true}
        tabIndex={activeTabIndex}
        vizIndex={activeVizIndex}
      />
    </div>
  );
}
