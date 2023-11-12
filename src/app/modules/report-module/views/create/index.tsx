import React from "react";
import { v4 } from "uuid";
import { useDrop } from "react-dnd";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import useResizeObserver from "use-resize-observer";
import { useRecoilState, useRecoilValue } from "recoil";
import { GridColumns } from "app/modules/report-module/components/grid-columns";
import HeaderBlock from "app/modules/report-module/sub-module/components/headerBlock";
import { ReportOrderContainer } from "app/modules/report-module/components/order-container";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import AddRowFrameButton from "app/modules/report-module/sub-module/rowStructure/addRowFrameButton";
import RowFrame from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import {
  ReportCreateViewProps,
  PlaceholderProps,
} from "app/modules/report-module/views/create/data";
import {
  IRowFrameStructure,
  reportContentContainerWidth,
  isDividerOrRowFrameDraggingAtom,
} from "app/state/recoil/atoms";
import TourGuide from "app/components/Dialogs/TourGuide";
import { cloneDeep } from "lodash";
import { withAuthenticationRequired } from "@auth0/auth0-react";

function ReportCreateView(props: ReportCreateViewProps) {
  const { ref, width } = useResizeObserver<HTMLDivElement>();

  const [containerWidth, setContainerWidth] = useRecoilState(
    reportContentContainerWidth
  );
  const [rowStructureType, setRowStructuretype] =
    React.useState<IRowFrameStructure>({
      index: 0,
      rowType: "",
      disableAddRowStructureButton: false,
    });

  React.useEffect(() => {
    if (props.reportType === "advanced") {
      const rowOne = v4();
      const rowTwo = v4();

      const rowFive = v4();
      props.setFramesArray([
        {
          id: rowOne,
          frame: {
            rowId: rowOne,
            rowIndex: 0,
            forceSelectedType: "oneByFive",
            handlePersistReportState: props.handlePersistReportState,
            handleRowFrameItemResize: props.handleRowFrameItemResize,
            type: "rowFrame",
          },
          content: [null, null, null, null, null],
          contentWidths: [20, 20, 20, 20, 20],
          contentHeights: [121, 121, 121, 121, 121],
          contentTypes: [null, null, null, null, null],
          structure: "oneByFive",
        },
        {
          id: rowTwo,
          frame: {
            rowId: rowTwo,
            rowIndex: 1,
            forceSelectedType: "oneByOne",
            handlePersistReportState: props.handlePersistReportState,
            handleRowFrameItemResize: props.handleRowFrameItemResize,
            type: "rowFrame",
          },
          content: [null],
          contentWidths: [100],
          contentHeights: [400],
          contentTypes: [null],
          structure: "oneByOne",
        },

        {
          id: rowFive,
          frame: {
            rowId: rowFive,
            rowIndex: 2,
            forceSelectedType: "oneByThree",
            handlePersistReportState: props.handlePersistReportState,
            handleRowFrameItemResize: props.handleRowFrameItemResize,
            type: "rowFrame",
          },
          content: [null, null, null],
          contentWidths: [33, 33, 33],
          contentHeights: [460, 460, 460],
          contentTypes: [null, null, null],
          structure: "oneByThree",
        },
      ]);
    }
  }, [props.reportType]);

  React.useEffect(() => {
    if (width && width !== containerWidth) {
      setContainerWidth(width);
    }
  }, [width]);

  return (
    <div>
      <HeaderBlock
        previewMode={false}
        headerDetails={{ ...props.headerDetails, createdDate: new Date() }}
        setHeaderDetails={props.setHeaderDetails}
        setReportName={props.setReportName}
        reportName={props.reportName}
        hasSubHeaderTitleFocused={props.hasSubHeaderTitleFocused}
      />
      <Container maxWidth="lg">
        <div
          ref={ref}
          id="content-container"
          css={`
            position: relative;
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
          <TourGuide reportType={props.reportType} toolBoxOpen={props.open} />
          <ReportOrderContainer
            enabled
            childrenData={props.framesArray}
            setFramesArray={props.setFramesArray}
          >
            {props.framesArray.map((frame) => {
              return (
                <div key={frame.id}>
                  <div
                    css={`
                      position: relative;
                    `}
                  >
                    <RowFrame
                      {...frame.frame}
                      setFramesArray={props.setFramesArray}
                      framesArray={props.framesArray}
                      view={props.view}
                      rowContentHeights={frame.contentHeights}
                      rowContentWidths={frame.contentWidths}
                      previewItems={
                        frame.frame.previewItems as (string | object)[]
                      }
                    />
                  </div>
                  <Box height={38} />
                  <PlaceHolder
                    rowId={frame.id}
                    index={frame.id}
                    deleteFrame={props.deleteFrame}
                    framesArray={props.framesArray}
                    setFramesArray={props.setFramesArray}
                    handlePersistReportState={props.handlePersistReportState}
                    handleRowFrameItemResize={props.handleRowFrameItemResize}
                  />
                </div>
              );
            })}
          </ReportOrderContainer>

          {
            <AddRowFrameButton
              framesArray={props.framesArray}
              rowStructureType={rowStructureType}
              setFramesArray={props.setFramesArray}
              setRowStructureType={setRowStructuretype}
              handlePersistReportState={props.handlePersistReportState}
              handleRowFrameItemResize={props.handleRowFrameItemResize}
            />
          }
          <Box height={45} />
          <GridColumns />
        </div>
      </Container>
    </div>
  );
}

export default withAuthenticationRequired(ReportCreateView);

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
      props.setFramesArray((prev) => {
        const tempPrev = cloneDeep(prev);

        const tempIndex = tempPrev.findIndex(
          (frame) => frame.id === props.index
        );
        const id = v4();
        tempPrev.splice(tempIndex + 1, 0, {
          id,
          frame: {
            rowId: id,
            rowIndex: tempIndex + 1,

            handlePersistReportState: props.handlePersistReportState,
            handleRowFrameItemResize: props.handleRowFrameItemResize,
            type: item.type,
          },
          content: item.type === ReportElementsType.ROWFRAME ? [] : ["divider"],
          contentWidths: [],
          contentHeights: [],
          contentTypes:
            item.type === ReportElementsType.ROWFRAME ? [] : ["divider"],
          structure: null,
        });
        return [...tempPrev];
      });
    },
  }));

  const isItemDragging = useRecoilValue(isDividerOrRowFrameDraggingAtom);

  return (
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
  );
};
