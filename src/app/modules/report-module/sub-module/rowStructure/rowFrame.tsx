import React from "react";
import { useUpdateEffect } from "react-use";
import IconButton from "@material-ui/core/IconButton";
import RowstructureDisplay from "app/modules/report-module/sub-module/rowStructure";
import { ReactComponent as CloseIcon } from "app/modules/report-module/asset/closeIcon.svg";
import {
  blockcss,
  containercss,
} from "app/modules/report-module/sub-module/rowStructure/style";

const rowStructureDetailItems = [
  [{ rowType: "oneByOne", rowId: "oneByOne-1", width: "100%" }],
  [
    { rowType: "oneByTwo", rowId: "oneByTwo-1", width: "calc(50% - 30px)" },
    { rowType: "oneByTwo", rowId: "oneByTwo-2", width: "calc(50% - 30px)" },
  ],
  [
    {
      rowType: "oneByThree",
      rowId: "oneByThree-1",
      width: "calc(100% / 3 - 30px)",
    },
    {
      rowType: "oneByThree",
      rowId: "oneByThree-2",
      width: "calc(100% / 3 - 30px)",
    },
    {
      rowType: "oneByThree",
      rowId: "oneByThree-3",
      width: "calc(100% / 3 - 30px)",
    },
  ],
  [
    {
      rowType: "oneByFour",
      rowId: "oneByFour-1",
      width: "calc(100% / 4 - 30px)",
    },
    {
      rowType: "oneByFour",
      rowId: "oneByFour-2",
      width: "calc(100% / 4 - 30px)",
    },
    {
      rowType: "oneByFour",
      rowId: "oneByFour-3",
      width: "calc(100% / 4 - 30px)",
    },
    {
      rowType: "oneByFour",
      rowId: "oneByFour-4",
      width: "calc(100% / 4 - 30px)",
    },
  ],
  [
    {
      rowType: "oneByFive",
      rowId: "oneByFive-1",
      width: "calc(100% / 5 - 30px)",
    },
    {
      rowType: "oneByFive",
      rowId: "oneByFive-2",
      width: "calc(100% / 5 - 30px)",
    },
    {
      rowType: "oneByFive",
      rowId: "oneByFive-3",
      width: "calc(100% / 5 - 30px)",
    },
    {
      rowType: "oneByFive",
      rowId: "oneByFive-4",
      width: "calc(100% / 5 - 30px)",
    },
    {
      rowType: "oneByFive",
      rowId: "oneByFive-5",
      width: "calc(100% / 5 - 30px)",
    },
  ],
  [
    { rowType: "oneToFour", rowId: "oneToFour-1", width: "calc(20% - 30px)" },
    { rowType: "oneToFour", rowId: "oneToFour-2", width: "calc(80% - 30px)" },
  ],
  [
    { rowType: "fourToOne", rowId: "fourToOne-1", width: "calc(80% - 30px)" },
    { rowType: "fourToOne", rowId: "fourToOne-2", width: "calc(20% - 30px)" },
  ],
];

export interface RowFrameProps {
  rowIndex: number;
  deleteFrame: () => void;
  forceSelectedType?: string;
  handleRowFrameItemAddition: (
    rowIndex: number,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => void;
  handleRowFrameStructureTypeSelection: (
    rowIndex: number,
    structure:
      | null
      | "oneByOne"
      | "oneByTwo"
      | "oneByThree"
      | "oneByFour"
      | "oneByFive"
      | "oneToFour"
      | "fourToOne"
  ) => void;
  previewItems?: (string | object)[];
}

export interface IRowStructureType {
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
}

export default function RowFrame(props: RowFrameProps) {
  const [selectedType, setSelectedType] = React.useState<string>(
    props.forceSelectedType || ""
  );
  const [selectedTypeHistory, setSelectedTypeHistory] = React.useState<
    string[]
  >([""]);

  React.useEffect(() => {
    setSelectedType(selectedTypeHistory[selectedTypeHistory.length - 1]);
  }, [selectedTypeHistory]);

  const checkSelectedType = {
    oneByOne: (
      <RowstructureDisplay
        gap="60px"
        height="400px"
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[0]}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
      />
    ),
    oneByTwo: (
      <RowstructureDisplay
        gap="60px"
        height="400px"
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[1]}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
      />
    ),
    oneByThree: (
      <RowstructureDisplay
        gap="68px"
        height="460px"
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[2]}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
      />
    ),
    oneByFour: (
      <RowstructureDisplay
        gap="60px"
        height="122px"
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[3]}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
      />
    ),
    oneByFive: (
      <RowstructureDisplay
        gap="60px"
        height="121px"
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[4]}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
      />
    ),
    oneToFour: (
      <RowstructureDisplay
        gap="60px"
        height="400px"
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[5]}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
      />
    ),
    fourToOne: (
      <RowstructureDisplay
        gap="60px"
        height="400px"
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[6]}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
      />
    ),
  };

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
        | "oneByFive"
        | "oneToFour"
        | "fourToOne"
    );
  }, [selectedType]);

  return (
    <>
      {selectedType ? (
        checkSelectedType[selectedType as keyof typeof checkSelectedType]
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
              props.deleteFrame();
              setSelectedType(
                selectedTypeHistory[selectedTypeHistory.length - 2]
              );
            }}
          >
            <CloseIcon />
          </IconButton>
          <div
            css={`
              display: flex;
              align-items: center;
              justify-content: center;
              column-gap: 50px;
              flex-wrap: wrap;
              width: 92%;
              margin: auto;
            `}
          >
            <OneByOne
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <OneByTwo
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <OneByThree
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <OneByFour
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <OneByFive
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <OneToFour
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <FourToOne
              selectedType={selectedType}
              setSelectedType={setSelectedType}
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
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/1</p>
      <div
        css={`
          background: #dfe3e6;
          height: 56px;
          width: 94px;
        `}
      ></div>
    </div>
  );
};

const OneByTwo = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("oneByTwo");
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/2</p>
      <div
        css={`
          display: grid;
          grid-template-columns: auto auto;
          gap: 15px;
          width: 103px;
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
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/3</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 29.4% auto auto;
          gap: 6.3px;
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
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/4</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 25px 23px 23px 23px;
          gap: 8px;
          width: 116px;
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

const OneByFive = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("oneByFive");
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/5</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 19px 18px 18px 18px 18px;
          gap: 5px;
          width: 116px;
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
        <div />
      </div>
    </div>
  );
};

const OneToFour = (props: IRowStructureType) => {
  const handleClick = () => {
    props.setSelectedType("oneToFour");
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>1/4</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 25% 75%;
          gap: 7px;
          width: 116px;
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
  };
  return (
    <div css={blockcss} onClick={handleClick}>
      <p>4/1</p>
      <div
        css={`
          display: grid;
          grid-template-columns: 75% 25%;
          gap: 7px;
          width: 116px;
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
