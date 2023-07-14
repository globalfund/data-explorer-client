import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUpdateEffect } from "react-use";
import IconButton from "@material-ui/core/IconButton";
import { useLocation, useParams } from "react-router-dom";
import { itemSpacing, containerGap } from "app/modules/report-module/data";
import RowstructureDisplay from "app/modules/report-module/sub-module/rowStructure";
import { ReactComponent as CloseIcon } from "app/modules/report-module/asset/closeIcon.svg";
import { ReactComponent as DeleteIcon } from "app/modules/report-module/asset/deleteIcon.svg";
import {
  ReportContentWidthsType,
  chartHolderAtom,
  reportContentWidthsAtom,
} from "app/state/recoil/atoms";
import {
  blockcss,
  containercss,
} from "app/modules/report-module/sub-module/rowStructure/style";
import { MoreVert } from "@material-ui/icons";
import { RowStructureType } from "../../views/create/data";

const _rowStructureDetailItems = [
  [{ rowType: "oneByOne", rowId: "oneByOne-1", width: "100%", factor: 1 }],
  [
    {
      rowType: "oneByTwo",
      rowId: "oneByTwo-1",
      width: `calc(50% - ${itemSpacing})`,
      factor: 0.5,
    },
    {
      rowType: "oneByTwo",
      rowId: "oneByTwo-2",
      width: `calc(50% - ${itemSpacing})`,
      factor: 0.5,
    },
  ],
  [
    {
      rowType: "oneByThree",
      rowId: "oneByThree-1",
      width: `calc(100% / 3 - ${itemSpacing})`,
      factor: 0.33,
    },
    {
      rowType: "oneByThree",
      rowId: "oneByThree-2",
      width: `calc(100% / 3 - ${itemSpacing})`,
      factor: 0.33,
    },
    {
      rowType: "oneByThree",
      rowId: "oneByThree-3",
      width: `calc(100% / 3 - ${itemSpacing})`,
      factor: 0.33,
    },
  ],
  [
    {
      rowType: "oneByFour",
      rowId: "oneByFour-1",
      width: `calc(100% / 4 - ${itemSpacing})`,
      factor: 0.25,
    },
    {
      rowType: "oneByFour",
      rowId: "oneByFour-2",
      width: `calc(100% / 4 - ${itemSpacing})`,
      factor: 0.25,
    },
    {
      rowType: "oneByFour",
      rowId: "oneByFour-3",
      width: `calc(100% / 4 - ${itemSpacing})`,
      factor: 0.25,
    },
    {
      rowType: "oneByFour",
      rowId: "oneByFour-4",
      width: `calc(100% / 4 - ${itemSpacing})`,
      factor: 0.25,
    },
  ],

  [
    {
      rowType: "oneToFour",
      rowId: "oneToFour-1",
      width: `calc(20% - ${itemSpacing})`,
      factor: 0.2,
    },
    {
      rowType: "oneToFour",
      rowId: "oneToFour-2",
      width: `calc(80% - ${itemSpacing})`,
      factor: 0.8,
    },
  ],
  [
    {
      rowType: "fourToOne",
      rowId: "fourToOne-1",
      width: `calc(80% - ${itemSpacing})`,
      factor: 0.8,
    },
    {
      rowType: "fourToOne",
      rowId: "fourToOne-2",
      width: `calc(20% - ${itemSpacing})`,
      factor: 0.2,
    },
  ],

  [
    {
      rowType: "twoToThree",
      rowId: "twoToThree-1",
      width: `calc(40% - ${itemSpacing})`,
      factor: 0.4,
    },
    {
      rowType: "twoToThree",
      rowId: "twoToThree-2",
      width: `calc(60% - ${itemSpacing})`,
      factor: 0.6,
    },
  ],

  [
    {
      rowType: "threeTotwo",
      rowId: "threeTotwo-1",
      width: `calc(60% - ${itemSpacing})`,
      factor: 0.6,
    },
    {
      rowType: "threeTotwo",
      rowId: "threeTotwo-2",
      width: `calc(40% - ${itemSpacing})`,
      factor: 0.4,
    },
  ],
];

export interface RowFrameProps {
  rowIndex: number;
  rowId: string;
  deleteFrame: (id: string) => void;
  forceSelectedType?: string;
  handleRowFrameItemAddition: (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart" | "image"
  ) => void;
  handleRowFrameItemRemoval: (rowId: string, itemIndex: number) => void;
  handleRowFrameStructureTypeSelection: (
    rowIndex: number,
    structure: RowStructureType
  ) => void;
  handleRowFrameItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    reportContentWidths: ReportContentWidthsType[]
  ) => void;
  previewItems?: (string | object)[];
  handlePersistReportState: () => void;
  toggleRowFrameHandle: (rowId: string, state: boolean) => void;
}

export interface IRowStructureType {
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  isHoldingChartValue: {
    state: boolean;
    chartId: string;
  };
  setIsHoldingChartValue: (value: { state: boolean; chartId: string }) => void;
}

export default function RowFrame(props: RowFrameProps) {
  const [selectedType, setSelectedType] = React.useState<string>(
    props.forceSelectedType || ""
  );
  const [isHoldingChartValue, setIsHoldingChartValue] =
    useRecoilState(chartHolderAtom);

  const [selectedTypeHistory, setSelectedTypeHistory] = React.useState<
    string[]
  >([""]);
  const [rowStructureDetailItems, setRowStructureDetailItems] = React.useState<
    {
      rowId: string;
      width: number;
      rowType: string;
      factor: number;
    }[][]
  >([]);

  let contentContainer = document.getElementById("content-container");
  const onContentContainerResize = () => {
    if (contentContainer) {
      const contentContainerWidth = contentContainer.offsetWidth;
      const newItems = _rowStructureDetailItems.map((item) => {
        return item.map((subitem) => ({
          ...subitem,
          width: contentContainerWidth * subitem.factor,
        }));
      });
      setRowStructureDetailItems(newItems);
    }
  };

  const reportContentWidths = useRecoilValue(reportContentWidthsAtom);

  const onRowBoxItemResize = (
    rowId: string,
    itemIndex: number,
    width: number
  ) => {
    props.handleRowFrameItemResize(
      rowId,
      itemIndex,
      width,
      reportContentWidths
    );
  };

  React.useEffect(() => {
    setSelectedType(selectedTypeHistory[selectedTypeHistory.length - 1]);
  }, [selectedTypeHistory]);

  React.useEffect(() => {
    if (contentContainer) {
      onContentContainerResize();
      contentContainer.addEventListener("resize", onContentContainerResize);
    }
    return () => {
      if (contentContainer) {
        contentContainer.removeEventListener(
          "resize",
          onContentContainerResize
        );
      }
    };
  }, []);

  React.useEffect(() => {
    if (props.forceSelectedType) {
      setSelectedType(props.forceSelectedType);
    }
  }, [props.forceSelectedType]);

  useUpdateEffect(() => {
    props.handleRowFrameStructureTypeSelection(
      props.rowIndex,
      selectedType as
        | "oneByOne"
        | "oneByTwo"
        | "oneByThree"
        | "oneByFour"
        | "oneToFour"
        | "fourToOne"
        | "twoToThree"
        | "threeToTwo"
    );
  }, [selectedType]);

  if (!contentContainer || rowStructureDetailItems.length === 0)
    return <div>loading</div>;

  const checkSelectedType = {
    oneByOne: (
      <RowstructureDisplay
        gap={containerGap}
        height={316}
        rowId={props.rowId}
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[0]}
        handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
        onRowBoxItemResize={onRowBoxItemResize}
        handlePersistReportState={props.handlePersistReportState}
        toggleRowFrameHandle={props.toggleRowFrameHandle}
      />
    ),
    oneByTwo: (
      <RowstructureDisplay
        gap={containerGap}
        height={316}
        rowIndex={props.rowIndex}
        rowId={props.rowId}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[1]}
        handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
        onRowBoxItemResize={onRowBoxItemResize}
        handlePersistReportState={props.handlePersistReportState}
        toggleRowFrameHandle={props.toggleRowFrameHandle}
      />
    ),
    oneByThree: (
      <RowstructureDisplay
        gap={containerGap}
        height={316}
        rowId={props.rowId}
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[2]}
        handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
        onRowBoxItemResize={onRowBoxItemResize}
        handlePersistReportState={props.handlePersistReportState}
        toggleRowFrameHandle={props.toggleRowFrameHandle}
      />
    ),
    oneByFour: (
      <RowstructureDisplay
        gap={containerGap}
        height={316}
        rowId={props.rowId}
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[3]}
        handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
        onRowBoxItemResize={onRowBoxItemResize}
        handlePersistReportState={props.handlePersistReportState}
        toggleRowFrameHandle={props.toggleRowFrameHandle}
      />
    ),

    oneToFour: (
      <RowstructureDisplay
        gap={containerGap}
        height={316}
        rowId={props.rowId}
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[4]}
        handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
        onRowBoxItemResize={onRowBoxItemResize}
        handlePersistReportState={props.handlePersistReportState}
        toggleRowFrameHandle={props.toggleRowFrameHandle}
      />
    ),
    fourToOne: (
      <RowstructureDisplay
        gap={containerGap}
        height={316}
        rowIndex={props.rowIndex}
        rowId={props.rowId}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[5]}
        handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
        onRowBoxItemResize={onRowBoxItemResize}
        handlePersistReportState={props.handlePersistReportState}
        toggleRowFrameHandle={props.toggleRowFrameHandle}
      />
    ),
    twoToThree: (
      <RowstructureDisplay
        gap={containerGap}
        height={316}
        rowIndex={props.rowIndex}
        rowId={props.rowId}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[6]}
        handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
        onRowBoxItemResize={onRowBoxItemResize}
        handlePersistReportState={props.handlePersistReportState}
        toggleRowFrameHandle={props.toggleRowFrameHandle}
      />
    ),
    threeToTwo: (
      <RowstructureDisplay
        gap={containerGap}
        height={316}
        rowIndex={props.rowIndex}
        rowId={props.rowId}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[7]}
        handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
        onRowBoxItemResize={onRowBoxItemResize}
        handlePersistReportState={props.handlePersistReportState}
        toggleRowFrameHandle={props.toggleRowFrameHandle}
      />
    ),
  };

  return (
    <>
      {selectedType ? (
        <>{checkSelectedType[selectedType as keyof typeof checkSelectedType]}</>
      ) : (
        <div css={containercss}>
          <p>Select your row structure</p>
          <IconButton
            css={`
              top: -5px;
              right: -5px;
              position: absolute;
            `}
            onClick={() => {
              props.deleteFrame(props.rowId);
            }}
          >
            <CloseIcon />
          </IconButton>
          <div
            css={`
              width: 75%;
              margin: auto;
              display: grid;
              grid-template-columns: auto auto auto auto;
              /* flex-wrap: wrap; */
              column-gap: 65px;
              align-items: center;
              justify-content: center;
            `}
          >
            <OneByOne
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              isHoldingChartValue={isHoldingChartValue}
              setIsHoldingChartValue={setIsHoldingChartValue}
            />
            <OneByTwo
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              isHoldingChartValue={isHoldingChartValue}
              setIsHoldingChartValue={setIsHoldingChartValue}
            />
            <OneByThree
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              isHoldingChartValue={isHoldingChartValue}
              setIsHoldingChartValue={setIsHoldingChartValue}
            />
            <OneByFour
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              isHoldingChartValue={isHoldingChartValue}
              setIsHoldingChartValue={setIsHoldingChartValue}
            />

            <OneToFour
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              isHoldingChartValue={isHoldingChartValue}
              setIsHoldingChartValue={setIsHoldingChartValue}
            />
            <FourToOne
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              isHoldingChartValue={isHoldingChartValue}
              setIsHoldingChartValue={setIsHoldingChartValue}
            />
            <TwoToThree
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              isHoldingChartValue={isHoldingChartValue}
              setIsHoldingChartValue={setIsHoldingChartValue}
            />
            <ThreeToTwo
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              isHoldingChartValue={isHoldingChartValue}
              setIsHoldingChartValue={setIsHoldingChartValue}
            />
          </div>
        </div>
      )}
    </>
  );
}

const OneByOne = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("oneByOne");
    if (props.isHoldingChartValue.chartId !== "") {
      props.setIsHoldingChartValue({
        ...props.isHoldingChartValue,
        state: true,
      });
    }
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/1</p>
      <div>
        <div
          css={`
            background: #dfe3e6;
            height: 56px;
            width: 95px;
          `}
        />
      </div>
    </div>
  );
};

const OneByTwo = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("oneByTwo");
    if (props.isHoldingChartValue.chartId !== "") {
      props.setIsHoldingChartValue({
        ...props.isHoldingChartValue,
        state: true,
      });
    }
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/2</p>
      <div
        css={`
          display: grid;
          grid-template-columns: auto auto;
          gap: 7.8px;
          width: 95px;
          div {
            background: #dfe3e6;
            height: 56px;
          }
        `}
      >
        <div />
        <div />
      </div>
    </div>
  );
};

const OneByThree = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("oneByThree");
    if (props.isHoldingChartValue.chartId !== "") {
      props.setIsHoldingChartValue({
        ...props.isHoldingChartValue,
        state: true,
      });
    }
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/3</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 29px 26px 26px;
          gap: 8px;
          width: 109px;
          div {
            background: #dfe3e6;
            height: 56px;
          }
        `}
      >
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

const OneByFour = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("oneByFour");
    if (props.isHoldingChartValue.chartId !== "") {
      props.setIsHoldingChartValue({
        ...props.isHoldingChartValue,
        state: true,
      });
    }
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/4</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 19.2px 17.65px 17.65px 17.65px;
          gap: 7.6px;
          width: 95px;
          div {
            background: #dfe3e6;
            height: 56px;
          }
        `}
      >
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

const OneToFour = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("oneToFour");
    if (props.isHoldingChartValue.chartId !== "") {
      props.setIsHoldingChartValue({
        ...props.isHoldingChartValue,
        state: true,
      });
    }
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/4</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 28px 61px;
          gap: 9px;
          width: 95px;
          div {
            background: #dfe3e6;
            height: 56px;
          }
        `}
      >
        <div />
        <div />
      </div>
    </div>
  );
};

const FourToOne = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("fourToOne");
    if (props.isHoldingChartValue.chartId !== "") {
      props.setIsHoldingChartValue({
        ...props.isHoldingChartValue,
        state: true,
      });
    }
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>4/1</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 72% 18%;
          gap: 9px;
          width: 95px;
          div {
            background: #dfe3e6;
            height: 56px;
          }
        `}
      >
        <div />
        <div />
      </div>
    </div>
  );
};
const TwoToThree = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("twoToThree");
    if (props.isHoldingChartValue.chartId !== "") {
      props.setIsHoldingChartValue({
        ...props.isHoldingChartValue,
        state: true,
      });
    }
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>2/3</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 28px 61px;
          gap: 11px;
          width: 95px;
          div {
            background: #dfe3e6;
            height: 56px;
          }
        `}
      >
        <div />
        <div />
      </div>
    </div>
  );
};
const ThreeToTwo = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("threeToTwo");
    if (props.isHoldingChartValue.chartId !== "") {
      props.setIsHoldingChartValue({
        ...props.isHoldingChartValue,
        state: true,
      });
    }
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>3/2</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 61px 28px;
          gap: 11px;
          width: 95px;
          div {
            background: #dfe3e6;
            height: 56px;
          }
        `}
      >
        <div />
        <div />
      </div>
    </div>
  );
};

export function Divider(props: {
  dividerId: string;
  delete: (id: string) => void;
}) {
  const [menuDisplay, setMenuDisplay] = React.useState(false);

  return (
    <div
      css={`
        width: 100%;
        padding: 4px;
        display: flex;
        position: relative;
        button {
          padding: 0;
          svg {
            width: 20px;
            height: 20px;
          }
        }
      `}
    >
      <div>
        {menuDisplay && (
          <IconButton
            css={`
              display: flex;
              align-items: center;
              justify-content: center;
              width: 36px;
              height: 36px;
              border-radius: 100px;
              background: #cfd4da;
              top: -4px;
              left: -6rem;
              position: absolute;
            `}
            onClick={() => props.delete(props.dividerId)}
          >
            <DeleteIcon fontSize={"inherit"} />
          </IconButton>
        )}

        <IconButton
          onClick={() => {
            setMenuDisplay(!menuDisplay);
          }}
          css={`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 100px;
            background: #cfd4da;
            color: #262c34;
            border: ${menuDisplay ? "1px solid #262c34" : "none"};
            top: -4px;
            left: -3.15rem;
            position: absolute;
          `}
        >
          <MoreVert color="inherit" />
        </IconButton>
      </div>

      <hr
        css={`
          width: 100%;
          margin: 0 0 50px 0;
          border: 2px solid #cfd4da;
        `}
      />
    </div>
  );
}
