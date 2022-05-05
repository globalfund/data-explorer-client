/* third-party */
import React from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useHistory } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import { useStoreState } from "app/state/store/hooks";
// @ts-ignore
import { chart as rawChart } from "@rawgraphs/rawgraphs-core";
/* project */
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { CHART_DEFAULT_WIDTH } from "app/modules/data-themes-module/sub-modules/theme-builder/data";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { getRequiredFieldsAndErrors } from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping/utils";
import { DataThemesBuilderCustomizeProps } from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/data";

export function DataThemesBuilderCustomize(
  props: DataThemesBuilderCustomizeProps
) {
  useTitle("Data Themes - Customize");

  const history = useHistory();

  const domRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [mappedData, setMappedData] = React.useState(null);
  const [nextEnabled, setNextEnabled] = React.useState<boolean>(false);

  const loading = useStoreState((state) => state.dataThemes.rawData.loading);
  const data = useStoreState(
    (state) =>
      get(state.dataThemes, "rawData.data.data", []) as {
        [key: string]: number | string | null;
      }[]
  );
  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);

  useUpdateEffectOnce(() => {
    if (
      containerRef.current &&
      props.visualOptions.width === CHART_DEFAULT_WIDTH
    ) {
      props.setVisualOptions({
        ...props.visualOptions,
        width: containerRef.current.clientWidth,
      });
    }
  }, [containerRef]);

  React.useEffect(() => {
    const { updRequiredFields, updErrors, updMinValuesFields } =
      getRequiredFieldsAndErrors(mapping, props.dimensions);

    setNextEnabled(
      updRequiredFields.length === 0 &&
        updErrors.length === 0 &&
        updMinValuesFields.length === 0
    );
  }, [mapping, props.dimensions]);

  React.useEffect(() => {
    if (nextEnabled && domRef && domRef.current) {
      try {
        const viz = rawChart(props.currentChart, {
          data: props.currentChartData.dataset,
          mapping: mapping,
          visualOptions: props.visualOptions,
          dataTypes: props.currentChartData.dataTypes,
        });
        const vizData = viz._getVizData();
        setMappedData(vizData);
        try {
          const rawViz = viz.renderToDOM(domRef.current, vizData);
        } catch (e) {
          setMappedData(null);
          if (process.env.NODE_ENV === "development") {
            console.log("chart error", e);
          }
        }
      } catch (e) {
        setMappedData(null);
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
        if (process.env.NODE_ENV === "development") {
          console.log("chart error", e);
        }
      }
    } else if (!nextEnabled && domRef && domRef.current) {
      while (domRef.current.firstChild) {
        domRef.current.removeChild(domRef.current.firstChild);
      }
    }
  }, [nextEnabled, props.currentChart, mapping, props.visualOptions]);

  if ((data.length === 0 && !loading) || isEmpty(mapping)) {
    history.push("/data-themes/create/data");
  }

  return (
    <div css={commonStyles.container}>
      <DataThemesPageSubHeader />
      <DataThemesToolBox
        dataSteps
        openPanel={6}
        mappedData={mappedData}
        forceNextEnabled={false}
        currentChart={props.currentChart}
        visualOptions={props.visualOptions}
        setVisualOptions={props.setVisualOptions}
        currentChartData={props.currentChartData}
      />
      <div css={commonStyles.innercontainer}>
        <div
          ref={containerRef}
          css={`
            width: calc(100% - 24px);
            height: calc(100vh - 225px);
          `}
        >
          <div
            ref={domRef}
            css={`
              overflow-x: auto;
              margin-top: 40px;

              * {
                font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif !important;
              }
            `}
          />
        </div>
      </div>
    </div>
  );
}
