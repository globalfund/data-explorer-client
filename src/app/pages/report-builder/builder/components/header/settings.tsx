import React from "react";
import { ReportBuilderPageReportSettings } from "app/pages/report-builder/builder/components/report-settings";
import SettingsIcon from "app/assets/vectors/Settings_ButtonIcon.svg?react";
import Button from "@mui/material/Button";

export default function Settings() {
  const [anchorElReportSettings, setAnchorElReportSettings] =
    React.useState<null | HTMLElement>(null);
  const [settingsClicked, setSettingsClicked] = React.useState(false);
  const handleReportSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElReportSettings(event.currentTarget);
    setSettingsClicked(true);
  };

  const handleReportSettingsClose = () => {
    setAnchorElReportSettings(null);
    setSettingsClicked(false);
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
