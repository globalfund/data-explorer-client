/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
import { useStoreState } from "app/state/store/hooks";
/* project */
import ChartPlaceholder from "app/modules/chart-module/components/placeholder";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import { ChartBuilderChartTypeProps } from "app/modules/chart-module/routes/chart-type/data";

export function ChartBuilderChartType(props: ChartBuilderChartTypeProps) {
  useTitle("DX DataXplorer - Chart Type");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const dataset = useStoreState((state) => state.charts.dataset.value);

  if (dataset === null && !props.loading) {
    history.push(`/chart/${page}/data`);
  }

  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>
        <ChartPlaceholder datasetName={props.datasetName} />
      </div>
    </div>
  );
}
