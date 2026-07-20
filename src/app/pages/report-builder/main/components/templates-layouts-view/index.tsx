import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import { useCMSData } from "app/hooks/useCMSData";
import PlusIcon from "app/assets/vectors/report-builder-responsive/plus.svg?react";
import LayoutsIcon from "app/assets/vectors/report-builder-responsive/layout-tab.svg?react";
import TemplatesIcon from "app/assets/vectors/report-builder-responsive/template-tab.svg?react";
import {
  ReportBuilderLibraryLayouts,
  ReportBuilderLibraryTemplates,
} from "app/pages/report-builder/main/data";
import { getCMSDataField } from "app/utils/getCMSDataField";

export const TemplatesLayoutsView: React.FC<{
  selectedView: "cards" | "list";
  setNewReportModalOpen: (open: boolean) => void;
}> = ({ selectedView, setNewReportModalOpen }) => {
  const cmsData = useCMSData({ returnData: true });
  const [selectedSubView, setSelectedSubView] = React.useState<
    "templates" | "layouts"
  >("templates");

  const data = React.useMemo(() => {
    return selectedSubView === "templates"
      ? ReportBuilderLibraryTemplates
      : ReportBuilderLibraryLayouts;
  }, [selectedSubView]);

  const view = React.useMemo(() => {
    if (selectedView === "cards") {
      return (
        <Grid
          container
          spacing={2}
          direction="row"
          sx={{
            alignItems: "stretch",
          }}
        >
          {data.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  padding: "14px",
                  borderRadius: "4px",
                  border: "1px solid #cfd4da",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "180px",
                      display: "flex",
                      justifyContent: "center",
                      img: {
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      },
                    }}
                  >
                    <img src={item.imagePath} alt={item.title} />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      margin: "10px 0 5px 0",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontSize="16px"
                      lineHeight="normal"
                    >
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" mb="5px">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" mb="10px">
                    {getCMSDataField(
                      cmsData,
                      "componentsRBTemplatesLayoutsView.byOwnerPrefix",
                      "By",
                    )}{" "}
                    {item.owner}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    gap: "10px",
                    display: "flex",
                    "> button": {
                      flex: 1,
                      height: "36px",
                      fontWeight: 400,
                      textTransform: "none",
                    },
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<PlusIcon width={16} height={16} />}
                    onClick={() => setNewReportModalOpen(true)}
                  >
                    Use{" "}
                    {selectedSubView === "templates" ? "Template" : "Layout"}
                  </Button>
                  <Button variant="outlined">Preview</Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      );
    }
    return (
      <Table
        id="reports-table"
        data={data.map((item) => ({
          id: item.id,
          name: item.title,
          description: item.description,
          type: selectedSubView === "templates" ? "Template" : "Layout",
        }))}
        columns={[
          {
            title: "",
            field: "rowNumber",
            width: 34,
            headerSort: false,
            formatter: (cell) => String(cell.getRow().getPosition()),
          },
          {
            title: getCMSDataField(
              cmsData,
              "componentsRBTemplatesLayoutsView.titleColumn",
              "Name",
            ),
            field: "name",
            width: "30%",
            formatter: (cell) =>
              `<u style="color:#3154f4">${cell.getValue()}</u>`,
          },
          {
            title: getCMSDataField(
              cmsData,
              "componentsRBTemplatesLayoutsView.descriptionColumn",
              "Description",
            ),
            field: "description",
            width: "45%",
          },
          {
            title: "Type",
            field: "type",
            width: "15%",
          },
          {
            title: "Actions",
            field: "actions",
            width: "10%",
            formatter: () => "⋮",
          },
        ]}
      />
    );
  }, [selectedView, data, selectedSubView, cmsData]);

  return (
    <React.Fragment>
      <Box
        sx={{
          marginBottom: "16px",
          display: "flex",
          button: {
            minWidth: "128px",
            borderRadius: 0,
            fontSize: "16px",
            padding: "8px 12px",
            textTransform: "none",
          },
          "@media (max-width: 600px)": {
            button: {
              minWidth: "unset",
              flex: 1,
            },
          },
        }}
      >
        <Button
          startIcon={<TemplatesIcon width={16} height={16} />}
          onClick={() => setSelectedSubView("templates")}
          sx={{
            fontWeight: 400,
            background: "transparent",
            borderBottom: `2px solid ${selectedSubView === "templates" ? "#0f62fe" : "#cfd4da"}`,
          }}
        >
          {getCMSDataField(
            cmsData,
            "componentsRBTemplatesLayoutsView.templatesTab",
            "Templates",
          )}
        </Button>
        <Button
          startIcon={<LayoutsIcon width={16} height={16} />}
          onClick={() => setSelectedSubView("layouts")}
          sx={{
            fontWeight: 400,
            background: "transparent",
            borderBottom: `2px solid ${selectedSubView === "layouts" ? "#0f62fe" : "#cfd4da"}`,
          }}
        >
          {getCMSDataField(
            cmsData,
            "componentsRBTemplatesLayoutsView.layoutsTab",
            "Layouts",
          )}
        </Button>
      </Box>
      {view}
    </React.Fragment>
  );
};
