import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import { uniqueId } from "app/utils/uniqueId";
import IconButton from "@mui/material/IconButton";
import { useStoreActions } from "app/state/store/hooks";
import UndoIcon from "app/assets/vectors/Undo.svg?react";
import RedoIcon from "app/assets/vectors/Redo.svg?react";
import NotesIcon from "app/assets/vectors/Notes.svg?react";
import FolderIcon from "app/assets/vectors/Folder.svg?react";
import SettingsIcon from "app/assets/vectors/Settings_ButtonIcon.svg?react";
import { RBReportItem } from "app/state/api/action-reducers/report-builder/sync";
import { ComponentOptions } from "app/pages/report-builder/builder/components/toolbar/data";
import { ReportBuilderPageReportSettings } from "app/pages/report-builder/builder/components/report-settings";

export const ReportBuilderPageToolbar: React.FC = () => {
  const [settingsClicked, setSettingsClicked] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElReportSettings, setAnchorElReportSettings] =
    React.useState<null | HTMLElement>(null);

  const addItem = useStoreActions(
    (actions) => actions.RBReportItemsState.addItem,
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReportSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElReportSettings(event.currentTarget);
    setSettingsClicked(true);
  };

  const handleReportSettingsClose = () => {
    setAnchorElReportSettings(null);
    setSettingsClicked(false);
  };

  const handleMenuItemClick = (value: string) => {
    let newItem: RBReportItem | null = null;
    switch (value) {
      case "text":
        newItem = { id: uniqueId(), type: "text" };
        break;
      case "chart":
        newItem = { id: uniqueId(), type: "chart" };
        break;
      case "table":
        newItem = { id: uniqueId(), type: "table" };
        break;
      case "image":
        newItem = { id: uniqueId(), type: "image" };
        break;
      case "section_divider":
        newItem = { id: uniqueId(), type: "section_divider" };
        break;
      case "kpi_box":
      case "grid":
        newItem = { id: uniqueId(), type: "grid" };
        break;
      case "column":
        newItem = { id: uniqueId(), type: "column" };
        break;
      default:
        break;
    }
    if (newItem) {
      addItem(newItem);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ zIndex: 1400, flexGrow: 1, top: 58, position: "sticky" }}>
      <Toolbar
        sx={{
          padding: "10px !important",
          justifyContent: "justify-content",
          borderBottom: "1px solid #cfd4da",
        }}
      >
        <Box
          sx={{
            gap: "10px",
            display: "flex",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<NotesIcon />}
            sx={{ padding: "5px 12px" }}
          >
            Notes
          </Button>
          <Button
            variant="outlined"
            startIcon={<FolderIcon />}
            sx={{ padding: "5px 12px" }}
          >
            Assets
          </Button>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            sx={{ padding: "5px 12px" }}
            onClick={handleReportSettingsClick}
          >
            Report Settings
          </Button>
          <ReportBuilderPageReportSettings
            clicked={settingsClicked}
            anchorEl={anchorElReportSettings}
            setClicked={handleReportSettingsClose}
          />
        </Box>
        <Box
          sx={{
            gap: "5px",
            display: "flex",
            flexDirection: "row",
            ".MuiIconButton-root": {
              borderRadius: "4px",
              padding: "10px 12px",
              border: "1px solid #dfe3e5",
              "&:hover": {
                background: "#f1f3f5",
                borderColor: "#000000",
              },
            },
          }}
        >
          <IconButton>
            <UndoIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              fontWeight: "400",
              color: "#ffffff",
              textTransform: "none",
              background: open ? "#000" : "#3154f4",
            }}
            onClick={handleClick}
          >
            Add a Component
          </Button>
          <Menu
            open={open}
            keepMounted
            disableScrollLock
            anchorEl={anchorEl}
            onClose={handleClose}
            transformOrigin={{
              vertical: -5,
              horizontal: "left",
            }}
            sx={{
              zIndex: 1400,
              "& .MuiPaper-root": {
                borderRadius: "4px",
                border: "1px solid #dfe3e5",
              },
              "& .MuiList-root": {
                padding: "0px",
              },
              "& .MuiMenuItem-root": {
                gap: "5px",
                display: "flex",
                padding: "12px 16px",
                alignItems: "center",
                borderBottom: "1px solid #c6c6c6",
                "&:last-of-type": { borderBottomStyle: "none" },
              },
            }}
          >
            {ComponentOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleMenuItemClick(option.value)}
              >
                {option.icon}
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Box>
  );
};
