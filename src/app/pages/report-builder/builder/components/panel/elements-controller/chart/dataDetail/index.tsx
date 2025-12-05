import { Box, Button, IconButton, Typography } from "@mui/material";
import MinimizeIcon from "app/assets/vectors/Minimize.svg?react";
import MaximizeIcon from "app/assets/vectors/Maximize.svg?react";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

export default function DataDetail() {
  const handleExpandToggle = () => {};
  const isExpanded = true;
  return (
    <Box sx={{ padding: "8px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "8px",
          borderBottom: "0.5px solid #CFD4DA",
        }}
      >
        <Typography fontSize={"16px"} fontWeight={700}>
          Data Details
        </Typography>
        <Box
          sx={{
            ".MuiIconButton-root": {
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              border: "1px solid #CFD4DA",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <Button
            sx={{
              backgroundColor: "#3154F4",
              color: "#FFFFFF",
              fontSize: "14px",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "35px",
              width: "134px",
              borderRadius: "4px",
            }}
          >
            Use this Dataset
          </Button>
          <IconButton onClick={handleExpandToggle}>
            {isExpanded ? <MinimizeIcon /> : <MaximizeIcon />}
          </IconButton>
          <IconButton onClick={handleExpandToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
