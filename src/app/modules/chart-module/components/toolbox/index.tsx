/* third-party */
import React from "react";
import isEmpty from "lodash/isEmpty";
import { useRecoilState } from "recoil";
import { useSessionStorage } from "react-use";
import { useAuth0 } from "@auth0/auth0-react";
import MuiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { createChartFromReportAtom } from "app/state/recoil/atoms";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { styles } from "app/modules/chart-module/components/toolbox/styles";
import { ChartExporter } from "app/modules/chart-module/components/exporter";
import { ChartAPIModel, emptyChartAPI } from "app/modules/chart-module/data";
import { ChartToolBoxProps } from "app/modules/chart-module/components/toolbox/data";
import { ChartToolBoxSteps } from "app/modules/chart-module/components/toolbox/views/steps";
import { ChartToolBoxPreview } from "app/modules/chart-module/components/toolbox/views/preview";

const Button = withStyles(() => ({
  root: {
    width: "100%",
    height: "48px",
    borderRadius: "0px",
    backgroundColor: "#262C34",
    fontFamily: "GothamNarrow-Book, sans-serif",
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
    fontFamily: "GothamNarrow-Book, sans-serif",
  },
  disabled: {
    backgroundColor: "#ADB5BD",
  },
}))(MuiButton);

export function ChartModuleToolBox(props: ChartToolBoxProps) {
  const { page, view } = useParams<{ page: string; view?: string }>();
  const { user } = useAuth0();
  const history = useHistory();
  const token = useSessionStorage("authToken", "")[0];
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
  const loadedChart = useStoreState(
    (state) =>
      (state.charts.ChartGet.crudData ?? emptyChartAPI) as ChartAPIModel
  );

  const createChart = useStoreActions(
    (actions) => actions.charts.ChartCreate.post
  );
  const editChart = useStoreActions(
    (actions) => actions.charts.ChartUpdate.patch
  );
  const [createChartFromReport, setCreateChartFromReport] = useRecoilState(
    createChartFromReportAtom
  );

  function onSave() {
    const chart = {
      name: props.chartName,
      authId: user?.sub,
      vizType: selectedChartType,
      mapping,
      datasetId: dataset,
      vizOptions: props.visualOptions,
      appliedFilters,
      enabledFilterOptionGroups,
    };
    if (props.isEditMode && page !== "new") {
      editChart({
        token,
        patchId: page,
        values: chart,
      });
    } else {
      createChart({
        token,
        values: chart,
      });
    }
    //Completes chart creation , returns to persisted report state
    if (createChartFromReport.state) {
      setCreateChartFromReport({
        ...createChartFromReport,
        state: false,
      });
      if (createChartFromReport.view === undefined) {
        history.push(`/report/${createChartFromReport.page}/edit`);
      } else {
        history.push(
          `/report/${createChartFromReport.page}/${createChartFromReport.view}`
        );
      }
    }
  }

  React.useEffect(() => {
    const newValue =
      (selectedChartType !== "" &&
        selectedChartType !== null &&
        !isEmpty(mapping) &&
        activePanels > 3) ||
      (view !== undefined &&
        page !== "new" &&
        props.chartName !== loadedChart.name);
    if (newValue !== isSavedEnabled) {
      setIsSavedEnabled(newValue);
    }
  }, [
    view,
    props.chartName,
    mapping,
    activePanels,
    loadedChart.name,
    selectedChartType,
  ]);

  return (
    <>
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
            filtersView={props.filtersView}
            save={onSave}
          />
        )}

        {props.exportView && props.rawViz && (
          <div css={styles.exportview}>
            <ChartExporter rawViz={props.rawViz} />
          </div>
        )}
        {/* {props.filtersView && (
          <div
            css={`
              width: 400px;
              overflow-y: scroll;
              position: relative;
              height: calc(100vh - 97px);

              ::-webkit-scrollbar {
                display: none;
              }
            `}
          >
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
        )} */}
      </div>
    </>
  );
}
