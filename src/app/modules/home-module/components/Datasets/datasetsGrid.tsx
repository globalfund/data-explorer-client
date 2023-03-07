import Grid from "@material-ui/core/Grid";

import React from "react";
import { Link } from "react-router-dom";
import { dummyDatasetsData } from "./data";
import GridItem from "./gridItem";

export default function DatasetsGrid() {
  return (
    <Grid container spacing={2}>
      {dummyDatasetsData.map((data, index) => (
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Link to={data.path}>
            <GridItem
              key={index}
              date={data.date}
              descr={data.desc}
              path={data.path}
              title={data.title}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
