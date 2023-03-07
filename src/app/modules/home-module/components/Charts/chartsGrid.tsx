import Grid from "@material-ui/core/Grid";

import React from "react";
import { datasetsData } from "./data";
import GridItem from "./gridItem";
import { BarIcon, MapIcon, SankeyIcon, TableIcon } from "./vizIcons";

export default function ChartsGrid() {
  const setViz = (vizType: "bar" | "sankey" | "map" | "table") => {
    switch (vizType) {
      case "sankey":
        return <SankeyIcon />;

      case "bar":
        return <BarIcon />;
      case "map":
        return <MapIcon />;
      case "table":
        return <TableIcon />;
      default:
        return <TableIcon />;
    }
  };

  return (
    <Grid container spacing={2}>
      {datasetsData.map((data, index) => (
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <GridItem
            key={index}
            date={data.date}
            descr={data.desc}
            path={data.path}
            title={data.title}
            viz={setViz(data.viz)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
