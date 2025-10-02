import React from "react";
import Box from "@mui/material/Box";
import { DndProvider } from "react-dnd";
import update from "immutability-helper";
import Divider from "@mui/material/Divider";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RTEToolbar } from "app/components/rich-text-editor";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { Empty } from "app/pages/report-builder/builder/components/empty";
import { RBReportItem } from "app/state/api/action-reducers/report-builder/sync";
import { ReportBuilderPageGrid } from "app/pages/report-builder/builder/components/grid";
import { ReportBuilderPageText } from "app/pages/report-builder/builder/components/text";
import { ReportBuilderPageChart } from "app/pages/report-builder/builder/components/chart";
import { ReportBuilderPageTable } from "app/pages/report-builder/builder/components/table";
import { ReportBuilderPageImage } from "app/pages/report-builder/builder/components/image";
import { ItemComponent } from "app/pages/report-builder/builder/components/order-container";

export const ReportBuilderPage: React.FC = () => {
  const items = useStoreState((state) => state.RBReportItemsState.items);
  const activeRTE = useStoreState((state) => state.RBReportRTEState.activeRTE);
  const setActiveRTE = useStoreActions(
    (actions) => actions.RBReportRTEState.setActiveRTE,
  );

  const setItems = useStoreActions(
    (actions) => actions.RBReportItemsState.setItems,
  );
  const removeItem = useStoreActions(
    (actions) => actions.RBReportItemsState.removeItem,
  );
  const reportSettings = useStoreState((state) => state.RBReportSettingsState);
  const reportSettingsActions = useStoreActions(
    (actions) => actions.RBReportSettingsState,
  );
  const setNotes = useStoreActions(
    (actions) => actions.RBReportNotesState.setValue,
  );

  const moveItem = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setItems(
        update(items, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, items[dragIndex] as RBReportItem],
          ],
        }),
      );
    },
    [items],
  );

  const getItemByType = (item: RBReportItem, index: number) => {
    switch (item.type) {
      case "text":
        return (
          <ItemComponent
            id={item.id}
            index={index}
            childrenData={[]}
            moveItem={moveItem}
          >
            <ReportBuilderPageText id={item.id} setEditor={setActiveRTE} />
          </ItemComponent>
        );
      case "chart":
        return (
          <ItemComponent
            id={item.id}
            index={index}
            childrenData={[]}
            moveItem={moveItem}
          >
            <ReportBuilderPageChart id={item.id} />
          </ItemComponent>
        );
      case "table":
        return (
          <ItemComponent
            id={item.id}
            index={index}
            childrenData={[]}
            moveItem={moveItem}
          >
            <ReportBuilderPageTable id={item.id} />
          </ItemComponent>
        );
      case "image":
        return (
          <ItemComponent
            id={item.id}
            index={index}
            childrenData={[]}
            moveItem={moveItem}
          >
            <ReportBuilderPageImage id={item.id} />
          </ItemComponent>
        );
      case "grid":
        return (
          <ItemComponent
            id={item.id}
            index={index}
            childrenData={[]}
            moveItem={moveItem}
          >
            <ReportBuilderPageGrid
              length={4}
              id={item.id}
              setEditor={setActiveRTE}
            />
          </ItemComponent>
        );
      case "column":
        return (
          <ItemComponent
            id={item.id}
            index={index}
            childrenData={[]}
            moveItem={moveItem}
          >
            <ReportBuilderPageGrid
              length={2}
              id={item.id}
              setEditor={setActiveRTE}
            />
          </ItemComponent>
        );
      case "section_divider":
        return (
          <ItemComponent
            id={item.id}
            index={index}
            childrenData={[]}
            moveItem={moveItem}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                position: "relative",
                flexDirection: "column",
                ".top-right-actions": {
                  top: -19,
                  right: -45,
                  display: "flex",
                  height: "fit-content",
                },
              }}
            >
              <Divider key={item.id} flexItem />
              <Box className="top-right-actions">
                <IconButton onClick={() => removeItem(item.id)}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </ItemComponent>
        );
      default:
        return <React.Fragment key={item.id} />;
    }
  };

  React.useEffect(() => {
    if (reportSettings.width < 200) {
      reportSettingsActions.setWidth(
        window.innerWidth > 1440 ? 1392 : window.innerWidth - 32,
      );
    }
    if (reportSettings.height < 200) {
      reportSettingsActions.setHeight(window.innerHeight - 174);
    }

    return () => setNotes("");
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        justifyContent: "center",
      }}
    >
      {activeRTE && (
        <Box
          sx={{
            top: -10,
            left: 24,
            position: "absolute",
            width: "calc(100% - 48px)",
          }}
        >
          <RTEToolbar editor={activeRTE} />
        </Box>
      )}
      <DndProvider backend={HTML5Backend}>
        <Box
          sx={{
            maxWidth: "100%",
            overflow: "overlay",
            boxShadow: "0 0 10px 0 rgba(152, 161, 170, 0.60)",
          }}
        >
          <Box
            id="report-builder-canvas"
            sx={{
              gap: "10px",
              display: "flex",
              bgcolor: "#ffffff",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: `${reportSettings.width}px`,
              height: `${reportSettings.height}px`,
              p: `${reportSettings.vPadding}px ${reportSettings.hPadding}px`,
              border: `${reportSettings.stroke}px solid ${reportSettings.strokeColor}`,
              ".top-right-actions": {
                top: 4,
                right: 4,
                position: "absolute",
                ".MuiIconButton-root": {
                  bgcolor: "#fff",
                  borderRadius: "4px",
                  border: "1px solid #cfd4da",
                  "&:hover": {
                    bgcolor: "#f8f8f8",
                    borderColor: "#000000",
                  },
                },
              },
            }}
          >
            {items.length === 0 && <Empty />}
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                {getItemByType(item, index)}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </DndProvider>
    </Box>
  );
};
