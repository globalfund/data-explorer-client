import Grid from "@material-ui/core/Grid";

import React from "react";
import { reportsDummyData } from "./data";
import { GridItem } from "./gridItem";

export default function ReportsGrid() {
  return (
    <Grid container spacing={2}>
      {reportsDummyData.map((data, index) => (
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <GridItem
            key={index}
            date={data.date}
            description={data.desc}
            path={data.path}
            title={data.title}
            iconLinks={data.iconLinks}
            value=""
          />
        </Grid>
      ))}
    </Grid>
  );
}
