import {
  IconButton,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";

import { ReactComponent as SortIcon } from "../../assets/sort.svg";

import { previewTablecss } from "./style";
import StatisticDisplay from "./statisticDisplay";
import StatisticalTableToolBox, {
  ColumnDetailsProps,
} from "../statisticalTableToolBox";
import { ChartRepresentationProps } from "./StatisticalRepresentations";

interface PreviewTableProps {
  columns: { [key: string]: string }[];
  tableData: { [key: string]: number | string | null | boolean }[];
  setTableData: React.Dispatch<
    React.SetStateAction<{ [key: string]: number | string | null | boolean }[]>
  >;
  placeUnderSubHeader?: boolean;
  columnDetails: ColumnDetailsProps;
  chartOptions: ChartRepresentationProps;
}

export default function PreviewTable(props: PreviewTableProps) {
  const [tableRows, setTableRows] = useState(props.tableData);
  React.useEffect(() => {
    setTableRows([{ id: "viz", type: "component" }, ...props.tableData]);
  }, [props.tableData]);
  const [toolboxDisplay, setToolboxDisplay] = useState(false);
  const handleToolBoxDisplay = () => {
    setToolboxDisplay(true);
  };

  return (
    <>
      <div
        css={`
          height: 100%;
        `}
      >
        <TableContainer
          css={`
            width: inherit;
            height: 593px;
            &::-webkit-scrollbar {
              height: 12px;
              border-radius: 23px;
              width: 12px;

              background: #231d2c;
            }
            &::-webkit-scrollbar-track {
              background: #fff;

              padding: 0 0.5rem;
            }
            &::-webkit-scrollbar-track:horizontal {
              border-right: none;
            }
            &::-webkit-scrollbar-thumb {
              background: #231d2c;
              border-radius: 23px;
              border: 3px solid transparent;

              background-clip: content-box;
            }
            overflow: auto;
          `}
        >
          <Table css={previewTablecss}>
            <TableHead
              css={`
                background: #dadaf8;
              `}
            >
              <TableRow
                css={`
                  padding: 0rem 0.4rem;
                `}
              >
                {props.columns.map((val, index) => {
                  return (
                    <TableCell
                      key={val.key}
                      css={`
                        border-left: ${index == 0 ? "none" : "auto"};
                        border-top-left-radius: ${index == 0 ? "5px" : "0"};
                      `}
                    >
                      {index !== 0 && (
                        <div
                          css={`
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            gap: 1rem;
                          `}
                        >
                          <div
                            css={`
                              width: 25px;
                              height: 25px;
                              border-radius: 50%;
                              padding: 3px;
                              justify-content: center;
                              display: flex;
                              align-items: center;
                              background: #ffffff;
                            `}
                          >
                            {val.type === "string" ? "Aa" : "#"}
                          </div>

                          <p
                            css={`
                              text-align: left;
                              line-height: 17px;
                              text-overflow: ellipsis;
                              white-space: nowrap;
                              overflow: clip;
                              max-width: 220px;
                            `}
                          >
                            <b>{val.key}</b>
                          </p>
                          <IconButton>
                            <SortIcon />
                          </IconButton>
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows?.map((data, rowIndex) => (
                <TableRow
                  key={Object.values(data).join("-")}
                  css={`
                    background: ${rowIndex === 0 ? "#F4F4F4" : "#fff"};
                  `}
                >
                  {props.columns.map((val, index) => (
                    <TableCell
                      key={val.key}
                      css={`
                        background: ${rowIndex === 0 ? "#F4F4F4" : "#fff"};
                        color: ${rowIndex === 0
                          ? "#000"
                          : "rgba(0, 0, 0, 0.87)"};
                        font-size: 12px;
                        cursor: ${rowIndex === 0 ? "pointer" : "auto"};
                      `}
                      onClick={() => {
                        if (rowIndex === 0 && index !== 0) {
                          handleToolBoxDisplay();
                        }
                      }}
                    >
                      {rowIndex === 0 ? (
                        <div
                          css={`
                            background: "#F4F4F4";
                          `}
                        >
                          {index == 0 ? (
                            ""
                          ) : (
                            <StatisticDisplay
                              position={index}
                              chartOptions={props.chartOptions}
                            />
                          )}{" "}
                        </div>
                      ) : (
                        <p
                          css={`
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: clip;

                            max-width: 220px;
                            min-width: ${index === 0 ? "30px" : "auto"};
                            text-align: ${index === 0 ? "center" : "left"};
                          `}
                        >
                          {data[val.key]}
                        </p>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {toolboxDisplay && (
        <StatisticalTableToolBox
          {...props.columnDetails}
          position={2}
          handleClose={() => setToolboxDisplay(false)}
          placeUnderSubHeader={props.placeUnderSubHeader as boolean}
        />
      )}
    </>
  );
}
