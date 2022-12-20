/* third-party */
import React from "react";
import get from "lodash/get";
import List from "@material-ui/core/List";
import useTitle from "react-use/lib/useTitle";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { DatasetListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";
import axios from "axios";

export default function DatasetsList() {
  useTitle("Dataxplorer - Datasets");

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
        loadDatasets({ storeInCrudData: true });
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    loadDatasets({ storeInCrudData: true });
  }, []);

  return (
    <React.Fragment>
      <PageTopSpacer />
      <List>
        {(datasets || []).map((d) => (
          <ListItem key={d.id}>
            <ListItemText primary={d.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteDataset(d.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
