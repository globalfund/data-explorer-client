/* third-party */
import React from "react";
import orderBy from "lodash/orderBy";
import { useUpdateEffect } from "react-use";
import { SortColumn } from "react-data-grid";
/* project */
import PreviewTable from "app/components/Table/Preview-table";
import { tableToolBoxData } from "app/components/Table/Preview-table/data";
import { DataThemesDataTableProps } from "app/modules/data-themes-module/components/data-table/data";

export function DataThemesDataTable(props: DataThemesDataTableProps) {
  const [data, setData] = React.useState<
    { [key: string]: number | string | null | boolean }[]
  >([]);
  const [columnDetails, setColumnDetails] = React.useState(tableToolBoxData);

  const getColumns = (
    data: { [key: string]: number | string | null | boolean }[]
  ) => {
    let columns = [];
    for (let key in data[0]) {
      columns.push({ key: key, type: typeof data[0][key] });
    }
    return columns;
  };

  const [sort, setSort] = React.useState<SortColumn>({
    columnKey: "",
    direction: "ASC",
  });

  const handleSort = React.useCallback((newSorts: SortColumn[]) => {
    if (newSorts.length === 0) {
      setSort({
        columnKey: "",
        direction: "ASC",
      });
    } else {
      setSort(newSorts[newSorts.length - 1]);
    }
  }, []);

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useUpdateEffect(() => {
    setData(
      orderBy(data, sort.columnKey, sort.direction === "DESC" ? "desc" : "asc")
    );
  }, [sort]);

  return (
    <div
      css={`
        width: 100%;
        height: calc(100vh - 225px);
        margin-top: -1rem;

        > div {
          height: 100%;
          border-style: none;

          * {
            border-color: #e4e4e4;
            outline: none !important;
          }
        }
      `}
    >
      <PreviewTable
        tableData={data}
        placeUnderSubHeader
        dataStats={props.stats}
        columns={getColumns(data)}
        columnDetails={columnDetails}
      />
    </div>
  );
}
