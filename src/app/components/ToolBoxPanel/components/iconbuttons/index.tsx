/* third-party */
import React from "react";
import get from "lodash/get";
import { CSVLink } from "react-csv";
import Snackbar from "@material-ui/core/Snackbar";
import { useStoreState } from "app/state/store/hooks";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { useLocation, useParams } from "react-router-dom";
/* project */
import { exportCSV } from "app/utils/exportCSV";
import { LinkIcon } from "app/assets/icons/Link";
import { exportView } from "app/utils/exportView";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { StyledMenuItem } from "app/components/PageHeader";
import { useGetAllVizData } from "app/hooks/useGetAllVizData";
import { CloudDownloadIcon } from "app/assets/icons/CloudDownload";

const locationsToNotShowImageExport = [
  "/viz/disbursements/map",
  "/viz/signed/map",
  "/viz/commitment/map",
  "/location/<code>/disbursements/map",
  "/location/<code>/signed/map",
  "/location/<code>/commitment/map",
  "/partner/<code>/disbursements/map",
  "/partner/<code>/signed/map",
  "/partner/<code>/commitment/map",
  "/location/<code>/budgets/map",
  "/partner/<code>/budgets/map",
  "/viz/disbursements/table",
  "/viz/signed/table",
  "/viz/commitment/table",
  "/viz/eligibility/table",
  "/location/<code>/disbursements/table",
  "/location/<code>/signed/table",
  "/location/<code>/commitment/table",
  "/partner/<code>/disbursements/table",
  "/partner/<code>/signed/table",
  "/partner/<code>/commitment/table",
  "/location/<code>/eligibility/table",
  "/grant/<code>/disbursements/table",
  "/grant/<code>/signed/table",
  "/grant/<code>/commitment/table",
  "/viz/pledges-contributions/map",
  "/viz/pledges-contributions/table",
  "/viz/budgets/map",
  "/viz/allocations/map",
  "/grants",
  "/viz/grants",
  "/location/<code>/grants",
  "/results",
  "/commitment/map",
  "/disbursements/map",
  "/commitment/table",
  "/disbursements/table",
  "/budgets/map",
];

const locationsToNotShowExport = [
  "/viz/documents",
  "/location/<code>/documents",
];

const StyledMenu = withStyles({
  paper: {
    borderRadius: 10,
    border: "1px solid #d3d4d5",
  },
  list: {
    padding: 0,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    autoFocus={false}
    {...props}
  />
));

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
  const investmentsMapView = useStoreState(
    (state) => state.ToolBoxPanelInvestmentsMapViewState.value
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
            investmentsMapView,
            isDetail: params.code !== undefined,
          }
        )}
        css={`
          font-size: 12px !important;
        `}
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
          exportView(
            "export-view-div",
            "png",
            location.pathname
              .replace("/location/", "/viz/")
              .replace("/grant/", "/viz/")
              .replace(`/${params.code}`, ""),
            {
              selectedAggregation,
              donorMapView,
              investmentsMapView,
              isDetail: params.code !== undefined,
            }
          );
          handleClose();
        }}
      >
        <div
          css={`
            padding: 6px 12px !important;
          `}
        >
          PNG
        </div>
      </StyledMenuItem>
    );
    menuitems.push(
      <StyledMenuItem
        key="export-svg-menuitem"
        onClick={() => {
          exportView(
            "export-view-div",
            "svg",
            location.pathname
              .replace("/location/", "/viz/")
              .replace("/grant/", "/viz/")
              .replace(`/${params.code}`, ""),
            {
              selectedAggregation,
              donorMapView,
              investmentsMapView,
              isDetail: params.code !== undefined,
            }
          );
          handleClose();
        }}
      >
        <div
          css={`
            padding: 6px 12px !important;
          `}
        >
          SVG
        </div>
      </StyledMenuItem>
    );
  }

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        padding: 0 25px;
        flex-direction: row;
        justify-content: flex-end;
        border-bottom: 1px solid #dfe3e6;

        @media (max-width: 767px) {
          padding: 0 16px;
        }
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
