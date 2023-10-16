import React from "react";
import axios from "axios";
import get from "lodash/get";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useSessionStorage } from "react-use";
import useDebounce from "react-use/lib/useDebounce";
import { useInfinityScroll } from "app/hooks/useInfinityScroll";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { HomepageTable } from "app/modules/home-module/components/Table";
import DeleteDatasetDialog from "app/components/Dialogs/deleteDatasetDialog";
import { DatasetListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";
import ReformedGridItem from "app/modules/home-module/components/Datasets/reformedGridItem";
import DatasetAddnewCard from "app/modules/home-module/components/Datasets/datasetAddNewCard";

interface Props {
  sortBy: string;
  searchStr: string;
  tableView: boolean;
  addCard?: boolean;
}

export default function DatasetsGrid(props: Props) {
  const observerTarget = React.useRef(null);
  const token = useSessionStorage("authToken", "")[0];
  const [cardId, setCardId] = React.useState<string>("");
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const limit = 15;
  //used over usestate to get current offset value in the IntersectionObserver api, as it is not updated in usestate.
  const [offset, setOffset] = React.useState(0);
  const { isObserved } = useInfinityScroll(observerTarget);
  const [loadedDatasets, setLoadedDatasets] = React.useState<
    DatasetListItemAPIModel[]
  >([]);

  const loadDatasets = useStoreActions(
    (actions) => actions.dataThemes.DatasetGetList.fetch
  );
  const clearDatasets = useStoreActions(
    (actions) => actions.dataThemes.DatasetGetList.clear
  );
  const loadDatasetCount = useStoreActions(
    (actions) => actions.dataThemes.DatasetCount.fetch
  );
  const datasetCount = useStoreState(
    (state) => get(state, "dataThemes.DatasetCount.data.count", 0) as number
  );
  const datasetLoadSuccess = useStoreState(
    (state) => state.dataThemes.DatasetGetList.success
  );

  const loadData = async (searchStr: string, sortByStr: string) => {
    const value =
      searchStr.length > 0
        ? `"where":{"name":{"like":"${searchStr}.*","options":"i"}},`
        : "";
    //refrain from loading data if all the data is loaded
    if (loadedDatasets.length !== datasetCount) {
      await loadDatasets({
        token,
        storeInCrudData: true,
        filterString: `filter={${value}"order":"${sortByStr} desc","limit":${limit},"offset":${offset}}`,
      });
    }
  };

  const reloadData = async () => {
    if (token) {
      loadDatasetCount({ token });
    }
    setLoadedDatasets([]);
    setOffset(0);
    loadData(props.searchStr, props.sortBy);
  };

  React.useEffect(() => {
    if (token) {
      loadDatasetCount({ token });
    }
  }, [token]);

  React.useEffect(() => {
    //load data if intersection observer is triggered
    if (isObserved) {
      if (loadedDatasets.length !== datasetCount) {
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
  }, [props.sortBy, token, datasetCount]);

  const handleDelete = (id: string) => {
    deleteDataset(id);
    setModalDisplay(false);
    setEnableButton(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const datasets = useStoreState(
    (state) =>
      get(
        state,
        "dataThemes.DatasetGetList.crudData",
        []
      ) as DatasetListItemAPIModel[]
  );

  async function deleteDataset(id: string) {
    axios
      .delete(`${process.env.REACT_APP_API}/datasets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        loadDatasets({
          token,
          storeInCrudData: true,
          filterString: "filter[order]=createdDate desc",
        });
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    clearDatasets();
    setLoadedDatasets([]);
  }, []);

  React.useEffect(() => {
    if (datasets === null) {
      setLoadedDatasets([]);
    }
  }, [datasets]);

  React.useEffect(() => {
    if (!datasetLoadSuccess) {
      return;
    }

    //update the loaded datasets
    setLoadedDatasets((prevDatasets) => {
      const f = datasets.filter((chart, i) => prevDatasets[i]?.id !== chart.id);

      return [...prevDatasets, ...f];
    });
  }, [datasetLoadSuccess]);

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
          {props.addCard && <DatasetAddnewCard />}
          {(loadedDatasets || []).map((data, index) => (
            <Grid item key={data.id} xs={12} sm={6} md={4} lg={3}>
              <ReformedGridItem
                date={data.createdDate}
                descr={data.description}
                path={"#"}
                title={data.name}
                showMenu
                handleDuplicate={() => {}}
                handleDelete={() => {}}
              />

              <Box height={16} />
            </Grid>
          ))}
        </Grid>
      )}

      {props.tableView && (
        <HomepageTable
          data={loadedDatasets.map((data) => ({
            id: data.id,
            name: data.name,
            description: data.description,
            createdDate: data.createdDate,
          }))}
        />
      )}
      <Box height={100} />

      <div
        ref={observerTarget}
        css={`
          height: 10px;
        `}
      />
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
