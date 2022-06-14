/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
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
  loadDataset: (endpoint: string) => Promise<boolean>;
}

export function DataThemesBuilderDataView(
  props: DataThemesBuilderDataViewProps
) {
  useTitle("Data Themes - Select Data");

  return (
    <div css={commonStyles.container}>
      <DataThemesPageSubHeader
        data={props.data}
        loading={props.loading}
        visualOptions={props.visualOptions}
        filterOptionGroups={props.filterOptionGroups}
      />
      <DataThemesToolBox
        dataSteps
        openPanel={1}
        loading={false}
        data={props.data}
        loadDataset={props.loadDataset}
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
