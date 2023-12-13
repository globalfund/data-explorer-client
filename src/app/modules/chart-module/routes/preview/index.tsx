/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";
import { DataTable } from "app/modules/chart-module/routes/preview/data-table";

interface ChartBuilderPreviewProps {
  loading: boolean;
  datasetName: string;
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
          <b>{props.datasetName} Dataset</b>
        </p>
        <DataTable data={props.data} stats={props.stats} />
      </div>
    </div>
  );
}
