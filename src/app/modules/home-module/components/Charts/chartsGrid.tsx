import Grid from "@material-ui/core/Grid";
import DeleteDatasetDialog from "app/components/Dialogs/deleteDatasetDialog";

import React from "react";
import { v4 } from "uuid";
import ChartAddnewCard from "./chartAddNewCard";
import { datasetsData } from "./data";
import GridItem from "./gridItem";
import { BarIcon, MapIcon, SankeyIcon, TableIcon } from "./vizIcons";

export default function ChartsGrid() {
  const [cardId, setCardId] = React.useState<string>("");
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [enableButton, setEnableButton] = React.useState<boolean>(false);

  const [data, setData] = React.useState(
    datasetsData.map((data) => ({ ...data, id: v4() }))
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
    <>
      <Grid container spacing={2}>
        <ChartAddnewCard />
        {datasetsData.map((data, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <GridItem
              key={index}
              date={data.date}
              descr={data.desc}
              path={data.path}
              title={data.title}
              viz={setViz(data.viz)}
              handleDelete={() => handleModal(data.id as string)}
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
