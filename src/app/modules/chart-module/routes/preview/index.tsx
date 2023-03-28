/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { DataThemesDataTable } from "app/modules/data-themes-module/components/data-table";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";

interface ChartBuilderPreviewProps {
  loading: boolean;
  data: {
    [key: string]: string | number | null;
  }[];
  filterOptionGroups: FilterGroupModel[];
  loadDataset: (endpoint: string) => Promise<boolean>;
}

export function ChartBuilderPreview(props: ChartBuilderPreviewProps) {
  useTitle("DX DataXplorer - Data");

  const dataset = useStoreState((state) => state.charts.dataset.value);
  const setActivePanels = useStoreActions(
    (state) => state.charts.activePanels.setValue
  );

  React.useEffect(() => {
    // When the Preview component is rendered, we are at step 1.
    setActivePanels(1);
    if (props.data.length === 0 && dataset) {
      props.loadDataset(`data-themes/sample-data/${dataset}`);
    }
  }, []);

  return (
    <div css={commonStyles.container}>
      {props.loading && <PageLoader />}
      <div css={commonStyles.innercontainer}>
        <DataThemesDataTable data={props.data} />
      </div>
    </div>
  );
}
