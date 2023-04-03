import { IconButton } from "@material-ui/core";
import { IRowFrameStructure } from "app/state/recoil/atoms";
import React from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import RowstructureDisplay from ".";
import { IFramesArray } from "../../views/create";
import { blockcss, containercss } from "./style";
import { ReactComponent as CloseIcon } from "../../asset/closeIcon.svg";

export interface RowFrameProps {
  deleteFrame: () => void;
  forceSelectedType?: string;
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
        gap="60.59px"
        height="360.63px"
        gridTemplateColumns="1fr"
        deleteFrame={props.deleteFrame}
        rowStructureDetailItems={[{ rowType: "oneByOne", rowId: "" }]}
        setSelectedType={setSelectedType}
        setSelectedTypeHistory={setSelectedTypeHistory}
        selectedTypeHistory={selectedTypeHistory}
        selectedType={selectedType}
      />
    ),
    oneByTwo: (
      <RowstructureDisplay
        gap="60.59px"
        height="360.63px"
        gridTemplateColumns="1fr 1fr"
        deleteFrame={props.deleteFrame}
        rowStructureDetailItems={Array(2).fill({
          rowType: "oneByTwo",
          rowId: "",
        })}
        setSelectedType={setSelectedType}
        setSelectedTypeHistory={setSelectedTypeHistory}
        selectedTypeHistory={selectedTypeHistory}
        selectedType={selectedType}
      />
    ),
    oneByThree: (
      <RowstructureDisplay
        gap="68.2px"
        height="360.63px"
        deleteFrame={props.deleteFrame}
        gridTemplateColumns="27.79% 1fr 1fr"
        rowStructureDetailItems={Array(3).fill({
          rowType: "oneByThree",
          rowId: "",
        })}
        setSelectedType={setSelectedType}
        setSelectedTypeHistory={setSelectedTypeHistory}
        selectedTypeHistory={selectedTypeHistory}
        selectedType={selectedType}
      />
    ),
    oneByFour: (
      <RowstructureDisplay
        gap="60.59px"
        height="122.61px"
        deleteFrame={props.deleteFrame}
        gridTemplateColumns="19.68% 1fr 1fr 1fr"
        rowStructureDetailItems={Array(4).fill({
          rowType: "oneByFour",
          rowId: "",
        })}
        setSelectedType={setSelectedType}
        setSelectedTypeHistory={setSelectedTypeHistory}
        selectedTypeHistory={selectedTypeHistory}
        selectedType={selectedType}
      />
    ),
    oneByFive: (
      <RowstructureDisplay
        gap="60.81px"
        height="121.67px"
        deleteFrame={props.deleteFrame}
        gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
        rowStructureDetailItems={Array(5).fill({
          rowType: "oneByFive",
          rowId: "",
        })}
        setSelectedType={setSelectedType}
        setSelectedTypeHistory={setSelectedTypeHistory}
        selectedTypeHistory={selectedTypeHistory}
        selectedType={selectedType}
      />
    ),
    oneToFour: (
      <RowstructureDisplay
        gap="60.95px"
        height="360.63px"
        gridTemplateColumns="36% 1fr"
        deleteFrame={props.deleteFrame}
        rowStructureDetailItems={Array(2).fill({
          rowType: "oneToFour",
          rowId: "",
        })}
        setSelectedType={setSelectedType}
        setSelectedTypeHistory={setSelectedTypeHistory}
        selectedTypeHistory={selectedTypeHistory}
        selectedType={selectedType}
      />
    ),
    fourToOne: (
      <RowstructureDisplay
        gap="60.95px"
        height="360.63px"
        gridTemplateColumns="1fr 36%"
        deleteFrame={props.deleteFrame}
        rowStructureDetailItems={Array(2).fill({
          rowType: "fourToOne",
          rowId: "",
        })}
        setSelectedType={setSelectedType}
        setSelectedTypeHistory={setSelectedTypeHistory}
        selectedTypeHistory={selectedTypeHistory}
        selectedType={selectedType}
      />
    ),
  };

  React.useEffect(() => {
    if (props.forceSelectedType) {
      setSelectedType(props.forceSelectedType);
    }
  }, [props.forceSelectedType]);

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
