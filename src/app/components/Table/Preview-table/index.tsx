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

import { ReactComponent as SortIcon } from "../../../fragments/datasets-fragment/assets/sort.svg";

import { previewTablecss } from "./style";

interface PreviewTableProps {
  columns: { [key: string]: string }[];
  tableData: { [key: string]: number | string | null | boolean }[];
  setTableData: React.Dispatch<
    React.SetStateAction<{ [key: string]: number | string | null | boolean }[]>
  >;
}

export default function PreviewTable(props: PreviewTableProps) {
  return (
    <>
      <div>
        <TableContainer
          css={`
            width: inherit;
            height: 480px;
            overflow: auto;
            &::-webkit-scrollbar {
              height: 12px;
              border-radius: 23px;
              width: 12px;

              background: #231d2c;
            }
            &::-webkit-scrollbar-track {
              background: #fff;
              border: 1px solid #e4e4e4;

              padding: 0 0.5rem;
            }
            &::-webkit-scrollbar-track:horizontal {
              border-right: none;
              border-radius: 0px 0px 0px 6px;
            }
            &::-webkit-scrollbar-thumb {
              background: #231d2c;
              border-radius: 23px;
              border: 3px solid transparent;

              background-clip: content-box;
            }
          `}
        >
          <Table css={previewTablecss}>
            <TableHead
              css={`
                background: rgba(218, 218, 248, 0.3);
              `}
            >
              <TableRow
                css={`
                  border: 1px solid #e4e4e4;
                  padding: 0rem 0.4rem;
                  height: 42px;
                `}
              >
                {props.columns.map((val, index) => {
                  return (
                    <TableCell
                      key={val.key}
                      css={`
                        border-left: ${index == 0 ? "none" : "auto"};
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
                              display: none;
                              justify-content: center;
                              align-items: center;
                              background: #ffffff;
                            `}
                          >
                            <p>{val.type === "string" ? "Aa" : "#"}</p>
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
                            {val.key}
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
              {props.tableData?.map((data, index) => (
                <TableRow
                  key={Object.values(data).join("-")}
                  css={`
                    background: #fff;
                  `}
                >
                  {props.columns.map((val, index) => (
                    <TableCell
                      key={val.key}
                      css={`
                        background: ${index === 0
                          ? "rgba(218, 218, 248, 0.3)"
                          : "#fff"};
                      `}
                    >
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
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
