import React from "react";
import axios from "axios";
import get from "lodash/get";
import find from "lodash/find";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useSessionStorage, useUpdateEffect } from "react-use";
import useDebounce from "react-use/lib/useDebounce";
import { useInfinityScroll } from "app/hooks/useInfinityScroll";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import DeleteChartDialog from "app/components/Dialogs/deleteChartDialog";
import { HomepageTable } from "app/modules/home-module/components/Table";
import { coloredEchartTypes } from "app/modules/chart-module/routes/chart-type/data";
import ReformedGridItem from "app/modules/home-module/components/Charts/reformedGridItem";
import ChartAddnewCard from "./chartAddNewCard";
import CircleLoader from "../Loader";

interface Props {
  sortBy: string;
  searchStr: string;
  tableView: boolean;
  addCard?: boolean;
}

export default function ChartsGrid(props: Props) {
  const observerTarget = React.useRef(null);
  const [cardId, setCardId] = React.useState<number>(0);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const [loadedCharts, setLoadedCharts] = React.useState<any[]>([]);

  const token = useSessionStorage("authToken", "")[0];

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

  const loading = useStoreState((state) => state.charts.ChartGetList.loading);

  const chartsLoadSuccess = useStoreState(
    (state) => state.charts.ChartGetList.success
  );

  const getFilterString = () => {
    const value =
      props.searchStr?.length > 0
        ? `"where":{"name":{"like":"${props.searchStr}.*","options":"i"}},`
        : "";
    return `filter={${value}"order":"${props.sortBy} desc","limit":${limit},"offset":${offset}}`;
  };

  const getWhereString = () => {
    return props.searchStr?.length > 0
      ? `where={"name":{"like":"${props.searchStr}.*","options":"i"}}`
      : "";
  };

  const loadData = async () => {
    //refrain from loading data if all the data is loaded
    // if (loadedCharts.length !== ChartsCount) {
    if (token) {
      await loadCharts({
        token,
        storeInCrudData: true,
        filterString: getFilterString(),
      });
    }
    // }
  };

  const reloadData = async () => {
    setOffset(0);
    if (token) {
      loadChartsCount({ token, filterString: getWhereString() });
    }
    setLoadedCharts([]);
    loadData();
  };

  React.useEffect(() => {
    if (token) {
      loadChartsCount({
        token,
      });
    }
  }, [token]);

  React.useEffect(() => {
    //load data if intersection observer is triggered
    if (isObserved) {
      if (loadedCharts.length !== ChartsCount) {
        //update the offset value for the next load
        setOffset(offset + limit);
      }
    }
  }, [isObserved]);

  useUpdateEffect(() => {
    loadData();
  }, [offset]);

  React.useEffect(() => {
    if (token) {
      reloadData();
    }
  }, [props.sortBy, token]);

  const handleDelete = (index?: number) => {
    setModalDisplay(false);
    setEnableButton(false);
    const id = loadedCharts[index as number].id;
    if (!id) {
      return;
    }
    axios
      .delete(`${process.env.REACT_APP_API}/chart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get(`${process.env.REACT_APP_API}/chart/duplicate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
      const prevChartsIds = prevCharts.map((c) => c.id);
      const f = charts.filter((chart) => !prevChartsIds.includes(chart.id));
      return [...prevCharts, ...f];
    });
  }, [chartsLoadSuccess]);

  const [,] = useDebounce(
    () => {
      if (props.searchStr !== undefined) {
        reloadData();
      }
    },
    500,
    [props.searchStr]
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
      {loading && <CircleLoader />}

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
