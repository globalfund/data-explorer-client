import React from "react";
import update from "immutability-helper";
import { useUpdateEffect } from "react-use";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import RowFrameHandleAdornment from "app/modules/report-module/asset/rowFrameHandleAdornment.svg";
import { IFramesArray } from "../../views/create/data";

interface Item {
  id: string;
  content: React.ReactNode;
  isHandleOpen: boolean;
  isAnyHandleOpen: boolean;
}

interface ItemComponentProps {
  id: string;
  index: number;
  content: React.ReactNode;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isHandleOpen: boolean;
  isAnyHandleOpen: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ItemTypes = {
  CARD: "card",
};

const style = {
  transform: "translate(0px, 0px)",
};

function Handle(props: { top: string; left: string; radius: string }) {
  return (
    <div
      css={`
        top: ${props.top};
        left: ${props.left};
        position: absolute;
        z-index: 3;
        height: calc(100% - 38px);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: grab;
        background-color: #252c34;
        width: 19px;
        border-radius: ${props.radius};
      `}
    >
      <img src={RowFrameHandleAdornment} alt="rowframeHandleAdornment" />
    </div>
  );
}

function ItemComponent(props: ItemComponentProps) {
  const { content } = props;
  const nullRef = React.useRef<HTMLDivElement | null>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    canDrop: () => {
      return props.isAnyHandleOpen;
    },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item: DragItem, monitor) {
      if (!nullRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = nullRef.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id: props.id, index: props.index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: props.isHandleOpen,
  });

  drag(drop(nullRef));

  const opacity = isDragging ? 0.5 : 1;

  return (
    <>
      <div
        ref={nullRef}
        style={{ ...style, opacity }}
        css={`
          height: 100%;
        `}
        id={props.id}
        data-handler-id={handlerId}
      >
        {props.isHandleOpen ? (
          <Handle top="0" left="0" radius="20px 0px 0px 20px" />
        ) : null}

        {content}
        {props.isHandleOpen ? (
          <Handle top="0" left="99%" radius="0 20px 20px 0" />
        ) : null}
      </div>
    </>
  );
}

interface ReportOrderContainerProps {
  enabled: boolean;
  children: React.ReactNode[];
  childrenData: any[];
  setFramesArray: (value: React.SetStateAction<IFramesArray[]>) => void;
}

export function ReportOrderContainer(props: ReportOrderContainerProps) {
  const [items, setItems] = React.useState(
    props.children.map((child: React.ReactNode, index: number) => ({
      content: child,
      id: props.childrenData[index].id,
      isHandleOpen: props.childrenData[index].isHandleOpen,
      isAnyHandleOpen:
        props.childrenData.filter((childData) => childData.isHandleOpen)
          .length > 0,
    }))
  );

  const moveCard = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      props.setFramesArray((prevItems: IFramesArray[]) =>
        update(prevItems, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevItems[dragIndex]],
          ],
        })
      );
    },
    []
  );

  const renderItem = React.useCallback((item: Item, index: number) => {
    return (
      <ItemComponent
        key={item.id}
        index={index}
        id={item.id}
        content={item.content}
        moveCard={moveCard}
        isHandleOpen={item.isHandleOpen}
        isAnyHandleOpen={item.isAnyHandleOpen}
      />
    );
  }, []);

  useUpdateEffect(() => {
    setItems(
      props.children.map((child: React.ReactNode, index: number) => ({
        content: child,
        id: props.childrenData[index].id,
        isHandleOpen: props.childrenData[index].isHandleOpen,
        isAnyHandleOpen:
          props.childrenData.filter((childData) => childData.isHandleOpen)
            .length > 0,
      }))
    );
  }, [props.childrenData]);

  if (!props.enabled) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return (
    <React.Fragment>
      {items.map((item: Item, index: number) => renderItem(item, index))}
    </React.Fragment>
  );
}
