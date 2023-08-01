import React from "react";
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

interface Props {
  sortBy: string;
  searchStr: string;
  tableView: boolean;
}

export default function DatasetsGrid(props: Props) {
  const [cardId, setCardId] = React.useState<string>("");
  const [enableButton, setEnableButton] = React.useState<boolean>(false);
  const [modalDisplay, setModalDisplay] = React.useState<boolean>(false);

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

  const loadDatasets = useStoreActions(
    (actions) => actions.dataThemes.DatasetGetList.fetch
  );

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

  function loadData(searchStr: string, sortByStr: string) {
    const value =
      searchStr.length > 0
        ? `"where":{"name":{"like":"${searchStr}.*","options":"i"}},`
        : "";
    loadDatasets({
      storeInCrudData: true,
      filterString: `filter={${value}"order":"${sortByStr} desc"}`,
    });
  }

  React.useEffect(() => {
    if (props.searchStr.length === 0) {
      loadData(props.searchStr, props.sortBy);
    }
  }, [props.searchStr, props.sortBy]);

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
          {(datasets || []).map((data, index) => (
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
          data={datasets.map((data) => ({
            id: data.id,
            name: data.name,
            description: data.description,
            createdDate: data.createdDate,
          }))}
        />
      )}
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
