import React from "react";
import Box from "@mui/material/Box";
import { Search } from "app/components/search";
import { HomeHero } from "app/pages/home/components/hero";
import { HomeResultsStats } from "app/pages/home/components/results-stats";

export const Home: React.FC = () => {
  return (
    <Box padding="60px 0">
      <HomeHero />
      <Box height="64px" />
      <HomeResultsStats />
      <Box height="64px" />
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box width="800px">
          <Search />
        </Box>
      </Box>
    </Box>
  );
};
