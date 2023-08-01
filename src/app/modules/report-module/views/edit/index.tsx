import React from "react";
import { v4 } from "uuid";
import get from "lodash/get";
import Box from "@material-ui/core/Box";
import { useRecoilState } from "recoil";
import { useUpdateEffect } from "react-use";
import { useParams } from "react-router-dom";
import useResizeObserver from "use-resize-observer";
import Container from "@material-ui/core/Container";
import { EditorState, convertFromRaw } from "draft-js";
import { PlaceHolder } from "app/modules/report-module/views/create";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { ReportModel, emptyReport } from "app/modules/report-module/data";
import { ReportEditViewProps } from "app/modules/report-module/views/edit/data";
import HeaderBlock from "app/modules/report-module/sub-module/components/headerBlock";
import { ReportOrderContainer } from "app/modules/report-module/components/order-container";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import AddRowFrameButton from "app/modules/report-module/sub-module/rowStructure/addRowFrameButton";
import RowFrame, {
  Divider,
} from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import {
  IRowFrameStructure,
  reportContentWidthsAtom,
  persistedReportStateAtom,
  reportContentContainerWidth,
  reportContentHeightsAtom,
} from "app/state/recoil/atoms";

export function ReportEditView(props: ReportEditViewProps) {
  const { page } = useParams<{ page: string }>();

  const { ref, width } = useResizeObserver<HTMLDivElement>();

  const [containerWidth, setContainerWidth] = useRecoilState(
    reportContentContainerWidth
  );

  const [persistedReportState] = useRecoilState(persistedReportStateAtom);
  const [rowStructureType, setRowStructuretype] =
    React.useState<IRowFrameStructure>({
      index: 0,
      rowType: "",
      disableAddRowStructureButton: false,
    });

  const setReportContentWidths = useRecoilState(reportContentWidthsAtom)[1];
  const setReportContentHeights = useRecoilState(reportContentHeightsAtom)[1];

  const fetchReportData = useStoreActions(
    (actions) => actions.reports.ReportGet.fetch
  );

  const reportData = useStoreState(
    (state) => (state.reports.ReportGet.crudData ?? emptyReport) as ReportModel
  );

  function deleteFrame(id: string) {
    props.setFramesArray((prev) => {
      let tempPrev = prev.map((item) => ({ ...item }));
      const frameId = prev.findIndex((frame) => frame.id === id);

      const contentArr = tempPrev[frameId].content;
      props.setPickedCharts((prevPickedCharts) => {
        return prevPickedCharts.filter((item) => !contentArr.includes(item));
      });

      tempPrev.splice(frameId, 1);
      return [...tempPrev];
    });
  }

  React.useEffect(() => {
    fetchReportData({ getId: page });
  }, [page]);

  React.useEffect(() => {
    if (props.localPickedCharts.length === 0) {
      const items = reportData.rows.map((rowFrame, index) =>
        rowFrame.items.filter((item) => typeof item === "string")
      ) as string[][];
      let pickedItems: string[] = [];

      for (const element of items) {
        pickedItems = [...pickedItems, ...element];
      }
      props.setPickedCharts(pickedItems);
    }

    return () => {
      // props.setStopInitializeFramesWidth(false);
    };
  }, []);

  React.useEffect(() => {
    if (width && width !== containerWidth) {
      setContainerWidth(width);
    }
  }, [width]);

  useUpdateEffect(() => {
    if (JSON.parse(persistedReportState.framesArray || "[]").length < 1) {
      props.setName(reportData.name);
      props.setHeaderDetails({
        title: reportData.title,
        showHeader: reportData.showHeader,
        description: EditorState.createWithContent(
          convertFromRaw(reportData.subTitle as any)
        ),
        backgroundColor: reportData.backgroundColor,
        titleColor: reportData.titleColor,
        descriptionColor: reportData.descriptionColor,
        dateColor: reportData.dateColor,
      });
      props.setAppliedHeaderDetails({
        title: reportData.title,
        showHeader: reportData.showHeader,
        description: EditorState.createWithContent(
          convertFromRaw(reportData.subTitle as any)
        ),
        backgroundColor: reportData.backgroundColor,
        titleColor: reportData.titleColor,
        descriptionColor: reportData.descriptionColor,
        dateColor: reportData.dateColor,
      });
      const newFrameArray = reportData.rows.map((rowFrame, index) => {
        const content = rowFrame.items;
        const contentTypes = rowFrame.items.map((item) =>
          typeof item === "object" ? "text" : "chart"
        );
        const isDivider =
          content &&
          content.length === 1 &&
          content[0] === ReportElementsType.DIVIDER;
        const id = v4();
        return {
          id,
          structure: rowFrame.structure,
          frame: isDivider ? (
            <Divider delete={deleteFrame} dividerId={id} />
          ) : (
            <RowFrame
              rowIndex={index}
              rowId={id}
              deleteFrame={deleteFrame}
              forceSelectedType={rowFrame.structure ?? undefined}
              handleRowFrameItemRemoval={props.handleRowFrameItemRemoval}
              handleRowFrameItemAddition={props.handleRowFrameItemAddition}
              handleRowFrameStructureTypeSelection={
                props.handleRowFrameStructureTypeSelection
              }
              handlePersistReportState={props.handlePersistReportState}
              previewItems={rowFrame.items}
              handleRowFrameItemResize={props.handleRowFrameItemResize}
            />
          ),
          content,
          contentWidths: [],
          contentHeights: [],
          contentTypes,
        };
      });
      props.setFramesArray(newFrameArray);
    }
  }, [reportData]);

  React.useEffect(() => {
    if (!props.stopInitializeFramesWidth) {
      const contentWidths = props.framesArray.map((frame, index) => {
        return {
          id: frame.id,
          widths: get(
            reportData,
            `contentWidths[${index}].widths`,
            get(frame, "contentWidths", [])
          ),
        };
      });
      const contentHeights = props.framesArray.map((frame, index) => {
        return {
          id: frame.id,
          heights: get(
            reportData,
            `contentHeights[${index}].heights`,
            get(frame, "contentHeights", [])
          ),
        };
      });
      setReportContentWidths(contentWidths);
      setReportContentHeights(contentHeights);
    }
  }, [props.framesArray, reportData.contentWidths, reportData.contentHeights]);

  return (
    <div>
      <HeaderBlock
        previewMode={false}
        headerDetails={{
          ...props.headerDetails,
          createdDate: reportData.createdDate,
        }}
        setHeaderDetails={props.setHeaderDetails}
      />
      <Container maxWidth="lg">
        <div
          ref={ref}
          id="content-container"
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
          <ReportOrderContainer enabled childrenData={props.framesArray}>
            {props.framesArray.map((frame) => {
              return (
                <div key={frame.id}>
                  <div>{frame.frame}</div>
                  <Box height={38} />

                  <PlaceHolder
                    index={frame.id}
                    rowId={frame.id}
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
                    handlePersistReportState={props.handlePersistReportState}
                    handleRowFrameItemResize={props.handleRowFrameItemResize}
                  />
                </div>
              );
            })}
          </ReportOrderContainer>
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
            handlePersistReportState={props.handlePersistReportState}
            handleRowFrameItemResize={props.handleRowFrameItemResize}
          />
          <Box height={45} />
        </div>
      </Container>
    </div>
  );
}
