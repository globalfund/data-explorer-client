import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DeleteDatasetDialog from "app/components/Dialogs/deleteDatasetDialog";
import { DatasetListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import axios from "axios";
import { get } from "lodash";

import React from "react";
import { v4 } from "uuid";
import { dummyDatasetsData } from "./data";
import DatasetAddnewCard from "./datasetAddNewCard";
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value === "DELETE") {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };

  const handleModal = (id: string) => {
    setCardId(id);
    setModalDisplay(true);
  };

  const loadDatasets = useStoreActions(
    (actions) => actions.dataThemes.DatasetGetList.fetch
  );

  const datasets = useStoreState(
    (state) =>
      get(
        state,
        "dataThemes.DatasetGetList.crudData",
        []
      ) as DatasetListItemAPIModel[]
  );

  function deleteDataset(id: string) {
    axios
      .delete(`${process.env.REACT_APP_API}/datasets/${id}`)
      .then(() => {
        loadDatasets({ storeInCrudData: true });
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    loadDatasets({ storeInCrudData: true });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <DatasetAddnewCard />
        {(datasets || []).map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <GridItem
              key={index}
              date={data.createdDate}
              descr={data.description}
              path={"#"}
              title={data.name}
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
