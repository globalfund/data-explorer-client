/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { get } from "lodash";
import { DEFAULT_DATASETS } from "app/modules/chart-module/components/toolbox/views/steps/panels-content/SelectDataset";
import { DatasetListItemAPIModel } from "app/modules/datasets-module/data";
import { DataTable } from "app/modules/chart-module/routes/preview/data-table";

interface ChartBuilderPreviewProps {
  loading: boolean;
  data: {
    [key: string]: string | number | null;
  }[];
  stats: {
    name: string;
    type: "percentage" | "bar" | "unique";
    data: { name: string; value: number }[];
  }[];
  filterOptionGroups: FilterGroupModel[];
  loadDataset: (endpoint: string) => Promise<boolean>;
}

export function ChartBuilderPreview(props: ChartBuilderPreviewProps) {
  useTitle("DX DataXplorer - Data");

  const dataset = useStoreState((state) => state.charts.dataset.value);
  const datasetsFromApi = useStoreState(
    (state) =>
      get(
        state,
        "dataThemes.DatasetGetList.crudData",
        DEFAULT_DATASETS
      ) as DatasetListItemAPIModel[]
  );
  const datasetName = datasetsFromApi.find((d) => d.id === dataset)?.name;

  React.useEffect(() => {
    // When the Preview component is rendered, we are at step 1.
    if (props.data.length === 0 && dataset) {
      props.loadDataset(`data-themes/sample-data/${dataset}`);
    }
  }, []);

  return (
    <div css={commonStyles.container}>
      {props.loading && <PageLoader />}
      <div
        css={`
          height: 108px;
        `}
      />
      <div
        css={`
          color: #262c34;
          font-family: "Gotham Narrow", sans-serif;
        `}
      >
        <p>
          <b>{datasetName} Dataset</b>
        </p>
        <DataTable data={props.data} stats={props.stats} />
      </div>
    </div>
  );
}
