import React from "react";
import { find } from "lodash";
import Grid from "@material-ui/core/Grid";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import DeleteChartDialog from "app/components/Dialogs/deleteChartDialog";
import GridItem from "app/modules/home-module/components/Charts/gridItem";
import { chartTypes } from "app/modules/chart-module/routes/chart-type/data";
import ChartAddnewCard from "app/modules/home-module/components/Charts/chartAddNewCard";

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

export default function ChartsGrid() {
  const [cardId, setCardId] = React.useState<number>(0);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [enableButton, setEnableButton] = React.useState<boolean>(false);

  const charts = useStoreState(
    (state) => (state.charts.ChartGetList.crudData || []) as any[]
  );
  const loadCharts = useStoreActions(
    (actions) => actions.charts.ChartGetList.fetch
  );

  const handleDelete = (id: number) => {
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

  const getIcon = (vizType: string) => {
    const type = find(chartTypes, { id: vizType });
    if (type) {
      return type.icon;
    }
    return chartTypes[0].icon;
  };

  React.useEffect(() => {
    loadCharts({
      storeInCrudData: true,
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <ChartAddnewCard />
        {charts.map((c, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <GridItem
              id={c.id}
              key={c.id}
              title={c.name}
              descr={description}
              date={c.createdDate}
              path={`/chart/${c.id}`}
              viz={getIcon(c.vizType)}
              handleDelete={() => handleModal(index as number)}
            />
          </Grid>
        ))}
      </Grid>
      <DeleteChartDialog
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
