import React from "react";
import get from "lodash/get";
import { useUpdateEffect } from "react-use";
import IconButton from "@material-ui/core/IconButton";
import { useLocation, useParams } from "react-router-dom";
import { itemSpacing, containerGap } from "app/modules/report-module/data";
import RowstructureDisplay from "app/modules/report-module/sub-module/rowStructure";
import { ReactComponent as CloseIcon } from "app/modules/report-module/asset/closeIcon.svg";
import { ReactComponent as DeleteIcon } from "app/modules/report-module/asset/deleteIcon.svg";
import { ReactComponent as RowFrameHandleAdornment } from "app/modules/report-module/asset/rowFrameHandleAdornment.svg";
import {
  blockcss,
  containercss,
} from "app/modules/report-module/sub-module/rowStructure/style";

const rowStructureDetailItems = [
  [{ rowType: "oneByOne", rowId: "oneByOne-1", width: "100%" }],
  [
    {
      rowType: "oneByTwo",
      rowId: "oneByTwo-1",
      width: `calc(50% - ${itemSpacing})`,
    },
    {
      rowType: "oneByTwo",
      rowId: "oneByTwo-2",
      width: `calc(50% - ${itemSpacing})`,
    },
  ],
  [
    {
      rowType: "oneByThree",
      rowId: "oneByThree-1",
      width: `calc(100% / 3 - ${itemSpacing})`,
    },
    {
      rowType: "oneByThree",
      rowId: "oneByThree-2",
      width: `calc(100% / 3 - ${itemSpacing})`,
    },
    {
      rowType: "oneByThree",
      rowId: "oneByThree-3",
      width: `calc(100% / 3 - ${itemSpacing})`,
    },
  ],
  [
    {
      rowType: "oneByFour",
      rowId: "oneByFour-1",
      width: `calc(100% / 4 - ${itemSpacing})`,
    },
    {
      rowType: "oneByFour",
      rowId: "oneByFour-2",
      width: `calc(100% / 4 - ${itemSpacing})`,
    },
    {
      rowType: "oneByFour",
      rowId: "oneByFour-3",
      width: `calc(100% / 4 - ${itemSpacing})`,
    },
    {
      rowType: "oneByFour",
      rowId: "oneByFour-4",
      width: `calc(100% / 4 - ${itemSpacing})`,
    },
  ],
  [
    {
      rowType: "oneByFive",
      rowId: "oneByFive-1",
      width: `calc(100% / 5 - ${itemSpacing})`,
    },
    {
      rowType: "oneByFive",
      rowId: "oneByFive-2",
      width: `calc(100% / 5 - ${itemSpacing})`,
    },
    {
      rowType: "oneByFive",
      rowId: "oneByFive-3",
      width: `calc(100% / 5 - ${itemSpacing})`,
    },
    {
      rowType: "oneByFive",
      rowId: "oneByFive-4",
      width: `calc(100% / 5 - ${itemSpacing})`,
    },
    {
      rowType: "oneByFive",
      rowId: "oneByFive-5",
      width: `calc(100% / 5 - ${itemSpacing})`,
    },
  ],
  [
    {
      rowType: "oneToFour",
      rowId: "oneToFour-1",
      width: `calc(20% - ${itemSpacing})`,
    },
    {
      rowType: "oneToFour",
      rowId: "oneToFour-2",
      width: `calc(80% - ${itemSpacing})`,
    },
  ],
  [
    {
      rowType: "fourToOne",
      rowId: "fourToOne-1",
      width: `calc(80% - ${itemSpacing})`,
    },
    {
      rowType: "fourToOne",
      rowId: "fourToOne-2",
      width: `calc(20% - ${itemSpacing})`,
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
    itemContentType: "text" | "divider" | "chart"
  ) => void;
  handleRowFrameItemRemoval: (rowId: string, itemIndex: number) => void;
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
        gap={containerGap}
        height="400px"
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
      />
    ),
    oneByTwo: (
      <RowstructureDisplay
        gap={containerGap}
        height="420px"
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
      />
    ),
    oneByThree: (
      <RowstructureDisplay
        gap={containerGap}
        height="460px"
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
      />
    ),
    oneByFour: (
      <RowstructureDisplay
        gap={containerGap}
        height="122px"
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
      />
    ),
    oneByFive: (
      <RowstructureDisplay
        gap={containerGap}
        height="121px"
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
      />
    ),
    oneToFour: (
      <RowstructureDisplay
        gap={containerGap}
        height="400px"
        rowId={props.rowId}
        rowIndex={props.rowIndex}
        selectedType={selectedType}
        deleteFrame={props.deleteFrame}
        setSelectedType={setSelectedType}
        selectedTypeHistory={selectedTypeHistory}
        setSelectedTypeHistory={setSelectedTypeHistory}
        rowStructureDetailItems={rowStructureDetailItems[5]}
        handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
        handleRowFrameItemAddition={props.handleRowFrameItemAddition}
        previewItems={props.previewItems}
      />
    ),
    fourToOne: (
      <RowstructureDisplay
        gap={containerGap}
        height="400px"
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
              width: 92%;
              margin: auto;
              display: flex;
              flex-wrap: wrap;
              column-gap: 50px;
              align-items: center;
              justify-content: center;
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
      <div>
        <div
          css={`
            background: #dfe3e6;
            height: 56px;
            width: 94px;
          `}
        />
      </div>
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

export function Divider(props: {
  dividerId: string;
  delete: (id: string) => void;
}) {
  const location = useLocation();
  const { page } = useParams<{ page: string }>();

  const [handleDisplay, setHandleDisplay] = React.useState(false);

  const viewOnlyMode =
    page !== "new" && get(location.pathname.split("/"), "[3]", "") !== "edit";

  const handlers = viewOnlyMode
    ? {}
    : {
        onMouseEnter: () => setHandleDisplay(true),
        onMouseLeave: () => setHandleDisplay(false),
      };

  return (
    <div
      {...handlers}
      css={`
        width: 100%;
        padding: 4px;
        display: flex;
        position: relative;
      `}
    >
      {handleDisplay && (
        <div
          css={`
            top: -4px;
            left: -4rem;
            display: flex;
            position: absolute;
            height: calc(100% + 8px);
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
              flex-direction: column;
              justify-content: center;
            `}
          >
            <IconButton onClick={() => props.delete(props.dividerId)}>
              <DeleteIcon />
            </IconButton>
          </div>
          <div
            css={`
              width: 23px;
              display: flex;
              align-items: center;
              background: #adb5bd;
              border-radius: 3.45px;
              transform: matrix(-1, 0, 0, 1, 0, 0);

              justify-content: center;
            `}
          >
            <RowFrameHandleAdornment />
          </div>
        </div>
      )}
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
