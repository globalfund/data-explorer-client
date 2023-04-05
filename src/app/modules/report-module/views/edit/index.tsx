import React from "react";
import { v4 } from "uuid";
import get from "lodash/get";
import Box from "@material-ui/core/Box";
import { useUpdateEffect } from "react-use";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { EditorState, convertFromRaw } from "draft-js";
import { IRowFrameStructure } from "app/state/recoil/atoms";
import { PlaceHolder } from "app/modules/report-module/views/create";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { ReportModel, emptyReport } from "app/modules/report-module/data";
import { ReportEditViewProps } from "app/modules/report-module/views/edit/data";
import RowFrame from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import HeaderBlock from "app/modules/report-module/sub-module/components/headerBlock";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import AddRowFrameButton from "app/modules/report-module/sub-module/rowStructure/addRowFrameButton";

export function ReportEditView(props: ReportEditViewProps) {
  const { page } = useParams<{ page: string }>();

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

  function deleteFrame(index: number) {
    props.setFramesArray((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  }

  React.useEffect(() => {
    fetchReportData({ getId: page });
  }, [page]);

  useUpdateEffect(() => {
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
    const newFrameArray = reportData.rows.map((rowFrame, index) => {
      const content = rowFrame.items;
      const contentTypes = rowFrame.items.map((item) =>
        typeof item === "object" ? "text" : "chart"
      );
      const isDivider =
        content &&
        content.length === 1 &&
        content[0] === ReportElementsType.DIVIDER;
      return {
        id: v4(),
        structure: rowFrame.structure,
        frame: isDivider ? (
          <hr
            css={`
              border: 1px solid #e4e4e4;
              margin: 20px 0;
            `}
          />
        ) : (
          <RowFrame
            rowIndex={index}
            deleteFrame={() => deleteFrame(index)}
            forceSelectedType={rowFrame.structure ?? undefined}
            handleRowFrameItemAddition={props.handleRowFrameItemAddition}
            handleRowFrameStructureTypeSelection={
              props.handleRowFrameStructureTypeSelection
            }
            previewItems={rowFrame.items}
          />
        ),
        content,
        contentTypes,
      };
    });
    props.setFramesArray(newFrameArray);
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
          {props.framesArray.map((frame, index) => (
            <div key={frame.id}>
              <div>{frame.frame}</div>
              {get(frame, "content[0]", ReportElementsType.DIVIDER) !==
                ReportElementsType.DIVIDER &&
                get(
                  props.framesArray,
                  `[${index + 1}].content[0]`,
                  ReportElementsType.DIVIDER
                ) !== ReportElementsType.DIVIDER && (
                  <PlaceHolder
                    index={frame.id}
                    deleteFrame={deleteFrame}
                    framesArray={props.framesArray}
                    setFramesArray={props.setFramesArray}
                    handleRowFrameItemAddition={
                      props.handleRowFrameItemAddition
                    }
                    handleRowFrameStructureTypeSelection={
                      props.handleRowFrameStructureTypeSelection
                    }
                  />
                )}
            </div>
          ))}
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
