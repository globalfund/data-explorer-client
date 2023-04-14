import { Box } from "@material-ui/core";
import React, { useState } from "react";
import DataParserToolBox from "../component/dataParserToolBox";
import { useChartsRawData } from "app/hooks/useChartsRawData";
import { DatasetDataTable } from "../component/data-table";

interface Props {
  handleNext: () => void;
  datasetId: string;
}
export default function PreviewFragment(props: Props) {
  const [openToolboxPanel, setOpenToolboxPanel] = useState(true);
  const onCloseBtnClick = () => {
    setOpenToolboxPanel(!openToolboxPanel);
  };

  const { loadDataset, sampleData } = useChartsRawData({
    visualOptions: () => {},
    setVisualOptions: () => {},
    setChartFromAPI: () => {},
    chartFromAPI: null,
  });

  React.useEffect(() => {
    loadDataset(`data-themes/sample-data/${props.datasetId}`);
  }, [props.datasetId]);
  console.log(sampleData, "sampleData");

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
        <DatasetDataTable data={sampleData} />
      </div>
      <DataParserToolBox
        onCloseBtnClick={onCloseBtnClick}
        open={openToolboxPanel}
        handleNext={props.handleNext}
      />
    </div>
  );
}
