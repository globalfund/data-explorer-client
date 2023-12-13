import { ColumnDetailsProps } from "app/components/Table/Preview-table/StatisticalTableToolBox";

export const tableToolBoxData: ColumnDetailsProps = {
  columnName: "Commit date",
  emptyFields: 123,
  rows: 284904,
  uniqueValues: 284904,
  correlation: [
    { name: "Geographic Area", rate: 64.1 },
    { name: "Country", rate: 34.2 },
    { name: "Total Signed", rate: 41.2 },
    { name: "Commit date", rate: 23.5 },
    { name: "Grant Status", rate: 27.3 },
    { name: "Activity Area", rate: 52.3 },
    { name: "Total Budget", rate: 42.9 },
  ],
};

export const barChartdata = [
  { bars: "1", size: "14" },
  { bars: "50", size: "6" },
  { bars: "2", size: "4" },
  { bars: "3", size: "10" },
  { bars: "4", size: "1" },
  { bars: "59", size: "1" },
  { bars: "6", size: "4" },
  { bars: "4199", size: "6" },
];
