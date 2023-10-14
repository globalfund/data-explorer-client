import React from "react";
import { v4 } from "uuid";
import IconButton from "@material-ui/core/IconButton";
import { IFramesArray } from "app/modules/report-module/views/create/data";
import RowFrame from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import { ReactComponent as PlusIcon } from "app/modules/report-module/asset/add-img.svg";

import {
  IRowFrameStructure,
  ReportContentWidthsType,
  chartHolderAtom,
} from "app/state/recoil/atoms";
import { Tooltip, withStyles } from "@material-ui/core";
import { useDrop } from "react-dnd";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import { useRecoilState } from "recoil";

interface AddRowFrameProps {
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
    itemContentType: "text" | "divider" | "chart" | "image"
  ) => void;
  handleRowFrameStructureTypeSelection: (
    rowIndex: number,
    structure:
      | null
      | "oneByOne"
      | "oneByTwo"
      | "oneByThree"
      | "oneByFour"
      | "oneToFour"
      | "fourToOne"
      | "twoToThree"
      | "threeToTwo"
  ) => void;
  handleRowFrameItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    reportContentWidths: ReportContentWidthsType[],
    height: number
  ) => void;
  toggleRowFrameHandle: (rowId: string, state: boolean) => void;
}
const DarkTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "#262C34",
  },
}))(Tooltip);

export default function AddRowFrameButton(props: AddRowFrameProps) {
  const [_, setIsHoldingChartValue] = useRecoilState(chartHolderAtom);
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
            toggleRowFrameHandle={props.toggleRowFrameHandle}
          />
        ),
        content: [],
        contentWidths: [],
        contentHeights: [],
        contentTypes: [],
        structure: null,
        isHandleOpen: false,
      },
    ]);
    props.setRowStructureType({
      ...props.rowStructureType,
      rowType: "",
      disableAddRowStructureButton: false,
    });
  };
  const [_dropContent, drop] = useDrop(() => ({
    accept: [ReportElementsType.ROWFRAME, ReportElementsType.CHART],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
    drop: (item: any) => {
      console.log(drop, "isDropOver");
      if (item.type === ReportElementsType.ROWFRAME) {
        handleAddrowStructureBlock();
      } else if (item.type === ReportElementsType.CHART) {
        setIsHoldingChartValue({
          state: false,
          chartId: item.value,
        });
        handleAddrowStructureBlock();
      }
    },
  }));

  return (
    <div
      css={`
        width: 100%;
      `}
      ref={drop}
    >
      <DarkTooltip title="Add new row frame" placement="bottom">
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
                svg {
                  border: 2px solid #252c34;
                  border-radius: 50%;
                  background: #252c34;
                  path {
                    fill: #dfe3e5;
                  }
                }
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
