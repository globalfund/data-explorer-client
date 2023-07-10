import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useDrop } from "react-dnd";
import { useDebounce } from "react-use";
import Tooltip from "@material-ui/core/Tooltip";
import { NumberSize, Resizable } from "re-resizable";
import { Direction } from "re-resizable/lib/resizer";
import IconButton from "@material-ui/core/IconButton";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { RichEditor } from "app/modules/chart-module/routes/text/RichEditor";
import { ReportChartWrapper } from "app/modules/report-module/components/chart-wrapper";
import { ReactComponent as EditIcon } from "app/modules/report-module/asset/editIcon.svg";
import { ReactComponent as DeleteIcon } from "app/modules/report-module/asset/deleteIcon.svg";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import { ReactComponent as RowFrameHandleAdornment } from "app/modules/report-module/asset/rowFrameHandleAdornment.svg";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chartHolderAtom,
  createChartFromReportAtom,
} from "app/state/recoil/atoms";
import { MoreVert, FileCopy } from "@material-ui/icons";
import {
  reportContentWidthsAtom,
  unSavedReportPreviewModeAtom,
  reportContentIsResizingAtom,
  reportContentContainerWidth,
} from "app/state/recoil/atoms";
import ReportActionDialog from "app/modules/report-module/components/actionDialog";
import ImageBox from "app/modules/report-module/components/imageBox";

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
    itemContentType: "text" | "divider" | "chart" | "image"
  ) => void;
  handleRowFrameItemRemoval: (rowId: string, itemIndex: number) => void;
  previewItems?: (string | object)[];
  handlePersistReportState: () => void;
  onRowBoxItemResize: (rowId: string, itemIndex: number, width: number) => void;
  toggleRowFrameHandle: (rowId: string, state: boolean) => void;
}

export default function RowstructureDisplay(props: RowStructureDisplayProps) {
  const location = useLocation();
  const { page } = useParams<{ page: string }>();

  const [handleDisplay, setHandleDisplay] = React.useState(true);
  const [rowButtonsDisplay, setRowButtonsDisplay] = React.useState(false);
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
      setModalTitle("Edit row frame");
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

  const handleModalAction = () => {
    if (modalType === "delete-row") {
      props.deleteFrame(props.rowId);
    } else if (modalType === "edit-row") {
      props.toggleRowFrameHandle(props.rowId, false);

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

  const [reportContentWidths, setReportContentWidths] = useRecoilState(
    reportContentWidthsAtom
  );
  const [reportPreviewMode] = useRecoilState(unSavedReportPreviewModeAtom);

  const viewOnlyMode =
    (page !== "new" &&
      get(location.pathname.split("/"), "[3]", "") !== "edit") ||
    reportPreviewMode;

  const rowContentWidths = !viewOnlyMode
    ? find(reportContentWidths, { id: props.rowId })
    : get(reportContentWidths, `[${props.rowIndex}]`, { widths: [] });

  const setDefaultRowContentWidths = () => {
    const widths = props.rowStructureDetailItems.map((row) => row.width);
    setReportContentWidths((prev) => [
      ...prev,
      {
        id: props.rowId,
        widths,
      },
    ]);
  };

  React.useEffect(() => {
    setDefaultRowContentWidths();
  }, []);

  const handlers = viewOnlyMode
    ? {}
    : {
        onMouseEnter: () => {
          setHandleDisplay(true);
        },
        // onMouseLeave: () => setHandleDisplay(false),
      };

  return (
    <div
      {...handlers}
      css={`
        width: 100%;
        position: relative;
        margin-bottom: ${!viewOnlyMode ? "0px" : "50px"};
      `}
    >
      {handleDisplay && (
        <div
          css={`
            width: 32px;
            left: -50px;
            bottom: 0px;
            display: flex;
            position: absolute;
          `}
        >
          <div
            css={`
              padding: 0 0px;
            `}
          >
            {rowButtonsDisplay && (
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
                setRowButtonsDisplay(!rowButtonsDisplay);
                props.toggleRowFrameHandle(props.rowId, !rowButtonsDisplay);
              }}
              css={`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border-radius: 100px;
                border: ${rowButtonsDisplay ? "1px solid #262c34" : "none"};
                background: #cfd4da;
              `}
            >
              <MoreVert />
            </IconButton>
          </div>
        </div>
      )}
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
            key={`${row.rowId}-${index}`}
            width={get(rowContentWidths, `widths.[${index}]`, "fit-content")}
            itemIndex={index}
            height={props.height}
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

  rowType: string;
  handleRowFrameItemRemoval: (rowId: string, itemIndex: number) => void;
  handleRowFrameItemAddition: (
    rowId: string,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart" | "image"
  ) => void;
  rowItemsCount: number;
  previewItem?: string | any;
  onRowBoxItemResize: (rowId: string, itemIndex: number, width: number) => void;
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

  const [_, setCreateChartFromReport] = useRecoilState(
    createChartFromReportAtom
  );
  const [isHoldingChartValue, setIsHoldingChartValue] =
    useRecoilState(chartHolderAtom);

  const resetMapping = useStoreActions(
    (actions) => actions.charts.mapping.reset
  );
  const [chartId, setChartId] = React.useState<string | null>(null);
  const [displayChart, setDisplayChart] = React.useState(false);
  const [displayImageBox, setDisplayImageBox] = React.useState(false);
  const [displayDeleteElementModal, setDisplayDeleteElementModal] =
    React.useState({
      type: "",
      display: false,
    });
  const [displayTextBox, setDisplayTextBox] = React.useState(false);
  const [boxMenuButtonOpened, setBoxMenuButtonOpened] = React.useState(false);
  const [textContent, setTextContent] = React.useState<EditorState>(
    EditorState.createEmpty()
  );
  const [imageFile, setImageFile] = React.useState<{ image: File }>(
    {} as { image: File }
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

    history.push(`/chart/${chartId}/customize`);
  };
  const handleDisplayDeleteElementModal = (type: string) => {
    setBoxMenuButtonOpened(!boxMenuButtonOpened);
    setDisplayDeleteElementModal({
      type: type,
      display: true,
    });
  };
  const handleDeleteElement = () => {
    props.handleRowFrameItemRemoval(props.rowId, props.itemIndex);
    setDisplayChart(false);
    setChartId(null);
    setDisplayTextBox(false);
    setDisplayImageBox(false);
    setImageFile({} as { image: File });
    setTextContent(EditorState.createEmpty());
    setDisplayDeleteElementModal({
      ...displayDeleteElementModal,
      display: false,
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
        props.handleRowFrameItemAddition(
          props.rowId,
          props.itemIndex,
          textContent,
          "text"
        );
        setDisplayTextBox(true);
        setDisplayChart(false);
        setDisplayImageBox(false);
      } else if (item.type === ReportElementsType.IMAGE) {
        props.handleRowFrameItemAddition(
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
        props.handleRowFrameItemAddition(
          props.rowId,
          props.itemIndex,
          item.value,
          "chart"
        );
        setChartId(item.value);
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
    width = `${containerWidth * (props.width / 100)}px`;
  }

  const onResizeStop = (
    _event: MouseEvent | TouchEvent,
    _direction: Direction,
    elementRef: HTMLElement,
    _delta: NumberSize
  ) => {
    let newWidth = elementRef.offsetWidth;
    props.onRowBoxItemResize(props.rowId, props.itemIndex, newWidth);
    setIsResizing(false);
  };

  const onResize = () => {
    if (!isResizing) {
      setIsResizing(true);
    }
  };

  const content = React.useMemo(() => {
    if (displayTextBox) {
      return (
        <Resizable
          grid={[5, 5]}
          bounds="parent"
          onResize={onResize}
          className="re-resizeable"
          onResizeStop={onResizeStop}
          size={{ width: width, height: props.height }}
          enable={{
            right: !viewOnlyMode,
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
          <div>
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
          bounds="parent"
          className="re-resizeable"
          onResize={onResize}
          onResizeStop={onResizeStop}
          size={{ width: width, height: props.height }}
          enable={{
            right: !viewOnlyMode,
          }}
        >
          <div
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
          bounds="parent"
          onResize={onResize}
          onResizeStop={onResizeStop}
          className="re-resizeable"
          size={{ width: width, height: props.height }}
          enable={{
            right: !viewOnlyMode,
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
    if (isHoldingChartValue.state && props.itemIndex == 0) {
      setDisplayChart(true);
      setChartId(isHoldingChartValue.chartId);
      setIsHoldingChartValue({
        state: false,
        chartId: "",
      });
    }
  }, [isHoldingChartValue.state]);

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
    <>
      {content}
      <ReportActionDialog
        modalDisplay={displayDeleteElementModal.display}
        buttonTitle={"delete"}
        description={`Current ${displayDeleteElementModal.type} will be deleted from this placeholder. 
    Drag and drop your new ${displayDeleteElementModal.type}  in the empty placeholder to complete your report.`}
        subtitle={`Delete ${displayDeleteElementModal.type} from this 
    placeholder`}
        title={"Delete element?"}
        action={handleDeleteElement}
        modalType={""}
        setModalDisplay={() =>
          setDisplayDeleteElementModal({
            ...displayDeleteElementModal,
            display: false,
          })
        }
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
        {isOver ? "Release to drop" : "Drag and drop content here"}
      </p>
    </div>
  );
};
