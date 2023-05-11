import React from "react";
import orderBy from "lodash/orderBy";
import { useUpdateEffect } from "react-use";
import { SortColumn } from "react-data-grid";
import PreviewTable from "app/components/Table/Preview-table";
import { tableToolBoxData } from "app/components/Table/Preview-table/data";
import { DataThemesDataTableProps } from "app/modules/data-themes-module/components/data-table/data";

const getColumns = (
  data: { [key: string]: number | string | null | boolean }[]
) => {
  let columns = [];
  for (let key in data?.[0]) {
    columns.push({ key: key, type: typeof data[0][key] });
  }
  return columns;
};

export function DatasetDataTable(props: DataThemesDataTableProps) {
  const containerEl = React.useRef<HTMLDivElement>(null);
  const [columnDetails, setColumnDetails] = React.useState(tableToolBoxData);
  const [sort, setSort] = React.useState<SortColumn>({
    columnKey: "_id",
    direction: "ASC",
  });
  const [data, setData] = React.useState<
    { [key: string]: number | string | null | boolean }[]
  >([]);

  const handleSort = React.useCallback((newSorts: SortColumn[]) => {
    if (newSorts.length === 0) {
      setSort({
        columnKey: "_id",
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
      ref={containerEl}
      css={`
        width: 100%;

        > div {
          background: #fff;
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
