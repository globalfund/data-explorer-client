import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { RTEToolbar } from "app/components/rich-text-editor";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { Empty } from "app/pages/report-builder/builder/components/empty";
import { RBReportItem } from "app/state/api/action-reducers/report-builder/sync";
import { ReportBuilderPageText } from "app/pages/report-builder/builder/components/text";
import { ReportBuilderPageChart } from "app/pages/report-builder/builder/components/chart";
import { ReportBuilderPageTable } from "app/pages/report-builder/builder/components/table";

export const ReportBuilderPage: React.FC = () => {
  const items = useStoreState((state) => state.RBReportItemsState.items);
  const activeRTE = useStoreState((state) => state.RBReportRTEState.activeRTE);
  const setActiveRTE = useStoreActions(
    (actions) => actions.RBReportRTEState.setActiveRTE,
  );

  const getItemByType = (item: RBReportItem) => {
    switch (item.type) {
      case "text":
        return <ReportBuilderPageText id={item.id} setEditor={setActiveRTE} />;
      case "chart":
        return <ReportBuilderPageChart id={item.id} />;
      case "table":
        return <ReportBuilderPageTable id={item.id} />;
      default:
        return <React.Fragment key={item.id} />;
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ width: "100%", height: "100%", position: "relative" }}
    >
      {activeRTE && (
        <Box
          sx={{
            top: -10,
            left: 24,
            position: "absolute",
            width: "calc(100% - 48px)",
          }}
        >
          <RTEToolbar editor={activeRTE} />
        </Box>
      )}
      <Box
        sx={{
          gap: "10px",
          width: "100%",
          display: "flex",
          padding: "50px",
          minHeight: "1420px",
          bgcolor: "#ffffff",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          boxShadow: "0 0 10px 0 rgba(152, 161, 170, 0.60)",
          ".top-right-actions": {
            top: 4,
            right: 4,
            display: "none",
            position: "absolute",
            ".MuiIconButton-root": {
              bgcolor: "#fff",
              borderRadius: "4px",
              border: "1px solid #cfd4da",
              "&:hover": {
                bgcolor: "#f8f8f8",
                borderColor: "#000000",
              },
            },
          },
        }}
      >
        {items.length === 0 && <Empty />}
        {items.map((item) => (
          <React.Fragment key={item.id}>{getItemByType(item)}</React.Fragment>
        ))}
      </Box>
    </Container>
  );
};
