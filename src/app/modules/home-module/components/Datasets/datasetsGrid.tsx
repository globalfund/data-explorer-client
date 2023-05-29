import React from "react";
import axios from "axios";
import get from "lodash/get";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import useDebounce from "react-use/lib/useDebounce";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import DeleteDatasetDialog from "app/components/Dialogs/deleteDatasetDialog";
import { DatasetListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";
import ReformedGridItem from "app/modules/home-module/components/Datasets/reformedGridItem";

export default function DatasetsGrid(props: { searchStr: string }) {
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

  function loadData(searchStr: string) {
    const value =
      searchStr.length > 0
        ? `"where":{"name":{"like":"${searchStr}.*","options":"i"}},`
        : "";
    loadDatasets({
      storeInCrudData: true,
      filterString: `filter={${value}"order":"createdDate desc"}`,
    });
  }

  React.useEffect(() => {
    loadData(props.searchStr);
  }, []);

  const [,] = useDebounce(
    () => {
      loadData(props.searchStr);
    },
    500,
    [props.searchStr]
  );

  return (
    <>
      <Grid container spacing={2}>
        {(datasets?.slice(0, 15) || []).map((data, index) => (
          <Grid item key={data.id} xs={12} sm={6} md={4} lg={4}>
            <ReformedGridItem
              date={data.createdDate}
              descr={data.description}
              path={"#"}
              title={data.name}
              showMenu
              handleDelete={() => handleModal(data.id)}
            />
            <Box height={16} />
          </Grid>
        ))}
      </Grid>

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
