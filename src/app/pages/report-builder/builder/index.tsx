import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export const ReportBuilderPage: React.FC = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "#ffffff",
          boxShadow: "0 0 10px 0 rgba(152, 161, 170, 0.60)",
        }}
      ></Box>
    </Container>
  );
};
