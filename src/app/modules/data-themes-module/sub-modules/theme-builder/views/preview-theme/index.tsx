/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreState, useStoreActions } from "app/state/store/hooks";
import {
  useHistory,
  useParams,
} from "react-router-dom";
// @ts-ignore
import { chart as rawChart } from "@rawgraphs/rawgraphs-core";
/* project */
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { CHART_DEFAULT_WIDTH } from "app/modules/data-themes-module/sub-modules/theme-builder/data";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { DataThemesBuilderPreviewThemeProps } from "app/modules/data-themes-module/sub-modules/theme-builder/views/preview-theme/data";
import { RichEditor } from "app/modules/data-themes-module/sub-modules/theme-builder/views/text/RichEditor";

export function DataThemesBuilderPreviewTheme(
  props: DataThemesBuilderPreviewThemeProps
) {
  useTitle("Data Themes - Preview Theme");

  const domRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { page } = useParams<{ page: string }>();
  const history = useHistory();

  const { visualOptions, setVisualOptions } = props;

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const setActiveVizIndex = useStoreActions((state) => state.dataThemes.activeVizIndex.setValue);
  const vizIsTextContent = useStoreState(
    (state) => state.dataThemes.textContent.vizIsTextContent
  );

  useUpdateEffectOnce(() => {
    if (
      containerRef.current &&
      visualOptions[props.tabIndex][props.vizIndex].width ===
        CHART_DEFAULT_WIDTH
    ) {
      let tmpVisualOptions = [...visualOptions];
      tmpVisualOptions[props.tabIndex][props.vizIndex] = {
        ...visualOptions[props.tabIndex][props.vizIndex],
        width: containerRef.current.clientWidth,
      };
      setVisualOptions(tmpVisualOptions);
    }
  }, [containerRef]);

  React.useEffect(() => {
    if (!vizIsTextContent[props.tabIndex][props.vizIndex] && (domRef && domRef.current)) {
      try {
        const viz = rawChart(props.currentChart, {
          data: props.currentChartData.dataset,
          mapping: mapping[props.tabIndex][props.vizIndex],
          visualOptions: visualOptions[props.tabIndex][props.vizIndex],
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
  }, [props.currentChart, props.currentChartData, mapping, visualOptions]);

  const handleVizClick = () => {
    if (page === "new") {
      setActiveVizIndex(props.vizIndex);
      history.push(`/data-themes/${page}/customize`);
    }
  }

  const handleTextClick = () => {
    if (page === "new") {
      setActiveVizIndex(props.vizIndex);
      history.push(`/data-themes/${page}/text`);
    }
  }

  return (
    <div css={props.vizIndex === 0 ? commonStyles.container : ""}>
      <DataThemesPageSubHeader
        previewMode={ page !== "new" ? true : false}
        data={props.data}
        loading={props.loading}
        visualOptions={visualOptions}
        filterOptionGroups={props.filterOptionGroups}
        updateLocalStates={props.updateLocalStates}
        tabsDisabled={page !== "new"}
        themeData={props.themeData}
      />
      <DataThemesToolBox
        filtersView
        data={props.data}
        loading={props.loading}
        loadDataset={props.loadDataset}
        filterOptionGroups={props.filterOptionGroups}
      />
      { vizIsTextContent[props.tabIndex][props.vizIndex] ? (
        <div css={commonStyles.previewInnercontainer} onClick={() => {handleTextClick()}}>
          <RichEditor editMode={false} tabIndex={props.tabIndex} vizIndex={props.vizIndex} />
        </div>
      ) : (
        <div css={commonStyles.previewInnercontainer}>
          <div
            ref={containerRef}
            css={`
              width: calc(100% - 24px);
            `}
          >
            <div
              onClick={() => {handleVizClick()}}
              ref={domRef}
              css={`
                overflow-x: auto;

                * {
                  font-family: "GothamNarrow-Book", "Helvetica Neue", sans-serif !important;
                }
              `}
            />
          </div>
        </div>
      )}
    </div>
  );
}
