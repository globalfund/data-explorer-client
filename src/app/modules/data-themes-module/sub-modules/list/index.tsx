/* third-party */
import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { AddIcon } from "app/assets/icons/Add";
import { PageLoader } from "app/modules/common/page-loader";
import { styles } from "app/modules/data-themes-module/sub-modules/list/styles";
import { DataThemesGenericPageSubHeader } from "app/modules/data-themes-module/components/sub-header";

interface DataThemeListItemAPIModel {
  id: string;
  title: string;
  public: boolean;
  subTitle: string;
  createdDate: Date;
}

function DataThemesListViewItem(props: DataThemeListItemAPIModel) {
  const date = new Date(props.createdDate);

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
        filterString:
          'filter={"fields":{"id":true,"title":true,"subTitle":true,"public":true,"tabs":false,"createdDate":true}}',
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
        <IconButton id="delete-button" size="small" onClick={deleteItem}>
          <DeleteIcon htmlColor="#262c34" />
        </IconButton>
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
          <div>1</div>
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
      filterString:
        'filter={"fields":{"id":true,"title":true,"subTitle":true,"public":true,"tabs":false,"createdDate":true}}',
    });
  }, []);

  return (
    <div css={styles.container}>
      {isLoadingDataThemes && <PageLoader />}
      <DataThemesGenericPageSubHeader title="Themes" />
      <div css={styles.innercontainer}>
        <div css={styles.toolbar} />
        <Grid container spacing={2}>
          {loadedDataThemes.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={4}>
              <DataThemesListViewItem {...item} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div css={styles.gridItemCreateNew}>
              <Link to="/data-themes/new">
                <AddIcon />
                <div>Create new data theme</div>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
