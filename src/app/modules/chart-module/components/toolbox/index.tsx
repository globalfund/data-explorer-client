/* third-party */
import React from "react";
import isEmpty from "lodash/isEmpty";
import { useParams } from "react-router-dom";
import MuiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { styles } from "app/modules/chart-module/components/toolbox/styles";
import { ChartExporter } from "app/modules/chart-module/components/exporter";
import { ChartToolBoxProps } from "app/modules/chart-module/components/toolbox/data";
import { ChartToolBoxSteps } from "app/modules/chart-module/components/toolbox/views/steps";
import { ChartToolBoxPreview } from "app/modules/chart-module/components/toolbox/views/preview";
import {
  DataThemeAPIModel,
  emptyDataThemeAPI,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";

const Button = withStyles(() => ({
  root: {
    width: "100%",
    height: "48px",
    borderRadius: "0px",
    backgroundColor: "#262C34",
    fontFamily: "Inter, sans-serif",
    "&:first-child": {
      borderRight: "1px solid #f1f3f5",
    },
    "&:hover": {
      backgroundColor: "#495057",
    },
  },
  label: {
    color: "#fff",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "Inter, sans-serif",
  },
  disabled: {
    backgroundColor: "#ADB5BD",
  },
}))(MuiButton);

export function ChartModuleToolBox(props: ChartToolBoxProps) {
  const { page } = useParams<{ page: string }>();

  const title = useStoreState((state) => state.dataThemes.titles.title);
  const subTitle = useStoreState((state) => state.dataThemes.titles.subTitle);
  const [isSavedEnabled, setIsSavedEnabled] = React.useState(false);

  const mapping = useStoreState((state) => state.charts.mapping.value);
  const dataset = useStoreState((state) => state.charts.dataset.value);
  const appliedFilters = useStoreState(
    (state) => state.charts.appliedFilters.value
  );
  const enabledFilterOptionGroups = useStoreState(
    (state) => state.charts.enabledFilterOptionGroups.value
  );
  const activePanels = useStoreState(
    (state) => state.charts.activePanels.value
  );
  const selectedChartType = useStoreState(
    (state) => state.charts.chartType.value
  );
  const loadedDataTheme = useStoreState(
    (state) =>
      (state.dataThemes.DataThemeGet.crudData ??
        emptyDataThemeAPI) as DataThemeAPIModel
  );

  const createChart = useStoreActions(
    (actions) => actions.charts.ChartCreate.post
  );
  const editChart = useStoreActions(
    (actions) => actions.charts.ChartUpdate.patch
  );

  function onSave() {
    const chart = {
      name: title,
      vizType: selectedChartType,
      mapping,
      datasetId: dataset,
      vizOptions: props.visualOptions,
      appliedFilters,
      enabledFilterOptionGroups,
    };
    if (props.isEditMode) {
      editChart({
        patchId: page,
        values: chart,
      });
    } else {
      createChart({
        values: chart,
      });
    }
  }

  React.useEffect(() => {
    const newValue =
      (!props.loading &&
        (props.data && props.data.length) > 0 &&
        selectedChartType !== "" &&
        selectedChartType !== null &&
        !isEmpty(mapping) &&
        activePanels > 3) ||
      (props.isEditMode &&
        (title !== loadedDataTheme.title ||
          subTitle !== loadedDataTheme.subTitle));
    if (newValue !== isSavedEnabled) {
      setIsSavedEnabled(newValue);
    }
  }, [
    props.data,
    props.loading,
    selectedChartType,
    mapping,
    activePanels,
    title,
    subTitle,
  ]);

  return (
    <div css={styles.container(props.filtersView)}>
      {props.dataSteps && (
        <ChartToolBoxSteps
          data={props.data}
          rawViz={props.rawViz}
          loading={props.loading}
          dataTypes={props.dataTypes}
          openPanel={props.openPanel}
          mappedData={props.mappedData}
          loadDataset={props.loadDataset}
          visualOptions={props.visualOptions}
          forceNextEnabled={props.forceNextEnabled}
          setVisualOptions={props.setVisualOptions}
          filterOptionGroups={props.filterOptionGroups}
        />
      )}
      {props.exportView && props.rawViz && (
        <div css={styles.exportview}>
          <ChartExporter rawViz={props.rawViz} />
        </div>
      )}
      {props.filtersView && (
        <div css="height: 100%;position: relative;">
          <ChartToolBoxPreview
            loadDataFromAPI={props.loadDataFromAPI}
            filterOptionGroups={props.filterOptionGroups}
          />
          {isSavedEnabled && props.isEditMode && (
            <div
              css={`
                bottom: 0;
                width: 100%;
                position: absolute;
              `}
            >
              <Button onClick={onSave}>Save</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
