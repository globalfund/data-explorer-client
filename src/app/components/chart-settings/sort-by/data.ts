import { ItemInterface } from "react-sortablejs";

export interface ChartSettingsSortByItem extends ItemInterface {
  id: string;
}

export interface ChartSettingsSortByPoolItem {
  name: string;
  disabled: boolean;
}

export interface ChartSettingsSortByProps {
  tempItems: ChartSettingsSortByItem[];
  items: ChartSettingsSortByItem[];
  pool: ChartSettingsSortByPoolItem[];
  setTempItems: (value: ChartSettingsSortByItem[]) => void;
  onCancel: () => void;
  onSubmit: () => void;
  orderListDropdownSetSelected?: (name: string, value: string) => void;
  simple?: boolean;
  secondary?: boolean;
}
type IOrder = "A-Z" | "Z-A";
export interface ChartSettingsSortByOrderProps {
  order: IOrder | null;
  setOrder: (value: IOrder | null) => void;
  onReset: () => void;
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

export const ChartSettingsSortByNodes: ChartSettingsSortByItem[] = [
  {
    id: "1",
    name: "Donor",
    dropdown: {
      selected: "A - Z",
      items: [
        { value: "Weight, desc", label: "Weight, High to Low" },
        { value: "Weight, asc", label: "Weight, Low to High" },
        { value: "desc", label: "A - Z" },
        { value: "asc", label: "Z - A" },
      ],
    },
  },
  {
    id: "2",
    name: "Component",
    dropdown: {
      selected: "A - Z",
      items: [
        { value: "Weight, desc", label: "Weight, High to Low" },
        { value: "Weight, asc", label: "Weight, Low to High" },
        { value: "desc", label: "A - Z" },
        { value: "asc", label: "Z - A" },
      ],
    },
  },
  {
    id: "3",
    name: "Geography",
    dropdown: {
      selected: "A - Z",
      items: [
        { value: "Weight, desc", label: "Weight, High to Low" },
        { value: "Weight, asc", label: "Weight, Low to High" },
        { value: "desc", label: "A - Z" },
        { value: "asc", label: "Z - A" },
      ],
    },
  },
  {
    id: "4",
    name: "Replenishment Period",
    dropdown: {
      selected: "A - Z",
      items: [
        { value: "Weight, desc", label: "Weight, High to Low" },
        { value: "Weight, asc", label: "Weight, Low to High" },
        { value: "desc", label: "A - Z" },
        { value: "asc", label: "Z - A" },
      ],
    },
  },
  {
    id: "5",
    name: "Years",
    dropdown: {
      selected: "A - Z",
      items: [
        { value: "Weight, desc", label: "Weight, High to Low" },
        { value: "Weight, asc", label: "Weight, Low to High" },
        { value: "desc", label: "A - Z" },
        { value: "asc", label: "Z - A" },
      ],
    },
  },
];
