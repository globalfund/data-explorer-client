import { Box, TextField, Typography } from "@mui/material";
import { ColorPicker } from "app/components/color-picker/example";
import { ColorService } from "app/components/color-picker/utils/color";
import React from "react";

export default function StyleTab() {
  return (
    <Box sx={{ padding: "8px" }}>
      <Typography fontWeight={700}>Border & Fill</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "8px",
          ".MuiInputBase-root": {
            "&:before": {
              borderBottom: "none",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
            >
              Stroke
            </Typography>
            <Box
              sx={{
                width: "138px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                border: "0.5px solid #98A1AA",
                backgroundColor: "#FFF",
                borderRadius: "4px",
                padding: "0 16px",
              }}
            >
              <TextField variant="standard" value={"0px"} />
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
            >
              Stroke Color
            </Typography>
            <ColorPicker
              color={null}
              onChange={() => {}}
              disabled={false}
              onResetColor={() => {}}
              onChangeComplete={() => {}}
              triggerWidth="138px"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "8px",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
            >
              Corner Radius
            </Typography>
            <Box
              sx={{
                width: "138px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                border: "0.5px solid #98A1AA",
                backgroundColor: "#FFF",
                borderRadius: "4px",
                padding: "0 16px",
              }}
            >
              <TextField variant="standard" value={"0px"} />
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{ color: "#373D43", fontSize: "14px", marginBottom: "8px" }}
            >
              Background Color
            </Typography>
            <ColorPicker
              color={ColorService.convert("hex", "#000000")}
              onChange={() => {}}
              disabled={false}
              onResetColor={() => {}}
              onChangeComplete={() => {}}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
