import React from "react";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { useRecoilState } from "recoil";
import styled from "styled-components/macro";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import ShareIcon from "@material-ui/icons/Share";
import { LinkIcon } from "app/assets/icons/Link";
import Snackbar from "@material-ui/core/Snackbar";
import DeleteIcon from "@material-ui/icons/Delete";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import CopyToClipboard from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { PageLoader } from "app/modules/common/page-loader";
import { Link, useHistory, useParams } from "react-router-dom";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { styles } from "app/modules/common/subheader-toolbar/styles";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import DeleteChartDialog from "app/components/Dialogs/deleteChartDialog";
import DeleteReportDialog from "app/components/Dialogs/deleteReportDialog";
import { ChartAPIModel, emptyChartAPI } from "app/modules/chart-module/data";
import { SubheaderToolbarProps } from "app/modules/common/subheader-toolbar/data";
import { ExportChartButton } from "app/modules/common/subheader-toolbar/exportButton";
import {
  CssSnackbar,
  ISnackbarState,
} from "app/fragments/datasets-fragment/upload-steps/previewFragment";
import {
  homeDisplayAtom,
  unSavedReportPreviewMode,
} from "app/state/recoil/atoms";

const InfoSnackbar = styled((props) => <Snackbar {...props} />)`
  && {
    bottom: 40px;
  }

  & [class*="MuiSnackbarContent-root"] {
    width: 640px;
    display: flex;
    padding: 0 78px;
    background: #fff;
    flex-wrap: nowrap;
    border-radius: 12px;
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
      cursor: pointer;
      font-size: 14px;
      border-style: none;
      padding: 12px 27px;
      background: #262c34;
      border-radius: 20px;
    }
  }

  & [class*="MuiSnackbarContent-action"] {
    padding: 16px 0;
  }
`;

export function SubheaderToolbar(props: SubheaderToolbarProps) {
  const history = useHistory();
  const { page, view } = useParams<{ page: string; view?: string }>();
  const [modalDisplay, setModalDisplay] = React.useState({
    report: false,
    chart: false,
  });
  const [enableButton, setEnableButton] = React.useState<boolean>(false);

  const [_, setHomeTab] = useRecoilState(homeDisplayAtom);
  const [reportPreviewMode, setReportPreviewMode] = useRecoilState(
    unSavedReportPreviewMode
  );
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [isPublicTheme, setIsPublicTheme] = React.useState(false);
  const [isSavedEnabled, setIsSavedEnabled] = React.useState(false);
  const [isPreviewEnabled, setIsPreviewEnabled] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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
  const loadReports = useStoreActions(
    (actions) => actions.reports.ReportGetList.fetch
  );
  const loadCharts = useStoreActions(
    (actions) => actions.charts.ChartGetList.fetch
  );
  const loadedChart = useStoreState(
    (state) =>
      (state.charts.ChartGet.crudData ?? emptyChartAPI) as ChartAPIModel
  );
  const createChartData = useStoreState(
    (state) =>
      (state.charts.ChartCreate.crudData ?? emptyChartAPI) as ChartAPIModel
  );
  const createChartSuccess = useStoreState(
    (state) => state.charts.ChartCreate.success
  );
  const editChartSuccess = useStoreState(
    (state) => state.charts.ChartUpdate.success
  );
  const createOrEditChartLoading = useStoreState(
    (state) =>
      state.charts.ChartCreate.loading || state.charts.ChartUpdate.loading
  );

  const createChart = useStoreActions(
    (actions) => actions.charts.ChartCreate.post
  );
  const editChart = useStoreActions(
    (actions) => actions.charts.ChartUpdate.patch
  );
  const createChartClear = useStoreActions(
    (actions) => actions.charts.ChartCreate.clear
  );
  const editChartClear = useStoreActions(
    (actions) => actions.charts.ChartUpdate.clear
  );

  const [snackbarState, setSnackbarState] = React.useState<ISnackbarState>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setName(event.target.value);
  };
  const handleDeleteModalInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "DELETE") {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = (text: string, result: boolean) => {
    setOpenSnackbar(result);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSave = () => {
    if (props.onReportSave) {
      props.onReportSave();
      return;
    }
    const chart = {
      name: props.name,
      vizType: selectedChartType,
      mapping,
      datasetId: dataset,
      vizOptions: props.visualOptions || {},
      appliedFilters,
      enabledFilterOptionGroups,
    };
    if (view !== undefined && page !== "new") {
      editChart({
        patchId: page,
        values: chart,
      });
    } else {
      createChart({
        values: chart,
      });
    }
  };

  React.useEffect(() => {
    return () => {
      createChartClear();
      editChartClear();
    };
  }, []);

  React.useEffect(() => {
    const newValue =
      selectedChartType !== "" &&
      selectedChartType !== null &&
      !isEmpty(mapping) &&
      activePanels > 2;
    if (newValue !== isPreviewEnabled) {
      setIsPreviewEnabled(newValue);
    }
  }, [selectedChartType, mapping, activePanels]);

  React.useEffect(() => {
    const newValue =
      (selectedChartType !== "" &&
        selectedChartType !== null &&
        !isEmpty(mapping) &&
        activePanels > 3) ||
      (view !== undefined && page !== "new" && props.name !== loadedChart.name);
    if (newValue !== isSavedEnabled) {
      setIsSavedEnabled(newValue);
    }
  }, [
    view,
    props.name,
    mapping,
    activePanels,
    loadedChart.name,
    selectedChartType,
  ]);

  React.useEffect(() => {
    if (
      (createChartSuccess &&
        createChartData.id &&
        createChartData.id.length > 0) ||
      editChartSuccess
    ) {
      setShowSnackbar(
        `Chart ${
          view !== undefined && page !== "new" ? "saved" : "created"
        } successfully!`
      );
      const id = createChartSuccess ? createChartData.id : page;
      history.push(`/chart/${id}`);
    }
  }, [createChartSuccess, editChartSuccess, createChartData]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleModalDisplay = () => {
    if (props.pageType === "chart") {
      setModalDisplay({
        ...modalDisplay,
        chart: true,
      });
    } else {
      setModalDisplay({
        ...modalDisplay,
        report: true,
      });
    }
  };

  const handleDelete = () => {
    setEnableButton(false);
    if (props.pageType === "report") {
      setModalDisplay({
        ...modalDisplay,
        report: false,
      });
      axios
        .delete(`${process.env.REACT_APP_API}/report/${page}`)
        .then(() => {
          loadReports({
            storeInCrudData: true,
            filterString: "filter[order]=createdDate desc",
          });
        })
        .catch((error) => console.log(error));
      setHomeTab("reports");
    } else {
      setModalDisplay({
        ...modalDisplay,
        chart: false,
      });
      axios
        .delete(`${process.env.REACT_APP_API}/chart/${page}`)
        .then(() => {
          loadCharts({
            storeInCrudData: true,
            filterString: "filter[order]=createdDate desc",
          });
        })
        .catch((error) => console.log(error));
      setHomeTab("charts");
    }
    history.replace("/");
  };

  const handleDuplicate = () => {
    if (props.pageType === "report")
      axios
        .get(`${process.env.REACT_APP_API}/report/duplicate/${page}`)
        .then(() => {
          loadReports({
            storeInCrudData: true,
            filterString: "filter[order]=createdDate desc",
          });
          setSnackbarState({
            ...snackbarState,
            open: true,
          });
        })
        .catch((error) => console.log(error));
  };

  const handlePreviewMode = () => {
    if (props.pageType === "report") {
      if (page === "new") {
        setReportPreviewMode(true);
      } else {
        history.push(`/${props.pageType}/${page}/preview`);
      }
    } else {
      history.push(`/${props.pageType}/${page}/preview`);
    }
  };

  const handleBackToEdit = () => {
    if (props.pageType === "report") {
      if (page === "new") {
        setReportPreviewMode(false);
      } else {
        history.push(`/${props.pageType}/${page}/${"edit"}`);
      }
    } else {
      history.push(`/${props.pageType}/${page}/${"edit"}`);
    }
  };

  return (
    <div id="subheader-toolbar" css={styles.container}>
      {createOrEditChartLoading && <PageLoader />}
      <InfoSnackbar
        data-testid="create-chart-snackbar"
        onClose={() => setShowSnackbar(null)}
        open={showSnackbar !== null && showSnackbar !== ""}
      >
        <SnackbarContent
          message={showSnackbar}
          aria-describedby="create-chart-snackbar-content"
          action={
            <button
              onClick={() => {
                setShowSnackbar(null);
                setHomeTab("reports");
                history.push("/report/new/initial");
              }}
            >
              CREATE NEW REPORT
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
      <Container maxWidth="lg">
        <div css={styles.innercontainer}>
          {view === "initial" ? (
            <p>Select your report template</p>
          ) : (
            <input
              value={props.name}
              placeholder="Title"
              css={styles.nameInput}
              onChange={onNameChange}
              style={
                page !== "new" && !view
                  ? {
                      pointerEvents: "none",
                    }
                  : {}
              }
            />
          )}
          {view !== "initial" && (
            <div css={styles.endContainer}>
              {(view === "preview" || reportPreviewMode) &&
                props.pageType !== "chart" && (
                  <>
                    <button
                      onClick={handleBackToEdit}
                      css={styles.backToEdit}
                      type="button"
                    >
                      <EditIcon htmlColor="#fff" />
                      Go back to editing
                    </button>
                  </>
                )}
              <div css={styles.iconbtns}>
                {(page === "new" || view) && (
                  <React.Fragment>
                    <Tooltip title="Preview">
                      <IconButton
                        onClick={handlePreviewMode}
                        disabled={
                          props.forceEnablePreviewSave
                            ? !props.forceEnablePreviewSave
                            : !isPreviewEnabled
                        }
                        css={`
                          :disabled {
                            opacity: 0.5;
                          }
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
                    </Tooltip>
                    <Tooltip title="Save">
                      <IconButton
                        onClick={onSave}
                        disabled={
                          props.forceEnablePreviewSave
                            ? !props.forceEnablePreviewSave
                            : !isSavedEnabled
                        }
                        css={`
                          :disabled {
                            opacity: 0.5;
                          }
                        `}
                      >
                        <SaveIcon htmlColor="#262c34" />
                      </IconButton>
                    </Tooltip>
                  </React.Fragment>
                )}
                {page !== "new" && !view && (
                  <React.Fragment>
                    <ExportChartButton />
                    <Tooltip title="Duplicate">
                      <IconButton onClick={handleDuplicate}>
                        <FileCopyIcon htmlColor="#262c34" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                      <IconButton onClick={handleClick}>
                        <ShareIcon htmlColor="#262c34" />
                      </IconButton>
                    </Tooltip>
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
                    <Tooltip title="Edit">
                      <IconButton
                        component={Link}
                        to={`/${props.pageType}/${page}/${
                          props.pageType === "chart" ? "customize" : "edit"
                        }`}
                      >
                        <EditIcon htmlColor="#262c34" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={handleModalDisplay}>
                        <DeleteIcon htmlColor="#262c34" />
                      </IconButton>
                    </Tooltip>
                  </React.Fragment>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
      <CssSnackbar
        anchorOrigin={{
          vertical: snackbarState.vertical,
          horizontal: snackbarState.horizontal,
        }}
        open={snackbarState.open}
        onClose={() => setSnackbarState({ ...snackbarState, open: false })}
        message={`Report has been duplicated successfully!`}
        key={snackbarState.vertical + snackbarState.horizontal}
      />
      <DeleteReportDialog
        modalDisplay={modalDisplay.report}
        enableButton={enableButton}
        handleDelete={handleDelete}
        setModalDisplay={setModalDisplay}
        handleInputChange={handleDeleteModalInputChange}
      />
      <DeleteChartDialog
        modalDisplay={modalDisplay.chart}
        enableButton={enableButton}
        handleDelete={handleDelete}
        setModalDisplay={setModalDisplay}
        handleInputChange={handleDeleteModalInputChange}
      />
    </div>
  );
}
