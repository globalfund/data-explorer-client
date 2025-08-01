import React from "react";
import Box from "@mui/material/Box";
import { TableProps } from "app/components/table/data";
import "tabulator-tables/dist/css/tabulator_simple.min.css";
import { RowComponent, TabulatorFull as Tabulator } from "tabulator-tables";

const ExpandElement = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:0 4px -4px 0;position:absolute;right:0;"><path d="M3.88754 5L2.75 6.13754L8.43766 11.8252L14.1253 6.13756L12.9878 5.00002L8.43768 9.55015L3.88754 5Z" fill="#373D43"/></svg>`;
const CollapseElement = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:0 4px -4px 0;position:absolute;right:0;"><path d="M13.348 11.3986L14.4144 10.3322L9.08223 5L3.75 10.3322L4.81644 11.3987L9.08223 7.13287L13.348 11.3986Z" fill="#373D43"/></svg>`;

export const Table: React.FC<TableProps> = (props: TableProps) => {
  const tableBuiltRef = React.useRef(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      let dataTreeStartExpanded:
        | boolean
        | boolean[]
        | ((row: RowComponent, level: number) => boolean)
        | undefined = false;
      if (props.dataTreeStartExpanded) {
        dataTreeStartExpanded = Boolean(props.dataTreeStartExpanded);
      } else if (props.dataTreeStartExpandedFn) {
        dataTreeStartExpanded = props.dataTreeStartExpandedFn;
      }
      const table = new Tabulator(ref.current, {
        height: props.data.length > 20 ? "500px" : "auto",
        data: props.data,
        selectable: false,
        reactiveData: true,
        layout: "fitDataFill",
        columns: props.columns,
        dataTreeChildIndent: 10,
        dataTree: props.dataTree,
        renderVertical: "virtual",
        renderVerticalBuffer: 100,
        dataTreeExpandElement: ExpandElement,
        dataTreeCollapseElement: CollapseElement,
        dataTreeBranchElement: props.dataTreeBranchElement,
        dataTreeStartExpanded,
      });

      table.on("tableBuilt", () => {
        tableBuiltRef.current = true;
      });
      if (props.dataTree) {
        table.on("rowClick", (_e, row) => {
          if (row.isTreeExpanded()) {
            row.treeCollapse();
          } else {
            row.treeExpand();
          }
        });
      }

      if (props.dataTreeStartExpanded || props.dataTreeStartExpandedFn) {
        setTimeout(() => {
          table.redraw();
        }, 500);
      }

      if (props.setTable) {
        props.setTable(table);
      }
    }
  }, []);

  React.useEffect(() => {
    if (ref.current && tableBuiltRef.current) {
      const tables = Tabulator.findTable(`#${props.id}`);
      if (tables.length > 0 && tables[0]) {
        tables[0].replaceData(props.data);
      }
    }
  }, [props.data, tableBuiltRef.current]);

  return (
    <Box
      ref={ref}
      id={props.id}
      border="1px solid #CFD4DA"
      data-cy="table"
      sx={{
        ".tabulator-col-title, .tabulator-cell": {
          color: "#373D43",
          fontSize: "12px",
        },
        ".tabulator-col-content, .tabulator-cell": {
          // background: "#F1F3F5",
        },
        ".tabulator-col-title": {
          fontWeight: "bold",
        },
        ".tabulator-header": {
          borderColor: "#CFD4DA",
        },
        ".tabulator-col": {
          background: "#F1F3F5 !important",
          "&:first-of-type": {
            // background: "#DFE3E5 !important",
          },
        },
        ".tabulator-row": {
          "> .tabulator-cell:first-of-type": {
            // background: "#F1F3F5 !important",
          },
          "&:hover": {
            background: "#F6F7F7",
            borderColor: "#CFD4DA",
          },
        },
      }}
    />
  );
};
