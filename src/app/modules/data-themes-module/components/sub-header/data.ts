export interface DataThemesPageSubHeaderProps {
  loading: boolean;
  visualOptions: any;
  isEditMode: boolean;
  previewMode?: boolean;
  updateLocalStates: any;
  tabsDisabled?: boolean;
  validMapping: boolean;
  deleteTab: (value: number) => void;
  detailMode?: boolean;
}
