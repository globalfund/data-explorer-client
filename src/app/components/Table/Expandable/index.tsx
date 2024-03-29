import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import { appColors } from "app/theme";
import findIndex from "lodash/findIndex";
import Table from "@material-ui/core/Table";
import { useCMSData } from "app/hooks/useCMSData";
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
import { TableToolbar } from "app/components/Table/Expandable/Toolbar";
import {
  TableToolbarCols,
  ExpandableTableProps,
  ExpandableTableRowDocProps,
  ExpandableTableRowProps,
} from "app/components/Table/Expandable/data";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      userSelect: "none",
      borderBottom: `1px solid ${appColors.TABLE.BORDER_BOTTOM_COLOR}`,
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
          transition: background 0.2s ease-in-out;
          background: ${props.paddingLeft
            ? appColors.TABLE.ROW_BACKGROUND_COLOR_1
            : appColors.TABLE.ROW_BACKGROUND_COLOR_2};

          ${row.link || props.row.docCategories || props.row.docs
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
        <TableCell
          css={`
            ${tablecell}
            width: 70%;
            padding-left: ${props.paddingLeft || 40}px;
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
                css={
                  row.link
                    ? ""
                    : `
                  font-weight: bold;
                  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
                `
                }
              >
                {row.name}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell
          css={`
            ${tablecell}
            width: 30%;
            padding-left: ${row.link ? 48 : 55}px;

            @media (max-width: 767px) {
              text-align: right;
            }
          `}
        >
          {row.link ? (
            <DownloadIcon htmlColor={appColors.TABLE.DOWNLOAD_ICON_COLOR} />
          ) : (
            row.count
          )}
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
                        paddingLeft={!isMobile ? 62 : 40}
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
                      paddingLeft={!isMobile ? 85 : 62}
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
  const [toolbarCols, setToolbarCols] = React.useState<TableToolbarCols[]>([]);
  const cmsData = useCMSData({ returnData: true });

  function onColumnViewSelectionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedToolbarCols = [...toolbarCols];
    const fColIndex = findIndex(toolbarCols, { name: e.target.name });
    if (fColIndex > -1) {
      updatedToolbarCols[fColIndex].checked = e.target.checked;
      setToolbarCols(updatedToolbarCols);
    }
  }

  React.useEffect(() => {
    setToolbarCols(
      props.columns.map((c, index) => ({ name: c, checked: true, index }))
    );
  }, [props.columns]);

  return (
    <TableContainer>
      <TableToolbar
        title={get(cmsData, "componentsTable.documents", "")}
        search={props.search}
        columns={toolbarCols}
        onSearchChange={props.onSearchChange}
        onColumnViewSelectionChange={onColumnViewSelectionChange}
      />
      <Table aria-label="Expandable table">
        <TableHead>
          <TableRow>
            {filter(toolbarCols, { checked: true }).map(
              (column: TableToolbarCols, index: number) => (
                <TableCell
                  style={
                    index === 0
                      ? {
                          fontSize: 16,
                          paddingLeft: 40,
                        }
                      : {
                          fontSize: 16,
                        }
                  }
                  css={tablecell}
                  key={column.name}
                >
                  <b>{column.name}</b>
                </TableCell>
              )
            )}
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
