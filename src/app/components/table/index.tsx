import React from "react";
import Box from "@mui/material/Box";
import { TableProps } from "app/components/table/data";
import "tabulator-tables/dist/css/tabulator_simple.min.css";
import { TabulatorFull as Tabulator } from "tabulator-tables";

const ExpandElement = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:0 4px -4px 0;position:absolute;right:0;"><path d="M3.88754 5L2.75 6.13754L8.43766 11.8252L14.1253 6.13756L12.9878 5.00002L8.43768 9.55015L3.88754 5Z" fill="#373D43"/></svg>`;
const CollapseElement = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin:0 4px -4px 0;position:absolute;right:0;"><path d="M13.348 11.3986L14.4144 10.3322L9.08223 5L3.75 10.3322L4.81644 11.3987L9.08223 7.13287L13.348 11.3986Z" fill="#373D43"/></svg>`;

export const Table: React.FC<TableProps> = (props: TableProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [expandedCount, setExpandedCount] = React.useState(0);

  React.useEffect(() => {
    if (ref.current) {
      const table = new Tabulator(ref.current, {
        data: props.data,
        reactiveData: true,
        columns: props.columns,
        dataTreeChildIndent: 10,
        layout: "fitDataStretch",
        dataTree: props.dataTree,
        dataTreeExpandElement: ExpandElement,
        dataTreeCollapseElement: CollapseElement,
        dataTreeBranchElement: props.dataTreeBranchElement,
        dataTreeStartExpanded: Boolean(props.dataTreeStartExpanded),
      });

      table.on("dataTreeRowExpanded", (_, level) => {
        if (level === 0) {
          setExpandedCount((prev) => prev + 1);
        }
      });
      table.on("dataTreeRowCollapsed", (_, level) => {
        if (level === 0) {
          setExpandedCount((prev) => prev - 1);
        }
      });

      if (props.dataTreeStartExpanded) {
        setTimeout(() => {
          table.redraw();
        }, 100);
      }

      return () => {
        table.destroy();
      };
    }
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      const tables = Tabulator.findTable(`#${props.id}`);
      if (tables.length > 0 && tables[0]) {
        if (
          expandedCount > 0 &&
          props.extraColumns &&
          props.extraColumns.length > 0
        ) {
          tables[0].setColumns(props.columns.concat(props.extraColumns));
        } else {
          setTimeout(() => {
            tables[0].setColumns(props.columns);
          }, 1);
        }
      }
    }
  }, [expandedCount, props.columns, props.extraColumns]);

  return (
    <Box
      ref={ref}
      id={props.id}
      border="1px solid #CFD4DA"
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
        },
        ".tabulator-row": {
          "> .tabulator-cell:first-of-type": {
            background: "#F1F3F5",
          },
          "&:hover": {
            background: "#F1F3F5",
            borderColor: "#CFD4DA",
          },
        },
      }}
    />
  );
};
