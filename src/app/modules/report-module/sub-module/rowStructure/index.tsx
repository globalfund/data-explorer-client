import React from "react";
import get from "lodash/get";
import { useDrop } from "react-dnd";
import { useDebounce } from "react-use";
import IconButton from "@material-ui/core/IconButton";
import { EditorState, convertFromRaw } from "draft-js";
import { useLocation, useParams } from "react-router-dom";
import { RichEditor } from "app/modules/chart-module/routes/text/RichEditor";
import { ReportChartWrapper } from "app/modules/report-module/components/chart-wrapper";
import { ReactComponent as EditIcon } from "app/modules/report-module/asset/editIcon.svg";
import { ReactComponent as DeleteIcon } from "app/modules/report-module/asset/deleteIcon.svg";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import { ReactComponent as RowFrameHandleAdornment } from "app/modules/report-module/asset/rowFrameHandleAdornment.svg";
import { useRecoilState } from "recoil";
import { unSavedReportPreviewMode } from "app/state/recoil/atoms";

interface RowStructureDisplayProps {
  gap: string;
  height: string;
  rowIndex: number;
  rowId: string;
  selectedType: string;
  deleteFrame: (id: string) => void;
  selectedTypeHistory: string[];
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTypeHistory: React.Dispatch<React.SetStateAction<string[]>>;
  rowStructureDetailItems: {
    rowType: string;
    rowId: string;
    width: string;
  }[];
  handleRowFrameItemAddition: (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => void;
  handleRowFrameItemRemoval: (rowId: string, itemIndex: number) => void;
  previewItems?: (string | object)[];
}

export default function RowstructureDisplay(props: RowStructureDisplayProps) {
  const location = useLocation();
  const { page } = useParams<{ page: string }>();

  const [handleDisplay, setHandleDisplay] = React.useState(false);
  const [reportPreviewMode, __] = useRecoilState(unSavedReportPreviewMode);

  const viewOnlyMode =
    (page !== "new" &&
      get(location.pathname.split("/"), "[3]", "") !== "edit") ||
    reportPreviewMode;

  const handlers = viewOnlyMode
    ? {}
    : {
        onMouseEnter: () => {
          setHandleDisplay(true);
        },
        onMouseLeave: () => setHandleDisplay(false),
      };

  const border =
    !viewOnlyMode && handleDisplay
      ? "0.722415px dashed  #ADB5BD"
      : "0.722415px dashed transparent";

  return (
    <div
      css={`
        width: 100%;
        margin-bottom: ${!viewOnlyMode ? "0px" : "50px"};
      `}
    >
      <div
        {...handlers}
        css={`
          width: 100%;
          padding: 4px;
          display: flex;
          gap: ${props.gap};
          border: ${border};
          position: relative;
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
              <IconButton onClick={() => props.deleteFrame(props.rowId)}>
                <DeleteIcon />
              </IconButton>
            </div>
            <div
              css={`
                width: 23px;
                cursor: grab;
                display: flex;
                align-items: center;
                background: #adb5bd;
                border-radius: 3.45px;
                justify-content: center;
                transform: matrix(-1, 0, 0, 1, 0, 0);
              `}
            >
              <RowFrameHandleAdornment />
            </div>
          </div>
        )}
        {props.rowStructureDetailItems.map((row, index) => (
          <Box
            key={`${row.rowId}-${index}`}
            width={row.width}
            itemIndex={index}
            height={props.height}
            rowId={props.rowId}
            handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
            handleRowFrameItemAddition={props.handleRowFrameItemAddition}
            previewItem={get(props.previewItems, `[${index}]`, undefined)}
          />
        ))}
      </div>
    </div>
  );
}

const Box = (props: {
  width: string;
  height: string;
  rowId: string;
  itemIndex: number;
  handleRowFrameItemRemoval: (rowId: string, itemIndex: number) => void;
  handleRowFrameItemAddition: (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => void;
  previewItem?: string | any;
}) => {
  const location = useLocation();
  const { page } = useParams<{ page: string }>();

  const [displayChart, setDisplayChart] = React.useState(false);
  const [chartId, setChartId] = React.useState<string | null>(null);
  const [displayTextBox, setDisplayTextBox] = React.useState(false);
  const [textContent, setTextContent] = React.useState<EditorState>(
    EditorState.createEmpty()
  );
  const [reportPreviewMode, __] = useRecoilState(unSavedReportPreviewMode);

  const viewOnlyMode =
    (page !== "new" &&
      get(location.pathname.split("/"), "[3]", "") !== "edit") ||
    reportPreviewMode;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ReportElementsType.TEXT, ReportElementsType.CHART],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
    drop: (item: any, monitor) => {
      if (item.type === ReportElementsType.TEXT) {
        props.handleRowFrameItemAddition(
          props.rowId,
          props.itemIndex,
          textContent,
          "text"
        );
        setDisplayTextBox(true);
        setDisplayChart(false);
      } else if (item.type === ReportElementsType.CHART) {
        props.handleRowFrameItemAddition(
          props.rowId,
          props.itemIndex,
          item.value,
          "chart"
        );
        setChartId(item.value);
        setDisplayChart(true);
        setDisplayTextBox(false);
        monitor.getDropResult();
      }
    },
  }));

  const [,] = useDebounce(
    () => {
      if (displayTextBox) {
        props.handleRowFrameItemAddition(
          props.rowId,
          props.itemIndex,
          textContent,
          "text"
        );
      }
    },
    1000,
    [textContent]
  );

  const content = React.useMemo(() => {
    if (displayTextBox) {
      return (
        <div
          css={`
            overflow: auto;
            background: #fff;
            position: relative;
            width: ${props.width}};
            height: ${props.height};
            max-height: ${props.height};

            > div {
              ${viewOnlyMode && "cursor: default;"}
            }
          `}
        >
          {!viewOnlyMode && (
            <IconButton
              onClick={() => {
                setDisplayChart(false);
                setChartId(null);
                setDisplayTextBox(false);
                setTextContent(EditorState.createEmpty());
                props.handleRowFrameItemRemoval(props.rowId, props.itemIndex);
              }}
              css={`
                top: 12px;
                z-index: 1;
                right: 12px;
                position: absolute;
              `}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <RichEditor
            fullWidth
            textContent={textContent}
            editMode={!viewOnlyMode}
            setTextContent={setTextContent}
          />
        </div>
      );
    }

    if (displayChart && chartId) {
      return (
        <div
          key={chartId}
          css={`
            padding: 24px;
            background: #fff;
            position: relative;
            width: ${props.width};
            height: ${props.height};
          `}
        >
          {!viewOnlyMode && (
            <IconButton
              onClick={() => {
                setDisplayChart(false);
                setChartId(null);
                setDisplayTextBox(false);
                setTextContent(EditorState.createEmpty());
                props.handleRowFrameItemRemoval(props.rowId, props.itemIndex);
              }}
              css={`
                top: 12px;
                z-index: 1;
                right: 12px;
                position: absolute;
              `}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <ReportChartWrapper id={chartId} />
        </div>
      );
    }

    return null;
  }, [displayTextBox, displayChart, chartId, textContent, viewOnlyMode]);

  React.useEffect(() => {
    if (props.previewItem) {
      if (typeof props.previewItem === "string") {
        setChartId(props.previewItem);
        setDisplayChart(true);
        setDisplayTextBox(false);
      } else {
        if (props.previewItem.getCurrentContent) {
          setTextContent(props.previewItem);
        } else {
          setTextContent(
            EditorState.createWithContent(convertFromRaw(props.previewItem))
          );
        }
        setDisplayTextBox(true);
        setDisplayChart(false);
      }
    }
  }, [props.previewItem]);

  React.useEffect(() => {
    if (displayChart && chartId) {
      props.handleRowFrameItemAddition(
        props.rowId,
        props.itemIndex,
        chartId,
        "chart"
      );
    }
  }, [chartId, displayChart]);

  return content ? (
    content
  ) : (
    <div
      css={`
        background: #dfe3e6;
        width: ${props.width};
        height: ${props.height};
        border: ${isOver ? "1px solid #231D2C" : "none"};
      `}
      ref={drop}
    >
      <p
        css={`
          margin: 0;
          width: 100%;
          height: 100%;
          display: flex;
          padding: 24px;
          color: #495057;
          font-size: 14px;
          font-weight: 400;
          text-align: center;
          align-items: center;
          justify-content: center;
        `}
      >
        {isOver ? "Release to drop" : "Drag and drop content here"}
      </p>
    </div>
  );
};
