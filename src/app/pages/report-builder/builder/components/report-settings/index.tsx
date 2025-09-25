import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { DraggablePopper } from "app/components/draggable-popper";
import DuplicateIcon from "app/assets/vectors/Duplicate.svg?react";
import DeleteBackspace from "app/assets/vectors/DeleteBackspace.svg?react";

export const ReportBuilderPageReportSettings: React.FC<{
  clicked: boolean;
  anchorEl: null | HTMLElement;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ anchorEl, clicked, setClicked }) => {
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
              "> input[type='number']": {
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
            <input type="number" min={200} defaultValue={1074} />
          </Box>
          <Box>
            <InputLabel id="height-label">Height</InputLabel>
            <input type="number" min={200} defaultValue={1520} />
          </Box>
          <Box>
            <InputLabel id="padding-label">Padding</InputLabel>
            <input type="number" min={0} max={50} defaultValue={0} />
          </Box>
          <Box>
            <InputLabel id="margin-label">Margin</InputLabel>
            <input type="number" min={0} max={50} defaultValue={0} />
          </Box>
          <Box>
            <InputLabel id="stroke-label">Stroke</InputLabel>
            <input type="number" min={0} max={50} defaultValue={0} />
          </Box>
          <Box>
            <InputLabel id="stroke-color-label">Stroke Color</InputLabel>
            <input type="color" />
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
