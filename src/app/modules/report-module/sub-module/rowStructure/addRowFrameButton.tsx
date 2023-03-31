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
}

export default function AddRowFrameButton(props: Props) {
  const handleAddrowStructureBlock = () => {
    props.setFramesArray([
      ...props.framesArray,
      {
        frame: <RowFrame />,
        id: v4(),
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
