/* third-party */
import React from "react";
import get from "lodash/get";
import { CSVLink } from "react-csv";
import Snackbar from "@material-ui/core/Snackbar";
import { useStoreState } from "app/state/store/hooks";
import IconButton from "@material-ui/core/IconButton";
import { useLocation, useParams } from "react-router-dom";
import { CloudDownloadIcon } from "app/assets/icons/CloudDownload";
/* project */
import { exportCSV } from "app/utils/exportCSV";
import { LinkIcon } from "app/assets/icons/Link";
import { exportView } from "app/utils/exportView";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useGetAllVizData } from "app/hooks/useGetAllVizData";
import { StyledMenu, StyledMenuItem } from "app/components/PageHeader";

const locationsToNotShowImageExport = [
  "/viz/investments/geomap",
  "/location/<code>/investments/geomap",
  "/viz/investments/table",
  "/viz/eligibility/table",
  "/location/<code>/investments/table",
  "/location/<code>/eligibility/table",
  "/viz/pledges-contributions/geomap",
  "/viz/pledges-contributions/table",
  "/grants",
  "/viz/grants",
  "/location/<code>/grants",
  "/results",
];

const locationsToNotShowExport = [
  "/viz/documents",
  "/location/<code>/documents",
];

export function ToolBoxPanelIconButtons() {
  const location = useLocation();
  const params = useParams<{ code?: string }>();
  const vizData = useGetAllVizData();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const selectedAggregation = useStoreState(
    (state) => state.ToolBoxPanelAggregateByState.value
  );
  const donorMapView = useStoreState(
    (state) => state.ToolBoxPanelDonorMapViewState.value
  );

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

  const menuitems = [
    <StyledMenuItem key="export-csv-menuitem">
      <CSVLink
        target="_blank"
        id="download-csv"
        {...exportCSV(
          location.pathname
            .replace("/location/", "/viz/")
            .replace("/grant/", "/viz/")
            .replace(`/${params.code}`, ""),
          get(
            vizData,
            location.pathname.replace(`/${params.code}`, "/<code>"),
            []
          ),
          {
            selectedAggregation,
            donorMapView,
            isDetail: params.code !== undefined,
          }
        )}
      >
        CSV
      </CSVLink>
    </StyledMenuItem>,
  ];

  if (
    locationsToNotShowImageExport.indexOf(
      location.pathname.replace(`/${params.code}`, "/<code>")
    ) === -1
  ) {
    menuitems.push(
      <StyledMenuItem
        key="export-png-menuitem"
        onClick={() => {
          exportView("export-view-div", "png");
          handleClose();
        }}
      >
        <div>PNG</div>
      </StyledMenuItem>
    );
    menuitems.push(
      <StyledMenuItem
        key="export-svg-menuitem"
        onClick={() => {
          exportView("export-view-div", "svg");
          handleClose();
        }}
      >
        <div>SVG</div>
      </StyledMenuItem>
    );
  }

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        border-bottom: 1px solid #dfe3e6;
      `}
    >
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
      <CopyToClipboard text={window.location.href} onCopy={handleCopy}>
        <IconButton>
          <LinkIcon />
        </IconButton>
      </CopyToClipboard>
      {locationsToNotShowExport.indexOf(
        location.pathname.replace(`/${params.code}`, "/<code>")
      ) === -1 && (
        <IconButton onClick={handleClick}>
          <CloudDownloadIcon />
        </IconButton>
      )}
      <StyledMenu
        keepMounted
        id="export-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {menuitems}
      </StyledMenu>
    </div>
  );
}
