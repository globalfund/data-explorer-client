import React from "react";
import { useCMSData } from "app/hooks/useCMSData";
import Typography from "@mui/material/Typography";
import { getCMSDataField } from "app/utils/getCMSDataField";

export const HomeHero: React.FC = () => {
  const cmsData = useCMSData({ returnData: true });
  return (
    <React.Fragment>
      <Typography variant="h1" marginBottom="5px">
        {getCMSDataField(cmsData, "pagesHome.title", "Data Explorer")}
      </Typography>
      <Typography
        variant="h5"
        marginBottom="50px"
        maxWidth="80%"
        sx={{
          "@media (max-width: 1200px)": {
            maxWidth: "100%",
          },
          "@media (max-width: 767px)": {
            fontSize: "20px",
          },
        }}
      >
        {getCMSDataField(
          cmsData,
          "pagesHome.subtitle",
          "The Global Fund invests US$5 billion a year to defeat HIV, tuberculosis and malaria and ensure a healthier, safer, equitable future for all."
        )}
      </Typography>
    </React.Fragment>
  );
};
