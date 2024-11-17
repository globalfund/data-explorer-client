import { ItemInterface } from "react-sortablejs";

export interface OrderListProps {
  items: ItemInterface[];
  setItems: (value: ItemInterface[]) => void;
  dropdownSetSelected?: (name: string, value: string) => void;
}

export interface ChartSettingsOrderListItemProps extends ItemInterface {
  dropdown?: {
    selected: string;
    items: { value: string; label: string }[];
  };
  dropdownSetSelected?: (name: string, value: string) => void;
}
