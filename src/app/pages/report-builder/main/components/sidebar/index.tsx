import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AllAssetsIcon from "app/assets/vectors/ReportBuilderSidebarAllAssets.svg?react";
import TutorialsIcon from "app/assets/vectors/ReportBuilderSidebarTutorials.svg?react";
import AllReportsIcon from "app/assets/vectors/ReportBuilderSidebarAllReports.svg?react";
import TemplatesLibrariesIcon from "app/assets/vectors/ReportBuilderSidebarTemplatesLibraries.svg?react";

export const ReportBuilderSidebar: React.FC<{
  selectedItem: string | null;
  setSelectedItem: (item: string) => void;
}> = ({ selectedItem, setSelectedItem }) => {
  const handleItemClick = (item: string) => () => {
    if (item !== selectedItem) {
      setSelectedItem(item);
    }
  };

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon htmlColor={appColors.COMMON.SECONDARY_COLOR_1} />
          }
          sx={{
            minHeight: "30px",
            maxHeight: "30px",
            justifyContent: "flex-start",
            ".MuiAccordionSummary-content": {
              flexGrow: 0,
            },
          }}
        >
          <Typography
            variant="h6"
            fontSize="16px"
            fontWeight="700"
            padding="9px 12px"
          >
            Jane&apos;s Workspace
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              button: {
                fontSize: "16px",
                fontWeight: "400",
                padding: "12px 14px",
                borderRadius: "4px",
                lineHeight: "normal",
                textTransform: "none",
                justifyContent: "flex-start",
                ".MuiButton-startIcon": { ml: 0, mr: "10px" },
              },
            }}
          >
            <Button
              startIcon={<AllReportsIcon />}
              sx={{
                color: selectedItem === "All Reports" ? "#ffffff" : "#000000",
                background:
                  selectedItem === "All Reports" ? "#000000" : "transparent",
                svg: {
                  path: {
                    stroke:
                      selectedItem === "All Reports" ? "#ffffff" : "#000000",
                  },
                },
                "&:hover": {
                  color: "#ffffff",
                  background: "#000000",
                  svg: { path: { stroke: "#ffffff" } },
                },
              }}
              onClick={handleItemClick("All Reports")}
            >
              All Reports
            </Button>
            <Button
              startIcon={<AllAssetsIcon />}
              sx={{
                color: selectedItem === "All Assets" ? "#ffffff" : "#000000",
                background:
                  selectedItem === "All Assets" ? "#000000" : "transparent",
                svg: {
                  path: {
                    fill: selectedItem === "All Assets" ? "#ffffff" : "#000000",
                  },
                },
                "&:hover": {
                  color: "#ffffff",
                  background: "#000000",
                  svg: { path: { fill: "#ffffff" } },
                },
              }}
              onClick={handleItemClick("All Assets")}
            >
              All Assets
            </Button>
            <Button
              startIcon={<TutorialsIcon />}
              sx={{
                color: selectedItem === "Tutorials" ? "#ffffff" : "#000000",
                background:
                  selectedItem === "Tutorials" ? "#000000" : "transparent",
                svg: {
                  path: {
                    fill: selectedItem === "Tutorials" ? "#ffffff" : "#000000",
                  },
                },
                "&:hover": {
                  color: "#ffffff",
                  background: "#000000",
                  svg: { path: { fill: "#ffffff" } },
                },
              }}
              onClick={handleItemClick("Tutorials")}
            >
              Tutorials
            </Button>
            <Button
              startIcon={<TemplatesLibrariesIcon />}
              sx={{
                color:
                  selectedItem === "Templates and Libraries"
                    ? "#ffffff"
                    : "#000000",
                background:
                  selectedItem === "Templates and Libraries"
                    ? "#000000"
                    : "transparent",
                svg: {
                  path: {
                    fill:
                      selectedItem === "Templates and Libraries"
                        ? "#ffffff"
                        : "#000000",
                  },
                },
                "&:hover": {
                  color: "#ffffff",
                  background: "#000000",
                  svg: { path: { fill: "#ffffff" } },
                },
              }}
              onClick={handleItemClick("Templates and Libraries")}
            >
              Templates and Libraries
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
