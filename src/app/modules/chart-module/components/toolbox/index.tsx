/* third-party */
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import MuiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { styles } from "app/modules/chart-module/components/toolbox/styles";
import { ChartExporter } from "app/modules/chart-module/components/exporter";
import { ChartToolBoxProps } from "app/modules/chart-module/components/toolbox/data";
import { ChartToolBoxSteps } from "app/modules/chart-module/components/toolbox/views/steps";
import { ChartToolBoxPreview } from "app/modules/chart-module/components/toolbox/views/preview";
import { useRecoilState } from "recoil";
import { createChartFromReportAtom } from "app/state/recoil/atoms";
import ToolboxNav from "./views/steps/navbar";
import { Slide, useMediaQuery } from "@material-ui/core";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";

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
  const history = useHistory();
  const { page, view } = useParams<{ page: string; view?: string }>();

  const [isSavedEnabled] = React.useState(false);

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
  const setActivePanels = useStoreActions(
    (state) => state.charts.activePanels.setValue
  );
  const selectedChartType = useStoreState(
    (state) => state.charts.chartType.value
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
  const isMobile = useMediaQuery("(max-width: 767px)");

  function onSave() {
    const chart = {
      name: props.chartName,
      vizType: selectedChartType,
      mapping,
      datasetId: dataset,
      vizOptions: props.visualOptions,
      appliedFilters,
      enabledFilterOptionGroups,
    };
    if (props.isEditMode && page !== "new") {
      editChart({
        patchId: page,
        values: chart,
      });
    } else {
      createChart({
        values: chart,
      });
    }
    // if createChartFromReport is true, completes chart creation, returns to persisted report state
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
  const [displayToolbar, setDisplayToolbar] = React.useState<"block" | "none">(
    "block"
  );

  React.useEffect(() => {
    if (page !== "new" && location.pathname === `/chart/${page}`) {
      setDisplayToolbar("none");
    } else {
      setDisplayToolbar("block");
    }
  }, [location.pathname]);

  return (
    <Slide
      direction="left"
      in={props.openToolbox}
      style={{ visibility: "visible", display: displayToolbar }}
    >
      <div css={styles.container(props.filtersView)}>
        {!isMobile && (
          <div
            role="button"
            tabIndex={-1}
            css={`
              top: calc((100% - 205px) / 2);
              left: -16px;
              color: #fff;
              width: 16px;
              height: 133px;
              display: flex;
              cursor: pointer;
              position: absolute;
              background: #231d2c;
              align-items: center;
              flex-direction: column;
              justify-content: center;
              border-radius: 10px 0px 0px 10px;
              transition: background 0.2s ease-in-out;
              &:hover {
                background: #13183f;
              }
              > svg {
                transform: rotate(${!props.openToolbox ? "-" : ""}90deg);
                > path {
                  fill: #fff;
                }
              }
            `}
            onClick={() => {
              if (props.openToolbox) {
                props.onClose();
              } else {
                props.onOpen();
              }
            }}
          >
            <TriangleXSIcon />
          </div>
        )}
        {view && (
          <ToolboxNav
            activeStep={activePanels}
            setActiveStep={setActivePanels}
            mappedData={props.mappedData}
          />
        )}
        {props.dataSteps && (
          <ChartToolBoxSteps
            activeStep={activePanels}
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
            dimensions={props.dimensions}
            setDatasetName={props.setDatasetName}
          />
        )}
        {props.exportView && props.rawViz && (
          <div css={styles.exportview}>
            <ChartExporter />
          </div>
        )}
        {props.filtersView && (
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
        )}
      </div>
    </Slide>
  );
}
