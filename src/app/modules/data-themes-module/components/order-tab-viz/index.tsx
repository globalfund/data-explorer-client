import React from "react";
import get from "lodash/get";
import update from "immutability-helper";
import { useUpdateEffect } from "react-use";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { useStoreActions } from "app/state/store/hooks";

interface Item {
  id: number;
  content: React.ReactNode;
}

interface ItemComponentProps {
  id: number;
  index: number;
  content: React.ReactNode;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ItemTypes = {
  CARD: "card",
  padding: "2rem",
  border: "1px dashed gray",
};

const style = {
  cursor: "pointer",
  transform: "translate(0px, 0px)",
};

function ItemComponent(props: ItemComponentProps) {
  const { id, content, index, moveCard } = props;

  const ref = React.useRef<HTMLDivElement>(null);

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
      const hoverIndex = index;

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
      moveCard(dragIndex, hoverIndex);

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
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      id={`item-${id}`}
      data-handler-id={handlerId}
      style={{ ...style, opacity }}
    >
      {content}
    </div>
  );
}

interface Props {
  enabled: boolean;
  children: React.ReactNode[];
}

export function DataThemesTabOrderViz(props: Props) {
  const [items, setItems] = React.useState(
    get(props.children, "[0]", []).map(
      (child: React.ReactNode, index: number) => ({
        id: index,
        content: child,
      })
    )
  );

  const setOrderData = useStoreActions(
    (actions) => actions.dataThemes.sync.vizOrderData.setValue
  );

  const moveCard = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setItems((prevItems: Item[]) =>
        update(prevItems, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevItems[dragIndex] as Item],
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
      />
    );
  }, []);

  useUpdateEffect(() => {
    setItems(
      get(props.children, "[0]", []).map(
        (child: React.ReactNode, index: number) => ({
          id: index,
          content: child,
        })
      )
    );
  }, [props.children]);

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
