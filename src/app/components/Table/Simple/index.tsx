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
import { useHistory } from "react-router-dom";

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
  title: string;
}) {
  const classes = useRowStyles();
  const [open, setOpen] = React.useState(Boolean(props.forceExpand));
  const history = useHistory();
  const firstColumnWidth = props.columns.length > 3 ? "30%" : "";
  const firstColumnPadding = props.paddingLeft ? props.paddingLeft : 40;
  const columnWidthCalc =
    props.title === "Grants"
      ? "85%"
      : `${props.columns.length > 3 ? "70%" : "100%"} / ${
          props.columns.length
        }`;

  const handleRowClick = () => {
    if (props.row.children) {
      setOpen(!open);
    }
    if (props.title === "Grants") {
      const value = get(props.row, "id", "");
      history.push(`/grant/${value}`);
    }
  };

  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        onClick={handleRowClick}
        css={`
          transition: background 0.2s ease-in-out;
          background: ${props.paddingLeft
            ? appColors.TABLE.ROW_BACKGROUND_COLOR_1
            : appColors.TABLE.ROW_BACKGROUND_COLOR_2};

          ${props.row.children || props.title === "Grants"
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
                width: calc(${columnWidthCalc});
                ${index === 0
                  ? `padding-left: ${firstColumnPadding}px;width: ${firstColumnWidth}`
                  : ""}
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
                    display: ${props.title == "Grants" ? "block" : "flex"};
                    align-items: center;
                    flex-direction: row;
                    max-width: 500px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-weight: ${index === 0 ? "bold" : "normal"};
                    font-family: "GothamNarrow-${index === 0 ? "Bold" : "Book"}",
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
                  props.row.children.map((child: SimpleTableRow) => (
                    <Row
                      row={child}
                      key={child.name}
                      paddingLeft={40}
                      title={props.title}
                      columns={props.columns}
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
      <TableToolbar
        title={props.title}
        search={props.search}
        columns={toolbarCols}
        onSearchChange={props.onSearchChange}
        onColumnViewSelectionChange={onColumnViewSelectionChange}
      />
      <TableContainer>
        <Table aria-label="Simple table">
          <TableHead>
            <TableRow>
              {filter(
                props.columns,
                (_c, index) => visibleColumnsIndexes.indexOf(index) > -1
              ).map((column: SimpleTableColumn, index: number) => {
                let icon = undefined;
                const monetaryColumn =
                  column.name.indexOf("(USD)") > -1 || column.name === "Grants";
                if (sortBySplits.length > 1 && sortBySplits[0] === column.key) {
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
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row: SimpleTableRow) => (
              <Row
                key={row.name}
                row={row}
                title={props.title}
                columns={props.columns}
                forceExpand={props.forceExpand}
                formatNumbers={props.formatNumbers}
                visibleColumnsIndexes={visibleColumnsIndexes}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div css="width: 100%;height: 25px;" />
    </React.Fragment>
  );
}
