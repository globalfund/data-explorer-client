import { Box } from "@material-ui/core";
import DatasetTable from "app/modules/dataset-detail-module/component/table/datasetTable";
import { dummyDatasetData } from "app/modules/dataset-detail-module/data";
import React, { useState } from "react";
import { v4 } from "uuid";
import DataParserToolBox from "../component/dataParserToolBox";
import PreviewTable from "../component/table";

interface Props {
  handleNext: () => void;
}
export default function PreviewFragment(props: Props) {
  const [openToolboxPanel, setOpenToolboxPanel] = useState(false);
  const onCloseBtnClick = () => {
    setOpenToolboxPanel(!openToolboxPanel);
  };
  const [tableData, setTableData] = React.useState<
    { [key: string]: number | string | null | boolean }[]
  >(dummyDatasetData.map((data) => ({ ...data, checked: false, id: v4() })));
  const getColumns = (
    data: { [key: string]: number | string | null | boolean }[]
  ) => {
    let columns = [];
    for (let key in data[0]) {
      columns.push({ key: key, type: typeof data[0][key] });
    }
    return columns;
  };
  return (
    <div>
      <h1
        css={`
          color: #231d2c;
          font-weight: 500;
          font-size: 48px;
          margin-top: 5.5rem;
        `}
      >
        Preview
      </h1>
      <Box height={27} />
      <div
        css={`
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${openToolboxPanel ? `calc(100% - 217px)` : "100%"};
        `}
      >
        <PreviewTable
          tableData={tableData}
          setTableData={setTableData}
          columns={getColumns(tableData)}
        />
      </div>
      <DataParserToolBox
        onCloseBtnClick={onCloseBtnClick}
        open={openToolboxPanel}
        handleNext={props.handleNext}
      />
    </div>
  );
}
