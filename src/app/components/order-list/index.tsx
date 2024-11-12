import React from "react";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import {
  OrderListProps,
  ChartSettingsOrderListItem,
} from "app/components/order-list/data";

export const OrderList: React.FC<OrderListProps> = (props: OrderListProps) => {
  const handleRemove = (id: string) => {
    props.setItems(props.items.filter((item) => item.id !== id));
  };

  return (
    <ReactSortable list={props.items} setList={props.setItems}>
      {props.items.map((item: ItemInterface) => (
        <ChartSettingsOrderListItem
          {...item}
          key={item.id}
          onRemove={handleRemove}
          dropdownSetSelected={props.dropdownSetSelected}
        />
      ))}
    </ReactSortable>
  );
};
