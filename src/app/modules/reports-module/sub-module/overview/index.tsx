import { Box, Container, Grid } from "@material-ui/core";
import React from "react";
import BigNumber from "../components/bigNumber";
import HeaderBlock from "../components/headerBlock";
import Subheader from "../components/subheader";

export default function ReportsOverview() {
  return (
    <>
      <Subheader previewMode={true} />
      <HeaderBlock previewMode={true} />
      <Box height={18} />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {[...Array(5).keys()].map((name) => (
            <Grid item xs={12} md={6} lg>
              <BigNumber />
            </Grid>
          ))}
        </Grid>
        <Box height={30} />

        <hr
          css={`
            border: 1.26087px solid #e4e4e4;
          `}
        />
        <Box height={30} />
      </Container>
    </>
  );
}
