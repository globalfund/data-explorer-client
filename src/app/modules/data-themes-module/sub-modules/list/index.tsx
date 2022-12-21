/* third-party */
import React from "react";
import { useDebounce } from "react-use";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import useTitle from "react-use/lib/useTitle";
import SortIcon from "@material-ui/icons/Sort";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AgendaIcon from "@material-ui/icons/ViewAgenda";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { AddIcon } from "app/assets/icons/Add";
import { TableIcon } from "app/assets/icons/charts/Table";
import { PageLoader } from "app/modules/common/page-loader";
import { styles } from "app/modules/data-themes-module/sub-modules/list/styles";
import { DataThemesTableView } from "app/modules/data-themes-module/components/table";
import { DataThemesUtilsPopover } from "app/modules/data-themes-module/components/utils-popover";
import { DataThemesToolbarPopover } from "app/modules/data-themes-module/components/toolbar-popover";
import { DataThemesGenericPageSubHeader } from "app/modules/data-themes-module/components/sub-header";

export interface DataThemeListItemAPIModel {
  tabs: any;
  id: string;
  title: string;
  public: boolean;
  vizCount: number;
  subTitle: string;
  createdDate: Date;
  updatedDate?: Date;
  loadData: () => void;
}

const sortItems = [
  {
    content: "Date updated (asc)",
    value: "updatedDate",
  },
  {
    content: "Date updated (desc)",
    value: "updatedDate DESC",
  },
  {
    content: "Date created (asc)",
    value: "createdDate",
  },
  {
    content: "Date created (desc)",
    value: "createdDate DESC",
  },
  {
    content: "Label (asc)",
    value: "subTitle",
  },
  {
    content: "Label (desc)",
    value: "subTitle DESC",
  },
  {
    content: "Title (asc)",
    value: "title",
  },
  {
    content: "Title (desc)",
    value: "title DESC",
  },
];

const viewItems = [
  {
    content: (
      <div>
        List <AgendaIcon />
      </div>
    ),
    value: "list",
  },
  {
    content: (
      <div>
        Table <TableIcon />
      </div>
    ),
    value: "table",
  },
];

function DataThemesListViewItem(props: DataThemeListItemAPIModel) {
  const date = new Date(props.createdDate);
  const updatedAt = props.updatedDate ? new Date(props.updatedDate) : date;
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
  const duplicateDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeDuplicate.fetch
  );
  const clearDuplicateDataTheme = useStoreActions(
    (actions) => actions.dataThemes.DataThemeDuplicate.clear
  );
  const duplicateDataThemeSuccess = useStoreState(
    (state) => state.dataThemes.DataThemeDuplicate.success
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function deleteItem() {
    deleteDataTheme({
      deleteId: props.id,
    });
  }

  function duplicateItem() {
    duplicateDataTheme({
      getId: props.id,
    });
  }

  React.useEffect(() => {
    if (deleteDataThemeSuccess) {
      props.loadData();
    }

    return () => {
      clearDeleteDataTheme();
    };
  }, [deleteDataThemeSuccess]);

  React.useEffect(() => {
    if (duplicateDataThemeSuccess) {
      props.loadData();
    }

    return () => {
      clearDuplicateDataTheme();
    };
  }, [duplicateDataThemeSuccess]);

  return (
    <div css={styles.gridItem}>
      <div css={styles.gridItemTitle}>
        {props.title}
        <IconButton id="menu-button" size="small" onClick={handleClick}>
          <MoreVertIcon htmlColor="#262c34" />
        </IconButton>
        <DataThemesUtilsPopover
          anchorEl={anchorEl}
          deleteItem={deleteItem}
          handleClose={handleClose}
          duplicateItem={duplicateItem}
          onEdit={() => {
            history.push(`/data-themes/${props.id}/preview`);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        />
      </div>
      <div css={styles.gridItemLabel}>{props.subTitle}</div>
      <div css={styles.gridItemDetails}>
        <div>
          <div>Created at</div>
          <div>
            {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
          </div>
        </div>
        <div>
          <div>Updated at</div>
          <div>
            {updatedAt.getDate()}-{updatedAt.getMonth() + 1}-
            {updatedAt.getFullYear()}
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

  const [search, setSearch] = React.useState("");
  const [order, setOrder] = React.useState("createdDate DESC");
  const [view, setView] = React.useState<"list" | "table">("list");

  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchDebounced, setSearchDebounced] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(
    null
  );

  function handleSortClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleSortClose() {
    setAnchorEl(null);
  }

  function onSortItemClick(value: string) {
    setOrder(value);
  }

  function handleViewClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl2(event.currentTarget);
  }

  function handleViewClose() {
    setAnchorEl2(null);
  }

  function onViewItemClick(value: string) {
    setView(value as "list" | "table");
  }

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

  const [,] = useDebounce(
    () => {
      setSearchDebounced(search);
    },
    500,
    [search]
  );

  function doLoadDataThemes() {
    let params: {
      order?: string;
      storeInCrudData: boolean;
      filterString?: string;
    } = {
      storeInCrudData: true,
    };
    if (searchDebounced.length > 0) {
      params = {
        ...params,
        filterString: `q=${searchDebounced}`,
      };
    }
    if (order.length > 0) {
      if (params.filterString) {
        params = {
          ...params,
          filterString: `${params.filterString}&order=${order}`,
        };
      } else {
        params = {
          ...params,
          filterString: `order=${order}`,
        };
      }
    }
    loadDataThemes(params);
  }

  React.useEffect(() => {
    document.body.style.background = "#F0F3F5";
  }, []);

  React.useEffect(() => {
    doLoadDataThemes();
  }, [searchDebounced, order]);

  return (
    <div css={styles.container}>
      {isLoadingDataThemes && <PageLoader />}
      <DataThemesGenericPageSubHeader title="Themes" />
      <div css={styles.innercontainer}>
        <Box css={styles.toolbar}>
          <div css={styles.toolbarSearch(searchOpen)}>
            <input
              type="text"
              tabIndex={0}
              value={search}
              placeholder="Search..."
              id="data-themes-search-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
            <CloseIcon
              onClick={() => {
                setSearch("");
                setSearchOpen(false);
              }}
            />
          </div>
          <SearchIcon
            onClick={() => {
              if (!searchOpen) {
                setSearchOpen(true);
                setTimeout(() => {
                  const input = document.getElementById(
                    "data-themes-search-input"
                  );
                  if (input) {
                    input.focus();
                  }
                }, 100);
              }
            }}
          />
          <IconButton size="small" onClick={handleSortClick}>
            <SortIcon htmlColor="#262C34" />
          </IconButton>
          <DataThemesToolbarPopover
            anchorEl={anchorEl}
            handleClose={handleSortClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            selected={order}
            items={sortItems}
            onItemClick={onSortItemClick}
          />
          <IconButton size="small" onClick={handleViewClick}>
            <AgendaIcon htmlColor="#262C34" />
          </IconButton>
          <DataThemesToolbarPopover
            anchorEl={anchorEl2}
            handleClose={handleViewClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            selected={view}
            items={viewItems}
            onItemClick={onViewItemClick}
          />
          <button
            css={styles.createNewButton}
            onClick={() => history.push("/data-themes/new")}
          >
            Create
          </button>
        </Box>
        {view === "list" && (
          <Grid container spacing={2}>
            {loadedDataThemes.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={4}>
                <DataThemesListViewItem {...item} loadData={doLoadDataThemes} />
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
        )}
        {view === "table" && (
          <DataThemesTableView loadData={doLoadDataThemes} />
        )}
      </div>
    </div>
  );
}
