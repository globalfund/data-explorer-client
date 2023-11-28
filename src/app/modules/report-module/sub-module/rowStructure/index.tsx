import React, { useEffect } from "react";
import get from "lodash/get";
import { useDrop } from "react-dnd";
import { useDebounce } from "react-use";
import Tooltip from "@material-ui/core/Tooltip";
import { NumberSize, Resizable } from "re-resizable";
import { Direction } from "re-resizable/lib/resizer";
import IconButton from "@material-ui/core/IconButton";
import { EditorState, convertFromRaw } from "draft-js";
import { useLocation, useParams } from "react-router-dom";
import { RichEditor } from "app/modules/chart-module/routes/text/RichEditor";
import { ReportChartWrapper } from "app/modules/report-module/components/chart-wrapper";
import { ReactComponent as EditIcon } from "app/modules/report-module/asset/editIcon.svg";
import { ReactComponent as DeleteIcon } from "app/modules/report-module/asset/deleteIcon.svg";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";

import { useRecoilState, useRecoilValue } from "recoil";

import { MoreVert } from "@material-ui/icons";
import {
  chartHolderAtom,
  unSavedReportPreviewModeAtom,
  reportContentIsResizingAtom,
  reportContentContainerWidth,
} from "app/state/recoil/atoms";
import ReportActionDialog from "app/modules/report-module/components/actionDialog";
import ImageBox from "app/modules/report-module/components/imageBox";
import { IFramesArray } from "../../views/create/data";

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
  previewItems?: (string | object)[];
  handlePersistReportState: () => void;
  onRowBoxItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    height: number
  ) => void;
  rowContentWidths: number[];
  rowContentHeights: number[];
  setFramesArray: (value: React.SetStateAction<IFramesArray[]>) => void;
  framesArray: IFramesArray[];
}

export default function RowstructureDisplay(props: RowStructureDisplayProps) {
  const location = useLocation();
  const { page } = useParams<{ page: string }>();
  const [modalDisplay, setModalDisplay] = React.useState(false);
  const [modalType, setModalType] = React.useState<
    "edit-row" | "delete-row" | ""
  >("");
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalSubtitle, setModalSubtitle] =
    React.useState<React.ReactNode>(null);
  const [modalDescription, setModalDescription] = React.useState("");
  const [modalButtonTitle, setModalButtonTitle] = React.useState("");

  const handleModalDisplay = () => {
    if (modalType === "delete-row") {
      setModalTitle("Delete row frame");
      setModalSubtitle(
        <>
          <p>
            <b>
              Proceed with caution!
              <br /> No turning back after this action
            </b>
          </p>
        </>
      );
      setModalDescription(
        "Are you going to delete your row frame? You will permanently delete all the content placed."
      );
      setModalButtonTitle("Delete");
    } else if (modalType === "edit-row") {
      setModalTitle("Edit row frame?");
      setModalSubtitle(
        <>
          <p>
            <b>
              Proceed with caution!
              <br /> You might lose content in placeholders
            </b>
          </p>
        </>
      );
      setModalDescription(
        "TGF Data Explorer platform will try to fit your current content in your new placeholder row estructure. Please save your changes before proceeding."
      );
      setModalButtonTitle("Edit row");
    }
  };

  const toggleRowFrameHandle = (rowId: string, state: boolean) => {
    props.setFramesArray((prev) => {
      const tempPrev = prev.map((item) => ({ ...item }));
      return [
        ...tempPrev.map((frame) => {
          if (frame.id === rowId) {
            frame.isHandleOpen = state;
          } else {
            frame.isHandleOpen = false;
          }
          return frame;
        }),
      ];
    });
  };

  const handleModalAction = () => {
    if (modalType === "delete-row") {
      props.deleteFrame(props.rowId);
    } else if (modalType === "edit-row") {
      toggleRowFrameHandle(props.rowId, false);

      props.setSelectedTypeHistory([
        ...props.selectedTypeHistory,
        props.selectedType,
        "",
      ]);
    }
    setModalDisplay(false);
  };

  React.useEffect(() => {
    handleModalDisplay();
  }, [modalType]);

  const [reportPreviewMode] = useRecoilState(unSavedReportPreviewModeAtom);

  const viewOnlyMode =
    (page !== "new" &&
      get(location.pathname.split("/"), "[3]", "") !== "edit") ||
    reportPreviewMode;

  const isHandleOpen = React.useMemo(() => {
    const frameIndex = props.framesArray.findIndex(
      (frame) => frame.id === props.rowId
    );
    if (frameIndex === -1) {
      return false;
    }
    return props.framesArray[frameIndex].isHandleOpen;
  }, [props.framesArray]);

  return (
    <div
      css={`
        width: 100%;
        position: relative;
        margin-bottom: ${!viewOnlyMode ? "0px" : "50px"};
      `}
    >
      <div
        css={`
          width: 32px;
          left: -50px;
          bottom: 0px;
          display: flex;
          position: absolute;
          display: ${viewOnlyMode ? "none" : "block"};
        `}
      >
        <div
          css={`
            padding: 0 0px;
          `}
        >
          {isHandleOpen && (
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
                  background: #cfd4da;
                  border-radius: 100px;
                  height: 70px;
                  width: 36px;
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  flex-direction: column;

                  padding-bottom: 2px;
                  button {
                    padding: 4px;
                    svg {
                      width: 20px;
                      height: 20px;
                      path {
                        fill: #262c34;
                      }
                    }
                    :hover {
                      background: transparent;
                    }
                  }
                `}
              >
                <IconButton
                  onClick={() => {
                    setModalType("edit-row");
                    setModalDisplay(true);
                  }}
                >
                  <Tooltip title="Edit row" placement="right">
                    <EditIcon />
                  </Tooltip>
                </IconButton>

                <IconButton
                  onClick={() => {
                    setModalType("delete-row");
                    setModalDisplay(true);
                  }}
                >
                  <Tooltip title="Delete row" placement="right">
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
              </div>
            </div>
          )}
          <div
            css={`
              height: 8px;
            `}
          />

          <IconButton
            onClick={() => {
              toggleRowFrameHandle(props.rowId, !isHandleOpen);
            }}
            css={`
              display: flex;
              align-items: center;
              justify-content: center;
              width: 36px;
              height: 36px;
              border-radius: 100px;
              color: ${isHandleOpen ? "#FFFFFF" : "#262C34"};
              background: ${isHandleOpen ? "#262C34" : "#cfd4da"};
              &:hover {
                background: #262c34;
                color: #ffffff;
              }
            `}
          >
            <MoreVert color="inherit" />
          </IconButton>
        </div>
      </div>

      <div
        css={`
          width: 100%;
          display: flex;
          height: 100%;
          gap: ${props.gap};
        `}
      >
        {props.rowStructureDetailItems.map((row, index) => (
          <Box
            key={row.rowId}
            width={get(props.rowContentWidths, `[${index}]`, "fit-content")}
            height={get(props.rowContentHeights, `[${index}]`, props.height)}
            itemIndex={index}
            rowId={props.rowId}
            rowType={row.rowType}
            onRowBoxItemResize={props.onRowBoxItemResize}
            setFramesArray={props.setFramesArray}
            previewItem={get(props.previewItems, `[${index}]`, undefined)}
            handlePersistReportState={props.handlePersistReportState}
            rowItemsCount={props.rowStructureDetailItems.length}
          />
        ))}
      </div>
      <ReportActionDialog
        modalDisplay={modalDisplay}
        buttonTitle={modalButtonTitle}
        description={modalDescription}
        subtitle={modalSubtitle}
        title={modalTitle}
        action={handleModalAction}
        modalType={modalType}
        setModalDisplay={setModalDisplay}
      />
    </div>
  );
}

const Box = (props: {
  width: number;
  height: number;
  rowId: string;
  itemIndex: number;
  handlePersistReportState: () => void;
  setFramesArray: (value: React.SetStateAction<IFramesArray[]>) => void;
  rowType: string;
  onRowBoxItemResize: (
    rowId: string,
    itemIndex: number,
    width: number,
    height: number
  ) => void;
  rowItemsCount: number;
  previewItem?: string | any;
}) => {
  const location = useLocation();
  const { page } = useParams<{ page: string; view: string }>();

  const [isHoldingChartValue, setIsHoldingChartValue] =
    useRecoilState(chartHolderAtom);

  const [initChartId, setInitChartId] = React.useState<string | null>(null);

  const [chartId, setChartId] = React.useState<string | null>(null);
  const [displayChart, setDisplayChart] = React.useState(false);
  const [displayImageBox, setDisplayImageBox] = React.useState(false);
  const [draggedChartName, setDraggedChartName] = React.useState("");
  const [displayDeleteElementModal, setDisplayDeleteElementModal] =
    React.useState({
      type: "",
      display: false,
      modalType: "",
    });
  const [modalContent, setModalContent] = React.useState({
    buttonTitle: "Delete",
    description: `Current ${displayDeleteElementModal.type} will be deleted from this placeholder. 
  Drag and drop your new ${displayDeleteElementModal.type}  in the empty placeholder to complete your report.`,
    subtitle: `Delete ${displayDeleteElementModal.type} from this 
  placeholder`,
    title: "Delete element?",
  });
  const [displayTextBox, setDisplayTextBox] = React.useState(false);
  const [boxMenuButtonOpened, setBoxMenuButtonOpened] = React.useState(false);
  const [textContent, setTextContent] = React.useState<EditorState>(
    EditorState.createEmpty()
  );
  const [imageFile, setImageFile] = React.useState<{ image: File }>(
    {} as { image: File }
  );

  const handleModalContentDisplay = () => {
    if (displayDeleteElementModal.modalType === "replace-element") {
      setModalContent({
        buttonTitle: "replace",
        description: `Current ${displayDeleteElementModal.type}  will be replaced with ${draggedChartName} in this placeholder.`,
        title: "Replace element",
        subtitle: `Replace current chart  with ${draggedChartName}?`,
      });
    } else {
      setModalContent({
        buttonTitle: "Delete",
        description: `Current ${displayDeleteElementModal.type} will be deleted from this placeholder. 
      Drag and drop your new ${displayDeleteElementModal.type}  in the empty placeholder to complete your report.`,
        subtitle: `Delete ${displayDeleteElementModal.type} from this 
      placeholder`,
        title: "Delete element?",
      });
    }
  };

  React.useEffect(() => {
    handleModalContentDisplay();
  }, [displayDeleteElementModal]);

  const handleDisplayDeleteElementModal = (type: string) => {
    setBoxMenuButtonOpened(!boxMenuButtonOpened);
    setDisplayDeleteElementModal({
      type: type,
      display: true,
      modalType: "delete-element",
    });
  };
  const handleDeleteElement = () => {
    handleRowFrameItemRemoval(props.rowId, props.itemIndex);
    setDisplayChart(false);
    setChartId(null);
    setInitChartId(null);
    setDisplayTextBox(false);
    setDisplayImageBox(false);
    setImageFile({} as { image: File });
    setTextContent(EditorState.createEmpty());
    setDisplayDeleteElementModal({
      ...displayDeleteElementModal,
      display: false,
    });
  };

  const handleModalAction = () => {
    if (displayDeleteElementModal.modalType === "replace-element") {
      handleRowFrameItemAddition(
        props.rowId,
        props.itemIndex,
        initChartId as string,
        "chart"
      );
      setChartId(initChartId);
      setDisplayDeleteElementModal({
        ...displayDeleteElementModal,
        display: false,
      });
    } else {
      handleDeleteElement();
    }
  };

  const handleRowFrameItemAddition = (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart" | "image"
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
    accept: [
      ReportElementsType.TEXT,
      ReportElementsType.CHART,
      ReportElementsType.IMAGE,
    ],
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
        setDisplayImageBox(false);
      } else if (item.type === ReportElementsType.IMAGE) {
        handleRowFrameItemAddition(
          props.rowId,
          props.itemIndex,
          imageFile as object,
          "image"
        );
        setDisplayImageBox(true);
        setDisplayTextBox(false);
        setDisplayChart(false);

        monitor.getDropResult();
      } else if (item.type === ReportElementsType.CHART) {
        setDraggedChartName(item.name);
        setInitChartId(item.value);
        setDisplayChart(true);
        setDisplayTextBox(false);
        setDisplayImageBox(false);

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

  useEffect(() => {
    if (initChartId && initChartId !== chartId) {
      if (chartId) {
        setDisplayDeleteElementModal({
          ...displayDeleteElementModal,
          type: "chart",
          display: true,
          modalType: "replace-element",
        });
      } else {
        handleRowFrameItemAddition(
          props.rowId,
          props.itemIndex,
          initChartId,
          "chart"
        );
        setChartId(initChartId);
      }
    }
  }, [initChartId]);

  let width = `${props.width}%`;
  if (containerWidth) {
    width = `${containerWidth * (props.width / 100)}px`;
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

  React.useEffect(() => {
    if (
      displayTextBox &&
      textResizableRef.current &&
      textResizableRef.current?.offsetHeight > props.height
    ) {
      props.onRowBoxItemResize(
        props.rowId,
        props.itemIndex,
        parseInt(width.replace("%", ""), 10) + 30,
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
          className="re-resizeable"
          onResizeStop={onResizeStop}
          size={{ width: width, height: `${props.height}px` }}
          maxWidth={!viewOnlyMode ? containerWidth : undefined}
          enable={{
            right: !viewOnlyMode,
            bottom: !viewOnlyMode,
            bottomRight: !viewOnlyMode,
          }}
          css={`
            overflow-y: auto;
            background: #fff;
            overflow-x: hidden;
            position: static;
            border-radius: 20px;
            box-shadow: 0px 0px 10px 0px rgba(152, 161, 170, 0.6);

            &:focus-within,
            &:hover {
              border: ${viewOnlyMode ? "none" : "1px solid #262c34"};
            }

            .public-DraftEditorPlaceholder-inner {
              position: absolute;
              color: #dfe3e5;
              font-family: "Gotham Narrow", sans-serif;
              font-weight: 400;
              font-size: 16px;
            }
            div {
              ${viewOnlyMode && "cursor: default;"}
            }
          `}
        >
          <div ref={textResizableRef}>
            {!viewOnlyMode && (
              <>
                <IconButton
                  css={`
                    bottom: 12px;
                    z-index: 2;
                    right: 18px;
                    position: absolute;
                    background: ${boxMenuButtonOpened ? "#262C34" : "#cfd4da"};
                    width: 24px;
                    height: 24px;
                    color: ${boxMenuButtonOpened ? "#fff" : "#000000"};
                    font-size: 18px;
                    &:hover {
                      background: #262c34;
                      color: #fff;
                    }
                  `}
                  onClick={() => {
                    setBoxMenuButtonOpened(!boxMenuButtonOpened);
                  }}
                >
                  <MoreVert color="inherit" fontSize="inherit" />
                </IconButton>
                {boxMenuButtonOpened && (
                  <IconButton
                    onClick={() => {
                      handleDisplayDeleteElementModal("text box");
                    }}
                    css={`
                      width: 24px;
                      height: 24px;
                      padding: 7px;
                      bottom: 12px;
                      background: #e5e8eb;
                      color: #262c34;
                      font-size: 24px;

                      z-index: 4;
                      right: 50px;
                      position: absolute;
                    `}
                  >
                    <DeleteIcon color="inherit" fontSize="inherit" />
                  </IconButton>
                )}
              </>
            )}
            <div>
              <RichEditor
                fullWidth
                textContent={textContent}
                editMode={!viewOnlyMode}
                setTextContent={setTextContent}
                fullHeight
                focusOnMount={true}
              />
            </div>
          </div>
        </Resizable>
      );
    }

    if (displayChart && chartId) {
      return (
        <Resizable
          key={chartId}
          className="re-resizeable"
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
            ref={drop}
            css={`
              height: 100%;
              background: #fff;
              position: relative;
              border-radius: 20px;
              box-shadow: 0px 0px 10px 0px rgba(152, 161, 170, 0.6);
              padding: ${props.rowType === "oneByFive" ? "0" : "24px"};
            `}
          >
            {!viewOnlyMode && (
              <>
                <IconButton
                  css={`
                    bottom: 12px;
                    z-index: 2;
                    right: 18px;
                    position: absolute;
                    background: ${boxMenuButtonOpened ? "#262C34" : "#cfd4da"};
                    width: 24px;
                    height: 24px;
                    color: ${boxMenuButtonOpened ? "#fff" : "#000000"};
                    font-size: 18px;
                    &:hover {
                      background: #262c34;
                      color: #fff;
                    }
                  `}
                  onClick={() => {
                    setBoxMenuButtonOpened(!boxMenuButtonOpened);
                  }}
                >
                  <MoreVert color="inherit" fontSize="inherit" />
                </IconButton>
                {boxMenuButtonOpened && (
                  <IconButton
                    onClick={() => {
                      handleDisplayDeleteElementModal("chart");
                    }}
                    css={`
                      width: 24px;
                      height: 24px;
                      padding: 7px;
                      bottom: 12px;
                      background: #e5e8eb;
                      color: #262c34;
                      font-size: 24px;

                      z-index: 4;
                      right: 50px;
                      position: absolute;
                    `}
                  >
                    <DeleteIcon color="inherit" fontSize="inherit" />
                  </IconButton>
                )}
              </>
            )}
            <ReportChartWrapper id={chartId} />
          </div>
        </Resizable>
      );
    }

    if (displayImageBox) {
      return (
        <Resizable
          key={chartId}
          onResize={onResize}
          onResizeStop={onResizeStop}
          className="re-resizeable"
          size={{ width: width, height: `${props.height}px` }}
          maxWidth={!viewOnlyMode ? containerWidth : undefined}
          enable={{
            right: !viewOnlyMode,
            bottom: !viewOnlyMode,
            bottomRight: !viewOnlyMode,
          }}
          css={`
            overflow-y: auto;
            background: #fff;
            overflow-x: hidden;
            position: static;
            border-radius: 20px;
            box-shadow: 0px 0px 10px 0px rgba(152, 161, 170, 0.6);

            &:focus-within,
            &:hover {
              border: 1px solid #262c34;
            }

            div {
              ${viewOnlyMode && "cursor: default;"}
            }
          `}
        >
          {!viewOnlyMode && (
            <>
              <IconButton
                css={`
                  bottom: 12px;
                  z-index: 2;
                  right: 18px;
                  position: absolute;
                  background: ${boxMenuButtonOpened ? "#262C34" : "#cfd4da"};
                  width: 24px;
                  height: 24px;
                  color: ${boxMenuButtonOpened ? "#fff" : "#000000"};
                  font-size: 18px;
                  &:hover {
                    background: #262c34;
                    color: #fff;
                  }
                `}
                onClick={() => {
                  setBoxMenuButtonOpened(!boxMenuButtonOpened);
                }}
              >
                <MoreVert color="inherit" fontSize="inherit" />
              </IconButton>
              {boxMenuButtonOpened && (
                <IconButton
                  onClick={() => {
                    handleDisplayDeleteElementModal("image");
                  }}
                  css={`
                    width: 24px;
                    height: 24px;
                    padding: 7px;
                    bottom: 12px;
                    background: #e5e8eb;
                    color: #262c34;
                    font-size: 24px;

                    z-index: 4;
                    right: 50px;
                    position: absolute;
                  `}
                >
                  <DeleteIcon color="inherit" fontSize="inherit" />
                </IconButton>
              )}
            </>
          )}
          <ImageBox setImageFile={setImageFile} />
        </Resizable>
      );
    }

    return null;
  }, [
    displayTextBox,
    boxMenuButtonOpened,
    displayChart,
    chartId,
    textContent,
    viewOnlyMode,
    displayImageBox,
    width,
    props.height,
  ]);

  React.useEffect(() => {
    if (props.previewItem) {
      if (typeof props.previewItem === "string") {
        setChartId(props.previewItem);
        setDisplayChart(true);
        setDisplayTextBox(false);
        setDisplayImageBox(true);
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
        setDisplayImageBox(false);
      }
    }
  }, [props.previewItem]);

  React.useEffect(() => {
    if (
      isHoldingChartValue.state &&
      props.itemIndex == 0 &&
      isHoldingChartValue.rowId === props.rowId
    ) {
      setDisplayChart(true);

      setChartId(isHoldingChartValue.chartId);
      setIsHoldingChartValue({
        state: false,
        chartId: "",
        rowId: "",
      });
    }
  }, [isHoldingChartValue.state]);

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

  return content ? (
    <>
      {content}
      <ReportActionDialog
        modalDisplay={displayDeleteElementModal.display}
        buttonTitle={modalContent.buttonTitle}
        description={modalContent.description}
        subtitle={modalContent.subtitle}
        title={modalContent.title}
        action={handleModalAction}
        modalType={""}
        setModalDisplay={() => {
          setDisplayDeleteElementModal({
            ...displayDeleteElementModal,
            display: false,
          });
          setInitChartId(null);
          setDraggedChartName("");
        }}
      />
    </>
  ) : (
    <div
      css={`
        width: ${width};
        background: #fff;
        height: ${props.height}px;
        border-radius: 20px;
        box-shadow: 0px 0px 10px 0px rgba(152, 161, 170, 0.6);
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
        {isOver ? (
          <span>Release to drop</span>
        ) : (
          <span>
            Drag and drop your elements and <br /> charts in the placeholders
          </span>
        )}
      </p>
    </div>
  );
};
