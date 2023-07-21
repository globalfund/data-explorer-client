/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
/* project */
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import { ChartBuilderChartTypeProps } from "app/modules/chart-module/routes/chart-type/data";
import { ReactComponent as GeomapChartPlaceholder } from "app/modules/chart-module/assets/geomapPlaceholder.svg";
import { get } from "lodash";
import { DEFAULT_DATASETS } from "../../components/toolbox/views/steps/panels-content/SelectDataset";
import { DatasetListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";
import ChartPlaceholder from "../../components/placeholder";

export function ChartBuilderChartType(props: ChartBuilderChartTypeProps) {
  useTitle("DX DataXplorer - Chart Type");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const chartType = useStoreState((state) => state.charts.chartType.value);
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

  if (dataset === null && !props.loading) {
    history.push(`/chart/${page}/data`);
  }
  const chartPlaceholders = [
    {
      id: "echartsBarchart",
      placeholder: <div></div>,
    },
    {
      id: "echartsGeomap",
      placeholder: <GeomapChartPlaceholder />,
    },
    {
      id: "echartsLinechart",
      placeholder: <div></div>,
    },
    {
      id: "echartsSankey",
      placeholder: <div></div>,
    },
    {
      id: "echartsTreemap",
      placeholder: <div></div>,
    },
    {
      id: "bigNumber",
      placeholder: <div></div>,
    },
  ];
  const getPlaceholder = () => {
    const placeholder = chartPlaceholders.find(
      (chartPlaceholder) => chartPlaceholder.id === chartType
    );
    return placeholder?.placeholder;
  };

  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>
        <ChartPlaceholder />
      </div>
    </div>
  );
}
