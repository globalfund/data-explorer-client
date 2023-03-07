/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
/* project */
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { LandingDatasetGrid } from "app/modules/landing-module/components/dataset-grid";
import {
  dataSetsCss,
  datasetsBottomCss,
} from "app/modules/datasets-module/style";
import { PageHeader } from "app/components/PageHeader";
import { Box, Grid } from "@material-ui/core";
import { dummyDatasetsData } from "../home-module/components/Datasets/data";
import GridItem from "../home-module/components/Datasets/gridItem";
import DatasetAddnewCard from "./addNewDataset";

export default function Datasets() {
  useTitle("Dataxplorer - Datasets");

  return (
    <div css={dataSetsCss}>
      <PageHeader title="My Datasets" />
      <PageTopSpacer />
      <div
        css={`
          color: #231d2c;
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
        `}
      >
        <p>Datasets</p>
        {/* <Box height={4} /> */}
        <p
          css={`
            margin-top: -8px;
          `}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div css={datasetsBottomCss} />

      <Grid container spacing={2}>
        <DatasetAddnewCard />
        {dummyDatasetsData.map((data, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <GridItem
              key={index}
              date={data.date}
              descr={data.desc}
              path={"#"}
              title={data.title}
              showMenu
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
