import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ShareIcon from "app/assets/vectors/Share.svg?react";
import PreviewIcon from "app/assets/vectors/Preview.svg?react";
import HeaderToolbarMiniLogo from "app/assets/vectors/HeaderToolbarMiniLogo.svg?react";

export const ReportBuilderPageHeader: React.FC = () => {
  const [nameValue, setNameValue] = React.useState("");

  return (
    <Box sx={{ zIndex: 1400, flexGrow: 1, top: 0, position: "sticky" }}>
      <AppBar position="static" sx={{ background: "#F8F8F8" }}>
        <Toolbar
          sx={{
            gap: "20px",
            padding: "10px !important",
            justifyContent: "flex-start",
          }}
        >
          <NavLink to="/" style={{ display: "flex" }}>
            <HeaderToolbarMiniLogo />
          </NavLink>
          <Button
            variant="outlined"
            component={NavLink}
            to="/report-builder"
            startIcon={
              <ArrowBack fontSize="small" sx={{ transform: "scale(0.8)" }} />
            }
            sx={{ padding: "5px 12px" }}
          >
            Back to Library
          </Button>
          <Box
            sx={{
              flexGrow: 1,
              input: {
                width: "100%",
                borderStyle: "none",
                padding: "11px 16px",
                background: "transparent",
                border: "2px solid transparent",
                borderBottom: "2px solid #cfd4da",
                "&:focus, &:active": {
                  borderStyle: "solid",
                  borderColor: "#3154f4",
                },
              },
            }}
          >
            <input
              type="text"
              value={nameValue}
              placeholder="Untitled Report"
              onChange={(e) => setNameValue(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              gap: "5px",
              display: "flex",
              flexDirection: "row",
              button: {
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
              <PreviewIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
