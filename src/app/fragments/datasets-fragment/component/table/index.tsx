import {
  IconButton,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  makeStyles,
  Grid,
  Checkbox,
  Container,
} from "@material-ui/core";
import React, { useState } from "react";

import { ReactComponent as SortIcon } from "../../assets/sort.svg";
import { v4 } from "uuid";
import { tablecss } from "app/modules/dataset-detail-module/component/table/style";
import {
  dummyDatasetData,
  tHeadData,
} from "app/modules/dataset-detail-module/data";
import { previewTablecss } from "./style";

export default function PreviewTable() {
  const [checkedAll, setCheckedAll] = useState(false);
  const [tableData, setTableData] = useState(
    dummyDatasetData.map((data) => ({ ...data, checked: false, id: v4() }))
  );

  return (
    <>
      <div>
        <TableContainer
          css={`
            width: inherit;
            height: 480px;
            overflow: auto;
            &::-webkit-scrollbar {
              height: 5px;
              border-radius: 23px;
              width: 5.64px;
              background: #231d2c;
              padding: 0 0.5rem;
            }
            &::-webkit-scrollbar-track {
              background: #dfe3e6;
              width: 7.64px;
              padding: 0 0.5rem;
            }
            &::-webkit-scrollbar-thumb {
              background: #231d2c;
              border-radius: 23px;
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
                <TableCell></TableCell>
                {tHeadData.map((val, index) => {
                  return (
                    <>
                      <TableCell>
                        <div
                          css={`
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            gap: 1rem;
                          `}
                        >
                          <div>
                            <div
                              css={`
                                width: 25px;
                                height: 25px;
                                border-radius: 50%;
                                padding: 3px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background: #ffffff;
                              `}
                            >
                              <p>{val.type === "char" ? "Aa" : "#"}</p>
                            </div>
                          </div>

                          <p
                            css={`
                              text-align: left;
                              line-height: 17px;
                            `}
                          >
                            {val.name}
                          </p>
                          <IconButton>
                            <SortIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data, index) => (
                <TableRow
                  css={`
                    background: #fff;
                  `}
                >
                  <>
                    <TableCell
                      css={`
                        background: rgba(218, 218, 248, 0.3);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      `}
                      width={47}
                    >
                      <p>{index + 1}</p>
                    </TableCell>
                    <TableCell width={80}>{data.Ref}</TableCell>
                    <TableCell width={"25vw"}>{data.SectorNarrative}</TableCell>
                    <TableCell width={"20vw"}>{data.SectorCode}</TableCell>
                    <TableCell width={"20vw"}>
                      {data.TransactionValue}
                    </TableCell>
                    <TableCell
                      css={`
                        width: 15vw;
                      `}
                    >
                      {data.IATIIdentifier}
                    </TableCell>
                    <TableCell width={"20vw"}>{data.OrgRef}</TableCell>
                    <TableCell width={"20vw"}>{data.email}</TableCell>
                  </>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
