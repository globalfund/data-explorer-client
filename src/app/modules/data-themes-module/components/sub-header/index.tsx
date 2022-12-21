/* third-party */
import React from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { convertToRaw } from "draft-js";
import styled from "styled-components/macro";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import SaveIcon from "@material-ui/icons/Save";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";
import { LinkIcon } from "app/assets/icons/Link";
import ShareIcon from "@material-ui/icons/Share";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useHistory, useParams } from "react-router-dom";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DataThemesTabs } from "app/modules/data-themes-module/components/tabs";
import { styles } from "app/modules/data-themes-module/components/sub-header/styles";
import { DataThemesPageSubHeaderProps } from "app/modules/data-themes-module/components/sub-header/data";
import {
  DataThemeAPIModel,
  emptyDataThemeAPI,
} from "app/modules/data-themes-module/sub-modules/theme-builder/data";

const InfoSnackbar = styled((props) => <Snackbar {...props} />)`
  && {
    bottom: 40px;
  }

  & [class*="MuiSnackbarContent-root"] {
    width: 550px;
    display: flex;
    padding: 0 32px;
    flex-wrap: nowrap;
    background: #f1f3f5;
    border-radius: 25px;
    justify-content: space-between;
    box-shadow: 0 8px 17px -4px rgba(130, 142, 148, 0.35),
      0 0 4px 0 rgba(130, 142, 148, 0.16), 0 0 2px 0 rgba(130, 142, 148, 0.12);

    @media (max-width: 550px) {
      width: calc(100% - 16px);
    }
  }

  & [class*="MuiSnackbarContent-message"] {
    color: #000;
    font-size: 18px;
    padding: 16px 0;
    font-weight: 700;
    font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
  }

  & [class*="MuiSnackbarContent-action"] {
    > button {
      color: #fff;
      padding: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
      border-style: none;
      background: #262c34;
      border-radius: 20px;
      box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.05);
      font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
    }
  }

  & [class*="MuiSnackbarContent-action"] {
    padding: 16px 0;
  }
`;

export function DataThemesPageSubHeader(props: DataThemesPageSubHeaderProps) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();
  const { loading, visualOptions } = props;

  const title = useStoreState((state) => state.dataThemes.titles.title);
  const setTitle = useStoreActions(
    (actions) => actions.dataThemes.titles.setTitle
  );
  const subTitle = useStoreState((state) => state.dataThemes.titles.subTitle);
  const setSubTitle = useStoreActions(
    (actions) => actions.dataThemes.titles.setSubTitle
  );
  const tabTitles = useStoreState((state) => state.dataThemes.titles.tabTitles);
  const [isSavedEnabled, setIsSavedEnabled] = React.useState(false);
  const [isPreviewEnabled, setIsPreviewEnabled] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState<string | null>(null);

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
  const tabDeleted = useStoreState(
    (state) => state.dataThemes.sync.tabDeleted.value
  );

  const stepSelectionsData = useStoreState(
    (state) => state.dataThemes.sync.stepSelections
  );
  const selectedChartType = useStoreState(
    (state) => state.dataThemes.sync.chartType.value
  );
  const createDataThemeData = useStoreState(
    (state) =>
      (state.dataThemes.DataThemeCreate.crudData ??
        emptyDataThemeAPI) as DataThemeAPIModel
  );
  const createDataThemeSuccess = useStoreState(
    (state) => state.dataThemes.DataThemeCreate.success
  );
  const editDataThemeSuccess = useStoreState(
    (state) => state.dataThemes.DataThemeUpdate.success
  );
  const createOrEditDataThemeLoading = useStoreState(
    (state) =>
      state.dataThemes.DataThemeCreate.loading ||
      state.dataThemes.DataThemeUpdate.loading
  );
  const appliedFilters = useStoreState(
    (state) => state.dataThemes.appliedFilters.value
  );
  const enabledFilterOptionGroups = useStoreState(
    (state) => state.dataThemes.sync.enabledFilterOptionGroups.value
  );
  const vizIsTextContent = useStoreState(
    (state) => state.dataThemes.textContent.vizIsTextContent
  );
  const textContent = useStoreState(
    (state) => state.dataThemes.textContent.value
  );
  const isPublicTheme = useStoreState(
    (state) => state.dataThemes.sync.public.value
  );
  const orderData = useStoreState(
    (state) => state.dataThemes.sync.vizOrderData.value
  );
  const loadedDataTheme = useStoreState(
    (state) =>
      (state.dataThemes.DataThemeGet.crudData ??
        emptyDataThemeAPI) as DataThemeAPIModel
  );

  const createDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeCreate.post
  );
  const editDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeUpdate.patch
  );
  const createDataThemeClear = useStoreActions(
    (actions) => actions.dataThemes.DataThemeCreate.clear
  );
  const editDataThemeClear = useStoreActions(
    (actions) => actions.dataThemes.DataThemeUpdate.clear
  );
  const setIsPublicTheme = useStoreActions(
    (actions) => actions.dataThemes.sync.public.setValue
  );
  const clearOrderData = useStoreActions(
    (actions) => actions.dataThemes.sync.vizOrderData.clear
  );
  const setVizDeleted = useStoreActions(
    (actions) => actions.dataThemes.sync.vizDeleted.setValue
  );
  const setVizDuplicated = useStoreActions(
    (actions) => actions.dataThemes.sync.vizDuplicated.setValue
  );
  const setTabDeleted = useStoreActions(
    (actions) => actions.dataThemes.sync.tabDeleted.setValue
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleCopy(text: string, result: boolean) {
    setOpenSnackbar(result);
  }

  function handleCloseSnackbar() {
    setOpenSnackbar(false);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onSave();
    }
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle({ title: event.target.value });
  }

  function handleSubTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSubTitle({ subTitle: event.target.value });
  }

  function onSave() {
    if (isSavedEnabled) {
      const tabs: any[] = [];
      console.log(tabIds);
      tabIds.length > 0 &&
        tabIds.forEach((content, tabIndex) => {
          // Add an empty tab for each tab in the list
          tabs.push({ title: tabTitles[tabIndex], content: [] });
          content.forEach((index, vizIndex) => {
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
                vizOptions: visualOptions[tabIndex][vizIndex],
                appliedFilters: appliedFilters[tabIndex][vizIndex],
                enabledFilterOptionGroups:
                  enabledFilterOptionGroups[tabIndex][vizIndex],
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
      console.log(tabs);
      const dataTheme = {
        title,
        subTitle,
        tabs,
      };
      if (page === "new") {
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
              !get(visualOptions, `[${tabIndex}][${vizIndex}]`, null) ||
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
      (!loading &&
        selectedChartType[activeTabIndex][activeVizIndex] !== "" &&
        selectedChartType[activeTabIndex][activeVizIndex] !== null &&
        !isEmpty(mapping[activeTabIndex][activeVizIndex]) &&
        activePanels[activeTabIndex][activeVizIndex] > 2 &&
        props.validMapping) ||
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
    loading,
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
    props.validMapping,
  ]);

  React.useEffect(() => {
    const newValue =
      (!loading &&
        selectedChartType[activeTabIndex][activeVizIndex] !== "" &&
        selectedChartType[activeTabIndex][activeVizIndex] !== null &&
        !isEmpty(mapping[activeTabIndex][activeVizIndex]) &&
        activePanels[activeTabIndex][activeVizIndex] > 2 &&
        props.validMapping) ||
      vizIsTextContent[activeTabIndex][activeVizIndex];
    if (newValue !== isPreviewEnabled) {
      setIsPreviewEnabled(newValue);
    }
  }, [
    loading,
    selectedChartType,
    mapping,
    vizIsTextContent,
    activePanels,
    activeTabIndex,
    activeVizIndex,
    props.validMapping,
  ]);

  React.useEffect(() => {
    if (createDataThemeSuccess || editDataThemeSuccess) {
      setShowSnackbar("Your Theme has been saved!");
      clearOrderData();
      setVizDeleted(false);
      setTabDeleted(false);
      setVizDuplicated(false);
    }
    return () => {
      createDataThemeClear();
      editDataThemeClear();
    };
  }, [createDataThemeSuccess, editDataThemeSuccess]);

  React.useEffect(() => {
    if (
      !props.isEditMode &&
      createDataThemeData.id.length > 0 &&
      createDataThemeData.id !== page
    ) {
      history.push(`/data-themes/${createDataThemeData.id}`, {
        editMode: true,
      });
    }
  }, [createDataThemeData]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div css={styles.container}>
      {createOrEditDataThemeLoading && <PageLoader />}
      <InfoSnackbar
        data-testid="data-theme-snackbar"
        onClose={() => setShowSnackbar(null)}
        open={showSnackbar !== null && showSnackbar !== ""}
      >
        <SnackbarContent
          message={showSnackbar}
          aria-describedby="data-theme-snackbar-content"
          action={
            <button
              onClick={() => {
                setShowSnackbar(null);
                history.push("/data-themes");
              }}
            >
              Go to my themes
            </button>
          }
        />
      </InfoSnackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message="Link copied to clipboard"
      />
      <div css={styles.innercontainer}>
        <div
          css={styles.firstrow}
          style={
            props.previewMode
              ? {
                  pointerEvents: "none",
                }
              : {}
          }
        >
          <div>
            <div>
              <input
                type="text"
                value={title}
                onKeyUp={handleKeyUp}
                css={styles.titleInput}
                onChange={handleTitleChange}
                style={
                  props.previewMode
                    ? {
                        width: "fit-content",
                      }
                    : {}
                }
              />
              {!props.previewMode && (
                <KeyboardArrowDownIcon htmlColor="#262c34" />
              )}
            </div>
            <input
              type="text"
              value={subTitle}
              onKeyUp={handleKeyUp}
              css={styles.subTitleInput}
              onChange={handleSubTitleChange}
              style={
                props.previewMode
                  ? {
                      width: "fit-content",
                    }
                  : {}
              }
            />
          </div>
          {!props.previewMode && (
            <div css={styles.iconbtns}>
              <IconButton onClick={handleClick}>
                <ShareIcon htmlColor="#262c34" />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                css={`
                  .MuiPaper-root {
                    border-radius: 10px;
                    background: #495057;
                  }
                `}
              >
                <div css={styles.sharePopup}>
                  <FormControlLabel
                    value="public-theme"
                    label="Public theme"
                    labelPlacement="start"
                    control={
                      <Switch
                        color="primary"
                        checked={isPublicTheme}
                        onChange={() => setIsPublicTheme(!isPublicTheme)}
                      />
                    }
                  />
                  <Divider />
                  <CopyToClipboard
                    text={window.location.href}
                    onCopy={handleCopy}
                  >
                    <Button startIcon={<LinkIcon />}>Copy link</Button>
                  </CopyToClipboard>
                </div>
              </Popover>
              <IconButton
                component={Link}
                to={`/data-themes/${page}/preview`}
                disabled={!isPreviewEnabled}
                css={`
                  opacity: ${isPreviewEnabled ? 1 : 0.5};
                `}
              >
                <svg width="20" height="19" viewBox="0 0 20 19">
                  <rect width="20" height="19" rx="3" fill="#262C34" />
                  <path
                    fill="#EFEFEF"
                    d="M14 9L6.5 13.3301L6.5 4.66987L14 9Z"
                  />
                </svg>
              </IconButton>
              <IconButton
                onClick={onSave}
                disabled={!isSavedEnabled}
                css={`
                  opacity: ${isSavedEnabled ? 1 : 0.5};
                `}
              >
                <SaveIcon htmlColor="#262c34" />
              </IconButton>
            </div>
          )}
        </div>
        <div css={styles.secondrow}>
          <DataThemesTabs
            updateLocalStates={props.updateLocalStates}
            disabled={props.tabsDisabled}
            previewMode={props.previewMode}
            deleteTab={props.deleteTab}
            visualOptions={props.visualOptions}
            isEditMode={props.isEditMode}
          />
        </div>
      </div>
    </div>
  );
}

export function DataThemesGenericPageSubHeader(props: { title: string }) {
  return (
    <div css={styles.container}>
      <div css={styles.innercontainer}>
        <div css={styles.firstrow}>
          <h1>{props.title}</h1>
        </div>
      </div>
    </div>
  );
}
