import { Grid, IconButton } from "@material-ui/core";
import { IRowFrameStructure } from "app/state/recoil/atoms";
import React from "react";
import { useDrop } from "react-dnd";
import { ReportElmentsType } from "../../components/right-panel-create-view";
import { ReactComponent as RowFrameHandleAdornment } from "../../asset/rowFrameHandleAdornment.svg";
import { ReactComponent as EditIcon } from "../../asset/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../asset/deleteIcon.svg";

interface RowStructureDisplayProps {
  gridTemplateColumns: string;
  gap: string;
  height: string;
  rowStructureDetailItems: {
    rowType: string;
    rowId: string;
  }[];
}

export default function RowstructureDisplay(props: RowStructureDisplayProps) {
  const [handleDisplay, setHandleDisplay] = React.useState(false);

  return (
    <div
      css={`
        width: 100%;
        margin: 20px 0;
      `}
    >
      <div
        onMouseEnter={() => setHandleDisplay(true)}
        onMouseLeave={() => setHandleDisplay(false)}
        css={`
          width: 100%;
          display: grid;
          position: relative;
          grid-template-columns: ${props.gridTemplateColumns};
          gap: ${props.gap};
          padding: 4px;
          border: ${handleDisplay ? "0.722415px dashed #ADB5BD" : "none"};
        `}
      >
        {handleDisplay && (
          <div
            css={`
              height: 110%;
              display: flex;
              position: absolute;
              left: -4rem;
              top: -5%;
            `}
          >
            <div
              css={`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              `}
            >
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </div>
            <div
              css={`
                background: #adb5bd;
                border-radius: 3.45px;
                transform: matrix(-1, 0, 0, 1, 0, 0);
                display: flex;
                align-items: center;
                width: 23px;

                justify-content: center;
              `}
            >
              <RowFrameHandleAdornment />
            </div>
          </div>
        )}

        {props.rowStructureDetailItems.map((row, index) => (
          <Box height={props.height} key={index} />
        ))}
      </div>
    </div>
  );
}

export const Box = (props: { height: string }) => {
  const [displayTextBox, setDisplayTextBox] = React.useState(false);
  const [{ canDrop, isOver, item }, drop] = useDrop(() => ({
    accept: ReportElmentsType.TEXT,

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
    drop: (item: any, monitor) => {
      if (item.type == "text") {
        setDisplayTextBox(true);
      }
    },
  }));

  if (displayTextBox) {
    return (
      <>
        <div
          css={`
            height: ${props.height};

            border: 1px solid #adb5bd;
          `}
        >
          <textarea
            css={`
              width: 100%;
              height: 100%;
              outline: none;
              padding: 20px;
              font-size: 11.5586px;
              background: #ffffff;
            `}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div
        css={`
          height: ${props.height};
          background: #dfe3e6;
        `}
        ref={drop}
      >
        <p
          css={`
            font-weight: 325;
            font-size: 8.65512px;
            color: #495057;
            text-align: center;
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
          `}
        >
          {isOver ? "Release to drop" : "Drag and drop content here"}
        </p>
      </div>
    </>
  );
};
