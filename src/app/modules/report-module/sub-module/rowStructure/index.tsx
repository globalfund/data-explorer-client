import React, { useRef } from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useDrop } from "react-dnd";
import { useDebounce } from "react-use";
import { useOnClickOutside } from "usehooks-ts";
import Tooltip from "@material-ui/core/Tooltip";
import { NumberSize, Resizable } from "re-resizable";
import { Direction } from "re-resizable/lib/resizer";
import IconButton from "@material-ui/core/IconButton";
import { EditorState, convertFromRaw } from "draft-js";
import { useStoreActions } from "app/state/store/hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { RichEditor } from "app/modules/chart-module/routes/text/RichEditor";
import { ReportChartWrapper } from "app/modules/report-module/components/chart-wrapper";
import { ReactComponent as EditIcon } from "app/modules/report-module/asset/editIcon.svg";
import { ReactComponent as DeleteIcon } from "app/modules/report-module/asset/deleteIcon.svg";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import {
  reportContentWidthsAtom,
  createChartFromReportAtom,
  reportContentIsResizingAtom,
  reportContentContainerWidth,
  unSavedReportPreviewModeAtom,
  reportContentHeightsAtom,
  isChartDraggingAtom,
} from "app/state/recoil/atoms";

interface RowStructureDisplayProps {
  gap: string;
  height: number;
  rowIndex: number;
  rowId: string;
  selectedType: string;
  deleteFrame: (id: string) => void;
  selectedTypeHistory: string[];
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTypeHistory: React.Dispatch<React.SetStateAction<string[]>>;
  rowStructureDetailItems: {
    rowId: string;
    width: number;
    factor: number;
    rowType: string;
  }[];
  handleRowFrameItemAddition: (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => void;
  handleRowFrameItemRemoval: (rowId: string, itemIndex: number) => void;
  previewItems?: (string | object)[];
  handlePersistReportState: () => void;
  onRowBoxItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    height: number
  ) => void;
}

export default function RowstructureDisplay(props: RowStructureDisplayProps) {
  const location = useLocation();
  const { page } = useParams<{ page: string }>();
  const ref = useRef(null);
  const [handleDisplay, setHandleDisplay] = React.useState(false);

  const [reportContentWidths] = useRecoilState(reportContentWidthsAtom);
  const [reportContentHeights] = useRecoilState(reportContentHeightsAtom);
  const [reportPreviewMode] = useRecoilState(unSavedReportPreviewModeAtom);

  const viewOnlyMode =
    (page !== "new" &&
      get(location.pathname.split("/"), "[3]", "") !== "edit") ||
    reportPreviewMode;

  const rowContentWidths = !viewOnlyMode
    ? find(reportContentWidths, { id: props.rowId })
    : get(reportContentWidths, `[${props.rowIndex}]`, { widths: [] });

  const rowContentHeights = !viewOnlyMode
    ? find(reportContentHeights, { id: props.rowId })
    : get(reportContentHeights, `[${props.rowIndex}]`, { heights: [] });

  const handlers = viewOnlyMode
    ? {}
    : {
        onMouseEnter: () => {
          setHandleDisplay(true);
        },
      };
  useOnClickOutside(ref, () => setHandleDisplay(false));

  const border =
    !viewOnlyMode && handleDisplay
      ? "0.722415px dashed  #ADB5BD"
      : "0.722415px dashed transparent";

  return (
    <div
      {...handlers}
      css={`
        width: 100%;
        height: 100%;
        position: relative;
        margin-bottom: ${!viewOnlyMode ? "0px" : "50px"};
      `}
    >
      {handleDisplay && (
        <div
          ref={ref}
          css={`
            width: 32px;
            left: -3rem;
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
            <div
              css={`
                background: #adb5bd;
                border-radius: 100px;
                height: 53px;
                width: 22px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex-direction: column;

                padding-bottom: 2px;
                button {
                  padding: 4px;
                  :hover {
                    background: transparent;
                    svg {
                      path {
                        fill: #fff;
                      }
                    }
                  }
                }
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
                <Tooltip title="Edit" placement="right">
                  <EditIcon />
                </Tooltip>
              </IconButton>
              <IconButton onClick={() => props.deleteFrame(props.rowId)}>
                <Tooltip title="Delete" placement="right">
                  <DeleteIcon />
                </Tooltip>
              </IconButton>
            </div>
          </div>
        </div>
      )}
      <div
        css={`
          width: 100%;
          height: 100%;
          display: flex;
          overflow: hidden;
          gap: ${props.gap};
          border: ${border};
        `}
      >
        {props.rowStructureDetailItems.map((row, index) => (
          <Box
            key={row.rowId}
            width={get(rowContentWidths, `widths.[${index}]`, "fit-content")}
            height={get(rowContentHeights, `heights.[${index}]`, props.height)}
            itemIndex={index}
            rowId={props.rowId}
            rowType={row.rowType}
            onRowBoxItemResize={props.onRowBoxItemResize}
            handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
            handleRowFrameItemAddition={props.handleRowFrameItemAddition}
            previewItem={get(props.previewItems, `[${index}]`, undefined)}
            handlePersistReportState={props.handlePersistReportState}
            rowItemsCount={props.rowStructureDetailItems.length}
          />
        ))}
      </div>
    </div>
  );
}

const Box = (props: {
  width: number;
  height: number;
  rowId: string;
  itemIndex: number;
  handlePersistReportState: () => void;
  rowType: string;
  handleRowFrameItemRemoval: (rowId: string, itemIndex: number) => void;
  handleRowFrameItemAddition: (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => void;
  rowItemsCount: number;
  previewItem?: string | any;
  onRowBoxItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    height: number
  ) => void;
}) => {
  const location = useLocation();
  const history = useHistory();
  const { page, view } = useParams<{ page: string; view: string }>();
  const setDataset = useStoreActions(
    (actions) => actions.charts.dataset.setValue
  );
  const setLoadedChart = useStoreActions(
    (state) => state.charts.ChartGet.setCrudData
  );
  const setCreateChartData = useStoreActions(
    (state) => state.charts.ChartCreate.setCrudData
  );

  const isChartDragging = useRecoilValue(isChartDraggingAtom);

  const setCreateChartFromReport = useRecoilState(createChartFromReportAtom)[1];

  const resetMapping = useStoreActions(
    (actions) => actions.charts.mapping.reset
  );
  const [chartId, setChartId] = React.useState<string | null>(null);
  const [displayChart, setDisplayChart] = React.useState(false);
  const [displayTextBox, setDisplayTextBox] = React.useState(false);
  const [textContent, setTextContent] = React.useState<EditorState>(
    EditorState.createEmpty()
  );

  const handleEditChart = () => {
    setCreateChartFromReport({
      state: true,
      view,
      page,
    });
    setDataset(null);
    setLoadedChart(null);
    setCreateChartData(null);
    resetMapping();

    //set persisted report state to current report state
    props.handlePersistReportState();

    history.push(`/chart/${chartId}/mapping`);
  };

  const containerWidth = useRecoilValue(reportContentContainerWidth);
  const [reportPreviewMode] = useRecoilState(unSavedReportPreviewModeAtom);
  const [isResizing, setIsResizing] = useRecoilState(
    reportContentIsResizingAtom
  );

  const viewOnlyMode =
    (page !== "new" &&
      get(location.pathname.split("/"), "[3]", "") !== "edit") ||
    reportPreviewMode;

  const [{ isOver }, drop] = useDrop(() => ({
    accept:
      props.rowType === "oneByFive"
        ? [ReportElementsType.TEXT, ReportElementsType.BIG_NUMBER]
        : [ReportElementsType.TEXT, ReportElementsType.CHART],
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
      } else if (
        item.type === ReportElementsType.CHART ||
        item.type === ReportElementsType.BIG_NUMBER
      ) {
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

  let width = `${props.width}%`;
  if (containerWidth) {
    width = `${
      containerWidth * (props.width / 100) -
      ((props.rowItemsCount - 1) * 60) / props.rowItemsCount
    }px`;
  }

  const onResizeStop = (
    _event: MouseEvent | TouchEvent,
    _direction: Direction,
    elementRef: HTMLElement,
    _delta: NumberSize
  ) => {
    let newWidth = elementRef.offsetWidth;
    let newHeight = elementRef.offsetHeight;
    props.onRowBoxItemResize(props.rowId, props.itemIndex, newWidth, newHeight);
    setIsResizing(false);
  };

  const onResize = () => {
    if (!isResizing) {
      setIsResizing(true);
    }
  };

  const textResizableRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (
      displayTextBox &&
      textResizableRef.current &&
      textResizableRef.current?.offsetHeight > props.height
    ) {
      props.onRowBoxItemResize(
        props.rowId,
        props.itemIndex,
        parseInt(width.replace("%", ""), 10),
        textResizableRef.current.offsetHeight
      );
    }
  }, [displayTextBox, textContent]);

  const content = React.useMemo(() => {
    if (displayTextBox) {
      return (
        <Resizable
          grid={[5, 5]}
          onResize={onResize}
          onResizeStop={onResizeStop}
          size={{ width: width, height: `${props.height}px` }}
          maxWidth={!viewOnlyMode ? containerWidth : undefined}
          enable={{
            right: !viewOnlyMode,
            bottom: !viewOnlyMode,
            bottomRight: !viewOnlyMode,
          }}
          css={`
            background: #fff;
            overflow: hidden;
            position: relative;

            div {
              ${viewOnlyMode && "cursor: default;"}
            }
          `}
        >
          <div ref={textResizableRef}>
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
        </Resizable>
      );
    }

    if (displayChart && chartId) {
      return (
        <Resizable
          key={chartId}
          onResize={onResize}
          onResizeStop={onResizeStop}
          size={{ width: width, height: `${props.height}px` }}
          maxWidth={!viewOnlyMode ? containerWidth : undefined}
          enable={{
            right: !viewOnlyMode,
            bottom: !viewOnlyMode,
            bottomRight: !viewOnlyMode,
          }}
        >
          <div
            css={`
              height: 100%;
              background: #fff;
              position: relative;
              padding: ${props.rowType === "oneByFive" ? "0" : "24px"};
            `}
          >
            {!viewOnlyMode && (
              <div>
                <IconButton
                  onClick={() => {
                    setDisplayChart(false);
                    setChartId(null);
                    setDisplayTextBox(false);
                    setTextContent(EditorState.createEmpty());
                    props.handleRowFrameItemRemoval(
                      props.rowId,
                      props.itemIndex
                    );
                  }}
                  css={`
                    top: 12px;
                    z-index: 1;
                    right: 12px;
                    position: absolute;
                    padding: 4px;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    background: #adb5bd;
                    :hover {
                      background: #adb5bd;
                      svg {
                        path {
                          fill: #fff;
                        }
                      }
                    }
                  `}
                >
                  <Tooltip title="Delete Chart">
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
                <IconButton
                  onClick={handleEditChart}
                  css={`
                    top: 12px;
                    z-index: 1;
                    right: 39px;
                    position: absolute;
                    padding: 4px;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    background: #adb5bd;
                    :hover {
                      background: #adb5bd;
                      svg {
                        path {
                          fill: #fff;
                        }
                      }
                    }
                  `}
                >
                  <Tooltip title="Edit Chart">
                    <EditIcon />
                  </Tooltip>
                </IconButton>
              </div>
            )}
            <ReportChartWrapper id={chartId} />
          </div>
        </Resizable>
      );
    }

    return null;
  }, [
    displayTextBox,
    displayChart,
    chartId,
    textContent,
    viewOnlyMode,
    width,
    props.height,
  ]);

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

  let border = "none";
  if (isOver) {
    border = "1px solid #231d2c";
  } else if (isChartDragging === "bigNumber" && props.rowType === "oneByFive") {
    border = "1px dashed #231d2c";
  } else if (isChartDragging === "chart" && props.rowType !== "oneByFive") {
    border = "1px dashed #231d2c";
  }

  return content ? (
    content
  ) : (
    <div
      css={`
        width: ${width};
        border: ${border};
        background: #dfe3e6;
        height: ${props.height}px;
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
