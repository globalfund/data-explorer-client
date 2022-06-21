/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
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
      <div css={styles.innercontainer}>
          input field goes here {/* <RichTextField /> */}
      </div>
    </div>
  );
}
