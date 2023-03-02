import React, { Children } from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import TableContainer from "@material-ui/core/TableContainer";
import { tablecell } from "app/components/Table/Simple/styles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

import { TableToolbar } from "app/components/Table/Expandable/Toolbar";
import { TableToolbarCols } from "app/components/Table/Expandable/data";
import {
  SimpleTableColumn,
  SimpleTableProps,
  // FundingTableRow,
} from "app/components/Table/Simple/data";
import { cellData } from "app/modules/viz-module/sub-modules/fundingRequests/table/data-wrappers/data";
import { v4 } from "uuid";
import IconButton from "@material-ui/core/IconButton";

export interface FundingTableRow {
  [key: string]: any;
  children?: FundingTableRow[];
}
export interface FundingTableColumn {
  key: string;
  name: string;
  col?: FundingTableColumn[];
}
export interface FundingTableProps {
  title: string;
  light?: boolean;
  search: string;
  sortBy: string;
  paddingLeft: number;

  rows: FundingTableRow[];
  columns: FundingTableColumn[];
  onSearchChange: (value: string) => void;
  onSortByChange: (value: string) => void;
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      userSelect: "none",
      borderBottom: "1px solid #DFE3E6",
    },
  },
});

function Row(props: {
  row: FundingTableRow;
  columns: FundingTableColumn[];
  paddingLeft: number;
  visibleColumnsIndexes: number[];
}) {
  const classes = useRowStyles();
  const [open, setOpen] = React.useState(false);

  const firstColumnWidth = props.columns?.length > 3 ? "30%" : "";
  const firstColumnPadding = props.paddingLeft ? props.paddingLeft : 40;
  const columnWidthCalc = `${props.columns?.length > 3 ? "70%" : "100%"} / ${
    props.columns?.length
  }`;

  const [rowSelected, setRowSelected] = React.useState("parent");
  console.log(props.paddingLeft, "row");
  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        onClick={() => {
          // padVal = padVal + 4;
          if (props.row.children) {
            setOpen(!open);
          }
          if (
            props.row.children &&
            props.row.children.findIndex((children) => children.children) > -1
          ) {
            setRowSelected("child");
          }
        }}
        css={`
          transition: background 0.2s ease-in-out;
          background: ${props.row.children ? "#f5f5f7" : "#fff"};

          ${props.row.children
            ? `
          :hover {
            cursor: pointer;
            background: #262C34;

            > td {
              color: #fff;
            }
            
            path {
              fill: #fff;
            }
          }
          `
            : ""};
        `}
      >
        {props.columns.map((column: FundingTableColumn, index: number) => (
          <TableCell
            key={v4()}
            css={`
              text-align: center;
              ${tablecell} /* width: calc(${columnWidthCalc}); */
              ${index === 0 ? `padding-left: ${props.paddingLeft}rem;` : ""}
            `}
          >
            <div
              css={`
                width: 100%;
                display: flex;
                align-items: center;
                flex-direction: row;
                justify-content: space-between;
              `}
            >
              <div
                css={`
                  gap: 12px;
                  width: 100%;
                  display: flex;
                  align-items: center;
                  flex-direction: row;
                  font-weight: ${props.row.children ? "bold" : "normal"};
                  font-family: "GothamNarrow-${props.row.children
                      ? "Bold"
                      : "Book"}",
                    "Helvetica Neue", sans-serif;

                  > * {
                    @supports (-webkit-touch-callout: none) and
                      (not (translate: none)) {
                      &:not(:last-child) {
                        margin-right: 12px;
                      }
                    }
                  }

                  > svg {
                    transition: transform 0.1s ease-in-out;
                    transform: rotate(${open ? "0deg" : "-180deg"});
                  }
                `}
              >
                {index === 0 && props.row.children && <TriangleXSIcon />}
                {column.key === "link" ? (
                  <IconButton>
                    <CloudDownloadIcon htmlColor="#252C34" />
                  </IconButton>
                ) : (
                  get(props.row, column.key, "")
                )}
              </div>
            </div>
          </TableCell>
        ))}
      </TableRow>

      <TableRow
        css={`
          border-bottom: unset;
        `}
      >
        <TableCell
          css={`
            padding: 0;
            border-bottom: unset;
          `}
          colSpan={props.columns.length}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table>
              <TableBody>
                {rowSelected == "child" && (
                  <TableRow>
                    {cellData.map((name, index) => (
                      <TableCell
                        key={index}
                        css={`
                          text-align: center;
                          ${tablecell}
                          padding-left: ${index === 0 ? "4rem" : "auto"};
                          /* width: calc(${columnWidthCalc});

                          width: ${firstColumnWidth}; */
                        `}
                      >
                        <div
                          css={`
                            width: 100%;
                            display: flex;
                            align-items: center;
                            flex-direction: row;
                            justify-content: space-between;
                          `}
                        >
                          <div
                            css={`
                              gap: 12px;
                              width: 100%;
                              display: flex;
                              align-items: center;
                              flex-direction: row;
                              font-weight: bold;
                              font-family: "GothamNarrow-Bold", "Helvetica Neue",
                                sans-serif;

                              > * {
                                @supports (-webkit-touch-callout: none) and
                                  (not (translate: none)) {
                                  &:not(:last-child) {
                                    margin-right: 12px;
                                  }
                                }
                              }

                              > svg {
                                transition: transform 0.1s ease-in-out;
                                transform: rotate(${open ? "0deg" : "-180deg"});
                              }
                            `}
                          >
                            {name}
                          </div>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                )}
                {props.row.children &&
                  props.row.children.map((child: FundingTableRow) =>
                    props.columns.map((childCol) => {
                      return (
                        <Row
                          row={child}
                          key={child.name}
                          paddingLeft={props.paddingLeft + 2}
                          columns={childCol.col as FundingTableColumn[]}
                          visibleColumnsIndexes={props.visibleColumnsIndexes}
                        />
                      );
                    })
                  )}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function FundingTable(props: FundingTableProps) {
  const sortBySplits = props.sortBy.split(" ");

  const [toolbarCols, setToolbarCols] = React.useState<TableToolbarCols[]>([]);

  function onColumnViewSelectionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedToolbarCols = [...toolbarCols];
    if (updatedToolbarCols[parseInt(e.target.value, 10)]) {
      updatedToolbarCols[parseInt(e.target.value, 10)].checked =
        e.target.checked;
      setToolbarCols(updatedToolbarCols);
    }
  }

  function onSortByChange(value: string) {
    if (sortBySplits.length > 1) {
      if (sortBySplits[0] === value) {
        if (sortBySplits[1] === "ASC") {
          props.onSortByChange(`${value} DESC`);
        } else {
          props.onSortByChange(`${value} ASC`);
        }
      } else {
        props.onSortByChange(`${value} ASC`);
      }
    } else {
      props.onSortByChange(`${value} ASC`);
    }
  }

  React.useEffect(() => {
    setToolbarCols(
      props.columns.map((c, index) => ({ name: c.name, checked: true, index }))
    );
  }, [props.columns]);

  const visibleColumnsIndexes = filter(toolbarCols, { checked: true }).map(
    (c) => c.index
  );

  return (
    <React.Fragment
      css={`
        display: relative;
      `}
    >
      <TableToolbar
        title={props.title}
        light={props.light}
        search={props.search}
        columns={toolbarCols}
        onSearchChange={props.onSearchChange}
        onColumnViewSelectionChange={onColumnViewSelectionChange}
      />
      <TableContainer>
        <Table aria-label="Simple table">
          <TableHead>
            <TableRow>
              {props.columns.map(
                (column: FundingTableColumn, index: number) => {
                  let icon = undefined;
                  if (
                    sortBySplits.length > 1 &&
                    sortBySplits[0] === column.key
                  ) {
                    if (sortBySplits[1] === "DESC") {
                      icon = <ArrowDownward />;
                    } else {
                      icon = <ArrowUpward />;
                    }
                  }
                  return (
                    <TableCell
                      key={column.key}
                      css={`
                        ${index === 0 ? "padding-left: 40px;" : ""}

                        > button {
                          ${tablecell}
                          padding-left: 0;
                          text-transform: none;

                          > span {
                            font-size: 16px;
                            font-weight: bold;
                            justify-content: flex-start;
                            font-family: "GothamNarrow-Bold", "Helvetica Neue",
                              sans-serif;
                          }
                        }
                      `}
                    >
                      <Button
                        onClick={() => onSortByChange(column.key)}
                        endIcon={icon}
                      >
                        {column.name}
                      </Button>
                    </TableCell>
                  );
                }
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row: FundingTableRow) => (
              <Row
                key={row.name}
                row={row}
                columns={props.columns}
                visibleColumnsIndexes={visibleColumnsIndexes}
                paddingLeft={props.paddingLeft}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div css="width: 100%;height: 25px;" />
    </React.Fragment>
  );
}