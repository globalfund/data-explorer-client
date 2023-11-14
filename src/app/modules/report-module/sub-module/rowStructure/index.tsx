import React, { useRef } from "react";
import get from "lodash/get";
import { useDrop } from "react-dnd";
import { useDebounce } from "react-use";
import { useOnClickOutside } from "usehooks-ts";
import Tooltip from "@material-ui/core/Tooltip";
import { NumberSize, Resizable } from "re-resizable";
import { Direction } from "re-resizable/lib/resizer";
import IconButton from "@material-ui/core/IconButton";
import { EditorState } from "draft-js";
import { useStoreActions } from "app/state/store/hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { RichEditor } from "app/modules/chart-module/routes/text/RichEditor";
import { ReportChartWrapper } from "app/modules/report-module/components/chart-wrapper";
import { ReactComponent as EditIcon } from "app/modules/report-module/asset/editIcon.svg";
import { ReactComponent as DeleteIcon } from "app/modules/report-module/asset/deleteIcon.svg";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import {
  createChartFromReportAtom,
  reportContentIsResizingAtom,
  reportContentContainerWidth,
  unSavedReportPreviewModeAtom,
  isChartDraggingAtom,
} from "app/state/recoil/atoms";
import { IFramesArray } from "../../views/create/data";
import { AnchorPlugin } from "@draft-js-plugins/anchor";
import { StaticToolBarPlugin } from "@draft-js-plugins/static-toolbar";
import {
  UnorderedListButton,
  OrderedListButton,
} from "@draft-js-plugins/buttons";

import {
  BGHiglightPicker,
  BlockquoteButton,
  HeaderOneButton,
  HeaderTwoButton,
  HiglightPicker,
  StrikeThroughButton,
  BoldButton,
  ItalicButton,
  UnderlineButton,
} from "app/modules/chart-module/routes/text/RichEditor/buttons";
import { EditorPlugin } from "@draft-js-plugins/editor";
import { UndoRedoButtonProps } from "@draft-js-plugins/undo";
import { TextAlignmentPlugin } from "@draft-js-plugins/text-alignment";
import { EmojiPlugin } from "@draft-js-plugins/emoji";
import ColorModal from "app/modules/chart-module/routes/text/RichEditor/ColorModal";
import BgColorModal from "app/modules/chart-module/routes/text/RichEditor/BGColorModal";

interface RowStructureDisplayProps {
  gap: string;
  height: number;
  rowIndex: number;
  rowId: string;
  selectedType: string;
  framesArray: IFramesArray[];
  selectedTypeHistory: string[];
  rowContentWidths: number[];
  rowContentHeights: number[];

  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setFramesArray: (value: React.SetStateAction<IFramesArray[]>) => void;
  deleteFrame: (id: string) => void;
  setSelectedTypeHistory: React.Dispatch<React.SetStateAction<string[]>>;
  rowStructureDetailItems: {
    rowId: string;
    width: number;
    factor: number;
    rowType: string;
  }[];

  previewItems?: (string | object)[];
  handlePersistReportState: () => void;
  onRowBoxItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    height: number
  ) => void;
}

type UndoRedoType = {
  UndoButton: React.ComponentType<UndoRedoButtonProps>;
  RedoButton: React.ComponentType<UndoRedoButtonProps>;
};

export default function RowstructureDisplay(props: RowStructureDisplayProps) {
  const ref = useRef(null);
  const location = useLocation();
  const { page } = useParams<{ page: string }>();
  const [handleDisplay, setHandleDisplay] = React.useState(false);
  const [reportPreviewMode] = useRecoilState(unSavedReportPreviewModeAtom);

  //control modals for color and background color pickers
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [activeColorModal, setActiveColorModal] = React.useState<
    "bg" | "color" | null
  >(null);
  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    modalType: "bg" | "color"
  ) => {
    setActiveColorModal(modalType);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const bgOpen = activeColorModal === "bg" && Boolean(anchorEl);
  const colorOpen = activeColorModal === "color" && Boolean(anchorEl);

  const bgId = bgOpen ? "bg-popover" : undefined;
  const colorId = colorOpen ? "color-popover" : undefined;

  //end of control modals for color and background color pickers

  const [plugins, setPlugins] = React.useState<
    (
      | StaticToolBarPlugin
      | AnchorPlugin
      | (EditorPlugin & UndoRedoType)
      | TextAlignmentPlugin
      | EmojiPlugin
      | EditorPlugin
    )[]
  >([]);

  const [isFocused, setIsFocused] = React.useState(false);
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
      };

  useOnClickOutside(ref, () => setHandleDisplay(false));

  const border =
    !viewOnlyMode && handleDisplay
      ? "0.722415px dashed  #ADB5BD"
      : "0.722415px dashed transparent";

  const Toolbar = (plugins[0] as StaticToolBarPlugin)?.Toolbar;
  const LinkButton = (plugins[1] as AnchorPlugin)?.LinkButton;
  const UndoButton = (plugins[2] as EditorPlugin & UndoRedoType)?.UndoButton;
  const RedoButton = (plugins[2] as EditorPlugin & UndoRedoType)?.RedoButton;
  const textAlignmentPlugin = plugins[3] as TextAlignmentPlugin;
  const emojiPlugin = plugins[4] as EmojiPlugin;

  const linkInputComponent = document.querySelector(
    "input[placeholder='Enter a URL and press enter']"
  );
  return (
    <>
      <div
        css={`
          position: relative;
        `}
      >
        <div>
          {(isFocused || linkInputComponent) && plugins.length > 0 && (
            <Toolbar>
              {
                // may be use React.Fragment instead of div to improve perfomance after React 16
                (externalProps) => (
                  <React.Fragment>
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <StrikeThroughButton {...externalProps} />
                    <div
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => handleClick(e, "color")}
                      id={colorId}
                    >
                      <HiglightPicker {...externalProps} />
                    </div>

                    <div
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => handleClick(e, "bg")}
                      id={bgId}
                    >
                      <BGHiglightPicker {...externalProps} />
                    </div>

                    <div onMouseDown={(e) => e.preventDefault()}>
                      <emojiPlugin.EmojiSelect {...externalProps} />
                    </div>
                    <emojiPlugin.EmojiSuggestions {...externalProps} />
                    <div
                      css={`
                        width: 1px;
                        height: 28px;
                        background: #b4b4b4;
                      `}
                    />
                    <HeaderOneButton {...externalProps} />
                    <HeaderTwoButton {...externalProps} />
                    <BlockquoteButton {...externalProps} />
                    <div
                      css={`
                        width: 1px;
                        height: 28px;
                        background: #b4b4b4;
                      `}
                    />
                    <textAlignmentPlugin.TextAlignment {...externalProps} />

                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <div
                      css={`
                        width: 1px;
                        height: 28px;
                        background: #b4b4b4;
                      `}
                    />
                    <div
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <LinkButton {...externalProps} />
                    </div>
                    <div onMouseDown={(e) => e.preventDefault()}>
                      <UndoButton {...externalProps} />
                    </div>
                    <div onMouseDown={(e) => e.preventDefault()}>
                      <RedoButton {...externalProps} />
                    </div>
                    <div onMouseDown={(e) => e.preventDefault()}>
                      <ColorModal
                        {...externalProps}
                        anchorEl={anchorEl}
                        handleClose={handleClose}
                        id={colorId}
                        open={colorOpen}
                      />
                    </div>

                    <div onMouseDown={(e) => e.preventDefault()}>
                      <BgColorModal
                        {...externalProps}
                        anchorEl={anchorEl}
                        handleClose={handleClose}
                        id={bgId}
                        open={bgOpen}
                      />
                    </div>
                  </React.Fragment>
                )
              }
            </Toolbar>
          )}
        </div>
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
                width={get(props.rowContentWidths, `[${index}]`, "fit-content")}
                height={get(
                  props.rowContentHeights,
                  `[${index}]`,
                  props.height
                )}
                itemIndex={index}
                rowId={props.rowId}
                rowType={row.rowType}
                onRowBoxItemResize={props.onRowBoxItemResize}
                setFramesArray={props.setFramesArray}
                previewItem={get(props.previewItems, `[${index}]`, undefined)}
                handlePersistReportState={props.handlePersistReportState}
                rowItemsCount={props.rowStructureDetailItems.length}
                setPlugins={setPlugins}
                setIsFocused={setIsFocused}
                isFocused={isFocused}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const Box = (props: {
  width: number;
  height: number;
  rowId: string;
  itemIndex: number;
  handlePersistReportState: () => void;
  rowType: string;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused: boolean;
  setPlugins?: React.Dispatch<
    React.SetStateAction<
      (
        | StaticToolBarPlugin
        | AnchorPlugin
        | (EditorPlugin & UndoRedoType)
        | TextAlignmentPlugin
        | EmojiPlugin
        | EditorPlugin
      )[]
    >
  >;
  setFramesArray: (value: React.SetStateAction<IFramesArray[]>) => void;
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

  const handleRowFrameItemAddition = (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => {
    props.setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));
      const frameId = tempPrev.findIndex((frame) => frame.id === rowId);
      if (frameId === -1) {
        return [...tempPrev];
      }
      tempPrev[frameId].content[itemIndex] = itemContent;
      tempPrev[frameId].contentTypes[itemIndex] = itemContentType;
      return [...tempPrev];
    });
  };
  const handleRowFrameItemRemoval = (rowId: string, itemIndex: number) => {
    props.setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));
      const frameId = tempPrev.findIndex((frame) => frame.id === rowId);
      if (frameId === -1) {
        return [...tempPrev];
      }

      tempPrev[frameId].content[itemIndex] = null;
      tempPrev[frameId].contentTypes[itemIndex] = null;
      return [...tempPrev];
    });
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
        handleRowFrameItemAddition(
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
        handleRowFrameItemAddition(
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
        handleRowFrameItemAddition(
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
    setIsResizing(true);
  };

  const textResizableRef = React.useRef<HTMLDivElement>(null);

  const content = React.useMemo(() => {
    if (displayTextBox) {
      return (
        <Resizable
          grid={[5, 5]}
          onResize={onResize}
          onResizeStop={onResizeStop}
          size={{ width: width, height: `${props.height}px` }}
          maxWidth={!viewOnlyMode ? containerWidth : undefined}
          minWidth={78}
          minHeight={textResizableRef.current?.clientHeight}
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
                  handleRowFrameItemRemoval(props.rowId, props.itemIndex);
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
                <DeleteIcon />
              </IconButton>
            )}

            <RichEditor
              fullWidth
              editMode={!viewOnlyMode}
              textContent={textContent}
              setTextContent={setTextContent}
              setPlugins={props.setPlugins}
              setIsFocused={props.setIsFocused}
              isFocused={props.isFocused}
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
          minWidth={78}
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
                    handleRowFrameItemRemoval(props.rowId, props.itemIndex);
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
            <ReportChartWrapper id={chartId} width={width.slice(0, -2)} />
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
        setTextContent(props.previewItem);
        setDisplayTextBox(true);
        setDisplayChart(false);
      }
    }
  }, [props.previewItem]);

  React.useEffect(() => {
    if (displayChart && chartId) {
      handleRowFrameItemAddition(
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

  return (
    content ?? (
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
    )
  );
};
