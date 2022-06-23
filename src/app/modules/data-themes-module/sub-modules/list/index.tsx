/* third-party */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import IconButton from "@material-ui/core/IconButton";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { AddIcon } from "app/assets/icons/Add";
import { PageLoader } from "app/modules/common/page-loader";
import { styles } from "app/modules/data-themes-module/sub-modules/list/styles";
import { DataThemesGenericPageSubHeader } from "app/modules/data-themes-module/components/sub-header";
import { Box } from "@material-ui/core";

interface DataThemeListItemAPIModel {
  id: string;
  title: string;
  public: boolean;
  subTitle: string;
  createdDate: Date;
  tabs: any;
  vizCount: number;
}

function DataThemesListViewItem(props: DataThemeListItemAPIModel) {
  const date = new Date(props.createdDate);
  const history = useHistory();

  const deleteDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeDelete.delete
  );
  const clearDeleteDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeDelete.clear
  );
  const deleteDataThemeSuccess = useStoreState(
    (state) => state.dataThemes.DataThemeDelete.success
  );
  const loadDataThemes = useStoreActions(
    (actions) => actions.dataThemes.DataThemeGetList.fetch
  );

  function deleteItem() {
    deleteDataTheme({
      deleteId: props.id,
    });
  }

  React.useEffect(() => {
    if (deleteDataThemeSuccess) {
      loadDataThemes({
        storeInCrudData: true,
      });
    }

    return () => {
      clearDeleteDataTheme();
    };
  }, [deleteDataThemeSuccess]);

  return (
    <div css={styles.gridItem}>
      <div css={styles.gridItemTitle}>
        {props.title}
        <div>
          <IconButton
            id="edit-button"
            size="small"
            onClick={() => {
              history.push(`/data-themes/${props.id}`, { editMode: true });
            }}
          >
            <EditIcon htmlColor="#262c34" />
          </IconButton>
          <IconButton id="delete-button" size="small" onClick={deleteItem}>
            <DeleteIcon htmlColor="#262c34" />
          </IconButton>
        </div>
      </div>
      <div css={styles.gridItemLabel}>{props.subTitle}</div>
      <div css={styles.gridItemDetails}>
        <div>
          <div>Creation date</div>
          <div>
            {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
          </div>
        </div>
        <div>
          <div>Created by</div>
          <div>-</div>
        </div>
        <div>
          <div>Visualizations</div>
          <div>{props.vizCount}</div>
        </div>
      </div>
      <Link css={styles.gridItemLinkBtn} to={`/data-themes/${props.id}`}>
        View data theme
      </Link>
    </div>
  );
}

export function DataThemesListView() {
  useTitle("Data Themes - List");
  const history = useHistory();

  React.useEffect(() => {
    document.body.style.background = "#F0F3F5";
  }, []);

  const loadedDataThemes = useStoreState(
    (state) =>
      (state.dataThemes.DataThemeGetList.crudData ??
        []) as DataThemeListItemAPIModel[]
  );
  const isLoadingDataThemes = useStoreState(
    (state) => state.dataThemes.DataThemeGetList.loading
  );
  const loadDataThemes = useStoreActions(
    (actions) => actions.dataThemes.DataThemeGetList.fetch
  );

  React.useEffect(() => {
    loadDataThemes({
      storeInCrudData: true,
    });
  }, []);

  return (
    <div css={styles.container}>
      {isLoadingDataThemes && <PageLoader />}
      <DataThemesGenericPageSubHeader title="Themes" />
      <div css={styles.innercontainer}>
        <Box css={styles.toolbar}>
          <SearchIcon />
          <SortIcon />
          <ViewAgendaIcon />
          <button onClick={() => history.push("/data-themes/new")}>
            Create
          </button>
        </Box>

        <Grid container spacing={2}>
          {loadedDataThemes.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={4}>
              <DataThemesListViewItem {...item} />
            </Grid>
          ))}
          {loadedDataThemes.length === 0 && (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <div css={styles.gridItemCreateNew}>
                <Link to="/data-themes/new">
                  <AddIcon />
                  <div>Create new data theme</div>
                </Link>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
}
