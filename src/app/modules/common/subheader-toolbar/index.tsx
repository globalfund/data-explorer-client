import React from "react";
import styled from "styled-components/macro";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import CopyToClipboard from "react-copy-to-clipboard";
import { useRecoilState, useRecoilValue } from "recoil";
import { PageLoader } from "app/modules/common/page-loader";
import { Link, useHistory, useParams } from "react-router-dom";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { styles } from "app/modules/common/subheader-toolbar/styles";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { CssSnackbar, ISnackbarState } from "app/components/Styled/snackbar";
import { SubheaderToolbarProps } from "app/modules/common/subheader-toolbar/data";
import { ExportChartButton } from "app/modules/common/subheader-toolbar/exportButton";
import {
  createChartFromReportAtom,
  unSavedReportPreviewModeAtom,
} from "app/state/recoil/atoms";

const InfoSnackbar = styled((props) => <Snackbar {...props} />)`
  && {
    bottom: 40px;
  }

  & [class*="MuiSnackbarContent-root"] {
    width: 100%;
    display: flex;
    padding: 0 78px;
    background: #fff;
    flex-wrap: nowrap;
    border-radius: 12px;
    gap: ${(props) => (props.gap ? "0px" : "84px")};
    justify-content: center;
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
      color: #262c34;
      cursor: pointer;
      font-size: 14px;
      border-style: none;
      padding: 12px 27px;
      background: #495057;
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

  const createChartFromReport = useRecoilValue(createChartFromReportAtom);

  const setReportPreviewMode = useRecoilState(unSavedReportPreviewModeAtom)[1];

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [isPublicTheme, setIsPublicTheme] = React.useState(false);
  const [isSavedEnabled, setIsSavedEnabled] = React.useState(false);
  const [isPreviewEnabled, setIsPreviewEnabled] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const createOrEditChartLoading = useStoreState(
    (state) =>
      state.charts.ChartCreate.loading || state.charts.ChartUpdate.loading
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = (_text: string, result: boolean) => {
    setOpenSnackbar(result);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  React.useEffect(() => {
    return () => {
      createChartClear();
      editChartClear();
    };
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleBackToEdit = () => {
    if (props.pageType === "report") {
      setReportPreviewMode(false);
      if (page === "new") {
        history.push(`/report/new/create`);
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
        gap={createChartFromReport.view !== ""}
        data-testid="create-chart-snackbar"
        onClose={() => setShowSnackbar(null)}
        open={showSnackbar !== null && showSnackbar !== ""}
      >
        <SnackbarContent
          message={showSnackbar}
          aria-describedby="create-chart-snackbar-content"
          action={
            <>
              {createChartFromReport.view === "" && (
                <button
                  onClick={() => {
                    setShowSnackbar(null);
                    history.push("/report/new/initial");
                  }}
                >
                  CREATE NEW REPORT
                </button>
              )}
            </>
          }
        />
      </InfoSnackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        message="Link copied!"
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
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
              {view === "preview" && props.pageType !== "chart" && (
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
                    <Tooltip title="Edit">
                      <span>
                        <IconButton
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
                          <EditIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Share">
                      <span>
                        <IconButton
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
                          <LinkIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Download">
                      <span>
                        <IconButton
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
                          <CloudDownloadIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </React.Fragment>
                )}
                {page !== "new" && !view && (
                  <React.Fragment>
                    <Tooltip title="Edit">
                      <IconButton
                        component={Link}
                        to={`/${props.pageType}/${page}/${
                          props.pageType === "chart" ? "customize" : "edit"
                        }`}
                      >
                        <EditIcon htmlColor="#495057" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share">
                      <IconButton onClick={handleClick}>
                        <LinkIcon htmlColor="#495057" />
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
                          background: #fff;
                          border-radius: 10px;
                        }
                      `}
                    >
                      <div css={styles.sharePopup}>
                        <FormControlLabel
                          value="public-theme"
                          labelPlacement="start"
                          label="Make report public"
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
                          <Button>Copy link</Button>
                        </CopyToClipboard>
                      </div>
                    </Popover>
                    <ExportChartButton />
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
    </div>
  );
}
