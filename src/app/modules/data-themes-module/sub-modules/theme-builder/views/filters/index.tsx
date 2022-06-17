/* third-party */
import React from "react";
import isEmpty from "lodash/isEmpty";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useHistory, useParams } from "react-router-dom";
// @ts-ignore
import { chart as rawChart } from "@rawgraphs/rawgraphs-core";
/* project */
import { useUpdateEffectOnce } from "app/hooks/useUpdateEffectOnce";
import { DataThemesToolBox } from "app/modules/data-themes-module/components/toolbox";
import { DataThemesPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { CHART_DEFAULT_WIDTH } from "app/modules/data-themes-module/sub-modules/theme-builder/data";
import { styles as commonStyles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { getRequiredFieldsAndErrors } from "app/modules/data-themes-module/sub-modules/theme-builder/views/mapping/utils";
import { DataThemesBuilderFiltersProps } from "app/modules/data-themes-module/sub-modules/theme-builder/views/filters/data";

export function DataThemesBuilderFilters(props: DataThemesBuilderFiltersProps) {
  useTitle("Data Themes - Filters");

  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const domRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [mappedData, setMappedData] = React.useState(null);
  const [nextEnabled, setNextEnabled] = React.useState<boolean>(false);

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);

  const setActivePanels = useStoreActions((state) => state.dataThemes.activePanels.setValue);

  // When the Filters component is rendered, we are at step 4.
  setActivePanels({tabIndex: activeTabIndex, vizIndex: activeVizIndex, panel: 4});

  useUpdateEffectOnce(() => {
    if (
      containerRef.current &&
      props.visualOptions[activeTabIndex][activeVizIndex].width ===
        CHART_DEFAULT_WIDTH
    ) {
      let tmpVisualOptions = [...props.visualOptions];
      tmpVisualOptions[activeTabIndex][activeVizIndex] = {
        ...props.visualOptions[activeTabIndex][activeVizIndex],
        width: containerRef.current.clientWidth,
      };
      props.setVisualOptions(tmpVisualOptions);
    }
  }, [containerRef]);

  React.useEffect(() => {
    const { updRequiredFields, updErrors, updMinValuesFields } =
      getRequiredFieldsAndErrors(
        mapping[activeTabIndex][activeVizIndex],
        props.dimensions
      );

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
          mapping: mapping[activeTabIndex][activeVizIndex],
          visualOptions: props.visualOptions[activeTabIndex][activeVizIndex],
          dataTypes: props.currentChartData.dataTypes,
        });
        const vizData = viz._getVizData();
        setMappedData(vizData);
        try {
          /** TODO: const unused */
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
  }, [
    nextEnabled,
    props.currentChart,
    props.currentChartData,
    mapping,
    props.visualOptions,
  ]);

  if (
    (props.data.length === 0 && !props.loading) ||
    isEmpty(mapping[activeTabIndex][activeVizIndex])
  ) {
    history.push(`/data-themes/${page}/data`);
  }

  return (
    <div css={commonStyles.container}>
      <DataThemesPageSubHeader
        data={props.data}
        loading={props.loading}
        visualOptions={props.visualOptions}
        filterOptionGroups={props.filterOptionGroups}
        updateLocalStates={props.updateLocalStates}
        tabsDisabled={true}
      />
      <DataThemesToolBox
        dataSteps
        openPanel={4}
        forceNextEnabled
        data={props.data}
        loading={props.loading}
        mappedData={mappedData}
        currentChart={props.currentChart}
        visualOptions={props.visualOptions}
        loadDataset={props.loadDataset}
        setVisualOptions={props.setVisualOptions}
        currentChartData={props.currentChartData}
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
