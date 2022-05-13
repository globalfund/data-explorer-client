import React from "react";
import get from "lodash/get";
import { useDrag, useDrop } from "react-dnd";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

interface DataThemesToolBoxMappingProps {
  currentChartData: any;
}

const typeIcon = {
  string: "/icons/string.svg",
  number: "/icons/number.svg",
  date: "/icons/date.svg",
};

export function DataThemesToolBoxMapping(props: DataThemesToolBoxMappingProps) {
  return (
    <div
      css={`
        width: 100%;
        height: 350px;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={`
          font-size: 14px;
          margin-bottom: 15px;
        `}
      >
        Dimensions
      </div>
      <div
        css={`
          width: 100%;
          display: flex;
          overflow-y: auto;
          padding-right: 10px;
          flex-direction: column;
          height: calc(100% - 24px);

          &::-webkit-scrollbar {
            width: 4px;
            background: #495057;
          }
          &::-webkit-scrollbar-track {
            background: #f1f3f5;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: #495057;
          }
        `}
      >
        {Object.keys(get(props.currentChartData, "dataTypes", {})).map(
          (dataTypeName: string, index: number) => {
            let type = props.currentChartData.dataTypes[dataTypeName];
            if (
              typeof props.currentChartData.dataTypes[dataTypeName] === "object"
            ) {
              type = props.currentChartData.dataTypes[dataTypeName].type;
            }
            return (
              <DataThemesToolBoxMappingItem
                type={type}
                index={index}
                key={dataTypeName}
                marginBottom="16px"
                dataTypeName={dataTypeName}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

interface DataThemesToolBoxMappingItemProps {
  index: number;
  dimension?: any;
  dataTypeName: string;
  marginBottom: string;
  backgroundColor?: string;
  onDeleteItem?: () => void;
  type: "string" | "number" | "date";
  onChangeDimension?: (index: number, item: any) => void;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
  replaceDimension?: (
    fromDimension: string,
    toDimension: string,
    fromIndex: number,
    toIndex: number,
    multiple?: boolean
  ) => void;
}

export function DataThemesToolBoxMappingItem(
  props: DataThemesToolBoxMappingItemProps
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { index, dimension, onMove, onChangeDimension, replaceDimension } =
    props;

  const [dropProps, drop] = useDrop(() => ({
    accept: ["column", "card"],
    collect: (monitor) => {
      if (!dimension || !onMove || !onChangeDimension || !replaceDimension)
        return;
      return {
        // @ts-ignore
        isOver: monitor.isOver() && monitor.getItem().type === "column",
      };
    },
    // hover(item: any, monitor: any) {
    //   console.log("hover");
    //   if (!dimension || !onMove || !onChangeDimension || !replaceDimension)
    //     return;
    //   if (!dimension.multiple) {
    //     return;
    //   }
    //   if (!ref.current) {
    //     return;
    //   }

    //   const hoverIndex = index;

    //   //#TODO: for now we allow only dropping on "drop another dimension here" in case of multiple dimensions
    //   if (false && item.type === "column") {
    //     // onInsertColumn(hoverIndex, item);
    //     // item.type = "card";
    //     // item.dimensionId = dimension.id;
    //     // item.index = hoverIndex;
    //     // return;
    //   } else if (item.dimensionId === dimension.id) {
    //     const dragIndex = item.index;
    //     // Don't replace items with themselves
    //     if (dragIndex === hoverIndex) {
    //       return;
    //     }
    //     // Determine rectangle on screen
    //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
    //     // Get vertical middle
    //     const hoverMiddleY =
    //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //     // Determine mouse position
    //     const clientOffset = monitor.getClientOffset();
    //     // Get pixels to the top
    //     const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    //     // Only perform the move when the mouse has crossed half of the items height
    //     // When dragging downwards, only move when the cursor is below 50%
    //     // When dragging upwards, only move when the cursor is above 50%
    //     // Dragging downwards
    //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //       return;
    //     }
    //     // Dragging upwards
    //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //       return;
    //     }
    //     console.log("hover", "onMove");
    //     onMove(dragIndex, hoverIndex);
    //     // Note: we're mutating the monitor item here!
    //     // Generally it's better to avoid mutations,
    //     // but it's good here for the sake of performance
    //     // to avoid expensive index searches.
    //     item.index = hoverIndex;
    //   } else {
    //     //#TODO: for now we allow only dropping on "drop another dimension here" in case of multiple dimensions

    //     // replaceDimension(
    //     //   item.dimensionId,
    //     //   dimension.id,
    //     //   item.index,
    //     //   index,
    //     //   true
    //     // )
    //     // item.dimensionId = dimension.id
    //     // item.index = hoverIndex
    //     return;
    //   }
    // },
    drop: (item: any) => {
      // console.log("drop 2");
      // console.log("drop 2 item", item);
      if (!dimension || !onMove || !onChangeDimension || !replaceDimension)
        return;
      if (!dimension.multiple) {
        if (item.type === "column") {
          onChangeDimension(index, item);
        } else {
          replaceDimension(item.dimensionId, dimension.id, item.index, index);
        }
      }
    },
  }));
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dimension ? "card" : "column",
    item: dimension
      ? {
          type: "card",
          index,
          id: props.dataTypeName,
          dimensionId: dimension.id,
        }
      : { id: props.dataTypeName, type: "column" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  if (dimension && onMove && onChangeDimension && replaceDimension) {
    drop(ref);
  } else {
    drag(ref);
  }

  return (
    <div
      ref={ref}
      key={props.dataTypeName}
      css={`
        height: 32px;
        display: flex;
        min-height: 32px;
        position: relative;
        padding-left: 16px;
        align-items: center;
        border-radius: 25px;
        transform: translate(0px, 0px);
        margin-bottom: ${props.marginBottom};
        background: ${props.backgroundColor || "#cfd4da"};
        cursor: ${isDragging
          ? "grabbing"
          : !props.onDeleteItem
          ? "grab"
          : "default"};

        &:last-child {
          margin-bottom: 0px;
        }
      `}
    >
      <span
        css={`
          width: 16px;
          height: 16px;
          margin-right: 13px;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url(${typeIcon[
            props.type as "string" | "number" | "date"
          ]});
        `}
      />
      <div
        css={`
          overflow: clip;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: calc(100% - 40px);
          text-transform: capitalize;
        `}
      >
        {props.dataTypeName}
      </div>
      {props.onDeleteItem && (
        <IconButton
          onClick={props.onDeleteItem}
          css={`
            transform: scale(0.7);
          `}
        >
          <Close />
        </IconButton>
      )}
    </div>
  );
}