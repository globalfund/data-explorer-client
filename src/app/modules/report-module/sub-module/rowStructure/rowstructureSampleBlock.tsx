import {
  IRowFrameStructure,
  rowFrameStructureAtom,
} from "app/state/recoil/atoms";
import React from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { blockcss, containercss } from "./style";

export interface RowStructureProps {
  rowstructure: IRowFrameStructure;
  setRowStructure: SetterOrUpdater<IRowFrameStructure>;
}

export default function RowStructuresSampleBlock() {
  const [rowstructure, setRowStructure] = useRecoilState(rowFrameStructureAtom);
  return (
    <div css={containercss}>
      <p>Select your row structure</p>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 50px;
          flex-wrap: wrap;
          width: 800px;
        `}
      >
        <OneByOne
          rowstructure={rowstructure}
          setRowStructure={setRowStructure}
        />
        <OneByTwo
          rowstructure={rowstructure}
          setRowStructure={setRowStructure}
        />
        <OneByThree
          rowstructure={rowstructure}
          setRowStructure={setRowStructure}
        />
        <OneByFour
          rowstructure={rowstructure}
          setRowStructure={setRowStructure}
        />
        <OneByFive
          rowstructure={rowstructure}
          setRowStructure={setRowStructure}
        />
        <OneToFour
          rowstructure={rowstructure}
          setRowStructure={setRowStructure}
        />
        <FourToOne
          rowstructure={rowstructure}
          setRowStructure={setRowStructure}
        />
      </div>
    </div>
  );
}

export const OneByOne = (props: RowStructureProps) => {
  const handleClick = () => {
    props.setRowStructure({
      ...props.rowstructure,
      rowType: "oneByOne",
      disableAddRowStructureButton: false,
    });
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

export const OneByTwo = (props: RowStructureProps) => {
  const handleClick = () => {
    props.setRowStructure({
      ...props.rowstructure,
      rowType: "oneByTwo",
      disableAddRowStructureButton: false,
    });
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

export const OneByThree = (props: RowStructureProps) => {
  const handleClick = () => {
    props.setRowStructure({
      ...props.rowstructure,
      rowType: "oneByThree",
      disableAddRowStructureButton: false,
    });
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

export const OneByFour = (props: RowStructureProps) => {
  const handleClick = () => {
    props.setRowStructure({
      ...props.rowstructure,
      rowType: "oneByFour",
      disableAddRowStructureButton: false,
    });
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

export const OneByFive = (props: RowStructureProps) => {
  const handleClick = () => {
    props.setRowStructure({
      ...props.rowstructure,
      rowType: "oneByFive",
      disableAddRowStructureButton: false,
    });
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

export const OneToFour = (props: RowStructureProps) => {
  const handleClick = () => {
    props.setRowStructure({
      ...props.rowstructure,
      rowType: "oneToFour",
      disableAddRowStructureButton: false,
    });
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

export const FourToOne = (props: RowStructureProps) => {
  const handleClick = () => {
    props.setRowStructure({
      ...props.rowstructure,
      rowType: "fourToOne",
      disableAddRowStructureButton: false,
    });
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
