/* third-party */
import React from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { convertToRaw } from "draft-js";
import MuiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import BarChartIcon from "@material-ui/icons/BarChart";
import { useLocation, useParams } from "react-router-dom";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { useDataThemesAddSection } from "app/hooks/useDataThemesAddSection";
import { styles } from "app/modules/data-themes-module/components/toolbox/styles";
import { DataThemesExporter } from "app/modules/data-themes-module/components/exporter";
import { DataThemesToolBoxProps } from "app/modules/data-themes-module/components/toolbox/data";
import { DataThemesToolBoxText } from "app/modules/data-themes-module/components/toolbox/views/text";
import { DataThemesToolBoxSteps } from "app/modules/data-themes-module/components/toolbox/views/steps";
import { DataThemesToolBoxPreview } from "app/modules/data-themes-module/components/toolbox/views/preview";
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
    fontFamily: "GothamNarrow-Bold, sans-serif",
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
    fontFamily: "GothamNarrow-Bold, sans-serif",
  },
  disabled: {
    backgroundColor: "#ADB5BD",
  },
}))(MuiButton);

export function DataThemesToolBox(props: DataThemesToolBoxProps) {
  const { page } = useParams<{ page: string }>();
  const { onChartPress, onTextPress } = useDataThemesAddSection({
    addVizToLocalStates: props.addVizToLocalStates,
  });

  const title = useStoreState((state) => state.dataThemes.titles.title);
  const subTitle = useStoreState((state) => state.dataThemes.titles.subTitle);
  const tabTitles = useStoreState((state) => state.dataThemes.titles.tabTitles);
  const [isSavedEnabled, setIsSavedEnabled] = React.useState(false);

  const mapping = useStoreState((state) => state.dataThemes.sync.mapping.value);
  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );
  const tabIds = useStoreState((state) => state.dataThemes.ids.value);
  const activePanels = useStoreState(
    (state) => state.dataThemes.activePanels.value
  );
  const vizDeleted = useStoreState(
    (state) => state.dataThemes.sync.vizDeleted.value
  );
  const vizDuplicated = useStoreState(
    (state) => state.dataThemes.sync.vizDuplicated.value
  );

  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );
  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const appliedFilters = useStoreState(
    (state) => state.dataThemes.appliedFilters.value
  );
  const vizIsTextContent = useStoreState(
    (state) => state.dataThemes.textContent.vizIsTextContent
  );
  const textContent = useStoreState(
    (state) => state.dataThemes.textContent.value
  );
  const orderData = useStoreState(
    (state) => state.dataThemes.sync.vizOrderData.value
  );
  const loadedDataTheme = useStoreState(
    (state) =>
      (state.dataThemes.DataThemeGet.crudData ??
        emptyDataThemeAPI) as DataThemeAPIModel
  );
  const tabDeleted = useStoreState(
    (state) => state.dataThemes.sync.tabDeleted.value
  );

  const createDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeCreate.post
  );
  const editDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeUpdate.patch
  );

  function onSave() {
    const tabs: any[] = [];
    tabIds.length > 0 &&
      tabIds.map((content, tabIndex) => {
        // Add an empty tab for each tab in the list
        tabs.push({ title: tabTitles[tabIndex], content: [] });
        content.map((index, vizIndex) => {
          // add a viz object for every viz in the current tab.
          let vizObject: any = {};
          if (vizIsTextContent[tabIndex][vizIndex]) {
            const contentState =
              textContent[tabIndex][vizIndex].getCurrentContent();
            const rawContent = JSON.stringify(convertToRaw(contentState));
            vizObject = {
              content: rawContent,
            };
          } else {
            vizObject = {
              mapping: mapping[tabIndex][vizIndex],
              vizType: selectedChartType[tabIndex][vizIndex],
              datasetId: stepSelectionsData.step1[tabIndex][vizIndex].dataset,
              vizOptions: props.visualOptions[tabIndex][vizIndex],
              appliedFilters: appliedFilters[tabIndex][vizIndex],
            };
          }
          tabs[tabIndex].content.push(vizObject);
        });
      });
    if (tabs[activeTabIndex] && orderData.order.length > 1) {
      tabs[activeTabIndex].content = orderData.order.map(
        (order: number) => tabs[activeTabIndex].content[order]
      );
    }
    const dataTheme = {
      title,
      subTitle,
      tabs,
    };
    if (!props.isEditMode) {
      createDataTheme({
        values: dataTheme,
      });
    } else {
      editDataTheme({
        patchId: page,
        values: dataTheme,
      });
    }
  }

  React.useEffect(() => {
    let allTabsOK = true;
    if (tabIds.length > 0 && !props.previewMode) {
      tabIds.forEach((content, tabIndex) => {
        content.forEach((contentViz, vizIndex) => {
          if (!get(vizIsTextContent, `[${tabIndex}][${vizIndex}]`, null)) {
            if (
              !get(mapping, `[${tabIndex}][${vizIndex}]`, null) ||
              !get(selectedChartType, `[${tabIndex}][${vizIndex}]`, null) ||
              !get(
                stepSelectionsData.step1,
                `[${tabIndex}][${vizIndex}]`,
                null
              ) ||
              !get(props.visualOptions, `[${tabIndex}][${vizIndex}]`, null) ||
              !get(appliedFilters, `[${tabIndex}][${vizIndex}]`, null)
            ) {
              allTabsOK = false;
            }
          }
        });
      });
    } else {
      allTabsOK = false;
    }
    const newValue =
      (!props.loading &&
        (props.data && props.data.length) > 0 &&
        selectedChartType[activeTabIndex][activeVizIndex] !== "" &&
        selectedChartType[activeTabIndex][activeVizIndex] !== null &&
        !isEmpty(mapping[activeTabIndex][activeVizIndex]) &&
        activePanels[activeTabIndex][activeVizIndex] > 3) ||
      vizIsTextContent[activeTabIndex][activeVizIndex] ||
      orderData.hasChanged ||
      vizDeleted ||
      tabDeleted ||
      vizDuplicated ||
      (props.isEditMode &&
        (title !== loadedDataTheme.title ||
          subTitle !== loadedDataTheme.subTitle));
    if (newValue !== isSavedEnabled) {
      setIsSavedEnabled(newValue && allTabsOK);
    }
  }, [
    props.data,
    props.loading,
    selectedChartType,
    mapping,
    vizIsTextContent,
    activePanels,
    activeTabIndex,
    activeVizIndex,
    orderData.hasChanged,
    tabDeleted,
    vizDeleted,
    vizDuplicated,
    title,
    subTitle,
  ]);

  return (
    <div css={styles.container(props.filtersView)}>
      {props.guideView && (
        <section>
          <h5>Guide</h5>
          <h6>You can add following contents in the theme</h6>
          <div css={styles.contentlist}>
            <div onClick={onChartPress}>
              <div>
                <BarChartIcon htmlColor="#262C34" />
              </div>
              Data visualisation
            </div>
            <div
              onClick={onTextPress}
              css={`
                opacity: 0.5;
                pointer-events: none;
              `}
            >
              <div>
                <TextFieldsIcon htmlColor="#262C34" />
              </div>
              Rich Text
            </div>
            {/* <div>
              <div>
                <SearchIcon htmlColor="#262C34" />
              </div>
              Search
            </div>
            <div>
              <div>
                <DashboardIcon htmlColor="#262C34" />
              </div>
              Data theme templates
            </div> */}
          </div>
        </section>
      )}
      {props.dataSteps && (
        <DataThemesToolBoxSteps
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
          setFilterOptionGroups={props.setFilterOptionGroups}
        />
      )}
      {props.exportView && props.rawViz && (
        <div css={styles.exportview}>
          <DataThemesExporter rawViz={props.rawViz} />
        </div>
      )}
      {props.filtersView && (
        <div css="height: 100%;position: relative;">
          <DataThemesToolBoxPreview
            tabIndex={props.tabIndex}
            vizIndex={props.vizIndex}
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
      {props.textView && <DataThemesToolBoxText />}
    </div>
  );
}
