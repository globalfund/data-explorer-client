import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const PageLoader = () => {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        zIndex: 100000,
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box
        sx={{
          margin: 0,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          height: "calc(100vh - 45px)",
        }}
      >
        <Box
          sx={{
            width: "55px",
            height: "55px",
            display: "flex",
            borderRadius: "5px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            background: colors.primary.white,
          }}
        >
          <CircularProgress disableShrink />
        </Box>
      </Box>
    </Box>
  );
};
