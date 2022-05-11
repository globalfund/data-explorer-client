/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesDataTable } from "app/modules/data-themes-module/components/data-table";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

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

  return (
    <div css={commonStyles.container}>
      {props.loading && <PageLoader />}
      <DataThemesPageSubHeader />
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
