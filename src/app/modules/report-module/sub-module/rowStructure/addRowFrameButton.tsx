import React from "react";
import { v4 } from "uuid";
import IconButton from "@material-ui/core/IconButton";
import { IFramesArray } from "app/modules/report-module/views/create/data";
import RowFrame from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import { ReactComponent as PlusIcon } from "app/modules/report-module/asset/add-img.svg";
import {
  IRowFrameStructure,
  ReportContentWidthsType,
} from "app/state/recoil/atoms";
import { Tooltip, withStyles } from "@material-ui/core";

interface Props {
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  framesArray: IFramesArray[];
  rowStructureType: IRowFrameStructure;
  setRowStructureType: React.Dispatch<React.SetStateAction<IRowFrameStructure>>;
  deleteFrame: (id: string) => void;
  handleRowFrameItemRemoval: (rowId: string, itemIndex: number) => void;
  handlePersistReportState: () => void;
  handleRowFrameItemAddition: (
    rowId: string,
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
  handleRowFrameItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    reportContentWidths: ReportContentWidthsType[]
  ) => void;
}
const DarkTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "#262C34",
  },
}))(Tooltip);

export default function AddRowFrameButton(props: Props) {
  const [displayTooltip, setDisplayTooltip] = React.useState<boolean>(false);

  const handleAddrowStructureBlock = () => {
    const id = v4();
    props.setFramesArray([
      ...props.framesArray,
      {
        id,
        frame: (
          <RowFrame
            rowId={id}
            rowIndex={props.framesArray.length}
            handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
            handleRowFrameItemAddition={props.handleRowFrameItemAddition}
            deleteFrame={props.deleteFrame}
            handleRowFrameStructureTypeSelection={
              props.handleRowFrameStructureTypeSelection
            }
            handlePersistReportState={props.handlePersistReportState}
            handleRowFrameItemResize={props.handleRowFrameItemResize}
          />
        ),
        content: [],
        contentWidths: [],
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
        width: 100%;
      `}
    >
      <DarkTooltip title="Add new row frame" placement="bottom" color="pink">
        <div
          css={`
            width: 100%;
            display: flex;
            padding: 3px 0;
            background: transparent;
            justify-content: center;
            border: 1px dashed #adb5bd;
            border-radius: 8px;
            height: 48px;
            cursor: pointer;
          `}
        >
          <IconButton
            disableRipple
            onClick={handleAddrowStructureBlock}
            disabled={props.rowStructureType.disableAddRowStructureButton}
            css={`
              padding: 4px;
              &:hover {
                background: transparent;
              }
              svg {
                width: 24px;
                height: 24px;
              }
            `}
          >
            <PlusIcon />
          </IconButton>
        </div>
      </DarkTooltip>
    </div>
  );
}
