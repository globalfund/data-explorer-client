/* third-party */
import React from "react";
import Table from "@material-ui/core/Table";
import { useHistory } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import EditIcon from "@material-ui/icons/Edit";
import QueueIcon from "@material-ui/icons/Queue";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
/* project */
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DataThemeListItemAPIModel } from "app/modules/data-themes-module/sub-modules/list";

export function DataThemesTableView() {
  useTitle("Data Themes - Table");
  const history = useHistory();

  const loadedDataThemes = useStoreState(
    (state) =>
      (state.dataThemes.DataThemeGetList.crudData ??
        []) as DataThemeListItemAPIModel[]
  );
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
  const loadDataThemes = useStoreActions(
    (actions) => actions.dataThemes.DataThemeGetList.fetch
  );

  const viewItem = (id: string) => () => {
    history.push(`/data-themes/${id}`);
  };

  const deleteItem = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteDataTheme({
      deleteId: id,
    });
  };

  const editDataTheme = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push(`/data-themes/${id}`, { editMode: true });
  };

  const duplicateItem = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateDataTheme({
      getId: id,
    });
  };

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

  React.useEffect(() => {
    if (duplicateDataThemeSuccess) {
      loadDataThemes({
        storeInCrudData: true,
      });
    }

    return () => {
      clearDuplicateDataTheme();
    };
  }, [duplicateDataThemeSuccess]);

  return (
    <TableContainer
      css={`
        background: #fff;

        td,
        th {
          border-width: 2px;
          border-color: #f1f3f5;
        }
      `}
    >
      <Table>
        <TableHead
          css={`
            background: #dfe3e6;

            th {
              font-weight: bold;
              font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
            }
          `}
        >
          <TableRow>
            <TableCell width="30%">Theme</TableCell>
            <TableCell>Label</TableCell>
            <TableCell>Creation date</TableCell>
            <TableCell>Created by</TableCell>
            <TableCell>Visualizations</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          css={`
            tr {
              cursor: pointer;

              &:hover {
                background-color: #dfe3e6 !important;
              }
            }

            td,
            th {
              padding: 12px;
            }
          `}
        >
          {loadedDataThemes.map((dt) => {
            const date = new Date(dt.createdDate);
            const creationDate = `${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`;
            return (
              <TableRow hover key={dt.id} onClick={viewItem(dt.id)}>
                <TableCell component="th" scope="row">
                  {dt.title}
                </TableCell>
                <TableCell>{dt.subTitle}</TableCell>
                <TableCell>{creationDate}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{dt.vizCount}</TableCell>
                <TableCell>
                  <div
                    css={`
                      gap: 16px;
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      justify-content: center;

                      > button {
                        border-radius: 50%;
                        border: 1px solid #000;
                      }
                    `}
                  >
                    <IconButton size="small" onClick={duplicateItem(dt.id)}>
                      <QueueIcon htmlColor="#262c34" />
                    </IconButton>
                    <IconButton size="small" onClick={editDataTheme(dt.id)}>
                      <EditIcon htmlColor="#262c34" />
                    </IconButton>
                    <IconButton size="small" onClick={deleteItem(dt.id)}>
                      <DeleteIcon htmlColor="#262c34" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
