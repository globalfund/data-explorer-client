import React, { useRef } from "react";
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
import ChartAddnewCard from "./chartAddNewCard";
import { useInfinityScroll } from "app/hooks/useInfinityScroll";
import { get } from "lodash";

interface Props {
  sortBy: string;
  searchStr: string;
  tableView: boolean;
  addCard?: boolean;
}

export default function ChartsGrid(props: Props) {
  const observerTarget = useRef(null);
  const [cardId, setCardId] = React.useState<number>(0);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const [loadedCharts, setLoadedCharts] = React.useState<any[]>([]);

  const limit = 15;
  //used over usestate to get current offset value in the IntersectionObserver api, as it is not updated in usestate.
  const [offset, setOffset] = React.useState(0);

  const { isObserved } = useInfinityScroll(observerTarget);

  const charts = useStoreState(
    (state) => (state.charts.ChartGetList.crudData ?? []) as any[]
  );
  const loadChartsCount = useStoreActions(
    (actions) => actions.charts.ChartsCount.fetch
  );
  const ChartsCount = useStoreState(
    (state) => get(state, "charts.ChartsCount.data.count", 0) as number
  );

  const loadCharts = useStoreActions(
    (actions) => actions.charts.ChartGetList.fetch
  );
  const loading = useStoreState(
    (actions) => actions.charts.ChartGetList.loading
  );
  const chartsLoadSuccess = useStoreState(
    (state) => state.charts.ChartGetList.success
  );

  const loadData = async (searchStr: string, sortByStr: string) => {
    const value =
      searchStr.length > 0
        ? `"where":{"name":{"like":"${searchStr}.*","options":"i"}},`
        : "";
    //refrain from loading data if all the data is loaded
    if (loadedCharts.length !== ChartsCount) {
      await loadCharts({
        storeInCrudData: true,
        filterString: `filter={${value}"order":"${sortByStr} desc","limit":${limit},"offset":${offset}}`,
      });
    }
  };

  const reloadData = () => {
    setOffset(0);
    loadChartsCount({});
    setLoadedCharts([]);
    loadData(props.searchStr, props.sortBy);
  };
  React.useEffect(() => {
    loadChartsCount({});
  }, []);

  React.useEffect(() => {
    //load data if intersection observer is triggered
    if (isObserved) {
      if (loadedCharts.length !== ChartsCount) {
        //update the offset value for the next load
        setOffset(offset + limit);
      }
      loadData(props.searchStr, props.sortBy);
    }
  }, [isObserved]);

  React.useEffect(() => {
    reloadData();
    return () => {
      setOffset(0);
    };
  }, [props.sortBy, ChartsCount]);

  const handleDelete = (index?: number) => {
    setModalDisplay(false);
    setEnableButton(false);
    const id = loadedCharts[index as number].id;
    if (!id) {
      return;
    }
    axios
      .delete(`${process.env.REACT_APP_API}/chart/${id}`)
      .then(() => {
        reloadData();
      })
      .catch((error) => console.log(error));
  };

  const handleDuplicate = (index: number) => {
    const id = loadedCharts[index].id;
    if (!id) {
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API}/chart/duplicate/${id}`)
      .then(() => {
        reloadData();
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

  React.useEffect(() => {
    if (!chartsLoadSuccess) {
      return;
    }
    //update the loaded reports
    setLoadedCharts((prevCharts) => {
      const f = charts.filter((chart, i) => prevCharts[i]?.id !== chart.id);
      return [...prevCharts, ...f];
    });
  }, [chartsLoadSuccess]);

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
          {props.addCard && <ChartAddnewCard />}
          {loadedCharts.map((c, index) => (
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
          data={loadedCharts.map((data) => ({
            id: data.id,
            name: data.name,
            description: data.title,
            createdDate: data.createdDate,
          }))}
        />
      )}
      <Box height={100} />

      <div ref={observerTarget} />

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
