import React from "react";
import Typography from "@mui/material/Typography";

export const HomeHero: React.FC = () => {
  return (
    <React.Fragment>
      <Typography variant="h1" marginBottom="5px">
        Data Explorer
      </Typography>
      <Typography variant="h5" marginBottom="50px" maxWidth="80%">
        The Global Fund invests US$5 billion a year to defeat HIV, TB and
        Malaria and ensure a healthier, safer, equitable future for all.
      </Typography>
    </React.Fragment>
  );
};
