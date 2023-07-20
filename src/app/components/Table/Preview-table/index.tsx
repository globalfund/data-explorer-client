import React from "react";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import { previewTablecss } from "app/components/Table/Preview-table/style";
import StatisticDisplay from "app/components/Table/Preview-table/statisticDisplay";
import StatisticalTableToolBox, {
  ColumnDetailsProps,
} from "app/components/Table/Preview-table/StatisticalTableToolBox";
import SortIcon from "app/assets/icons/Sort";

type DatastatsType = "bar" | "percentage" | "unique";

interface PreviewTableProps {
  placeUnderSubHeader?: boolean;
  columnDetails: ColumnDetailsProps;
  columns: { [key: string]: string }[];
  tableData: { [key: string]: number | string | null | boolean }[];
  dataStats: {
    name: string;
    type: DatastatsType;
    data: { name: string; value: number }[];
  }[];
}

export default function PreviewTable(props: PreviewTableProps) {
  const [toolboxDisplay, setToolboxDisplay] = React.useState(false);

  return (
    <>
      <div
        css={`
          height: 100%;
          overflow: auto;
        `}
      >
        <TableContainer
          css={`
            height: 100%;
            width: inherit;
            border-radius: 8px;
            border: 1px solid #dfe3e5;
            &::-webkit-scrollbar {
              height: 5px;
              border-radius: 23px;
              width: 5px;
              background: #231d2c;
            }
            &::-webkit-scrollbar-track {
              background: #fff;
            }

            &::-webkit-scrollbar-thumb {
              background: #231d2c;
              border-radius: 23px;
              border: 3px solid transparent;
            }
          `}
        >
          <Table css={previewTablecss}>
            <TableHead
              css={`
                top: 0;
                position: sticky;
                background: #dfe3e5;
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
                              margin: 0;
                              overflow: clip;
                              max-width: 220px;
                              text-align: left;
                              line-height: 17px;
                              white-space: nowrap;
                              text-overflow: ellipsis;
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
              <TableRow
                css={`
                  top: 54px;
                  position: sticky;
                  background: #f9f9f9;
                `}
              >
                {props.dataStats?.map((val) => (
                  <TableCell
                    key={val.name}
                    css={`
                      color: #000;
                      font-size: 12px;
                      // cursor: pointer;
                      background: #f9f9f9;
                    `}
                    // onClick={handleToolBoxDisplay}
                  >
                    {val.name !== "ID" && (
                      <div
                        css={`
                          background: #f9f9f9;
                        `}
                      >
                        <StatisticDisplay type={val.type} data={val.data} />
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
              {props.tableData.map((data) => (
                <TableRow
                  key={Object.values(data).join("-")}
                  css={`
                    background: #fff;
                  `}
                >
                  {props.columns.map((val, index) => (
                    <TableCell key={val.key}>
                      <p
                        css={`
                          margin: 0;
                          overflow: clip;
                          max-width: 220px;
                          white-space: nowrap;
                          text-overflow: ellipsis;
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
