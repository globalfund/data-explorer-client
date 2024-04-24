export interface FilterPanelProps {
  appliedFilters: string[];
  appliedFilterBgColors: {
    normal: string;
    hover: string;
  };
  onClose: () => void;
}
