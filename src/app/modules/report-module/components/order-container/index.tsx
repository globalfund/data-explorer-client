import React from "react";
import update from "immutability-helper";
import { useUpdateEffect } from "react-use";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { useStoreActions } from "app/state/store/hooks";
import RowFrameHandleAdornment from "app/modules/report-module/asset/rowFrameHandleAdornment.svg";

interface Item {
  id: string;
  content: React.ReactNode;
  isHandleOpen: boolean;
}

interface ItemComponentProps {
  id: string;
  index: number;
  content: React.ReactNode;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isHandleOpen: boolean;
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
  const ref = React.useRef<HTMLDivElement>(null);
  const nullRef = React.useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

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
  });
  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;
  return (
    <div
      style={{ ...style, opacity }}
      css={`
        height: 100%;
      `}
      id={`item-${props.id}`}
      data-handler-id={handlerId}
      ref={props.isHandleOpen ? ref : nullRef}
    >
      {props.isHandleOpen ? (
        <Handle top="0" left="0" radius="20px 0px 0px 20px" />
      ) : null}

      {content}
      {props.isHandleOpen ? (
        <Handle top="0" left="99%" radius="0 20px 20px 0" />
      ) : null}
    </div>
  );
}

interface Props {
  enabled: boolean;
  children: React.ReactNode[];
  childrenData: any[];
}

export function ReportOrderContainer(props: Props) {
  const [items, setItems] = React.useState(
    props.children.map((child: React.ReactNode, index: number) => ({
      content: child,
      id: props.childrenData[index].id,
      isHandleOpen: props.childrenData[index].isHandleOpen,
    }))
  );

  const setOrderData = useStoreActions(
    (actions) => actions.reports.orderData.setValue
  );

  const moveCard = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setItems((prevItems: Item[]) =>
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
      />
    );
  }, []);

  useUpdateEffect(() => {
    setItems(
      props.children.map((child: React.ReactNode, index: number) => ({
        content: child,
        id: props.childrenData[index].id,
        isHandleOpen: props.childrenData[index].isHandleOpen,
      }))
    );
  }, [props.childrenData]);

  useUpdateEffect(() => {
    setOrderData({
      hasChanged: true,
      order: items.map((item: Item) => item.id),
    });
  }, [items]);

  if (!props.enabled) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return (
    <React.Fragment>
      {items.map((item: Item, index: number) => renderItem(item, index))}
    </React.Fragment>
  );
}
