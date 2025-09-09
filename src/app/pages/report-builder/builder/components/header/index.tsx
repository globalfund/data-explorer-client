import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "app/assets/vectors/Share2.svg?react";
import PreviewIcon from "app/assets/vectors/Preview.svg?react";
import LibraryIcon from "app/assets/vectors/Library.svg?react";
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
          <Box
            sx={{
              flexGrow: 1,
              input: {
                width: "100%",
                fontSize: "20px",
                borderStyle: "none",
                padding: "10px 16px",
                background: "transparent",
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
            <Button
              variant="outlined"
              component={NavLink}
              to="/report-builder"
              startIcon={<LibraryIcon />}
              sx={{ padding: "5px 14px" }}
            >
              Library
            </Button>
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
