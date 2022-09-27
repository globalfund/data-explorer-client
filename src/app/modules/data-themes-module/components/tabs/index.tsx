/* third-party */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory, useParams } from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
/* project */
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { styles } from "app/modules/data-themes-module/components/tabs/styles";

function DataThemesTabItem(props: any) {
  const {
    index,
    disabled,
    deleteTab,
    previewMode,
    handleOpenDialog,
    updateLocalStates,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const tabIds = useStoreState((state) => state.dataThemes.ids.value);
  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );

  const setActiveTabIndex = useStoreActions(
    (state) => state.dataThemes.activeTabIndex.setValue
  );
  const setActiveVizIndex = useStoreActions(
    (state) => state.dataThemes.activeVizIndex.setValue
  );

  const tabTitles = useStoreState((state) => state.dataThemes.titles.tabTitles);
  const setTabTitle = useStoreActions(
    (actions) => actions.dataThemes.titles.setTabTitle
  );

  const removeTabId = useStoreActions(
    (state) => state.dataThemes.ids.removeTab
  );
  const removeTabActivePanel = useStoreActions(
    (state) => state.dataThemes.activePanels.removeTab
  );
  const removeTabChartType = useStoreActions(
    (state) => state.dataThemes.sync.chartType.removeTab
  );
  const removeTabLiveData = useStoreActions(
    (state) => state.dataThemes.sync.liveData.removeTab
  );
  const removeTabMapping = useStoreActions(
    (state) => state.dataThemes.sync.mapping.removeTab
  );
  const removeTabStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.removeTab
  );
  const removeTabAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.removeTab
  );
  const removeTabTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.removeTab
  );
  const removeTabTitles = useStoreActions(
    (actions) => actions.dataThemes.titles.removeTab
  );

  function onTabClick(tab: number) {
    if (activeTabIndex !== tab) {
      // only change when necessary
      setActiveTabIndex(tab);
      setActiveVizIndex(0); // default select the fist viz.
    }
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function onDelete(id: number) {
    if (tabIds.length > 1) {
      setActiveVizIndex(0); // default select the fist viz.
      setActiveTabIndex(0);
      removeTabId({ tabIndex: id });
      removeTabActivePanel({ tabIndex: id });
      removeTabChartType({ tabIndex: id });
      removeTabLiveData({ tabIndex: id });
      removeTabMapping({ tabIndex: id });
      removeTabStepSelections({ tabIndex: id });
      removeTabAppliedFilters({ tabIndex: id });
      removeTabTitles({ tabIndex: id });
      removeTabTextContent({ tabIndex: id });
      deleteTab(id);
      updateLocalStates(true);
    } else {
      handleOpenDialog();
      handleClose();
    }
  }

  const open = Boolean(anchorEl);

  return (
    <div
      css={styles.tab(
        index === activeTabIndex,
        disabled && !previewMode,
        previewMode,
        tabIds.length === 1
      )}
      onClick={disabled && !previewMode ? () => {} : () => onTabClick(index)}
    >
      {activeTabIndex !== index || previewMode ? (
        <div>{tabTitles[index]}</div>
      ) : (
        <input
          type="text"
          css={styles.tabTitle}
          value={tabTitles[index]}
          onChange={(event) => {
            setTabTitle({
              tabIndex: index,
              tabTitle: event.target.value,
            });
          }}
        />
      )}
      {activeTabIndex !== index ||
        (!previewMode && (
          <React.Fragment>
            <IconButton size="small" onClick={handleClick}>
              <KeyboardArrowDownIcon htmlColor="#262c34" />
            </IconButton>
            <Popover
              open={open}
              keepMounted
              disablePortal
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
              <div css={styles.tabPopup}>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(index)}
                >
                  Delete tab
                </Button>
              </div>
            </Popover>
          </React.Fragment>
        ))}
    </div>
  );
}

export function DataThemesTabs(props: any) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();
  const [openDialog, setOpenDialog] = React.useState(false);

  const tabIds = useStoreState((state) => state.dataThemes.ids.value);
  const setActiveTabIndex = useStoreActions(
    (state) => state.dataThemes.activeTabIndex.setValue
  );
  const setActiveVizIndex = useStoreActions(
    (state) => state.dataThemes.activeVizIndex.setValue
  );
  const addTabTitles = useStoreActions(
    (actions) => actions.dataThemes.titles.addTab
  );
  const addTabId = useStoreActions((state) => state.dataThemes.ids.addTab);
  const addTabActivePanel = useStoreActions(
    (state) => state.dataThemes.activePanels.addTab
  );
  const addTabChartType = useStoreActions(
    (state) => state.dataThemes.sync.chartType.addTab
  );
  const addTabLiveData = useStoreActions(
    (state) => state.dataThemes.sync.liveData.addTab
  );
  const addTabMapping = useStoreActions(
    (state) => state.dataThemes.sync.mapping.addTab
  );
  const addTabStepSelections = useStoreActions(
    (state) => state.dataThemes.sync.stepSelections.addTab
  );
  const addTabAppliedFilters = useStoreActions(
    (state) => state.dataThemes.appliedFilters.addTab
  );
  const addTabTextContent = useStoreActions(
    (state) => state.dataThemes.textContent.addTab
  );

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function onAdd() {
    if (openDialog) {
      handleOpenDialog();
    }
    setActiveVizIndex(0); // default select the fist viz.
    setActiveTabIndex(tabIds.length);
    addTabId();
    addTabActivePanel();
    addTabChartType();
    addTabLiveData();
    addTabMapping();
    addTabStepSelections();
    addTabAppliedFilters();
    addTabTitles();
    addTabTextContent();
    props.updateLocalStates(true);
    history.push(`/data-themes/${page}/initial`);
  }

  return (
    <div css={styles.container}>
      <div css={styles.innertabscontainer}>
        {tabIds.map((_: number[], index: number) => (
          <DataThemesTabItem
            key={index}
            index={index}
            deleteTab={props.deleteTab}
            updateLocalStates={props.updateLocalStates}
            disabled={props.tabsDisabled}
            previewMode={props.previewMode}
            handleOpenDialog={handleOpenDialog}
          />
        ))}
      </div>
      {!props.previewMode && (
        <div
          css={props.disabled ? styles.addbtnDisabled : styles.addbtn}
          onClick={props.disabled ? () => {} : onAdd}
        >
          <AddCircleOutlineIcon htmlColor="#262c34" />
        </div>
      )}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        css={`
          .MuiPaper-root {
            background: #f1f3f5;

            h2,
            p {
              color: #000;
            }

            button {
              color: #fff;
              font-weight: bold;
              background: #262c34;
              border-radius: 20px;
              text-transform: none;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            }
          }
        `}
      >
        <DialogTitle>Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot delete a single tab in a data theme
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
          <Button onClick={onAdd} color="primary" autoFocus>
            Add new tab
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}