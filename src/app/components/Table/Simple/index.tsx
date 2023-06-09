import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { appColors } from "app/theme";
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
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { TableToolbar } from "app/components/Table/Expandable/Toolbar";
import { TableToolbarCols } from "app/components/Table/Expandable/data";
import {
  SimpleTableColumn,
  SimpleTableProps,
  SimpleTableRow,
} from "app/components/Table/Simple/data";
import { useLocation } from "react-router-dom";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      userSelect: "none",
      borderBottom: `1px solid ${appColors.TABLE.BORDER_BOTTOM_COLOR}`,
    },
  },
});

function Row(props: {
  row: SimpleTableRow;
  columns: SimpleTableColumn[];
  paddingLeft?: number;
  visibleColumnsIndexes: number[];
  formatNumbers?: boolean;
  forceExpand?: boolean;
  condensed?: boolean;
  rowIndex: number;
  parentIndex: null | number;
}) {
  const classes = useRowStyles();
  const location = useLocation();
  const isEligibilityTable = location.pathname.includes("eligibility/table");
  let rowExpanded = Boolean(props.forceExpand);
  if (isEligibilityTable) {
    if (props.parentIndex === 0) {
      if (
        (props.rowIndex === 0 || props.rowIndex === 1) &&
        props.row.children
      ) {
        rowExpanded = true;
      }
    }
  }

  const [open, setOpen] = React.useState(rowExpanded);
  const firstColBig =
    props.columns[0].key !== "year" && props.columns[0].key !== "level1"
      ? props.columns.length > 3
      : false;

  const firstColumnWidth = firstColBig ? "30%" : "";
  const firstColumnPadding = props.paddingLeft ? props.paddingLeft : 40;
  const columnWidthCalc = `${firstColBig ? "70%" : "100%"} / ${
    props.columns.length
  }`;

  return (
    <React.Fragment>
      <TableRow
        id="simple-table-row"
        className={classes.root}
        onClick={() => {
          if (props.row.children) {
            setOpen(!open);
          }
        }}
        css={`
          transition: background 0.2s ease-in-out;
          background: ${props.paddingLeft || props.condensed
            ? appColors.TABLE.ROW_BACKGROUND_COLOR_1
            : appColors.TABLE.ROW_BACKGROUND_COLOR_2};

          ${props.row.children
            ? `
          :hover {
            cursor: pointer;
            background: ${appColors.TABLE.ROW_BACKGROUND_HOVER_COLOR};

            > td {
              color: ${appColors.TABLE.ROW_TEXT_HOVER_COLOR};
            }
            
            path {
              fill: ${appColors.TABLE.ROW_TEXT_HOVER_COLOR};
            }
          }
          `
            : ""};
        `}
      >
        {filter(
          props.columns,
          (_c, index) => props.visibleColumnsIndexes.indexOf(index) > -1
        ).map((column: SimpleTableColumn, index: number) => {
          const value = get(props.row, column.key, "");
          let formattedValue =
            props.formatNumbers &&
            !Number.isNaN(parseInt(value)) &&
            column.name.indexOf("(USD)") > -1
              ? formatFinancialValue(value, true)
              : value;
          return (
            <TableCell
              key={column.key}
              css={`
                ${tablecell}
                font-weight: ${props.row.children ? 700 : "normal"};
                font-family: "GothamNarrow-${props.row.children
                    ? "Bold"
                    : "Book"}",
                  "Helvetica Neue", sans-serif;
                width: calc(${columnWidthCalc});
                ${index === 0
                  ? `padding-left: ${firstColumnPadding}px;width: ${firstColumnWidth};`
                  : ""}
                ${props.condensed ? "font-size: 12px;" : ""}
              `}
            >
              <div
                css={`
                  width: 100%;
                  display: flex;
                  align-items: center;
                  flex-direction: row;
                  justify-content: ${!Number.isNaN(parseInt(value)) &&
                  (column.name.indexOf("(USD)") > -1 ||
                    column.name === "Grants")
                    ? "flex-end"
                    : "flex-start"};
                `}
              >
                <div
                  css={`
                    gap: 12px;
                    display: flex;
                    align-items: center;
                    flex-direction: row;

                    color: ${column.valueToColorMap
                      ? column.valueToColorMap[value]
                      : "inherit"};

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
                  {formattedValue}
                </div>
              </div>
            </TableCell>
          );
        })}
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
                {props.row.children &&
                  props.row.children.map((child: SimpleTableRow, index) => (
                    <Row
                      row={child}
                      rowIndex={index}
                      parentIndex={props.rowIndex}
                      key={child.name}
                      paddingLeft={40}
                      columns={props.columns}
                      condensed={props.condensed}
                      forceExpand={props.forceExpand}
                      formatNumbers={props.formatNumbers}
                      visibleColumnsIndexes={props.visibleColumnsIndexes}
                    />
                  ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function SimpleTable(props: SimpleTableProps) {
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
    <React.Fragment>
      <div
        css={`
          min-height: 600px;

          ${props.condensed &&
          `.MuiToolbar-root {
            padding: 0 24px;
            min-height: 48px;
            max-height: 48px;
            background: ${appColors.COMMON.SECONDARY_COLOR_7};

            > div:first-of-type {
              font-size: 14px;
            }
          }`}
        `}
      >
        <TableToolbar
          title={props.title}
          search={props.search}
          columns={toolbarCols}
          onSearchChange={props.onSearchChange}
          multiVizPageDataKey={props.multiVizPageDataKey}
          onColumnViewSelectionChange={onColumnViewSelectionChange}
        />
        <TableContainer>
          <Table aria-label="Simple table">
            <TableHead>
              <TableRow
                css={
                  props.condensed
                    ? `background: ${appColors.TABLE.ROW_BACKGROUND_COLOR_2};`
                    : ""
                }
              >
                {filter(
                  props.columns,
                  (_c, index) => visibleColumnsIndexes.indexOf(index) > -1
                ).map((column: SimpleTableColumn, index: number) => {
                  let icon = undefined;
                  const monetaryColumn =
                    column.name.indexOf("(USD)") > -1 ||
                    column.name === "Grants";
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
                      ${monetaryColumn ? "text-align: right;" : ""}

                      > button {
                        ${tablecell}
                        text-transform: none;
                        padding-${monetaryColumn ? "right" : "left"}: 0;

                        > span {
                          ${props.condensed ? "font-size: 12px;" : ""}
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
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row: SimpleTableRow, index: number) => (
                <Row
                  key={row.name}
                  row={row}
                  rowIndex={index}
                  parentIndex={index}
                  columns={props.columns}
                  condensed={props.condensed}
                  forceExpand={props.forceExpand}
                  formatNumbers={props.formatNumbers}
                  visibleColumnsIndexes={visibleColumnsIndexes}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div css="width: 100%;height: 25px;" />
      </div>
    </React.Fragment>
  );
}
