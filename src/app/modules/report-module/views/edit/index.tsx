import React from "react";
import { v4 } from "uuid";
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
import RowFrame from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import {
  IRowFrameStructure,
  persistedReportStateAtom,
  reportContentContainerWidth,
} from "app/state/recoil/atoms";
import { IFramesArray } from "../create/data";

export function ReportEditView(props: ReportEditViewProps) {
  const { page } = useParams<{ page: string }>();
  const token = useStoreState((state) => state.AuthToken.value);

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
      tempPrev.splice(frameId, 1);
      return [...tempPrev];
    });
  }

  React.useEffect(() => {
    fetchReportData({ token, getId: page });
  }, [page, token]);

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
      const newFrameArray: IFramesArray[] = reportData.rows.map(
        (rowFrame, index) => {
          const contentTypes = rowFrame.items.map((item) => {
            if (item === null) {
              return null;
            }
            return typeof item === "object" ? "text" : "chart";
          });
          const content = rowFrame.items.map((item, itemIndex) => {
            return contentTypes[itemIndex] === "text"
              ? EditorState.createWithContent(convertFromRaw(item as any))
              : item;
          });
          const isDivider =
            content &&
            content.length === 1 &&
            content[0] === ReportElementsType.DIVIDER;
          const id = v4();
          return {
            id,
            structure: rowFrame.structure,
            frame: {
              rowIndex: index,
              rowId: id,
              handlePersistReportState: props.handlePersistReportState,
              handleRowFrameItemResize: props.handleRowFrameItemResize,
              setPickedCharts: props.setPickedCharts,
              type: isDivider ? "divider" : "rowFrame",
              forceSelectedType: rowFrame.structure ?? undefined,
              previewItems: content,
            },
            content,
            contentWidths: rowFrame.contentWidths?.widths ?? [],
            contentHeights: rowFrame.contentHeights?.heights ?? [],

            contentTypes,
            isHandleOpen: false,
          };
        }
      );
      props.setFramesArray(newFrameArray);
    }
  }, [reportData]);

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
          <ReportOrderContainer
            enabled
            childrenData={props.framesArray}
            setFramesArray={props.setFramesArray}
          >
            {props.framesArray.map((frame) => {
              return (
                <div key={frame.id}>
                  <RowFrame
                    {...frame.frame}
                    framesArray={props.framesArray}
                    setFramesArray={props.setFramesArray}
                    view={props.view}
                    rowContentHeights={frame.contentHeights}
                    rowContentWidths={frame.contentWidths}
                  />
                  <Box height={38} />

                  <PlaceHolder
                    index={frame.id}
                    rowId={frame.id}
                    deleteFrame={deleteFrame}
                    framesArray={props.framesArray}
                    setFramesArray={props.setFramesArray}
                    handlePersistReportState={props.handlePersistReportState}
                    handleRowFrameItemResize={props.handleRowFrameItemResize}
                  />
                </div>
              );
            })}
          </ReportOrderContainer>
          <AddRowFrameButton
            framesArray={props.framesArray}
            rowStructureType={rowStructureType}
            setFramesArray={props.setFramesArray}
            setRowStructureType={setRowStructuretype}
            handlePersistReportState={props.handlePersistReportState}
            handleRowFrameItemResize={props.handleRowFrameItemResize}
          />
          <Box height={45} />
        </div>
      </Container>
    </div>
  );
}
