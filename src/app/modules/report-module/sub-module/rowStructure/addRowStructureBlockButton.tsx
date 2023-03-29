import { IconButton } from "@material-ui/core";
import { IFramesArray } from "app/modules/report-module/views/create";
import { rowFrameStructureAtom } from "app/state/recoil/atoms";
import React from "react";
import { useRecoilState } from "recoil";
import { ReactComponent as PlusIcon } from "../../asset/addButton.svg";
import RowStructureBlock from "./rowstructureSampleBlock";

interface Props {
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  framesArray: IFramesArray[];
}

export default function AddRowStructureBlockButton(props: Props) {
  const [rowstructure, setRowStructure] = useRecoilState(rowFrameStructureAtom);

  const handleAddrowStructureBlock = () => {
    props.setFramesArray([
      ...props.framesArray,
      { frame: <RowStructureBlock /> },
    ]);
    setRowStructure({
      ...rowstructure,
      rowType: "",
      disableAddRowStructureButton: true,
    });
  };
  return (
    <div
      css={`
        border: 1px dashed #adb5bd;
        width: 916px;
        height: 48px;
        display: flex;
        justify-content: center;
      `}
    >
      <IconButton
        onClick={handleAddrowStructureBlock}
        disableRipple={true}
        disabled={rowstructure.disableAddRowStructureButton}
      >
        <PlusIcon />
      </IconButton>
    </div>
  );
}
