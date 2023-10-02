/* third-party */
import React from "react";
import isEmpty from "lodash/isEmpty";
import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { CommonChart } from "app/modules/chart-module/components/common-chart";
import { ChartBuilderExportProps } from "app/modules/chart-module/routes/export/data";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";

export function ChartBuilderExport(props: ChartBuilderExportProps) {
  useTitle("DX DataXplorer - Export");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const containerRef = React.useRef<HTMLDivElement>(null);

  const mapping = useStoreState((state) => state.charts.mapping.value);
  const dataset = useStoreState((state) => state.charts.dataset.value);

  if ((dataset === null && !props.loading) || isEmpty(mapping)) {
    history.push(`/chart/${page}/data`);
  }

  return (
    <div css={commonStyles.exportContainer}>
      <div css={commonStyles.exportInnercontainer}>
        <div
          ref={containerRef}
          css={`
            width: calc(100% - 24px);
            height: calc(100vh - 225px);
          `}
        >
          <CommonChart
            containerRef={containerRef}
            renderedChart={props.renderedChart}
            setRawViz={props.setRawViz}
            visualOptions={props.visualOptions}
            setVisualOptions={props.setVisualOptions}
            renderedChartSsr={props.renderedChartSsr}
            renderedChartMappedData={props.renderedChartMappedData}
          />
        </div>
      </div>
    </div>
  );
}
