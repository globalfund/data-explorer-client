import React from "react";
import { v4 } from "uuid";
import { useDrop } from "react-dnd";
import { EditorState } from "draft-js";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { IRowFrameStructure } from "app/state/recoil/atoms";
import RowFrame from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import HeaderBlock from "app/modules/report-module/sub-module/components/headerBlock";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import AddRowFrameButton from "app/modules/report-module/sub-module/rowStructure/addRowFrameButton";

export interface IFramesArray {
  id: string;
  frame: JSX.Element;
  content: (object | string | null)[];
  contentTypes: ("text" | "divider" | "chart" | null)[];
  structure:
    | null
    | "oneByOne"
    | "oneByTwo"
    | "oneByThree"
    | "oneByFour"
    | "oneByFive"
    | "oneToFour"
    | "fourToOne";
}

export function ReportCreateView(props: {
  open: boolean;
  reportType: "basic" | "advanced";
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  framesArray: IFramesArray[];
  headerDetails: {
    title: string;
    showHeader: boolean;
    description: EditorState;
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    dateColor: string;
  };
  setHeaderDetails: React.Dispatch<
    React.SetStateAction<{
      title: string;
      showHeader: boolean;
      description: EditorState;
      backgroundColor: string;
      titleColor: string;
      descriptionColor: string;
      dateColor: string;
    }>
  >;
  handleRowFrameItemAddition: (
    rowIndex: number,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => void;
  handleRowFrameStructureTypeSelection: (
    rowIndex: number,
    structure:
      | null
      | "oneByOne"
      | "oneByTwo"
      | "oneByThree"
      | "oneByFour"
      | "oneByFive"
      | "oneToFour"
      | "fourToOne"
  ) => void;
}) {
  const [rowStructureType, setRowStructuretype] =
    React.useState<IRowFrameStructure>({
      index: 0,
      rowType: "",
      disableAddRowStructureButton: false,
    });

  function deleteFrame(index: number) {
    props.setFramesArray((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  }

  React.useEffect(() => {
    if (props.reportType === "advanced") {
      props.setFramesArray([
        {
          id: v4(),
          frame: (
            <RowFrame
              rowIndex={0}
              forceSelectedType="oneByFive"
              deleteFrame={() => deleteFrame(0)}
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
          id: v4(),
          frame: (
            <RowFrame
              rowIndex={1}
              forceSelectedType="oneByOne"
              deleteFrame={() => deleteFrame(1)}
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
          id: v4(),
          frame: (
            <RowFrame
              rowIndex={2}
              forceSelectedType="oneToFour"
              deleteFrame={() => deleteFrame(2)}
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
          id: v4(),
          frame: (
            <RowFrame
              rowIndex={3}
              forceSelectedType="oneByOne"
              deleteFrame={() => deleteFrame(3)}
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
          id: v4(),
          frame: (
            <RowFrame
              rowIndex={4}
              forceSelectedType="oneByThree"
              deleteFrame={() => deleteFrame(4)}
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
                <PlaceHolder
                  index={frame.id}
                  deleteFrame={deleteFrame}
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
          <Box height={45} />
          <AddRowFrameButton
            deleteFrame={deleteFrame}
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

export const PlaceHolder = (props: {
  setFramesArray: React.Dispatch<React.SetStateAction<IFramesArray[]>>;
  framesArray: IFramesArray[];
  index: string;
  disableAddrowStructureButton?: boolean;
  deleteFrame: (index: number) => void;
  handleRowFrameItemAddition: (
    rowIndex: number,
    itemIndex: number,
    itemContent: string | object,
    itemContentType: "text" | "divider" | "chart"
  ) => void;
  handleRowFrameStructureTypeSelection: (
    rowIndex: number,
    structure:
      | null
      | "oneByOne"
      | "oneByTwo"
      | "oneByThree"
      | "oneByFour"
      | "oneByFive"
      | "oneToFour"
      | "fourToOne"
  ) => void;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: [ReportElementsType.DIVIDER, ReportElementsType.ROWFRAME],
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem() as any,
    }),
    drop: (item: any, monitor) => {
      if (item.type === ReportElementsType.ROWFRAME) {
        props.setFramesArray((prev) => {
          const tempIndex = prev.findIndex((frame) => frame.id === props.index);
          prev.splice(tempIndex + 1, 0, {
            id: v4(),
            frame: (
              <RowFrame
                rowIndex={tempIndex + 1}
                deleteFrame={() => props.deleteFrame(tempIndex + 1)}
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
          prev.splice(tempIndex + 1, 0, {
            id: v4(),
            frame: (
              <hr
                css={`
                  border: 1px solid #e4e4e4;
                  margin: 20px 0;
                `}
              />
            ),
            content: ["divider"],
            contentTypes: ["divider"],
            structure: null,
          });
          return [...prev];
        });
      }
    },
  }));

  return (
    <>
      <div
        ref={drop}
        css={`
          height: 10px;
          width: 100%;
          background-color: ${isOver ? " #262C34;" : "transparent"};
        `}
      />
    </>
  );
};
