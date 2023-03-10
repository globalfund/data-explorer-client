import Grid from "@material-ui/core/Grid";
import DeleteDatasetDialog from "app/components/Dialogs/deleteDatasetDialog";
import DatasetAddnewCard from "app/modules/datasets-module/datasetAddNewCard";

import React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { dummyDatasetsData } from "./data";
import GridItem from "./gridItem";

export default function DatasetsGrid() {
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
    <>
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
    </>
  );
}
