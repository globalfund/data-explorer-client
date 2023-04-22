import React from "react";
import { v4 } from "uuid";
import { useDrop } from "react-dnd";
import { useRecoilValue } from "recoil";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import HeaderBlock from "app/modules/report-module/sub-module/components/headerBlock";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import AddRowFrameButton from "app/modules/report-module/sub-module/rowStructure/addRowFrameButton";
import RowFrame, {
  Divider,
} from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import {
  ReportCreateViewProps,
  IFramesArray,
  PlaceholderProps,
} from "app/modules/report-module/views/create/data";
import {
  IRowFrameStructure,
  isDividerOrRowFrameDraggingAtom,
} from "app/state/recoil/atoms";

export function ReportCreateView(props: ReportCreateViewProps) {
  const [rowStructureType, setRowStructuretype] =
    React.useState<IRowFrameStructure>({
      index: 0,
      rowType: "",
      disableAddRowStructureButton: false,
    });

  // function deleteFrame(id: string) {
  //   props.setFramesArray((prev) => {
  //     let tempPrev = prev.map((item) => ({ ...item }));
  //     console.log(tempPrev, "tempPrev");
  //     const frameId = tempPrev.findIndex((frame) => frame.id === id);

  //     tempPrev.splice(frameId, 1);
  //     return [...tempPrev];
  //   });
  // }

  // React.useEffect(() => {
  //   if (props.reportType === "advanced") {
  //     props.setFramesArray([
  //       {
  //         id: v4(),
  //         frame: (
  //           <RowFrame
  //             rowIndex={0}
  //             forceSelectedType="oneByFive"
  //             deleteFrame={() => deleteFrame(0, "0")}
  //             handleRowFrameItemAddition={props.handleRowFrameItemAddition}
  //             handleRowFrameStructureTypeSelection={
  //               props.handleRowFrameStructureTypeSelection
  //             }
  //           />
  //         ),
  //         content: [null, null, null, null, null],
  //         contentTypes: [null, null, null, null, null],
  //         structure: "oneByFive",
  //       },
  //       {
  //         id: v4(),
  //         frame: (
  //           <RowFrame
  //             rowIndex={1}
  //             forceSelectedType="oneByOne"
  //             deleteFrame={() => deleteFrame(1, "1")}
  //             handleRowFrameItemAddition={props.handleRowFrameItemAddition}
  //             handleRowFrameStructureTypeSelection={
  //               props.handleRowFrameStructureTypeSelection
  //             }
  //           />
  //         ),
  //         content: [null],
  //         contentTypes: [null],
  //         structure: "oneByOne",
  //       },
  //       {
  //         id: v4(),
  //         frame: (
  //           <RowFrame
  //             rowIndex={2}
  //             forceSelectedType="oneToFour"
  //             deleteFrame={() => deleteFrame(2, "2")}
  //             handleRowFrameItemAddition={props.handleRowFrameItemAddition}
  //             handleRowFrameStructureTypeSelection={
  //               props.handleRowFrameStructureTypeSelection
  //             }
  //           />
  //         ),
  //         content: [null, null],
  //         contentTypes: [null, null],
  //         structure: "oneToFour",
  //       },
  //       {
  //         id: v4(),
  //         frame: (
  //           <RowFrame
  //             rowIndex={3}
  //             forceSelectedType="oneByOne"
  //             deleteFrame={() => deleteFrame(3, "3")}
  //             handleRowFrameItemAddition={props.handleRowFrameItemAddition}
  //             handleRowFrameStructureTypeSelection={
  //               props.handleRowFrameStructureTypeSelection
  //             }
  //           />
  //         ),
  //         content: [null],
  //         contentTypes: [null],
  //         structure: "oneByOne",
  //       },
  //       {
  //         id: v4(),
  //         frame: (
  //           <RowFrame
  //             rowIndex={4}
  //             forceSelectedType="oneByThree"
  //             deleteFrame={() => deleteFrame(4, "4")}
  //             handleRowFrameItemAddition={props.handleRowFrameItemAddition}
  //             handleRowFrameStructureTypeSelection={
  //               props.handleRowFrameStructureTypeSelection
  //             }
  //           />
  //         ),
  //         content: [null, null, null],
  //         contentTypes: [null, null, null],
  //         structure: "oneByThree",
  //       },
  //     ]);
  //   }
  // }, [props.reportType]);

  return (
    <div>
      <HeaderBlock
        previewMode={false}
        headerDetails={{ ...props.headerDetails, createdDate: new Date() }}
        setHeaderDetails={props.setHeaderDetails}
      />
      <Container maxWidth="lg">
        <div
          css={`
            transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
            width: ${props.open
              ? "calc(100vw - ((100vw - 1280px) / 2) - 400px - 50px)"
              : "100%"};

            @media (max-width: 1280px) {
              width: calc(100vw - 400px);
            }
          `}
        >
          <Box height={50} />
          {props.framesArray.map((frame) => {
            return (
              <div key={frame.id}>
                <div>{frame.frame}</div>
                <Box height={25} />
                <PlaceHolder
                  rowId={frame.id}
                  index={frame.id}
                  deleteFrame={props.deleteFrame}
                  framesArray={props.framesArray}
                  setFramesArray={props.setFramesArray}
                  handleRowFrameItemAddition={props.handleRowFrameItemAddition}
                  handleRowFrameStructureTypeSelection={
                    props.handleRowFrameStructureTypeSelection
                  }
                />
              </div>
            );
          })}
          <Box height={40} />

          <AddRowFrameButton
            deleteFrame={props.deleteFrame}
            framesArray={props.framesArray}
            rowStructureType={rowStructureType}
            setFramesArray={props.setFramesArray}
            setRowStructureType={setRowStructuretype}
            handleRowFrameItemAddition={props.handleRowFrameItemAddition}
            handleRowFrameStructureTypeSelection={
              props.handleRowFrameStructureTypeSelection
            }
          />
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
