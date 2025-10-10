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
  const [heightError, setHeightError] = React.useState("");

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      reportSettingsActions.setWidth("");
      return;
    }
    if (!/^\d+$/.test(value)) return;
    const nValue = parseInt(value, 10);
    if (!isNaN(nValue) && nValue >= 0) {
      reportSettingsActions.setWidth(nValue.toString());
    }
  };

  const handleWidthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      reportSettingsActions.setWidth("300");
      setWidthError("Minimum report width is 300px");
      setTimeout(() => {
        setWidthError("");
      }, 3000);
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      reportSettingsActions.setHeight("");
      return;
    }
    if (!/^\d+$/.test(value)) return;
    const nValue = parseInt(value, 10);
    if (!isNaN(nValue) && nValue >= 0) {
      reportSettingsActions.setHeight(nValue.toString());
    }
  };

  const handleHeightBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      reportSettingsActions.setHeight("300");
      setHeightError("Minimum report height is 300px");
      setTimeout(() => {
        setHeightError("");
      }, 3000);
    }
  };

  const handleHPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      reportSettingsActions.setHPadding("");
      return;
    }
    if (!/^\d+$/.test(value)) return;
    const nValue = parseInt(value, 10);
    if (!isNaN(nValue) && nValue >= 0) {
      reportSettingsActions.setHPadding(nValue.toString());
    }
  };

  const handleHPaddingBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      reportSettingsActions.setHPadding("0");
    }
  };

  const handleVPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      reportSettingsActions.setVPadding("");
      return;
    }
    if (!/^\d+$/.test(value)) return;
    const nValue = parseInt(value, 10);
    if (!isNaN(nValue) && nValue >= 0) {
      reportSettingsActions.setVPadding(nValue.toString());
    }
  };

  const handleVPaddingBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      reportSettingsActions.setVPadding("0");
    }
  };

  const handleStrokeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      reportSettingsActions.setStroke("");
      return;
    }
    if (!/^\d+$/.test(value)) return;
    const nValue = parseInt(value, 10);
    if (!isNaN(nValue) && nValue >= 0) {
      reportSettingsActions.setStroke(nValue.toString());
    }
  };

  const handleStrokeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      reportSettingsActions.setStroke("0");
    }
  };

  const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reportSettingsActions.setStrokeColor(e.target.value);
  };

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
            <InputLabel id="width-label" htmlFor="width-input">
              Width
            </InputLabel>
            <input
              type="text"
              id="width-input"
              onBlur={handleWidthBlur}
              onChange={handleWidthChange}
              value={reportSettings.width}
            />
            {widthError && <FormHelperText error>{widthError}</FormHelperText>}
          </Box>
          <Box>
            <InputLabel id="height-label" htmlFor="height-input">
              Height
            </InputLabel>
            <input
              type="text"
              id="height-input"
              onBlur={handleHeightBlur}
              onChange={handleHeightChange}
              value={reportSettings.height}
            />
            {heightError && (
              <FormHelperText error>{heightError}</FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel id="h-padding-label" htmlFor="h-padding-input">
              Horizontal Padding
            </InputLabel>
            <input
              type="text"
              id="h-padding-input"
              onBlur={handleHPaddingBlur}
              onChange={handleHPaddingChange}
              value={reportSettings.hPadding}
            />
          </Box>
          <Box>
            <InputLabel id="v-padding-label" htmlFor="v-padding-input">
              Vertical Padding
            </InputLabel>
            <input
              type="text"
              id="v-padding-input"
              onBlur={handleVPaddingBlur}
              onChange={handleVPaddingChange}
              value={reportSettings.vPadding}
            />
          </Box>
          <Box>
            <InputLabel id="stroke-label" htmlFor="stroke-input">
              Stroke
            </InputLabel>
            <input
              type="text"
              id="stroke-input"
              onBlur={handleStrokeBlur}
              onChange={handleStrokeChange}
              value={reportSettings.stroke}
            />
          </Box>
          <Box>
            <InputLabel id="stroke-color-label" htmlFor="stroke-color-input">
              Stroke Color
            </InputLabel>
            <input
              type="color"
              id="stroke-color-input"
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
