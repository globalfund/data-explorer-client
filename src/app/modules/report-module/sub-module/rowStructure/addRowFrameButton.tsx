import { IconButton } from "@material-ui/core";
import { IFramesArray } from "app/modules/report-module/views/create";
import { IRowFrameStructure } from "app/state/recoil/atoms";
import React from "react";
import { v4 } from "uuid";
import { ReactComponent as PlusIcon } from "../../asset/addButton.svg";
import RowFrame from "./rowFrame";

interface Props {
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  framesArray: IFramesArray[];
  rowStructureType: IRowFrameStructure;
  setRowStructureType: React.Dispatch<React.SetStateAction<IRowFrameStructure>>;
  deleteFrame: (index: number) => void;
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
}

export default function AddRowFrameButton(props: Props) {
  const handleAddrowStructureBlock = () => {
    props.setFramesArray([
      ...props.framesArray,
      {
        id: v4(),
        frame: (
          <RowFrame
            rowIndex={props.framesArray.length}
            handleRowFrameItemAddition={props.handleRowFrameItemAddition}
            deleteFrame={() => props.deleteFrame(props.framesArray.length)}
            handleRowFrameStructureTypeSelection={
              props.handleRowFrameStructureTypeSelection
            }
          />
        ),
        content: [],
        contentTypes: [],
        structure: null,
      },
    ]);
    props.setRowStructureType({
      ...props.rowStructureType,
      rowType: "",
      disableAddRowStructureButton: false,
    });
  };
  return (
    <div
      css={`
        border: 1px dashed #adb5bd;
        width: 100%;
        height: 48px;
        display: flex;
        justify-content: center;
      `}
    >
      <IconButton
        onClick={handleAddrowStructureBlock}
        disableRipple={true}
        disabled={props.rowStructureType.disableAddRowStructureButton}
      >
        <PlusIcon />
      </IconButton>
    </div>
  );
}
