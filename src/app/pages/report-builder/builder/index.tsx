import React from "react";
import Box from "@mui/material/Box";
import { Editor } from "@tiptap/react";
import Container from "@mui/material/Container";
import { RTEToolbar } from "app/components/rich-text-editor";
// import { Empty } from "app/pages/report-builder/builder/components/empty";
import { ReportBuilderPageText } from "app/pages/report-builder/builder/components/text";
import { ReportBuilderPageChart } from "app/pages/report-builder/builder/components/chart";

export const ReportBuilderPage: React.FC = () => {
  const [activeRTE, setActiveRTE] = React.useState<Editor | null>(null);

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
        }}
      >
        {/* <Empty /> */}
        <ReportBuilderPageText setEditor={setActiveRTE} />
        <ReportBuilderPageChart />
      </Box>
    </Container>
  );
};
