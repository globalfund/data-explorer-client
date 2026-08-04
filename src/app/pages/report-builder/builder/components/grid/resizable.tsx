import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import React from "react";
import { Box, SxProps } from "@mui/system";
import "./resizable.css";

export interface IGridItem<TData> {
  id: any;
  width: string;
  height: string;
  data?: TData;
}

export interface ResizeableGridProps<TData> {
  gridItems: IGridItem<TData>[];
  columns?: number;
  minWidth?: string;
  minHeight?: string;
  setGridItems: (newGridItems: IGridItem<TData>[]) => void;
  setFinalGridItems: (newGridItems: IGridItem<TData>[]) => void;
  children: (
    item: IGridItem<TData>,
    index: number,
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  sx?: SxProps<any>;
  ref?: React.Ref<HTMLDivElement>;
  availableWidth: number;
  availableHeight: number;
  disabled?: boolean;
}

const ResizableGrid = <TData,>({
  gridItems,
  columns = 3,
  minWidth = "10%",
  minHeight = "10%",
  setGridItems,
  setFinalGridItems,
  children,
  sx,
  ref,
  availableWidth,
  availableHeight,
  disabled,
}: ResizeableGridProps<TData>) => {
  const MIN_WIDTH = (parseFloat(minWidth) / 100) * availableWidth; // Convert percentage to decimal
  const MIN_HEIGHT = (parseFloat(minHeight) / 100) * availableHeight; // Convert percentage to decimal
  const COLUMNS = columns; // Number of columns in the grid

  const handleVerticalResize = (
    {
      rowIndex,
      colIndex,
      size,
      newGridItems,
    }: {
      rowIndex: number;
      colIndex: number;
      size: { width: number; height: number };
      newGridItems: {
        width: number;
        height: number;
        id: number;
        data?: TData;
      }[];
    },
    handle: "s" | "n",
  ) => {
    const itemIndex = rowIndex * COLUMNS + colIndex; // Calculate the index of the item in the gridItems array
    const maxHeight =
      newGridItems[itemIndex].height +
      newGridItems[itemIndex + (handle === "s" ? COLUMNS : -COLUMNS)].height -
      MIN_HEIGHT; // Calculate the maximum height for the resized item
    const newHeight = Math.min(Math.max(size.height, MIN_HEIGHT), maxHeight); // Ensure the new height is not less than the minimum height and not more than the maximum height
    const heightDifference = newHeight - newGridItems[itemIndex].height;

    return newGridItems.map((item, index) => {
      const localRowIndex = Math.floor(index / COLUMNS);

      if (localRowIndex === (handle === "s" ? rowIndex + 1 : rowIndex - 1)) {
        return {
          ...item,
          height: item.height - heightDifference, // Adjust the height of the item below the resized item
        };
      } else if (localRowIndex === rowIndex) {
        return {
          ...item,
          height: newHeight, // Update the height of the resized item
        };
      }
      return item;
    });
  };

  const handleHorizontalResize = (
    {
      rowIndex,
      colIndex,
      size,
      newGridItems,
    }: {
      rowIndex: number;
      colIndex: number;
      size: { width: number; height: number };
      newGridItems: {
        width: number;
        height: number;
        id: number;
        data?: TData;
      }[];
    },
    handle: "e" | "w",
  ) => {
    const itemIndex = rowIndex * COLUMNS + colIndex; // Calculate the index of the item in the gridItems array
    const maxWidth =
      newGridItems[itemIndex].width +
      newGridItems[itemIndex + (handle === "e" ? 1 : -1)].width -
      MIN_WIDTH; // Calculate the maximum width for the resized item
    const newWidth = Math.min(Math.max(size.width, MIN_WIDTH), maxWidth); // Ensure the new width is not less than the minimum width and not more than the maximum width
    const widthDifference = newWidth - newGridItems[itemIndex].width;

    return newGridItems.map((item, index) => {
      const localColIndex = index % COLUMNS;

      if (localColIndex === (handle === "e" ? colIndex + 1 : colIndex - 1)) {
        return {
          ...item,
          width: item.width - widthDifference, // Adjust the width of the item to the right of the resized item
        };
      } else if (localColIndex === colIndex) {
        return {
          ...item,
          width: newWidth, // Update the width of the resized item
        };
      }
      return item;
    });
  };

  const handleResize =
    (rowIndex: number, colIndex: number, stop: boolean) =>
    (event: any, { size, handle }: any) => {
      let newGridItems = gridItems.map((item) => ({
        ...item,
        width: (parseFloat(item.width) * availableWidth) / 100, // Convert width from string to number for calculations
        height: (parseFloat(item.height) * availableHeight) / 100, // Convert height from string to number for calculations
      })); // Create a copy of the gridItems to avoid mutating the original array
      const data = { rowIndex, colIndex, size, handle, newGridItems };
      switch (handle) {
        case "s":
          newGridItems = handleVerticalResize(data, "s");
          break;
        case "n":
          newGridItems = handleVerticalResize(data, "n");
          break;
        case "e":
          newGridItems = handleHorizontalResize(data, "e");
          break;
        case "w":
          newGridItems = handleHorizontalResize(data, "w");
          break;
        case "se":
          newGridItems = handleVerticalResize(data, "s");
          newGridItems = handleHorizontalResize(
            {
              ...data,
              newGridItems,
            },
            "e",
          );
          break;
        case "sw":
          newGridItems = handleVerticalResize(data, "s");
          newGridItems = handleHorizontalResize(
            {
              ...data,
              newGridItems,
            },
            "w",
          );
          break;
        case "ne":
          newGridItems = handleHorizontalResize(data, "e");
          newGridItems = handleVerticalResize(
            {
              ...data,
              newGridItems,
            },
            "n",
          );
          break;
        case "nw":
          newGridItems = handleHorizontalResize(data, "w");
          newGridItems = handleVerticalResize(
            {
              ...data,
              newGridItems,
            },
            "n",
          );
          break;
        default:
          break;
      }

      const updatedGridItems = newGridItems.map((item) => ({
        ...item,
        width: `${(item.width / availableWidth) * 100}%`, // Convert width back to percentage string
        height: `${(item.height / availableHeight) * 100}%`, // Convert height back to percentage string
      }));

      if (stop) {
        setFinalGridItems(updatedGridItems);
      } else {
        setGridItems(updatedGridItems);
      }
    };

  return (
    <Box
      sx={{
        ...sx,
      }}
      ref={ref}
    >
      {gridItems.map((item, index) => {
        const rows = Math.ceil(gridItems.length / COLUMNS); // Calculate the number of rows based on the number of items
        const columnIndex = index % COLUMNS; // Calculate the column index of the current item
        const rowindex = Math.floor(index / COLUMNS); // Calculate the row index of the current item

        const south = rowindex < rows - 1; // Check if the current item is in the last row
        const east = columnIndex < COLUMNS - 1; // Check if the current item is in the last column
        const west = columnIndex > 0; // Check if the current item is in the first column
        const north = rowindex > 0; // Check if the current item is in the first row
        const handles = {
          s: south,
          e: east,
          w: west,
          n: north,
          se: south && east,
          sw: south && west,
          ne: north && east,
          nw: north && west,
        };

        return (
          <Resizable
            className="resizable-panel"
            key={item.id}
            // TODO: using numbers can cause issues with precision, consider using a more robust method for handling sizes
            height={(parseFloat(item.height) * availableHeight) / 100} // Convert height from percentage string to number
            width={(parseFloat(item.width) * availableWidth) / 100} // Convert width from percentage string to number
            onResize={handleResize(rowindex, columnIndex, false)}
            onResizeStop={handleResize(rowindex, columnIndex, true)}
            resizeHandles={
              disabled
                ? []
                : Object.entries(handles)
                    .filter(([, value]) => value)
                    .map(([key]) => key as "s" | "e" | "se")
            }
            minConstraints={[MIN_WIDTH, MIN_HEIGHT]} // Minimum width and height
            axis={disabled ? "none" : "both"} // Disable resizing if the disabled prop is true
          >
            {children(item, index)}
          </Resizable>
        );
      })}
    </Box>
  );
};

export default ResizableGrid;
