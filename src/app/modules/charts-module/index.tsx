import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DeleteChartDialog from "app/components/Dialogs/deleteChartDialog";
import DeleteDatasetDialog from "app/components/Dialogs/deleteDatasetDialog";
import { PageHeader } from "app/components/PageHeader";

import React from "react";
import { v4 } from "uuid";
import { PageTopSpacer } from "../common/page-top-spacer";
import ChartAddnewCard from "./chartAddNewCard";
import { datasetsData } from "./data";
import GridItem from "./gridItem";
import { BarIcon, MapIcon, SankeyIcon, TableIcon } from "./vizIcons";

export default function ChartsGrid() {
  const [cardId, setCardId] = React.useState<number>(0);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [enableButton, setEnableButton] = React.useState<boolean>(false);

  const [data, setData] = React.useState(
    datasetsData.map((data) => ({ ...data, id: "63dd016c20ff974becd6330b" }))
  );

  const handleDelete = (id: number) => {
    const newData = data.filter((data, i) => i !== id);
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

  const handleModal = (id: number) => {
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
      <PageHeader title="My Charts" />

      <Container maxWidth="lg">
        <PageTopSpacer />

        <Grid container spacing={2}>
          <ChartAddnewCard />
          {data.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <GridItem
                key={index}
                date={data.date}
                descr={data.desc}
                path={data.path}
                title={data.title}
                viz={setViz(data.viz)}
                handleDelete={() => handleModal(index as number)}
                id={data.id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
