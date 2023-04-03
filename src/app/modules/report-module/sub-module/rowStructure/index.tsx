import { Grid, IconButton } from "@material-ui/core";
import { IRowFrameStructure } from "app/state/recoil/atoms";
import React from "react";
import { useDrop } from "react-dnd";
import { ReportElmentsType } from "../../components/right-panel-create-view";
import { ReactComponent as RowFrameHandleAdornment } from "../../asset/rowFrameHandleAdornment.svg";
import { ReactComponent as EditIcon } from "../../asset/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../asset/deleteIcon.svg";
import { RichEditor } from "app/modules/chart-module/routes/text/RichEditor";
import { EditorState } from "draft-js";

interface RowStructureDisplayProps {
  gridTemplateColumns: string;
  gap: string;
  height: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  selectedTypeHistory: string[];
  selectedType: string;

  setSelectedTypeHistory: React.Dispatch<React.SetStateAction<string[]>>;
  rowStructureDetailItems: {
    rowType: string;
    rowId: string;
  }[];
  deleteFrame: () => void;
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
              <IconButton
                onClick={() => {
                  props.setSelectedTypeHistory([
                    ...props.selectedTypeHistory,
                    props.selectedType,
                    "",
                  ]);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={props.deleteFrame}>
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
        {props.rowStructureDetailItems.map((row) => (
          <Box height={props.height} key={row.rowId} />
        ))}
      </div>
    </div>
  );
}

export const Box = (props: { height: string }) => {
  const [displayTextBox, setDisplayTextBox] = React.useState(false);
  const [textContent, setTextContent] = React.useState<EditorState>(
    EditorState.createEmpty()
  );
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
            overflow: auto;
            height: ${props.height};
            border: 1px solid #adb5bd;
            max-height: ${props.height};
          `}
        >
          <RichEditor
            editMode={true}
            textContent={textContent}
            setTextContent={setTextContent}
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
