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
import { ReactComponent as EditIcon } from "../../asset/edit.svg";
import { ReactComponent as DeleteIcon } from "../../asset/delete.svg";
import { ReactComponent as SearchIcon } from "../../asset/search.svg";
import { ReactComponent as SortIcon } from "../../asset/sort.svg";
import { v4 } from "uuid";
import { dummyDatasetData, tHeadData } from "../../data";
import { tablecss } from "./style";

interface DatasetTableProps {
  showCharType?: boolean;
  showCheckBox?: boolean;
}
export const TableTop = () => {
  return (
    <Grid
      container
      lg={12}
      css={`
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: rgba(218, 218, 248, 0.3);
        height: 55px;
        padding: 0 1rem;
      `}
    >
      <div
        css={`
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 20%;
        `}
      >
        <IconButton
          css={`
            padding: 0;
          `}
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          css={`
            padding: 0;
          `}
        >
          <EditIcon />
        </IconButton>{" "}
        <IconButton
          css={`
            padding: 0;
          `}
        >
          <DeleteIcon />
        </IconButton>
        <button
          css={`
            border: none;
            outline: none;
            background: none;
          `}
        >
          <p
            css={`
              color: #262c34;
              font-weight: 500;
              font-size: 14px;
              font-family: "Inter";
            `}
          >
            More actions
          </p>
        </button>
      </div>
    </Grid>
  );
};

export default function DatasetTable(props: DatasetTableProps) {
  const [checkedAll, setCheckedAll] = useState(false);
  const [tableData, setTableData] = useState(
    dummyDatasetData.map((data) => ({ ...data, checked: false, id: v4() }))
  );
  const handleCheckAllBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedAll(event.target.checked);
    setTableData(
      tableData.map((data) => ({ ...data, checked: event.target.checked }))
    );
  };

  const handleCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const transformedData = tableData.map((data) => {
      if (data.id === id) {
        return { ...data, checked: e.target.checked };
      } else {
        return data;
      }
    });
    setTableData(transformedData);
  };

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
            }
            &::-webkit-scrollbar-track {
              background: #dfe3e6;
              width: 7.64px;
            }
            &::-webkit-scrollbar-thumb {
              background: #231d2c;
              border-radius: 23px;
            }
          `}
        >
          <Table css={tablecss}>
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
                <TableCell>
                  {props.showCheckBox ? (
                    <Checkbox
                      onChange={handleCheckAllBox}
                      checked={checkedAll}
                      color="primary"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  ) : (
                    ""
                  )}
                </TableCell>
                {tHeadData.map((val, index) => {
                  return (
                    <>
                      <TableCell>
                        <div
                          css={`
                            display: flex;
                          `}
                        >
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
