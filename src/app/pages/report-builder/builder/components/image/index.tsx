import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useClickOutsideEditor } from "app/hooks/useClickOutsideEditorComponent";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export const ReportBuilderPageImage: React.FC<{
  id: string;
}> = ({ id }) => {
  const setSelectedController = useStoreActions(
    (actions) => actions.RBReportItemsControllerState.setItem,
  );
  const clearSelectedItem = useStoreActions(
    (actions) => actions.RBReportItemsControllerState.clearItem,
  );
  const items = useStoreState((state) => state.RBReportItemsState.items);
  const selectedItem = items.find((i) => i.id === id);
  const { src: imageSrc, img, ...settings } = selectedItem?.settings || {};

  useClickOutsideEditor({
    editorId: "image-render",
    toolbarId: "image-controller",
    onOutsideClick: () => {
      clearSelectedItem();
    },
  });

  const triggerImageController = (open: boolean) => {
    setSelectedController({ id, type: "image", open });
  };

  return (
    <Box
      id="image-render"
      onClick={() => triggerImageController(true)}
      sx={{
        width: "100%",
        backgroundColor: "pink",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        "&:hover": {
          ".top-right-actions": {
            display: "flex",
          },
        },
        ...settings,
      }}
    >
      {!imageSrc && (
        <Box
          sx={{
            gap: "10px",
            width: "100%",
            height: "220px",
            display: "flex",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
            alignItems: "center",
            bgcolor: "#d6ddfd",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px dashed #3154f4",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path
              d="M21 15.4999L17.914 12.4139C17.5389 12.039 17.0303 11.8284 16.5 11.8284C15.9697 11.8284 15.4611 12.039 15.086 12.4139L6 21.4999M5 3.5H19C20.1046 3.5 21 4.39543 21 5.5V19.5C21 20.6046 20.1046 21.5 19 21.5H5C3.89543 21.5 3 20.6046 3 19.5V5.5C3 4.39543 3.89543 3.5 5 3.5ZM11 9.5C11 10.6046 10.1046 11.5 9 11.5C7.89543 11.5 7 10.6046 7 9.5C7 8.39543 7.89543 7.5 9 7.5C10.1046 7.5 11 8.39543 11 9.5Z"
              stroke="#3154F4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography fontSize="16px" color="#3154f4">
            Click to add an image
          </Typography>
        </Box>
      )}
      <TransformWrapper>
        <TransformComponent>
          {imageSrc && <img src={imageSrc} alt="random" style={{ ...img }} />}
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};
