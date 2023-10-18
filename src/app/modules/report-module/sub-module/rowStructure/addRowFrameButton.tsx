import React from "react";
import { v4 } from "uuid";
import IconButton from "@material-ui/core/IconButton";
import { IFramesArray } from "app/modules/report-module/views/create/data";
import { ReactComponent as PlusIcon } from "app/modules/report-module/asset/add-img.svg";

import { IRowFrameStructure, chartHolderAtom } from "app/state/recoil/atoms";
import { Tooltip, withStyles } from "@material-ui/core";
import { useDrop } from "react-dnd";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import { useRecoilState } from "recoil";

interface AddRowFrameProps {
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  framesArray: IFramesArray[];
  rowStructureType: IRowFrameStructure;
  setRowStructureType: React.Dispatch<React.SetStateAction<IRowFrameStructure>>;
  handlePersistReportState: () => void;
  handleRowFrameItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    height: number
  ) => void;
}
const DarkTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "#262C34",
  },
}))(Tooltip);

export default function AddRowFrameButton(props: AddRowFrameProps) {
  const [_, setIsHoldingChartValue] = useRecoilState(chartHolderAtom);
  const handleAddrowStructureBlock = (value?: string) => {
    const id = v4();
    //handles when chart is dropped on rowframe. It stores chart id and row id which will be picked up in RowStructure Component
    if (value) {
      setIsHoldingChartValue({
        rowId: id,
        state: false,
        chartId: value,
      });
    }
    props.setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));
      return [
        ...tempPrev,
        {
          id,
          frame: {
            rowId: id,
            rowIndex: tempPrev.length,
            handlePersistReportState: props.handlePersistReportState,
            handleRowFrameItemResize: props.handleRowFrameItemResize,
            type: "rowFrame",
          },
          content: [],
          contentWidths: [],
          contentHeights: [],
          contentTypes: [],
          structure: null,
          isHandleOpen: false,
        },
      ];
    });

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
      if (item.type === ReportElementsType.ROWFRAME) {
        handleAddrowStructureBlock();
      } else if (item.type === ReportElementsType.CHART) {
        handleAddrowStructureBlock(item.value);
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
            onClick={() => handleAddrowStructureBlock()}
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
