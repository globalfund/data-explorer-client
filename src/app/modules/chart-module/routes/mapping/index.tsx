/* third-party */
import React from "react";

import useTitle from "react-use/lib/useTitle";
import { useHistory, useParams } from "react-router-dom";
import { useStoreState } from "app/state/store/hooks";

/* project */
import { CommonChart } from "app/modules/chart-module/components/common-chart";
import { styles as commonStyles } from "app/modules/chart-module/routes/common/styles";
import { getRequiredFieldsAndErrors } from "app/modules/chart-module/routes/mapping/utils";
import { ChartBuilderMappingProps } from "app/modules/chart-module/routes/mapping/data";
import ChartPlaceholder from "../../components/placeholder";
import { isEmpty } from "lodash";

export function ChartBuilderMapping(props: ChartBuilderMappingProps) {
  useTitle("DX DataXplorer - Mapping");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const containerRef = React.useRef<HTMLDivElement>(null);

  const dataset = useStoreState((state) => state.charts.dataset.value);
  const mapping = useStoreState((state) => state.charts.mapping.value);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [requiredFields, setRequiredFields] = React.useState<
    { id: string; name: string }[]
  >([]);
  const [minValuesFields, setMinValuesFields] = React.useState<
    { id: string; name: string; minValues: number }[]
  >([]);

  React.useEffect(() => {
    const { updRequiredFields, updErrors, updMinValuesFields } =
      getRequiredFieldsAndErrors(mapping, props.dimensions);

    setRequiredFields(updRequiredFields);
    setErrors(updErrors);
    setMinValuesFields(updMinValuesFields);
  }, [mapping, props.dimensions]);

  if (dataset === null && !props.loading) {
    history.push(`/chart/${page}/data`);
  }

  return (
    <div css={commonStyles.container}>
      <div css={commonStyles.innercontainer}>
        {isEmpty(props.renderedChartMappedData) ? (
          <ChartPlaceholder
            datasetName={props.datasetName}
            loading={props.loading}
          />
        ) : (
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
            {requiredFields.length === 0 &&
              errors.length === 0 &&
              minValuesFields.length === 0 && (
                <CommonChart
                  containerRef={containerRef}
                  renderedChart={props.renderedChart}
                  visualOptions={props.visualOptions}
                  setVisualOptions={props.setVisualOptions}
                  renderedChartSsr={props.renderedChartSsr}
                  renderedChartMappedData={props.renderedChartMappedData}
                />
              )}
          </div>
        )}
      </div>
    </div>
  );
}
