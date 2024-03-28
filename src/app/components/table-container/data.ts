import { TableProps } from "app/components/table/data";

export interface TableContainerProps extends TableProps {
  tabsView?: {
    tabs: string[];
    selectedTab: string;
    onTabChange: (tab: string) => void;
  };
}

export const TABLE_CONTAINER_TABS = [
  "All",
  "Impact Indicators",
  "Outcome Indicators",
  "Modules & Coverage Indicators",
  "Modules & Workplan Tracking Measures",
];
