import React from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";
import { useSessionStorage } from "react-use";
import useResizeObserver from "use-resize-observer";
import Container from "@material-ui/core/Container";
import { EditorState, convertFromRaw } from "draft-js";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { ReportModel, emptyReport } from "app/modules/report-module/data";
import RowFrame from "app/modules/report-module/sub-module/rowStructure/rowFrame";
import HeaderBlock from "app/modules/report-module/sub-module/components/headerBlock";
import { NotAuthorizedMessageModule } from "app/modules/common/not-authorized-message";
import { ReportElementsType } from "app/modules/report-module/components/right-panel-create-view";
import {
  persistedReportStateAtom,
  reportContentContainerWidth,
  unSavedReportPreviewModeAtom,
} from "app/state/recoil/atoms";
import { linkDecorator } from "app/modules/chart-module/routes/text/RichEditor/decorators";

export function ReportPreviewView(props: {
  setIsPreviewView: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { page } = useParams<{ page: string }>();
  const token = useSessionStorage("authToken", "")[0];

  const { ref, width } = useResizeObserver<HTMLDivElement>();

  const persistedReportState = useRecoilState(persistedReportStateAtom)[0];
  const reportPreviewMode = useRecoilState(unSavedReportPreviewModeAtom)[0];

  const [containerWidth, setContainerWidth] = useRecoilState(
    reportContentContainerWidth
  );

  const reportData = useStoreState(
    (state) => (state.reports.ReportGet.crudData ?? emptyReport) as ReportModel
  );

  const Error401 = useStoreState(
    (state) =>
      get(state.reports.ReportGet.errorData, "data.error.statusCode", 0) === 401
  );

  const fetchReportData = useStoreActions(
    (actions) => actions.reports.ReportGet.fetch
  );

  const reportEditClear = useStoreActions(
    (actions) => actions.reports.ReportUpdate.clear
  );

  const reportCreateClear = useStoreActions(
    (actions) => actions.reports.ReportCreate.clear
  );

  const reportGetClear = useStoreActions(
    (actions) => actions.reports.ReportGet.clear
  );

  const [reportPreviewData, setReportPreviewData] = React.useState(reportData);

  React.useEffect(() => {
    if (token) {
      fetchReportData({ token, getId: page });
    } else {
      fetchReportData({ getId: page });
    }
  }, [page, token]);

  React.useEffect(() => {
    if (width && width !== containerWidth) {
      setContainerWidth(width);
    }
  }, [width]);

  React.useEffect(() => {
    if (!reportPreviewMode) {
      setReportPreviewData(reportData);
    }
  }, [reportData]);

  React.useEffect(() => {
    props.setIsPreviewView(true);
    return () => {
      reportGetClear();
      reportEditClear();
      reportCreateClear();
      props.setIsPreviewView(false);
    };
  }, []);

  React.useEffect(() => {
    if (reportPreviewMode) {
      setReportPreviewData({
        ...reportPreviewData,

        title: persistedReportState.headerDetails.title,
        showHeader: persistedReportState.headerDetails.showHeader,
        backgroundColor: persistedReportState.headerDetails.backgroundColor,
        titleColor: persistedReportState.headerDetails.titleColor,
        descriptionColor: persistedReportState.headerDetails.descriptionColor,
        dateColor: persistedReportState.headerDetails.dateColor,
        rows: JSON.parse(persistedReportState.framesArray || "[]"),
        subTitle: JSON.parse(persistedReportState.headerDetails.description),
      });
    }
  }, [persistedReportState]);

  return (
    <div id="export-container">
      <HeaderBlock
        previewMode
        headerDetails={{
          title: reportPreviewData.title,
          showHeader: reportPreviewData.showHeader,
          description: EditorState.createWithContent(
            convertFromRaw(reportPreviewData.subTitle)
          ),
          backgroundColor: reportPreviewData.backgroundColor,
          titleColor: reportPreviewData.titleColor,
          descriptionColor: reportPreviewData.descriptionColor,
          dateColor: reportPreviewData.dateColor,
          createdDate: reportPreviewData.createdDate,
        }}
        setHeaderDetails={() => {}}
      />
      <Container id="content-container" maxWidth="lg" ref={ref}>
        <Box height={45} />
        {Error401 && <NotAuthorizedMessageModule asset="report" />}
        {reportPreviewData.rows.map((rowFrame, index) => {
          const contentTypes = rowFrame.items.map((item) => {
            if (item === null) {
              return null;
            }
            return typeof item === "object" ? "text" : "chart";
          });
          if (
            rowFrame.items &&
            rowFrame.items.length === 1 &&
            rowFrame.items[0] === ReportElementsType.DIVIDER
          ) {
            return (
              <div
                key={"divider" + `${index}`}
                css={`
                  margin: 0 0 50px 0;
                  height: 2px;
                  width: 100%;
                  background-color: #cfd4da;
                `}
              />
            );
          }

          return (
            <RowFrame
              key={"rowframe" + `${index}`}
              rowId={""}
              rowIndex={index}
              forceSelectedType={rowFrame.structure ?? undefined}
              previewItems={rowFrame.items.map((item, index) => {
                return contentTypes[index] === "text"
                  ? EditorState.createWithContent(
                      convertFromRaw(item as any),
                      linkDecorator
                    )
                  : item;
              })}
              handlePersistReportState={() => {}}
              handleRowFrameItemResize={() => {}}
              type="rowFrame"
              setFramesArray={() => {}}
              rowContentHeights={
                rowFrame.contentHeights?.heights ?? rowFrame.contentHeights
              }
              rowContentWidths={
                rowFrame.contentWidths?.widths ?? rowFrame.contentWidths
              }
              framesArray={[]}
              view={"preview"}
            />
          );
        })}
        <Box height={45} />
      </Container>
    </div>
  );
}
