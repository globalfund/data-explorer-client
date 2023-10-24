import React from "react";
import axios from "axios";
import get from "lodash/get";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useSessionStorage, useUpdateEffect } from "react-use";
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

  const datasets = useStoreState(
    (state) =>
      (state.dataThemes.DatasetGetList.crudData ??
        []) as DatasetListItemAPIModel[]
  );
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
    await loadDatasets({
      token,
      storeInCrudData: true,
      filterString: getFilterString(),
    });
  };

  const reloadData = async () => {
    setOffset(0);
    if (token) {
      loadDatasetCount({ token, filterString: getWhereString() });
    }
    setLoadedDatasets([]);
    loadData();
  };

  useUpdateEffect(() => {
    loadData();
  }, [offset]);

  React.useEffect(() => {
    //load data if intersection observer is triggered
    console.log("observed", isObserved);
    if (isObserved) {
      console.log(loadedDatasets.length, datasetCount);
      if (loadedDatasets.length !== datasetCount) {
        //update the offset value for the next load
        setOffset(offset + limit);
      }
    }
  }, [isObserved]);

  React.useEffect(() => {
    if (token) {
      reloadData();
    }
  }, [props.sortBy, token]);

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

  async function deleteDataset(id: string) {
    axios
      .delete(`${process.env.REACT_APP_API}/datasets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        reloadData();
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    if (!datasetLoadSuccess) {
      return;
    }

    //update the loaded datasets
    setLoadedDatasets((prevDatasets) => {
      const prevDatasetsIds = prevDatasets.map((d) => d.id);
      const f = datasets.filter(
        (dataset) => !prevDatasetsIds.includes(dataset.id)
      );
      return [...prevDatasets, ...f];
    });
  }, [datasetLoadSuccess]);

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
