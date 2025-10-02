import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { DraggablePopper } from "app/components/draggable-popper";
import DuplicateIcon from "app/assets/vectors/Duplicate.svg?react";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import DeleteBackspace from "app/assets/vectors/DeleteBackspace.svg?react";

export const ReportBuilderPageReportSettings: React.FC<{
  clicked: boolean;
  anchorEl: null | HTMLElement;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ anchorEl, clicked, setClicked }) => {
  const reportSettings = useStoreState((state) => state.RBReportSettingsState);
  const reportSettingsActions = useStoreActions(
    (actions) => actions.RBReportSettingsState,
  );

  const [widthError, setWidthError] = React.useState("");
  const [width, setWidth] = React.useState(reportSettings.width.toString());
  const [height, setHeight] = React.useState(reportSettings.height.toString());
  const [heightError, setHeightError] = React.useState("");
  const [hPadding, setHPadding] = React.useState(
    reportSettings.hPadding.toString(),
  );
  const [hPaddingError, setHPaddingError] = React.useState("");
  const [vPadding, setVPadding] = React.useState(
    reportSettings.vPadding.toString(),
  );
  const [vPaddingError, setVPaddingError] = React.useState("");

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };

  const handleWidthBlur = () => {
    const value = parseInt(width.toString(), 10);
    if (value && value >= 200) {
      reportSettingsActions.setWidth(value);
      setWidthError("");
    } else {
      setWidthError("Width must be at least 200px");
      setTimeout(() => {
        setWidthError("");
      }, 4000);
      setWidth(reportSettings.width.toString());
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleHeightBlur = () => {
    const value = parseInt(height.toString(), 10);
    if (value && value >= 200) {
      reportSettingsActions.setHeight(value);
      setHeightError("");
    } else {
      setHeightError("Height must be at least 200px");
      setTimeout(() => {
        setHeightError("");
      }, 4000);
      setHeight(reportSettings.height.toString());
    }
  };

  const handleHPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHPadding(e.target.value);
  };

  const handleHPaddingBlur = () => {
    const value = parseInt(hPadding.toString(), 10);
    if (value >= 0 && value <= 50) {
      reportSettingsActions.setHPadding(value);
    } else {
      setHPaddingError("Horizontal padding must be between 0 and 50px");
      setTimeout(() => {
        setHPaddingError("");
      }, 4000);
      setHPadding(reportSettings.hPadding.toString());
    }
  };

  const handleVPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVPadding(e.target.value);
  };

  const handleVPaddingBlur = () => {
    const value = parseInt(vPadding.toString(), 10);
    if (value >= 0 && value <= 50) {
      reportSettingsActions.setVPadding(value);
    } else {
      setVPaddingError("Vertical padding must be between 0 and 50px");
      setTimeout(() => {
        setVPaddingError("");
      }, 4000);
      setVPadding(reportSettings.vPadding.toString());
    }
  };

  const handleStrokeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 50) {
      reportSettingsActions.setStroke(value);
    }
  };

  const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reportSettingsActions.setStrokeColor(e.target.value);
  };

  React.useLayoutEffect(() => {
    const canvas = document.getElementById("report-builder-canvas");
    if (canvas) {
      const styles = getComputedStyle(canvas);
      const width = parseInt(styles.width);
      const height = parseInt(styles.height);
      reportSettingsActions.setWidth(width);
      reportSettingsActions.setHeight(height);
    }
  }, [clicked]);

  return (
    <DraggablePopper
      id="report-builder-report-settings"
      width={360}
      open={clicked}
      anchorEl={anchorEl}
      setOpen={setClicked}
      title="Report Settings"
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          "& .MuiMenuItem-root": {
            gap: "10px",
            padding: "6px",
          },
        }}
      >
        <Box
          sx={{
            gap: "8px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            "> div": {
              gap: "6px",
              display: "flex",
              flexDirection: "column",
              width: "calc(50% - 5px)",
              "> label": {
                color: "#525252",
              },
              "> input[type='color']": {
                margin: 0,
                width: "100%",
                height: "40px",
                padding: "6px 0",
                cursor: "pointer",
                borderRadius: "4px",
                border: "1px solid #868e96",
              },
              "> input[type='number'], > input[type='text']": {
                width: "100%",
                height: "40px",
                fontSize: "14px",
                borderStyle: "none",
                borderRadius: "4px",
                padding: "0px 16px",
                background: "#f1f3f5",
                appearance: "none",
                MozAppearance: "none",
                WebkitAppearance: "none",
                borderBottom: "1px solid #868e96",
                "::-webkit-inner-spin-button": {
                  margin: 0,
                  appearance: "none",
                  WebkitAppearance: "none",
                },
                "::-webkit-outer-spin-button": {
                  margin: 0,
                  appearance: "none",
                  WebkitAppearance: "none",
                },
              },
            },
          }}
        >
          <Box>
            <InputLabel id="width-label">Width</InputLabel>
            <input
              type="text"
              value={width}
              onBlur={handleWidthBlur}
              onChange={handleWidthChange}
            />
            {widthError && <FormHelperText error>{widthError}</FormHelperText>}
          </Box>
          <Box>
            <InputLabel id="height-label">Height</InputLabel>
            <input
              type="text"
              value={height}
              onBlur={handleHeightBlur}
              onChange={handleHeightChange}
            />
            {heightError && (
              <FormHelperText error>{heightError}</FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel id="h-padding-label">Horizontal Padding</InputLabel>
            <input
              type="text"
              value={hPadding}
              onBlur={handleHPaddingBlur}
              onChange={handleHPaddingChange}
            />
            {hPaddingError && (
              <FormHelperText error>{hPaddingError}</FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel id="v-padding-label">Vertical Padding</InputLabel>
            <input
              type="text"
              value={vPadding}
              onBlur={handleVPaddingBlur}
              onChange={handleVPaddingChange}
            />
            {vPaddingError && (
              <FormHelperText error>{vPaddingError}</FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel id="stroke-label">Stroke</InputLabel>
            <input
              type="number"
              min={0}
              max={50}
              value={reportSettings.stroke}
              onChange={handleStrokeChange}
            />
          </Box>
          <Box>
            <InputLabel id="stroke-color-label">Stroke Color</InputLabel>
            <input
              type="color"
              value={reportSettings.strokeColor}
              onChange={handleStrokeColorChange}
            />
          </Box>
        </Box>
        <Divider sx={{ mt: "8px", mb: "4px" }} />
        <MenuItem>
          <DuplicateIcon />
          Duplicate report
        </MenuItem>
        <Divider sx={{ m: "4px 0 !important" }} />
        <MenuItem>
          <DeleteBackspace />
          Delete report
        </MenuItem>
      </Box>
    </DraggablePopper>
  );
};
