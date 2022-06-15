/* third-party */
import React from "react";
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
import { DataThemesBuilderPreviewThemeProps } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview-theme/data";

export function DataThemesBuilderPreviewTheme(
  props: DataThemesBuilderPreviewThemeProps
) {
  useTitle("Data Themes - Preview Theme");

  const domRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const activeTabIndex = useStoreState((state) => state.dataThemes.activeTabIndex.value);
  const activeVizIndex = useStoreState((state) => state.dataThemes.activeVizIndex.value);
  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);

  useUpdateEffectOnce(() => {
    if (
      containerRef.current &&
      props.visualOptions[activeTabIndex][activeVizIndex].width === CHART_DEFAULT_WIDTH
    ) {
      let tmpVisualOptions = [ ...props.visualOptions ];
      tmpVisualOptions[activeTabIndex][activeVizIndex] = {
        ...props.visualOptions[activeTabIndex][activeVizIndex],
        width: containerRef.current.clientWidth,
      }
      props.setVisualOptions(tmpVisualOptions);
    }
  }, [containerRef]);

  React.useEffect(() => {
    console.log("TODO: props on preview-theme.tsx: ", props)
    if (domRef && domRef.current) {
      try {
        const viz = rawChart(props.currentChart, {
          data: props.currentChartData.dataset,
          mapping: mapping[activeTabIndex][activeVizIndex],
          visualOptions: props.visualOptions[activeTabIndex][activeVizIndex],
          dataTypes: props.currentChartData.dataTypes,
        });

        const vizData = viz._getVizData();
        try {
          const rawViz = viz.renderToDOM(domRef.current, vizData);
        } catch (e) {
          if (process.env.NODE_ENV === "development") {
            console.log("chart error", e);
          }
        }
      } catch (e) {
        while (domRef.current.firstChild) {
          domRef.current.removeChild(domRef.current.firstChild);
        }
        if (process.env.NODE_ENV === "development") {
          console.log("chart error", e);
        }
      }
    }
  }, [
    props.currentChart,
    props.currentChartData,
    mapping,
    props.visualOptions,
  ]);

  return (
    <div css={commonStyles.container}>
      <DataThemesPageSubHeader
        previewMode
        data={props.data}
        loading={props.loading}
        visualOptions={props.visualOptions}
        filterOptionGroups={props.filterOptionGroups}
        updateLocalStates={props.updateLocalStates}
        tabsDisabled={true}
      />
      <DataThemesToolBox
        filtersView
        data={props.data}
        loading={props.loading}
        loadDataset={props.loadDataset}
        filterOptionGroups={props.filterOptionGroups}
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
