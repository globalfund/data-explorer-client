import React from "react";
import Typography from "@mui/material/Typography";

export const HomeHero: React.FC = () => {
  return (
    <React.Fragment>
      <Typography variant="h1" marginBottom="32px">
        Data Explorer
      </Typography>
      <Typography variant="h3" marginBottom="32px" maxWidth="85%">
        The Global Fund invests US$4 billion a year to defeat HIV, TB and
        Malaria and ensure a healthier, safer, equitable future for all.
      </Typography>
      <Typography variant="body1" maxWidth="60%" lineHeight={1.2}>
        We unite the world to find solutions that have the most impact, and we
        take them to scale worldwide. It’s working. We won’t stop until the job
        is finished.
      </Typography>
    </React.Fragment>
  );
};
