import { Box } from "@material-ui/core";
import DatasetTable from "app/modules/dataset-detail-module/component/table/datasetTable";
import React, { useState } from "react";
import DataParserToolBox from "../component/dataParserToolBox";

export default function ResultFragment() {
  const [showCharType, setShowCharType] = useState(true);
  const [openToolboxPanel, setOpenToolboxPanel] = useState(false);
  const onCloseBtnClick = () => {
    setOpenToolboxPanel(!openToolboxPanel);
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
        Result
      </h1>
      <Box height={27} />
      <div
        css={`
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${openToolboxPanel ? `calc(100% - 217px)` : "100%"};
        `}
      >
        <DatasetTable showCharType={showCharType} />
      </div>
      <DataParserToolBox
        onCloseBtnClick={onCloseBtnClick}
        open={openToolboxPanel}
      />
    </div>
  );
}
