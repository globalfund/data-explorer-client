import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Empty: React.FC = () => (
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
