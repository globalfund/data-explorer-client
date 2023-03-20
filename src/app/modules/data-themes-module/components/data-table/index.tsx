/* third-party */
import React from "react";
import orderBy from "lodash/orderBy";
import { useUpdateEffect } from "react-use";
import DataGrid, { SortColumn } from "react-data-grid";
/* third-party */
import {
  getColumnsFromData,
  DataThemesDataTableProps,
} from "app/modules/data-themes-module/components/data-table/data";
import PreviewTable from "app/fragments/datasets-fragment/component/table";

export function DataThemesDataTable(props: DataThemesDataTableProps) {
  const containerEl = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState<
    { [key: string]: number | string | null | boolean }[]
  >([]);

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
    columnKey: "_id",
    direction: "ASC",
  });

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
    setData(
      props.data?.map(
        (item: { [key: string]: number | string | null }, index: number) => ({
          ...item,
          _id: index + 1,
        })
      )
    );
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
        width: calc(100% - 24px);
        height: calc(100vh - 225px);
        margin-top: 2rem;

        > div {
          height: 100%;
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
        setTableData={setData}
        columns={getColumns(data)}
      />
      {/* <DataGrid
        rows={data}
        rowHeight={48}
        headerRowHeight={88}
        sortColumns={[sort]}
        onSortColumnsChange={handleSort}
        columns={getColumnsFromData(
          props.data,
          containerEl.current?.getBoundingClientRect().width
        )}
      /> */}
    </div>
  );
}
