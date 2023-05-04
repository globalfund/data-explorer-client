import React from "react";
import { v4 } from "uuid";
import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import { appColors } from "app/theme";
import { Link } from "react-router-dom";
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
import { TableToolbar } from "app/components/Table/Expandable/Toolbar";
import { TableToolbarCols } from "app/components/Table/Expandable/data";
import {
  cellData,
  cellData2,
} from "app/modules/viz-module/sub-modules/fundingRequests/table/data-wrappers/data";

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
  forceExpand?: boolean;
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
  index: number;
  columns: FundingTableColumn[];
  paddingLeft: number;
  visibleColumnsIndexes: number[];
  forceExpand?: boolean;
}) {
  const classes = useRowStyles();
  const [open, setOpen] = React.useState(props.forceExpand);

  const [rowSelected, setRowSelected] = React.useState(
    props.forceExpand ? "child" : "parent"
  );

  const secondLevelRow = !find(props.columns, { key: "name" });

  const thirdLevelRow = secondLevelRow && !find(props.columns, { key: "date" });

  return (
    <React.Fragment>
      {thirdLevelRow && props.index === 0 && (
        <TableRow>
          {cellData2.map((name, index) => (
            <TableCell
              key={v4()}
              css={`
                text-align: center;
                padding: 16px 10px;
                // padding-left: ${index === 0 ? "4rem" : "auto"};
                ${tablecell}
              `}
            >
              <div
                css={`
                  width: 100%;
                  display: flex;
                  align-items: center;
                  flex-direction: row;
                  justify-content: center;
                `}
              >
                <div
                  css={`
                    gap: 12px;
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    justify-content: center;
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
      <TableRow
        className={classes.root}
        id="funding-requests-table-row"
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
              padding: 16px 10px;
              ${index === 0 && !secondLevelRow
                ? `padding-left: ${props.paddingLeft}rem;`
                : ""}
              ${tablecell}
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
                  justify-content: ${secondLevelRow ? "center" : "initial"};
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
                    margin-left: -12px;
                    transition: transform 0.1s ease-in-out;
                    transform: rotate(${open ? "0deg" : "-180deg"});
                  }
                `}
              >
                {index === 0 &&
                  props.row.children &&
                  props.row.children.length > 0 && <TriangleXSIcon />}
                {column.key === "grant" ? (
                  <Link
                    css={`
                      color: ${appColors.TABLE.ROW_TEXT_COLOR};
                    `}
                    to={`/grant/${get(props.row, column.key, "")}/${get(
                      props.row,
                      "ip",
                      ""
                    )}`}
                  >
                    {get(props.row, column.key, "")}
                  </Link>
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
                {rowSelected === "child" &&
                  props.index === 0 &&
                  !secondLevelRow && (
                    <TableRow>
                      {cellData.map((name, index) => (
                        <TableCell
                          key={v4()}
                          css={`
                            text-align: center;
                            padding: 16px 10px;
                            // padding-left: ${index === 0 ? "4rem" : "auto"};
                            ${tablecell}
                          `}
                        >
                          <div
                            css={`
                              width: 100%;
                              display: flex;
                              align-items: center;
                              flex-direction: row;
                              justify-content: center;
                            `}
                          >
                            <div
                              css={`
                                gap: 12px;
                                display: flex;
                                align-items: center;
                                flex-direction: row;
                                justify-content: center;
                                font-weight: bold;
                                font-family: "GothamNarrow-Bold",
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
                                  transform: rotate(
                                    ${open ? "0deg" : "-180deg"}
                                  );
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
                  props.row.children.map(
                    (child: FundingTableRow, index: number) =>
                      (
                        filter(
                          props.columns,
                          (c) => c.col
                        ) as FundingTableColumn[]
                      ).map((childCol) => {
                        return (
                          <Row
                            row={child}
                            index={index}
                            key={child.name}
                            forceExpand={props.forceExpand}
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

export function FundingRequestTable(props: FundingTableProps) {
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
    <div
      css={`
        display: relative;
      `}
    >
      <TableToolbar
        title={props.title}
        search={props.search}
        columns={toolbarCols}
        multiVizPageDataKey="fundingRequest"
        onSearchChange={props.onSearchChange}
        onColumnViewSelectionChange={onColumnViewSelectionChange}
      />
      <TableContainer>
        <Table>
          {!props.forceExpand && (
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
                          padding: 16px 10px;
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
          )}
          <TableBody>
            {props.rows.map((row: FundingTableRow, index: number) => (
              <Row
                key={row.name}
                row={row}
                index={index}
                columns={props.columns}
                visibleColumnsIndexes={visibleColumnsIndexes}
                paddingLeft={props.paddingLeft}
                forceExpand={props.forceExpand}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div css="width: 100%;height: 25px;" />
    </div>
  );
}
