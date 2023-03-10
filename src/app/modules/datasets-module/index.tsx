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
import DatasetAddnewCard from "./datasetAddNewCard";
import { v4 } from "uuid";
import DeleteDatasetDialog from "app/components/Dialogs/deleteDatasetDialog";

export default function Datasets() {
  useTitle("Dataxplorer - Datasets");

  const [cardId, setCardId] = React.useState<string>("");
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [enableButton, setEnableButton] = React.useState<boolean>(false);

  const [data, setData] = React.useState(
    dummyDatasetsData.map((data) => ({ ...data, id: v4() }))
  );
  const handleDelete = (id: string) => {
    const newData = data.filter((data, i) => data.id !== id);
    setData(newData);
    setModalDisplay(false);
    setEnableButton(false);
    console.log(enableButton, "btn");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value === "DELETE") {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };
  console.log(enableButton, "btn");

  const handleModal = (id: string) => {
    setCardId(id);
    setModalDisplay(true);
  };

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
        {data.map((data, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <GridItem
              key={index}
              date={data.date}
              descr={data.desc}
              path={"#"}
              title={data.title}
              showMenu
              handleDelete={() => handleModal(data.id)}
            />
          </Grid>
        ))}
      </Grid>
      <DeleteDatasetDialog
        cardId={cardId}
        enableButton={enableButton}
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
      />
    </div>
  );
}
