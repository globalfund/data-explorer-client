/* third-party */
import React from "react";
import isEmpty from "lodash/isEmpty";
import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { CHART_DEFAULT_WIDTH } from "app/modules/chart-module/data";
import { CommonChart } from "app/modules/chart-module/components/common-chart";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import { ChartBuilderCustomizeProps } from "app/modules/chart-module/routes/customize/data";
import { useRecoilState } from "recoil";
import { createChartFromReportAtom } from "app/state/recoil/atoms";

export function ChartBuilderCustomize(props: ChartBuilderCustomizeProps) {
  useTitle("DX DataXplorer - Customize");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [createChartFromReport, _] = useRecoilState(createChartFromReportAtom);
  const mapping = useStoreState((state) => state.charts.mapping.value);
  const dataset = useStoreState((state) => state.charts.dataset.value);

  useUpdateEffectOnce(() => {
    if (
      containerRef.current &&
      props.visualOptions.width === CHART_DEFAULT_WIDTH
    ) {
      const tmpVisualOptions = {
        ...props.visualOptions,
        width: containerRef.current.clientWidth,
      };
      props.setVisualOptions(tmpVisualOptions);
    }
  }, [containerRef]);

  if (!createChartFromReport.state) {
    if ((dataset === null && !props.loading) || isEmpty(mapping)) {
      history.push(`/chart/${page}/preview-data`);
    }
  }

  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>
        <div
          ref={containerRef}
          css={`
            width: calc(100% - 24px);
            height: calc(100vh - 225px);
          `}
        >
          <p>
            <b>{props.datasetName}</b>
          </p>
          <CommonChart
            containerRef={containerRef}
            renderedChart={props.renderedChart}
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
