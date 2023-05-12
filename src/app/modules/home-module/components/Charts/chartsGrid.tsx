import React from "react";
import axios from "axios";
import find from "lodash/find";
import Grid from "@material-ui/core/Grid";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import DeleteChartDialog from "app/components/Dialogs/deleteChartDialog";
import GridItem from "app/modules/home-module/components/Charts/gridItem";
import { echartTypes } from "app/modules/chart-module/routes/chart-type/data";
import ChartAddnewCard from "app/modules/home-module/components/Charts/chartAddNewCard";
import { useHistory } from "react-router-dom";

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

export default function ChartsGrid() {
  const [cardId, setCardId] = React.useState<number>(0);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [enableButton, setEnableButton] = React.useState<boolean>(false);

  const charts = useStoreState(
    (state) => (state.charts.ChartGetList.crudData || []) as any[]
  );
  const loadCharts = useStoreActions(
    (actions) => actions.charts.ChartGetList.fetch
  );

  const handleDelete = (index?: number) => {
    setModalDisplay(false);
    setEnableButton(false);
    const id = charts[index as number].id;

    if (!id) {
      return;
    }
    axios
      .delete(`${process.env.REACT_APP_API}/chart/${id}`)
      .then(() => {
        loadCharts({
          storeInCrudData: true,
          filterString: "filter[order]=createdDate desc",
        });
      })
      .catch((error) => console.log(error));
  };

  const handleDuplicate = (index: number) => {
    const id = charts[index].id;
    if (!id) {
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API}/chart/duplicate/${id}`)
      .then(() => {
        loadCharts({
          storeInCrudData: true,
          filterString: "filter[order]=createdDate desc",
        });
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const type = find(echartTypes(true), { id: vizType });
    if (type) {
      return type.icon;
    }
    return echartTypes(true)[0].icon;
  };

  React.useEffect(() => {
    loadCharts({
      storeInCrudData: true,
      filterString: "filter[order]=createdDate desc",
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <ChartAddnewCard />
        {charts.map((c, index) => (
          <Grid item key={c.id} xs={12} sm={6} md={4} lg={3}>
            <GridItem
              id={c.id}
              title={c.name}
              descr={description}
              date={c.createdDate}
              path={`/chart/${c.id}`}
              viz={getIcon(c.vizType)}
              handleDelete={() => handleModal(index)}
              handleDuplicate={() => handleDuplicate(index)}
            />
          </Grid>
        ))}
      </Grid>
      <DeleteChartDialog
        cardId={cardId}
        modalDisplay={modalDisplay}
        enableButton={enableButton}
        handleDelete={handleDelete}
        setModalDisplay={setModalDisplay}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
