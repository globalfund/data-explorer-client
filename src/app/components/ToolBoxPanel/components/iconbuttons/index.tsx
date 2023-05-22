/* third-party */
import React from "react";
import get from "lodash/get";
import { CSVLink } from "react-csv";
import { appColors } from "app/theme";
import Snackbar from "@material-ui/core/Snackbar";
import { useCMSData } from "app/hooks/useCMSData";
import MenuItem from "@material-ui/core/MenuItem";
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
  "/viz/pledges-contributions/map",
  "/viz/budgets/map",
  "/viz/allocations/map",
  "/grants/grid",
  "/viz/grants",
  "/location/<code>/grants",
  "/results",
];

const locationsToNotShowExport = [
  "/documents",
  "/location/<code>/documents",
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
  "/viz/pledges-contributions/table",
  "/viz/allocations/table",
];

const StyledMenu = withStyles({
  paper: {
    borderRadius: 10,
    border: `1px solid ${appColors.TOOLBOX.MENU_EXPORT_BORDER_COLOR}`,
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

const StyledMenuItem = withStyles(() => ({
  root: {
    padding: 0,
    width: "100%",
    borderBottom: `1px solid ${appColors.TOOLBOX.SECTION_BORDER_BOTTOM_COLOR}`,
    "& a": {
      width: "100%",
      fontSize: "14px",
      color: appColors.TOOLBOX.MENU_EXPORT_TEXT_COLOR,
      padding: "6px 12px",
      textDecoration: "none",
    },
  },
}))(MenuItem);

interface ToolBoxPanelIconButtonsProps {
  getAllAvailableGrants?: () => Promise<any>;
}

export function ToolBoxPanelIconButtons(props: ToolBoxPanelIconButtonsProps) {
  const location = useLocation();
  const csvLinkRef = React.useRef<any>();
  const params = useParams<{ code?: string }>();
  const cmsData = useCMSData({ returnData: true });

  const vizData = useGetAllVizData();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [allAvailableGrants, setAllAvailableGrants] = React.useState([]);
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
  const resultsSelectedYear = useStoreState(
    (state) => state.ToolBoxPanelResultsYearState.value
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

  let menuitems = [];

  if (!props.getAllAvailableGrants) {
    menuitems = [
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
              resultsSelectedYear,
            }
          )}
          css={`
            font-size: 12px !important;
          `}
        >
          {get(cmsData, "componentsSidebar.csvIcon", "")}
        </CSVLink>
      </StyledMenuItem>,
    ];
  } else {
    menuitems = [
      <StyledMenuItem key="export-csv-menuitem">
        <CSVLink
          ref={csvLinkRef}
          target="_blank"
          id="download-csv"
          data={allAvailableGrants}
          filename="grants.csv"
          headers={[
            { label: "Title", key: "title" },
            { label: "Status", key: "status" },
            { label: "Component", key: "component" },
            { label: "Location", key: "geoLocation" },
            { label: "Rating", key: "rating" },
            { label: "Disbursement (USD)", key: "disbursed" },
            { label: "Committment (USD)", key: "committed" },
            { label: "Signed (USD)", key: "signed" },
          ]}
          css={`
            display: none;
          `}
        />
        <div
          onClick={() => {
            if (props.getAllAvailableGrants) {
              props.getAllAvailableGrants().then((grants: any) => {
                setAllAvailableGrants(grants);
                setTimeout(() => {
                  csvLinkRef.current.link.click();
                });
              });
            }
          }}
          css={`
            font-size: 12px !important;
            padding: 6px 12px !important;
          `}
        >
          {get(cmsData, "componentsSidebar.csvIcon", "")}
        </div>
      </StyledMenuItem>,
    ];
  }

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
            font-size: 12px !important;
            padding: 6px 12px !important;
          `}
        >
          {get(cmsData, "componentsSidebar.pngIcon", "")}
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
            font-size: 12px !important;
            padding: 6px 12px !important;
          `}
        >
          {get(cmsData, "componentsSidebar.svgIcon", "")}
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
        border-bottom: 1px solid
          ${appColors.TOOLBOX.SECTION_BORDER_BOTTOM_COLOR};

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
        disableScrollLock
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
