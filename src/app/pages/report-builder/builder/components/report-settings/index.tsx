import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DownloadIcon from "app/assets/vectors/Download.svg?react";
import { DraggablePopper } from "app/components/draggable-popper";
import DuplicateIcon from "app/assets/vectors/Duplicate.svg?react";

export const ReportBuilderPageReportSettings: React.FC<{
  clicked: boolean;
  anchorEl: null | HTMLElement;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ anchorEl, clicked, setClicked }) => {
  const [pageLayout, setPageLayout] = React.useState("A4");
  const [orientation, setOrientation] = React.useState("Portrait");

  const handleChangePageLayout = (event: SelectChangeEvent) => {
    setPageLayout(event.target.value);
  };

  const handleChangeOrientation = (event: SelectChangeEvent) => {
    setOrientation(event.target.value);
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
          gap: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          "& .MuiMenuItem-root": {
            gap: "10px",
            padding: "6px",
          },
        }}
      >
        <Typography fontSize="14px" fontWeight="700">
          Layout and Style
        </Typography>
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
            },
          }}
        >
          <Box>
            <InputLabel id="page-layout-label">Page Layout</InputLabel>
            <Select
              variant="filled"
              value={pageLayout}
              labelId="page-layout-label"
              onChange={handleChangePageLayout}
              sx={{
                width: "100%",
                ".MuiSelect-select": {
                  paddingTop: "11px",
                  paddingBottom: "11px",
                },
              }}
            >
              <MenuItem value="A4">A4</MenuItem>
              <MenuItem value="A3">A3</MenuItem>
            </Select>
          </Box>
          <Box>
            <InputLabel id="orientation-label">Orientation</InputLabel>
            <Select
              variant="filled"
              value={orientation}
              labelId="orientation-label"
              onChange={handleChangeOrientation}
              sx={{
                width: "100%",
                ".MuiSelect-select": {
                  paddingTop: "11px",
                  paddingBottom: "11px",
                },
              }}
            >
              <MenuItem value="Portrait">Portrait</MenuItem>
              <MenuItem value="Landscape">Landscape</MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              "> input": {
                margin: 0,
                width: "100%",
                height: "40px",
                padding: "6px 0",
                cursor: "pointer",
                borderRadius: "4px",
                border: "1px solid #868e96",
              },
            }}
          >
            <InputLabel id="background-color-label">
              Background Color
            </InputLabel>
            <input type="color" />
          </Box>
          <Box>
            <InputLabel id="spacing-label">Spacing</InputLabel>
            <Box
              sx={{
                gap: "5px",
                display: "flex",
                flexDirection: "row",
                "> input": {
                  width: "100%",
                  height: "40px",
                  color: "#98a1aa",
                  borderStyle: "none",
                  borderRadius: "4px",
                  textAlign: "center",
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
              }}
            >
              <input type="number" min={0} defaultValue={40} />
              <input type="number" min={0} defaultValue={40} />
              <input type="number" min={0} defaultValue={40} />
              <input type="number" min={0} defaultValue={40} />
            </Box>
          </Box>
        </Box>
        <Divider />
        <Typography fontSize="14px" fontWeight="700">
          File
        </Typography>
        <MenuItem>
          <DownloadIcon /> Download Report
        </MenuItem>
        <MenuItem>
          <DuplicateIcon />
          Duplicate Report
        </MenuItem>
      </Box>
    </DraggablePopper>
  );
};
