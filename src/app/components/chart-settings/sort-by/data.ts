import { ItemInterface } from "react-sortablejs";

export interface ChartSettingsSortByItem extends ItemInterface {
  id: string;
}

export interface ChartSettingsSortByPoolItem {
  name: string;
  disabled: boolean;
}

export interface ChartSettingsSortByProps {
  items: ChartSettingsSortByItem[];
  pool: ChartSettingsSortByPoolItem[];
  setItems: (value: ChartSettingsSortByItem[]) => void;
  onCancel: () => void;
  onSubmit: () => void;
  orderListDropdownSetSelected?: (name: string, value: string) => void;
  simple?: boolean;
  secondary?: boolean;
}
type IOrder = "A-Z" | "Z-A";
export interface ChartSettingsSortByOrderProps {
  items: IOrder;
  pool: ChartSettingsSortByPoolItem[];
  setItems: (value: IOrder) => void;
  onCancel: () => void;
  onSubmit: () => void;
  orderListDropdownSetSelected?: (name: string, value: string) => void;
  simple?: boolean;
  secondary?: boolean;
}

export const ChartSettingsSortByItems: ChartSettingsSortByItem[] = [
  {
    id: "1",
    name: "Donor",
    dropdown: {
      selected: "Ascending",
      items: [
        { value: "asc", label: "Ascending" },
        { value: "desc", label: "Descending" },
      ],
    },
  },
  {
    id: "2",
    name: "Component",
    dropdown: {
      selected: "Ascending",
      items: [
        { value: "asc", label: "Ascending" },
        { value: "desc", label: "Descending" },
      ],
    },
  },
  {
    id: "3",
    name: "Geography",
    dropdown: {
      selected: "Ascending",
      items: [
        { value: "asc", label: "Ascending" },
        { value: "desc", label: "Descending" },
      ],
    },
  },
  {
    id: "4",
    name: "Replenishment Period",
    dropdown: {
      selected: "Ascending",
      items: [
        { value: "asc", label: "Ascending" },
        { value: "desc", label: "Descending" },
      ],
    },
  },
  {
    id: "5",
    name: "Years",
    dropdown: {
      selected: "Ascending",
      items: [
        { value: "asc", label: "Ascending" },
        { value: "desc", label: "Descending" },
      ],
    },
  },
];
