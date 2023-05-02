import React from "react";
import orderBy from "lodash/orderBy";
import { useUpdateEffect } from "react-use";
import DataGrid, { SortColumn } from "react-data-grid";

import {
  getColumnsFromData,
  DataThemesDataTableProps,
} from "app/modules/data-themes-module/components/data-table/data";
import PreviewTable from "app/components/Table/Preview-table";
import { ChartRepresentationProps } from "app/components/Table/Preview-table/StatisticalRepresentations";
import {
  barChartdata,
  tableToolBoxData,
} from "app/components/Table/Preview-table/data";

export function DatasetDataTable(props: DataThemesDataTableProps) {
  const containerEl = React.useRef<HTMLDivElement>(null);
  const [data, setData] = React.useState<
    { [key: string]: number | string | null | boolean }[]
  >([]);

  const getColumns = (
    data: { [key: string]: number | string | null | boolean }[]
  ) => {
    let columns = [];
    for (let key in data?.[0]) {
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

  //statistical representation for preview table
  const [columnDetails, setColumnDetails] = React.useState(tableToolBoxData);

  const domRef = React.useRef<HTMLDivElement>(null);
  const [renderedChartMappedData, setRenderedChartMappedData] =
    React.useState<{ bars: string; size: string }[]>(barChartdata);

  const [visualOptions, setVisualOptions] = React.useState({
    barWidth: 15.84,
    background: "transparent",
    color: "#000000",
    splitLineY: false,
    width: "100%",
    height: 100,
    marginBottom: 20,
    showXAxis: true,
    realTimeSort: false,
    xAxisLineColor: "#ADB5BD",
    xAxisLabelColor: "#262C34",
    barRadius: [2, 2, 0, 0],
    xAxisLabelInterval: (index: number) => {
      return index === 0 || index === renderedChartMappedData.length - 1;
    },
  });

  const chartOptions: ChartRepresentationProps = {
    containerId: "chart-placeholder",

    domRef,
    visualOptions,
    renderedChartMappedData,
    setRenderedChartMappedData,
  };

  return (
    <div
      ref={containerEl}
      css={`
        width: 100%;
        height: calc(100vh - 312px);

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
        setTableData={setData}
        columns={getColumns(data)}
        chartOptions={chartOptions}
        columnDetails={columnDetails}
      />
    </div>
  );
}
