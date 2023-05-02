import React from "react";
import get from "lodash/get";
import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { tablecell } from "app/components/Table/Simple/styles";
import {
  SimpleTableColumn,
  SimpleTableProps,
  SimpleTableRow,
} from "app/components/Table/Simple/data";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      userSelect: "none",
      borderBottom: "1px solid #DFE3E6",
    },
  },
});

function Row(props: {
  row: SimpleTableRow;
  columns: SimpleTableColumn[];
  paddingLeft?: number;
}) {
  const classes = useRowStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        onClick={() => {
          if (props.row.children) {
            setOpen(!open);
          }
        }}
        css={`
          background: #f4f4f4;
          transition: background 0.2s ease-in-out;

          ${props.row.children
            ? `
          :hover {
            cursor: pointer;
            background: #231d2c;

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
        {props.columns.map((column: SimpleTableColumn, index: number) => (
          <TableCell
            key={column.key}
            css={`
              ${tablecell}
              width: calc(70% / ${props.columns.length - 1});
              ${index === 0
                ? `padding-left: ${props.paddingLeft}px;width: 30%;`
                : ""}
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
                {get(props.row, column.key, "")}
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
                {props.row.children &&
                  props.row.children.map((child: SimpleTableRow) => (
                    <Row
                      row={child}
                      key={child.name}
                      paddingLeft={50}
                      columns={props.columns}
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
  return (
    <React.Fragment>
      <TableContainer>
        <Table aria-label="Simple table">
          <TableHead>
            <TableRow>
              {props.columns.map((column: SimpleTableColumn) => (
                <TableCell
                  key={column.key}
                  css={`
                    ${tablecell}
                    font-weight: bold;
                    font-family: "GothamNarrow-Bold", "Helvetica Neue",
                      sans-serif;
                  `}
                >
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row: SimpleTableRow) => (
              <Row key={row.name} row={row} columns={props.columns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div css="width: 100%;height: 25px;" />
    </React.Fragment>
  );
}
