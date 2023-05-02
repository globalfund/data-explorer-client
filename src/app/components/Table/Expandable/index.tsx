import React from "react";
import Table from "@material-ui/core/Table";
import Collapse from "@material-ui/core/Collapse";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import TableContainer from "@material-ui/core/TableContainer";
import { tablecell } from "app/components/Table/Expandable/styles";
import {
  ExpandableTableProps,
  ExpandableTableRowDocProps,
  ExpandableTableRowProps,
} from "app/components/Table/Expandable/data";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      userSelect: "none",
      borderBottom: "1px solid #DFE3E6",
    },
  },
});

function Row(props: {
  row: ExpandableTableRowProps;
  paddingLeft?: number;
  forceExpand?: boolean;
}) {
  const { row } = props;
  const classes = useRowStyles();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [open, setOpen] = React.useState(props.forceExpand);

  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        onClick={() => {
          if (row.link) {
            window.open(row.link, "_blank");
          } else if (props.row.docCategories || props.row.docs) {
            setOpen(!open);
          }
        }}
        css={`
          background: #f4f4f4;
          transition: background 0.2s ease-in-out;

          ${row.link || props.row.docCategories || props.row.docs
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
        <TableCell
          css={`
            ${tablecell}
            width: 70%;
            padding-left: ${props.paddingLeft}px;
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
              {(props.row.docCategories || props.row.docs) && (
                <TriangleXSIcon />
              )}
              <div
                css={`
                  font-weight: bold;
                  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
                `}
              >
                {row.name}
              </div>
            </div>
            {row.link && <DownloadIcon />}
          </div>
        </TableCell>
        <TableCell
          css={`
            ${tablecell}
            width: 30%;

            @media (max-width: 767px) {
              text-align: right;
            }
          `}
        >
          {row.count}
        </TableCell>
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
          colSpan={3}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table>
              <TableBody>
                {props.row.docCategories &&
                  props.row.docCategories.map(
                    (category: ExpandableTableRowProps) => (
                      <Row
                        key={category.name}
                        row={category}
                        forceExpand={props.forceExpand}
                        paddingLeft={!isMobile ? 50 : 40}
                      />
                    )
                  )}
                {props.row.docs &&
                  props.row.docs.map((doc: ExpandableTableRowDocProps) => (
                    <Row
                      key={doc.title}
                      row={{
                        name: doc.title,
                        link: doc.link,
                      }}
                      forceExpand={props.forceExpand}
                      paddingLeft={!isMobile ? 72 : 62}
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

export function ExpandableTable(props: ExpandableTableProps) {
  return (
    <TableContainer>
      <Table aria-label="Expandable table">
        <TableHead>
          <TableRow>
            {props.columns.map((column: string, index: number) => (
              <TableCell
                style={
                  index === 0
                    ? {
                        paddingLeft: 40,
                      }
                    : {}
                }
                css={tablecell}
                key={column}
              >
                <b>{column}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row: ExpandableTableRowProps) => (
            <Row forceExpand={props.forceExpand} key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
