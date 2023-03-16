import { Box, Container, useMediaQuery } from "@material-ui/core";
import { ToolBoxPanel } from "app/components/ToolBoxPanel";
import { useDataThemesRawData } from "app/hooks/useDataThemesRawData";
import { useStoreState } from "app/state/store/hooks";
import { config } from "dotenv";
import { get } from "lodash";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams } from "react-router-dom";
import useSessionStorage from "react-use/lib/useSessionStorage";
import { DataThemesAlertDialog } from "../data-themes-module/components/alert-dialog";
import { DataThemesPageSubHeader } from "../data-themes-module/components/sub-header";
import { DataThemeRenderedTabItem } from "../data-themes-module/sub-modules/theme-builder/data";
import { DataThemesBuilderPreviewThemePage } from "../data-themes-module/sub-modules/theme-builder/views/preview-theme";

export default function ChartDetailModule() {
  const vizWrapperRef = React.useRef(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { page, view } = useParams<{ page: string; view?: string }>();
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(!isMobile);

  const isDataThemeLoading = useStoreState(
    (state) => state.dataThemes.DataThemeGet.loading
  );

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );

  const [visualOptions, setVisualOptions] = useSessionStorage<any>(
    "visualOptions",
    [[{}]]
  );

  const [tabsFromAPI, setTabsFromAPI] = React.useState<
    DataThemeRenderedTabItem[][]
  >([[]]);

  function addVizToLocalStates() {
    let tmpVisualOptions: any = [...visualOptions];
    tmpVisualOptions[activeTabIndex].push({});
    setVisualOptions(tmpVisualOptions);
  }

  const renderedCharts = React.useMemo(() => {
    return tabsFromAPI.map((item) => {
      return item.map(
        (itemitem) => itemitem.renderedContent || get(itemitem, "content", "")
      );
    });
  }, [tabsFromAPI]);

  const renderedChartsMappedData = React.useMemo(() => {
    return tabsFromAPI.map((item) => {
      return item.map((itemitem) => itemitem.mappedData);
    });
  }, [tabsFromAPI]);

  const renderedChartsSsr = React.useMemo(() => {
    return tabsFromAPI.map((item) => {
      return item.map((itemitem) => itemitem.ssr);
    });
  }, [tabsFromAPI]);

  const filterOptionGroups = React.useMemo(
    () =>
      get(
        tabsFromAPI,
        `[${activeTabIndex}][${activeVizIndex}].filterOptionGroups`,
        []
      ),
    [tabsFromAPI, activeTabIndex, activeVizIndex]
  );

  const {
    loading,
    dataTypes,
    sampleData,
    isEditMode,
    loadDataset,
    loadDataFromAPI,
  } = useDataThemesRawData({
    visualOptions,
    setVisualOptions,
    setTabsFromAPI,
    tabsFromAPI,
  });

  const getForceNextEnabledValue = (param: string) => {
    return (
      stepSelectionsData.step1[activeTabIndex][activeVizIndex].dataset !== null
    );
  };
  return (
    <React.Fragment>
      <Container max-width="lg">
        <DataThemesAlertDialog />

        <DndProvider backend={HTML5Backend}>
          <DataThemesPageSubHeader
            deleteTab={() => {}}
            isEditMode={isEditMode}
            visualOptions={visualOptions}
            previewMode={true}
            updateLocalStates={() => {}}
            loading={loading || isDataThemeLoading}
            validMapping={getForceNextEnabledValue("mapping")}
            tabsDisabled={true}
          />
          <Box height={30} />
          <DataThemesBuilderPreviewThemePage
            loading={loading || isDataThemeLoading}
            visualOptions={visualOptions}
            setVisualOptions={setVisualOptions}
            isEditMode={true}
            addVizToLocalStates={addVizToLocalStates}
            validMapping={getForceNextEnabledValue("mapping")}
            renderedCharts={renderedCharts}
            renderedChartsSsr={renderedChartsSsr}
            renderedChartsMappedData={renderedChartsMappedData}
          />

          <ToolBoxPanel
            open={openToolboxPanel}
            vizWrapperRef={vizWrapperRef}
            onCloseBtnClick={(value?: boolean) =>
              setOpenToolboxPanel(
                value !== undefined ? value : !openToolboxPanel
              )
            }
            filterGroups={filterOptionGroups}
            css={`
              z-index: 1;
            `}
          />
        </DndProvider>
      </Container>
    </React.Fragment>
  );
}
