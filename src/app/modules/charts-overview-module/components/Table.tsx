import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import MenuIcon from "@material-ui/icons/MoreVert";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import MenuOptions from "app/modules/charts-overview-module/components/menuOptions";

interface Props {
  setTableData: (data: any) => void;
  handleModal: (id?: string) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  data: {
    id: string;
    name: string;
    description: string;
    createdDate: Date;
    menuOptionsDisplay: boolean;
    reports: number;
  }[];
}

export function ChartsTable(props: Props) {
  const handleMenuOptionsDisplay = (id: number) => {
    const newData = props.data.map((data, index: number) => {
      if (index === id) {
        return {
          ...data,
          menuOptionsDisplay: !data.menuOptionsDisplay,
        };
      } else {
        return data;
      }
    });
    props.setTableData(newData);
  };

  return (
    <TableContainer
      css={`
        border-radius: 16px;
        border: 1px solid #dfe3e5;
      `}
    >
      <Table
        css={`
          border-spacing: 0;

          tr > td {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            &:nth-of-type(1) {
              max-width: 50px;
            }
            &:nth-of-type(2) {
              max-width: 400px;
            }
            &:nth-of-type(3) {
              max-width: 350px;
            }
            &:nth-of-type(4) {
              max-width: 200px;
            }
          }
        `}
      >
        <TableHead
          css={`
            background: #f5f5f7;
            > tr > th {
              font-size: 14px;

              font-family: "GothamNarrow-Bold", sans-serif;
            }
          `}
        >
          <TableRow>
            <TableCell width="50px"></TableCell>
            <TableCell width="250px">Chart name</TableCell>
            <TableCell width="400px">Chart type</TableCell>
            <TableCell width="200px">Creation date</TableCell>
            <TableCell width="200px">Updated at</TableCell>
            <TableCell width="200px">Reports used</TableCell>
            <TableCell width="550px"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          css={`
            background: #fff;

            td {
              padding-top: 0;
              padding-bottom: 0;
            }
          `}
        >
          {props.data.map((data, index) => (
            <TableRow
              key={data.id}
              component={Link}
              to={`/chart/${data.id}`}
              css={`
                text-decoration: none;

                &:hover {
                  cursor: pointer
                  background: #dfe3e5;
                }
              `}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.description}</TableCell>
              <TableCell>
                {moment(data.createdDate).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell>
                {moment(data.createdDate).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell>{data.reports}</TableCell>
              <TableCell
                css={`
                  display: flex;
                  position: relative;
                  justify-content: flex-end;

                  button {
                    padding: 4px;

                    div {
                      background: #cfd4da;
                      width: 36px;
                      height: 36px;
                      border-radius: 100px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                    &:hover {
                      background: transparent;
                      cursor: pointer;
                      div {
                        border: 1px solid #262c34;
                        background: #dfe3e5;
                      }
                    }
                  }

                  > div {
                    > div:nth-of-type(2) {
                      top: 2px;
                      right: 60px;
                    }
                  }
                `}
              >
                <IconButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMenuOptionsDisplay(index);
                  }}
                >
                  <div>
                    <MenuIcon />
                  </div>
                </IconButton>
                {data.menuOptionsDisplay && (
                  <MenuOptions
                    id={data.id}
                    setModalType={props.setModalType}
                    handleModal={() => props.handleModal(data.id)}
                    showMenuOptions={() => handleMenuOptionsDisplay(index)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
