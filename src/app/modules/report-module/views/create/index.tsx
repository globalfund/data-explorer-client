import React from "react";
import { v4 } from "uuid";
import { useDrop } from "react-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import HeaderBlock from "app/modules/report-module/sub-module/components/headerBlock";
import { ReportOrderContainer } from "app/modules/report-module/components/order-container";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import AddRowFrameButton from "app/modules/report-module/sub-module/rowStructure/addRowFrameButton";
import RowFrame, {
  Divider,
} from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import {
  ReportCreateViewProps,
  PlaceholderProps,
} from "app/modules/report-module/views/create/data";
import {
  IRowFrameStructure,
  isDividerOrRowFrameDraggingAtom,
  unSavedReportPreviewMode,
} from "app/state/recoil/atoms";

export function ReportCreateView(props: ReportCreateViewProps) {
  const [reportPreviewMode, __] = useRecoilState(unSavedReportPreviewMode);
  const [rowStructureType, setRowStructuretype] =
    React.useState<IRowFrameStructure>({
      index: 0,
      rowType: "",
      disableAddRowStructureButton: false,
    });

  function deleteFrame(id: string) {
    props.setFramesArray((prev) => {
      let tempPrev = prev.map((item) => ({ ...item }));
      const frameId = tempPrev.findIndex((frame) => frame.id === id);
      const contentArr = tempPrev[frameId].content;

      props.setPickedCharts((prevPickedCharts) => {
        return prevPickedCharts.filter((item) => !contentArr.includes(item));
      });

      tempPrev.splice(frameId, 1);

      return [...tempPrev];
    });
  }

  React.useEffect(() => {
    if (props.reportType === "advanced") {
      const rowOne = v4();
      const rowTwo = v4();
      const rowThree = v4();
      const rowFour = v4();
      const rowFive = v4();
      props.setFramesArray([
        {
          id: rowOne,
          frame: (
            <RowFrame
              rowId={rowOne}
              rowIndex={0}
              forceSelectedType="oneByFive"
              deleteFrame={() => deleteFrame(rowOne)}
              handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
              handleRowFrameItemAddition={props.handleRowFrameItemAddition}
              handleRowFrameStructureTypeSelection={
                props.handleRowFrameStructureTypeSelection
              }
            />
          ),
          content: [null, null, null, null, null],
          contentTypes: [null, null, null, null, null],
          structure: "oneByFive",
        },
        {
          id: rowTwo,
          frame: (
            <RowFrame
              rowId={rowTwo}
              rowIndex={1}
              forceSelectedType="oneByOne"
              deleteFrame={() => deleteFrame(rowTwo)}
              handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
              handleRowFrameItemAddition={props.handleRowFrameItemAddition}
              handleRowFrameStructureTypeSelection={
                props.handleRowFrameStructureTypeSelection
              }
            />
          ),
          content: [null],
          contentTypes: [null],
          structure: "oneByOne",
        },
        {
          id: rowThree,
          frame: (
            <RowFrame
              rowId={rowThree}
              rowIndex={2}
              forceSelectedType="oneToFour"
              deleteFrame={() => deleteFrame(rowThree)}
              handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
              handleRowFrameItemAddition={props.handleRowFrameItemAddition}
              handleRowFrameStructureTypeSelection={
                props.handleRowFrameStructureTypeSelection
              }
            />
          ),
          content: [null, null],
          contentTypes: [null, null],
          structure: "oneToFour",
        },
        {
          id: rowFour,
          frame: (
            <RowFrame
              rowId={rowFour}
              rowIndex={3}
              forceSelectedType="oneByOne"
              deleteFrame={() => deleteFrame(rowFour)}
              handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
              handleRowFrameItemAddition={props.handleRowFrameItemAddition}
              handleRowFrameStructureTypeSelection={
                props.handleRowFrameStructureTypeSelection
              }
            />
          ),
          content: [null],
          contentTypes: [null],
          structure: "oneByOne",
        },
        {
          id: rowFive,
          frame: (
            <RowFrame
              rowId={rowFive}
              rowIndex={4}
              forceSelectedType="oneByThree"
              deleteFrame={() => deleteFrame(rowFive)}
              handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
              handleRowFrameItemAddition={props.handleRowFrameItemAddition}
              handleRowFrameStructureTypeSelection={
                props.handleRowFrameStructureTypeSelection
              }
            />
          ),
          content: [null, null, null],
          contentTypes: [null, null, null],
          structure: "oneByThree",
        },
      ]);
    }
  }, [props.reportType]);

  return (
    <div>
      <HeaderBlock
        previewMode={reportPreviewMode}
        headerDetails={{ ...props.headerDetails, createdDate: new Date() }}
        setHeaderDetails={props.setHeaderDetails}
      />
      <Container maxWidth="lg">
        <div
          css={`
            transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
            width: ${reportPreviewMode
              ? "100%"
              : props.open
              ? "calc(100vw - ((100vw - 1280px) / 2) - 400px - 50px)"
              : "100%"};

            @media (max-width: 1280px) {
              width: calc(100vw - 400px);
            }
          `}
        >
          <Box height={50} />
          <ReportOrderContainer enabled childrenData={props.framesArray}>
            {props.framesArray.map((frame) => {
              return (
                <div key={frame.id}>
                  <div>{frame.frame}</div>
                  <Box height={38} />
                  <PlaceHolder
                    rowId={frame.id}
                    index={frame.id}
                    deleteFrame={deleteFrame}
                    framesArray={props.framesArray}
                    setFramesArray={props.setFramesArray}
                    handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
                    handleRowFrameItemAddition={
                      props.handleRowFrameItemAddition
                    }
                    handleRowFrameStructureTypeSelection={
                      props.handleRowFrameStructureTypeSelection
                    }
                  />
                </div>
              );
            })}
          </ReportOrderContainer>
          {!reportPreviewMode && (
            <AddRowFrameButton
              deleteFrame={deleteFrame}
              framesArray={props.framesArray}
              rowStructureType={rowStructureType}
              setFramesArray={props.setFramesArray}
              setRowStructureType={setRowStructuretype}
              handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
              handleRowFrameItemAddition={props.handleRowFrameItemAddition}
              handleRowFrameStructureTypeSelection={
                props.handleRowFrameStructureTypeSelection
              }
            />
          )}
          <Box height={45} />
        </div>
      </Container>
    </div>
  );
}

export const PlaceHolder = (props: PlaceholderProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: [ReportElementsType.DIVIDER, ReportElementsType.ROWFRAME],
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
    drop: (item: any, monitor) => {
      if (item.type === ReportElementsType.ROWFRAME) {
        props.setFramesArray((prev) => {
          const tempIndex = prev.findIndex((frame) => frame.id === props.index);
          const id = v4();
          prev.splice(tempIndex + 1, 0, {
            id,
            frame: (
              <RowFrame
                rowId={id}
                rowIndex={tempIndex + 1}
                deleteFrame={props.deleteFrame}
                handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
                handleRowFrameItemAddition={props.handleRowFrameItemAddition}
                handleRowFrameStructureTypeSelection={
                  props.handleRowFrameStructureTypeSelection
                }
              />
            ),
            content: [],
            contentTypes: [],
            structure: null,
          });
          return [...prev];
        });
      } else {
        return props.setFramesArray((prev) => {
          const tempIndex = prev.findIndex((frame) => frame.id === props.index);
          const id = v4();
          prev.splice(tempIndex + 1, 0, {
            id,
            frame: <Divider delete={props.deleteFrame} dividerId={id} />,
            content: ["divider"],
            contentTypes: ["divider"],
            structure: null,
          });
          return [...prev];
        });
      }
    },
  }));

  const isItemDragging = useRecoilValue(isDividerOrRowFrameDraggingAtom);

  return (
    <>
      <div
        ref={drop}
        css={`
          width: 100%;
          height: 20px;
          margin: 10px 0;
          display: ${isItemDragging ? "block" : "none"};
          border: 1px ${isItemDragging ? "dashed" : "none"} #adb5bd;
          background-color: #262c34;
        `}
      />
    </>
  );
};
