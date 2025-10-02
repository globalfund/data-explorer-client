import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CopyIcon from "app/assets/vectors/Copy.svg?react";
import EmailIcon from "app/assets/vectors/Email.svg?react";
import PNGIcon from "app/assets/vectors/PngIcon.svg?react";
import SVGIcon from "app/assets/vectors/SvgIcon.svg?react";
import PDFIcon from "app/assets/vectors/PdfIcon.svg?react";
import NotesIcon from "app/assets/vectors/Notes.svg?react";
import ShareIcon from "app/assets/vectors/Share2.svg?react";
import FolderIcon from "app/assets/vectors/Folder.svg?react";
import PreviewIcon from "app/assets/vectors/Preview.svg?react";
import LibraryIcon from "app/assets/vectors/Library.svg?react";
import DownloadIcon from "app/assets/vectors/Download.svg?react";
import ChevronRight from "@mui/icons-material/ChevronRightOutlined";
import SettingsIcon from "app/assets/vectors/Settings_ButtonIcon.svg?react";
import HeaderToolbarMiniLogo from "app/assets/vectors/HeaderToolbarMiniLogo.svg?react";
import { ReportBuilderPageNotes } from "app/pages/report-builder/builder/components/notes";
import { ReportBuilderPageReportSettings } from "app/pages/report-builder/builder/components/report-settings";

const menuSx = {
  zIndex: 1400,
  "& .MuiPaper-root": {
    borderRadius: "4px",
    background: "#f8f9fa",
    border: "1px solid #dfe3e5",
  },
  "& .MuiList-root": {
    padding: "0px",
  },
  "& .MuiMenuItem-root": {
    gap: "10px",
    display: "flex",
    fontSize: "14px",
    padding: "11px 16px",
    alignItems: "center",
    borderBottom: "1px solid #c6c6c6",
    "&:last-of-type": { borderBottomStyle: "none" },
  },
};

export const ReportBuilderPageHeader: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [notesClicked, setNotesClicked] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [settingsClicked, setSettingsClicked] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const [anchorElReportSettings, setAnchorElReportSettings] =
    React.useState<null | HTMLElement>(null);
  const [anchorElNotes, setAnchorElNotes] = React.useState<null | HTMLElement>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleCopyUrlLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setSnackbarMessage("Link Copied!");
    setSnackbarOpen(true);
  };

  const handleSendViaEmail = () => {
    window.open(`mailto:?body=${window.location.href}`, "_blank");
    setSnackbarMessage("Directed to Email!");
    setSnackbarOpen(true);
  };

  const handleDownloadShareableFile = (type: "png" | "svg" | "pdf") => () => {
    setSnackbarMessage(`${type.toUpperCase()} downloaded!`);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    e: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    setTimeout(() => {
      setSnackbarMessage("");
    }, 200);
  };

  const handleNotesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotes(event.currentTarget);
    setNotesClicked(true);
  };

  const handleNotesClose = () => {
    setAnchorElNotes(null);
    setNotesClicked(false);
  };

  const handleReportSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElReportSettings(event.currentTarget);
    setSettingsClicked(true);
  };

  const handleReportSettingsClose = () => {
    setAnchorElReportSettings(null);
    setSettingsClicked(false);
  };

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  return (
    <React.Fragment>
      <Box sx={{ zIndex: 1400, flexGrow: 1, top: 0, position: "sticky" }}>
        <AppBar position="static" sx={{ background: "#f8f8f8" }}>
          <Toolbar
            sx={{
              gap: "20px",
              height: "70px",
              padding: "10px 20px !important",
              justifyContent: "space-between",
              ".MuiButtonBase-root": {
                fontSize: "16px",
                padding: "6px 14px",
                borderRadius: "4px",
                border: "1px solid #dfe3e5",
                "&:hover": {
                  background: "#f1f3f5",
                  borderColor: "#70777e",
                },
              },
              ".MuiIconButton-root": {
                padding: "6px 12px",
              },
            }}
          >
            <Box
              sx={{
                gap: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <NavLink to="/" style={{ display: "flex", marginRight: "10px" }}>
                <HeaderToolbarMiniLogo />
              </NavLink>
              <Button
                variant="outlined"
                startIcon={<NotesIcon />}
                onClick={handleNotesClick}
                sx={{
                  ...(anchorElNotes && {
                    bgcolor: "#f1f3f5",
                    borderColor: "#000000",
                  }),
                }}
              >
                Notes
              </Button>
              <Button variant="outlined" startIcon={<FolderIcon />}>
                Assets
              </Button>
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={handleReportSettingsClick}
                sx={{
                  ...(anchorElReportSettings && {
                    bgcolor: "#f1f3f5",
                    borderColor: "#000000",
                  }),
                }}
              >
                Report Settings
              </Button>
              <ReportBuilderPageReportSettings
                clicked={settingsClicked}
                anchorEl={anchorElReportSettings}
                setClicked={handleReportSettingsClose}
              />
              <ReportBuilderPageNotes
                clicked={notesClicked}
                anchorEl={anchorElNotes}
                setClicked={handleNotesClose}
              />
            </Box>
            <Box
              sx={{
                gap: "10px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <IconButton>
                <PreviewIcon />
              </IconButton>
              <Tooltip title="Export" enterDelay={500} leaveDelay={200}>
                <IconButton
                  onClick={handleClick}
                  sx={
                    open
                      ? {
                          bgcolor: "#f1f3f5",
                          borderColor: "#70777e !important",
                        }
                      : {}
                  }
                >
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="outlined"
                component={NavLink}
                to="/report-builder"
                startIcon={<LibraryIcon />}
              >
                Library
              </Button>
              <Menu
                open={open}
                keepMounted
                disableScrollLock
                anchorEl={anchorEl}
                onClose={handleClose}
                transformOrigin={{
                  vertical: -5,
                  horizontal: "right",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                sx={menuSx}
              >
                <MenuItem onClick={handleCopyUrlLink}>
                  <CopyIcon />
                  Copy URL Link
                </MenuItem>
                <MenuItem onClick={handleSendViaEmail}>
                  <EmailIcon />
                  Send via Email
                </MenuItem>
                <MenuItem onClick={handleClick2}>
                  <DownloadIcon />
                  Download Shareable File
                  <ChevronRight />
                </MenuItem>
              </Menu>
              <Menu
                keepMounted
                open={open2}
                disableScrollLock
                anchorEl={anchorEl2}
                onClose={handleClose2}
                transformOrigin={{
                  vertical: 5,
                  horizontal: "right",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                sx={menuSx}
              >
                <MenuItem onClick={handleDownloadShareableFile("png")}>
                  <PNGIcon />
                  PNG
                </MenuItem>
                <MenuItem onClick={handleDownloadShareableFile("svg")}>
                  <SVGIcon />
                  SVG
                </MenuItem>
                <MenuItem onClick={handleDownloadShareableFile("pdf")}>
                  <PDFIcon />
                  PDF
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiPaper-root": {
            padding: "0px",
            fontSize: "14px",
            bgcolor: "#000000",
            minWidth: "fit-content",
          },
          "& .MuiSnackbarContent-message": {
            padding: "10px",
          },
        }}
      />
    </React.Fragment>
  );
};
