import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const empty = (
  <Box
    sx={{
      gap: "20px",
      width: "100%",
      display: "flex",
      paddingTop: "82px",
      textAlign: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <Typography fontSize="24px" color="#495057">
      Start building your report
    </Typography>
    <Typography fontSize="16px" color="#495057">
      Click on the elements you would like to add
      <br />
      Or start typing to add text directly
    </Typography>
  </Box>
);

export const ReportBuilderPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          padding: "50px",
          minHeight: "1420px",
          bgcolor: "#ffffff",
          boxShadow: "0 0 10px 0 rgba(152, 161, 170, 0.60)",
        }}
      >
        {empty}
      </Box>
    </Container>
  );
};
