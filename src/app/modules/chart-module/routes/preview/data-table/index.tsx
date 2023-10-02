/* third-party */
import React from "react";

/* project */
import PreviewTable from "app/components/Table/Preview-table";
import { tableToolBoxData } from "app/components/Table/Preview-table/data";
import { DataTableProps } from "app/modules/chart-module/routes/preview/data-table/data";

export function DataTable(props: DataTableProps) {
  const [data, setData] = React.useState<
    { [key: string]: number | string | null | boolean }[]
  >([]);
  const columnDetails = tableToolBoxData;

  const getColumns = (
    colData: { [key: string]: number | string | null | boolean }[]
  ) => {
    let columns = [];
    for (let key in colData[0]) {
      columns.push({ key: key, type: typeof colData[0][key] });
    }
    return columns;
  };

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div
      css={`
        width: 100%;
        height: calc(100vh - 350px);

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
