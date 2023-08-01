import React from "react";
import axios from "axios";
import find from "lodash/find";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import useDebounce from "react-use/lib/useDebounce";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import DeleteChartDialog from "app/components/Dialogs/deleteChartDialog";
import { HomepageTable } from "app/modules/home-module/components/Table";
import { coloredEchartTypes } from "app/modules/chart-module/routes/chart-type/data";
import ReformedGridItem from "app/modules/home-module/components/Charts/reformedGridItem";

interface Props {
  sortBy: string;
  searchStr: string;
  tableView: boolean;
}

export default function ChartsGrid(props: Props) {
  const [cardId, setCardId] = React.useState<number>(0);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [enableButton, setEnableButton] = React.useState<boolean>(false);

  const charts = useStoreState(
    (state) => (state.charts.ChartGetList.crudData ?? []) as any[]
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
    const type = find(coloredEchartTypes(), { id: vizType });
    if (type) {
      return type.icon;
    }
    return coloredEchartTypes()[0].icon;
  };

  function loadData(searchStr: string, sortByStr: string) {
    const value =
      searchStr.length > 0
        ? `"where":{"name":{"like":"${searchStr}.*","options":"i"}},`
        : "";
    loadCharts({
      storeInCrudData: true,
      filterString: `filter={${value}"order":"${sortByStr} desc"}`,
    });
  }

  React.useEffect(() => {
    if (props.searchStr.length === 0) {
      loadData(props.searchStr, props.sortBy);
    }
  }, [props.sortBy]);

  const [,] = useDebounce(
    () => {
      if (props.searchStr.length > 0) {
        loadData(props.searchStr, props.sortBy);
      }
    },
    500,
    [props.searchStr, props.sortBy]
  );

  return (
    <>
      {!props.tableView && (
        <Grid container spacing={2}>
          {charts.map((c, index) => (
            <Grid item key={c.id} xs={12} sm={6} md={6} lg={3}>
              <ReformedGridItem
                id={c.id}
                title={c.name}
                date={c.createdDate}
                path={`/chart/${c.id}`}
                viz={getIcon(c.vizType)}
                handleDelete={() => handleModal(index)}
                handleDuplicate={() => handleDuplicate(index)}
              />
              <Box height={16} />
            </Grid>
          ))}
        </Grid>
      )}
      {props.tableView && (
        <HomepageTable
          data={charts.map((data) => ({
            id: data.id,
            name: data.name,
            description: data.title,
            createdDate: data.createdDate,
          }))}
        />
      )}
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
