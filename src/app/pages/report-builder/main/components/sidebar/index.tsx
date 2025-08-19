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
                padding: "7px 12px",
                borderRadius: "4px",
                lineHeight: "normal",
                textTransform: "none",
                justifyContent: "flex-start",
                ":hover": {
                  background: "#f1f3f5",
                },
              },
            }}
          >
            <Button
              startIcon={<AllReportsIcon />}
              sx={{
                background:
                  selectedItem === "All Reports" ? "#f1f3f5" : "transparent",
              }}
              onClick={handleItemClick("All Reports")}
            >
              All Reports
            </Button>
            <Button
              startIcon={<AllAssetsIcon />}
              sx={{
                background:
                  selectedItem === "All Assets" ? "#f1f3f5" : "transparent",
              }}
              onClick={handleItemClick("All Assets")}
            >
              All Assets
            </Button>
            <Button
              startIcon={<TutorialsIcon />}
              sx={{
                background:
                  selectedItem === "Tutorials" ? "#f1f3f5" : "transparent",
              }}
              onClick={handleItemClick("Tutorials")}
            >
              Tutorials
            </Button>
            <Button
              startIcon={<TemplatesLibrariesIcon />}
              sx={{
                background:
                  selectedItem === "Templates and Libraries"
                    ? "#f1f3f5"
                    : "transparent",
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
