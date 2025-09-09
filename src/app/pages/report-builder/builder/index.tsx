import React from "react";
import Box from "@mui/material/Box";
import { DndProvider } from "react-dnd";
import update from "immutability-helper";
import Divider from "@mui/material/Divider";
import Close from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
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
                "&:hover": {
                  ".top-right-actions": {
                    top: -19,
                    right: -35,
                    display: "flex",
                    height: "fit-content",
                  },
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

  return (
    <Container
      maxWidth="lg"
      sx={{ width: "100%", height: "100%", position: "relative" }}
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
            gap: "10px",
            width: "100%",
            display: "flex",
            padding: "50px",
            minHeight: "1420px",
            bgcolor: "#ffffff",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            boxShadow: "0 0 10px 0 rgba(152, 161, 170, 0.60)",
            ".top-right-actions": {
              top: 4,
              right: 4,
              display: "none",
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
      </DndProvider>
    </Container>
  );
};
