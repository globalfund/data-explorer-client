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
import { ReactComponent as EditIcon } from "../asset/edit.svg";
import { ReactComponent as SaveIcon } from "../asset/save.svg";
import { ReactComponent as DeleteIcon } from "../asset/delete.svg";
import { ReactComponent as SearchIcon } from "../asset/search.svg";
import { ReactComponent as SortIcon } from "../asset/sort.svg";
import { v4 } from "uuid";
import { dummyDatasetData, tHeadData } from "./data";
import { tablecss } from "./style";

export default function DataSetTable() {
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
      <Grid
        container
        lg={12}
        css={`
          display: flex;
          justify-content: flex-end;
          align-items: center;
          background: rgba(218, 218, 248, 0.3);
          height: 55px;
          /* border-bottom: 1px solid #e4e4e4; */
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

      <div>
        <TableContainer
          css={`
            width: inherit;
            height: 480px;
            overflow: scroll;
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
                {tHeadData.map((val, index) => {
                  return (
                    <TableCell>
                      {index === 0 ? (
                        <Checkbox
                          onChange={handleCheckAllBox}
                          checked={checkedAll}
                          color="primary"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      ) : (
                        <div
                          css={`
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                          `}
                        >
                          <p
                            css={`
                              text-align: left;
                              line-height: 17px;
                            `}
                          >
                            {val}
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
                      `}
                    >
                      <Checkbox
                        color="primary"
                        checked={data.checked}
                        onChange={(e) => handleCheckBox(e, data.id)}
                      />
                    </TableCell>
                    <TableCell width={80}>{data.Ref}</TableCell>
                    <TableCell width={210}>{data.SectorCode}</TableCell>
                    <TableCell width={210}>{data.SectorNarrative}</TableCell>
                    {/* <TableCell>{data.SectorCode}</TableCell> */}
                    <TableCell width={210}>{data.TransactionValue}</TableCell>
                    <TableCell width={300}>{data.IATIIdentifier}</TableCell>
                    <TableCell width={210}>{data.OrgRef}</TableCell>
                    <TableCell width={210}>{data.email}</TableCell>
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
