import React, { useRef } from "react";
import axios from "axios";
import get from "lodash/get";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import useDebounce from "react-use/lib/useDebounce";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { HomepageTable } from "app/modules/home-module/components/Table";
import DeleteDatasetDialog from "app/components/Dialogs/deleteDatasetDialog";
import { DatasetListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";
import ReformedGridItem from "app/modules/home-module/components/Datasets/reformedGridItem";
import DatasetAddnewCard from "./datasetAddNewCard";
import { useInfinityScroll } from "app/hooks/useInfinityScroll";

interface Props {
  sortBy: string;
  searchStr: string;
  tableView: boolean;
  addCard?: boolean;
}

export default function DatasetsGrid(props: Props) {
  const observerTarget = useRef(null);
  const [cardId, setCardId] = React.useState<string>("");
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);
  const limit = 10;
  //used over usestate to get current offset value in the IntersectionObserver api, as it is not updated in usestate.
  const offset = useRef(0);
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
  const datasetLoadSuccess = useStoreState(
    (state) => state.dataThemes.DatasetGetList.success
  );
  const datasetCount = useStoreState(
    (state) => get(state, "dataThemes.DatasetCount.data.count", 0) as number
  );

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

  function deleteDataset(id: string) {
    axios
      .delete(`${process.env.REACT_APP_API}/datasets/${id}`)
      .then(() => {
        loadDatasets({
          storeInCrudData: true,
          filterString: "filter[order]=createdDate desc",
        });
      })
      .catch((error) => console.log(error));
  }

  const loadData = (searchStr: string, sortByStr: string) => {
    const value =
      searchStr.length > 0
        ? `"where":{"name":{"like":"${searchStr}.*","options":"i"}},`
        : "";
    loadDatasets({
      storeInCrudData: true,
      filterString: `filter={${value}"order":"${sortByStr} desc","limit":${limit},"offset":${offset.current}}`,
    });
    offset.current = offset.current + limit;
  };
  useInfinityScroll(loadData, observerTarget, props.searchStr, props.sortBy);

  React.useEffect(() => {
    loadDatasetCount({});
    if (props.searchStr.length === 0) {
      loadData(props.searchStr, props.sortBy);
    }
  }, [props.searchStr, props.sortBy]);

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
      return [...prevDatasets, ...datasets];
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

      <div ref={observerTarget} />
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
